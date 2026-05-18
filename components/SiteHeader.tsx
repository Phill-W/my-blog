"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

import Container from "@/components/Container";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { navItems, siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

type HeaderNavLinkProps = {
  href: string;
  label: string;
  pathname: string;
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
};

function isNavItemActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function HeaderNavLink({
  href,
  label,
  pathname,
  variant,
  onNavigate,
}: HeaderNavLinkProps) {
  const isActive = isNavItemActive(pathname, href);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "transition-colors",
        variant === "desktop"
          ? "rounded-full px-3 py-2 text-xs sm:px-4 sm:text-sm"
          : "rounded-xl px-4 py-3 text-sm font-medium",
        isActive
          ? "bg-foreground text-background"
          : "text-muted-foreground hover:bg-background hover:text-foreground",
      )}
    >
      {label}
    </Link>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((current) => !current);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/90 backdrop-blur">
      <Container className="relative flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground"
          onClick={handleCloseMenu}
        >
          {siteConfig.siteName}
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-muted/40 p-1 md:flex">
          {navItems.map((item) => (
            <HeaderNavLink
              key={item.href}
              href={item.href}
              label={item.label}
              pathname={pathname}
              variant="desktop"
            />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            aria-label={isMenuOpen ? "关闭导航菜单" : "打开导航菜单"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-site-navigation"
            onClick={handleToggleMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-muted/40 text-foreground transition-colors hover:bg-muted md:hidden"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {isMenuOpen ? (
          <div
            id="mobile-site-navigation"
            className="absolute inset-x-4 top-full z-50 mt-2 rounded-2xl border border-border/70 bg-background p-2 shadow-lg md:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label="移动端导航">
              {navItems.map((item) => (
                <HeaderNavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  pathname={pathname}
                  variant="mobile"
                  onNavigate={handleCloseMenu}
                />
              ))}
            </nav>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
