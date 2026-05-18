import { projects, type Project } from "@/content/projects";

export function getAllProjects(): Project[] {
  return [...projects];
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getAllProjectTags(): string[] {
  const tags = new Set<string>();

  for (const project of projects) {
    for (const tag of project.tags) {
      tags.add(tag);
    }
  }

  return ["全部", ...Array.from(tags)];
}

export function filterProjects(
  allProjects: Project[],
  selectedTag?: string,
): Project[] {
  const tag = selectedTag?.trim();

  if (!tag || tag === "全部") {
    return allProjects;
  }

  return allProjects.filter((project) => project.tags.includes(tag));
}
