import { Suspense } from "react";
import MusicPlayer from "@/components/MusicPlayer";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: { absolute: "Nancy Ajram Songs and Albums | أغاني نانسي عجرم" },
  description:
    "Nancy Ajram songs and albums — Ah W Noss, Ya Tabtab, Ya Kather and more. Listen to أغاني نانسي عجرم.",
  alternates: { canonical: "/music" },
  openGraph: { url: "/music", title: "Nancy Ajram Songs and Albums | أغاني نانسي عجرم" },
};

export default function MusicPage() {
  return (
    <>
      <Navbar />
      <main className="band-gold pb-16">
        <Suspense>
          <MusicPlayer />
        </Suspense>
      </main>
    </>
  );
}
