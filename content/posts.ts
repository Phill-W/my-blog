export type PostSection = {
  id: string;
  heading: string;
  paragraphs: string[];
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  sections: PostSection[];
};

export const posts: Post[] = [
  {
    slug: "learn-nextjs",
    title: "我是如何学习 Next.js 的",
    description: "记录我从路由、布局到页面拆分的学习过程。",
    date: "2026-05-17",
    readingTime: "10 分钟阅读",
    tags: ["Next.js", "React", "前端"],
    sections: [
      {
        id: "why-nextjs",
        heading: "一、为什么选择 Next.js",
        paragraphs: [
          "我最开始学习 Next.js，并不是为了追求新技术，而是因为它把路由、布局、服务端组件这些真实项目里经常遇到的问题放在了一起。",
          "如果只是停留在 React 单页应用阶段，很多页面组织方式、SEO 和文件路由的思路是练不到的。",
        ],
      },
      {
        id: "what-i-practice",
        heading: "二、这一阶段我重点练什么",
        paragraphs: [
          "第一阶段我只做静态页面，不接接口，不上数据库，目标是把布局、组件拆分、响应式和样式表达练熟。",
          "对初学者来说，能把页面拆清楚，比着急引入一堆功能更重要。",
        ],
      },
      {
        id: "next-step",
        heading: "三、下一步准备做什么",
        paragraphs: [
          "接下来我会先把文章数据从 JSX 里抽离出来，再把博客详情页改成动态路由。",
          "这样以后每新增一篇文章，本质上只是多加一条数据，而不是多复制一个页面。",
        ],
      },
    ],
  },
  {
    slug: "tailwind-css-efficiency",
    title: "使用 Tailwind CSS 提升开发效率",
    description: "整理我在实际写页面时常用的 Tailwind CSS 经验。",
    date: "2026-05-12",
    readingTime: "8 分钟阅读",
    tags: ["Tailwind CSS", "CSS"],
    sections: [
      {
        id: "why-tailwind",
        heading: "一、为什么我喜欢 Tailwind CSS",
        paragraphs: [
          "它最大的好处不是类名多，而是你写样式的时候不用频繁在 JSX 和 CSS 文件之间来回跳。",
          "对于练布局和组件拆分特别友好，因为你能很快看到页面结构和样式是怎么对应的。",
        ],
      },
      {
        id: "common-patterns",
        heading: "二、我最常用的写法",
        paragraphs: [
          "像 `grid`、`flex`、`gap`、`rounded-2xl`、`text-muted-foreground` 这种组合，我在做博客原型时会高频复用。",
          "当页面组件边界清楚时，Tailwind 会让视觉调整变得非常快。",
        ],
      },
      {
        id: "mistakes",
        heading: "三、容易踩的坑",
        paragraphs: [
          "初学时最容易把所有类都堆在一个大组件里，最后 JSX 很长，反而看不懂。",
          "正确做法不是少写类，而是及时拆组件，让每个组件只负责一小块 UI。",
        ],
      },
    ],
  },
  {
    slug: "component-splitting",
    title: "组件拆分应该怎么练",
    description: "从一个页面拆出更小、更清楚的组件，是前端很重要的基本功。",
    date: "2026-05-08",
    readingTime: "9 分钟阅读",
    tags: ["React", "组件设计"],
    sections: [
      {
        id: "single-responsibility",
        heading: "一、先想清楚组件负责什么",
        paragraphs: [
          "比如 `PostCard` 只负责展示文章卡片，`SiteHeader` 只负责顶部导航，`TagList` 只负责标签展示。",
          "如果一个组件同时处理数据、状态、弹窗、跳转和展示，它很快就会变得难读。",
        ],
      },
      {
        id: "file-size",
        heading: "二、文件太长就是信号",
        paragraphs: [
          "对初学者来说，一个文件尽量先控制在 100 行左右会更容易维护。",
          "超过之后就问自己：这里是不是有重复结构？是不是能抽出一个更小的展示组件？",
        ],
      },
      {
        id: "naming",
        heading: "三、命名会直接影响可读性",
        paragraphs: [
          "像 `data`、`item`、`handleClick` 这种太泛的名字，短期写得快，长期读起来会很痛苦。",
          "更具体的命名会让你几周后回来看代码时，脑子轻松很多。",
        ],
      },
    ],
  },
];
