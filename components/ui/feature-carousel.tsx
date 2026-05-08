"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  Globe, Cloud, Smartphone, LayoutDashboard, Wand2, ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const FEATURES: { id: string; label: string; icon: LucideIcon; image: string; description: string }[] = [
  { id: "web",        label: "Web Development",    icon: Globe,          image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", description: "High-performance websites built for scale and speed."     },
  { id: "cloud",      label: "Cloud Systems",       icon: Cloud,          image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa", description: "Deploy and scale infrastructure seamlessly."              },
  { id: "mobile",     label: "Mobile First",        icon: Smartphone,     image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c", description: "Optimized experiences across all devices."                },
  { id: "analytics",  label: "Analytics",           icon: LayoutDashboard,image: "https://images.unsplash.com/photo-1551288049-bbda38a10ad5", description: "Real-time insights that drive smarter decisions."         },
  { id: "automation", label: "Automation",          icon: Wand2,          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e", description: "Automate workflows using AI-driven systems."              },
  { id: "security",   label: "Security",            icon: ShieldCheck,    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b", description: "Enterprise-grade security for your systems."             },
];

const ITEM_H = 56;
const AUTO_INTERVAL = 3500;

export default function FeatureCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { amount: 0.2 });

  const [step,     setStep]     = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex = step % FEATURES.length;
  const next = useCallback(() => setStep((p) => p + 1), []);

  useEffect(() => {
    if (isPaused || !isInView) return;
    const id = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [next, isPaused, isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative text-gray-900 dark:text-white py-20 sm:py-28 overflow-hidden bg-[#fafafa] dark:bg-[#08080f] border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300"
    >
      {/* Subtle glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-[#EC4899]/5 blur-[120px] rounded-full -translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[#06B6D4]/5 blur-[120px] rounded-full translate-x-1/4 translate-y-1/4" />
        {/* Scrolling dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            animation: "gridScroll 10s linear infinite",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-gradient-to-r from-[#EC4899] to-transparent" />
            <p className="font-body text-xs tracking-[0.28em] uppercase text-gray-400 dark:text-white/35">Capabilities</p>
          </div>
          <h2 className="font-heading text-[30px] sm:text-[44px] md:text-[58px] font-black leading-[0.9] tracking-tight text-gray-900 dark:text-white">
            What we build and how we{" "}
            <span className="italic bg-gradient-to-r from-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
              scale it.
            </span>
          </h2>
        </div>

        {/* Glass card */}
        <div className="relative flex flex-col lg:flex-row rounded-2xl overflow-hidden border border-gray-200 dark:border-white/[0.08] bg-white shadow-sm dark:bg-white/[0.025] dark:shadow-none backdrop-blur-sm">

          {/* Left — tab list: on mobile show horizontal scroll, on lg show vertical scroll */}
          <div className="w-full lg:w-[38%] border-b border-gray-100 dark:border-white/[0.06] lg:border-b-0 lg:border-r lg:border-r-gray-100 dark:lg:border-r-white/[0.06]">

            {/* Mobile: horizontal scrollable tabs */}
            <div className="lg:hidden flex gap-2 overflow-x-auto no-scrollbar px-4 py-4">
              {FEATURES.map((f, idx) => {
                const isActive = idx === currentIndex;
                const Icon = f.icon;
                return (
                  <button
                    key={f.id}
                    onClick={() => { setStep(idx); setIsPaused(true); }}
                    className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-body transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#06B6D4] border-[#06B6D4] text-white"
                        : "border-gray-200 dark:border-white/12 text-gray-500 dark:text-white/40 hover:border-gray-300 dark:hover:border-white/25 hover:text-gray-700 dark:hover:text-white/70"
                    }`}
                  >
                    <Icon size={13} />
                    <span className="whitespace-nowrap">{f.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Desktop: vertical scrolling list */}
            <div
              className="hidden lg:block relative overflow-hidden px-6 py-12"
              style={{ minHeight: ITEM_H * FEATURES.length + 96 }}
            >
              {FEATURES.map((f, idx) => {
                const isActive = idx === currentIndex;
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.id}
                    animate={{ y: (idx - currentIndex) * ITEM_H, opacity: isActive ? 1 : 0.28 }}
                    transition={{ type: "spring", stiffness: 100, damping: 22 }}
                    className="absolute left-6 will-change-transform"
                  >
                    <button
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                      onClick={() => setStep(idx)}
                      className={`flex items-center gap-3 px-5 py-3 rounded-full border transition-all duration-200 font-body cursor-pointer ${
                        isActive
                          ? "bg-[#06B6D4] border-[#06B6D4] text-white"
                          : "border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/40 hover:border-gray-300 dark:hover:border-white/22 hover:text-gray-700 dark:hover:text-white/70"
                      }`}
                    >
                      <Icon size={15} />
                      <span className="text-sm uppercase tracking-wider">{f.label}</span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right — image panel */}
          <div className="flex-1 relative min-h-[260px] sm:min-h-[380px]">
            {FEATURES.map((f, idx) => {
              const isActive = idx === currentIndex;
              return (
                <motion.div
                  key={f.id}
                  animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.97 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 will-change-transform"
                  aria-hidden={!isActive}
                >
                  <Image
                    src={f.image} alt={f.label}
                    fill
                    sizes="(max-width:1024px) 100vw, 62vw"
                    className="object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="absolute bottom-0 p-5 sm:p-8"
                    >
                      <p className="text-white/35 text-[10px] uppercase mb-2 tracking-widest font-body">{f.label}</p>
                      <h3 className="font-heading text-lg sm:text-2xl md:text-3xl max-w-md text-white">{f.description}</h3>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gridScroll { 0%{background-position:0 0} 100%{background-position:0 40px} }
        .no-scrollbar::-webkit-scrollbar { display:none }
        .no-scrollbar { -ms-overflow-style:none; scrollbar-width:none }
      `}</style>
    </section>
  );
}
