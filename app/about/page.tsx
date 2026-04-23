"use client";

import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function AboutPage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -80]);

  return (
    <main className="bg-[#f5f5f5] text-black min-h-screen">

      <Navbar />

      {/* ================= HERO ================= */}
      <section className="text-center pt-32 md:pt-36 pb-20 md:pb-28 px-6 max-w-5xl mx-auto">

        <motion.div variants={stagger} initial="hidden" animate="show">

          <motion.p variants={fadeUp} className="text-sm text-gray-500 mb-4">
            About
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]"
          >
            Hi, we’re Luit Studios
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          >
            Meet the people who build high-performance digital products that actually work in the real world.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-16 md:mt-24 flex justify-center"
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src="/hero/abouthero.png"
              alt="Luit Studios"
              width={1200}
              height={500}
              priority
              className="w-full max-w-5xl object-contain"
            />
          </motion.div>

        </motion.div>

      </section>

      {/* ================= STORY ================= */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="px-6 py-20 md:py-32 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start"
      >

        <motion.div variants={fadeUp}>
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
            Built for real-world impact.
            <br />
            <span className="underline underline-offset-4 decoration-2">
              Not just visuals.
            </span>
          </h2>

          <motion.div
            className="mt-12 md:mt-20"
            whileHover={{ y: -6, scale: 1.05 }}
          >
            <Image
              src="/hero/story-illu.png"
              alt="Story"
              width={260}
              height={200}
              className="w-[200px] md:w-[260px]"
            />
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="text-gray-700 space-y-5 text-[15px] md:text-[16px] leading-relaxed max-w-xl"
        >
          <p>
            We build products with a clear focus on performance, usability, and real-world impact.
          </p>
          <p>
            Instead of chasing trends, we focus on systems that scale and solve actual user problems.
          </p>

          <p className="font-semibold text-black">
            Over time, we’ve developed a process that ensures every product is fast, clean, and built to last.
          </p>

          <p>
            From SaaS platforms to internal dashboards, our goal is simple — build products that work.
          </p>

          <p>The best is yet to come.</p>
        </motion.div>

      </motion.section>

      {/* ================= PHILOSOPHY ================= */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="px-6 py-20 md:py-32 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start"
      >

        <motion.div variants={fadeUp}>
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">
            Our Philosophy
          </h2>

          <p className="text-gray-600 mb-10 md:mb-14 max-w-md text-base md:text-lg">
            Our culture isn’t something we keep to ourselves. It’s baked into every product we build.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">

            {[
              {
                title: "Efficiency",
                desc: "Working smarter, faster, and cleaner to reduce friction.",
              },
              {
                title: "Empowerment",
                desc: "We build systems that give teams control and confidence.",
              },
              {
                title: "Transparency",
                desc: "Clear communication builds trust across teams.",
              },
              {
                title: "Innovation",
                desc: "We evolve constantly to build better products.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group cursor-pointer"
              >
                <h3 className="font-semibold text-lg md:text-xl mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>

                <div className="h-[2px] w-0 bg-black mt-2 group-hover:w-12 transition-all duration-300" />
              </motion.div>
            ))}

          </div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          style={{ y }}
          className="relative flex justify-center md:justify-end mt-10 md:mt-0"
        >
          <div className="absolute w-[250px] md:w-[300px] h-[150px] bg-yellow-200 blur-[120px] opacity-60 top-10 right-0 -z-10" />

          <Image
            src="/hero/credo-illu.png"
            alt="Philosophy"
            width={500}
            height={500}
            className="w-[260px] sm:w-[320px] md:w-[420px] object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.15)]"
          />
        </motion.div>

      </motion.section>

      {/* ================= QUOTE ================= */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-20 md:py-32 px-6 text-center"
      >
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold max-w-3xl mx-auto leading-tight">
          “We think like product builders,
          <br /> not just designers.”
        </h2>

        <div className="w-10 md:w-12 h-[2px] bg-black mx-auto mt-6 md:mt-8" />
      </motion.section>

      {/* ================= CTA ================= */}
      <section className="px-6 pb-20 md:pb-32 max-w-5xl mx-auto text-center">

        <div className="bg-white rounded-2xl p-8 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

          <h2 className="text-2xl md:text-4xl font-semibold mb-4">
            Let’s build something that stands out
          </h2>

          <p className="text-gray-600 mb-6 text-sm md:text-base">
            High-performance digital products. Zero fluff.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 md:px-8 py-3 bg-black text-white rounded-lg"
          >
            Start a Project
          </motion.button>

        </div>

      </section>

      <Footer />

    </main>
  );
}