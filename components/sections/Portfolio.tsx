"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PROJECT_ARTWORK } from "@/lib/project-artwork";
import { BLUR_DATA_URL } from "@/lib/site-images";

const projects = [
  {
    id: 1, title: "FinTrack Dashboard", category: "Web App",
    description: "Real-time analytics platform for financial data.",
    img: PROJECT_ARTWORK.fintrack,
    tags: ["Next.js", "UI/UX", "Analytics"],
    span: "md:col-span-2", num: "01", accent: "#EC4899",
  },
  {
    id: 2, title: "NexMobile", category: "Mobile App",
    description: "Cross-platform mobile experience built for scale.",
    img: PROJECT_ARTWORK.nexmobile,
    tags: ["React Native", "Design"],
    span: "", num: "02", accent: "#06B6D4",
  },
  {
    id: 3, title: "RankBoost SEO", category: "SEO & Growth",
    description: "Full-stack SEO strategy that tripled organic traffic.",
    img: PROJECT_ARTWORK.rankboost,
    tags: ["SEO", "Content", "Analytics"],
    span: "", num: "03", accent: "#EC4899",
  },
  {
    id: 4, title: "BrandWave", category: "Social Media",
    description: "End-to-end social campaign driving 10× engagement.",
    img: PROJECT_ARTWORK.brandwave,
    tags: ["Branding", "Strategy"],
    span: "md:col-span-2", num: "04", accent: "#06B6D4",
  },
];

function tiltOn(e: React.MouseEvent<HTMLDivElement>) {
  if (window.innerWidth < 1024) return;
  const r = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width  - 0.5;
  const y = (e.clientY - r.top)  / r.height - 0.5;
  e.currentTarget.style.transform =
    `perspective(900px) rotateX(${y * -6}deg) rotateY(${x * 6}deg) scale3d(1.01,1.01,1.01)`;
}
function tiltOff(e: React.MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.transform = "";
}

export default function PortfolioSection() {
  return (
    <section className="bg-[#fafafa] dark:bg-[#08080f] py-20 sm:py-28 px-5 sm:px-6 border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10 sm:mb-14"
        >
          <div>
            <motion.div
              variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="h-px w-8 bg-gradient-to-r from-[#EC4899] to-transparent" />
              <p className="font-body text-xs tracking-[0.28em] uppercase text-gray-400 dark:text-white/35">Selected Work</p>
            </motion.div>
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              className="font-heading text-[30px] sm:text-[46px] md:text-[60px] font-black leading-[0.92] tracking-tight text-gray-900 dark:text-white"
            >
              OUR{" "}
              <span className="bg-gradient-to-r from-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
                PROJECTS
              </span>
            </motion.h2>
          </div>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.15 } } }}
            className="shrink-0"
          >
            <Link href="/work"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/50 hover:border-[#06B6D4]/40 hover:text-gray-900 dark:hover:text-white transition-all duration-200 font-body font-medium text-sm cursor-pointer">
              View all <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              onMouseMove={tiltOn}
              onMouseLeave={tiltOff}
              style={{ transition: "transform 0.16s ease-out", willChange: "transform" }}
              className={`group relative rounded-[26px] overflow-hidden cursor-pointer border border-gray-200/80 dark:border-white/[0.1] hover:border-gray-300 dark:hover:border-white/[0.22] bg-white shadow-[0_14px_44px_rgba(15,23,42,0.07)] dark:bg-[#090a13] dark:shadow-[0_18px_54px_rgba(0,0,0,0.32)] transition-colors duration-300 ${p.span}`}
            >
              <div
                aria-hidden="true"
                className="absolute -inset-6 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60"
                style={{ background: `radial-gradient(circle at 50% 22%, ${p.accent}26, transparent 58%)` }}
              />
              <div className="absolute inset-x-6 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {/* Image */}
              <div className="relative h-[250px] sm:h-[290px] overflow-hidden bg-[#050713]">
                <Image
                  src={p.img} alt={p.title} fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover opacity-100 saturate-[1.12] contrast-[1.06] brightness-[1.08] transition-all duration-700 group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,19,0)_0%,rgba(5,7,19,0.04)_42%,rgba(5,7,19,0.46)_82%,rgba(5,7,19,0.78)_100%)]" />
                <div className="absolute inset-0 shadow-[inset_0_-48px_64px_rgba(0,0,0,0.44)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_115%,rgba(6,182,212,0.18),transparent_52%),radial-gradient(circle_at_15%_10%,rgba(236,72,153,0.14),transparent_38%)] mix-blend-screen" />
                {/* Hover tint */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at 50% 72%, ${p.accent}30, transparent 66%)` }}
                />
                {/* Number */}
                <span className="absolute top-4 left-4 font-heading text-[10px] font-black tracking-[0.2em] text-white/20">
                  {p.num}
                </span>
                {/* Arrow */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 border border-white/12 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-250">
                  <ArrowUpRight size={13} className="text-white" />
                </div>
                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <p className="text-[10px] uppercase tracking-widest mb-1 font-body font-medium" style={{ color: p.accent }}>
                    {p.category}
                  </p>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-white leading-tight">
                    {p.title}
                  </h3>
                  {/* Description — always on mobile, hover-reveal on md+ */}
                  <p className="text-white/55 text-xs sm:text-sm font-body mt-1.5 leading-snug
                    md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-280">
                    {p.description}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="relative px-4 sm:px-5 py-3 flex gap-2 flex-wrap bg-gray-50 dark:bg-[#080914]/95 border-t border-gray-100 dark:border-white/[0.08]">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                {p.tags.map((tag) => (
                  <span key={tag}
                    className="text-[10px] px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/[0.055] border border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/48 font-body">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
