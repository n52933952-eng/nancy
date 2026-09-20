"use client";

import Image from "next/image";
import Link from "next/link";
import { mediaUrl } from "@/data/media";
import { useAutoLight } from "@/lib/useAutoLight";
import { useContent } from "./ContentProvider";
import { useLang } from "./LanguageProvider";

export default function AlbumGrid({ onSelect, compact = false }) {
  const { lang } = useLang();
  const { albums } = useContent();
  const { lit, bind, ref } = useAutoLight(albums.length);

  return (
    <div ref={ref} className={`photo-stage ${compact ? "mx-auto max-w-3xl" : ""}`}>
      <div
        className={`relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 ${
          compact ? "gap-2.5 sm:gap-3" : "gap-3 sm:gap-4 lg:gap-5"
        }`}
      >
        {albums.map((album, index) => {
          const content = (
            <>
              <span className="photo-tile relative block aspect-square">
                <Image
                  src={mediaUrl(album.cover)}
                  alt={album.title.en}
                  fill
                  unoptimized
                  quality={100}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
                  className="photo-shot object-cover"
                  style={{
                    objectPosition: album.coverPosition || "center 22%",
                    transform: `scale(${album.coverScale || 1})`,
                  }}
                />
                <span className="photo-tile-veil" />
                <span className="photo-corners" />
                <span className="absolute top-2 start-2 z-10 font-display text-[10px] tracking-[0.16em] text-gold/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </span>
              <span className={`mt-1.5 block ${compact ? "min-h-[2.1rem]" : "min-h-[2.6rem]"}`}>
                <span className="block text-[9px] tracking-[0.2em] text-gold/80 uppercase">
                  {album.year}
                </span>
                <span
                  className={`mt-0.5 block truncate font-display text-cream ${
                    compact ? "text-sm" : "text-base sm:text-lg"
                  }`}
                >
                  {album.title[lang]}
                </span>
              </span>
            </>
          );

          if (onSelect) {
            return (
              <button
                key={album.id}
                type="button"
                onClick={() => onSelect(album)}
                className={`tile-in group text-start ${lit === index ? "is-lit" : ""}`}
                style={{ "--d": `${index * 70}ms` }}
                {...bind(index)}
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={album.id}
              href={`/music?album=${album.id}`}
              className={`tile-in group text-start ${lit === index ? "is-lit" : ""}`}
              style={{ "--d": `${index * 70}ms` }}
              {...bind(index)}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
