import NewsArticle from "@/components/NewsArticle";
import { news } from "@/data/media";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = news.find((entry) => entry.id === id);
  return {
    title: item?.title?.en || "News",
    description: item?.excerpt?.en || "Nancy Ajram news.",
  };
}

export default function NewsArticlePage() {
  return <NewsArticle />;
}
