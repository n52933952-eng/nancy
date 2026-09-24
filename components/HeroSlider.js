"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { mediaUrl } from "@/data/media";
import { resolveTone } from "@/data/heroTone";
import { useMotionGate } from "@/lib/useMotionGate";
import { useContent } from "./ContentProvider";
import { useLang } from "./LanguageProvider";

const INTERVAL = 3200;

function Letters({ text, className, delay = 0 }) {
  return (
    <span className={className} dir="ltr">
      {Array.from(text).map((char, i) => (
        <span key={`${char}-${i}`} style={{ "--i": i, "--delay": `${delay}ms` }}>
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </span>
  );
}

function NameHeart() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export default function HeroSlider({ onTheme }) {
  const { lang } = useLang();
  const { slides, copy } = useContent();
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const startX = useRef(0);
  const startedAt = useRef(typeof performance === "undefined" ? 0 : performance.now());
  const frozenElapsed = useRef(0);
  const countRef = useRef(slides.length);
  const { ref: motionRef, active, motion } = useMotionGate(0.2);
  const slide = slides[index] || slides[0];
  const theme = resolveTone(slide?.theme);
  const total = slides.length || 1;
  countRef.current = total;

  const go = useCallback((next) => {
    setIndex((current) => {
      const count = countRef.current || 1;
      return ((typeof next === "number" ? next : current + 1) + count) % count;
    });
    setProgress(0);
    startedAt.current = performance.now();
    frozenElapsed.current = 0;
  }, []);

  useEffect(() => {
    if (!active) {
      frozenElapsed.current = Math.min(
        INTERVAL,
        Math.max(0, performance.now() - startedAt.current),
      );
      return undefined;
    }

    startedAt.current = performance.now() - frozenElapsed.current;
    let frame = 0;
    let lastPaint = 0;
    const tick = (now) => {
      const elapsed = now - startedAt.current;
      if (elapsed >= INTERVAL) {
        startedAt.current = now;
        frozenElapsed.current = 0;
        lastPaint = now;
        setProgress(0);
        setIndex((current) => (current + 1) % (countRef.current || 1));
      } else if (now - lastPaint > 120) {
        lastPaint = now;
        setProgress(Math.min(100, (elapsed / INTERVAL) * 100));
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [active]);

  useEffect(() => {
    onTheme?.(theme);
    window.dispatchEvent(new CustomEvent("nancy-hero-theme", { detail: theme }));
  }, [onTheme, theme.ink, theme.accent, theme.bar]);

  function onTouchStart(event) {
    startX.current = event.changedTouches[0].clientX;
  }

  function onTouchEnd(event) {
    const delta = event.changedTouches[0].clientX - startX.current;
    if (Math.abs(delta) < 50) return;
    go(index + (delta < 0 ? 1 : -1));
  }

  if (!slide) return null;

  return (
    <section
      id="home"
      ref={motionRef}
      data-motion={motion}
      className="relative h-[100svh] min-h-[520px] overflow-hidden bg-night sm:h-dvh sm:min-h-[640px]"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        "--slide-ink": theme.ink,
        "--slide-accent": theme.accent,
      }}
    >
      {slides.map((item, i) => (
          <div
            key={item.src}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={mediaUrl(item.src)}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              quality={100}
              unoptimized
              aria-hidden
              className="scale-110 object-cover blur-2xl"
              style={{ objectPosition: item.position }}
            />
            <div className="absolute inset-0 bg-night/45" />
            <Image
              src={mediaUrl(item.src)}
              alt={item.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              quality={100}
              unoptimized
              className="object-contain"
              style={{ objectPosition: "center center" }}
            />
            {i === index ? (
              <>
                <div className="hero-glow absolute inset-0" />
                <div className="hero-shine absolute inset-0" />
              </>
            ) : null}
          </div>
      ))}

      <div className="hero-veil pointer-events-none absolute inset-0" />
      <div className="hero-studio" aria-hidden="true">
        <span className="hero-halo" />
        <span className="hero-dust">
          {Array.from({ length: 30 }, (_, i) => (
            <i key={i} />
          ))}
        </span>
        <span className="hero-motif hero-motif-1">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </span>
        <span className="hero-motif hero-motif-2">
          <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="6.1" r="3"/><circle cx="17.6" cy="9.6" r="3"/><circle cx="15.5" cy="15.9" r="3"/><circle cx="8.5" cy="15.9" r="3"/><circle cx="6.4" cy="9.6" r="3"/><circle cx="12" cy="12" r="2.15" fill="#fff3c4"/></svg>
        </span>
        <span className="hero-motif hero-motif-3">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </span>
        <span className="hero-motif hero-motif-4">
          <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="6.1" r="3"/><circle cx="17.6" cy="9.6" r="3"/><circle cx="15.5" cy="15.9" r="3"/><circle cx="8.5" cy="15.9" r="3"/><circle cx="6.4" cy="9.6" r="3"/><circle cx="12" cy="12" r="2.15" fill="#fff3c4"/></svg>
        </span>
        <span className="hero-motif hero-motif-5">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </span>
        <span className="hero-motif hero-motif-6">
          <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="6.1" r="3"/><circle cx="17.6" cy="9.6" r="3"/><circle cx="15.5" cy="15.9" r="3"/><circle cx="8.5" cy="15.9" r="3"/><circle cx="6.4" cy="9.6" r="3"/><circle cx="12" cy="12" r="2.15" fill="#fff3c4"/></svg>
        </span>
        <span className="hero-motif hero-motif-across hero-motif-7">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </span>
        <span className="hero-motif hero-motif-across hero-motif-8">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </span>
        <span className="hero-motif hero-motif-9">
          <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="6.1" r="3"/><circle cx="17.6" cy="9.6" r="3"/><circle cx="15.5" cy="15.9" r="3"/><circle cx="8.5" cy="15.9" r="3"/><circle cx="6.4" cy="9.6" r="3"/><circle cx="12" cy="12" r="2.15" fill="#fff3c4"/></svg>
        </span>
      </div>

      <div
        className="hero-copy pointer-events-none relative z-10 flex h-full flex-col justify-end px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-10 sm:pb-20 lg:px-16"
      >
        <div key={slide.src} className="hero-copy-in">
          <p className="hero-kicker">{copy.unofficial[lang]}</p>
          <h1 className="hero-title">
            <span className="hero-name-row">
              <Letters text="Nancy" className="hero-first" />
              <span className="hero-name-hearts" aria-hidden="true">
                <span className="hero-name-heart hero-name-heart-1"><NameHeart /></span>
                <span className="hero-name-heart hero-name-heart-2"><NameHeart /></span>
                <span className="hero-name-heart hero-name-heart-3"><NameHeart /></span>
                <span className="hero-name-heart hero-name-heart-4"><NameHeart /></span>
                <span className="hero-name-heart hero-name-heart-5"><NameHeart /></span>
              </span>
            </span>
            <Letters text="Ajram" className="hero-last" delay={220} />
          </h1>
          <p className="hero-ar">{copy.brandAr}</p>
          <span className="hero-rule" />
          <p className="hero-tag">{copy.tagline[lang]}</p>
          <p className="hero-caption">{slide.caption[lang]}</p>
        </div>

        <div className="pointer-events-auto mt-5 flex flex-wrap items-center gap-2 sm:mt-8 sm:gap-4">
          <Link href="/#music" className="gold-btn hero-btn">
            {copy.listen[lang]}
          </Link>
          <Link href="/videos" className="ghost-btn hero-btn-ghost">
            {copy.watch[lang]}
          </Link>
        </div>

        <div className="pointer-events-auto mt-5 flex items-center gap-1.5 sm:mt-10 sm:gap-2">
          {slides.map((item, i) => (
            <button
              key={item.src}
              type="button"
              aria-label={`Photo ${i + 1}`}
              onClick={() => go(i)}
              className="hero-tick relative h-[2px] flex-1 max-w-16 overflow-hidden"
            >
              <span
                className="hero-tick-fill absolute inset-y-0 start-0"
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
