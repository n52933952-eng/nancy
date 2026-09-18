"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { copy } from "@/data/i18n";
import { gallery } from "@/data/media";
import { useLang } from "./LanguageProvider";

export default function GalleryGrid() {
  const { lang } = useLang();
  const years = useMemo(
    () => ["all", ...Array.from(new Set(gallery.map((item) => String(item.year))))],
    [],
  );
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(null);
  const items = gallery.filter((item) => filter === "all" || String(item.year) === filter);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {years.map((year) => (
          <button
            key={year}
            type="button"
            onClick={() => setFilter(year)}
            className={`px-4 py-2 text-[11px] tracking-[0.2em] uppercase ${
              filter === year ? "bg-gold text-night" : "border border-gold/30 text-gold"
            }`}
          >
            {year === "all" ? copy.galleryPage.all[lang] : year}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setOpen(item)}
            className="group relative aspect-[3/4] overflow-hidden bg-royal"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-700 group-hover:scale-105"
              style={{ objectPosition: "center 18%" }}
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night to-transparent p-4 text-start text-xs tracking-[0.2em] text-gold uppercase">
              {item.year} · {item.album}
            </span>
          </button>
        ))}
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-night/90 p-4"
          onClick={() => setOpen(null)}
        >
          <div className="relative h-[85dvh] w-full max-w-4xl">
            <Image
              src={open.src}
              alt={open.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
