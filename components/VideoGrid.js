"use client";

import Image from "next/image";
import { useState } from "react";
import { copy } from "@/data/i18n";
import { mediaUrl, videos } from "@/data/media";
import { useLang } from "./LanguageProvider";

export default function VideoGrid() {
  const { lang } = useLang();
  const [active, setActive] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((clip) => (
          <button
            key={clip.id}
            type="button"
            onClick={() => setActive(clip)}
            className="group text-start"
          >
            <span className="relative block aspect-video overflow-hidden bg-royal">
              <Image
                src={clip.poster}
                alt={clip.title.en}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-night/25" />
              <span className="absolute start-4 bottom-4 flex h-11 w-11 items-center justify-center rounded-full border border-gold text-gold">
                ▶
              </span>
            </span>
            <span className="mt-3 block font-display text-2xl text-cream">
              {clip.title[lang]}
            </span>
            <span className="text-xs tracking-[0.2em] text-gold uppercase">{clip.year}</span>
          </button>
        ))}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-night/92 p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            {mediaUrl(active.file) ? (
              <video
                className="w-full bg-black"
                src={mediaUrl(active.file)}
                controls
                autoPlay
                poster={active.poster}
              />
            ) : (
              <div className="border border-gold/30 bg-royal p-8 text-center text-cream/80">
                <p className="font-display text-3xl text-gold">{active.title[lang]}</p>
                <p className="mt-4 text-sm">{copy.videosPage.waiting[lang]}</p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
