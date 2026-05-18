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
  {
    slug: "static-page-thinking",
    title: "写静态页面时我会先想什么",
    description: "在正式写代码前，先规划页面结构和组件职责会让后续轻松很多。",
    date: "2026-05-03",
    readingTime: "7 分钟阅读",
    tags: ["前端", "思路整理"],
    sections: [
      {
        id: "structure-first",
        heading: "一、先看结构，不急着写细节",
        paragraphs: [
          "我现在写页面时，会先把页面拆成几个大区块，比如头部、内容区、侧边栏、底部。",
          "这样做的好处是能先把布局骨架定下来，而不是一开始就陷进某个按钮或卡片的细节里。",
        ],
      },
      {
        id: "component-boundary",
        heading: "二、尽早确定组件边界",
        paragraphs: [
          "当一个页面里出现重复卡片、重复标题区、重复标签块时，我会尽快判断它是不是应该抽成组件。",
          "组件边界越早清楚，后面样式调整和数据接入就越顺。",
        ],
      },
      {
        id: "data-awareness",
        heading: "三、提前想数据会从哪里来",
        paragraphs: [
          "即使当前阶段只是静态页面，我也会先想清楚哪些内容以后会来自统一数据源。",
          "这样后面做数据抽离、动态路由和列表渲染时，就不会推倒重来。",
        ],
      },
    ],
  },
  {
    slug: "2026-learning-plan",
    title: "我的 2026 技术学习计划",
    description: "给自己定一个可持续的学习节奏，比短期冲刺更重要。",
    date: "2026-04-28",
    readingTime: "6 分钟阅读",
    tags: ["学习计划", "成长"],
    sections: [
      {
        id: "steady-rhythm",
        heading: "一、学习节奏比强度更重要",
        paragraphs: [
          "过去我总想一口气学很多东西，但后来发现，不如把节奏放稳，持续输出。",
          "真正有效的成长通常不是爆发式的，而是长期稳定地积累。",
        ],
      },
      {
        id: "project-driven",
        heading: "二、尽量通过项目来学",
        paragraphs: [
          "只看教程会让我产生一种自己懂了的错觉，但真正写项目时才会暴露出命名、拆分、状态管理这些问题。",
          "所以我现在更愿意通过一个个小项目把知识点串起来。",
        ],
      },
      {
        id: "review-loop",
        heading: "三、保留复盘回路",
        paragraphs: [
          "每做完一个阶段，我都会回头看这一步到底学到了什么、哪里还没吃透。",
          "这种复盘会帮助我逐渐建立自己的判断，而不是一直依赖教程推进。",
        ],
      },
    ],
  },
];
