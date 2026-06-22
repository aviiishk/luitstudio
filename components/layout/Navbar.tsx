"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiStar, FiBookOpen, FiChevronLeft } from "react-icons/fi";
const navItems = [
  { label: "Home",   href: "/",           icon: FiHome     },
  { label: "Blog",   href: "/blog",       icon: FiBookOpen },
  { label: "Intern", href: "/internship", icon: FiStar     },
];

const PILL = "bg-white/90 border border-black/8 shadow-[0_4px_18px_rgba(0,0,0,0.08)] backdrop-blur-xl";

export default function Navbar() {
  const pathname  = usePathname();
  const [open, setOpen]         = useState(false);

  return (
    <>
      {/* ── Logo ─────────────────────────────────────── */}
      <div className="fixed top-3 left-3 sm:top-4 sm:left-8 lg:left-14 z-50">
        <Link href="/" onClick={() => setOpen(false)}>
          <Image
            src="/logo/logo-lightmode.png"
            alt="Luit Studio"
            width={320} height={100}
            className="w-auto h-14 sm:h-12 lg:h-16"
            priority
          />
        </Link>
      </div>

      {/* ── Desktop pill nav ─────────────────────────── */}
      <header className="hidden md:block fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <nav aria-label="Main navigation" className={`flex items-center gap-0.5 ${PILL} rounded-full px-1.5 py-1.5`}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}
                className={`group flex items-center gap-0 lg:gap-2 px-3 lg:px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#111110] text-white"
                    : "text-gray-500 hover:text-gray-900 hover:bg-black/6"
                }`}>
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-700"}`} />
                <span className="hidden lg:inline text-xs">{item.label}</span>
              </Link>
            );
          })}
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
          <FiChevronLeft size={18} className="text-gray-700" />
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
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}
                    className={`flex items-center justify-center px-1.5 py-1 rounded-full transition-all duration-200 cursor-pointer shrink-0 ${
                      isActive
                        ? "bg-[#111110] text-white"
                        : "text-gray-500 hover:text-gray-900 hover:bg-black/6"
                    }`}>
                    <Icon size={13} />
                  </Link>
                );
              })}
              <div className="w-px h-4 bg-black/8 mx-0.5 shrink-0" />
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
