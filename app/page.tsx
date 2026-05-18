import Link from "next/link";

import Container from "@/components/Container";
import PostCard from "@/components/PostCard";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import TagList from "@/components/TagList";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getLatestPosts, getPostHref } from "@/lib/posts";
import { getFeaturedProjects } from "@/lib/projects";

const techTags = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui",
];
//获取项目数据
const featuredProjects = getFeaturedProjects();

//从服务器抽取数据
const latestPosts = getLatestPosts(3);

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
                  我正在用 Next.js、Tailwind CSS 和 shadcn/ui
                  搭建自己的个人博客。
                  这个项目会一步步练习布局、组件拆分、动态路由和内容管理。
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <Link
                  href="/projects"
                  className={cn(
                    buttonVariants({ variant: "default", size: "default" }),
                  )}
                >
                  查看我的项目
                </Link>
                <Link
                  href="/blog"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "default" }),
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
                className={cn(
                  buttonVariants({ variant: "ghost", size: "default" }),
                )}
              >
                查看全部
              </Link>
            }
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
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
                className={cn(
                  buttonVariants({ variant: "ghost", size: "default" }),
                )}
              >
                查看全部
              </Link>
            }
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard
                key={post.title}
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
    </main>
  );
}
