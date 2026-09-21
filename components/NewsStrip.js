"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { mediaUrl } from "@/data/media";
import { useLang } from "./LanguageProvider";

export function NewsCard({ item, excerpt = false }) {
  const { lang } = useLang();

  return (
    <Link href={`/news/${item.id}`} className="news-card group">
      <span className="news-shot block">
        <span className="photo-tile relative block aspect-[16/10]">
          <Image
            src={mediaUrl(item.image)}
            alt={item.title.en}
            fill
            unoptimized
            quality={100}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="photo-shot object-cover"
            style={{ objectPosition: "center 25%" }}
          />
          <span className="news-shot-light" />
        </span>
      </span>
      <span className="block p-5">
        <span className="news-date block text-[11px] tracking-[0.12em] uppercase">{item.date}</span>
        <span className="news-title mt-2 block font-display text-xl leading-snug sm:text-2xl">{item.title[lang]}</span>
        {excerpt ? (
          <span className="news-body mt-3 block text-sm leading-7">{item.excerpt[lang]}</span>
        ) : null}
      </span>
    </Link>
  );
}

export default function NewsStrip({ items }) {
  const { lang } = useLang();
  const [visible, setVisible] = useState(1);
  const [start, setStart] = useState(0);

  useEffect(() => {
    function measure() {
      const width = window.innerWidth;
      setVisible(width >= 1024 ? 3 : width >= 640 ? 2 : 1);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const maxStart = Math.max(0, items.length - visible);
  const index = Math.min(start, maxStart);
  const canPrev = index > 0;
  const canNext = index < maxStart;
  const rtl = lang === "ar";

  useEffect(() => {
    setStart((current) => Math.min(current, maxStart));
  }, [maxStart]);

  return (
    <div className="news-strip">
      <div className="news-viewport">
        <div
          className="news-track"
          style={{
            "--vis": visible,
            transform: `translate3d(calc(${rtl ? "" : "-"}1 * ${index} * (100% + 1.5rem) / ${visible}), 0, 0)`,
          }}
        >
          {items.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      {canPrev ? (
        <button
          type="button"
          className="news-arrow news-arrow-prev"
          aria-label={lang === "ar" ? "السابق" : "Previous news"}
          onClick={() => setStart((current) => Math.max(0, current - 1))}
        >
          <span aria-hidden="true">{rtl ? "→" : "←"}</span>
        </button>
      ) : null}
      {canNext ? (
        <button
          type="button"
          className="news-arrow news-arrow-next"
          aria-label={lang === "ar" ? "التالي" : "More news"}
          onClick={() => setStart((current) => Math.min(maxStart, current + 1))}
        >
          <span aria-hidden="true">{rtl ? "←" : "→"}</span>
        </button>
      ) : null}
    </div>
  );
}
