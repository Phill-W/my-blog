import Link from "next/link";
import { notFound } from "next/navigation";

import Container from "@/components/Container";
import TagList from "@/components/TagList";
import { buttonVariants } from "@/components/ui/button";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="pb-16">
      <section className="border-b border-border/60 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-4xl space-y-5">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Blog Detail
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              {post.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>

            <TagList tags={post.tags} />
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
            <article className="space-y-8">
              <div className="aspect-[16/8] rounded-2xl border border-dashed border-border bg-muted/30" />

              <div className="space-y-6 text-sm leading-7 text-muted-foreground sm:text-base">
                {post.sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="space-y-3 scroll-mt-24"
                  >
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                      {section.heading}
                    </h2>

                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}
              </div>

              <div className="border-t border-border/60 pt-8">
                <Link
                  href="/blog"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "default" }),
                  )}
                >
                  返回博客列表
                </Link>
              </div>
            </article>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-border/70 bg-muted/20 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
                  目录
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {post.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="transition-colors hover:text-foreground"
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
