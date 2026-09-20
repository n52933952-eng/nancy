"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { mediaUrl } from "@/data/media";
import { useContent } from "./ContentProvider";
import { useLang } from "./LanguageProvider";

const INTERVAL = 3200;

function Letters({ text, className, delay = 0 }) {
  return (
    <span className={className}>
      {Array.from(text).map((char, i) => (
        <span key={`${char}-${i}`} style={{ "--i": i, "--delay": `${delay}ms` }}>
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </span>
  );
}

export default function HeroSlider({ onTheme }) {
  const { lang } = useLang();
  const { slides, copy } = useContent();
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const startX = useRef(0);
  const slide = slides[index] || slides[0];

  const go = useCallback(
    (next) => {
      setIndex((current) => {
        const total = slides.length || 1;
        return (next + total) % total;
      });
      setProgress(0);
    },
    [slides.length],
  );

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
    onTheme?.(slide.theme);
    if (slide.theme) window.dispatchEvent(new CustomEvent("nancy-hero-theme", { detail: slide.theme }));
  }, [onTheme, slide?.theme]);

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
            src={mediaUrl(slide.src)}
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
            src={mediaUrl(slide.src)}
            alt={slide.alt}
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

      <div
        className="hero-copy pointer-events-none relative z-10 flex h-full flex-col justify-end px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-10 sm:pb-20 lg:px-16"
        style={{
          "--slide-ink": slide.theme?.ink,
          "--slide-accent": slide.theme?.accent,
        }}
      >
        <div key={slide.src} className="hero-copy-in">
          <p className="hero-kicker">{copy.unofficial[lang]}</p>
          <h1 className="hero-title">
            <Letters text="Nancy" className="hero-first" />
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
              onClick={() => {
                setIndex(i);
                setProgress(0);
              }}
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
