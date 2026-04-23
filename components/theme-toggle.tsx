"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="grid h-9 w-9 place-items-center text-fg/80 transition-colors duration-200 hover:text-accent"
    >
      {mounted ? (
        isDark ? (
          <Sun strokeWidth={1.5} size={18} />
        ) : (
          <Moon strokeWidth={1.5} size={18} />
        )
      ) : (
        <span className="block h-[18px] w-[18px]" aria-hidden="true" />
      )}
    </button>
  );
}
