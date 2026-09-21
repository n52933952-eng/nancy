"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import { NewsCard } from "@/components/NewsStrip";
import { useContent } from "@/components/ContentProvider";

export default function NewsView() {
  const { copy, news } = useContent();

  return (
    <>
      <Navbar />
      <main className="pb-20">
        <PageHeader {...copy.newsPage} />
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
          {news.map((item) => (
            <NewsCard key={item.id} item={item} excerpt />
          ))}
        </div>
      </main>
    </>
  );
}
