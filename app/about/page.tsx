"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import Footer from "@/components/layout/Footer";
import { motion, useScroll, useTransform } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const aboutImages = {
  hero: "/about/about-hero-journey.png",
  impact: "/about/about-impact-studio.png",
  philosophy: "/about/about-philosophy-beacon.png",
};

function EditorialImageFrame({
  children,
  className = "",
  intensity = "default",
}: {
  children: ReactNode;
  className?: string;
  intensity?: "default" | "hero";
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#08080f] shadow-[0_34px_120px_rgba(0,0,0,0.36)] ${className}`}
    >
      <div className="absolute -inset-px z-10 rounded-[28px] bg-[linear-gradient(135deg,rgba(236,72,153,0.38),transparent_28%,rgba(6,182,212,0.34)_70%,transparent)] opacity-70" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_25%_12%,rgba(236,72,153,0.24),transparent_34%),radial-gradient(circle_at_80%_32%,rgba(6,182,212,0.22),transparent_36%),linear-gradient(180deg,rgba(8,8,15,0)_42%,rgba(8,8,15,0.28)_100%)] mix-blend-screen" />
      <div
        className={`absolute inset-0 z-10 ${
          intensity === "hero"
            ? "shadow-[inset_0_0_90px_rgba(8,8,15,0.50),inset_0_-90px_120px_rgba(8,8,15,0.58)]"
            : "shadow-[inset_0_0_70px_rgba(8,8,15,0.52),inset_0_-70px_100px_rgba(8,8,15,0.58)]"
        }`}
      />
      <div className="absolute inset-x-10 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[#06B6D4]/80 to-transparent" />
      <div className="relative z-0">{children}</div>
    </div>
  );
}

