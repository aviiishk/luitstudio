"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { MOTION_DURATION, MOTION_EASING } from "@/constants/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`motion-enhanced ${className ?? ""}`}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: shouldReduceMotion ? 0 : MOTION_DURATION.reveal,
        delay: shouldReduceMotion ? 0 : delay,
        ease: MOTION_EASING.premium,
      }}
    >
      {children}
    </motion.div>
  );
}
