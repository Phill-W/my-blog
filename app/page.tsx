import Link from "next/link";

import Container from "@/components/Container";
import PostCard from "@/components/PostCard";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import TagList from "@/components/TagList";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const techTags = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui",
];

const featuredProjects = [
  {
    name: "个人博客系统",
    description:
      "基于 Next.js 构建的个人博客首页原型，练习页面布局、组件拆分和响应式设计。",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    githubHref: "https://github.com",
    previewHref: "https://example.com",
  },
  {
    name: "任务管理页面",
    description:
      "一个用于练习卡片布局、筛选栏和信息层级的静态项目展示页面。",
    tags: ["React", "UI Design", "shadcn/ui"],
    githubHref: "https://github.com",
    previewHref: "https://example.com",
  },
  {
    name: "组件拆分练习",
    description:
      "围绕通用卡片、标题区块和标签组件做拆分练习，提升页面组织能力。",
    tags: ["React", "组件设计", "前端"],
    githubHref: "https://github.com",
    previewHref: "https://example.com",
  },
];

const latestPosts = [
  {
    title: "我是如何学习 Next.js 的",
    description: "记录我从路由、布局到页面拆分的学习过程。",
    date: "2026-05-17",
    tags: ["Next.js", "React", "前端"],
    href: "/blog/learn-nextjs",
  },
  {
    title: "使用 Tailwind CSS 提升开发效率",
    description: "整理我在实际写页面时常用的 Tailwind CSS 经验。",
    date: "2026-05-12",
    tags: ["Tailwind CSS", "CSS"],
    href: "/blog/learn-nextjs",
  },
  {
    title: "组件拆分应该怎么练",
    description:
      "从一个页面拆出更小、更清晰的组件，是前端很重要的基本功。",
    date: "2026-05-08",
    tags: ["React", "组件设计"],
    href: "/blog/learn-nextjs",
  },
];

export default function Home() {
  return (
    <main className="pb-16">
      <section className="border-b border-border/60 py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[160px_minmax(0,1fr)] lg:items-center">
            <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border border-border bg-muted/40 text-3xl font-semibold text-muted-foreground">
              XX
            </div>

            <div className="space-y-6 text-center lg:text-left">
              <div className="space-y-3">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Frontend Developer
                </p>
                <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  你好，我是 XXX
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                  我正在用 Next.js、Tailwind CSS 和 shadcn/ui 搭建自己的个人博客。
                  这个项目会一步步练习布局、组件拆分、动态路由和内容管理。
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <Link
                  href="/projects"
                  className={cn(
                    buttonVariants({ variant: "default", size: "default" })
                  )}
                >
                  查看我的项目
                </Link>
                <Link
                  href="/blog"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "default" })
                  )}
                >
                  阅读博客
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <SectionHeading
            title="技术栈 / 标签"
            description="这是我当前重点学习和实践的前端技术。"
          />
          <TagList tags={techTags} />
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <SectionHeading
            title="精选项目"
            description="一些我正在练习或整理中的前端项目。"
            action={
              <Link
                href="/projects"
                className={cn(buttonVariants({ variant: "ghost", size: "default" }))}
              >
                查看全部
              </Link>
            }
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.name} {...project} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <SectionHeading
            title="最新文章"
            description="记录我的学习过程、思考和实践总结。"
            action={
              <Link
                href="/blog"
                className={cn(buttonVariants({ variant: "ghost", size: "default" }))}
              >
                查看全部
              </Link>
            }
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.title} {...post} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
