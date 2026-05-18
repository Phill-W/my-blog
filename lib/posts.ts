import fs from "node:fs";
import path from "node:path";
import { cache, type ComponentType } from "react";

import {
  blogPostRegistry,
  type BlogPostRegistryEntry,
} from "@/content/blog";

export type PostTocItem = {
  id: string;
  heading: string;
};

export type PostMetadata = {
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
};

export type Post = PostMetadata & {
  slug: string;
  toc: PostTocItem[];
};

type LoadedPost = {
  entry: BlogPostRegistryEntry;
  post: Post;
};

const POSTS_DIRECTORY = path.join(process.cwd(), "content", "blog");
const postRegistryBySlug = new Map(
  blogPostRegistry.map((entry) => [entry.slug, entry]),
);

export const POSTS_PER_PAGE = 3;

export function slugifyHeading(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u4e00-\u9fa5-]/g, "");
}

function extractTocFromSource(source: string): PostTocItem[] {
  return source
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const heading = line.replace(/^##\s+/, "").trim();

      return {
        id: slugifyHeading(heading),
        heading,
      };
    });
}

function getRegistryEntryBySlug(slug: string): BlogPostRegistryEntry | undefined {
  return postRegistryBySlug.get(slug);
}

function getPostSource(fileName: string): string | undefined {
  const filePath = path.join(POSTS_DIRECTORY, fileName);

  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  return fs.readFileSync(filePath, "utf8");
}

const loadPostBySlug = cache(
  async (slug: string): Promise<LoadedPost | undefined> => {
    const entry = getRegistryEntryBySlug(slug);

    if (!entry) {
      return undefined;
    }

    const source = getPostSource(entry.fileName);

    if (!source) {
      return undefined;
    }

    return {
      entry,
      post: {
        slug,
        ...entry.metadata,
        toc: extractTocFromSource(source),
      },
    };
  },
);

const loadAllPosts = cache(async (): Promise<Post[]> => {
  const loadedPosts = await Promise.all(
    blogPostRegistry.map((entry) => loadPostBySlug(entry.slug)),
  );

  return loadedPosts
    .map((entry) => entry?.post)
    .filter((post): post is Post => Boolean(post))
    .sort((a, b) => b.date.localeCompare(a.date));
});

export function getAllPostSlugs(): string[] {
  return blogPostRegistry.map((entry) => entry.slug);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const loadedPost = await loadPostBySlug(slug);

  return loadedPost?.post;
}

export async function getPostPageData(slug: string): Promise<
  | {
      post: Post;
      Content: ComponentType;
    }
  | undefined
> {
  const loadedPost = await loadPostBySlug(slug);

  if (!loadedPost) {
    return undefined;
  }

  return {
    post: loadedPost.post,
    Content: loadedPost.entry.Content,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  return loadAllPosts();
}

export async function getLatestPosts(limit: number): Promise<Post[]> {
  const posts = await getAllPosts();

  return posts.slice(0, limit);
}

export function getPostHref(slug: string): string {
  return `/blog/${slug}`;
}

export async function getAllPostTags(): Promise<string[]> {
  const tags = new Set<string>();
  const posts = await getAllPosts();

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
  const query = options.query?.trim().toLowerCase();
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

export async function getAdjacentPosts(slug: string): Promise<{
  previousPost?: Post;
  nextPost?: Post;
}> {
  const allPosts = await getAllPosts();
  const currentIndex = allPosts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) {
    return {};
  }

  return {
    previousPost: allPosts[currentIndex - 1],
    nextPost: allPosts[currentIndex + 1],
  };
}
