import Image from "next/image";
import {
  Children,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import type { MDXComponents } from "mdx/types";

import CodeBlock from "@/components/mdx/CodeBlock";
import { cn } from "@/lib/utils";

function slugifyHeading(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u4e00-\u9fa5-]/g, "");
}

function getTextContent(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) =>
      typeof child === "string" || typeof child === "number"
        ? String(child)
        : "",
    )
    .join("");
}

function extractPlainText(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child);
      }

      if (!isValidElement(child)) {
        return "";
      }

      const props = child.props as {
        children?: ReactNode;
      };

      return extractPlainText(props.children);
    })
    .join("");
}

function extractCodeText(children: ReactNode): string {
  const childArray = Children.toArray(children);
  const lineTexts = childArray
    .map((child) => {
      if (!isValidElement(child)) {
        return null;
      }

      const props = child.props as {
        children?: ReactNode;
        "data-line"?: string;
      };

      return props["data-line"] !== undefined
        ? extractPlainText(props.children)
        : null;
    })
    .filter((lineText): lineText is string => lineText !== null);

  if (lineTexts.length > 0) {
    return lineTexts.join("\n");
  }

  return childArray
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child);
      }

      if (!isValidElement(child)) {
        return "";
      }

      const props = child.props as {
        children?: ReactNode;
        "data-line"?: string;
      };

      return extractCodeText(props.children);
    })
    .join("");
}

type CodeProps = ComponentPropsWithoutRef<"code"> & {
  "data-language"?: string;
};

type PreProps = ComponentPropsWithoutRef<"pre"> & {
  "data-language"?: string;
};

const components: MDXComponents = {
  h2: ({ children }) => {
    const heading = getTextContent(children);
    const id = slugifyHeading(heading);

    return (
      <h2 id={id} className="article-heading scroll-mt-24">
        {children}
      </h2>
    );
  },
  h3: ({ children }) => {
    const heading = getTextContent(children);
    const id = slugifyHeading(heading);

    return (
      <h3 id={id} className="article-subheading scroll-mt-24">
        {children}
      </h3>
    );
  },
  p: ({ children }) => <p>{children}</p>,
  ul: ({ children }) => <ul>{children}</ul>,
  ol: ({ children }) => <ol>{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  hr: () => <hr />,
  a: ({ href, children }) => (
    <a href={href} className="article-link">
      {children}
    </a>
  ),
  strong: ({ children }) => <strong>{children}</strong>,
  code: ({ children, className, ...props }: CodeProps) => {
    const isBlockCode = Boolean(props["data-language"]);

    if (!isBlockCode) {
      return <code className="article-inline-code">{children}</code>;
    }

    return (
      <code
        {...props}
        className={cn(
          "article-code-block__code",
          className,
        )}
      >
        {children}
      </code>
    );
  },
  pre: ({ children, className, ...props }: PreProps) => {
    const language =
      props["data-language"] && props["data-language"] !== "plaintext"
        ? props["data-language"]
        : "text";

    const rawCodeText = extractCodeText(children).trimEnd();

    return (
      <CodeBlock language={language} rawCodeText={rawCodeText}>
        <pre {...props} className={cn("article-code-block__pre", className)}>
          {children}
        </pre>
      </CodeBlock>
    );
  },
  table: ({ children }) => (
    <div className="article-table-wrapper">
      <table>{children}</table>
    </div>
  ),
  img: ({ src, alt }) => (
    <Image
      src={src ?? ""}
      alt={alt ?? ""}
      width={1200}
      height={675}
      className="rounded-2xl border border-border/70"
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
