"use client";

import Image from "next/image";
import { RoughNotation } from "react-rough-notation";
import { motion } from "framer-motion";

/* 🔥 animations */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

export default function ExpertiseEditorial() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 80, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative bg-[#f5f5f4] text-black py-16 overflow-hidden"
    >

      {/* 🌈 BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-400/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-400/20 blur-[120px] rounded-full" />

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(to right, black 1px, transparent 1px),
              linear-gradient(to bottom, black 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* 🔝 CONTENT WRAPPER */}
      <div className="relative z-10">

        {/* 🔝 TOP META */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="max-w-7xl mx-auto px-6 text-[10px] flex justify-between text-black/60 mb-3 tracking-wide"
        >
          <span>394.41 – 394.41 +</span>
          <span>IJA–48 +</span>
          <span>WEB SYSTEMS +</span>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 border-t border-dashed border-black/40 mb-6" />

        {/* 🔥 HEADLINE */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="max-w-7xl mx-auto px-6"
        >
          <h1 className="text-[48px] md:text-[96px] font-black leading-[0.9] tracking-tight">
            OUR{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EXPERTISE
            </span>
          </h1>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 border-b border-dashed border-black/40 mt-4 mb-10" />

        {/* 🔥 MAIN GRID */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 items-start"
        >

          {/* LEFT IMAGE (FIXED) */}
          <motion.div variants={fadeUp} className="relative w-full h-[260px] md:h-[320px] overflow-hidden group rounded-xl">
            <Image
              src="/projects/app.png"
              alt="web development"
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition duration-700"
            />
          </motion.div>

          {/* CENTER TEXT */}
          <motion.div variants={fadeUp} className="space-y-4 text-sm leading-relaxed">

            <div className="flex flex-wrap gap-2 text-[11px]">
              {["APP DEVELOPMENT", "UI/UX", "WEB DEVELOPMENT"].map((tag, i) => (
                <RoughNotation key={i} type="box" show={true}>
                  <span className="border px-2 py-1">{tag}</span>
                </RoughNotation>
              ))}
            </div>

            <h3 className="text-lg font-bold leading-tight">
              Crafting scalable digital experiences for modern businesses
            </h3>

            <p className="text-black/70">
              We design and develop high-performance websites that blend aesthetics with functionality.
              From intuitive UI to scalable backend systems, ensuring{" "}
              <RoughNotation type="underline" show={true}>
                speed, performance, and seamless user experience
              </RoughNotation>.
            </p>

          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div variants={fadeUp} className="space-y-4">

            <div className="relative w-full h-[260px] md:h-[320px] overflow-hidden group rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
                alt="coding"
                fill
                sizes="(max-width:768px) 100vw, 33vw"
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition duration-700"
              />
            </div>

            <div className="text-sm text-black/70 leading-relaxed">
              <RoughNotation type="box" show={true}>
                <span className="border px-2 py-1 text-[11px]">
                  WEBSITE DEVELOPMENT
                </span>
              </RoughNotation>

              <p className="mt-2">
                Building robust platforms with modern technologies, focusing on{" "}
                <RoughNotation type="underline" show={true} color="#2563eb">
                  scalability and performance
                </RoughNotation>.
              </p>
            </div>

        </motion.div>
        </motion.div>

        {/* 🔥 STRIP */}
        {/* 🔥 SERVICES */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          className="max-w-7xl mx-auto px-6 mt-16 grid md:grid-cols-3 gap-10"
        >
          {[
            {
              title: "Social Media Management",
              img: "https://images.unsplash.com/photo-1547658719-da2b51169166",
            },
            {
              title: "SEO Optimization",
              img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
            },
            {
              title: "Performance Marketing",
              img: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
            },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="space-y-3 group">

              <h4 className="text-sm font-bold uppercase border-b border-black pb-1">
                {item.title}
              </h4>

              <p className="text-sm text-black/70">
                High-impact strategies designed for growth and scale.
              </p>

              <div className="relative w-full h-[160px] overflow-hidden rounded-lg">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition duration-700"
                />
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}