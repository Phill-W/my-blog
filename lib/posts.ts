import { posts, type Post } from "@/content/posts";

export const POSTS_PER_PAGE = 3;

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

export function getAllPostTags(): string[] {
  const tags = new Set<string>();

  for (const post of posts) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }

  return ["全部", ...Array.from(tags)];
}

export function filterPosts(
  allPosts: Post[],
  options: {
    query?: string;
    tag?: string;
  },
): Post[] {
  const query = options.query?.trim().toLocaleLowerCase();
  const tag = options.tag?.trim();

  return allPosts.filter((post) => {
    const matchesQuery =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.tags.some((item) => item.toLowerCase().includes(query));
    const matchesTag = !tag || tag === "全部" || post.tags.includes(tag);

    return matchesQuery && matchesTag;
  });
}

export function normalizePage(page?: string): number {
  const parsedPage = Number(page);

  if (!Number.isInteger(parsedPage) || parsedPage < 1) {
    return 1;
  }

  return parsedPage;
}

export function paginatePosts(allPosts: Post[], page?: string) {
  const currentPage = normalizePage(page);
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;

  return {
    currentPage: safePage,
    totalPages,
    items: allPosts.slice(startIndex, endIndex),
  };
}
