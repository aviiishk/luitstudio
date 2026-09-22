import { ArrowUpRight } from "lucide-react";

import { MagneticWrap } from "@/components/sections/services/MagneticWrap";
import { AnimatedHeadline } from "@/components/shared/AnimatedHeadline";
import { BookCallButton } from "@/components/shared/BookCallButton";
import { Reveal } from "@/components/shared/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ROUTES } from "@/constants/routes";

export function ServicesFinalCTA() {
  return (
    <section
      aria-labelledby="services-final-cta-heading"
      className="py-14 md:py-16 xl:py-20"
    >
      <Container className="flex flex-col items-center gap-7 text-center">
        <AnimatedHeadline
          as="h2"
          id="services-final-cta-heading"
          text="Have something in mind?"
          secondLineText="Let's"
          italicText="build it."
          delay={0.05}
          animateOnView
          className="text-ink mx-auto max-w-2xl text-[clamp(2.25rem,5.5vw,3.85rem)] leading-[1.05] tracking-[-0.035em] text-balance"
          italicClassName="font-display pb-1 font-normal leading-[1.12]"
        />

        <Reveal delay={0.14}>
          <p className="text-body max-w-md text-base leading-7 sm:text-lg">
            Tell us what you&apos;re trying to make, fix or grow. We&apos;ll
            figure out the next step together.
          </p>
        </Reveal>

        <Reveal
          delay={0.2}
          className="flex flex-col items-center gap-4 sm:flex-row"
        >
          <MagneticWrap>
            <ButtonLink
              href={ROUTES.contact}
              variant="brand"
              icon={ArrowUpRight}
              className="pr-2"
            >
              Start a Project
            </ButtonLink>
          </MagneticWrap>
          <BookCallButton variant="outline" icon={null}>
            Ask a question
          </BookCallButton>
        </Reveal>
      </Container>
    </section>
  );
}
