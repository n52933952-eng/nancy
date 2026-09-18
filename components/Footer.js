"use client";

import Link from "next/link";
import { copy, links } from "@/data/i18n";
import { useLang } from "./LanguageProvider";

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="border-t border-gold/20 bg-night">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-8 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="font-display text-2xl tracking-[0.2em] text-gold uppercase">
            {copy.brandEn}
          </p>
          <p className="mt-1 text-lg text-gold-soft">{copy.brandAr}</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-cream/60">
            {copy.footer.rights[lang]}
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm text-cream/70">
          {links.map((item) => (
            <Link key={item.key} href={item.href} className="hover:text-gold">
              {copy.nav[item.key][lang]}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
