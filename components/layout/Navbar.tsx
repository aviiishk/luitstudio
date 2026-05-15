"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FiHome, FiInfo, FiMail, FiBriefcase, FiGrid } from "react-icons/fi";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { label: "Home",     href: "/",         icon: FiHome      },
  { label: "Work",     href: "/work",     icon: FiBriefcase },
  { label: "About",    href: "/about",    icon: FiInfo      },
  { label: "Services", href: "/services", icon: FiGrid      },
  { label: "Contact",  href: "/contact",  icon: FiMail      },
];

const NAV_CLASS = "flex items-center gap-0.5 bg-white/88 dark:bg-[#0d0d18]/85 border border-black/[0.08] dark:border-white/[0.1] rounded-full px-1.5 py-1.5 shadow-[0_4px_18px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.38)] md:backdrop-blur-xl";

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <nav aria-label="Main navigation" className={NAV_CLASS}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = mounted && pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center justify-center md:justify-start gap-0 md:gap-2 px-3 md:px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 cursor-pointer ${isActive ? "bg-[#06B6D4] text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]" : "text-gray-500 dark:text-white/45 hover:text-gray-900 dark:hover:text-white hover:bg-black/[0.06] dark:hover:bg-white/[0.08]"}`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? "text-white" : "text-gray-400 dark:text-white/45 group-hover:text-gray-700 dark:group-hover:text-white"}`} />
              <span className="hidden md:inline text-xs">{item.label}</span>
            </Link>
          );
        })}
        <div className="w-px h-4 bg-black/[0.08] dark:bg-white/[0.1] mx-0.5" />
        <ThemeToggle />
      </nav>
    </header>
  );
}
