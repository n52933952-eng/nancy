import NewsArticle from "@/components/NewsArticle";
import { news } from "@/data/media";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = news.find((entry) => entry.id === id);
  const path = `/news/${id}`;
  return {
    title: item?.title?.en || "News",
    description: item?.excerpt?.en || "Nancy Ajram news.",
    alternates: { canonical: path },
    openGraph: { url: path },
  };
}

export default function NewsArticlePage() {
  return <NewsArticle />;
}
