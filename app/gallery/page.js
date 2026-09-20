import ContentHeader from "@/components/ContentHeader";
import GalleryGrid from "@/components/GalleryGrid";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Gallery",
  description:
    "Nancy Ajram photo gallery — portraits and looks of نانسي عجرم in one elegant frame.",
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
