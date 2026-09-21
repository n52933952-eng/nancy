"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { youtubeId } from "@/lib/youtube";
import { useContent } from "./ContentProvider";
import { useLang } from "./LanguageProvider";

export default function VideoLightbox({ clip, onClose }) {
  const { lang } = useLang();
  const { copy } = useContent();
  const [mounted, setMounted] = useState(false);
  const video = clip ? youtubeId(clip.youtube) : "";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!clip) return undefined;

    const { overflow: htmlOverflow } = document.documentElement.style;
    const { overflow: bodyOverflow } = document.body.style;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    function onKey(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [clip, onClose]);

  if (!clip || !mounted) return null;

  return createPortal(
    <div className="video-lightbox" onClick={onClose}>
      <div className="video-lightbox-frame" onClick={(event) => event.stopPropagation()}>
        <div className="mb-3 flex justify-end">
          <button type="button" className="ghost-btn" onClick={onClose}>
            {copy.galleryPage.close[lang]}
          </button>
        </div>
        {video ? (
          <div className="video-lightbox-stage">
            <iframe
              key={video}
              title={clip.title[lang]}
              src={`https://www.youtube-nocookie.com/embed/${video}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="border border-gold/30 bg-royal p-8 text-center text-cream/80">
            <p className="font-display text-3xl text-gold">{clip.title[lang]}</p>
            <p className="mt-4 text-sm">{copy.videosPage.waiting[lang]}</p>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
