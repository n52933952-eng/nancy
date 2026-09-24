"use client";

import { useEffect, useRef, useState } from "react";

export function useMotionGate(threshold = 0.14) {
  const ref = useRef(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold, rootMargin: "48px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, active, motion: active ? "on" : "off" };
}
