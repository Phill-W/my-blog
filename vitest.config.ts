import path from "node:path";

import { defineConfig } from "vitest/config";

function metadataOnlyMdxPlugin() {
  return {
    name: "metadata-only-mdx",
    enforce: "pre" as const,
    transform(code: string, id: string) {
      if (!id.endsWith(".mdx")) {
        return null;
      }

      const metadataMatch = code.match(/export const metadata = \{[\s\S]*?\n\};?/);

      if (!metadataMatch) {
        throw new Error(`无法从 MDX 文件中提取 metadata: ${id}`);
      }

      return {
        code: `${metadataMatch[0]}\nexport default function MDXContent() { return null; }\n`,
        map: null,
      };
    },
  };
}

export default defineConfig({
  plugins: [metadataOnlyMdxPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
