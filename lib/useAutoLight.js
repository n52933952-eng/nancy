"use client";

import { useEffect, useRef, useState } from "react";

export function useAutoLight(count, extraPause = false) {
  const ref = useRef(null);
  const visibleRef = useRef([]);
  const [visible, setVisible] = useState([]);
  const [lit, setLit] = useState(-1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const tiles = [...root.querySelectorAll("[data-light]")];
    if (!tiles.length) return undefined;

    const seen = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = Number(entry.target.getAttribute("data-light"));
          if (!Number.isFinite(index)) continue;
          seen.set(index, entry.isIntersecting);
        }
        const next = [...seen.entries()]
          .filter(([, on]) => on)
          .map(([index]) => index)
          .sort((a, b) => a - b);
        visibleRef.current = next;
        setVisible(next);
      },
      { threshold: 0.45, rootMargin: "-6% 0px -8% 0px" },
    );

    tiles.forEach((tile) => observer.observe(tile));
    return () => observer.disconnect();
  }, [count]);

  useEffect(() => {
    if (paused || extraPause || visible.length < 1) {
      if (!paused && !extraPause) setLit(-1);
      return undefined;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    setLit((current) => (visible.includes(current) ? current : visible[0]));

    const id = window.setInterval(() => {
      const list = visibleRef.current;
      if (!list.length) return;
      setLit((current) => {
        const pos = list.indexOf(current);
        return list[pos === -1 ? 0 : (pos + 1) % list.length];
      });
    }, 1500);
    return () => window.clearInterval(id);
  }, [paused, extraPause, visible]);

  function bind(index) {
    return {
      "data-light": index,
      onMouseEnter() {
        setPaused(true);
        setLit(index);
      },
      onMouseLeave() {
        setPaused(false);
      },
      onFocus() {
        setPaused(true);
        setLit(index);
      },
      onBlur() {
        setPaused(false);
      },
    };
  }

  return { lit, bind, ref };
}
