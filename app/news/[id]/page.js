import NewsArticle from "@/components/NewsArticle";
import { news } from "@/data/media";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = news.find((entry) => entry.id === id);
  const path = `/news/${id}`;
  const title = item
    ? `${item.title.en} | ${item.title.ar}`
    : "Nancy Ajram News | أخبار نانسي عجرم";
  return {
    title: { absolute: title },
    description: item?.excerpt?.en || "Nancy Ajram news | أخبار نانسي عجرم.",
    alternates: { canonical: path },
    openGraph: { url: path, title },
  };
}

export default function NewsArticlePage() {
  return <NewsArticle />;
}
