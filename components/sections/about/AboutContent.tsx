import { AboutImage } from "@/components/sections/about/AboutImage";
import { AboutStudio } from "@/components/sections/about/AboutStudio";
import { AnimatedHeadline } from "@/components/shared/AnimatedHeadline";
import { Reveal } from "@/components/shared/reveal";

export function AboutContent() {
  return (
    <div className="flex flex-col gap-10 md:gap-12">
      <AnimatedHeadline
        as="h2"
        id="about-heading"
        text="A design & build studio from"
        italicText="Guwahati, Assam"
        delay={0.05}
        animateOnView
        className="text-ink mx-auto max-w-3xl text-center text-[clamp(2.25rem,5vw,3rem)] leading-[1.08] tracking-[-0.035em] text-balance"
        italicClassName="font-display font-normal"
      />
      <Reveal delay={0.1}>
        <AboutStudio showFounders={false} />
      </Reveal>
      <Reveal delay={0.14}>
        <AboutImage />
      </Reveal>
    </div>
  );
}
