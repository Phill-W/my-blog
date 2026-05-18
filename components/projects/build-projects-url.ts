export function buildProjectsUrl({ tag }: { tag?: string }) {
  const params = new URLSearchParams();

  if (tag && tag !== "全部") {
    params.set("tag", tag);
  }

  const queryString = params.toString();

  return queryString ? `/projects?${queryString}` : "/projects";
}
