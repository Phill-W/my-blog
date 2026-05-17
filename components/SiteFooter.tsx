"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { FaEnvelope, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

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
            <Link
              href="mailto:email@example.com"
              className="flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <FaEnvelope className="h-4 w-4" />
              <span>email@example.com</span>
            </Link>

            <Link
              href="https://github.com"
              className="flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <FaGithub className="h-4 w-4" />
              <span>GitHub</span>
            </Link>

            <Link
              href="https://linkedin.com"
              className="flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <FaLinkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </Link>

            <Link
              href="https://x.com"
              className="flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <FaXTwitter className="h-4 w-4" />
              <span>X</span>
            </Link>
          </div>
        </div>

        <hr className="my-4 border-border/50" />

        <div className="relative flex items-center justify-center text-sm text-muted-foreground">
          <p>© 2026 MyBlog. All rights reserved.</p>

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
