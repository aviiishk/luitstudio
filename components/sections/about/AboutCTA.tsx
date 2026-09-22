import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ROUTES } from "@/constants/routes";

export function AboutCTA() {
  return (
    <section aria-labelledby="about-cta-heading" className="py-16 md:py-20 xl:py-24">
      <Container>
        <Reveal delay={0.04}>
          <div className="from-brand rounded-3xl bg-linear-to-br to-[#2d1a9e] px-8 py-12 sm:px-12 sm:py-14">
            <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-3 text-left">
                <span className="text-xs font-semibold tracking-widest text-white/60 uppercase">
                  Let&apos;s build together
                </span>
                <h2
                  id="about-cta-heading"
                  className="text-[clamp(2rem,4.5vw,2.75rem)] leading-[1.1] tracking-[-0.03em] text-balance text-white"
                >
                  Good ideas deserve
                  <br />
                  <em className="font-display font-normal">
                    good company.
                  </em>
                </h2>
              </div>

              <div className="flex flex-col items-start gap-4">
                <p className="max-w-xs text-sm text-white/70">
                  Tell us what you&apos;re building. We&apos;d love to be
                  part of it.
                </p>
                <ButtonLink
                  href={ROUTES.contact}
                  variant="light"
                  icon={ArrowUpRight}
                  className="pr-2"
                >
                  Start a Project
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
