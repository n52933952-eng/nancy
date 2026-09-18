import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import VideoGrid from "@/components/VideoGrid";
import { copy } from "@/data/i18n";

export const metadata = {
  title: "Videos",
  description:
    "Nancy Ajram video clips — watch نانسي عجرم official-style music videos and live moments.",
};

export default function VideosPage() {
  return (
    <>
      <Navbar />
      <main className="pb-20">
        <PageHeader {...copy.videosPage} />
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <VideoGrid />
        </div>
      </main>
    </>
  );
}
