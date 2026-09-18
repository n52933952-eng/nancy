"use client";

import HeroSlider from "@/components/HeroSlider";
import HomeSections from "@/components/HomeSections";
import Navbar from "@/components/Navbar";

export default function HomeView() {
  return (
    <>
      <Navbar transparent />
      <HeroSlider />
      <HomeSections />
    </>
  );
}
