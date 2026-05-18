export type Project = {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  githubHref: string;
  previewHref: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "my-blog-system",
    name: "个人博客系统",
    description:
      "基于 Next.js 构建的个人博客项目，用来练习布局、组件拆分、动态路由和内容管理。",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    githubHref: "https://github.com",
    previewHref: "https://example.com",
    featured: true,
  },
  {
    slug: "task-management-ui",
    name: "任务管理页面",
    description: "一个用于练习卡片布局、筛选结构和信息层级的静态前端项目页面。",
    tags: ["React", "UI Design", "shadcn/ui"],
    githubHref: "https://github.com",
    previewHref: "https://example.com",
    featured: true,
  },
  {
    slug: "component-splitting-lab",
    name: "组件拆分练习",
    description:
      "围绕通用卡片、标题区块和标签组件做拆分练习，提升页面组织能力。",
    tags: ["React", "组件设计", "前端"],
    githubHref: "https://github.com",
    previewHref: "https://example.com",
    featured: true,
  },
];
