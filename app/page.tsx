export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-xl space-y-3 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          MyBlog
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          个人博客第一阶段开发中
        </h1>
        <p className="text-sm leading-7 text-muted-foreground sm:text-base">
          先清理初始化模板，再逐步完成全局布局、首页、博客列表、文章详情、项目页和关于页。
        </p>
      </div>
    </main>
  );
}
