"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AlbumGrid from "@/components/AlbumGrid";
import GallerySlider from "@/components/GallerySlider";
import NewsStrip from "@/components/NewsStrip";
import VideoLightbox from "@/components/VideoLightbox";
import { mediaUrl } from "@/data/media";
import { clearRememberedSection, goToSection, peekRememberedSection } from "@/lib/goToSection";
import { useContent } from "./ContentProvider";
import { useLang } from "./LanguageProvider";

function Reveal({ children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`section-reveal transition-opacity duration-700 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function SectionHead({ kicker, title, href, compact = false }) {
  const { lang } = useLang();
  const { copy } = useContent();
  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between ${
        compact ? "mb-4" : "mb-8 sm:mb-10"
      }`}
    >
      <div>
        <p
          className={`tracking-[0.35em] text-gold uppercase ${
            compact ? "text-[10px]" : "text-[11px]"
          }`}
        >
          {kicker[lang]}
        </p>
        <h2
          className={`section-title mt-1.5 font-display text-cream ${
            compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-5xl"
          }`}
        >
          {title[lang]}
        </h2>
        <div className={`gold-line-draw ${compact ? "mt-2" : "mt-4"}`} />
      </div>
      {href ? (
        <Link href={href} className="gold-btn relative z-20 w-fit shrink-0">
          {copy.explore[lang]}
        </Link>
      ) : null}
    </div>
  );
}

export default function HomeSections() {
  const { lang } = useLang();
  const { copy, biography, gallerySlides, news, videos } = useContent();
  const [activeClip, setActiveClip] = useState(null);

  useEffect(() => {
    const remembered = peekRememberedSection();
    const hash = window.location.hash.replace("#", "");
    const key = remembered || (hash && hash !== "home" ? hash : "");
    if (!key) return undefined;

    const timer = window.setTimeout(() => {
      goToSection(key);
      clearRememberedSection();
    }, 250);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div>
      <section id="music" className="band-gold page-section">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-3 sm:px-8">
          <Reveal>
            <SectionHead compact kicker={copy.musicPage.kicker} title={copy.musicPage.title} />
            <AlbumGrid compact />
          </Reveal>
        </div>
      </section>

      <section id="gallery" className="band-gold page-section">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-5 sm:px-8">
          <Reveal>
            <SectionHead
              compact
              kicker={copy.galleryPage.kicker}
              title={copy.galleryPage.title}
              href="/gallery"
            />
          </Reveal>
          <GallerySlider items={gallerySlides} />
        </div>
      </section>

      <section id="videos" className="band-plum page-section">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-5 sm:px-8">
          <Reveal>
            <SectionHead compact kicker={copy.videosPage.kicker} title={copy.videosPage.title} href="/videos" />
            <div className="videos-stage grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {videos.slice(0, 3).map((clip) => (
                <button
                  key={clip.id}
                  type="button"
                  onClick={() => setActiveClip(clip)}
                  className="group touch-pan-y text-start"
                >
                  <span className="photo-tile relative block aspect-video">
                    <Image
                      src={mediaUrl(clip.poster)}
                      alt={clip.title.en}
                      fill
                      unoptimized
                      quality={100}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="photo-shot object-cover"
                      style={{ objectPosition: clip.posterPosition || "center 18%" }}
                    />
                    <span className="absolute inset-0 bg-night/20" />
                    <span className="play-pulse absolute start-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-full border border-gold text-gold">
                      ▶
                    </span>
                  </span>
                  <span className="mt-3 block font-display text-xl text-cream">
                    {clip.title[lang]}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>
        <VideoLightbox clip={activeClip} onClose={() => setActiveClip(null)} />
      </section>

      <section id="biography" className="band-plum page-section">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
          <Reveal>
            <SectionHead kicker={copy.bioPage.kicker} title={copy.bioPage.title} href="/biography" />
            <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-center">
              <div className="mx-auto w-48 overflow-hidden rounded-full border border-gold/40 p-1 lg:w-full">
                <div className="relative aspect-square overflow-hidden rounded-full">
                  <Image
                    src={mediaUrl(biography.portrait)}
                    alt="Nancy Ajram"
                    fill
                    unoptimized
                    quality={100}
                    sizes="240px"
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="max-w-2xl text-base leading-8 text-cream/75">{biography.intro[lang]}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="news" className="band-gold page-section">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
          <Reveal>
            <SectionHead kicker={copy.newsPage.kicker} title={copy.newsPage.title} href="/news" />
            <NewsStrip items={news} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
