"use client";

import Image from "next/image";
import Link from "next/link";
import { albums } from "@/data/media";
import { useLang } from "./LanguageProvider";

export default function AlbumGrid({ onSelect }) {
  const { lang } = useLang();

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
      {albums.map((album) => {
        const content = (
          <>
            <span className="relative block aspect-square overflow-hidden bg-royal">
              <Image
                src={album.cover}
                alt={album.title.en}
                fill
                unoptimized
                quality={100}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
                className="object-cover"
                style={{ objectPosition: "center 20%" }}
              />
            </span>
            <span className="mt-2 block font-display text-base text-cream sm:mt-3 sm:text-2xl">
              {album.title[lang]}
            </span>
            <span className="text-xs tracking-[0.16em] text-gold uppercase">{album.year}</span>
          </>
        );

        if (onSelect) {
          return (
            <button
              key={album.id}
              type="button"
              onClick={() => onSelect(album)}
              className="group text-start"
            >
              {content}
            </button>
          );
        }

        return (
          <Link key={album.id} href={`/music?album=${album.id}`} className="group text-start">
            {content}
          </Link>
        );
      })}
    </div>
  );
}
