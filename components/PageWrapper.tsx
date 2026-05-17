"use client";

import { ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

export default function PageWrapper({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();

  // 🎯 LIMIT RANGE (less work)
  const rawBg = useTransform(
    scrollYProgress,
    [0, 0.25], // reduced from 0.4 → faster + smoother
    ["#000000", "#f5f5f5"]
  );

  // 🧈 SMOOTH WITH SPRING (very important)
  const background = useSpring(rawBg, {
    stiffness: 80,
    damping: 20,
    mass: 0.5,
  });

  return (
    <motion.div
      style={{ backgroundColor: background }}
      className="min-h-screen will-change-[background-color]"
    >
      {children}
    </motion.div>
  );
}