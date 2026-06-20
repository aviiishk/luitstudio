"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  Cloud,
  Globe,
  LayoutDashboard,
  ShieldCheck,
  Smartphone,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import { BLUR_DATA_URL, CAPABILITY_IMAGES } from "@/lib/site-images";

const FEATURES: { id: string; label: string; icon: LucideIcon; image: string; description: string }[] = [
  { id: "web", label: "Web Development", icon: Globe, image: CAPABILITY_IMAGES.web, description: "High-performance websites built for scale and speed." },
  { id: "cloud", label: "Cloud Systems", icon: Cloud, image: CAPABILITY_IMAGES.cloud, description: "Deploy and scale infrastructure seamlessly." },
  { id: "mobile", label: "Mobile First", icon: Smartphone, image: CAPABILITY_IMAGES.mobile, description: "Optimized experiences across all devices." },
  { id: "analytics", label: "Analytics", icon: LayoutDashboard, image: CAPABILITY_IMAGES.analytics, description: "Real-time insights that drive smarter decisions." },
  { id: "automation", label: "Automation", icon: Wand2, image: CAPABILITY_IMAGES.automation, description: "Automate workflows using AI-driven systems." },
  { id: "security", label: "Security", icon: ShieldCheck, image: CAPABILITY_IMAGES.security, description: "Enterprise-grade security for your systems." },
];

const ITEM_H = 56;
const AUTO_INTERVAL = 4200;

