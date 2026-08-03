"use client";

import { useRef } from "react";

import { playgroundCards } from "@/components/sections/footer/playground-card-data";
import { PlaygroundCard } from "@/components/shared/PlaygroundCard";

export function DraggablePlayfulCards() {
  const playgroundRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-w-0">
      <p className="mb-4 text-right text-xs font-semibold tracking-[0.16em] text-white/60 uppercase">
        Pick one up ↔
      </p>
      <div
        ref={playgroundRef}
        role="region"
        aria-label="Interactive studio personality cards"
        className="relative grid min-h-64 items-center justify-items-center gap-4 overflow-hidden px-2 py-5 sm:grid-cols-3"
      >
        {playgroundCards.map((card) => (
          <PlaygroundCard
            key={card.title}
            title={card.title}
            description={card.description}
            icon={card.icon}
            background={card.background}
            rotation={card.rotation}
            offset={card.offset}
            constraintsRef={playgroundRef}
          />
        ))}
      </div>
    </div>
  );
}
