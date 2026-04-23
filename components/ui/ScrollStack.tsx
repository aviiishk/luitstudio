"use client";

import React, { useLayoutEffect, useRef } from "react";
import Lenis from "lenis";

export const ScrollStackItem = ({ children }: any) => (
  <div className="scroll-stack-card relative w-full h-[420px] my-10 p-8 rounded-[30px] bg-[#111] border border-white/10">
    {children}
  </div>
);

const ScrollStack = ({ children }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(
      container.querySelectorAll(".scroll-stack-card")
    ) as HTMLElement[];

    cardsRef.current = cards;

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const update = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const offset = rect.top;

        const progress = 1 - Math.min(Math.max(offset / viewportHeight, 0), 1);

        const scale = 1 - progress * 0.1 * i;
        const translateY = progress * 60 * i;

        card.style.transform = `translateY(${translateY}px) scale(${scale})`;
        card.style.zIndex = `${cards.length - i}`;
      });
    };

    window.addEventListener("scroll", update);
    update();

    return () => {
      window.removeEventListener("scroll", update);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className="px-6 pb-40">
      {children}
    </div>
  );
};

export default ScrollStack;