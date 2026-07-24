import type { MetadataRoute } from "next";
import { wisp } from "@/src/lib/wisp";

const base = "https://ricethoughts.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/food-reviews`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];

  try {
    const { posts } = await wisp.getPosts({ limit: "all" });
    return [
      ...staticRoutes,
      ...posts.map((post) => ({
        url: `${base}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt ?? post.publishedAt ?? post.createdAt),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    ];
  } catch {
    return staticRoutes;
  }
}
