import BlogFilterPanel from "@/components/blog/BlogFilterPanel";
import BlogPagination from "@/components/blog/BlogPagination";
import BlogPostResults from "@/components/blog/BlogPostResults";
import Container from "@/components/Container";
import {
  filterPosts,
  getAllPostTags,
  getAllPosts,
  paginatePosts,
} from "@/lib/posts";

type BlogPageProps = {
  searchParams: Promise<{
    q?: string;
    tag?: string;
    page?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;

  const query = resolvedSearchParams.q?.trim() ?? "";
  const selectedTag = resolvedSearchParams.tag?.trim() ?? "全部";
  const [allPosts, allTags] = await Promise.all([
    getAllPosts(),
    getAllPostTags(),
  ]);

  const filteredPosts = filterPosts(allPosts, {
    query,
    tag: selectedTag,
  });

  const { currentPage, totalPages, items } = paginatePosts(
    filteredPosts,
    resolvedSearchParams.page,
  );

  const hasFilters = Boolean(query) || selectedTag !== "全部";

  return (
    <main className="pb-16">
      <section className="border-b border-border/60 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Blog
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              博客文章
            </h1>
            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              记录我的学习过程、项目实践和前端思考。
            </p>
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <BlogFilterPanel
            allTags={allTags}
            query={query}
            selectedTag={selectedTag}
          />
        </Container>
      </section>

      <section className="py-6">
        <Container>
          <BlogPostResults
            posts={items}
            filteredCount={filteredPosts.length}
            hasFilters={hasFilters}
          />
        </Container>
      </section>

      <section className="pt-10">
        <Container>
          <BlogPagination
            query={query}
            selectedTag={selectedTag}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </Container>
      </section>
    </main>
  );
}
