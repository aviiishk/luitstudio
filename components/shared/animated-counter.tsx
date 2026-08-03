"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  duration?: number;
  value: number;
}

export function AnimatedCounter({
  duration = 1000,
  value,
}: AnimatedCounterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const shouldReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (shouldReduceMotion) return;

    let animationFrame = 0;
    let hasAnimated = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasAnimated) return;

        hasAnimated = true;
        const startTime = performance.now();
        setDisplayValue(0);

        const update = (currentTime: number) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(Math.round(value * easedProgress));

          if (progress < 1) animationFrame = requestAnimationFrame(update);
        };

        animationFrame = requestAnimationFrame(update);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [duration, value]);

  return (
    <span
      ref={elementRef}
      aria-hidden="true"
      className="inline-block min-w-[2ch] text-right tabular-nums"
    >
      {displayValue}
    </span>
  );
}
