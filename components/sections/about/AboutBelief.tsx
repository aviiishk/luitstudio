import { Heart, Leaf, Users, Zap } from "lucide-react";

import { AnimatedHeadline } from "@/components/shared/AnimatedHeadline";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/ui/container";

const beliefs = [
  {
    title: "Direct & Involved",
    body: "You work with the people who actually do the work.",
    icon: Zap,
    bg: "bg-[#f8dede]",
    color: "text-rose-ink",
  },
  {
    title: "Quality over Quantity",
    body: "We take on fewer projects to keep the quality high.",
    icon: Users,
    bg: "bg-[#dcedf7]",
    color: "text-sky-ink",
  },
  {
    title: "Curiosity Always",
    body: "We keep learning, exploring, and improving.",
    icon: Leaf,
    bg: "bg-[#e1f0dc]",
    color: "text-green-ink",
  },
  {
    title: "Long-term Thinking",
    body: "We care about the work even after it's live.",
    icon: Heart,
    bg: "bg-[#f8dede]",
    color: "text-rose-ink",
  },
] as const;

export function AboutBelief() {
  return (
    <section
      id="belief"
      aria-labelledby="belief-heading"
      className="bg-[#f8dede]/15 py-16 md:py-20 xl:py-24"
    >
      <Container className="mx-auto grid max-w-4xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-5">
          <span className="text-rose-ink text-xs font-bold tracking-widest uppercase">
            02 · Beliefs
          </span>

          <AnimatedHeadline
            as="h2"
            id="belief-heading"
            text="We don't believe"
            italicText="in the relay race."
            delay={0.05}
            animateOnView
            className="text-ink text-[clamp(2rem,4.5vw,2.75rem)] leading-[1.1] tracking-[-0.03em] text-balance"
            italicClassName="font-display font-normal"
          />

          <Reveal delay={0.08} className="flex flex-col gap-4">
            <p className="text-body text-base leading-7">
              Most studios pass a project around — sales to strategist,
              strategist to designer, designer to developer. Somewhere in
              between, the idea loses its original spark.
            </p>
            <p className="text-body text-base leading-7">
              At Luit, the two of us are in every important conversation.
              From the first idea to the final launch, you talk directly
              to the people actually building the work.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="grid grid-cols-2 gap-4">
          {beliefs.map((belief) => {
            const Icon = belief.icon;
            return (
              <div
                key={belief.title}
                className="bg-canvas border-border flex flex-col gap-3 rounded-2xl border p-5"
              >
                <span
                  className={`grid size-9 place-items-center rounded-full ${belief.bg} ${belief.color}`}
                >
                  <Icon aria-hidden="true" size={16} strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-ink text-sm font-semibold">
                    {belief.title}
                  </p>
                  <p className="text-body mt-1 text-xs leading-5">
                    {belief.body}
                  </p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
