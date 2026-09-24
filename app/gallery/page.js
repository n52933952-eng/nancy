import ContentHeader from "@/components/ContentHeader";
import GalleryGrid from "@/components/GalleryGrid";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: { absolute: "Nancy Ajram Photos | صور نانسي عجرم" },
  description:
    "Nancy Ajram photo gallery — portraits, stage looks and photos of نانسي عجرم. صور نانسي عجرم.",
  alternates: { canonical: "/gallery" },
  openGraph: { url: "/gallery", title: "Nancy Ajram Photos | صور نانسي عجرم" },
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="band-gold pb-20">
        <ContentHeader page="galleryPage" compact />
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <GalleryGrid />
        </div>
      </main>
    </>
  );
}
