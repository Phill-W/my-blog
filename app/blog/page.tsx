import Container from "@/components/Container";
import PostCard from "@/components/PostCard";
import SectionHeading from "@/components/SectionHeading";
import TagList from "@/components/TagList";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getAllPosts, getPostHref } from "@/lib/posts";

const blogPosts = getAllPosts();

const filterTags = [
  "全部",
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "组件设计",
  "前端",
];

export default function BlogPage() {
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
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
              <div className="space-y-2">
                <label
                  htmlFor="search-posts"
                  className="text-sm font-medium text-foreground"
                >
                  搜索文章
                </label>
                <input
                  id="search-posts"
                  type="text"
                  placeholder="搜索文章标题、关键词..."
                  className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
                />
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium text-foreground">
                  排序方式
                </span>
                <div className="flex h-11 items-center rounded-xl border border-border bg-background px-4 text-sm text-muted-foreground">
                  最新发布
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">标签筛选</p>
              <TagList tags={filterTags} />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-6">
        <Container>
          <SectionHeading
            title="全部文章"
            description={`当前共 ${blogPosts.length} 篇文章`}
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {blogPosts.map((post) => (
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
        </Container>
      </section>

      <section className="pt-10">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "pointer-events-none opacity-50",
              )}
            >
              上一页
            </button>

            <button
              type="button"
              className={cn(buttonVariants({ variant: "default", size: "sm" }))}
            >
              1
            </button>

            <button
              type="button"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              2
            </button>

            <button
              type="button"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              3
            </button>

            <button
              type="button"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              下一页
            </button>
          </div>
        </Container>
      </section>
    </main>
  );
}
