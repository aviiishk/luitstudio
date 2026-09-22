"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";

import type { ServiceData } from "@/components/sections/services/service-data";
import { MOTION_DURATION, MOTION_EASING } from "@/constants/motion";

interface ServiceCardProps {
  service: Omit<ServiceData, "icon">;
  icon: ReactNode;
  index?: number;
}

// Estimated tooltip height (px), used only to probe whether opening above
// the card would land on top of the row above it — a real card there (or
// the viewport edge) flips the tooltip to open below the card instead.
// Anchoring to the whole card (not just the icon) means either way it
// stays outside the card, never covering its own title or description.
const ESTIMATED_TOOLTIP_HEIGHT = 100;

export function ServiceCard({ service, icon, index }: ServiceCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [placement, setPlacement] = useState<"above" | "below">("above");
  const cardRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const factId = `${service.id}-fact`;

  const reveal = () => {
    const rect = cardRef.current?.getBoundingClientRect();

    if (!rect) {
      setIsRevealed(true);
      return;
    }

    const probeY = rect.top - ESTIMATED_TOOLTIP_HEIGHT;
    const probeX = rect.left + rect.width / 2;
    const elementAbove =
      probeY > 0 ? document.elementFromPoint(probeX, probeY) : null;
    const collidesWithAnotherCard = Boolean(
      elementAbove?.closest("article") &&
        elementAbove.closest("article") !== cardRef.current,
    );

    setPlacement(probeY < 0 || collidesWithAnotherCard ? "below" : "above");
    setIsRevealed(true);
  };
  const hide = () => setIsRevealed(false);

  return (
    <article
      ref={cardRef}
      aria-labelledby={`${service.id}-title`}
      aria-describedby={factId}
      tabIndex={0}
      onMouseEnter={reveal}
      onMouseLeave={hide}
      onFocus={reveal}
      onBlur={hide}
      className={`group relative flex h-full min-h-48 flex-col justify-between rounded-2xl border border-transparent p-6 outline-none transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-soft focus-visible:-translate-y-1 focus-visible:shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-reduce:transform-none sm:min-h-52 sm:p-8 ${service.themeClassName}`}
    >
      <div className="flex items-start justify-between">
        {icon}
        {typeof index === "number" ? (
          <span className="font-display text-current/30 text-3xl italic">
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null}
      </div>

      <motion.div
        id={factId}
        role="tooltip"
        style={{ backgroundColor: service.accentColor }}
        className={`absolute left-6 z-20 w-56 origin-top-left rounded-xl p-3.5 text-white shadow-lg sm:left-8 sm:w-64 ${
          placement === "above" ? "bottom-full mb-3" : "top-full mt-3"
        } ${isRevealed ? "" : "pointer-events-none"}`}
        initial={false}
        animate={
          isRevealed
            ? { opacity: 1, y: 0, scale: 1 }
            : {
                opacity: 0,
                y: shouldReduceMotion ? 0 : placement === "above" ? 6 : -6,
                scale: shouldReduceMotion ? 1 : 0.95,
              }
        }
        transition={{
          duration: shouldReduceMotion ? 0 : MOTION_DURATION.factReveal,
          ease: MOTION_EASING.premium,
        }}
      >
        <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-white/70 uppercase">
          {service.colorName}
        </p>
        <p className="mt-1 text-xs leading-5">{service.fact}</p>
      </motion.div>

      <div className="flex flex-col gap-2 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none">
        <h3
          id={`${service.id}-title`}
          className="text-2xl leading-tight font-medium text-current"
        >
          {service.title}
        </h3>
        <p className="text-sm leading-6 text-current/75">
          {service.description}
        </p>
      </div>
    </article>
  );
}
