"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import { mediaUrl } from "@/data/media";
import { useContent } from "@/components/ContentProvider";
import { useLang } from "@/components/LanguageProvider";

export default function BioView() {
  const { lang } = useLang();
  const { copy, biography } = useContent();

  return (
    <>
      <Navbar />
      <main className="pb-20">
        <PageHeader kicker={copy.bioPage.kicker} title={copy.bioPage.title} />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="mx-auto w-56 lg:w-full">
            <div className="overflow-hidden rounded-full border border-gold/40 p-1">
              <div className="relative aspect-square overflow-hidden rounded-full">
                <Image
                  src={mediaUrl(biography.portrait)}
                  alt="Nancy Ajram"
                  fill
                  unoptimized
                  quality={100}
                  sizes="280px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div>
            <p className="text-base leading-8 text-cream/80">{biography.intro[lang]}</p>
            <ol className="mt-12 space-y-8 border-s border-gold/30 ps-6">
              {biography.timeline.map((item) => (
                <li key={item.year} className="relative">
                  <span className="absolute top-1.5 -start-[31px] h-3 w-3 rounded-full bg-gold" />
                  <p className="text-xs tracking-[0.25em] text-gold uppercase">{item.year}</p>
                  <h2 className="mt-1 font-display text-2xl text-cream">
                    {item.title[lang]}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-cream/65">{item.text[lang]}</p>
                </li>
              ))}
            </ol>
            <div className="mt-12 border border-gold/25 p-6">
              <h2 className="text-[11px] tracking-[0.3em] text-gold uppercase">
                {copy.bioPage.awards[lang]}
              </h2>
              <p className="mt-3 text-sm leading-7 text-cream/75">{biography.awards[lang]}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
