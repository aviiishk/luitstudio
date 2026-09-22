"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Aperture,
  BarChart3,
  Bot,
  Camera,
  MousePointer2,
  Palette,
  PanelsTopLeft,
  Play,
  Smartphone,
  Type,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRef, type PointerEvent as ReactPointerEvent } from "react";

interface HeroArtifact {
  label: string;
  note: string;
  icon: LucideIcon;
  accent: string;
  className: string;
  delay: number;
}

const artifacts: readonly HeroArtifact[] = [
  {
    label: "Browser",
    note: "Web",
    icon: PanelsTopLeft,
    accent: "var(--color-brand)",
    className: "left-[4%] top-[14%] h-32 w-48 -rotate-6",
    delay: 0.08,
  },
  {
    label: "Mobile app",
    note: "Build",
    icon: Smartphone,
    accent: "var(--color-sky)",
    className: "right-[10%] top-[8%] h-40 w-24 rotate-5",
    delay: 0.16,
  },
  {
    label: "AI node",
    note: "AI",
    icon: Bot,
    accent: "var(--color-violet)",
    className: "right-[30%] top-[36%] h-28 w-28 -rotate-3",
    delay: 0.24,
  },
  {
    label: "Camera",
    note: "Motion",
    icon: Camera,
    accent: "var(--color-orange)",
    className: "left-[10%] bottom-[15%] h-28 w-36 rotate-4",
    delay: 0.32,
  },
  {
    label: "Type card",
    note: "Design",
    icon: Type,
    accent: "var(--color-rose)",
    className: "left-[42%] top-[6%] h-24 w-36 rotate-3",
    delay: 0.4,
  },
  {
    label: "Palette",
    note: "Identity",
    icon: Palette,
    accent: "var(--color-rose)",
    className: "right-[6%] bottom-[24%] h-24 w-40 -rotate-6",
    delay: 0.48,
  },
  {
    label: "Growth graph",
    note: "Growth",
    icon: BarChart3,
    accent: "var(--color-green)",
    className: "left-[34%] bottom-[2%] h-28 w-44 rotate-2",
    delay: 0.56,
  },
  {
    label: "Video frame",
    note: "Impact",
    icon: Play,
    accent: "var(--color-violet)",
    className: "right-[31%] bottom-[12%] h-24 w-36 rotate-6",
    delay: 0.64,
  },
] as const;

const annotations = [
  { text: "ideas to impact", className: "left-[4%] top-[3%] -rotate-3" },
  { text: "make it useful", className: "right-[4%] top-[48%] rotate-3" },
  { text: "ship the system", className: "left-[25%] bottom-[10%] -rotate-2" },
] as const;

function ArtifactCard({ artifact }: { artifact: HeroArtifact }) {
  const Icon = artifact.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: artifact.delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`luit-float-a border-border shadow-floating absolute rounded-xl border bg-white p-3 ${artifact.className}`}
      style={{ animationDelay: `${artifact.delay * 3}s` }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="grid size-8 place-items-center rounded-xl"
          style={{
            backgroundColor: `${artifact.accent}20`,
            color: artifact.accent,
          }}
        >
          <Icon aria-hidden="true" size={16} strokeWidth={1.7} />
        </span>
        <span className="font-handwriting text-body/60 text-lg leading-none">
          {artifact.note}
        </span>
      </div>
      <div className="mt-3">
        <span
          className="block h-2.5 w-20 rounded-full"
          style={{ backgroundColor: artifact.accent }}
        />
        <span className="bg-surface mt-3 block h-2 w-full rounded-full" />
        <span className="bg-surface mt-2 block h-2 w-2/3 rounded-full" />
      </div>
    </motion.div>
  );
}

