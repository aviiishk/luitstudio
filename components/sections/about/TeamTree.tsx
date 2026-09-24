"use client";

import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/shared/Logo";
import { buildConnectorPath } from "@/lib/team-canvas";
import type { TeamMember } from "@/types/team";

interface TeamTreeProps {
  members: TeamMember[];
}

const TILE_WIDTH = 128;
const TILE_HEIGHT = 172;
const CANVAS_PADDING = 90;
const MIN_CANVAS_HEIGHT = 360;
const MAX_CANVAS_HEIGHT = 760;
const MAX_FIT_SCALE = 1.15;

const cardTints = [
  { bg: "bg-[#dcedf7]", color: "text-sky-ink" },
  { bg: "bg-[#f8dede]", color: "text-rose-ink" },
  { bg: "bg-[#eee3fb]", color: "text-violet-ink" },
  { bg: "bg-[#fdeecb]", color: "text-[#8a5a10]" },
] as const;

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

export function TeamTree({ members }: TeamTreeProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setViewportSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (members.length === 0) return null;

  // Root always sits at world (0, 0). Bounding box covers the root plus
  // every member's saved position, with room for a tile's own footprint
  // so nothing gets clipped at the edges.
  const xs = [0, ...members.map((member) => member.canvasX)];
  const ys = [0, ...members.map((member) => member.canvasY)];
  const minX = Math.min(...xs) - TILE_WIDTH / 2 - CANVAS_PADDING;
  const maxX = Math.max(...xs) + TILE_WIDTH / 2 + CANVAS_PADDING;
  const minY = Math.min(...ys) - CANVAS_PADDING;
  const maxY = Math.max(...ys) + TILE_HEIGHT + CANVAS_PADDING;
  const worldWidth = maxX - minX;
  const worldHeight = maxY - minY;

  const rawFitScale =
    viewportSize.width > 0 && viewportSize.height > 0
      ? Math.min(viewportSize.width / worldWidth, viewportSize.height / worldHeight)
      : 1;
  const fitScale = Math.min(rawFitScale, MAX_FIT_SCALE);

  const offsetX = -minX;
  const offsetY = -minY;

  return (
    <div
      ref={viewportRef}
      className="relative mx-auto w-full max-w-6xl overflow-hidden"
      style={{
        aspectRatio: `${worldWidth} / ${worldHeight}`,
        minHeight: MIN_CANVAS_HEIGHT,
        maxHeight: MAX_CANVAS_HEIGHT,
      }}
    >
      <div
        className="absolute top-1/2 left-1/2"
        style={{
          width: worldWidth,
          height: worldHeight,
          transform: `translate(-50%, -50%) scale(${fitScale})`,
        }}
      >
        <svg
          aria-hidden="true"
          width={worldWidth}
          height={worldHeight}
          viewBox={`0 0 ${worldWidth} ${worldHeight}`}
          className="absolute inset-0"
        >
          <g transform={`translate(${offsetX} ${offsetY})`}>
            {members.map((member) => (
              <path
                key={member.id}
                d={buildConnectorPath(member.canvasX, member.canvasY)}
                fill="none"
                stroke="var(--color-brand)"
                strokeLinecap="round"
                strokeWidth="2.5"
              />
            ))}
          </g>
        </svg>

        <div
          className="absolute w-32 -translate-x-1/2"
          style={{ left: offsetX, top: offsetY }}
        >
          <Logo className="h-auto w-full" />
        </div>

        {members.map((member, index) => {
          const tint = cardTints[index % cardTints.length];

          return (
            <div
              key={member.id}
              className="absolute -translate-x-1/2"
              style={{
                left: offsetX + member.canvasX,
                top: offsetY + member.canvasY,
                width: TILE_WIDTH,
              }}
            >
              <div className="border-canvas relative aspect-4/5 overflow-hidden rounded-2xl border-4 shadow-lg">
                {member.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- arbitrary uploaded/external URL, not a local/optimizable asset
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className={`${tint.bg} flex h-full flex-col justify-end gap-1 p-3`}
                  >
                    <span
                      className={`${tint.color} font-display text-2xl italic`}
                    >
                      {initials(member.name)}
                    </span>
                  </div>
                )}

                {member.isFounder ? (
                  <span className="bg-brand absolute top-1.5 left-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.6rem] font-semibold text-white shadow-sm">
                    <Star aria-hidden="true" className="fill-white" size={9} />
                    Founder
                  </span>
                ) : null}
              </div>

              <div className="mt-2 text-center">
                <p className="text-ink text-xs leading-tight font-semibold">
                  {member.name}
                </p>
                <p className="text-body truncate text-[0.65rem]">
                  {member.role}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
