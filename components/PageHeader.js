"use client";

import { useLang } from "./LanguageProvider";

export default function PageHeader({ kicker, title, subtitle, compact = false }) {
  const { lang } = useLang();

  return (
    <div
      className={
        compact
          ? "mx-auto max-w-7xl px-4 pt-22 pb-4 sm:px-8 sm:pt-24"
          : "mx-auto max-w-7xl px-4 pt-28 pb-10 sm:px-8 sm:pt-32"
      }
    >
      <p
        className={
          compact
            ? "text-[10px] tracking-[0.32em] text-gold uppercase"
            : "text-[11px] tracking-[0.35em] text-gold uppercase"
        }
      >
        {kicker[lang]}
      </p>
      <h1
        className={
          compact
            ? "mt-1.5 font-display text-3xl text-cream sm:text-4xl"
            : "mt-3 font-display text-4xl text-cream sm:text-6xl"
        }
      >
        {title[lang]}
      </h1>
      {subtitle ? (
        <p
          className={
            compact
              ? "mt-2 max-w-xl text-sm leading-6 text-cream/65"
              : "mt-4 max-w-2xl text-base leading-8 text-cream/65"
          }
        >
          {subtitle[lang]}
        </p>
      ) : null}
      <div className={`gold-line-draw ${compact ? "mt-4" : "mt-8"}`} />
    </div>
  );
}
