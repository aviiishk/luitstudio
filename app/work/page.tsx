"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Footer from "@/components/layout/Footer";

const ALL_PROJECTS = [
  {
    id: 1,
    title: "FinTrack Dashboard",
    category: "Web App",
    tags: ["Next.js", "UI/UX", "Analytics"],
    description: "A real-time financial analytics platform with custom charting, role-based access, and live data feeds. Built for a fintech startup serving 50k+ users.",
    img: "/projects/dashboard.png",
    year: "2024",
    result: "2.4× faster load time",
    accent: "#EC4899",
  },
  {
    id: 2,
    title: "NexMobile",
    category: "Mobile App",
    tags: ["React Native", "Design", "iOS"],
    description: "Cross-platform mobile app delivering a seamless shopping experience across iOS and Android. Launched in 3 months from first wireframe.",
    img: "/projects/app.png",
    year: "2024",
    result: "4.8★ App Store rating",
    accent: "#06B6D4",
  },
  {
    id: 3,
    title: "RankBoost SEO",
    category: "SEO",
    tags: ["SEO", "Content", "Analytics"],
    description: "Full-stack SEO strategy combining technical audits, content architecture, and backlink campaigns. Delivered measurable growth in 90 days.",
    img: "/projects/seo.png",
    year: "2023",
    result: "3× organic traffic",
    accent: "#EC4899",
  },
  {
    id: 4,
    title: "BrandWave",
    category: "Social Media",
    tags: ["Branding", "Strategy", "Content"],
    description: "End-to-end social media campaign covering brand identity, content calendar, and paid distribution across Instagram, LinkedIn, and X.",
    img: "/projects/socialmedia.png",
    year: "2023",
    result: "10× engagement rate",
    accent: "#06B6D4",
  },
];

const FILTERS = ["All", "Web App", "Mobile App", "SEO", "Social Media"];

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

export default function WorkPage() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter((p) => p.category === active);

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#08080f] text-gray-900 dark:text-white transition-colors duration-300">

      {/* Ambient glows */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-[#EC4899]/4 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-[#06B6D4]/4 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">

        {/* ── HERO ── */}
        <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-5 sm:px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="h-px w-8 bg-gradient-to-r from-[#EC4899] to-transparent" />
            <p className="font-body text-xs tracking-[0.28em] uppercase text-gray-400 dark:text-white/35">Portfolio</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-[40px] sm:text-[64px] md:text-[88px] font-black leading-[0.92] tracking-tight"
          >
            OUR{" "}
            <span className="bg-gradient-to-r from-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
              WORK
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-gray-500 dark:text-white/45 max-w-lg text-sm sm:text-base md:text-lg leading-relaxed font-body"
          >
            Real products for real businesses. Every project is built with a focus on
            performance, design, and measurable results.
          </motion.p>
        </section>

        {/* ── FILTER TABS ── */}
        <section className="px-5 sm:px-6 pb-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-2 sm:gap-3"
          >
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActive(filter)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-body font-medium transition-all duration-200 cursor-pointer ${
                  active === filter
                    ? "bg-[#06B6D4] text-white shadow-[0_0_12px_rgba(6,182,212,0.35)]"
                    : "bg-gray-100 border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-800 dark:bg-white/[0.04] dark:border-white/[0.1] dark:text-white/45 dark:hover:border-white/25 dark:hover:text-white/80"
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </section>

        {/* ── PROJECTS GRID ── */}
        <section className="px-5 sm:px-6 pb-16 max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={active}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
            >
              {filtered.map((project, i) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  onMouseMove={tiltOn}
                  onMouseLeave={tiltOff}
                  style={{ transition: "transform 0.18s ease-out", willChange: "transform" }}
                  className="group relative rounded-2xl overflow-hidden border bg-white shadow-sm border-gray-200 hover:border-gray-300 dark:bg-white/[0.025] dark:shadow-none dark:border-white/[0.08] dark:hover:border-white/[0.16] transition-colors duration-300 cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative h-[240px] sm:h-[280px] overflow-hidden">
                    <Image
                      src={project.img}
                      alt={project.title}
                      fill
                      sizes="(max-width:768px) 100vw, 50vw"
                      className="object-cover opacity-65 group-hover:opacity-85 transition-all duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ background: `radial-gradient(ellipse at 50% 80%, ${project.accent}18, transparent 70%)` }}
                    />

                    {/* Year badge */}
                    <span className="absolute top-4 left-4 bg-gray-900/8 backdrop-blur-sm border border-gray-900/12 text-gray-600 dark:bg-white/8 dark:border-white/12 dark:text-white/70 text-[10px] px-3 py-1 rounded-full font-body">
                      {project.year}
                    </span>

                    {/* Result badge */}
                    <span
                      className="absolute top-4 right-4 text-[10px] px-3 py-1 rounded-full font-body font-medium text-white"
                      style={{ background: `${project.accent}22`, border: `1px solid ${project.accent}40` }}
                    >
                      {project.result}
                    </span>

                    {/* Arrow */}
                    <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/8 backdrop-blur-sm border border-white/12 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-250">
                      <ArrowUpRight size={13} className="text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <div className="mb-3">
                      <p className="text-[10px] uppercase tracking-widest font-body font-medium mb-1.5" style={{ color: project.accent }}>
                        {project.category}
                      </p>
                      <h2 className="font-heading text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">
                        {project.title}
                      </h2>
                    </div>

                    <p className="text-gray-500 dark:text-white/45 text-xs sm:text-sm leading-relaxed font-body mb-4">
                      {project.description}
                    </p>

                    <div className="flex gap-2 flex-wrap">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2.5 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-500 dark:bg-white/5 dark:border-white/10 dark:text-white/38 font-body"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ background: `linear-gradient(to right, ${project.accent}, transparent)` }}
                  />
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="text-center text-gray-400 dark:text-white/35 font-body py-20 text-sm">
              No projects in this category yet.
            </p>
          )}
        </section>

        <Footer />
      </div>
    </main>
  );
}
