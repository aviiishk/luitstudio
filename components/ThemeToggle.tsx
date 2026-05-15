"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const BTN_CLASS = "relative flex items-center justify-center w-8 h-8 rounded-full border border-black/[0.1] dark:border-white/[0.12] bg-black/[0.04] dark:bg-white/[0.06] hover:border-[#06B6D4]/50 hover:bg-[#06B6D4]/10 text-gray-500 dark:text-white/50 hover:text-[#06B6D4] dark:hover:text-[#06B6D4] transition-all duration-200 cursor-pointer overflow-hidden";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Before mount render a neutral placeholder — prevents server/client mismatch
  if (!mounted) {
    return <button aria-label="Toggle theme" className={BTN_CLASS} />;
  }

  const isDark = theme === "dark";

  return (
    <button onClick={toggle} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} className={BTN_CLASS}>
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span key="moon" initial={{ rotate: -30, opacity: 0, scale: 0.7 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 30, opacity: 0, scale: 0.7 }} transition={{ duration: 0.2 }} className="absolute">
            <Moon size={14} />
          </motion.span>
        ) : (
          <motion.span key="sun" initial={{ rotate: 30, opacity: 0, scale: 0.7 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -30, opacity: 0, scale: 0.7 }} transition={{ duration: 0.2 }} className="absolute">
            <Sun size={14} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
