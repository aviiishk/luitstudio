"use client";

import { useEffect, useRef } from "react";

const INK    = "#111110";
const BORDER = "#E5E3DE";
const LIGHT  = "#A9A9A5";
const MUTED  = "#6B6B68";
const BG     = "#FAFAF7";

const CARDS = [
  { tag: "Website",    headline: "Turn manual\ntasks into\nautomations.",  sub: "Full-stack SaaS platform",  bg: "#FFFFFF", dark: false },
  { tag: "Product",    headline: "Pipeline\nmanagement\nfor teams.",        sub: "CRM & sales dashboard",    bg: "#111110", dark: true  },
  { tag: "Website",    headline: "One click.\nZero\nfriction.",             sub: "Fintech web application",  bg: "#F2F0EB", dark: false },
  { tag: "Mobile App", headline: "Automate\nyour entire\nbusiness.",        sub: "Cross-platform mobile app", bg: "#FFFFFF", dark: false },
  { tag: "Branding",   headline: "Bold identity\nthat\nscales.",            sub: "Brand identity system",    bg: "#E8E5DC", dark: false },
  { tag: "UI Design",  headline: "Pixel-perfect\ndesign\nsystems.",         sub: "Component library",        bg: "#111110", dark: true  },
];

const N      = CARDS.length;
const CARD_W = 280;
const CARD_H = 200;
// Radius so adjacent cards don't overlap: W / (2 * tan(π/N))
const RADIUS = Math.ceil(CARD_W / (2 * Math.tan(Math.PI / N))) + 40; // ~310

export default function OrbitGallery() {
  const ringRef  = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const velRef   = useRef(0.15);   // auto-rotate deg/frame
  const drag     = useRef({ on: false, lastX: 0 });
  const rafRef   = useRef<number>(0);

  useEffect(() => {
    const tick = () => {
      if (!drag.current.on) {
        // Ease velocity back toward the auto-rotation speed
        velRef.current = velRef.current * 0.95 + 0.15 * 0.05;
      }
      angleRef.current += velRef.current;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `rotateX(-6deg) rotateY(${angleRef.current}deg)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current = { on: true, lastX: e.clientX };
    velRef.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.style.cursor = "grabbing";
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.on) return;
    const dx = e.clientX - drag.current.lastX;
    velRef.current = dx * 0.4;
    angleRef.current += dx * 0.4;
    drag.current.lastX = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current.on = false;
    e.currentTarget.style.cursor = "grab";
  };

  const sectionH = CARD_H + 300;

  return (
    <div
      className="relative"
      style={{ backgroundColor: BG }}
    >
      {/* Left fade */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 z-10"
        style={{ width: "120px", background: `linear-gradient(to right, ${BG} 30%, transparent)` }}
      />
      {/* Right fade */}
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 z-10"
        style={{ width: "120px", background: `linear-gradient(to left, ${BG} 30%, transparent)` }}
      />

      {/* 3-D perspective wrapper */}
      <div
        style={{
          perspective: "1100px",
          perspectiveOrigin: "50% 50%",
          height: `${sectionH}px`,
          cursor: "grab",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Scene — preserve-3d so children live in 3D space */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Rotating ring — initially rotateX tilt + auto rotateY */}
          <div
            ref={ringRef}
            style={{
              position: "absolute",
              left: "50%",
              top: "38%",
              transformStyle: "preserve-3d",
              transform: `rotateX(-6deg) rotateY(0deg)`,
            }}
          >
            {CARDS.map((card, i) => {
              const yAngle = (360 / N) * i;
              return (
                <div
                  key={i}
                  style={{
                    position:          "absolute",
                    width:             `${CARD_W}px`,
                    height:            `${CARD_H}px`,
                    marginLeft:        `-${CARD_W / 2}px`,
                    marginTop:         `-${CARD_H / 2}px`,
                    transform:         `rotateY(${yAngle}deg) translateZ(${RADIUS}px)`,
                    borderRadius:      "22px",
                    backgroundColor:   card.bg,
                    border:            `1px solid ${card.dark ? "rgba(255,255,255,0.08)" : BORDER}`,
                    padding:           "22px 24px",
                    display:           "flex",
                    flexDirection:     "column",
                    justifyContent:    "space-between",
                    backfaceVisibility:       "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    boxShadow: card.dark
                      ? "0 12px 40px rgba(0,0,0,0.28)"
                      : "0 8px 28px rgba(0,0,0,0.07)",
                  }}
                >
                  {/* Tag */}
                  <span style={{
                    fontFamily:    "var(--font-body)",
                    fontSize:      "9px",
                    textTransform: "uppercase",
                    letterSpacing: "0.26em",
                    color:         card.dark ? "rgba(250,250,247,0.3)" : LIGHT,
                  }}>
                    {card.tag}
                  </span>

                  {/* Text */}
                  <div>
                    <p style={{
                      fontFamily:    "var(--font-heading)",
                      fontSize:      "17px",
                      fontWeight:    900,
                      lineHeight:    1.1,
                      letterSpacing: "-0.02em",
                      whiteSpace:    "pre-line",
                      color:         card.dark ? "#FAFAF7" : INK,
                    }}>
                      {card.headline}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize:   "10px",
                      marginTop:  "8px",
                      color:      card.dark ? "rgba(250,250,247,0.38)" : MUTED,
                    }}>
                      {card.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
