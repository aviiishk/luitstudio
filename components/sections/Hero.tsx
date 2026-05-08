"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { ArrowRight, Code2, Smartphone, Layers } from "lucide-react";

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
  { title: "FinTrack Dashboard", tags: ["Next.js", "UI/UX"],    img: "/projects/dashboard.png", icon: <Layers     size={13} />, accent: "#EC4899", rotate: "-3deg", top: "6%",  right: "2%"  },
  { title: "NexMobile App",      tags: ["React Native", "iOS"], img: "/projects/app.png",       icon: <Smartphone size={13} />, accent: "#06B6D4", rotate: "3deg",  top: "43%", right: "17%" },
  { title: "RankBoost SEO",      tags: ["SEO", "Growth"],       img: "/projects/seo.png",       icon: <Code2      size={13} />, accent: "#EC4899", rotate: "-2deg", top: "74%", right: "2%"  },
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

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative min-h-screen bg-[#f8f8fc] dark:bg-[#020208] text-gray-900 dark:text-white overflow-hidden flex flex-col transition-colors duration-300"
    >
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Spotlight cursor */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background: "radial-gradient(500px circle at var(--mx, 50%) var(--my, 40%), rgba(236,72,153,0.07), transparent 70%)",
          }}
        />
        {/* Ambient glows */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[#EC4899]/5 dark:bg-[#EC4899]/7 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#06B6D4]/5 dark:bg-[#06B6D4]/7 blur-[120px]" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle, #EC4899 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 pt-24 sm:pt-28 pb-10 grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-10 lg:gap-6 items-center">

          {/* LEFT — Text */}
          <div>
            {/* Status badge */}
            <motion.div
              variants={fadeIn(0.05)}
              initial="hidden" animate="show"
              className="inline-flex items-center gap-2.5 mb-7 px-4 py-2 rounded-full border border-[#EC4899]/25 bg-[#EC4899]/5 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-[11px] tracking-[0.22em] uppercase text-gray-500 dark:text-white/60 font-body">
                Available for new projects
              </span>
            </motion.div>

            {/* Headline */}
            <div style={{ perspective: "1000px" }} className="mb-6 overflow-hidden">
              {["WE", "BUILD"].map((word, i) => (
                <motion.span
                  key={word}
                  custom={i}
                  variants={wordVariant}
                  initial={shouldReduce ? "show" : "hidden"}
                  animate="show"
                  className="font-heading block text-[clamp(48px,9vw,108px)] font-black leading-[0.88] tracking-tight text-gray-900 dark:text-white"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                custom={2}
                variants={wordVariant}
                initial={shouldReduce ? "show" : "hidden"}
                animate="show"
                className="font-heading block text-[clamp(48px,9vw,108px)] font-black leading-[0.88] tracking-tight bg-gradient-to-r from-[#EC4899] via-[#F472B6] to-[#06B6D4] bg-clip-text text-transparent"
              >
                DIGITAL
              </motion.span>
              <motion.span
                custom={3}
                variants={wordVariant}
                initial={shouldReduce ? "show" : "hidden"}
                animate="show"
                className="font-heading block text-[clamp(48px,9vw,108px)] font-black leading-[0.88] tracking-tight text-gray-900 dark:text-white"
              >
                PRODUCTS.
              </motion.span>
            </div>

            {/* Subheading */}
            <motion.p
              variants={fadeIn(0.7)}
              initial="hidden" animate="show"
              className="font-body text-gray-500 dark:text-white/50 text-base md:text-lg leading-relaxed max-w-lg mb-10"
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
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#EC4899] to-[#06B6D4] text-white rounded-full font-body font-semibold text-sm transition-opacity duration-200 hover:opacity-90 cursor-pointer shadow-[0_0_28px_rgba(236,72,153,0.4)]"
                >
                  Start a project
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </MagneticWrap>

              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-gray-200 dark:border-white/12 text-gray-600 dark:text-white/70 hover:border-[#EC4899]/50 hover:text-gray-900 dark:hover:text-white font-body font-medium text-sm transition-all duration-200 cursor-pointer backdrop-blur-sm"
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
                  <p className="font-heading text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tabular-nums">
                    <Counter to={s.num} suffix={s.suffix} />
                  </p>
                  <p className="font-body text-[11px] text-gray-400 dark:text-white/35 mt-0.5 uppercase tracking-wider">{s.label}</p>
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
                  className="text-[10px] px-2.5 py-1 rounded-full border border-gray-200 dark:border-white/8 bg-gray-100 dark:bg-white/4 text-gray-400 dark:text-white/30 font-body tracking-wide"
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Desktop floating cards */}
          <div className="relative h-[480px] lg:h-full min-h-[480px] hidden sm:block">
            {FLOATING_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.85, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.22 + 0.5, ease: EASE }}
                className="absolute w-[200px] md:w-[218px]"
                style={{
                  top: card.top, right: card.right,
                  transform: `rotate(${card.rotate})`,
                  animation: shouldReduce ? undefined : `floatCard${i} ${4.8 + i * 0.7}s ease-in-out infinite`,
                }}
              >
                <div className="rounded-2xl overflow-hidden bg-white dark:bg-white/[0.045] backdrop-blur-xl border border-black/[0.08] dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.55)]">
                  <div className="relative h-[120px] overflow-hidden">
                    <Image src={card.img} alt={card.title} fill sizes="218px" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                  </div>
                  <div className="px-4 py-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span style={{ color: card.accent }}>{card.icon}</span>
                      <p className="font-heading text-[11px] font-semibold text-gray-900 dark:text-white truncate">{card.title}</p>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] px-2 py-0.5 rounded-full border font-body"
                          style={{ borderColor: `${card.accent}35`, color: card.accent, background: `${card.accent}08` }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute -inset-1 rounded-2xl -z-10 blur-xl opacity-10 dark:opacity-15" style={{ background: card.accent }} />
              </motion.div>
            ))}

            {/* Decorative rings */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.4 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-[#EC4899]/[0.06] dark:border-[#EC4899]/8 pointer-events-none"
            />
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 1.8, delay: 0.6 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-[#06B6D4]/[0.04] dark:border-[#06B6D4]/5 pointer-events-none"
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
              className="snap-start shrink-0 w-[195px] rounded-xl overflow-hidden bg-white dark:bg-white/[0.045] backdrop-blur-xl border border-black/[0.08] dark:border-white/10 shadow-sm dark:shadow-none"
            >
              <div className="relative h-[110px]">
                <Image src={card.img} alt={card.title} fill sizes="195px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="px-3.5 py-2.5">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span style={{ color: card.accent }}>{card.icon}</span>
                  <p className="font-heading text-[11px] font-semibold text-gray-900 dark:text-white truncate">{card.title}</p>
                </div>
                <div className="flex gap-1.5">
                  {card.tags.map((t) => (
                    <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full border font-body" style={{ borderColor: `${card.accent}35`, color: card.accent }}>
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
      <div className="relative z-10 border-t border-black/[0.06] dark:border-white/[0.06] overflow-hidden">
        <div
          className="flex whitespace-nowrap py-3.5 text-[10px] uppercase tracking-[0.22em] font-body text-gray-400 dark:text-white/20"
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
