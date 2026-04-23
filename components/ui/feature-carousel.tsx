"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  GlobalSearchIcon,
  AiCloudIcon,
  SmartPhone01Icon,
  DashboardSquare01Icon,
  MagicWandIcon,
  CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

/* 🔥 DATA */
const FEATURES = [
  {
    id: "web",
    label: "Web Development",
    icon: GlobalSearchIcon,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    description: "High-performance websites built for scale and speed.",
  },
  {
    id: "cloud",
    label: "Cloud Systems",
    icon: AiCloudIcon,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    description: "Deploy and scale infrastructure seamlessly.",
  },
  {
    id: "mobile",
    label: "Mobile First",
    icon: SmartPhone01Icon,
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
    description: "Optimized experiences across all devices.",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: DashboardSquare01Icon,
    image:
      "https://images.unsplash.com/photo-1551288049-bbda38a10ad5",
    description: "Real-time insights that drive decisions.",
  },
  {
    id: "automation",
    label: "Automation",
    icon: MagicWandIcon,
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    description: "Automate workflows using AI-driven systems.",
  },
  {
    id: "security",
    label: "Security",
    icon: CheckmarkCircle01Icon,
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    description: "Enterprise-grade security for your systems.",
  },
];

const AUTO_PLAY_INTERVAL = 3000;
const ITEM_HEIGHT = 60;

export default function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  return (
    <section className="relative text-white py-32 overflow-hidden bg-[#062f26]">

      {/* 🔥 BACKGROUND FIXED */}
   <div className="absolute inset-0 z-0 pointer-events-none">

  {/* BASE GRADIENT */}
 <div className="absolute inset-0 bg-gradient-to-t from-[#062f26]/90 via-[#062f26]/40 to-transparent" />

  {/* GRID */}
  <motion.div
    className="absolute inset-0 opacity-30"
    style={{
      backgroundImage: `
        linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)
      `,
      backgroundSize: "60px 60px",
    }}
    animate={{ y: [0, 60] }}
    transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
  />

  {/* GLOW */}
  <motion.div
    className="absolute inset-0"
    animate={{ x: ["-100%", "100%"] }}
    transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
    style={{
      background:
        "linear-gradient(90deg, transparent, rgba(0,255,180,0.35), transparent)",
      filter: "blur(60px)",
    }}
  />
</div>

      {/* 🔥 CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-20">
          <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-4">
            Capabilities
          </p>

          <h2 className="text-4xl md:text-6xl tracking-tight leading-[1.1]">
            What we build and
            <br />
            how we <span className="italic">scale it.</span>
          </h2>
        </div>

        {/* GLASS CARD */}
        <div className="relative flex flex-col lg:flex-row rounded-[2rem] overflow-hidden bg-white/[0.02] backdrop-blur-md border border-white/10">

          {/* LEFT */}
          <div className="w-full lg:w-[40%] px-6 py-16 relative overflow-hidden">

            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex;

              return (
                <motion.div
                  key={feature.id}
                  animate={{
                    y: (index - currentIndex) * ITEM_HEIGHT,
                    opacity: isActive ? 1 : 0.4,
                  }}
                  transition={{ type: "spring", stiffness: 90 }}
                  className="absolute left-6 flex items-center gap-4"
                >
                  <button
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={`flex items-center gap-3 px-5 py-3 rounded-full border transition ${
                      isActive
                        ? "bg-white text-black border-white"
                        : "text-white/50 border-white/20 hover:border-white/40"
                    }`}
                  >
                    <HugeiconsIcon icon={feature.icon} size={18} />
                    <span className="text-sm uppercase tracking-wide">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT */}
          <div className="flex-1 relative min-h-[400px]">

            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex;

              return (
                <motion.div
                  key={feature.id}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.96,
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {isActive && (
                    <div className="absolute bottom-0 p-10">
                      <p className="text-white/50 text-xs uppercase mb-2 tracking-widest">
                        {feature.label}
                      </p>

                      <h3 className="text-2xl md:text-3xl max-w-md">
                        {feature.description}
                      </h3>
                    </div>
                  )}
                </motion.div>
              );
            })}

          </div>

        </div>
      </div>
    </section>
  );
}