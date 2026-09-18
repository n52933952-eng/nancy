"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { copy } from "@/data/i18n";
import { homeTheme, mediaUrl, slides } from "@/data/media";
import { getHomeAudio, pauseHome, resumeHome, tryPlay } from "@/lib/homeAudio";
import { useLang } from "./LanguageProvider";

const INTERVAL = 3200;

export default function HeroSlider() {
  const { lang } = useLang();
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const startX = useRef(0);
  const themeUrl = mediaUrl(homeTheme.file);

  const go = useCallback((next) => {
    setIndex((current) => {
      const total = slides.length;
      return (next + total) % total;
    });
    setProgress(0);
  }, []);

  useEffect(() => {
    const started = Date.now();
    const tick = window.setInterval(() => {
      const elapsed = Date.now() - started;
      setProgress(Math.min(100, (elapsed / INTERVAL) * 100));
    }, 80);
    const change = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(change);
    };
  }, [go, index]);

  useEffect(() => {
    const audio = getHomeAudio(themeUrl);
    if (!audio) return undefined;

    const onPlaying = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    tryPlay();

    return () => {
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
    };
  }, [themeUrl]);

  function toggleMute(event) {
    event.preventDefault();
    event.stopPropagation();
    const audio = getHomeAudio(themeUrl);
    if (!audio) return;
    if (!audio.paused) {
      pauseHome();
      setPlaying(false);
      return;
    }
    resumeHome();
  }

  function onTouchStart(event) {
    startX.current = event.changedTouches[0].clientX;
  }

  function onTouchEnd(event) {
    const delta = event.changedTouches[0].clientX - startX.current;
    if (Math.abs(delta) < 50) return;
    go(index + (delta < 0 ? 1 : -1));
  }

  return (
    <section
      id="home"
      className="relative h-[100dvh] min-h-[520px] overflow-hidden bg-night sm:min-h-[640px]"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            quality={100}
            unoptimized
            aria-hidden
            className="scale-110 object-cover blur-2xl"
            style={{ objectPosition: slide.position }}
          />
          <div className="absolute inset-0 bg-night/45" />
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            quality={100}
            unoptimized
            className="object-contain"
            style={{ objectPosition: "center center" }}
          />
        </div>
      ))}

      <div className="hero-veil pointer-events-none absolute inset-0" />

      <div className="pointer-events-none relative z-10 flex h-full flex-col justify-end px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-10 sm:pb-20 lg:px-16">
        <p className="text-[10px] tracking-[0.35em] text-gold uppercase sm:text-[11px] sm:tracking-[0.45em]">
          {copy.unofficial[lang]}
        </p>
        <h1 className="mt-2 font-display text-4xl leading-none text-cream sm:mt-3 sm:text-7xl lg:text-8xl">
          {copy.brandEn}
        </h1>
        <p className="mt-1 font-display text-2xl text-gold-soft sm:mt-2 sm:text-5xl">{copy.brandAr}</p>
        <p className="mt-2 text-xs tracking-[0.2em] text-cream/70 uppercase sm:mt-4 sm:text-base sm:tracking-[0.28em]">
          {copy.tagline[lang]}
        </p>
        <p className="mt-2 text-sm text-gold/90 sm:mt-3">{slides[index].caption[lang]}</p>

        <div className="pointer-events-auto mt-5 flex flex-wrap items-center gap-2 sm:mt-8 sm:gap-4">
          <Link href="/music" className="gold-btn">
            {copy.listen[lang]}
          </Link>
          <Link href="/videos" className="ghost-btn">
            {copy.watch[lang]}
          </Link>
          <button
            type="button"
            data-sound-toggle
            onClick={toggleMute}
            className="ghost-btn"
            aria-label={playing ? copy.mute[lang] : copy.unmute[lang]}
          >
            {playing ? copy.mute[lang] : copy.unmute[lang]}
          </button>
        </div>

        <div className="pointer-events-auto mt-5 flex items-center gap-1.5 sm:mt-10 sm:gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Photo ${i + 1}`}
              onClick={() => {
                setIndex(i);
                setProgress(0);
              }}
              className="relative h-[2px] flex-1 max-w-16 overflow-hidden bg-white/20"
            >
              <span
                className="absolute inset-y-0 start-0 bg-gold"
                style={{
                  width: i < index ? "100%" : i === index ? `${progress}%` : "0%",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
