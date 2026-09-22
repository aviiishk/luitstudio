import Image from "next/image";

import { AnimatedHeadline } from "@/components/shared/AnimatedHeadline";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/ui/container";

export function AboutOrigin() {
  return (
    <section
      id="origin"
      aria-labelledby="origin-heading"
      className="bg-[#dcedf7]/25 py-16 md:py-20 xl:py-24"
    >
      <Container className="mx-auto grid max-w-4xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-5">
          <span className="text-sky-ink text-xs font-bold tracking-widest uppercase">
            01 · Roots
          </span>

          <AnimatedHeadline
            as="h2"
            id="origin-heading"
            text="Guwahati"
            italicText="sits on the river's south bank."
            delay={0.05}
            animateOnView
            className="text-ink text-[clamp(2rem,4.5vw,2.75rem)] leading-[1.1] tracking-[-0.03em] text-balance"
            italicClassName="font-display font-normal"
          />

          <Reveal delay={0.08} className="flex flex-col gap-4">
            <p className="text-body text-base leading-7">
              The river has seen cities rise, ideas travel, and people come
              together. For us, Guwahati is home — a place that keeps us
              grounded, curious, and connected.
            </p>
            <p className="text-body text-base leading-7">
              Luit Studio started in April 2026 in Guwahati, when two
              developers with a shared love for building things decided to
              turn collaboration into something bigger. What began with
              personal projects soon grew into a studio.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.14} className="relative">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl">
            <Image
              src="/images/illustrations/about-guwahati-riverside.png"
              alt="The Brahmaputra riverside in Guwahati"
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover"
            />
          </div>

          <span className="bg-canvas border-border absolute -bottom-5 left-5 flex flex-col gap-0.5 rounded-2xl border px-4 py-3 text-left shadow-sm">
            <span className="text-ink text-sm font-semibold">Guwahati</span>
            <span className="text-body text-xs">Our base</span>
          </span>

          <span className="font-handwriting text-sky-ink/80 absolute -top-8 -right-2 hidden rotate-3 text-lg leading-tight lg:block">
            Same city,
            <br />
            bigger ideas.
          </span>
        </Reveal>
      </Container>
    </section>
  );
}
