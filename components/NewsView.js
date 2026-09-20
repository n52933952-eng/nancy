"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import { mediaUrl } from "@/data/media";
import { useContent } from "@/components/ContentProvider";
import { useLang } from "@/components/LanguageProvider";

export default function NewsView() {
  const { lang } = useLang();
  const { copy, news } = useContent();

  return (
    <>
      <Navbar />
      <main className="pb-20">
        <PageHeader {...copy.newsPage} />
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
          {news.map((item) => (
            <article key={item.id} className="overflow-hidden border border-gold/20 bg-royal">
              <div className="relative aspect-[16/10]">
                <Image
                  src={mediaUrl(item.image)}
                  alt={item.title.en}
                  fill
                  unoptimized
                  quality={100}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                  style={{ objectPosition: "center 25%" }}
                />
              </div>
              <div className="p-5">
                <p className="text-[11px] tracking-[0.2em] text-gold uppercase">{item.date}</p>
                <h2 className="mt-2 font-display text-2xl text-cream">{item.title[lang]}</h2>
                <p className="mt-3 text-sm leading-7 text-cream/65">{item.excerpt[lang]}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
