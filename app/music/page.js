import { Suspense } from "react";
import MusicPlayer from "@/components/MusicPlayer";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Music",
  description:
    "Nancy Ajram albums — آه ونص, يا طبطب and more. Listen to نانسي عجرم.",
  alternates: { canonical: "/music" },
  openGraph: { url: "/music" },
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
