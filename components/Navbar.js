"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { goToSection, rememberSection } from "@/lib/goToSection";
import { useContent } from "./ContentProvider";
import { useLang } from "./LanguageProvider";

function hrefFor(item) {
  if (item.key === "home" || item.key === "music" || item.key === "gallery" || item.key === "news") {
    return "/";
  }
  return item.href;
}

export default function Navbar({ transparent = false, theme = null }) {
  const { lang, setLang } = useLang();
  const { copy, links } = useContent();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [liveTheme, setLiveTheme] = useState(theme);
  const themeRef = useRef(theme);
  const activeTheme = liveTheme || theme;
  const themed = Boolean(transparent && activeTheme);

  useEffect(() => {
    themeRef.current = theme;
    setLiveTheme((current) =>
      current?.ink === theme?.ink && current?.accent === theme?.accent ? current : theme,
    );
  }, [theme]);

  useEffect(() => {
    if (!transparent) return undefined;
    function onHeroTheme(event) {
      const next = event.detail;
      setLiveTheme((current) =>
        current?.ink === next?.ink && current?.accent === next?.accent ? current : next,
      );
    }
    window.addEventListener("nancy-hero-theme", onHeroTheme);
    return () => window.removeEventListener("nancy-hero-theme", onHeroTheme);
  }, [transparent]);

  function onNavClick(event, item) {
    setOpen(false);

    if (item.key === "home") {
      if (pathname === "/") {
        event.preventDefault();
        goToSection("home");
      }
      return;
    }

    if (item.key === "music" || item.key === "gallery" || item.key === "news") {
      event.preventDefault();
      if (pathname === "/") {
        goToSection(item.key);
        return;
      }
      rememberSection(item.key);
      router.push("/");
      return;
    }

    if (pathname === "/") {
      event.preventDefault();
      goToSection(item.key);
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full max-w-full ${themed ? "nav-on-hero" : ""} ${
          transparent && !themed ? "bg-transparent" : ""
        } ${transparent ? "" : "bg-night/80 backdrop-blur-md"}`}
        data-bar={themed ? activeTheme.bar : undefined}
        style={
          themed
            ? {
                "--nav-ink": activeTheme.ink,
                "--nav-accent": activeTheme.accent,
              }
            : undefined
        }
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-2 pt-[env(safe-area-inset-top)] pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] sm:h-20 sm:pl-8 sm:pr-8">
          <Link
            href="/"
            className="nav-brand min-w-0 shrink"
            onClick={(event) => {
              if (pathname === "/") {
                event.preventDefault();
                setOpen(false);
                goToSection("home");
              } else {
                setOpen(false);
              }
            }}
          >
            <span className="nav-brand-en block truncate font-display text-lg tracking-[0.14em] uppercase sm:text-xl sm:tracking-[0.28em]">
              {copy.mark[lang]}
            </span>
          </Link>

          <nav className="hidden items-center gap-7 xl:flex">
            {links.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.key}
                  href={hrefFor(item)}
                  scroll={false}
                  onClick={(event) => onNavClick(event, item)}
                  className={`nav-link text-[11px] tracking-[0.22em] uppercase ${
                    active ? "nav-link-active" : ""
                  }`}
                >
                  {copy.nav[item.key][lang]}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="nav-lang border px-2.5 py-1 text-[10px] tracking-wide uppercase sm:px-3 sm:tracking-[0.2em]"
              aria-label="Change language"
            >
              {lang === "en" ? "عربي" : "EN"}
            </button>
            <button
              type="button"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 xl:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              <span className={`nav-bar h-px w-5 transition ${open ? "translate-y-1 rotate-45" : ""}`} />
              <span className={`nav-bar h-px w-5 transition ${open ? "opacity-0" : ""}`} />
              <span className={`nav-bar h-px w-5 transition ${open ? "-translate-y-1 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
        <div className={`gold-line ${transparent ? "opacity-0" : "opacity-40"}`} />
      </header>

      {open ? (
        <div className="fixed inset-0 z-40 bg-night/95 pt-24 xl:hidden">
          <nav className="flex flex-col items-center gap-6 px-6">
            {links.map((item) => (
              <Link
                key={item.key}
                href={hrefFor(item)}
                scroll={false}
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
