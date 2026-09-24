import ContentHeader from "@/components/ContentHeader";
import Navbar from "@/components/Navbar";
import VideoGrid from "@/components/VideoGrid";

export const metadata = {
  title: "Videos",
  description:
    "Nancy Ajram video clips — watch نانسي عجرم official-style music videos and live moments.",
  alternates: { canonical: "/videos" },
  openGraph: { url: "/videos" },
};

export default function VideosPage() {
  return (
    <>
      <Navbar />
      <main className="pb-20">
        <ContentHeader page="videosPage" className="!pt-24 !pb-5 sm:!pt-28" />
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <VideoGrid />
        </div>
      </main>
    </>
  );
}
