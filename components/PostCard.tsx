import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";

import TagList from "@/components/TagList";
import { Card, CardContent } from "@/components/ui/card";
import type { PostCover } from "@/lib/posts";

type PostCardProps = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  href: string;
  cover?: PostCover;
};

export default function PostCard({
  title,
  description,
  date,
  tags,
  href,
  cover,
}: PostCardProps) {
  return (
    <Link
      href={href}
      className="group block h-full rounded-2xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <Card className="h-full overflow-hidden border-border/70 bg-background transition-all duration-200 group-hover:-translate-y-1 group-hover:border-foreground/20 group-hover:shadow-lg">
        <div className="relative aspect-[16/9] border-b border-border/70 bg-muted/30">
          {cover ? (
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="absolute inset-4 rounded-xl border border-border/70 bg-background/70 p-4">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
              </div>

              <div className="space-y-2">
                <span className="block h-2 w-3/4 rounded-full bg-foreground/20" />
                <span className="block h-2 w-full rounded-full bg-foreground/10" />
                <span className="block h-2 w-2/3 rounded-full bg-foreground/10" />
              </div>
            </div>
          )}
        </div>

        <CardContent className="flex h-full flex-col gap-5 p-5 sm:p-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{date}</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                {title}
              </h3>
              <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
          </div>

          <div className="mt-auto space-y-4">
            <TagList tags={tags} />

            <div className="flex items-center gap-1 text-sm font-medium text-foreground">
              <span>阅读全文</span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
