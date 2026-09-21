"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { mediaUrl } from "@/data/media";
import { useContent } from "@/components/ContentProvider";
import { useLang } from "@/components/LanguageProvider";

export default function NewsArticle() {
  const { lang } = useLang();
  const { news } = useContent();
  const params = useParams();
  const router = useRouter();
  const id = decodeURIComponent(String(params?.id || ""));
  const item = news.find((entry) => entry.id === id);

  useEffect(() => {
    if (!id || news.length === 0) return;
    if (!item) router.replace("/news");
  }, [id, item, news.length, router]);

  if (!item) return <Navbar />;

  const body = item.body?.[lang] || item.excerpt?.[lang] || "";

  return (
    <>
      <Navbar />
      <main className="pb-24">
        <article className="news-story mx-auto max-w-3xl px-4 pt-22 sm:px-8 sm:pt-24">
          <h1 className="news-title font-display text-3xl sm:text-4xl">{item.title[lang]}</h1>
          <div className="gold-line news-rule mt-3" />
          <div className="news-shot mt-5">
            <div className="photo-tile relative aspect-[16/10] overflow-hidden">
              <Image
                src={mediaUrl(item.image)}
                alt={item.title.en}
                fill
                unoptimized
                quality={100}
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                style={{ objectPosition: "center 25%" }}
              />
              <span className="news-shot-light" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night/70 to-transparent" />
              <p className="news-date absolute start-5 bottom-5 z-10 text-[11px] tracking-[0.28em] uppercase">
                {item.date}
              </p>
            </div>
          </div>
          {body ? (
            <p className="news-body mt-8 max-w-2xl whitespace-pre-wrap text-base leading-8">{body}</p>
          ) : null}
        </article>
      </main>
    </>
  );
}
