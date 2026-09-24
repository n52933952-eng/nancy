import NewsView from "@/components/NewsView";

export const metadata = {
  title: { absolute: "Nancy Ajram News | أخبار نانسي عجرم" },
  description:
    "Nancy Ajram news and highlights — latest fan-site notes about نانسي عجرم. أخبار نانسي عجرم.",
  alternates: { canonical: "/news" },
  openGraph: { url: "/news", title: "Nancy Ajram News | أخبار نانسي عجرم" },
};

export default function NewsPage() {
  return <NewsView />;
}
