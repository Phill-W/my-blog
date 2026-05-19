import { describe, expect, it } from "vitest";

import type { Post } from "@/lib/posts";
import {
  filterPosts,
  getAdjacentPosts,
  getAllPostTags,
  getAllPosts,
  paginatePosts,
  slugifyHeading,
} from "@/lib/posts";

function createPost(overrides: Partial<Post> = {}): Post {
  return {
    slug: "post-1",
    title: "示例文章",
    description: "示例描述",
    date: "2026-05-01",
    readingTime: "5 分钟阅读",
    tags: ["React"],
    cover: undefined,
    toc: [],
    ...overrides,
  };
}

describe("slugifyHeading", () => {
  it("会把中文标题转换为稳定锚点", () => {
    expect(slugifyHeading("一、为什么我会认真学 Next.js")).toBe(
      "一为什么我会认真学-nextjs",
    );
  });

  it("会把英文标题转换为连字符形式", () => {
    expect(slugifyHeading("How to Learn Next.js")).toBe(
      "how-to-learn-nextjs",
    );
  });

  it("会去掉多余标点", () => {
    expect(slugifyHeading("What is React State?")).toBe("what-is-react-state");
  });

  it("对相同输入会返回相同结果", () => {
    expect(slugifyHeading("Next.js Layout Tips")).toBe(
      slugifyHeading("Next.js Layout Tips"),
    );
  });
});

describe("filterPosts", () => {
  it("会保留文章 metadata 里的封面字段", async () => {
    const posts = await getAllPosts();
    const targetPost = posts.find((post) => post.slug === "learn-nextjs");

    expect(targetPost?.cover).toEqual({
      src: "/images/my-blog-cover.png",
      alt: "个人博客首页界面截图",
      caption: "基于 Next.js 构建个人博客时的页面效果。",
    });
  });

  it("不传筛选条件时会返回全部文章", async () => {
    const posts = await getAllPosts();

    expect(filterPosts(posts, {})).toHaveLength(posts.length);
  });

  it("会按标题或标签中的 query 过滤文章", async () => {
    const posts = await getAllPosts();
    const results = filterPosts(posts, { query: "Next.js" });

    expect(results.length).toBeGreaterThan(0);
    expect(results.some((post) => post.slug === "learn-nextjs")).toBe(true);
  });

  it("会去掉 query 前后的空格", async () => {
    const posts = await getAllPosts();

    expect(filterPosts(posts, { query: "  Next.js  " })).toEqual(
      filterPosts(posts, { query: "Next.js" }),
    );
  });

  it("会按标签过滤，并支持全部标签不过滤", async () => {
    const posts = await getAllPosts();
    const [allTag] = await getAllPostTags();
    const reactResults = filterPosts(posts, { tag: "React" });

    expect(reactResults.length).toBeGreaterThan(0);
    expect(reactResults.every((post) => post.tags.includes("React"))).toBe(
      true,
    );
    expect(filterPosts(posts, { tag: allTag })).toHaveLength(posts.length);
  });

  it("会同时满足 query 和 tag 条件", async () => {
    const posts = await getAllPosts();
    const results = filterPosts(posts, {
      query: "Next.js",
      tag: "React",
    });

    expect(results.length).toBeGreaterThan(0);
    expect(
      results.every(
        (post) =>
          (post.title.toLowerCase().includes("next.js") ||
            post.description.toLowerCase().includes("next.js") ||
            post.tags.some((tag) => tag.toLowerCase().includes("next.js"))) &&
          post.tags.includes("React"),
      ),
    ).toBe(true);
  });
});

describe("paginatePosts", () => {
  const posts = [
    createPost({ slug: "post-1" }),
    createPost({ slug: "post-2", title: "文章 2" }),
    createPost({ slug: "post-3", title: "文章 3" }),
    createPost({ slug: "post-4", title: "文章 4" }),
  ];

  it("默认返回第一页数据", () => {
    const result = paginatePosts(posts);

    expect(result.currentPage).toBe(1);
    expect(result.totalPages).toBe(2);
    expect(result.items.map((post) => post.slug)).toEqual([
      "post-1",
      "post-2",
      "post-3",
    ]);
  });

  it("会返回指定页码的数据切片", () => {
    const result = paginatePosts(posts, "2");

    expect(result.currentPage).toBe(2);
    expect(result.items.map((post) => post.slug)).toEqual(["post-4"]);
  });

  it("页码非法时会回退到第一页", () => {
    expect(paginatePosts(posts, "0").currentPage).toBe(1);
    expect(paginatePosts(posts, "-1").currentPage).toBe(1);
    expect(paginatePosts(posts, "abc").currentPage).toBe(1);
  });

  it("页码超过总页数时会钳制到最后一页", () => {
    const result = paginatePosts(posts, "9");

    expect(result.currentPage).toBe(2);
    expect(result.items.map((post) => post.slug)).toEqual(["post-4"]);
  });

  it("数据不足一页时 totalPages 仍然是 1", () => {
    const result = paginatePosts(posts.slice(0, 2), "3");

    expect(result.totalPages).toBe(1);
    expect(result.currentPage).toBe(1);
    expect(result.items).toHaveLength(2);
  });
});

describe("getAdjacentPosts", () => {
  it("中间文章会同时返回上一篇和下一篇", async () => {
    const posts = await getAllPosts();
    const middleIndex = Math.floor(posts.length / 2);
    const middlePost = posts[middleIndex];
    const adjacent = await getAdjacentPosts(middlePost.slug);

    expect(adjacent.previousPost?.slug).toBe(posts[middleIndex - 1]?.slug);
    expect(adjacent.nextPost?.slug).toBe(posts[middleIndex + 1]?.slug);
  });

  it("最新文章没有上一篇", async () => {
    const posts = await getAllPosts();
    const latestPost = posts[0];
    const adjacent = await getAdjacentPosts(latestPost.slug);

    expect(adjacent.previousPost).toBeUndefined();
    expect(adjacent.nextPost?.slug).toBe(posts[1]?.slug);
  });

  it("最后一篇文章没有下一篇", async () => {
    const posts = await getAllPosts();
    const lastPost = posts.at(-1);

    if (!lastPost) {
      throw new Error("测试数据中至少需要一篇文章");
    }

    const adjacent = await getAdjacentPosts(lastPost.slug);

    expect(adjacent.previousPost?.slug).toBe(posts.at(-2)?.slug);
    expect(adjacent.nextPost).toBeUndefined();
  });

  it("找不到文章时会返回空对象", async () => {
    await expect(getAdjacentPosts("missing-post")).resolves.toEqual({});
  });
});
