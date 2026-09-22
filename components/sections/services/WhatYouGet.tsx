import { Check } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/ui/container";

const groups = [
  {
    title: "Strategy",
    items: ["Project direction", "Requirements", "Technical planning"],
  },
  {
    title: "Design",
    items: ["Wireframes", "UI design", "Design system"],
  },
  {
    title: "Development",
    items: ["Frontend", "Backend", "Database", "APIs"],
  },
  {
    title: "Launch",
    items: ["Deployment", "Domain setup", "Analytics", "Documentation"],
  },
];

export function WhatYouGet() {
  return (
    <section
      className="bg-surface/55 py-12 md:py-14 xl:py-16"
      aria-labelledby="what-you-get-heading"
    >
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <Reveal className="max-w-2xl">
            <p className="text-body/65 text-sm font-semibold">
              What you actually get
            </p>
            <h2
              id="what-you-get-heading"
              className="text-ink mt-3 text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-[-0.035em] text-balance"
            >
              Okay, but what do you{" "}
              <em className="font-display leading-[1.12] font-normal">
                actually receive?
              </em>
            </h2>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {groups.map((group, index) => (
              <Reveal
                key={group.title}
                delay={0.04 + index * 0.05}
                className="bg-canvas rounded-lg p-4"
              >
                <h3 className="text-ink text-base font-semibold">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-body flex items-center gap-2.5 text-sm leading-6"
                    >
                      <span className="bg-brand/10 text-brand grid size-5 shrink-0 place-items-center rounded-full">
                        <Check aria-hidden="true" size={12} strokeWidth={2.5} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
