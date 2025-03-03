"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div 
        className="w-10 h-10 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg"
        role="presentation"
        aria-hidden="true"
      />
    );
  }

  return (
    <Button
      size="icon"
      className="relative p-3 rounded-full transition-colors"
      onClick={() => setTheme((theme) => (theme === "dark" ? "light" : "dark"))}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      type="button"
    >
      <Sun 
        className="h-5 w-5 text-muted-foreground transition-all dark:hidden" 
        aria-hidden="true"
      />
      <Moon 
        className="h-5 w-5 text-muted-foreground transition-all hidden dark:block"
        aria-hidden="true"
      />
    </Button>
  );
}
