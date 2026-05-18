import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { buildProjectsUrl } from "@/components/projects/build-projects-url";
import { cn } from "@/lib/utils";

type ProjectFilterPanelProps = {
  tags: string[];
  selectedTag: string;
};

export default function ProjectFilterPanel({
  tags,
  selectedTag,
}: ProjectFilterPanelProps) {
  return (
    <div className="space-y-3 rounded-2xl border border-border/70 bg-muted/20 p-5 sm:p-6">
      <p className="text-sm font-medium text-foreground">分类浏览</p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isActive = selectedTag === tag;

          return (
            <Link
              key={tag}
              href={buildProjectsUrl({ tag })}
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
  );
}
