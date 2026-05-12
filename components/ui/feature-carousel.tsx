"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  Globe, Cloud, Smartphone, LayoutDashboard, Wand2, ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const FEATURES: { id: string; label: string; icon: LucideIcon; image: string; description: string }[] = [
  { id: "web",        label: "Web Development",    icon: Globe,          image: "/capabilities/web-development.png", description: "High-performance websites built for scale and speed."     },
  { id: "cloud",      label: "Cloud Systems",       icon: Cloud,          image: "/capabilities/cloud-systems.png",    description: "Deploy and scale infrastructure seamlessly."              },
  { id: "mobile",     label: "Mobile First",        icon: Smartphone,     image: "/capabilities/mobile-first.png",     description: "Optimized experiences across all devices."                },
  { id: "analytics",  label: "Analytics",           icon: LayoutDashboard,image: "/capabilities/analytics.png",        description: "Real-time insights that drive smarter decisions."         },
  { id: "automation", label: "Automation",          icon: Wand2,          image: "/capabilities/automation.png",       description: "Automate workflows using AI-driven systems."              },
  { id: "security",   label: "Security",            icon: ShieldCheck,    image: "/capabilities/security.png",         description: "Enterprise-grade security for your systems."             },
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
          <div className="pointer-events-none absolute -right-24 top-8 z-0 h-80 w-80 rounded-full bg-[#06B6D4]/12 blur-[90px]" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-28 right-24 z-0 h-72 w-96 rounded-full bg-[#EC4899]/10 blur-[100px]" aria-hidden="true" />

          {/* Left — tab list: on mobile show horizontal scroll, on lg show vertical scroll */}
          <div className="relative z-10 w-full lg:w-[38%] border-b border-gray-100 dark:border-white/[0.06] lg:border-b-0 lg:border-r lg:border-r-gray-100 dark:lg:border-r-white/[0.06]">

            {/* Mobile: horizontal scrollable tabs */}
            <div className="lg:hidden flex gap-2 overflow-x-auto no-scrollbar px-4 py-4">
              {FEATURES.map((f, idx) => {
                const isActive = idx === currentIndex;
                const Icon = f.icon;
                return (
                  <button
                    key={f.id}
                    onClick={() => { setStep(idx); setIsPaused(true); }}
                    className={`group shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-body font-semibold tracking-[0.04em] antialiased transition-all duration-300 cursor-pointer backdrop-blur-xl hover:-translate-y-0.5 ${
                      isActive
                        ? "bg-gradient-to-r from-[#06B6D4] via-[#39D5E8] to-[#EC4899] border-white/35 text-white shadow-[0_14px_36px_rgba(6,182,212,0.28),inset_0_1px_0_rgba(255,255,255,0.34)]"
                        : "bg-white/72 dark:bg-white/[0.055] border-gray-300/80 dark:border-white/[0.16] text-gray-700 dark:text-white/[0.72] shadow-[0_8px_24px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.55)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#06B6D4]/55 dark:hover:border-[#67E8F9]/38 hover:bg-white/90 dark:hover:bg-white/[0.09] hover:text-gray-950 dark:hover:text-white hover:shadow-[0_14px_34px_rgba(6,182,212,0.14),inset_0_1px_0_rgba(255,255,255,0.62)] dark:hover:shadow-[0_14px_34px_rgba(6,182,212,0.14),inset_0_1px_0_rgba(255,255,255,0.13)]"
                    }`}
                  >
                    <Icon
                      size={13}
                      className={`transition-all duration-300 ${
                        isActive
                          ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.55)]"
                          : "text-gray-600 dark:text-white/[0.68] group-hover:text-[#0891B2] dark:group-hover:text-[#67E8F9] group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.42)]"
                      }`}
                    />
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
                      className={`group flex items-center gap-3 px-5 py-3 rounded-full border transition-all duration-300 font-body font-semibold antialiased cursor-pointer backdrop-blur-xl hover:-translate-y-0.5 ${
                        isActive
                          ? "bg-gradient-to-r from-[#06B6D4] via-[#32D3E8] to-[#EC4899] border-white/35 text-white shadow-[0_18px_44px_rgba(6,182,212,0.24),0_0_34px_rgba(236,72,153,0.16),inset_0_1px_0_rgba(255,255,255,0.34)]"
                          : "bg-white/70 dark:bg-white/[0.045] border-gray-300/80 dark:border-white/[0.15] text-gray-700 dark:text-white/[0.68] shadow-[0_10px_28px_rgba(15,23,42,0.055),inset_0_1px_0_rgba(255,255,255,0.56)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] hover:border-[#06B6D4]/55 dark:hover:border-[#67E8F9]/38 hover:bg-white/90 dark:hover:bg-white/[0.085] hover:text-gray-950 dark:hover:text-white hover:shadow-[0_16px_38px_rgba(6,182,212,0.13),inset_0_1px_0_rgba(255,255,255,0.64)] dark:hover:shadow-[0_16px_38px_rgba(6,182,212,0.13),inset_0_1px_0_rgba(255,255,255,0.12)]"
                      }`}
                    >
                      <Icon
                        size={15}
                        className={`transition-all duration-300 ${
                          isActive
                            ? "text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.58)]"
                            : "text-gray-600 dark:text-white/[0.66] group-hover:text-[#0891B2] dark:group-hover:text-[#67E8F9] group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.42)]"
                        }`}
                      />
                      <span className="text-sm uppercase tracking-[0.13em]">{f.label}</span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right — image panel */}
          <div className="relative z-10 flex-1 min-h-[260px] sm:min-h-[380px] overflow-hidden bg-[#050713]">
            {FEATURES.map((f, idx) => {
              const isActive = idx === currentIndex;
              return (
                <motion.div
                  key={f.id}
                  animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.985 }}
                  transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute inset-0 will-change-transform"
                  aria-hidden={!isActive}
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={isActive ? { scale: [1.06, 1.11], x: [0, -10], y: [0, 6] } : { scale: 1.06 }}
                    transition={{ duration: 8, ease: "easeInOut", repeat: isActive ? Infinity : 0, repeatType: "reverse" }}
                  >
                    <Image
                      src={f.image} alt={f.label}
                      fill
                      sizes="(max-width:1024px) 100vw, 62vw"
                      className="object-cover opacity-[0.92] saturate-[1.1] contrast-[1.08]"
                    />
                  </motion.div>
                  <motion.div
                    className="absolute inset-x-[-12%] bottom-[12%] h-28 bg-[linear-gradient(90deg,transparent,rgba(6,182,212,0.18),rgba(236,72,153,0.14),transparent)] blur-[42px]"
                    animate={isActive ? { x: ["-3%", "3%", "-3%"], opacity: [0.45, 0.8, 0.5] } : undefined}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(6,182,212,0.18),transparent_30%),radial-gradient(circle_at_30%_34%,rgba(236,72,153,0.12),transparent_34%),linear-gradient(90deg,rgba(5,7,19,0.42),rgba(5,7,19,0.04)_46%,rgba(5,7,19,0.24)),linear-gradient(180deg,rgba(5,7,19,0.04),rgba(5,7,19,0.22)_50%,rgba(0,0,0,0.92))]" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(2,6,18,0.46)_76%,rgba(0,0,0,0.86)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 h-[54%] backdrop-blur-[1.5px] [mask-image:linear-gradient(transparent,black_38%)]" />
                  <div className="absolute inset-0 opacity-[0.11] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E\")" }} />
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="absolute bottom-0 p-5 sm:p-8 drop-shadow-[0_18px_42px_rgba(0,0,0,0.72)]"
                    >
                      <p className="inline-flex rounded-full border border-white/[0.12] bg-white/[0.06] px-3 py-1.5 text-white/[0.55] text-[10px] uppercase mb-3 tracking-[0.24em] font-body backdrop-blur-xl">{f.label}</p>
                      <h3 className="font-heading text-lg sm:text-2xl md:text-3xl max-w-md text-white drop-shadow-[0_0_28px_rgba(6,182,212,0.18)]">{f.description}</h3>
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
