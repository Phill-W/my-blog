import type { ComponentType } from "react";

import Post2026LearningPlan, {
  metadata as post2026LearningPlanMetadata,
} from "./2026-learning-plan.mdx";
import PostComponentSplitting, {
  metadata as postComponentSplittingMetadata,
} from "./component-splitting.mdx";
import PostLearnNextjs, {
  metadata as postLearnNextjsMetadata,
} from "./learn-nextjs.mdx";
import PostReactBasic, {
  metadata as postReactBasicMetadata,
} from "./react-basic.mdx";
import PostStaticPageThinking, {
  metadata as postStaticPageThinkingMetadata,
} from "./static-page-thinking.mdx";
import PostTailwindCssEfficiency, {
  metadata as postTailwindCssEfficiencyMetadata,
} from "./tailwind-css-efficiency.mdx";

type BlogPostMetadata = {
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  cover?: {
    src: string;
    alt: string;
    caption?: string;
  };
};

export type BlogPostRegistryEntry = {
  slug: string;
  fileName: string;
  Content: ComponentType;
  metadata: BlogPostMetadata;
};

export const blogPostRegistry = [
  {
    slug: "2026-learning-plan",
    fileName: "2026-learning-plan.mdx",
    Content: Post2026LearningPlan,
    metadata: post2026LearningPlanMetadata,
  },
  {
    slug: "component-splitting",
    fileName: "component-splitting.mdx",
    Content: PostComponentSplitting,
    metadata: postComponentSplittingMetadata,
  },
  {
    slug: "learn-nextjs",
    fileName: "learn-nextjs.mdx",
    Content: PostLearnNextjs,
    metadata: postLearnNextjsMetadata,
  },
  {
    slug: "react-basic",
    fileName: "react-basic.mdx",
    Content: PostReactBasic,
    metadata: postReactBasicMetadata,
  },
  {
    slug: "static-page-thinking",
    fileName: "static-page-thinking.mdx",
    Content: PostStaticPageThinking,
    metadata: postStaticPageThinkingMetadata,
  },
  {
    slug: "tailwind-css-efficiency",
    fileName: "tailwind-css-efficiency.mdx",
    Content: PostTailwindCssEfficiency,
    metadata: postTailwindCssEfficiencyMetadata,
  },
] satisfies BlogPostRegistryEntry[];
