import { AboutImage } from "@/components/sections/about/AboutImage";
import { AnimatedHeadline } from "@/components/shared/AnimatedHeadline";
import { Reveal } from "@/components/shared/reveal";

export function AboutContent() {
  return (
    <div className="flex flex-col gap-5">
      <AnimatedHeadline
        as="h2"
        id="about-heading"
        text="Crafting exceptional, well experienced & technology driven strategies to drive impactful results with"
        delay={0.05}
        animateOnView
        className="text-ink mx-auto max-w-5xl text-center text-[clamp(2.25rem,5vw,3rem)] leading-[1.08] tracking-[-0.035em] text-balance"
      />
      <Reveal delay={0.14}>
        <AboutImage />
      </Reveal>
    </div>
  );
}
