import { describe, expect, it } from "vitest";

import { projects } from "@/content/projects";
import {
  filterProjects,
  getAllProjects,
  getAllProjectTags,
  getFeaturedProjects,
} from "@/lib/projects";

describe("getAllProjects", () => {
  it("会返回新的数组引用", () => {
    const allProjects = getAllProjects();

    expect(allProjects).not.toBe(projects);
    expect(allProjects).toEqual(projects);
  });
});

describe("getFeaturedProjects", () => {
  it("只返回 featured 为 true 的项目", () => {
    const featuredProjects = getFeaturedProjects();

    expect(featuredProjects.length).toBe(
      projects.filter((project) => project.featured).length,
    );
    expect(featuredProjects.every((project) => project.featured)).toBe(true);
  });
});

describe("getAllProjectTags", () => {
  it("会额外提供一个全部标签，并对项目标签去重", () => {
    const allTags = getAllProjectTags();
    const uniqueProjectTags = new Set(projects.flatMap((project) => project.tags));

    expect(allTags.length).toBe(uniqueProjectTags.size + 1);
    expect(new Set(allTags.slice(1)).size).toBe(uniqueProjectTags.size);
  });
});

describe("filterProjects", () => {
  it("未传 tag 时返回全部项目", () => {
    const allProjects = getAllProjects();

    expect(filterProjects(allProjects)).toEqual(allProjects);
  });

  it("传入全部标签时返回全部项目", () => {
    const allProjects = getAllProjects();
    const [allTag] = getAllProjectTags();

    expect(filterProjects(allProjects, allTag)).toEqual(allProjects);
  });

  it("会按具体标签过滤项目", () => {
    const allProjects = getAllProjects();
    const filteredProjects = filterProjects(allProjects, "Next.js");

    expect(filteredProjects.length).toBeGreaterThan(0);
    expect(
      filteredProjects.every((project) => project.tags.includes("Next.js")),
    ).toBe(true);
  });

  it("会去掉标签前后的空格", () => {
    const allProjects = getAllProjects();

    expect(filterProjects(allProjects, "  Next.js  ")).toEqual(
      filterProjects(allProjects, "Next.js"),
    );
  });

  it("不存在的标签会返回空数组", () => {
    const allProjects = getAllProjects();

    expect(filterProjects(allProjects, "NotFoundTag")).toEqual([]);
  });
});
