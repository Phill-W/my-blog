"use client";

import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

import Container from "@/components/Container";
import { contacts, siteConfig } from "@/content/site";

function getContactIcon(label: string) {
  switch (label) {
    case "邮箱":
      return <Mail className="h-4 w-4" aria-hidden="true" />;
    case "GitHub":
      return <FaGithub className="h-4 w-4" aria-hidden="true" />;
    case "LinkedIn":
      return <FaLinkedinIn className="h-4 w-4" aria-hidden="true" />;
    case "X":
      return <FaXTwitter className="h-4 w-4" aria-hidden="true" />;
    default:
      return null;
  }
}

function isExternalLink(href: string) {
  return /^https?:\/\//.test(href);
}

export default function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border/70 bg-background">
      <Container className="py-4">
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          <span className="font-semibold text-foreground">联系方式</span>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            {contacts.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                target={isExternalLink(item.href) ? "_blank" : undefined}
                rel={isExternalLink(item.href) ? "noreferrer" : undefined}
              >
                {getContactIcon(item.label)}
                <span>{item.value}</span>
              </Link>
            ))}
          </div>
        </div>

        <hr className="my-4 border-border/50" />

        <div className="relative flex items-center justify-center text-sm text-muted-foreground">
          <p>{siteConfig.footerText}</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="absolute right-0 rounded-md border border-border bg-muted/40 p-1.5 transition-colors hover:bg-muted"
            aria-label="返回顶部"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </Container>
    </footer>
  );
}
