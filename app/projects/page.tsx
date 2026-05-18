import Link from "next/link";

import Container from "@/components/Container";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import TagList from "@/components/TagList";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getAllProjects, getAllProjectTags } from "@/lib/projects";

const projects = getAllProjects();
const projectTags = getAllProjectTags();

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
              <ProjectCard key={project.slug} {...project} />
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
