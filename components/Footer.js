"use client";

import Link from "next/link";
import { useContent } from "./ContentProvider";
import { useLang } from "./LanguageProvider";

export default function Footer() {
  const { lang } = useLang();
  const { copy, links } = useContent();

  return (
    <footer className="band-plum border-t border-gold/20">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-8 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="font-display text-2xl tracking-[0.08em] text-gold uppercase sm:tracking-[0.2em]">
            {copy.brandEn}
          </p>
          <p className="mt-1 text-lg text-gold-soft">{copy.brandAr}</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-cream/60">
            {copy.footer.rights[lang]}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-cream/60">
            {copy.footer.credit?.[lang] || (lang === "ar" ? "طوّره نيما، من محبي نانسي." : "Developed by Neyma, a Nancy fan.")}{" "}
            <a
              href={`mailto:${copy.footer.email || "n52933952@gmail.com"}`}
              className="text-gold hover:text-gold-soft"
            >
              {copy.footer.email || "n52933952@gmail.com"}
            </a>
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
