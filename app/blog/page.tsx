import Link from "next/link";

import Container from "@/components/Container";
import PostCard from "@/components/PostCard";
import SectionHeading from "@/components/SectionHeading";
import {
  filterPosts,
  getAllPostTags,
  getAllPosts,
  getPostHref,
  paginatePosts,
} from "@/lib/posts";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BlogPageProps = {
  searchParams: Promise<{
    q?: string;
    tag?: string;
    page?: string;
  }>;
};

function buildBlogUrl({
  q,
  tag,
  page,
}: {
  q?: string;
  tag?: string;
  page?: number;
}) {
  const params = new URLSearchParams();

  if (q) {
    params.set("q", q);
  }

  if (tag && tag !== "全部") {
    params.set("tag", tag);
  }

  if (page && page > 1) {
    params.set("page", String(page));
  }

  const queryString = params.toString();

  return queryString ? `/blog?${queryString}` : "/blog";
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;

  const query = resolvedSearchParams.q?.trim() ?? "";
  const selectedTag = resolvedSearchParams.tag?.trim() ?? "全部";
  const allPosts = getAllPosts();
  const allTags = getAllPostTags();
  const filteredPosts = filterPosts(allPosts, {
    query,
    tag: selectedTag,
  });
  const { currentPage, totalPages, items } = paginatePosts(
    filteredPosts,
    resolvedSearchParams.page,
  );

  return (
    <main className="pb-16">
      <section className="border-b border-border/60 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Blog
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              博客文章
            </h1>
            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              记录我的学习过程、项目实践和前端思考。
            </p>
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <div className="space-y-6 rounded-2xl border border-border/70 bg-muted/20 p-5 sm:p-6">
            <form
              action="/blog"
              method="get"
              className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_160px]"
            >
              <div className="space-y-2">
                <label
                  htmlFor="search-posts"
                  className="text-sm font-medium text-foreground"
                >
                  搜索文章
                </label>
                <input
                  id="search-posts"
                  name="q"
                  type="text"
                  defaultValue={query}
                  placeholder="搜索标题、描述或标签..."
                  className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
                />
              </div>

              <div className="flex items-end">
                {selectedTag !== "全部" ? (
                  <input type="hidden" name="tag" value={selectedTag} />
                ) : null}

                <button
                  type="submit"
                  className={cn(
                    buttonVariants({ variant: "default", size: "default" }),
                    "w-full",
                  )}
                >
                  开始搜索
                </button>
              </div>
            </form>

            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">标签筛选</p>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => {
                  const isActive = selectedTag === tag;

                  return (
                    <Link
                      key={tag}
                      href={buildBlogUrl({
                        q: query || undefined,
                        tag,
                        page: 1,
                      })}
                      className={cn(
                        buttonVariants({
                          variant: isActive ? "default" : "outline",
                          size: "sm",
                        }),
                        "rounded-full",
                      )}
                    >
                      {tag}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-6">
        <Container>
          <SectionHeading
            title="全部文章"
            description={`当前筛选后共 ${filteredPosts.length} 篇文章`}
          />

          {items.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {items.map((post) => (
                <PostCard
                  key={post.slug}
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  tags={post.tags}
                  href={getPostHref(post.slug)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border/70 bg-muted/20 p-8 text-center">
              <h2 className="text-xl font-semibold text-foreground">
                没有找到匹配的文章
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                你可以尝试更短的关键词，或者切换到其他标签。
              </p>
              <Link
                href="/blog"
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "mt-6",
                )}
              >
                查看全部文章
              </Link>
            </div>
          )}
        </Container>
      </section>

      <section className="pt-10">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={buildBlogUrl({
                q: query || undefined,
                tag: selectedTag,
                page: currentPage - 1,
              })}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                currentPage === 1 ? "pointer-events-none opacity-50" : "",
              )}
            >
              上一页
            </Link>

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              const isActive = page === currentPage;

              return (
                <Link
                  key={page}
                  href={buildBlogUrl({
                    q: query || undefined,
                    tag: selectedTag,
                    page,
                  })}
                  className={cn(
                    buttonVariants({
                      variant: isActive ? "default" : "outline",
                      size: "sm",
                    }),
                  )}
                >
                  {page}
                </Link>
              );
            })}

            <Link
              href={buildBlogUrl({
                q: query || undefined,
                tag: selectedTag,
                page: currentPage + 1,
              })}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "",
              )}
            >
              下一页
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
