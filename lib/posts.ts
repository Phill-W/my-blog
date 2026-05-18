import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

export type PostTocItem = {
  id: string;
  heading: string;
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  content: string;
  toc: PostTocItem[];
};

type PostFrontmatter = Omit<Post, "slug" | "content" | "toc">;

const POSTS_DIRECTORY = path.join(process.cwd(), "content", "blog");

export const POSTS_PER_PAGE = 3;

export function slugifyHeading(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u4e00-\u9fa5-]/g, "");
}

function extractToc(content: string): PostTocItem[] {
  return content
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

function normalizeFrontmatterDate(date: unknown): string {
  if (typeof date === "string") {
    return date;
  }

  if (date instanceof Date) {
    return date.toISOString().slice(0, 10);
  }

  return String(date ?? "");
}

function readPostFile(slug: string): Post | undefined {
  const filePath = path.join(POSTS_DIRECTORY, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  const frontmatter = data as PostFrontmatter;

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: normalizeFrontmatterDate(frontmatter.date),
    readingTime: frontmatter.readingTime,
    tags: frontmatter.tags ?? [],
    content: content.trim(),
    toc: extractToc(content),
  };
}

export function getAllPosts(): Post[] {
  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""))
    .map((slug) => readPostFile(slug))
    .filter((post): post is Post => Boolean(post))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getLatestPosts(limit: number): Post[] {
  return getAllPosts().slice(0, limit);
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export function getPostBySlug(slug: string): Post | undefined {
  return readPostFile(slug);
}

export function getPostHref(slug: string): string {
  return `/blog/${slug}`;
}

export function getAllPostTags(): string[] {
  const tags = new Set<string>();

  for (const post of getAllPosts()) {
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

export function getAdjacentPosts(slug: string): {
  previousPost?: Post;
  nextPost?: Post;
} {
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) {
    return {};
  }

  return {
    previousPost: allPosts[currentIndex - 1],
    nextPost: allPosts[currentIndex + 1],
  };
}
