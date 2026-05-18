import Link from "next/link";

import PostCard from "@/components/PostCard";
import SectionHeading from "@/components/SectionHeading";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyFooter,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { getPostHref, type Post } from "@/lib/posts";
import { cn } from "@/lib/utils";

type BlogPostSummary = Pick<
  Post,
  "slug" | "title" | "description" | "date" | "tags"
>;

type BlogPostResultsProps = {
  posts: BlogPostSummary[];
  filteredCount: number;
  hasFilters: boolean;
};

export default function BlogPostResults({
  posts,
  filteredCount,
  hasFilters,
}: BlogPostResultsProps) {
  return (
    <>
      <SectionHeading
        title="全部文章"
        description={`当前筛选后共 ${filteredCount} 篇文章`}
      />

      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              href={getPostHref(post.slug)}
            />
          ))}
        </div>
      ) : (
        <Empty className="mt-6">
          <EmptyHeader>
            <EmptyTitle>没有找到匹配的文章</EmptyTitle>
            <EmptyDescription>
              可以试试更短的关键词，或者切换到其他标签。
            </EmptyDescription>
          </EmptyHeader>

          <EmptyFooter>
            <Link
              href="/blog"
              className={cn(
                buttonVariants({ variant: "default", size: "default" }),
              )}
            >
              查看全部文章
            </Link>

            {hasFilters ? (
              <Link
                href="/blog"
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                )}
              >
                清空当前筛选
              </Link>
            ) : null}
          </EmptyFooter>
        </Empty>
      )}
    </>
  );
}
