import { ServiceGrid } from "@/components/sections/services/ServiceGrid";
import { ServicesCTA } from "@/components/sections/services/ServicesCTA";
import { AnimatedHeadline } from "@/components/shared/AnimatedHeadline";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/ui/container";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-24 py-16 md:py-20 xl:py-24"
    >
      <Container className="flex flex-col gap-12 md:gap-16">
        <AnimatedHeadline
          as="h2"
          id="services-heading"
          text="One team for"
          italicText="everything you need"
          delay={0.05}
          animateOnView
          className="text-ink mx-auto max-w-lg text-center text-[clamp(2.25rem,5vw,3rem)] leading-[1.08] tracking-[-0.035em] text-balance"
          italicClassName="font-display font-normal"
        />

        <div className="flex flex-col gap-4">
          <ServiceGrid />
          <Reveal delay={0.12}>
            <ServicesCTA />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
