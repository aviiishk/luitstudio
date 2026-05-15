"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const BTN_CLASS = "relative flex items-center justify-center w-8 h-8 rounded-full border border-black/[0.1] dark:border-white/[0.12] bg-black/[0.04] dark:bg-white/[0.06] hover:border-[#06B6D4]/50 hover:bg-[#06B6D4]/10 text-gray-500 dark:text-white/50 hover:text-[#06B6D4] dark:hover:text-[#06B6D4] transition-all duration-200 cursor-pointer overflow-hidden";

export default function ThemeToggle() {
  const { toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      suppressHydrationWarning
      className={BTN_CLASS}
    >
      {/* CSS controls visibility — no JS state involved, no hydration mismatch */}
      <Moon size={14} className="hidden dark:block" aria-hidden="true" />
      <Sun  size={14} className="block  dark:hidden" aria-hidden="true" />
    </button>
  );
}
