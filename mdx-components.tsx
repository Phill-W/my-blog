import Image from "next/image";
import {
  Children,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { ArrowUpRight } from "lucide-react";
import type { MDXComponents } from "mdx/types";

import ArticleImage from "@/components/mdx/ArticleImage";
import Callout from "@/components/mdx/Callout";
import CodeBlock from "@/components/mdx/CodeBlock";
import ResourceLink from "@/components/mdx/ResourceLink";
import { cn } from "@/lib/utils";

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

function isExternalHref(href?: string) {
  return Boolean(href && /^https?:\/\//.test(href));
}

const components: MDXComponents = {
  h2: ({ children, className, ...props }) => (
    <h2
      {...props}
      className={cn("article-heading scroll-mt-24", className)}
    >
      {children}
    </h2>
  ),
  h3: ({ children, className, ...props }) => (
    <h3
      {...props}
      className={cn("article-subheading scroll-mt-24", className)}
    >
      {children}
    </h3>
  ),
  p: ({ children }) => <p>{children}</p>,
  ul: ({ children }) => <ul>{children}</ul>,
  ol: ({ children }) => <ol>{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  hr: () => <hr />,
  a: ({ href, children, className, ...props }) => {
    const external = isExternalHref(href);
    const isHashLink = Boolean(href?.startsWith("#"));

    if (isHashLink) {
      return (
        <a {...props} href={href} className={className}>
          {children}
        </a>
      );
    }

    return (
      <a
        {...props}
        href={href}
        className={cn(
          "article-link",
          external && "article-link--external",
          className,
        )}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
      >
        <span>{children}</span>
        {external ? (
          <ArrowUpRight
            className="article-link__icon h-3.5 w-3.5"
            aria-hidden="true"
          />
        ) : null}
      </a>
    );
  },
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
  Callout,
  ArticleImage,
  ResourceLink,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
