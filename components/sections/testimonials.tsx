"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

const INK    = "#111110";
const MUTED  = "#6B6B68";
const LIGHT  = "#A9A9A5";
const BORDER = "#E5E3DE";
const BG     = "#FAFAF7";

const testimonials = [
  {
    id: 1, name: "Rahul Sharma",  role: "Founder",         company: "StartupX",
    content: "Luit Studios completely transformed our digital presence. The UI and performance exceeded our expectations.",
    rating: 5, avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2, name: "Ayesha Khan",   role: "Marketing Head",  company: "GrowthLab",
    content: "From branding to execution, everything was handled flawlessly. Highly recommended!",
    rating: 5, avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3, name: "Michael D",     role: "Product Manager", company: "InnovateTech",
    content: "The team delivered beyond expectations. Clean code, premium UI, and amazing support.",
    rating: 5, avatar: "https://randomuser.me/api/portraits/men/46.jpg",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="border-t"
      style={{ backgroundColor: BG, borderColor: BORDER }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 xl:px-12 py-16 sm:py-20 grid md:grid-cols-2 gap-12 sm:gap-16 items-center">

        {/* ── Left ── */}
        <div>
          <div className="mb-4">
            <span
              className="font-body text-[10px] tracking-[0.34em] uppercase tabular-nums"
              style={{ color: LIGHT }}
            >
              [ 004 ]
            </span>
          </div>

          <h2
            className="font-heading font-black tracking-tight leading-[0.88] mb-5"
            style={{ color: INK }}
          >
            <span className="block text-[clamp(34px,5vw,72px)]">What our</span>
            <span
              className="block text-[clamp(34px,5vw,72px)] text-transparent select-none"
              style={{ WebkitTextStroke: `1.5px ${INK}` }}
            >
              clients say.
            </span>
          </h2>

          <p
            className="font-body text-[14px] sm:text-[15px] leading-[1.72] max-w-[360px] mb-8"
            style={{ color: MUTED }}
          >
            Real experiences from people who trusted Luit Studios with their digital presence.
          </p>

          {/* Trust badge */}
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-8"
            style={{ borderColor: BORDER }}
          >
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span
              className="font-body text-[11px] font-medium"
              style={{ color: MUTED }}
            >
              5.0 average across all projects
            </span>
          </div>

          {/* Dot indicators */}
          <div className="flex gap-2.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  active === i ? "w-8 bg-[#111110]" : "w-2 bg-[#E5E3DE] hover:bg-[#A9A9A5]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Right — carousel ── */}
        <div className="relative min-h-[280px] sm:min-h-[320px]">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="absolute inset-0 transition-all duration-400 ease-out"
              style={{
                opacity: active === i ? 1 : 0,
                transform: active === i ? "translateX(0) scale(1)" : "translateX(32px) scale(0.98)",
                zIndex: active === i ? 10 : 0,
                pointerEvents: active === i ? "auto" : "none",
              }}
            >
              <div
                className="relative rounded-2xl border h-full flex flex-col p-5 sm:p-7"
                style={{ backgroundColor: "#FFFFFF", borderColor: BORDER }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array(t.rating).fill(0).map((_, idx) => (
                    <Star key={idx} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative flex-1 mb-6">
                  <Quote
                    className="absolute -top-1 -left-1 h-6 w-6 rotate-180"
                    style={{ color: BORDER }}
                  />
                  <p
                    className="font-body text-[14px] sm:text-[15px] leading-[1.75] pl-3"
                    style={{ color: MUTED }}
                  >
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>

                {/* Author */}
                <div
                  className="flex items-center gap-3.5 mt-auto pt-4 border-t"
                  style={{ borderColor: BORDER }}
                >
                  <Image
                    src={t.avatar} alt={t.name}
                    width={40} height={40}
                    className="w-10 h-10 rounded-full object-cover border"
                    style={{ borderColor: BORDER }}
                  />
                  <div>
                    <h3
                      className="font-heading font-semibold text-sm"
                      style={{ color: INK }}
                    >
                      {t.name}
                    </h3>
                    <p
                      className="font-body text-xs"
                      style={{ color: LIGHT }}
                    >
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
