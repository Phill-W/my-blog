import Link from "next/link";

import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyFooter,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

type ProjectResultsProps = {
  projects: Project[];
  filteredCount: number;
  hasFilters: boolean;
};

export default function ProjectResults({
  projects,
  filteredCount,
  hasFilters,
}: ProjectResultsProps) {
  return (
    <>
      <SectionHeading
        title="全部项目"
        description={`当前展示 ${filteredCount} 个项目`}
      />

      {projects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      ) : (
        <Empty className="mt-6">
          <EmptyHeader>
            <EmptyTitle>没有找到匹配的项目</EmptyTitle>
            <EmptyDescription>
              可以切换到其他分类，或者查看全部项目。
            </EmptyDescription>
          </EmptyHeader>

          <EmptyFooter>
            <Link
              href="/projects"
              className={cn(
                buttonVariants({ variant: "default", size: "default" }),
              )}
            >
              查看全部项目
            </Link>

            {hasFilters ? (
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                )}
              >
                返回首页
              </Link>
            ) : null}
          </EmptyFooter>
        </Empty>
      )}
    </>
  );
}
