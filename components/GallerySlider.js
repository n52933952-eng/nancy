"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { mediaUrl } from "@/data/media";

function wrapOffset(index, current, total) {
  let offset = index - current;
  const half = Math.floor(total / 2);
  if (offset > half) offset -= total;
  if (offset < -half) offset += total;
  return offset;
}

export default function GallerySlider({ items }) {
  const [current, setCurrent] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const stageRef = useRef(null);
  const wasInView = useRef(false);

  useEffect(() => {
    const section = document.getElementById("gallery") || stageRef.current;
    if (!section) return undefined;

    function startFromFirst() {
      setCurrent(0);
      setInView(true);
      wasInView.current = true;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!wasInView.current) startFromFirst();
          else setInView(true);
          return;
        }
        wasInView.current = false;
        setInView(false);
        setCurrent(0);
      },
      { threshold: 0.28, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(section);

    function onHash() {
      if (window.location.hash === "#gallery") startFromFirst();
    }

    function onGoTo(event) {
      if (event.detail === "gallery") startFromFirst();
    }

    window.addEventListener("hashchange", onHash);
    window.addEventListener("nancy-section", onGoTo);
    const reloaded = performance.getEntriesByType("navigation")[0]?.type === "reload";
    if (!reloaded && window.location.hash === "#gallery") startFromFirst();

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("nancy-section", onGoTo);
    };
  }, []);

  useEffect(() => {
    if (!inView || paused || items.length < 2) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const id = window.setInterval(() => {
      setCurrent((index) => (index + 1) % items.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [inView, paused, items.length]);

  return (
    <div
      ref={stageRef}
      className="gallery-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="gallery-slider-stage">
        <span className="gallery-concert" aria-hidden="true">
          <span className="gallery-concert-spot" />
          <span className="gallery-concert-beam gallery-concert-beam-a" />
          <span className="gallery-concert-beam gallery-concert-beam-b" />
        </span>
        {items.map((item, index) => {
          const offset = wrapOffset(index, current, items.length);
          const visible = Math.abs(offset) <= 2;

          return (
            <button
              key={item.src}
              type="button"
              aria-label={item.alt}
              className={`gallery-slide ${offset === 0 ? "is-front" : "is-side"}`}
              style={{
                "--o": offset,
                "--s": offset === 0 ? 1 : 0.9,
                opacity: visible ? 1 : 0,
                zIndex: 20 - Math.abs(offset),
                pointerEvents: visible ? "auto" : "none",
              }}
              onClick={() => setCurrent(index)}
            >
              <Image
                src={mediaUrl(item.src)}
                alt={item.alt}
                fill
                unoptimized
                quality={100}
                sizes="(max-width: 768px) 70vw, 320px"
                className="object-cover"
                style={{ objectPosition: "center 16%" }}
              />
            </button>
          );
        })}
      </div>

      <div className="gallery-dots">
        {items.map((item, index) => (
          <button
            key={item.src}
            type="button"
            aria-label={item.alt}
            className={index === current ? "is-on" : ""}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
}
