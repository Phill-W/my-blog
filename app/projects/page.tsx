import Link from "next/link";

import Container from "@/components/Container";
import ProjectFilterPanel from "@/components/projects/ProjectFilterPanel";
import ProjectResults from "@/components/projects/ProjectResults";
import { buttonVariants } from "@/components/ui/button";
import {
  filterProjects,
  getAllProjectTags,
  getAllProjects,
} from "@/lib/projects";
import { cn } from "@/lib/utils";

type ProjectsPageProps = {
  searchParams: Promise<{
    tag?: string;
  }>;
};

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const resolvedSearchParams = await searchParams;
  const selectedTag = resolvedSearchParams.tag?.trim() ?? "全部";

  const projects = getAllProjects();
  const projectTags = getAllProjectTags();
  const filteredProjects = filterProjects(projects, selectedTag);
  const hasFilters = selectedTag !== "全部";

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
          <ProjectFilterPanel tags={projectTags} selectedTag={selectedTag} />
        </Container>
      </section>

      <section className="py-6">
        <Container>
          <ProjectResults
            projects={filteredProjects}
            filteredCount={filteredProjects.length}
            hasFilters={hasFilters}
          />
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
