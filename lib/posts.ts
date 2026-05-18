import { posts, type Post } from "@/content/posts";

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getLatestPosts(limit: number): Post[] {
  return getAllPosts().slice(0, limit);
}

export function getAllPostSlugs(): string[] {
  return posts.map((post) => post.slug);
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getPostHref(slug: string): string {
  return `/blog/${slug}`;
}
