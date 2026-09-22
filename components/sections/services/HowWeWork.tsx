import { ProcessJourneyGraphic } from "@/components/sections/services/ServiceIllustrations";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/ui/container";

export function HowWeWork() {
  return (
    <section
      id="how-we-work"
      aria-labelledby="how-we-work-heading"
      className="scroll-mt-24 py-12 md:py-14 xl:py-16"
    >
      <Container className="flex flex-col gap-8 md:gap-10">
        <Reveal className="max-w-2xl">
          <h2
            id="how-we-work-heading"
            className="text-ink text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-[-0.035em] text-balance"
          >
            From &ldquo;we have an idea&rdquo; to{" "}
            <em className="font-display leading-[1.12] font-normal">
              &ldquo;it&apos;s live.&rdquo;
            </em>
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <ProcessJourneyGraphic />
        </Reveal>
      </Container>
    </section>
  );
}
