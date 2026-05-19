import type { MetadataRoute } from "next";

import { getAllPosts, getPostHref } from "@/lib/posts";
import { resolveSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();
  const posts = await getAllPosts();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: resolveSiteUrl("/"),
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: resolveSiteUrl("/blog"),
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: resolveSiteUrl("/projects"),
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: resolveSiteUrl("/about"),
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: resolveSiteUrl(getPostHref(post.slug)),
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...postPages];
}
