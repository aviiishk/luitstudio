import { PricingCard } from "@/components/sections/pricing/PricingCard";
import { AnimatedHeadline } from "@/components/shared/AnimatedHeadline";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/ui/container";
import { pricingPlans } from "@/data/pricing";

export function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="scroll-mt-24 py-16 md:py-20 xl:py-24"
    >
      <Container className="flex flex-col gap-12 md:gap-16">
        <AnimatedHeadline
          as="h2"
          id="pricing-heading"
          text="Creative support designed to"
          italicText="scale with you"
          delay={0.05}
          animateOnView
          className="text-ink mx-auto max-w-2xl text-center text-[clamp(2.25rem,5vw,3rem)] leading-[1.08] tracking-[-0.035em] text-balance"
          italicClassName="font-display font-normal"
        />

        <div className="grid gap-6 xl:grid-cols-2">
          {pricingPlans.map((plan, index) => (
            <Reveal
              key={plan.id}
              delay={0.08 + index * 0.08}
              className="h-full"
            >
              <PricingCard plan={plan} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
