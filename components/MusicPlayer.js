"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mediaUrl } from "@/data/media";
import { pauseHome } from "@/lib/homeAudio";
import { useContent } from "./ContentProvider";
import { useLang } from "./LanguageProvider";

function formatTime(value) {
  if (!Number.isFinite(value) || value < 0) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function MusicPlayer() {
  const { lang } = useLang();
  const { albums } = useContent();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [album, setAlbum] = useState(null);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const track = album?.tracks?.[current];
  const src = track ? mediaUrl(track.file) : "";
  const cover = track?.cover || album?.cover;

  useEffect(() => {
    const id = searchParams.get("album");
    if (!id) {
      router.replace("/");
      return;
    }
    const next = albums.find((item) => item.id === id) || null;
    if (!next) {
      router.replace("/");
      return;
    }
    setAlbum(next);
    setCurrent(0);
    setPlaying(false);
  }, [albums, router, searchParams]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = src || "";
    setTime(0);
    setDuration(0);
    if (playing && src) {
      pauseHome();
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [current, src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing && src) {
      pauseHome();
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing, src]);

  function select(i) {
    if (!album) return;
    setCurrent(i);
    setPlaying(Boolean(mediaUrl(album.tracks[i].file)));
  }

  if (!album) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-8">
      <div className="grid items-start gap-5 sm:grid-cols-[260px_minmax(0,1fr)]">
        <div>
          <div className="photo-tile relative mx-auto aspect-[3/4] w-full max-w-[200px] sm:max-w-none">
            <Image
              src={mediaUrl(cover)}
              alt={track ? track.title.en : album.title.en}
              fill
              unoptimized
              quality={100}
              sizes="260px"
              className="object-contain"
            />
          </div>
          <h1 className="mt-3 font-display text-2xl text-cream">{album.title[lang]}</h1>
          <p className="truncate text-xs text-cream/55">
            {track ? track.title[lang] : ""} · {album.year}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => select((current - 1 + album.tracks.length) % album.tracks.length)}
              className="text-xl text-gold"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => {
                if (!src) return;
                setPlaying((v) => !v);
              }}
              className="gold-btn min-h-9 min-w-20 px-4"
            >
              {playing ? "Pause" : "Play"}
            </button>
            <button
              type="button"
              onClick={() => select((current + 1) % album.tracks.length)}
              className="text-xl text-gold"
              aria-label="Next"
            >
              ›
            </button>
          </div>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={time}
            onChange={(event) => {
              const next = Number(event.target.value);
              setTime(next);
              if (audioRef.current) audioRef.current.currentTime = next;
            }}
            className="mt-3 w-full accent-[#c9a227]"
            disabled={!src}
          />
          <p className="mt-1 text-[10px] text-cream/45">
            {formatTime(time)} / {formatTime(duration)}
          </p>
        </div>

        <ol className="space-y-1">
          {album.tracks.map((item, i) => {
            const active = i === current;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => select(i)}
                  className={`flex w-full items-center gap-3 border px-3 py-2 text-start text-sm transition ${
                    active
                      ? "border-gold/60 bg-gold/10"
                      : "border-white/10 bg-white/5 hover:border-gold/30"
                  }`}
                >
                  <span className="w-6 text-[10px] tracking-[0.16em] text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-cream">{item.title[lang]}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onEnded={() => select((current + 1) % album.tracks.length)}
      />
    </div>
  );
}
