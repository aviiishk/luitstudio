"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  Code2, Smartphone, Layers,
  TrendingUp, BarChart2, Wand2,
  ArrowUpRight,
} from "lucide-react";
import { PROJECT_ARTWORK } from "@/lib/project-artwork";

/* ─── Service data ──────────────────────────────────────── */
const SERVICES = [
  {
    id: "01", title: "Web Development",      icon: Code2,      accent: "#EC4899",
    description: "High-performance websites, web apps, and SaaS platforms built for speed, scale, and conversion.",
    stat: "50+", statLabel: "Sites shipped",
    img: PROJECT_ARTWORK.fintrack, large: true,
  },
  {
    id: "02", title: "App Development",      icon: Smartphone, accent: "#06B6D4",
    description: "Native & cross-platform mobile apps for iOS and Android that users love.",
    stat: "15+", statLabel: "Apps launched",   large: false,
  },
  {
    id: "03", title: "UI/UX Design",         icon: Layers,     accent: "#EC4899",
    description: "Research-backed design systems and interfaces built for real users.",
    stat: "100%", statLabel: "Design satisfaction", large: false,
  },
  {
    id: "04", title: "SEO & Growth",         icon: TrendingUp, accent: "#06B6D4",
    description: "Technical SEO, content strategy, and organic growth that compounds over time.",
    stat: "3×",   statLabel: "Avg. traffic lift",  large: false,
  },
  {
    id: "05", title: "Performance Marketing",icon: BarChart2,  accent: "#EC4899",
    description: "Data-driven paid campaigns across Google, Meta, and LinkedIn that consistently beat benchmarks.",
    stat: "5×",   statLabel: "Average ROAS",
    img: PROJECT_ARTWORK.brandwave, large: true,
  },
  {
    id: "06", title: "Branding",             icon: Wand2,      accent: "#06B6D4",
    description: "Brand identity, visual systems, and tone of voice that make you memorable.",
    stat: "25+",  statLabel: "Brands created",     large: false,
  },
];

/* ─── Tilt handlers ─────────────────────────────────────── */
function tiltOn(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width  - 0.5;
  const y = (e.clientY - r.top)  / r.height - 0.5;
  e.currentTarget.style.transform =
    `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) scale3d(1.012,1.012,1.012)`;
}
function tiltOff(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.style.transform = "";
}

/* ─── Card ──────────────────────────────────────────────── */
function ServiceCard({ s, index }: { s: typeof SERVICES[number]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] as const }}
      onMouseMove={tiltOn}
      onMouseLeave={tiltOff}
      style={{ transition: "transform 0.18s ease-out", willChange: "transform" }}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-gray-200 dark:border-white/[0.08] hover:border-gray-300 dark:hover:border-white/[0.16] bg-white shadow-sm dark:bg-white/[0.03] dark:shadow-none hover:bg-gray-50 dark:hover:bg-white/[0.055] transition-all duration-300 ${
        s.large ? "md:col-span-2" : ""
      }`}
    >
      {s.large ? (
        /* ── Large card ── */
        <div className="flex flex-col h-full min-h-[280px] sm:min-h-[300px]">
          {s.img && (
            <div className="relative h-[160px] sm:h-[180px] overflow-hidden shrink-0">
              <Image src={s.img} alt={s.title} fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 30% 60%, ${s.accent}18, transparent 70%)` }}
              />
            </div>
          )}
          <div className="p-5 sm:p-6 flex flex-col flex-1">
            <div className="flex items-start justify-between mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: `${s.accent}12`, border: `1px solid ${s.accent}20` }}>
                <s.icon size={16} style={{ color: s.accent }} />
              </div>
              <span className="font-heading text-[10px] font-black tracking-[0.2em] text-gray-300 dark:text-white/15">{s.id}</span>
            </div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">{s.title}</h3>
            <p className="font-body text-sm text-gray-500 dark:text-white/40 leading-relaxed flex-1 mb-5">{s.description}</p>
            <div className="flex items-end justify-between">
              <div>
                <span className="font-heading text-2xl font-black" style={{ color: s.accent }}>{s.stat}</span>
                <p className="font-body text-[10px] text-gray-300 dark:text-white/25 uppercase tracking-wider mt-0.5">{s.statLabel}</p>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center border opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-250"
                style={{ borderColor: `${s.accent}35`, color: s.accent }}>
                <ArrowUpRight size={14} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ── Small card ── */
        <div className="p-5 sm:p-6 h-full flex flex-col min-h-[190px] sm:min-h-[210px]">
          <div className="flex items-start justify-between mb-4">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: `${s.accent}10`, border: `1px solid ${s.accent}18` }}>
              <s.icon size={16} style={{ color: s.accent }} />
            </div>
            <span className="font-heading text-[10px] font-black tracking-[0.2em]" style={{ color: `${s.accent}35` }}>
              {s.id}
            </span>
          </div>
          <h3 className="font-heading text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">{s.title}</h3>
          <p className="font-body text-sm text-gray-400 dark:text-white/38 leading-relaxed flex-1 mb-4">{s.description}</p>
          <div className="flex items-end justify-between">
            <div>
              <span className="font-heading text-xl font-black" style={{ color: s.accent }}>{s.stat}</span>
              <p className="font-body text-[10px] text-gray-300 dark:text-white/25 uppercase tracking-wider mt-0.5">{s.statLabel}</p>
            </div>
            <div className="w-7 h-7 rounded-full flex items-center justify-center border opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ borderColor: `${s.accent}30`, color: s.accent }}>
              <ArrowUpRight size={12} />
            </div>
          </div>
          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[1.5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"
            style={{ background: `linear-gradient(to right, ${s.accent}, transparent)` }} />
        </div>
      )}
    </motion.div>
  );
}

