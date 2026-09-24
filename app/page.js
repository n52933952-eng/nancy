import HomeView from "@/components/HomeView";

export const metadata = {
  title: { absolute: "Nancy Ajram (Nancy) | نانسي عجرم — Queen of Arab Pop" },
  description:
    "Nancy Ajram — Nancy — نانسي عجرم. Lebanese Arab pop icon. Music, Ah W Noss, videos, gallery and biography.",
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function Home() {
  return <HomeView />;
}
