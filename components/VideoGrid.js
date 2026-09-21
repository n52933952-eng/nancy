"use client";

import Image from "next/image";
import { useState } from "react";
import VideoLightbox from "@/components/VideoLightbox";
import { mediaUrl } from "@/data/media";
import { youtubePoster } from "@/lib/youtube";
import { useContent } from "./ContentProvider";
import { useLang } from "./LanguageProvider";

export default function VideoGrid() {
  const { lang } = useLang();
  const { videos } = useContent();
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
            <span className="relative block aspect-video overflow-hidden rounded-[18px] bg-royal">
              <Image
                src={mediaUrl(clip.poster) || youtubePoster(clip.youtube)}
                alt={clip.title.en}
                fill
                unoptimized
                quality={100}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                style={{ objectPosition: clip.posterPosition || "center 18%" }}
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

      <VideoLightbox clip={active} onClose={() => setActive(null)} />
    </>
  );
}