/* ─── Section ───────────────────────────────────────────── */
export default function ExpertiseSection() {
  const headRef    = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, amount: 0.3 });

  return (
    <section className="relative bg-[#fafafa] dark:bg-[#08080f] py-20 sm:py-28 overflow-hidden border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">

      {/* Ambient glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-[#EC4899]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#06B6D4]/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">

        {/* Header */}
        <div ref={headRef} className="mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={headInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-gradient-to-r from-[#EC4899] to-transparent" />
            <p className="font-body text-xs tracking-[0.28em] uppercase text-gray-400 dark:text-white/35">What we do best</p>
          </motion.div>

          <div className="overflow-hidden mb-1">
            <motion.h2
              initial={{ y: 72, opacity: 0 }}
              animate={headInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.72, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="font-heading text-[34px] sm:text-[52px] md:text-[72px] lg:text-[88px] font-black leading-[0.88] tracking-tight text-gray-900 dark:text-white"
            >
              OUR CORE
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h2
              initial={{ y: 72, opacity: 0 }}
              animate={headInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.72, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="font-heading text-[34px] sm:text-[52px] md:text-[72px] lg:text-[88px] font-black leading-[0.88] tracking-tight bg-gradient-to-r from-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent"
            >
              EXPERTISE.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.28 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <p className="font-body text-sm sm:text-base text-gray-400 dark:text-white/38 max-w-md leading-relaxed">
              Six disciplines, one team — covering every layer of your digital presence.
            </p>
            <Link href="/services"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/50 hover:border-[#EC4899]/40 hover:text-gray-900 dark:hover:text-white font-body font-medium text-sm transition-all duration-200 cursor-pointer self-start sm:self-auto shrink-0">
              All services <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {SERVICES.map((s, i) => <ServiceCard key={s.id} s={s} index={i} />)}
        </div>

        {/* Bottom tech strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 pt-6 border-t border-gray-100 dark:border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex flex-wrap gap-5">
            {["Next.js", "React Native", "TypeScript", "Node.js", "Figma", "Flutter"].map((t) => (
              <span key={t} className="font-body text-[11px] text-gray-300 dark:text-white/18 tracking-wide">{t}</span>
            ))}
          </div>
          <p className="font-body text-[11px] text-gray-300 dark:text-white/15 shrink-0">Trusted by startups &amp; enterprises</p>
        </motion.div>
      </div>
    </section>
  );
}
