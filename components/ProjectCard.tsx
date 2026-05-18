import Link from "next/link";

import TagList from "@/components/TagList";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  name: string;
  description: string;
  tags: string[];
  githubHref: string;
  previewHref: string;
};

export default function ProjectCard({
  name,
  description,
  tags,
  githubHref,
  previewHref,
}: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col border-border/70">
      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        <div className="aspect-video rounded-lg border border-dashed border-border bg-muted/30" />

        <div className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {name}
          </h3>
          <p className="text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="mt-auto">
          <TagList tags={tags} />
        </div>
      </CardContent>

      <CardFooter className="flex gap-3 p-5 pt-0">
        <Link
          href={githubHref}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          GitHub
        </Link>
        <Link
          href={previewHref}
          className={cn(buttonVariants({ variant: "default", size: "sm" }))}
        >
          在线预览
        </Link>
      </CardFooter>
    </Card>
  );
}
