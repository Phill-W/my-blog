import type { Metadata } from "next";

type MetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
};

export const siteName = "MyBlog";
export const siteUrl = "https://my-blog-blond-chi-30.vercel.app";
export const siteLocale = "zh_CN";
export const siteDescription =
  "一个使用 Next.js、Tailwind CSS 和 shadcn/ui 构建的个人博客，记录我的学习过程、项目实践和前端思考。";
export const defaultOgImage = "/og-default.png";
export const defaultOpenGraphImage = {
  url: defaultOgImage,
  width: 1200,
  height: 630,
  alt: "MyBlog 默认分享图",
};

export function resolveSiteUrl(path: string = "/"): string {
  return new URL(path, siteUrl).toString();
}

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  publishedTime,
  tags,
}: MetadataOptions): Metadata {
  const openGraph: NonNullable<Metadata["openGraph"]> =
    type === "article"
      ? {
          type: "article",
          url: path,
          siteName,
          title,
          description,
          locale: siteLocale,
          images: [defaultOpenGraphImage],
          publishedTime,
          tags,
        }
      : {
          type: "website",
          url: path,
          siteName,
          title,
          description,
          locale: siteLocale,
          images: [defaultOpenGraphImage],
        };

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage],
    },
  };
}
