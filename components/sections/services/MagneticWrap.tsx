"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";

interface MagneticWrapProps {
  children: ReactNode;
  className?: string;
}

// A restrained magnetic-button effect: the wrapped element drifts a few
// pixels toward the cursor and springs back on leave. Capped translation
// and a spring (not a raw follow) keep it feeling premium, not gimmicky.
export function MagneticWrap({ children, className }: MagneticWrapProps) {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const relX = event.clientX - bounds.left - bounds.width / 2;
    const relY = event.clientY - bounds.top - bounds.height / 2;
    x.set(Math.max(-10, Math.min(10, relX * 0.3)));
    y.set(Math.max(-8, Math.min(8, relY * 0.4)));
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
