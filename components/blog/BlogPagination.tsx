import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildBlogUrl } from "@/components/blog/build-blog-url";

type BlogPaginationProps = {
  query: string;
  selectedTag: string;
  currentPage: number;
  totalPages: number;
};

export default function BlogPagination({
  query,
  selectedTag,
  currentPage,
  totalPages,
}: BlogPaginationProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Link
        href={buildBlogUrl({
          q: query || undefined,
          tag: selectedTag,
          page: currentPage - 1,
        })}
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          currentPage === 1 ? "pointer-events-none opacity-50" : "",
        )}
      >
        上一页
      </Link>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        const isActive = page === currentPage;

        return (
          <Link
            key={page}
            href={buildBlogUrl({
              q: query || undefined,
              tag: selectedTag,
              page,
            })}
            className={cn(
              buttonVariants({
                variant: isActive ? "default" : "outline",
                size: "sm",
              }),
            )}
          >
            {page}
          </Link>
        );
      })}

      <Link
        href={buildBlogUrl({
          q: query || undefined,
          tag: selectedTag,
          page: currentPage + 1,
        })}
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          currentPage === totalPages ? "pointer-events-none opacity-50" : "",
        )}
      >
        下一页
      </Link>
    </div>
  );
}
