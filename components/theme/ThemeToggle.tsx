"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "切换到亮色主题" : "切换到暗色主题"}
      aria-pressed={isDark}
      onClick={() => {
        setTheme(isDark ? "light" : "dark");
      }}
      className={cn(
        "relative inline-flex h-10 w-[80px] items-center rounded-full border border-border bg-background p-1 shadow-sm transition-colors hover:bg-muted/40",
        className,
      )}
    >
      <span
        className={cn(
          "absolute left-1 top-1 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background shadow-sm transition-transform duration-200",
          isDark ? "translate-x-8" : "translate-x-0",
        )}
      >
        {isDark ? (
          <Moon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Sun className="h-4 w-4" aria-hidden="true" />
        )}
      </span>

      <span className="flex h-8 w-8 items-center justify-center text-muted-foreground">
        <Sun className="h-4 w-4" aria-hidden="true" />
      </span>

      <span className="ml-auto flex h-8 w-8 items-center justify-center text-muted-foreground">
        <Moon className="h-4 w-4" aria-hidden="true" />
      </span>
    </button>
  );
}
