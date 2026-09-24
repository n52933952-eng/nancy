"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { mediaUrl } from "@/data/media";
import { useAutoLight } from "@/lib/useAutoLight";
import { useContent } from "./ContentProvider";
import { useLang } from "./LanguageProvider";

function Shot({ item, index, lit, bind, onOpen, className = "", sizes }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={`tile-in group atelier-tile ${className} ${lit === index ? "is-lit" : ""}`}
      style={{ "--d": `${index * 40}ms` }}
      {...bind(index)}
    >
      <Image
        src={mediaUrl(item.src)}
        alt={item.alt}
        fill
        unoptimized
        quality={100}
        sizes={sizes}
        className="object-cover"
        style={{ objectPosition: item.objectPosition || "center 18%" }}
      />
      <span className="atelier-tile-shine" />
      <span className="photo-corners" />
      <span className="atelier-index">{String(index + 1).padStart(2, "0")}</span>
    </button>
  );
}

export default function GalleryGrid() {
  const { lang } = useLang();
  const { copy, gallery } = useContent();
  const [open, setOpen] = useState(null);
  const { lit, bind, ref } = useAutoLight(gallery.length, Boolean(open));
  const stripRef = useRef(null);
  const openIndex = open ? gallery.findIndex((item) => item.src === open.src) : -1;

  useEffect(() => {
    if (!open) return undefined;

    function onKey(event) {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowRight") setOpen(gallery[(openIndex + 1) % gallery.length]);
      if (event.key === "ArrowLeft") {
        setOpen(gallery[(openIndex - 1 + gallery.length) % gallery.length]);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, openIndex]);

  useEffect(() => {
    if (openIndex < 0 || !stripRef.current) return;
    const active = stripRef.current.querySelector("[data-active='true']");
    active?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [openIndex]);

  const shot = (index, className, sizes) => {
    const item = gallery[index];
    if (!item) return null;
    return (
      <Shot
        key={item.src}
        item={item}
        index={index}
        lit={lit}
        bind={bind}
        onOpen={setOpen}
        className={className}
        sizes={sizes}
      />
    );
  };

  return (
    <>
      <div ref={ref} className="magazine">
        <div className="magazine-cover">
          {shot(0, "is-cover", "(max-width: 768px) 100vw, 55vw")}
          <div className="magazine-stack">
            {shot(1, "", "(max-width: 768px) 50vw, 28vw")}
            {shot(2, "", "(max-width: 768px) 50vw, 28vw")}
          </div>
        </div>

        <p className="magazine-kicker">{copy.galleryPage.pageEvening[lang]}</p>
        <div className="magazine-row">{[3, 4, 5, 6].map((i) => shot(i, "", "25vw"))}</div>

        <div className="magazine-duo">
          {shot(7, "is-feature", "(max-width: 768px) 100vw, 55vw")}
          <div className="magazine-stack">
            {shot(8, "", "28vw")}
            {shot(9, "", "28vw")}
          </div>
        </div>

        <div className="magazine-row">{[10, 11, 12].map((i) => shot(i, "", "33vw"))}</div>

        <blockquote className="magazine-quote">
          <span className="gold-line-draw mb-5" />
          {copy.galleryPage.quote[lang]}
        </blockquote>

        <p className="magazine-kicker">{copy.galleryPage.pageSoft[lang]}</p>
        <div className="magazine-row">{[13, 14, 15, 16].map((i) => shot(i, "", "25vw"))}</div>

        <div className="magazine-duo">
          {shot(20, "is-feature", "(max-width: 768px) 100vw, 55vw")}
          <div className="magazine-stack">
            {shot(18, "", "28vw")}
            {shot(19, "", "28vw")}
          </div>
        </div>

        <div className="magazine-row">{[21, 22, 23, 24, 25].map((i) => shot(i, "", "20vw"))}</div>
      </div>

      {open ? (
        <div className="atelier-theater" onClick={() => setOpen(null)}>
          <div className="atelier-theater-stage" onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-sm tracking-[0.28em] text-gold">
                {String(openIndex + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
              </p>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="text-[11px] tracking-[0.2em] text-gold uppercase"
              >
                {copy.galleryPage.close[lang]}
              </button>
            </div>

            <div className="relative mx-auto aspect-[3/4] w-full max-h-[68dvh] max-w-xl">
              <Image
                src={mediaUrl(open.src)}
                alt={open.alt}
                fill
                unoptimized
                quality={100}
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <div className="mt-4 flex items-center justify-center gap-8">
              <button
                type="button"
                className="text-[11px] tracking-[0.2em] text-gold uppercase"
                onClick={() => setOpen(gallery[(openIndex - 1 + gallery.length) % gallery.length])}
              >
                ←
              </button>
              <button
                type="button"
                className="text-[11px] tracking-[0.2em] text-gold uppercase"
                onClick={() => setOpen(gallery[(openIndex + 1) % gallery.length])}
              >
                →
              </button>
            </div>

            <div ref={stripRef} className="atelier-strip">
              {gallery.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  data-active={index === openIndex}
                  className={`atelier-strip-item ${index === openIndex ? "is-on" : ""}`}
                  onClick={() => setOpen(item)}
                >
                  <Image
                    src={mediaUrl(item.src)}
                    alt=""
                    fill
                    unoptimized
                    quality={100}
                    sizes="72px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
