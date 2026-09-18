"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AlbumGrid from "@/components/AlbumGrid";
import { copy } from "@/data/i18n";
import { biography, gallery, news, videos } from "@/data/media";
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
      className={`transition duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function SectionHead({ kicker, title, href }) {
  const { lang } = useLang();
  return (
    <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[11px] tracking-[0.35em] text-gold uppercase">{kicker[lang]}</p>
        <h2 className="mt-2 font-display text-3xl text-cream sm:text-5xl">{title[lang]}</h2>
      </div>
      <Link href={href} className="gold-btn w-fit">
        {copy.explore[lang]}
      </Link>
    </div>
  );
}

export default function HomeSections() {
  const { lang } = useLang();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return undefined;
    const timer = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="bg-night">
      <section id="music" className="page-section mx-auto max-w-7xl px-4 py-20 sm:px-8">
        <Reveal>
          <SectionHead kicker={copy.musicPage.kicker} title={copy.musicPage.title} href="/music" />
          <AlbumGrid />
        </Reveal>
      </section>

      <section id="videos" className="page-section mx-auto max-w-7xl px-4 py-20 sm:px-8">
        <Reveal>
          <SectionHead kicker={copy.videosPage.kicker} title={copy.videosPage.title} href="/videos" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((clip) => (
              <Link key={clip.id} href="/videos" className="group">
                <span className="relative block aspect-video overflow-hidden bg-royal">
                  <Image
                    src={clip.poster}
                    alt={clip.title.en}
                    fill
                    unoptimized
                    quality={100}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <span className="absolute inset-0 bg-night/20" />
                  <span className="absolute start-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-full border border-gold text-gold">
                    ▶
                  </span>
                </span>
                <span className="mt-3 block font-display text-xl text-cream">
                  {clip.title[lang]}
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="gallery" className="page-section mx-auto max-w-7xl px-4 py-20 sm:px-8">
        <Reveal>
          <SectionHead kicker={copy.galleryPage.kicker} title={copy.galleryPage.title} href="/gallery" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {gallery.slice(0, 6).map((item) => (
              <Link key={item.src} href="/gallery" className="group relative aspect-[3/4] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  unoptimized
                  quality={100}
                  sizes="(max-width: 640px) 50vw, 16vw"
                  className="object-cover"
                  style={{ objectPosition: "center 18%" }}
                />
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="biography" className="page-section mx-auto max-w-7xl px-4 py-20 sm:px-8">
        <Reveal>
          <SectionHead kicker={copy.bioPage.kicker} title={copy.bioPage.title} href="/biography" />
          <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-center">
            <div className="mx-auto w-48 overflow-hidden rounded-full border border-gold/40 p-1 lg:w-full">
              <div className="relative aspect-square overflow-hidden rounded-full">
                <Image
                  src={biography.portrait}
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
      </section>

      <section id="news" className="page-section mx-auto max-w-7xl px-4 py-20 sm:px-8">
        <Reveal>
          <SectionHead kicker={copy.newsPage.kicker} title={copy.newsPage.title} href="/news" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <Link key={item.id} href="/news" className="overflow-hidden border border-gold/20 bg-royal">
                <span className="relative block aspect-[16/10]">
                  <Image
                    src={item.image}
                    alt={item.title.en}
                    fill
                    unoptimized
                    quality={100}
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                    style={{ objectPosition: "center 25%" }}
                  />
                </span>
                <span className="block p-5">
                  <span className="block text-[11px] tracking-[0.2em] text-gold uppercase">
                    {item.date}
                  </span>
                  <span className="mt-2 block font-display text-2xl text-cream">
                    {item.title[lang]}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
