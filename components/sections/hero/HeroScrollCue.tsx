"use client";

import { motion, useReducedMotion } from "framer-motion";

export function HeroScrollCue() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="mt-12 flex flex-col items-center gap-2.5 sm:mt-14"
    >
      <span className="border-body/30 flex h-9 w-6 items-start justify-center rounded-full border-[1.5px] pt-1.5">
        <motion.span
          className="text-body/60 block size-1.5 rounded-full bg-current"
          animate={
            shouldReduceMotion
              ? undefined
              : { y: [0, 12, 0], opacity: [1, 0.2, 1] }
          }
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
      <span className="text-body/50 text-[11px] font-medium tracking-[0.18em] uppercase">
        Scroll to explore
      </span>
    </div>
  );
}
