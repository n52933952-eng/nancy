"use client";

import { useEffect, useState } from "react";
import HeroSlider from "@/components/HeroSlider";
import HomeSections from "@/components/HomeSections";
import Navbar from "@/components/Navbar";
import { useContent } from "./ContentProvider";

let homeBootstrapped = false;

export default function HomeView() {
  const { slides } = useContent();
  const [theme, setTheme] = useState(slides[0]?.theme);
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    if (slides[0]?.theme) setTheme(slides[0].theme);
  }, [slides]);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    if (!homeBootstrapped) {
      homeBootstrapped = true;
      const navType = performance.getEntriesByType("navigation")[0]?.type;
      if (navType === "reload") {
        history.replaceState(null, "", window.location.pathname || "/");
        window.scrollTo(0, 0);
      }
    }

    const hero = document.getElementById("home");
    if (!hero) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { threshold: 0.28 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar transparent={overHero} theme={overHero ? theme : null} />
      <HeroSlider onTheme={setTheme} />
      <HomeSections />
    </>
  );
}
