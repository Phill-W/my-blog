"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { FaEnvelope, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { contacts, siteConfig } from "@/content/site";
import Container from "@/components/Container";

export default function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border/70 bg-background">
      <Container className="py-4">
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          <span className="font-semibold text-foreground">联系我</span>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            {contacts.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.label}: {item.value}
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
            aria-label="回到顶部"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </Container>
    </footer>
  );
}
