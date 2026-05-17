"use client";

import { useEffect } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[200] pointer-events-none"
      aria-hidden="true"
    >
      <div className="w-full h-full bg-gradient-to-r from-[#EC4899] via-[#F472B6] to-[#06B6D4]" />
    </motion.div>
  );
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (shouldReduce || coarsePointer) return;

    const lenis = new Lenis({ lerp: 0.075, wheelMultiplier: 0.85 });
    let frame = 0;
    let active = true;

    function raf(time: number) {
      if (!active) return;
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }

    function onVisibility() {
      if (document.hidden) {
        active = false;
        cancelAnimationFrame(frame);
      } else {
        active = true;
        frame = requestAnimationFrame(raf);
      }
    }

    frame = requestAnimationFrame(raf);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      active = false;
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVisibility);
      lenis.destroy();
    };
  }, [shouldReduce]);

  return (
    <>
      <ScrollProgress />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[199] hidden opacity-[0.022] md:block"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
      {children}
    </>
  );
}
