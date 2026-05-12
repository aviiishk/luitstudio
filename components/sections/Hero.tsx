"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { ArrowRight, Code2, Smartphone, Layers } from "lucide-react";
import { PROJECT_ARTWORK } from "@/lib/project-artwork";
import { BLUR_DATA_URL, HERO_IMAGES } from "@/lib/site-images";

/* ─── Constants ─────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const wordVariant = {
  hidden: { opacity: 0, y: 64, rotateX: -20 },
  show: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 0.75, delay: i * 0.12, ease: EASE },
  }),
};

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: EASE } },
});

const STATS = [
  { num: 50, suffix: "+",  label: "Projects done"  },
  { num: 48, suffix: "★",  label: "Client rating"  },
  { num: 3,  suffix: "×",  label: "Average growth" },
];

const SERVICES = [
  "Web Development", "App Development", "UI/UX Design",
  "SEO Optimization", "Performance Marketing", "Branding",
  "Web Development", "App Development", "UI/UX Design",
  "SEO Optimization", "Performance Marketing", "Branding",
];

const TECH = ["Next.js", "React Native", "TypeScript", "Tailwind CSS", "Node.js", "Figma", "Flutter", "PostgreSQL"];

const FLOATING_CARDS = [
  { title: "FinTrack Dashboard", category: "Web App",      tags: ["Next.js", "UI/UX"],    img: PROJECT_ARTWORK.fintrack,  icon: <Layers     size={13} />, accent: "#EC4899", rotate: "-3deg", top: "6%",  right: "2%"  },
  { title: "NexMobile App",      category: "Mobile App",   tags: ["React Native", "iOS"], img: PROJECT_ARTWORK.nexmobile, icon: <Smartphone size={13} />, accent: "#06B6D4", rotate: "3deg",  top: "43%", right: "17%" },
  { title: "RankBoost SEO",      category: "SEO & Growth", tags: ["SEO", "Growth"],       img: PROJECT_ARTWORK.rankboost, icon: <Code2      size={13} />, accent: "#EC4899", rotate: "-2deg", top: "74%", right: "2%"  },
];

/* ─── Sub-components ────────────────────────────────────── */
function Counter({ to, suffix }: { to: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const steps = 36;
    const inc = to / steps;
    const timer = setInterval(() => {
      current += inc;
      if (current >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.round(current));
    }, 28);
    return () => clearInterval(timer);
  }, [inView, to]);

  const display = to === 48 ? (count / 10).toFixed(1) : count;
  return <span ref={ref}>{display}{suffix}</span>;
}

