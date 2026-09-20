import { copy, links } from "@/data/i18n";
import {
  albums,
  biography,
  gallery,
  gallerySlides,
  heroTone,
  homeTheme,
  news,
  slides,
  videos,
} from "@/data/media";

export const defaultContent = {
  copy,
  links,
  slides,
  albums,
  videos,
  gallery,
  gallerySlides,
  news,
  biography,
  homeTheme,
};

function resolveSlide(slide) {
  const theme =
    typeof slide.theme === "string"
      ? heroTone[slide.theme] || heroTone.night
      : slide.theme || heroTone.night;
  return { ...slide, theme };
}

export function mergeLive(live) {
  if (!live || typeof live !== "object" || live.missing) return defaultContent;
  return {
    copy: { ...copy, ...(live.copy || {}) },
    links: live.links?.length ? live.links : links,
    slides: (live.slides || slides).map(resolveSlide),
    albums: live.albums || albums,
    videos: live.videos || videos,
    gallery: live.gallery || gallery,
    gallerySlides: live.gallerySlides || gallerySlides,
    news: live.news || news,
    biography: live.biography || biography,
    homeTheme: live.homeTheme || homeTheme,
  };
}

export async function fetchLiveContent() {
  const base = process.env.NEXT_PUBLIC_CDN_URL;
  if (!base) return null;
  try {
    const response = await fetch(`${base.replace(/\/$/, "")}/content/site.json`, {
      cache: "no-store",
    });
    if (!response.ok) return null;
    const live = await response.json();
    if (!live || live.missing) return null;
    return live;
  } catch {
    return null;
  }
}
