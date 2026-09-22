"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";

import {
  disciplineCategories,
  disciplineMap,
} from "@/components/sections/services/discipline-map";
import { CategoryMiniIllustration } from "@/components/sections/services/ServiceIllustrations";
import { services } from "@/components/sections/services/service-data";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/ui/container";

export function ServiceMap() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section
      id="map"
      aria-labelledby="service-map-heading"
      className="scroll-mt-24 bg-white py-12 md:py-14 xl:py-16"
    >
      <Container className="grid gap-8 lg:grid-cols-[0.82fr_3.18fr] lg:items-center lg:gap-10">
        <Reveal className="max-w-sm">
          <h2
            id="service-map-heading"
            className="text-ink text-[clamp(1.9rem,3.8vw,2.8rem)] leading-[1.02] tracking-[-0.035em] text-balance"
          >
            One studio.{" "}
            <em className="font-display leading-[1.12] font-normal">
              Different ways to move forward.
            </em>
          </h2>
          <p className="text-body mt-4 max-w-xs text-sm leading-6">
            Whatever you&apos;re building, automating, designing, growing or
            telling, we&apos;ve got you covered.
          </p>
          <a
            href="#build"
            className="border-border text-ink mt-5 inline-flex min-h-10 items-center gap-2 rounded-full border bg-white px-4 text-sm font-medium shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:-translate-y-0.5 motion-reduce:transform-none"
          >
            View all services
            <ArrowUpRight aria-hidden="true" size={15} />
          </a>
        </Reveal>

        <div className="relative">
          <svg
            aria-hidden="true"
            className="text-border pointer-events-none absolute inset-x-6 top-16 hidden h-20 xl:block"
            viewBox="0 0 1000 120"
          >
            <path
              className="luit-draw-line"
              d="M48 64 C218 6 310 112 500 60 C692 8 778 112 952 54"
              fill="none"
              stroke="currentColor"
              strokeDasharray="7 10"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {disciplineCategories.map((category, categoryIndex) => {
              const items = disciplineMap.filter(
                (item) => item.category === category.label,
              );
              const isActive = active === category.label;
              const isDimmed = active !== null && !isActive;
              const CategoryIcon = category.icon;

              return (
                <Reveal
                  key={category.label}
                  delay={0.04 + categoryIndex * 0.06}
                  className="h-full"
                >
                  <article
                    onMouseEnter={() => setActive(category.label)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(category.label)}
                    onBlur={() => setActive(null)}
                    className="group border-border bg-canvas hover:shadow-floating focus-within:shadow-floating relative flex h-full flex-col overflow-hidden rounded-lg border p-3 shadow-sm transition-[transform,box-shadow,opacity,border-color] duration-300 focus-within:-translate-y-1 hover:-translate-y-1 motion-reduce:transform-none"
                    style={{
                      borderColor: isActive
                        ? `${category.accent}66`
                        : "var(--color-border)",
                      opacity: isDimmed ? 0.48 : 1,
                    }}
                  >
                    <CategoryMiniIllustration
                      kind={category.label}
                      accent={category.accent}
                    />

                    <div className="flex flex-1 flex-col gap-4 pt-4">
                      <div className="flex items-start justify-between gap-4">
                        <span
                          className="grid size-10 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-6"
                          style={{
                            backgroundColor: `${category.accent}18`,
                            color: category.accent,
                          }}
                        >
                          <CategoryIcon aria-hidden="true" size={18} />
                        </span>
                        <ArrowRight
                          aria-hidden="true"
                          size={19}
                          className="text-body/45 mt-1 transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </div>

                      <div>
                        <h3
                          className="text-ink text-xl font-semibold tracking-[-0.025em]"
                          style={{
                            color: isActive ? category.accent : undefined,
                          }}
                        >
                          {category.label}
                        </h3>
                        <p className="text-body mt-1.5 text-xs leading-5">
                          {category.blurb}
                        </p>
                      </div>

                      <div className="mt-auto flex flex-wrap gap-2">
                        {items.map((item) => {
                          const service = services.find(
                            (candidate) => candidate.id === item.serviceId,
                          );
                          if (!service) return null;
                          const Icon = service.icon;

                          return (
                            <a
                              key={item.serviceId}
                              href={`#${item.sectionId}`}
                              className="group/tag text-body hover:text-ink focus-visible:text-ink flex items-center gap-1.5 text-[0.68rem] font-medium transition-[transform,color] duration-200 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 motion-reduce:transform-none"
                              style={{
                                color: isActive
                                  ? service.accentColor
                                  : undefined,
                              }}
                            >
                              <Icon aria-hidden="true" size={13} />
                              {service.title}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