function MagneticWrap({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const onMove = useCallback((e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.22,
      y: (e.clientY - rect.top - rect.height / 2) * 0.22,
    });
  }, [isMobile]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 280, damping: 18, mass: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Hero ──────────────────────────────────────────────── */
export default function Hero() {
  const shouldReduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (window.innerWidth < 1024) return;
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative min-h-screen bg-[#050713] dark:bg-[#050713] text-gray-900 dark:text-white overflow-hidden flex flex-col transition-colors duration-300"
    >
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none bg-[#050713]" aria-hidden="true">
        <motion.div
          className="absolute inset-0 scale-[1.08]"
          animate={shouldReduce ? undefined : { scale: [1.08, 1.12, 1.08], x: [0, -18, 0], y: [0, 8, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={HERO_IMAGES.cinematic}
            alt=""
            fill
            priority
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover object-center opacity-[0.88] saturate-[1.14] contrast-[1.08]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,19,0.46)_0%,rgba(5,7,19,0.2)_28%,rgba(5,7,19,0.06)_54%,rgba(5,7,19,0.42)_100%),linear-gradient(180deg,rgba(5,7,19,0.2)_0%,rgba(5,7,19,0.08)_38%,rgba(5,7,19,0.72)_82%,#050713_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_39%,rgba(244,114,182,0.26),transparent_26%),radial-gradient(circle_at_42%_42%,rgba(6,182,212,0.18),transparent_35%),radial-gradient(circle_at_70%_31%,rgba(139,92,246,0.28),transparent_28%)] mix-blend-screen" />
        <motion.div
          className="absolute left-[5%] top-[20%] hidden h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(255,204,179,0.22)_0%,rgba(236,72,153,0.13)_30%,rgba(6,182,212,0.07)_50%,transparent_72%)] blur-xl mix-blend-screen md:block"
          animate={shouldReduce ? undefined : { opacity: [0.7, 1, 0.78], scale: [1, 1.08, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[10%] top-[8%] hidden h-[28rem] w-[24rem] rotate-[-18deg] bg-[linear-gradient(90deg,transparent,rgba(168,85,247,0.18),rgba(6,182,212,0.11),transparent)] blur-2xl mix-blend-screen lg:block"
          animate={shouldReduce ? undefined : { opacity: [0.45, 0.78, 0.5], x: [0, 24, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-x-[-15%] bottom-[5%] hidden h-[12rem] bg-[linear-gradient(90deg,transparent,rgba(6,182,212,0.18),rgba(236,72,153,0.16),transparent)] blur-[34px] opacity-65 md:block"
          animate={shouldReduce ? undefined : { x: ["-4%", "4%", "-4%"], opacity: [0.55, 0.85, 0.62] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-x-[-20%] bottom-[13%] hidden h-[9rem] bg-[radial-gradient(ellipse_at_center,rgba(198,219,255,0.16),rgba(93,108,180,0.09)_36%,transparent_72%)] blur-xl md:block"
          animate={shouldReduce ? undefined : { x: ["5%", "-5%", "5%"], opacity: [0.44, 0.76, 0.48] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(180deg,transparent,rgba(5,7,19,0.52)_42%,#050713_100%)]" />
        <div className="absolute inset-0 opacity-[0.13] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")" }} />
        <div className="absolute inset-0 opacity-[0.34]" style={{ backgroundImage: "radial-gradient(circle at 14% 18%, rgba(255,255,255,0.68) 0 1px, transparent 1.6px), radial-gradient(circle at 74% 12%, rgba(6,182,212,0.48) 0 1px, transparent 1.8px), radial-gradient(circle at 54% 54%, rgba(236,72,153,0.38) 0 1px, transparent 1.6px)", backgroundSize: "180px 180px, 260px 260px, 220px 220px" }} />
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-cyan-200/70 shadow-[0_0_16px_rgba(103,232,249,0.9)]"
            style={{
              left: `${10 + ((i * 17) % 82)}%`,
              top: `${14 + ((i * 23) % 68)}%`,
            }}
            animate={shouldReduce ? undefined : { y: [0, -18, 0], opacity: [0.12, 0.82, 0.18], scale: [0.7, 1.25, 0.7] }}
            transition={{ duration: 7 + (i % 5), repeat: Infinity, delay: i * 0.45, ease: "easeInOut" }}
          />
        ))}
        {/* Spotlight cursor */}
        <div
          className="absolute inset-0 hidden lg:block mix-blend-screen"
          style={{
            background: "radial-gradient(620px circle at var(--mx, 50%) var(--my, 40%), rgba(6,182,212,0.22), rgba(236,72,153,0.13) 35%, transparent 72%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_36%,rgba(5,7,19,0.38)_73%,rgba(5,7,19,0.94)_100%)]" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(rgba(236,72,153,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)", backgroundSize: "96px 96px" }}
        />
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 pt-24 sm:pt-28 pb-10 grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-10 lg:gap-6 items-center">

          {/* LEFT — Text */}
          <div className="relative">
            <motion.div
              className="absolute -left-20 top-8 -z-10 hidden h-[28rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.15)_0%,rgba(236,72,153,0.1)_30%,rgba(5,7,19,0.28)_58%,transparent_76%)] blur-xl md:block"
              animate={shouldReduce ? undefined : { opacity: [0.72, 1, 0.78], scale: [0.98, 1.05, 0.98] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
            {/* Status badge */}
            <motion.div
              variants={fadeIn(0.05)}
              initial="hidden" animate="show"
              className="inline-flex items-center gap-2.5 mb-7 px-4 py-2 rounded-full border border-white/[0.16] bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_14px_34px_rgba(6,182,212,0.12)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-[11px] tracking-[0.22em] uppercase text-white/[0.68] font-body">
                Available for new projects
              </span>
            </motion.div>

            {/* Headline */}
            <h1 style={{ perspective: "1000px" }} className="mb-6 overflow-hidden">
              {["WE", "BUILD"].map((word, i) => (
                <motion.span
                  key={word}
                  custom={i}
                  variants={wordVariant}
                  initial={shouldReduce ? "show" : "hidden"}
                  animate="show"
                  className="font-heading block text-[clamp(48px,9vw,108px)] font-black leading-[0.88] tracking-tight text-white drop-shadow-[0_18px_48px_rgba(0,0,0,0.72)]"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                custom={2}
                variants={wordVariant}
                initial={shouldReduce ? "show" : "hidden"}
                animate="show"
                className="font-heading block text-[clamp(48px,9vw,108px)] font-black leading-[0.88] tracking-tight bg-gradient-to-r from-[#ff7ad1] via-[#d7a5ff] to-[#67e8f9] bg-clip-text text-transparent drop-shadow-[0_0_36px_rgba(236,72,153,0.62)]"
              >
                  DIGITAL
                </motion.span>
              <motion.span
                custom={3}
                variants={wordVariant}
                initial={shouldReduce ? "show" : "hidden"}
                animate="show"
                className="font-heading block text-[clamp(48px,9vw,108px)] font-black leading-[0.88] tracking-tight text-white drop-shadow-[0_18px_48px_rgba(0,0,0,0.72)]"
              >
                PRODUCTS.
              </motion.span>
            </h1>

            {/* Subheading */}
            <motion.p
              variants={fadeIn(0.7)}
              initial="hidden" animate="show"
              className="font-body text-white/[0.72] text-base md:text-lg leading-relaxed max-w-lg mb-10 [text-wrap:balance] drop-shadow-[0_12px_34px_rgba(0,0,0,0.58)]"
            >
              From pixel-perfect websites to cross-platform mobile apps — we design, build,
              and scale digital experiences that drive real business growth.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeIn(0.85)}
              initial="hidden" animate="show"
              className="flex flex-wrap gap-4 mb-12"
            >
              <MagneticWrap>
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-2 overflow-hidden px-7 py-3.5 bg-gradient-to-r from-[#EC4899] via-[#F472B6] to-[#06B6D4] text-white rounded-full font-body font-semibold text-sm transition-transform duration-300 hover:-translate-y-0.5 cursor-pointer shadow-[0_14px_34px_rgba(236,72,153,0.24),0_10px_32px_rgba(6,182,212,0.12)] before:absolute before:inset-0 before:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.32),transparent)] before:translate-x-[-120%] hover:before:translate-x-[120%] before:transition-transform before:duration-700"
                >
                  <span className="relative z-10">Start a project</span>
                  <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </MagneticWrap>

              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/[0.16] bg-white/[0.08] text-white/[0.78] hover:border-[#67e8f9]/[0.45] hover:text-white font-body font-medium text-sm transition-transform duration-300 hover:-translate-y-0.5 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_12px_32px_rgba(0,0,0,0.22)]"
              >
                View our work
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeIn(1.0)}
              initial="hidden" animate="show"
              className="flex flex-wrap gap-8 sm:gap-10 mb-10"
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-heading text-2xl sm:text-3xl font-black text-white tabular-nums drop-shadow-[0_10px_26px_rgba(0,0,0,0.62)]">
                    <Counter to={s.num} suffix={s.suffix} />
                  </p>
                  <p className="font-body text-[11px] text-white/[0.42] mt-0.5 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Tech stack */}
            <motion.div
              variants={fadeIn(1.1)}
              initial="hidden" animate="show"
              className="flex flex-wrap gap-2"
            >
              {TECH.map((t) => (
                <span
                  key={t}
                  className="text-[10px] px-2.5 py-1 rounded-full border border-white/[0.11] bg-white/[0.055] text-white/[0.46] font-body tracking-wide md:backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Desktop floating cards */}
          <div className="relative h-[480px] lg:h-full min-h-[480px] hidden sm:block [perspective:1100px]">
            <motion.div
              className="absolute left-[-8%] top-[8%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.14),rgba(236,72,153,0.08)_38%,transparent_72%)] blur-xl"
              animate={shouldReduce ? undefined : { opacity: [0.5, 0.9, 0.58], scale: [0.96, 1.08, 0.96] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
            {FLOATING_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.85, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={shouldReduce ? undefined : { y: -8, scale: 1.025 }}
                transition={{ duration: 0.7, delay: i * 0.22 + 0.5, ease: EASE }}
                className="group absolute w-[200px] md:w-[218px] [transform-style:preserve-3d] will-change-transform"
                style={{
                  top: card.top, right: card.right,
                  transform: `rotate(${card.rotate})`,
                  animation: shouldReduce ? undefined : `floatCard${i} ${4.8 + i * 0.7}s ease-in-out infinite`,
                }}
              >
                <div className="relative rounded-2xl overflow-hidden bg-[#071023]/[0.68] backdrop-blur-sm border border-white/[0.18] shadow-[0_22px_60px_rgba(0,0,0,0.48),0_0_34px_rgba(6,182,212,0.12),inset_0_1px_0_rgba(255,255,255,0.14)] transition-colors duration-300 group-hover:border-white/[0.30]">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
                  <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.16),transparent_32%,rgba(6,182,212,0.08)_62%,transparent)] opacity-80" />
                  <div className="relative h-[120px] overflow-hidden">
                    <Image src={card.img} alt={card.title} fill sizes="218px" placeholder="blur" blurDataURL={BLUR_DATA_URL} className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_115%,rgba(0,0,0,0.86),rgba(0,0,0,0.36)_42%,transparent_72%),linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.24)_56%,rgba(0,0,0,0.88))]" />
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: `radial-gradient(circle at 70% 20%, ${card.accent}40, transparent 45%)` }} />
                  </div>
                  <div className="relative px-4 py-3.5 bg-[linear-gradient(180deg,rgba(3,8,22,0.1),rgba(3,8,22,0.74)_42%,rgba(2,6,18,0.92))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <div className="absolute inset-x-0 -top-10 h-14 bg-[linear-gradient(180deg,transparent,rgba(3,8,22,0.82))]" />
                    <div className="relative mb-2 flex items-center gap-2">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[8px] font-bold uppercase leading-none tracking-[0.22em] shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]"
                        style={{
                          borderColor: `${card.accent}55`,
                          color: card.accent,
                          background: `linear-gradient(135deg, ${card.accent}20, rgba(255,255,255,0.055))`,
                          textShadow: `0 0 14px ${card.accent}88`,
                        }}
                      >
                        <span style={{ color: card.accent, filter: `drop-shadow(0 0 7px ${card.accent})` }}>{card.icon}</span>
                        {card.category}
                      </span>
                    </div>
                    <div className="relative mb-3">
                      <p
                        className="font-heading text-[15px] font-black leading-[1.02] tracking-[0.01em] text-white transition-all duration-300 group-hover:text-white md:text-[16px]"
                        style={{
                          textShadow: `0 1px 0 rgba(255,255,255,0.18), 0 10px 24px rgba(0,0,0,0.82), 0 0 18px ${card.accent}55`,
                        }}
                      >
                        {card.title}
                      </p>
                      <div className="mt-1.5 h-px w-14 bg-gradient-to-r from-white/55 to-transparent shadow-[0_0_14px_rgba(255,255,255,0.3)]" />
                    </div>
                    <div className="relative flex gap-1.5 flex-wrap">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border px-2.5 py-1 text-[9px] font-semibold leading-none tracking-[0.08em] text-white/[0.78] transition-colors duration-300 group-hover:text-white"
                          style={{
                            borderColor: `${card.accent}42`,
                            background: `linear-gradient(135deg, rgba(255,255,255,0.085), ${card.accent}12)`,
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute -inset-4 rounded-[2rem] -z-10 blur-xl opacity-[0.36] transition-opacity duration-300 group-hover:opacity-[0.52]" style={{ background: `radial-gradient(circle, ${card.accent}55, rgba(6,182,212,0.16) 38%, transparent 72%)` }} />
              </motion.div>
            ))}

            {/* Decorative rings */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.4 }}
              className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#EC4899]/[0.09] dark:border-[#EC4899]/[0.12] pointer-events-none shadow-[0_0_80px_rgba(236,72,153,0.08)]"
            />
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 1.8, delay: 0.6 }}
              className="absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#06B6D4]/[0.07] dark:border-[#06B6D4]/10 pointer-events-none shadow-[0_0_110px_rgba(6,182,212,0.07)]"
            />
          </div>
        </div>
      </div>

      {/* ── MOBILE CARD STRIP ── */}
      <div className="sm:hidden relative z-10 -mx-5 px-5 mb-8">
        <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scroll-smooth no-scrollbar">
          {FLOATING_CARDS.map((card) => (
            <div
              key={card.title}
              className="snap-start shrink-0 w-[195px] rounded-xl overflow-hidden bg-[#071023]/[0.72] border border-white/[0.16] shadow-[0_14px_34px_rgba(0,0,0,0.34),0_0_24px_rgba(6,182,212,0.08)]"
            >
              <div className="relative h-[110px]">
                <Image src={card.img} alt={card.title} fill sizes="195px" placeholder="blur" blurDataURL={BLUR_DATA_URL} className="object-cover" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_115%,rgba(0,0,0,0.86),rgba(0,0,0,0.38)_42%,transparent_72%),linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.22)_56%,rgba(0,0,0,0.86))]" />
              </div>
              <div className="relative px-3.5 py-3 bg-[linear-gradient(180deg,rgba(3,8,22,0.12),rgba(3,8,22,0.76)_42%,rgba(2,6,18,0.92))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <div className="absolute inset-x-0 -top-9 h-12 bg-[linear-gradient(180deg,transparent,rgba(3,8,22,0.82))]" />
                <div className="relative mb-2 flex items-center gap-1.5">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[7.5px] font-bold uppercase leading-none tracking-[0.2em] shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]"
                    style={{
                      borderColor: `${card.accent}55`,
                      color: card.accent,
                      background: `linear-gradient(135deg, ${card.accent}20, rgba(255,255,255,0.055))`,
                      textShadow: `0 0 12px ${card.accent}88`,
                    }}
                  >
                    <span style={{ color: card.accent, filter: `drop-shadow(0 0 6px ${card.accent})` }}>{card.icon}</span>
                    {card.category}
                  </span>
                </div>
                <p
                  className="relative mb-2.5 font-heading text-[14px] font-black leading-[1.02] tracking-[0.01em] text-white"
                  style={{
                    textShadow: `0 1px 0 rgba(255,255,255,0.18), 0 10px 22px rgba(0,0,0,0.82), 0 0 16px ${card.accent}55`,
                  }}
                >
                  {card.title}
                </p>
                <div className="relative flex gap-1.5">
                  {card.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border px-2 py-1 text-[8.5px] font-semibold leading-none tracking-[0.08em] text-white/[0.78]"
                      style={{
                        borderColor: `${card.accent}42`,
                        background: `linear-gradient(135deg, rgba(255,255,255,0.085), ${card.accent}12)`,
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MARQUEE TICKER ── */}
      <div className="relative z-10 border-t border-white/[0.08] bg-black/[0.18] md:backdrop-blur-sm overflow-hidden">
        <div
          className="flex whitespace-nowrap py-3.5 text-[10px] uppercase tracking-[0.22em] font-body text-white/25"
          style={{ animation: "marqueeScroll 26s linear infinite" }}
        >
          {SERVICES.map((s, i) => (
            <span key={i} className="mr-10">
              {s}
              <span className="ml-10 text-[#EC4899]/30">·</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes floatCard0 { 0%,100%{transform:rotate(-3deg) translateY(0)}   50%{transform:rotate(-3deg) translateY(-11px)} }
        @keyframes floatCard1 { 0%,100%{transform:rotate(3deg)  translateY(0)}   50%{transform:rotate(3deg)  translateY(-14px)} }
        @keyframes floatCard2 { 0%,100%{transform:rotate(-2deg) translateY(0)}   50%{transform:rotate(-2deg) translateY(-9px)} }
        @keyframes marqueeScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
