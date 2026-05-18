declare module "*.mdx" {
  import type { ComponentType } from "react";

  type MdxPostMetadata = {
    title: string;
    description: string;
    date: string;
    readingTime: string;
    tags: string[];
  };

  export const metadata: MdxPostMetadata;

  const MDXContent: ComponentType;
  export default MDXContent;
}
