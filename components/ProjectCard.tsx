"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, X, ZoomIn } from "lucide-react";
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

type ImagePreviewProps = {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  title: string;
};

function isExternalLink(href: string) {
  return /^https?:\/\//.test(href);
}

function ImagePreview({ open, onClose, src, alt, title }: ImagePreviewProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm sm:px-8">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="关闭图片预览"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-5xl">
        <div className="mb-3 flex items-center justify-between gap-4 text-white">
          <div>
            <p className="text-sm text-white/70">项目封面预览</p>
            <h3 className="text-base font-medium sm:text-lg">{title}</h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            aria-label="关闭图片预览"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl">
          <div className="relative aspect-[16/10] max-h-[78vh] min-h-[280px]">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function ProjectCard({
  name,
  description,
  tags,
  githubHref,
  previewHref,
  coverImageSrc,
}: ProjectCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const githubLabel = previewHref ? "源码仓库" : "查看仓库";
  const coverAlt = `${name} 项目封面`;

  return (
    <>
      <Card className="group flex h-full flex-col overflow-hidden border-border/70 bg-background transition-all duration-200 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lg">
        <CardContent className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
          {coverImageSrc ? (
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="relative block aspect-video overflow-hidden rounded-xl border border-border/70 bg-muted/30 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`查看 ${name} 项目封面大图`}
            >
              <Image
                src={coverImageSrc}
                alt={coverAlt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              <div className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/65 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
                <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
                点击放大
              </div>
            </button>
          ) : (
            <div className="relative aspect-video overflow-hidden rounded-xl border border-border/70 bg-muted/30">
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
            </div>
          )}

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

      {coverImageSrc ? (
        <ImagePreview
          open={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          src={coverImageSrc}
          alt={coverAlt}
          title={name}
        />
      ) : null}
    </>
  );
}
