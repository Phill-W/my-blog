import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-autolink-headings",
        {
          behavior: "wrap",
          properties: {
            className: ["article-heading__anchor"],
          },
        },
      ],
      [
        "rehype-pretty-code",
        {
          theme: {
            dark: "github-dark-dimmed",
            light: "github-light",
          },
          keepBackground: false,
          bypassInlineCode: true,
          defaultLang: {
            block: "text",
          },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
