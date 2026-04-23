"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function AnimatedGradientBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number;
    let t = 0;

    const animate = () => {
      t += 0.005;

      const x = 50 + Math.sin(t) * 10;
      const y = 80 + Math.cos(t) * 5; // 👈 push DOWN

      const gradient = `
        radial-gradient(
          120% 120% at ${x}% ${y}%,
          #ff6a00 0%,
          #ff3cac 20%,
          #3b82f6 40%,
          #020617 75%
        )
      `;

      if (ref.current) {
        ref.current.style.background = gradient;
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 -z-10"
    >
      <div ref={ref} className="w-full h-full" />
    </motion.div>
  );
}