"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Card3D({ item }: any) {
  const ref = useRef<any>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMove = (e: any) => {
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;

    x.set(px);
    y.set(py);

    ref.current.style.setProperty("--x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY }}
      className="relative rounded-2xl p-[1px] group"
    >
      {/* animated border */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.15),transparent,rgba(255,255,255,0.15))] animate-[borderMove_6s_linear_infinite]" />

      {/* spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
        style={{
          background:
            "radial-gradient(600px circle at var(--x) var(--y), rgba(255,255,255,0.12), transparent 40%)",
        }}
      />

      {/* content */}
      <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h3 className="text-xl mb-3">{item.title}</h3>
        <p className="text-white/60 text-sm">{item.desc}</p>
      </div>
    </motion.div>
  );
}