declare module "*.mdx" {
  import type { ComponentType } from "react";

  type MdxPostCover = {
    src: string;
    alt: string;
    caption?: string;
  };

  type MdxPostMetadata = {
    title: string;
    description: string;
    date: string;
    readingTime: string;
    tags: string[];
    cover?: MdxPostCover;
  };

  export const metadata: MdxPostMetadata;

  const MDXContent: ComponentType;
  export default MDXContent;
}
