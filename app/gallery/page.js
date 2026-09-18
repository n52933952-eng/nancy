import GalleryGrid from "@/components/GalleryGrid";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import { copy } from "@/data/i18n";

export const metadata = {
  title: "Gallery",
  description:
    "Nancy Ajram photo gallery — portraits and looks of نانسي عجرم in one elegant frame.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="pb-20">
        <PageHeader {...copy.galleryPage} />
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <GalleryGrid />
        </div>
      </main>
    </>
  );
}
