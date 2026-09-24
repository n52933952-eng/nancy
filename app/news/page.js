import NewsView from "@/components/NewsView";

export const metadata = {
  title: "News",
  description:
    "Nancy Ajram news and highlights — latest notes about نانسي عجرم from a fan site.",
  alternates: { canonical: "/news" },
  openGraph: { url: "/news" },
};

export default function NewsPage() {
  return <NewsView />;
}