function FloatingMetric({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className: string;
}) {
  return (
    <motion.div
      aria-hidden="true"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute z-30 hidden rounded-2xl border border-white/10 bg-[#10101a]/75 px-4 py-3 text-left shadow-[0_18px_50px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:block ${className}`}
    >
      <p className="font-body text-[10px] uppercase tracking-[0.22em] text-white/35">{label}</p>
      <p className="mt-1 font-heading text-sm font-bold text-white">{value}</p>
    </motion.div>
  );
}

export default function AboutPage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -80]);

  return (
    <main className="bg-[#fafafa] dark:bg-[#08080f] text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-[#EC4899]/4 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-[#06B6D4]/4 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">
        <section className="text-center pt-32 md:pt-36 pb-20 md:pb-28 px-5 sm:px-6 max-w-6xl mx-auto">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#EC4899]" />
              <p className="font-body text-xs tracking-[0.28em] uppercase text-gray-400 dark:text-white/35">About</p>
              <div className="h-px w-8 bg-gradient-to-r from-[#06B6D4] to-transparent" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-[36px] sm:text-[52px] md:text-[72px] lg:text-[88px] font-black tracking-tight leading-[0.92] text-gray-900 dark:text-white"
            >
              Hi, we&apos;re{" "}
              <span className="bg-gradient-to-r from-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
                Luit Studios
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-gray-500 dark:text-white/45 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed font-body"
            >
              Meet the people who build high-performance digital products that actually work in the real world.
            </motion.p>

            <motion.div variants={fadeUp} className="relative mt-14 md:mt-20" whileHover={{ scale: 1.01 }}>
              <FloatingMetric label="checkpoint" value="MVP to Scale" className="left-2 top-10" />
              <FloatingMetric label="signal" value="Impact + Growth" className="right-2 bottom-12" />
              <div className="absolute -inset-8 -z-10 rounded-[36px] bg-[radial-gradient(circle_at_50%_16%,rgba(6,182,212,0.20),transparent_34%),radial-gradient(circle_at_64%_74%,rgba(236,72,153,0.18),transparent_38%)] blur-2xl" />
              <EditorialImageFrame intensity="hero">
                <Image
                  src={aboutImages.hero}
                  alt="Cinematic startup journey with builders climbing toward a glowing digital product summit"
                  width={1792}
                  height={1024}
                  priority
                  sizes="(min-width: 1280px) 1120px, calc(100vw - 40px)"
                  className="aspect-[16/9] w-full object-cover"
                />
              </EditorialImageFrame>
            </motion.div>
          </motion.div>
        </section>

        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="px-5 sm:px-6 py-20 md:py-32 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start border-t border-gray-100 dark:border-white/[0.06]"
        >
          <motion.div variants={fadeUp}>
            <h2 className="font-heading text-[28px] sm:text-[36px] md:text-[48px] font-black leading-[0.92] tracking-tight text-gray-900 dark:text-white">
              Built for real-world impact.
              <br />
              <span className="bg-gradient-to-r from-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
                Not just visuals.
              </span>
            </h2>

            <motion.div className="relative mt-10 md:mt-16" whileHover={{ y: -6, scale: 1.02 }}>
              <div className="absolute -inset-6 -z-10 rounded-[34px] bg-[#06B6D4]/10 blur-2xl" />
              <EditorialImageFrame>
                <Image
                  src={aboutImages.impact}
                  alt="Premium collaborative product studio with builders, floating dashboards and digital architecture"
                  width={1536}
                  height={1024}
                  sizes="(min-width: 768px) 520px, calc(100vw - 40px)"
                  className="aspect-[4/3] w-full object-cover"
                />
              </EditorialImageFrame>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="text-gray-600 dark:text-white/50 space-y-5 text-sm sm:text-[15px] md:text-base leading-relaxed max-w-xl font-body"
          >
            <p>We build products with a clear focus on performance, usability, and real-world impact.</p>
            <p>Instead of chasing trends, we focus on systems that scale and solve actual user problems.</p>
            <p className="font-semibold text-gray-800 dark:text-white/80">
              Over time, we&apos;ve developed a process that ensures every product is fast, clean, and built to last.
            </p>
            <p>From SaaS platforms to internal dashboards, our goal is simple - build products that work.</p>
            <p>The best is yet to come.</p>
          </motion.div>
        </motion.section>

        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="px-5 sm:px-6 py-20 md:py-32 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start border-t border-gray-100 dark:border-white/[0.06]"
        >
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-gradient-to-r from-[#EC4899] to-transparent" />
              <p className="font-body text-xs tracking-[0.28em] uppercase text-gray-400 dark:text-white/35">Our beliefs</p>
            </div>
            <h2 className="font-heading text-[28px] sm:text-[36px] md:text-[48px] font-black leading-[0.92] tracking-tight text-gray-900 dark:text-white mb-6">
              Our Philosophy
            </h2>

            <p className="text-gray-500 dark:text-white/40 mb-10 md:mb-14 max-w-md text-sm sm:text-base font-body leading-relaxed">
              Our culture isn&apos;t something we keep to ourselves. It&apos;s baked into every product we build.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {[
                { title: "Efficiency", desc: "Working smarter, faster, and cleaner to reduce friction." },
                { title: "Empowerment", desc: "We build systems that give teams control and confidence." },
                { title: "Transparency", desc: "Clear communication builds trust across teams." },
                { title: "Innovation", desc: "We evolve constantly to build better products." },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="group cursor-pointer p-4 rounded-xl border bg-white border-gray-200 shadow-sm hover:border-gray-300 dark:bg-white/[0.025] dark:border-white/[0.06] dark:shadow-none dark:hover:border-white/[0.12] transition-all duration-200"
                >
                  <h3 className="font-heading font-bold text-base sm:text-lg mb-2 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 dark:text-white/40 text-sm leading-relaxed font-body">{item.desc}</p>
                  <div className="h-[1.5px] w-0 bg-gradient-to-r from-[#EC4899] to-[#06B6D4] mt-3 group-hover:w-10 transition-all duration-300" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div style={{ y }} className="relative flex justify-center md:justify-end mt-6 md:mt-0">
            <div className="absolute -inset-6 -z-10 rounded-[34px] bg-[#EC4899]/10 blur-2xl" />
            <div className="w-full max-w-[560px]">
              <EditorialImageFrame>
                <Image
                  src={aboutImages.philosophy}
                  alt="Futuristic lighthouse guiding product systems across a glowing digital ocean"
                  width={1536}
                  height={1024}
                  sizes="(min-width: 768px) 560px, calc(100vw - 40px)"
                  className="aspect-[4/3] w-full object-cover"
                />
              </EditorialImageFrame>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="py-20 md:py-32 px-5 sm:px-6 text-center border-t border-gray-100 dark:border-white/[0.06]"
        >
          <h2 className="font-heading text-[22px] sm:text-[32px] md:text-[44px] lg:text-[52px] font-black leading-[0.95] tracking-tight max-w-3xl mx-auto text-gray-900 dark:text-white">
            &ldquo;We think like product builders,
            <br />{" "}
            <span className="bg-gradient-to-r from-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
              not just designers.
            </span>&rdquo;
          </h2>
          <div className="w-10 md:w-12 h-[2px] bg-gradient-to-r from-[#EC4899] to-[#06B6D4] mx-auto mt-8 rounded-full" />
        </motion.section>

        <section className="px-5 sm:px-6 py-12 md:py-16 max-w-3xl mx-auto text-center border-t border-gray-100 dark:border-white/[0.06]">
          <div className="rounded-2xl border bg-white border-gray-200 shadow-sm dark:bg-white/[0.025] dark:border-white/[0.08] dark:shadow-none p-8 sm:p-10 md:p-14 transition-colors duration-300">
            <h2 className="font-heading text-[24px] sm:text-[32px] md:text-[40px] font-black leading-[0.95] tracking-tight mb-4 text-gray-900 dark:text-white">
              Let&apos;s build something that{" "}
              <span className="bg-gradient-to-r from-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
                stands out
              </span>
            </h2>
            <p className="text-gray-500 dark:text-white/40 mb-8 text-sm font-body">
              High-performance digital products. Zero fluff.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#06B6D4] hover:bg-[#0891b2] text-white rounded-full font-body font-semibold text-sm transition-colors duration-200 cursor-pointer shadow-[0_0_28px_rgba(6,182,212,0.35)]"
            >
              Start a Project
            </motion.a>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
