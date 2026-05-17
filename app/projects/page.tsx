import Link from "next/link";

import Container from "@/components/Container";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import TagList from "@/components/TagList";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const projectTags = ["全部", "Web 应用", "练习项目", "UI 设计", "组件拆分"];

const projects = [
  {
    name: "个人博客系统",
    description:
      "基于 Next.js 的个人博客练习项目，重点练习页面布局、组件拆分和静态路由组织。",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    githubHref: "https://github.com",
    previewHref: "https://example.com",
  },
  {
    name: "任务管理页面",
    description:
      "一个用于练习信息密度、卡片布局和筛选区域组织方式的静态前端页面。",
    tags: ["React", "UI Design", "shadcn/ui"],
    githubHref: "https://github.com",
    previewHref: "https://example.com",
  },
  {
    name: "组件拆分练习",
    description:
      "围绕按钮、卡片、标签、标题区块等组件进行拆分和复用，提升页面组织能力。",
    tags: ["React", "组件设计", "前端"],
    githubHref: "https://github.com",
    previewHref: "https://example.com",
  },
];

export default function ProjectsPage() {
  return (
    <main className="pb-16">
      <section className="border-b border-border/60 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Projects
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              项目展示
            </h1>
            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              这里收集了我正在练习、整理和实现中的前端项目。
            </p>
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <div className="space-y-3 rounded-2xl border border-border/70 bg-muted/20 p-5 sm:p-6">
            <p className="text-sm font-medium text-foreground">分类浏览</p>
            <TagList tags={projectTags} />
          </div>
        </Container>
      </section>

      <section className="py-6">
        <Container>
          <SectionHeading
            title="全部项目"
            description={`当前展示 ${projects.length} 个项目`}
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.name} {...project} />
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-10">
        <Container>
          <div className="flex justify-center">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "outline", size: "default" }),
              )}
            >
              返回首页
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
