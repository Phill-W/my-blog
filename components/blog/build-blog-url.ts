export function buildBlogUrl({
  q,
  tag,
  page,
}: {
  q?: string;
  tag?: string;
  page?: number;
}) {
  const params = new URLSearchParams();

  if (q) {
    params.set("q", q);
  }

  if (tag && tag !== "全部") {
    params.set("tag", tag);
  }

  if (page && page > 1) {
    params.set("page", String(page));
  }

  const queryString = params.toString();

  return queryString ? `/blog?${queryString}` : "/blog";
}
