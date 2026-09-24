"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mediaUrl } from "@/data/media";
import { pauseHome } from "@/lib/homeAudio";
import { useMotionGate } from "@/lib/useMotionGate";
import { loadYouTubeApi, youtubeId } from "@/lib/youtube";
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
  const { albums, copy } = useContent();
  const router = useRouter();
  const searchParams = useSearchParams();
  const albumId = searchParams.get("album");
  const [album, setAlbum] = useState(null);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const hostRef = useRef(null);
  const playerRef = useRef(null);
  const { ref: stageRef, active, motion } = useMotionGate(0.12);
  const track = album?.tracks?.[current];
  const video = youtubeId(track?.youtube);
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
    setReady(false);
  }, [albumId]);

  useEffect(() => {
    let cancelled = false;
    playerRef.current = null;
    setReady(false);
    setTime(0);
    setDuration(0);

    if (!video) return undefined;

    loadYouTubeApi().then((YT) => {
      if (cancelled || !hostRef.current || !YT?.Player) return;
      playerRef.current = new YT.Player(hostRef.current, {
        videoId: video,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady(event) {
            setReady(true);
            setDuration(event.target.getDuration() || 0);
            if (playing) {
              pauseHome();
              event.target.playVideo();
            }
          },
          onStateChange(event) {
            if (event.data === YT.PlayerState.ENDED && album) {
              const next = (current + 1) % album.tracks.length;
              const nextVideo = youtubeId(album.tracks[next]?.youtube);
              setCurrent(next);
              setPlaying(Boolean(nextVideo));
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy?.();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
    };
  }, [video]);

  useEffect(() => {
    const player = playerRef.current;
    if (!ready || !player?.playVideo) return;
    if (playing && video) {
      pauseHome();
      player.playVideo();
    } else {
      player.pauseVideo?.();
    }
  }, [playing, ready, video]);

  useEffect(() => {
    if (!playing || !ready) {
      stageRef.current?.style.setProperty("--beat", "0");
      return undefined;
    }
    if (!active) return undefined;

    const clock = window.setInterval(() => {
      const player = playerRef.current;
      if (!player?.getCurrentTime) return;
      setTime(player.getCurrentTime() || 0);
      setDuration(player.getDuration() || 0);
    }, 250);

    let frame = 0;
    function tick() {
      const beat = 0.5 + 0.5 * Math.sin(performance.now() / 170);
      stageRef.current?.style.setProperty("--beat", beat.toFixed(3));
      frame = window.requestAnimationFrame(tick);
    }
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.clearInterval(clock);
      window.cancelAnimationFrame(frame);
      stageRef.current?.style.setProperty("--beat", "0");
    };
  }, [playing, ready, active]);

  function select(i) {
    if (!album) return;
    const nextVideo = youtubeId(album.tracks[i]?.youtube);
    if (i !== current) setCurrent(i);
    setPlaying(Boolean(nextVideo));
  }

  if (!album) return null;

  return (
    <div ref={stageRef} data-motion={motion} className="music-stage mx-auto max-w-7xl px-4 pt-20 sm:px-8">
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
              {video ? (
                <div className={`music-yt ${playing ? "is-on" : ""}`} key={video}>
                  <div ref={hostRef} />
                </div>
              ) : null}
            </div>
          </div>
          <h1 className="news-title mt-3 font-display text-2xl">{album.title[lang]}</h1>
          <p className="news-date mt-1 truncate text-xs">
            {track ? track.title[lang] : ""} · {album.year}
          </p>
          {!video ? (
            <p className="mt-2 text-sm text-cream/60">{copy.musicPage.waiting[lang]}</p>
          ) : null}
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
                if (!video) return;
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
              playerRef.current?.seekTo?.(next, true);
            }}
            className="music-range mt-3 w-full"
            disabled={!video}
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
    </div>
  );
}
