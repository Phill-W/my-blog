import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Container from "@/components/Container";
import TagList from "@/components/TagList";
import {
  getAdjacentPosts,
  getAllPostSlugs,
  getPostBySlug,
  getPostHref,
  getPostPageData,
} from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "文章未找到 | MyBlog",
      description: "你访问的文章不存在或已被移除。",
    };
  }

  return {
    title: `${post.title} | MyBlog`,
    description: post.description,
    keywords: post.tags,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pageData = await getPostPageData(slug);

  if (!pageData) {
    notFound();
  }

  const { post, Content } = pageData;
  const { previousPost, nextPost } = await getAdjacentPosts(slug);

  return (
    <main className="pb-16">
      <section className="border-b border-border/60 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="space-y-3 text-center sm:text-left">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Blog Detail
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                {post.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readingTime}</span>
              <span>·</span>
              <span>{post.toc.length} 个章节</span>
            </div>

            <TagList tags={post.tags} />
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <article className="space-y-8">
              <div className="aspect-[16/8] rounded-3xl border border-dashed border-border bg-muted/30" />

              <div className="article-content">
                <Content />
              </div>

              <div className="grid gap-4 border-t border-border/60 pt-8 sm:grid-cols-3">
                {previousPost ? (
                  <Link
                    href={getPostHref(previousPost.slug)}
                    className="rounded-2xl border border-border/70 bg-background p-4 transition-colors hover:bg-muted/30"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      上一篇
                    </p>
                    <p className="mt-2 font-medium text-foreground">
                      {previousPost.title}
                    </p>
                  </Link>
                ) : (
                  <div className="rounded-2xl border border-border/40 bg-muted/10 p-4 opacity-50">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      上一篇
                    </p>
                    <p className="mt-2 font-medium text-muted-foreground">
                      已经是最新文章
                    </p>
                  </div>
                )}

                <Link
                  href="/blog"
                  className="flex items-center justify-center rounded-2xl border border-border/70 bg-background p-4 text-sm font-medium text-foreground transition-colors hover:bg-muted/30"
                >
                  返回博客列表
                </Link>

                {nextPost ? (
                  <Link
                    href={getPostHref(nextPost.slug)}
                    className="rounded-2xl border border-border/70 bg-background p-4 text-right transition-colors hover:bg-muted/30"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      下一篇
                    </p>
                    <p className="mt-2 font-medium text-foreground">
                      {nextPost.title}
                    </p>
                  </Link>
                ) : (
                  <div className="rounded-2xl border border-border/40 bg-muted/10 p-4 text-right opacity-50">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      下一篇
                    </p>
                    <p className="mt-2 font-medium text-muted-foreground">
                      已经是最后一篇
                    </p>
                  </div>
                )}
              </div>
            </article>

            <aside className="space-y-6">
              <div className="sticky top-24 rounded-2xl border border-border/70 bg-muted/20 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
                  目录
                </h3>

                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {post.toc.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="transition-colors hover:text-foreground"
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
