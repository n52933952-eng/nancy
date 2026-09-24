import HomeView from "@/components/HomeView";

export const metadata = {
  title: { absolute: "Nancy Ajram | نانسي عجرم — Songs, Videos & Biography" },
  description:
    "Nancy Ajram (نانسي عجرم) fan site. Listen to her songs, watch music videos, browse photos, and read her biography.",
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: "Nancy Ajram | نانسي عجرم — Songs, Videos & Biography" },
};

export default function Home() {
  return <HomeView />;
}
