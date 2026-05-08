"use client";

import Image from "next/image";
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

export default function AboutPage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -80]);

  return (
    <main className="bg-[#fafafa] dark:bg-[#08080f] text-gray-900 dark:text-white min-h-screen transition-colors duration-300">

      {/* Ambient glows */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-[#EC4899]/4 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-[#06B6D4]/4 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">

        {/* ── HERO ── */}
        <section className="text-center pt-32 md:pt-36 pb-20 md:pb-28 px-5 sm:px-6 max-w-5xl mx-auto">
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

            <motion.div
              variants={fadeUp}
              className="mt-14 md:mt-20 flex justify-center"
              whileHover={{ scale: 1.01 }}
            >
              <Image
                src="/hero/abouthero.png"
                alt="Luit Studios team"
                width={1200}
                height={500}
                priority
                className="w-full max-w-5xl object-contain rounded-2xl border border-gray-200 dark:border-white/[0.08]"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ── STORY ── */}
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

            <motion.div className="mt-10 md:mt-16" whileHover={{ y: -6, scale: 1.03 }}>
              <Image
                src="/hero/story-illu.png"
                alt="Our story illustration"
                width={260}
                height={200}
                className="w-[160px] sm:w-[200px] md:w-[260px] opacity-80"
              />
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
            <p>From SaaS platforms to internal dashboards, our goal is simple — build products that work.</p>
            <p>The best is yet to come.</p>
          </motion.div>
        </motion.section>

        {/* ── PHILOSOPHY ── */}
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
                { title: "Efficiency",    desc: "Working smarter, faster, and cleaner to reduce friction." },
                { title: "Empowerment",   desc: "We build systems that give teams control and confidence." },
                { title: "Transparency",  desc: "Clear communication builds trust across teams." },
                { title: "Innovation",    desc: "We evolve constantly to build better products." },
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

          <motion.div
            style={{ y }}
            className="relative flex justify-center md:justify-end mt-6 md:mt-0"
          >
            <div className="absolute w-[200px] md:w-[260px] h-[120px] bg-[#EC4899] blur-[80px] opacity-10 top-10 right-0 -z-10 rounded-full" />
            <Image
              src="/hero/credo-illu.png"
              alt="Our philosophy illustration"
              width={500}
              height={500}
              className="w-[220px] sm:w-[280px] md:w-[380px] lg:w-[420px] object-contain opacity-80"
            />
          </motion.div>
        </motion.section>

        {/* ── QUOTE ── */}
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

        {/* ── CTA ── */}
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
