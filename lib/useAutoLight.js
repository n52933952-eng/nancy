"use client";

import { useEffect, useRef, useState } from "react";

export function useAutoLight(count, extraPause = false) {
  const ref = useRef(null);
  const wasInView = useRef(false);
  const [inView, setInView] = useState(false);
  const [lit, setLit] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setLit(0);
  }, [count]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        if (visible && !wasInView.current) setLit(0);
        if (!visible) setLit(0);
        wasInView.current = visible;
        setInView(visible);
      },
      { threshold: 0.01, rootMargin: "80px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused || extraPause || count < 2) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const id = window.setInterval(() => {
      setLit((index) => (index + 1) % count);
    }, 1500);
    return () => window.clearInterval(id);
  }, [inView, paused, extraPause, count]);

  function bind(index) {
    return {
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

  return { lit: inView ? lit : -1, bind, ref };
}
