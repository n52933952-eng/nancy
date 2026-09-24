import ContentHeader from "@/components/ContentHeader";
import Navbar from "@/components/Navbar";
import VideoGrid from "@/components/VideoGrid";

export const metadata = {
  title: { absolute: "Nancy Ajram Music Videos | كليبات نانسي عجرم" },
  description:
    "Watch Nancy Ajram music videos and clips — Shhadi Ya Deni, Aala Shanak, Tegy Nenbeset and more. كليبات نانسي عجرم.",
  alternates: { canonical: "/videos" },
  openGraph: { url: "/videos", title: "Nancy Ajram Music Videos | كليبات نانسي عجرم" },
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
