import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import TagList from "@/components/TagList";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  name: string;
  description: string;
  tags: string[];
  githubHref: string;
  previewHref?: string;
  coverImageSrc?: string;
};

function isExternalLink(href: string) {
  return /^https?:\/\//.test(href);
}

export default function ProjectCard({
  name,
  description,
  tags,
  githubHref,
  previewHref,
  coverImageSrc,
}: ProjectCardProps) {
  const githubLabel = previewHref ? "源码仓库" : "查看仓库";

  return (
    <Card className="group flex h-full flex-col overflow-hidden border-border/70 bg-background transition-all duration-200 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lg">
      <CardContent className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
        <div className="relative aspect-video overflow-hidden rounded-xl border border-border/70 bg-muted/30">
          {coverImageSrc ? (
            <Image
              src={coverImageSrc}
              alt={`${name} 项目封面`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <>
              <div className="absolute inset-x-0 top-0 flex h-9 items-center gap-2 border-b border-border/70 bg-background/70 px-3">
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
              </div>

              <div className="grid h-full grid-cols-[0.8fr_1.2fr] gap-3 px-4 pb-4 pt-12">
                <div className="space-y-2">
                  <span className="block h-3 w-2/3 rounded-full bg-foreground/20" />
                  <span className="block h-2 w-full rounded-full bg-foreground/10" />
                  <span className="block h-2 w-4/5 rounded-full bg-foreground/10" />
                </div>

                <div className="rounded-lg border border-border/70 bg-background/70 p-3">
                  <div className="grid h-full grid-cols-2 gap-2">
                    <span className="rounded-md bg-foreground/10" />
                    <span className="rounded-md bg-foreground/15" />
                    <span className="rounded-md bg-foreground/15" />
                    <span className="rounded-md bg-foreground/10" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {name}
          </h3>
          <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="mt-auto">
          <TagList tags={tags} />
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-3 p-5 pt-0 sm:p-6 sm:pt-0">
        <Link
          href={githubHref}
          target={isExternalLink(githubHref) ? "_blank" : undefined}
          rel={isExternalLink(githubHref) ? "noreferrer" : undefined}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "gap-2",
          )}
        >
          <FaGithub className="h-4 w-4" aria-hidden="true" />
          {githubLabel}
        </Link>

        {previewHref ? (
          <Link
            href={previewHref}
            target={isExternalLink(previewHref) ? "_blank" : undefined}
            rel={isExternalLink(previewHref) ? "noreferrer" : undefined}
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "gap-2",
            )}
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            在线预览
          </Link>
        ) : null}
      </CardFooter>
    </Card>
  );
}