export function HeroSystem() {
  const shouldReduceMotion = useReducedMotion();
  const layerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !layerRef.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    layerRef.current.style.transform = `translate3d(${x * -16}px, ${y * -12}px, 0)`;
  };

  const handlePointerLeave = () => {
    if (!layerRef.current) return;
    layerRef.current.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <div
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative mx-auto aspect-[1.05] w-full max-w-[640px] overflow-visible"
    >
      <div
        ref={layerRef}
        className="relative h-full w-full transition-transform duration-300 ease-out"
      >
        <svg
          viewBox="0 0 620 590"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          <motion.path
            d="M85 155 C190 65 275 170 342 94 C416 12 486 88 528 134"
            stroke="var(--color-brand)"
            strokeLinecap="round"
            strokeWidth="2"
            strokeDasharray="8 10"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 1.2,
              delay: shouldReduceMotion ? 0 : 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
          <motion.path
            d="M116 382 C202 286 298 422 394 300 C458 218 516 320 566 248"
            stroke="var(--color-rose)"
            strokeLinecap="round"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 1.25,
              delay: shouldReduceMotion ? 0 : 0.28,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
          <motion.path
            d="M198 510 C276 466 320 540 396 482 C444 446 474 426 514 420"
            stroke="var(--color-green)"
            strokeLinecap="round"
            strokeWidth="2"
            strokeDasharray="5 9"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 1.25,
              delay: shouldReduceMotion ? 0 : 0.44,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </svg>

        <div className="absolute top-1/2 left-1/2 z-10 w-[62%] -translate-x-1/2 -translate-y-1/2 -rotate-2">
          <div className="border-border/80 shadow-floating overflow-hidden rounded-xl border bg-white p-2">
            <div className="border-border flex items-center gap-1.5 border-b px-2 py-1.5">
              <span className="size-1.5 rounded-full bg-[#f06d6d]" />
              <span className="size-1.5 rounded-full bg-[#f6d66d]" />
              <span className="size-1.5 rounded-full bg-[#79d45e]" />
              <span className="border-border bg-surface/60 ml-2 h-3.5 flex-1 rounded-full border" />
            </div>
            <div className="grid min-h-44 place-items-center bg-[#fffaf3] px-4 py-8">
              <div className="text-center">
                <p className="text-ink text-[clamp(1.2rem,3vw,2.4rem)] leading-[0.9] tracking-[-0.04em]">
                  Ideas to
                  <br />
                  <em className="font-display text-[1.18em] font-normal">
                    Impact
                  </em>
                </p>
                <span className="bg-brand mx-auto mt-4 block h-1.5 w-12 rounded-full" />
              </div>
            </div>
          </div>
          <div className="border-border absolute -right-8 -bottom-10 w-20 rotate-6 overflow-hidden rounded-xl border bg-white p-1.5 shadow-xl">
            <div className="bg-sky/15 rounded-lg px-2 py-7">
              <span className="bg-sky mx-auto block h-1.5 w-8 rounded-full" />
              <span className="mt-3 block h-7 rounded-md bg-white" />
              <span className="mt-2 block h-1.5 w-8/12 rounded-full bg-white" />
            </div>
          </div>
        </div>

        {annotations.map((annotation) => (
          <span
            key={annotation.text}
            className={`font-handwriting text-body/60 absolute text-xl ${annotation.className}`}
          >
            {annotation.text}
          </span>
        ))}

        <span className="border-violet/35 bg-violet/10 text-violet absolute top-[50%] left-[58%] grid size-16 place-items-center rounded-full border shadow-[0_0_34px_rgba(186,129,238,0.22)]">
          <Bot aria-hidden="true" size={25} />
        </span>
        <span className="luit-glow-node bg-sky absolute top-[53%] left-[60.5%] size-4 rounded-full" />

        {artifacts.map((artifact) => (
          <ArtifactCard key={artifact.label} artifact={artifact} />
        ))}

        <div className="absolute bottom-[28%] left-[48%] flex items-center gap-2">
          <span className="bg-brand size-3 rounded-full" />
          <span className="bg-rose size-3 rotate-45" />
          <span className="border-violet size-3 rounded-full border-2" />
          <span className="bg-green size-3 rounded-full" />
        </div>

        <Aperture
          className="text-orange absolute bottom-[30%] left-[16%]"
          size={28}
        />
        <MousePointer2
          className="luit-float-b text-ink/70 absolute top-[31%] right-[22%]"
          size={28}
        />
      </div>
    </div>
  );
}
