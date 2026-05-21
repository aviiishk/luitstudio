"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiInfo, FiMail, FiBriefcase, FiGrid, FiStar, FiBookOpen, FiChevronLeft } from "react-icons/fi";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { label: "Home",     href: "/",         icon: FiHome      },
  { label: "Work",     href: "/work",     icon: FiBriefcase },
  { label: "About",    href: "/about",    icon: FiInfo      },
  { label: "Services", href: "/services", icon: FiGrid      },
  { label: "Blog",     href: "/blog",     icon: FiBookOpen  },
  { label: "Contact",  href: "/contact",  icon: FiMail      },
  { label: "Intern",   href: "/internship", icon: FiStar      },
];

const PILL = "bg-white/90 dark:bg-[#0d0d18]/90 border border-black/8 dark:border-white/10 shadow-[0_4px_18px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.38)] backdrop-blur-xl";

export default function Navbar() {
  const pathname  = usePathname();
  const [mounted, setMounted]   = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      {/* ── Logo ─────────────────────────────────────── */}
      <div className="fixed top-3 left-3 sm:top-4 sm:left-8 lg:left-14 z-50">
        <Link href="/" onClick={() => setOpen(false)}>
          <Image
            src="/logo/logo-lightmode.png"
            alt="Luit Studio"
            width={320} height={100}
            className="dark:hidden w-auto h-14 sm:h-12 lg:h-16"
            priority
          />
          <Image
            src="/logo/logo-darkmode.png"
            alt="Luit Studio"
            width={320} height={100}
            className="hidden dark:block w-auto h-14 sm:h-12 lg:h-16"
            priority
          />
        </Link>
      </div>

      {/* ── Desktop pill nav ─────────────────────────── */}
      <header className="hidden md:block fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <nav aria-label="Main navigation" className={`flex items-center gap-0.5 ${PILL} rounded-full px-1.5 py-1.5`}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = mounted && pathname === item.href;
            return (
              <Link key={item.href} href={item.href}
                className={`group flex items-center gap-0 lg:gap-2 px-3 lg:px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#06B6D4] text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                    : "text-gray-500 dark:text-white/45 hover:text-gray-900 dark:hover:text-white hover:bg-black/6 dark:hover:bg-white/8"
                }`}>
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-white" : "text-gray-400 dark:text-white/45 group-hover:text-gray-700 dark:group-hover:text-white"}`} />
                <span className="hidden lg:inline text-xs">{item.label}</span>
              </Link>
            );
          })}
          <div className="w-px h-4 bg-black/8 dark:bg-white/10 mx-0.5" />
          <ThemeToggle />
        </nav>
      </header>

      {/* ── Mobile: arrow trigger ─────────────────────── */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close navigation" : "Open navigation"}
        className={`fixed top-3 right-3 z-60 md:hidden w-10 h-10 rounded-2xl flex items-center justify-center cursor-pointer transition-colors duration-200 ${PILL}`}
      >
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
          <FiChevronLeft size={18} className="text-gray-700 dark:text-white/70" />
        </motion.div>
      </button>

      {/* ── Mobile: sliding horizontal pill ─────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Invisible backdrop to close on outside tap */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40 md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Same pill badge — slides in from right, sits left of the arrow */}
            <motion.nav
              key="mobile-pill"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className={`fixed top-3 right-14 z-50 md:hidden flex items-center gap-0 px-1 py-1 rounded-full ${PILL} overflow-x-auto max-w-[calc(100vw-130px)]`}
            >
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = mounted && pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}
                    className={`flex items-center justify-center px-1.5 py-1 rounded-full transition-all duration-200 cursor-pointer shrink-0 ${
                      isActive
                        ? "bg-[#06B6D4] text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                        : "text-gray-500 dark:text-white/45 hover:text-gray-900 dark:hover:text-white hover:bg-black/6 dark:hover:bg-white/8"
                    }`}>
                    <Icon size={13} />
                  </Link>
                );
              })}
              <div className="w-px h-4 bg-black/8 dark:bg-white/10 mx-0.5 shrink-0" />
              <div className="shrink-0"><ThemeToggle /></div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
