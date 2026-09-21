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
  const albumId = searchParams.get("album");
  const [album, setAlbum] = useState(null);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const stageRef = useRef(null);
  const graphRef = useRef(null);
  const track = album?.tracks?.[current];
  const src = track ? mediaUrl(track.file) : "";
  const cover = track?.cover || album?.cover;
  const coverPosition = track?.coverPosition || album?.coverPosition || "center 22%";

  useEffect(() => {
    if (!albumId) {
      router.replace("/");
      return;
    }
    const next = albums.find((item) => item.id === albumId) || null;
    if (!next) {
      router.replace("/");
      return;
    }
    setAlbum(next);
  }, [albumId, albums, router]);

  useEffect(() => {
    setCurrent(0);
    setPlaying(false);
    setTime(0);
    setDuration(0);
  }, [albumId]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    if (audio.dataset.src !== src) {
      audio.src = src || "";
      audio.dataset.src = src || "";
      setTime(0);
      setDuration(0);
    }

    if (playing && src) {
      pauseHome();
      const start = () => {
        audio.play().catch(() => setPlaying(false));
      };
      if (audio.readyState >= 2) start();
      else audio.addEventListener("canplay", start, { once: true });
      return () => audio.removeEventListener("canplay", start);
    }

    audio.pause();
    return undefined;
  }, [playing, src]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!playing) {
      stage?.style.setProperty("--beat", "0");
      return undefined;
    }

    let frame = 0;
    let floor = 0;
    let peak = 0;

    function graph() {
      const audio = audioRef.current;
      if (!audio || graphRef.current === "off") return null;
      if (graphRef.current) return graphRef.current;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) {
        graphRef.current = "off";
        return null;
      }
      try {
        const ctx = new AudioCtx();
        const source = ctx.createMediaElementSource(audio);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.18;
        source.connect(analyser);
        analyser.connect(ctx.destination);
        graphRef.current = {
          ctx,
          analyser,
          data: new Uint8Array(analyser.frequencyBinCount),
        };
        return graphRef.current;
      } catch {
        graphRef.current = "off";
        return null;
      }
    }

    function tick() {
      const node = graph();
      if (node?.ctx.state === "suspended") node.ctx.resume().catch(() => {});
      let beat = 0;
      if (node) {
        node.analyser.getByteFrequencyData(node.data);
        let bass = 0;
        let loud = 0;
        for (let i = 1; i < 10; i += 1) bass += node.data[i];
        for (let i = 0; i < node.data.length; i += 1) loud = Math.max(loud, node.data[i]);
        bass /= 9 * 255;
        if (loud < 6) {
          beat = 0.5 + 0.5 * Math.sin(performance.now() / 170);
        } else {
          floor = floor * 0.9 + bass * 0.1;
          const hit = Math.max(0, bass - floor * 0.62);
          peak = Math.max(hit * 3.4, peak * 0.68);
          beat = Math.min(1, peak);
        }
      } else {
        beat = 0.5 + 0.5 * Math.sin(performance.now() / 170);
      }
      stage?.style.setProperty("--beat", beat.toFixed(3));
      frame = window.requestAnimationFrame(tick);
    }

    frame = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frame);
      stage?.style.setProperty("--beat", "0");
    };
  }, [playing]);

  function select(i) {
    if (!album) return;
    const next = album.tracks[i];
    const hasFile = Boolean(mediaUrl(next?.file));
    if (i !== current) setCurrent(i);
    setPlaying(hasFile);
  }

  if (!album) return null;

  return (
    <div ref={stageRef} className="music-stage mx-auto max-w-7xl px-4 pt-20 sm:px-8">
      <div className="grid items-start gap-5 sm:grid-cols-[260px_minmax(0,1fr)]">
        <div>
          <div className="news-shot mx-auto w-full max-w-[200px] sm:max-w-none">
            <div className="photo-tile relative aspect-[3/4] overflow-hidden">
              <Image
                src={mediaUrl(cover)}
                alt={track ? track.title.en : album.title.en}
                fill
                unoptimized
                quality={100}
                sizes="260px"
                className="object-cover"
                style={{ objectPosition: coverPosition }}
              />
              <span className="news-shot-light" />
            </div>
          </div>
          <h1 className="news-title mt-3 font-display text-2xl">{album.title[lang]}</h1>
          <p className="news-date mt-1 truncate text-xs">
            {track ? track.title[lang] : ""} · {album.year}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => select((current - 1 + album.tracks.length) % album.tracks.length)}
              className="music-skip"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => {
                if (!src) return;
                setPlaying((value) => !value);
              }}
              className={`music-play ${playing ? "is-on" : ""}`}
            >
              {playing ? "Pause" : "Play"}
            </button>
            <button
              type="button"
              onClick={() => select((current + 1) % album.tracks.length)}
              className="music-skip"
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
            className="music-range mt-3 w-full"
            disabled={!src}
          />
          <p className="news-date mt-1 text-[10px]">
            {formatTime(time)} / {formatTime(duration)}
          </p>
        </div>

        <ol className="music-list">
          {album.tracks.map((item, i) => {
            const active = i === current;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => select(i)}
                  className={`music-track ${active ? "is-on" : ""}`}
                >
                  <span className="music-track-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`music-track-name ${active ? "news-title" : ""}`}>
                    {item.title[lang]}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <audio
        ref={audioRef}
        crossOrigin="anonymous"
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onEnded={() => select((current + 1) % album.tracks.length)}
      />
    </div>
  );
}
