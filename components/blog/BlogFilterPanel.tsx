import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildBlogUrl } from "@/components/blog/build-blog-url";

type BlogFilterPanelProps = {
  allTags: string[];
  query: string;
  selectedTag: string;
};

export default function BlogFilterPanel({
  allTags,
  query,
  selectedTag,
}: BlogFilterPanelProps) {
  return (
    <div className="space-y-6 rounded-2xl border border-border/70 bg-muted/20 p-5 sm:p-6">
      <form
        action="/blog"
        method="get"
        className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_160px]"
      >
        <div className="space-y-2">
          <label
            htmlFor="search-posts"
            className="text-sm font-medium text-foreground"
          >
            搜索文章
          </label>
          <input
            id="search-posts"
            name="q"
            type="text"
            defaultValue={query}
            placeholder="搜索标题、描述或标签..."
            className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
          />
        </div>

        <div className="flex items-end">
          {selectedTag !== "全部" ? (
            <input type="hidden" name="tag" value={selectedTag} />
          ) : null}

          <button
            type="submit"
            className={cn(
              buttonVariants({ variant: "default", size: "default" }),
              "w-full",
            )}
          >
            开始搜索
          </button>
        </div>
      </form>

      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">标签筛选</p>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => {
            const isActive = selectedTag === tag;

            return (
              <Link
                key={tag}
                href={buildBlogUrl({
                  q: query || undefined,
                  tag,
                  page: 1,
                })}
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
    </div>
  );
}
