"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Container from "@/components/Container";
import { cn } from "@/lib/utils";
import { navItems, siteConfig } from "@/content/site";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          {siteConfig.siteName}
        </Link>

        <nav className="flex items-center gap-1 rounded-full border border-border/70 bg-muted/40 p-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-2 text-xs transition-colors sm:px-4 sm:text-sm",
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-background hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </Container>
    </header>
  );
}