export default function FeatureCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });
  const shouldReduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex = step % FEATURES.length;
  const activeFeature = FEATURES[currentIndex];
  const next = useCallback(() => setStep((p) => p + 1), []);

  useEffect(() => {
    if (isPaused || !isInView || shouldReduce) return;
    const id = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [next, isPaused, isInView, shouldReduce]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-gray-100 bg-[#fafafa] py-20 text-gray-900 transition-colors duration-300 sm:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 hidden h-[320px] w-[380px] -translate-x-1/4 -translate-y-1/4 rounded-full bg-[#EC4899]/4 blur-[70px] md:block" />
        <div className="absolute bottom-0 right-0 hidden h-[320px] w-[380px] translate-x-1/4 translate-y-1/4 rounded-full bg-[#06B6D4]/4 blur-[70px] md:block" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            animation: shouldReduce ? "none" : "gridScroll 16s linear infinite",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mb-12 sm:mb-16">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-[#EC4899] to-transparent" />
            <p className="font-body text-xs uppercase tracking-[0.28em] text-gray-400">Capabilities</p>
          </div>
          <h2 className="font-heading text-[30px] font-black leading-[0.9] tracking-tight text-gray-900 sm:text-[44px] md:text-[58px]">
            What we build and how we{" "}
            <span className="bg-gradient-to-r from-[#EC4899] to-[#06B6D4] bg-clip-text italic text-transparent">
              scale it.
            </span>
          </h2>
        </div>

        <div className="relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:flex-row">
          <div className="pointer-events-none absolute -right-20 top-8 z-0 hidden h-64 w-64 rounded-full bg-[#06B6D4]/10 blur-[54px] md:block" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-20 right-24 z-0 hidden h-56 w-80 rounded-full bg-[#EC4899]/8 blur-[58px] md:block" aria-hidden="true" />

          <div className="relative z-10 w-full border-b border-gray-100 lg:w-[38%] lg:border-b-0 lg:border-r lg:border-r-gray-100">
            <div className="flex gap-2 overflow-x-auto px-4 py-4 lg:hidden no-scrollbar">
              {FEATURES.map((f, idx) => {
                const isActive = idx === currentIndex;
                const Icon = f.icon;
                return (
                  <button
                    key={f.id}
                    onClick={() => { setStep(idx); setIsPaused(true); }}
                    className={`group flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 font-body text-xs font-semibold tracking-[0.04em] antialiased transition-transform duration-300 hover:-translate-y-0.5 ${
                      isActive
                        ? "border-white/35 bg-gradient-to-r from-[#06B6D4] via-[#39D5E8] to-[#EC4899] text-white shadow-[0_12px_28px_rgba(6,182,212,0.22),inset_0_1px_0_rgba(255,255,255,0.3)]"
                        : "border-gray-300/80 bg-white/72 text-gray-700 shadow-[0_6px_18px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.5)] hover:border-[#06B6D4]/55 hover:bg-white/90 hover:text-gray-950"
                    }`}
                  >
                    <Icon size={13} className={isActive ? "text-white" : "text-gray-600 group-hover:text-[#0891B2]"} />
                    <span className="whitespace-nowrap">{f.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="relative hidden overflow-hidden px-6 py-12 lg:block" style={{ minHeight: ITEM_H * FEATURES.length + 96 }}>
              {FEATURES.map((f, idx) => {
                const isActive = idx === currentIndex;
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.id}
                    animate={{ y: (idx - currentIndex) * ITEM_H, opacity: isActive ? 1 : 0.3 }}
                    transition={{ type: "spring", stiffness: 110, damping: 24 }}
                    className="absolute left-6 will-change-transform"
                  >
                    <button
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                      onClick={() => setStep(idx)}
                      className={`group flex cursor-pointer items-center gap-3 rounded-full border px-5 py-3 font-body font-semibold antialiased transition-transform duration-300 hover:-translate-y-0.5 ${
                        isActive
                          ? "border-white/35 bg-gradient-to-r from-[#06B6D4] via-[#32D3E8] to-[#EC4899] text-white shadow-[0_14px_34px_rgba(6,182,212,0.2),inset_0_1px_0_rgba(255,255,255,0.3)]"
                          : "border-gray-300/80 bg-white/70 text-gray-700 shadow-[0_8px_22px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.5)] hover:border-[#06B6D4]/55 hover:bg-white/90 hover:text-gray-950"
                      }`}
                    >
                      <Icon size={15} className={isActive ? "text-white" : "text-gray-600 group-hover:text-[#0891B2]"} />
                      <span className="text-sm uppercase tracking-[0.13em]">{f.label}</span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 min-h-[260px] flex-1 overflow-hidden bg-[#050713] sm:min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.id}
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0 will-change-transform"
              >
                <motion.div
                  className="absolute inset-0"
                  animate={shouldReduce || !isInView ? { scale: 1.04 } : { scale: [1.04, 1.08], x: [0, -8], y: [0, 5] }}
                  transition={{ duration: 10, ease: "easeInOut", repeat: shouldReduce || !isInView ? 0 : Infinity, repeatType: "reverse" }}
                >
                  <Image
                    src={activeFeature.image}
                    alt={activeFeature.label}
                    fill
                    sizes="(max-width:1024px) 100vw, 62vw"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover opacity-[0.92] saturate-[1.1] contrast-[1.08]"
                  />
                </motion.div>
                <motion.div
                  className="absolute inset-x-[-12%] bottom-[12%] hidden h-24 bg-[linear-gradient(90deg,transparent,rgba(6,182,212,0.14),rgba(236,72,153,0.1),transparent)] blur-[28px] md:block"
                  animate={shouldReduce || !isInView ? undefined : { x: ["-3%", "3%", "-3%"], opacity: [0.42, 0.7, 0.46] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(6,182,212,0.16),transparent_30%),radial-gradient(circle_at_30%_34%,rgba(236,72,153,0.1),transparent_34%),linear-gradient(90deg,rgba(5,7,19,0.42),rgba(5,7,19,0.04)_46%,rgba(5,7,19,0.24)),linear-gradient(180deg,rgba(5,7,19,0.04),rgba(5,7,19,0.22)_50%,rgba(0,0,0,0.92))]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(2,6,18,0.46)_76%,rgba(0,0,0,0.86)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 h-[54%] bg-black/10 [mask-image:linear-gradient(transparent,black_38%)]" />
                <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.45'/%3E%3C/svg%3E\")" }} />
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute bottom-0 p-5 drop-shadow-[0_14px_34px_rgba(0,0,0,0.62)] sm:p-8"
                >
                  <p className="mb-3 inline-flex rounded-full border border-white/[0.12] bg-white/[0.08] px-3 py-1.5 font-body text-[10px] uppercase tracking-[0.24em] text-white/[0.55]">{activeFeature.label}</p>
                  <h3 className="font-heading max-w-md text-lg text-white drop-shadow-[0_0_24px_rgba(6,182,212,0.16)] sm:text-2xl md:text-3xl">{activeFeature.description}</h3>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gridScroll { 0%{background-position:0 0} 100%{background-position:0 48px} }
        .no-scrollbar::-webkit-scrollbar { display:none }
        .no-scrollbar { -ms-overflow-style:none; scrollbar-width:none }
      `}</style>
    </section>
  );
}
