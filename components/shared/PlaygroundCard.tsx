"use client";

import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  useState,
  type PointerEvent,
  type ReactNode,
  type RefObject,
} from "react";

interface PlaygroundCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  background: string;
  rotation: number;
  children?: ReactNode;
  constraintsRef: RefObject<HTMLDivElement | null>;
  offset?: { x: number; y: number };
}

export function PlaygroundCard({
  title,
  description,
  icon: Icon,
  background,
  rotation,
  children,
  constraintsRef,
  offset = { x: 0, y: 0 },
}: PlaygroundCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(shouldReduceMotion ? 0 : offset.x);
  const y = useMotionValue(shouldReduceMotion ? 0 : offset.y);
  const dragRotation = Math.max(-4, Math.min(4, rotation * -1.5));

  const preventTouchScroll = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.touchAction = "none";
  };

  const restoreTouchScroll = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.touchAction = "pan-y";
  };

  return (
    <motion.article
      tabIndex={0}
      aria-label={`${title}. ${description}`}
      drag
      dragConstraints={constraintsRef}
      dragMomentum={!shouldReduceMotion}
      dragElastic={shouldReduceMotion ? 0 : 0.14}
      dragTransition={{
        bounceStiffness: 260,
        bounceDamping: 28,
        power: shouldReduceMotion ? 0 : 0.22,
        timeConstant: shouldReduceMotion ? 0 : 320,
      }}
      onPointerDown={preventTouchScroll}
      onPointerUp={restoreTouchScroll}
      onPointerCancel={restoreTouchScroll}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              top: -5,
              rotate: rotation * 0.7,
              boxShadow: "0 18px 36px rgb(16 10 60 / 20%)",
            }
      }
      whileDrag={
        shouldReduceMotion
          ? { zIndex: 20 }
          : {
              scale: 1.04,
              rotate: dragRotation,
              zIndex: 20,
              boxShadow: "0 28px 56px rgb(16 10 60 / 30%)",
            }
      }
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      style={{
        x,
        y,
        rotate: shouldReduceMotion ? 0 : rotation,
        top: 0,
        touchAction: isDragging ? "none" : "pan-y",
      }}
      className={`group focus-visible:ring-offset-brand relative min-h-52 w-full max-w-72 rounded-2xl p-6 shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 ${
        isDragging ? "cursor-grabbing select-none" : "cursor-grab"
      } ${background}`}
    >
      <Icon
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 motion-reduce:transform-none"
        size={28}
        strokeWidth={1.8}
      />
      <h3 className="mt-10 text-xl leading-tight">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-current/85">{description}</p>
      {children}
    </motion.article>
  );
}
