# MyBlog

一个使用 Next.js 16、Tailwind CSS 4、shadcn/ui 和 MDX 搭建的个人博客练手项目。  
这个仓库的重点不是“一次性做完一个完整博客系统”，而是按阶段把页面、内容系统、路由、主题、SEO 和部署流程逐步走通。

当前线上地址：

- [https://my-blog-blond-chi-30.vercel.app/](https://my-blog-blond-chi-30.vercel.app/)

## 当前阶段

目前项目已经完成这些内容：

- 5 个核心页面：首页、博客列表、博客详情、项目展示、关于我
- 文章内容从本地 MDX 读取，并通过文章注册表统一管理
- 博客详情支持标题锚点、目录、代码高亮、复制代码按钮
- 项目页和博客列表页支持筛选
- 已接入明暗主题切换
- 已补齐基础 SEO、`sitemap.xml` 和 `robots.txt`
- 已补充内容与筛选逻辑测试

当前这个阶段的目标是：

- 把“静态页面 -> 内容系统 -> 路由 -> SEO -> 测试 -> 部署”这一条前端博客路线真正跑通
- 用小步提交的方式，把每次改动的意图和效果都看清楚

## 目录说明

```text
my-blog/
├─ app/                  # App Router 页面、布局、metadata、sitemap、robots
├─ components/           # 页面组件、MDX 组件、主题组件、UI 组件
├─ content/              # 博客文章、项目数据、站点静态内容
├─ lib/                  # 内容读取、筛选、分页、SEO 配置、工具函数
├─ public/               # 静态资源，如默认分享图、示意图
├─ tests/                # Vitest 单元测试
├─ mdx-components.tsx    # MDX 全局组件映射
├─ next.config.ts        # Next.js / MDX 配置
└─ vitest.config.ts      # 测试配置
```

比较关键的几个文件：

- `content/blog/index.ts`
  - 文章注册表，显式导入每篇 MDX 文章和 metadata
- `lib/posts.ts`
  - 文章读取、筛选、分页、相邻文章、目录提取
- `lib/projects.ts`
  - 项目数据读取和筛选逻辑
- `lib/site.ts`
  - 站点 URL、默认分享图、统一 metadata helper

## 本地运行

先安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

打开：

- [http://localhost:3000](http://localhost:3000)

## 测试与检查

运行单元测试：

```bash
npm.cmd test
```

运行 ESLint：

```bash
npm.cmd run lint
```

执行生产构建：

```bash
npm.cmd run build
```

推荐在准备提交或部署前按这个顺序检查：

```bash
npm.cmd run lint
npm.cmd test
npm.cmd run build
```

## 内容系统说明

### 博客文章

文章放在：

- `content/blog/*.mdx`

每篇文章都导出：

- `metadata`
- 默认导出的 MDX 内容组件

文章注册表位于：

- `content/blog/index.ts`

这样做的好处是：

- 文章入口清晰
- 构建路径可分析
- 后续加文章封面、草稿标记、推荐位更容易管理

### 项目数据

项目数据当前放在：

- `content/projects.ts`

这一步还是本地静态数据，重点是先把页面结构、筛选逻辑和组件拆分练熟。

## 部署到 Vercel

### 1. 推送代码到 GitHub

先确认本地检查通过，再推送：

```bash
git push origin master
```

### 2. 在 Vercel 导入仓库

1. 打开 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 `Add New...`
3. 选择 `Project`
4. 导入 GitHub 仓库 `my-blog`
5. Framework Preset 保持 `Next.js`
6. 不需要额外环境变量即可完成当前版本部署
7. 点击 `Deploy`

### 3. 部署完成后检查

重点检查这些地址：

- 首页
- `/blog`
- `/blog/learn-nextjs`
- `/projects`
- `/about`
- `/sitemap.xml`
- `/robots.txt`

还要确认：

- 明暗主题切换正常
- 代码块高亮和复制按钮正常
- 博客筛选和项目筛选正常
- 页面 metadata 正常输出

## 后续学习路线

接下来比较顺的路线可以这样继续：

1. 为每篇文章增加单独封面图字段
2. 把默认分享图升级为动态 `opengraph-image.tsx`
3. 给文章增加 `updatedAt`，让 sitemap 的 `lastModified` 更准确
4. 补更多测试，例如：
   - SEO helper
   - 文章标签收集
   - MDX 目录提取
5. 后续如果文章变多，可以把文章注册表改成自动生成脚本
6. 如果想继续贴近真实博客，再考虑：
   - 评论系统
   - 访问统计
   - RSS
   - 搜索
