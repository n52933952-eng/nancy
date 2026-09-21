import { news } from "@/data/media";

export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const routes = ["", "/music", "/videos", "/gallery", "/biography", "/news"];

  return [
    ...routes.map((route) => ({
      url: `${base}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: route === "" ? 1 : 0.8,
    })),
    ...news.map((item) => ({
      url: `${base}/news/${item.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  ];
}
