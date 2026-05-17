import Link from "next/link";

import Container from "@/components/Container";
import TagList from "@/components/TagList";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const postTags = ["Next.js", "React", "前端"];

const tableOfContents = [
  "为什么学习 Next.js",
  "第一阶段的目标",
  "先从静态页面开始",
  "组件拆分的思路",
  "下一步计划",
];

export default function LearnNextPage() {
  return (
    <main className="pb-16">
      <section className="border-b border-border/60 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-4xl space-y-5">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Blog Detail
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              我是如何学习 Next.js 的
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              这篇文章记录我从零开始学习 Next.js
              的过程，包括为什么选择它、如何拆分练习阶段，以及我在写静态博客页面时的思考。
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>2026-05-17</span>
              <span>·</span>
              <span>阅读时间 10 分钟</span>
            </div>

            <TagList tags={postTags} />
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
            <article className="space-y-8">
              <div className="aspect-[16/8] rounded-2xl border border-dashed border-border bg-muted/30" />

              <div className="space-y-6 text-sm leading-7 text-muted-foreground sm:text-base">
                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    为什么学习 Next.js
                  </h2>
                  <p>
                    我希望通过一个真实的小项目，把
                    React、路由、布局、组件拆分和页面组织方式串起来练习。Next.js
                    很适合做这件事，因为它既有清晰的项目结构，也能让我提前接触真实开发中常见的页面组织方式。
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    第一阶段的目标
                  </h2>
                  <p>
                    第一阶段我不接接口，不做数据库，也不做后台管理，只专注在静态页面本身。这样我可以把注意力放在布局、组件拆分、Tailwind
                    样式和 shadcn/ui 的使用上。
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    先从静态页面开始
                  </h2>
                  <p>
                    我先把首页、博客列表页、博客详情页、项目页和关于我几个页面做出来。虽然这些页面一开始只是静态内容，但已经能帮我建立完整的网站结构。
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    组件拆分的思路
                  </h2>
                  <p>
                    我会尽量让每个组件只做一件事。比如 PostCard
                    只负责展示文章卡片，SiteHeader 只负责导航，TagList
                    只负责标签列表。这样后面页面变复杂时，我也能更容易定位问题和继续扩展。
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    下一步计划
                  </h2>
                  <p>
                    下一步我会把文章和项目的数据从页面中抽出来，放到单独的数据文件中。这样页面会更干净，也能为后续的动态路由和内容管理做准备。
                  </p>
                </section>
              </div>

              <div className="grid gap-4 border-t border-border/60 pt-8 sm:grid-cols-2">
                <Link
                  href="/blog"
                  className="rounded-2xl border border-border/70 bg-background p-4 transition-colors hover:bg-muted/30"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    上一篇
                  </p>
                  <p className="mt-2 font-medium text-foreground">
                    返回博客列表
                  </p>
                </Link>

                <Link
                  href="/blog"
                  className="rounded-2xl border border-border/70 bg-background p-4 text-right transition-colors hover:bg-muted/30"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    下一篇
                  </p>
                  <p className="mt-2 font-medium text-foreground">
                    阅读更多文章
                  </p>
                </Link>
              </div>
            </article>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-border/70 bg-muted/20 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
                  目录
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {tableOfContents.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-border/70 bg-background p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
                  继续阅读
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  如果你想看更多关于布局、组件拆分和静态博客搭建的内容，可以回到博客列表页继续浏览。
                </p>

                <Link
                  href="/blog"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "mt-4 w-full",
                  )}
                >
                  返回博客列表
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
