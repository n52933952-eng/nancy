"use client";

import { useEffect, useState } from "react";
import { mediaUrl } from "@/data/media";
import { useContent } from "./ContentProvider";
import { useLang } from "./LanguageProvider";

export default function VideoLightbox({ clip, onClose }) {
  const { lang } = useLang();
  const { copy } = useContent();
  const [ready, setReady] = useState(false);
  const src = clip ? mediaUrl(clip.file) : "";

  useEffect(() => {
    setReady(false);
  }, [src]);

  if (!clip) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-night/92 p-4"
      onClick={onClose}
    >
      <div className="w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
        <div className="mb-3 flex justify-end">
          <button type="button" className="ghost-btn" onClick={onClose}>
            {copy.galleryPage.close[lang]}
          </button>
        </div>
        {src ? (
          <div className="relative aspect-video w-full overflow-hidden bg-black">
            {ready ? null : (
              <p className="absolute inset-0 z-10 flex items-center justify-center text-sm tracking-[0.2em] text-gold uppercase">
                Loading
              </p>
            )}
            <video
              key={src}
              className="h-full w-full bg-black"
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
    </div>
  );
}
