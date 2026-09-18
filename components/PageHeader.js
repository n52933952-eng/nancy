"use client";

import { useLang } from "./LanguageProvider";

export default function PageHeader({ kicker, title, subtitle }) {
  const { lang } = useLang();

  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 pb-10 sm:px-8 sm:pt-32">
      <p className="text-[11px] tracking-[0.35em] text-gold uppercase">
        {kicker[lang]}
      </p>
      <h1 className="mt-3 font-display text-4xl text-cream sm:text-6xl">{title[lang]}</h1>
      {subtitle ? (
        <p className="mt-4 max-w-2xl text-base leading-8 text-cream/65">{subtitle[lang]}</p>
      ) : null}
      <div className="mt-8 h-px w-24 bg-gold/70" />
    </div>
  );
}
