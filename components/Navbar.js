"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { copy, links } from "@/data/i18n";
import { useLang } from "./LanguageProvider";

function hrefFor(item) {
  if (item.key === "home") return "/";
  return `/#${item.key}`;
}

function scrollToSection(key) {
  if (key === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", "/");
    return;
  }
  const el = document.getElementById(key);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `/#${key}`);
  }
}

export default function Navbar({ transparent = false }) {
  const { lang, setLang } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function onNavClick(event, item) {
    if (pathname !== "/") return;
    event.preventDefault();
    setOpen(false);
    scrollToSection(item.key);
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 ${
          transparent ? "bg-transparent" : "bg-night/80 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 pt-[env(safe-area-inset-top)] sm:h-20 sm:px-8">
          <Link
            href="/"
            className="flex items-baseline gap-2"
            onClick={(event) => {
              if (pathname === "/") {
                event.preventDefault();
                setOpen(false);
                scrollToSection("home");
              } else {
                setOpen(false);
              }
            }}
          >
            <span className="font-display text-lg tracking-[0.28em] text-gold uppercase sm:text-xl">
              Nancy
            </span>
            <span className="hidden text-sm text-gold-soft/80 sm:inline">عجرم</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.key}
                  href={hrefFor(item)}
                  onClick={(event) => onNavClick(event, item)}
                  className={`text-[11px] tracking-[0.22em] uppercase transition ${
                    active ? "text-gold" : "text-cream/75 hover:text-gold"
                  }`}
                >
                  {copy.nav[item.key][lang]}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="border border-gold/40 px-3 py-1 text-[10px] tracking-[0.2em] text-gold uppercase"
              aria-label="Change language"
            >
              {lang === "en" ? "عربي" : "EN"}
            </button>
            <button
              type="button"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              <span className={`h-px w-5 bg-gold transition ${open ? "translate-y-1 rotate-45" : ""}`} />
              <span className={`h-px w-5 bg-gold transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-px w-5 bg-gold transition ${open ? "-translate-y-1 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
        <div className="gold-line opacity-40" />
      </header>

      {open ? (
        <div className="fixed inset-0 z-40 bg-night/95 pt-24 lg:hidden">
          <nav className="flex flex-col items-center gap-6 px-6">
            {links.map((item) => (
              <Link
                key={item.key}
                href={hrefFor(item)}
                onClick={(event) => onNavClick(event, item)}
                className="font-display text-3xl text-cream"
              >
                {copy.nav[item.key][lang]}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  );
}
