import { copy, links } from "@/data/i18n";
import { resolveTone } from "@/data/heroTone";
import {
  albums,
  biography,
  gallery,
  gallerySlides,
  homeTheme,
  news,
  slides,
  videos,
} from "@/data/media";
import { youtubeId } from "@/lib/youtube";

function titleKey(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}]+/gu, "")
    .replace(/(.)\1+/g, "$1");
}

function titlesMatch(a, b) {
  const left = titleKey(a);
  const right = titleKey(b);
  if (!left || !right) return false;
  if (left === right) return true;
  return left.length >= 8 && right.length >= 8 && (left.includes(right) || right.includes(left));
}

function matchByTitle(list, item) {
  return list.find((entry) =>
    [item?.id, item?.title?.en, item?.title?.ar].some(
      (value) =>
        titlesMatch(value, entry.id) || titlesMatch(value, entry.title?.en) || titlesMatch(value, entry.title?.ar),
    ),
  );
}

function clipKey(clip) {
  return youtubeId(clip?.youtube) || titleKey(clip?.title?.en) || titleKey(clip?.title?.ar) || clip?.id;
}

function uniqueClips(list) {
  const seen = new Set();
  return list.filter((clip) => {
    if (!youtubeId(clip?.youtube)) return false;
    const keys = [youtubeId(clip.youtube), titleKey(clip.title?.en), titleKey(clip.title?.ar)].filter(Boolean);
    if (keys.some((key) => seen.has(key))) return false;
    keys.forEach((key) => seen.add(key));
    return true;
  });
}

export const defaultContent = {
  copy,
  links,
  slides: slides.map(resolveSlide),
  albums,
  videos,
  gallery,
  gallerySlides,
  news,
  biography,
  homeTheme,
};

function resolveSlide(slide) {
  return { ...slide, theme: resolveTone(slide.theme) };
}

function withYoutube(track) {
  return Boolean(youtubeId(track?.youtube));
}

function mergeAlbums(liveAlbums) {
  const source = liveAlbums?.length ? liveAlbums : albums;
  return source
    .map((live) => {
      const base = albums.find((item) => item.id === live.id);
      const tracks = (live.tracks || base?.tracks || [])
        .map((track) => {
          const fallback = base?.tracks?.find((item) => item.id === track.id) || matchByTitle(base?.tracks || [], track);
          return {
            ...fallback,
            ...track,
            title: fallback?.title || track.title,
            youtube: track.youtube || fallback?.youtube || "",
          };
        })
        .filter(withYoutube);

      if (!tracks.length) return null;
      return { ...base, ...live, title: base?.title || live.title, tracks };
    })
    .filter(Boolean);
}

function mergeVideos(liveVideos) {
  const source = liveVideos?.length ? liveVideos : videos;
  const merged = source.map((live) => {
    const pinned = videos.find((item) => item.id === live.id && /^clip-[123]$/.test(item.id));
    const base = pinned || videos.find((item) => item.id === live.id) || matchByTitle(videos, live);
    const generic = /official clip|كليب\s*[١٢٣123]/i.test(`${live.title?.en || ""} ${live.title?.ar || ""}`);
    return {
      ...base,
      ...live,
      title: pinned?.title || (generic && base?.title ? base.title : live.title || base?.title),
      youtube: pinned?.youtube || youtubeId(live.youtube) || base?.youtube || "",
      poster: live.poster || base?.poster || "",
    };
  });

  for (const clip of videos) {
    if (!merged.some((item) => clipKey(item) === clipKey(clip) || titlesMatch(item.title?.en, clip.title?.en))) {
      merged.push(clip);
    }
  }

  const unique = uniqueClips(merged);
  const first = videos[0];
  const current = unique.findIndex((clip) => youtubeId(clip.youtube) === youtubeId(first.youtube));
  if (current > 0) {
    const [clip] = unique.splice(current, 1);
    unique.unshift({ ...clip, title: first.title, youtube: first.youtube, poster: clip.poster || first.poster });
  } else if (current === -1) {
    unique.unshift(first);
  } else {
    unique[0] = { ...unique[0], title: first.title, youtube: first.youtube, poster: unique[0].poster || first.poster };
  }

  return uniqueClips(unique);
}

export function mergeLive(live) {
  if (!live || typeof live !== "object" || live.missing) return defaultContent;
  return {
    copy: { ...copy, ...(live.copy || {}) },
    links: live.links?.length ? live.links : links,
    slides: (live.slides || slides).map(resolveSlide),
    albums: mergeAlbums(live.albums),
    videos: mergeVideos(live.videos),
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
