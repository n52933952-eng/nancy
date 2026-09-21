"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { mediaUrl } from "@/data/media";
import { useContent } from "./ContentProvider";
import { useLang } from "./LanguageProvider";

export default function VideoLightbox({ clip, onClose }) {
  const { lang } = useLang();
  const { copy } = useContent();
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const src = clip ? mediaUrl(clip.file) : "";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setReady(false);
  }, [src]);

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
        {src ? (
          <div className="video-lightbox-stage">
            {ready ? null : (
              <p className="absolute inset-0 z-10 flex items-center justify-center text-sm tracking-[0.2em] text-gold uppercase">
                Loading
              </p>
            )}
            <video
              key={src}
              src={src}
              controls
              autoPlay
              playsInline
              preload="auto"
              onPlaying={() => setReady(true)}
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
