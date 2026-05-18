import Link from "next/link";

import Container from "@/components/Container";
import {
  Empty,
  EmptyDescription,
  EmptyFooter,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function BlogNotFoundPage() {
  return (
    <main className="pb-16">
      <section className="border-b border-border/60 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Blog
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              文章未找到
            </h1>
            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              你访问的文章不存在，或者已经被移动到其他位置。
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <Empty>
            <EmptyHeader>
              <EmptyTitle>这篇文章暂时不可用</EmptyTitle>
              <EmptyDescription>
                你可以返回博客列表继续浏览其他文章，或者回到首页重新开始。
              </EmptyDescription>
            </EmptyHeader>

            <EmptyFooter>
              <Link
                href="/blog"
                className={cn(
                  buttonVariants({ variant: "default", size: "default" }),
                )}
              >
                返回博客列表
              </Link>
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                )}
              >
                回到首页
              </Link>
            </EmptyFooter>
          </Empty>
        </Container>
      </section>
    </main>
  );
}
