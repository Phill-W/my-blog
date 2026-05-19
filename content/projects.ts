export type Project = {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  githubHref: string;
  previewHref?: string;
  coverImageSrc?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "my-blog",
    name: "my-blog",
    description:
      "基于 Next.js 16、Tailwind CSS 4、shadcn/ui 和 MDX 搭建的个人博客项目，重点练习内容系统、动态路由、SEO、测试和部署流程。",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
    githubHref: "",
    previewHref: "https://my-blog-blond-chi-30.vercel.app/",
    coverImageSrc: "/images/my-blog-cover.png",
    featured: true,
  },
  {
    slug: "poster",
    name: "poster",
    description:
      "一个在线海报设计工具练习项目，围绕画布编辑、文本添加、图形操作和导出流程，训练交互型前端页面的组织能力。",
    tags: ["前端练习", "Canvas", "交互设计"],
    githubHref: "",
    coverImageSrc: "/images/poster.png",
    featured: true,
  },
  {
    slug: "consult-patient",
    name: "优医问诊",
    description:
      "一个面向患者咨询场景的 H5 项目，基于 Vue 3、TypeScript、Pinia 和 Vant，覆盖找医生、快速问诊、开药门诊和健康百科等业务模块。",
    tags: ["Vue 3", "TypeScript", "Pinia", "Vant"],
    githubHref: "",
    previewHref: "",
    coverImageSrc: "/images/consult_patient.png",
    featured: true,
  },
  {
    slug: "resume-pilot",
    name: "ResumePilot AI",
    description:
      "一个围绕 JD 与简历分析场景构建的 ATS 简历评估项目，重点练习 AI 产品页面表达、分析流程展示和全栈产品 MVP 组织方式。",
    tags: ["Next.js", "Supabase", "Stripe", "AI"],
    githubHref: "",
    coverImageSrc: "/images/resumepilot-v1.png",
    featured: true,
  },
  {
    slug: "big-event",
    name: "big_event",
    description:
      "一个用于练习信息管理、列表展示和基础业务流程组织的前端项目，适合沉淀页面拆分、表单结构和后台风格页面实现经验。",
    tags: ["业务页面", "列表展示", "前端练习"],
    githubHref: "",
    previewHref: "https://fe-bigevent-web.itheima.net/login",
    coverImageSrc: "/images/big_event.png",
    featured: true,
  },
];
