import { ArrowUpRight } from "lucide-react";

import { AutomationWorkflowGraphic } from "@/components/sections/services/ServiceIllustrations";
import { services } from "@/components/sections/services/service-data";
import { Reveal } from "@/components/shared/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ROUTES } from "@/constants/routes";

export function AutomationShowcase() {
  const service = services.find((item) => item.id === "ai-automation");
  if (!service) return null;

  return (
    <section
      id="automation"
      aria-labelledby="automation-heading"
      className="bg-ink relative scroll-mt-24 overflow-hidden py-12 text-white md:py-14 xl:py-16"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(112,181,255,0.2),transparent_32%),radial-gradient(circle_at_15%_70%,rgba(186,129,238,0.18),transparent_34%)]"
      />
      <Container className="relative grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-12">
        <div className="flex flex-col gap-6">
          <Reveal className="max-w-xl">
            <p className="text-sm font-semibold text-white/55">AI Automation</p>
            <h2
              id="automation-heading"
              className="mt-3 text-[clamp(2.35rem,5vw,4rem)] leading-[1.02] tracking-[-0.035em] text-balance text-white"
            >
              Make repetitive work{" "}
              <em className="font-display leading-[1.12] font-normal">
                disappear.
              </em>
            </h2>
            <p className="mt-4 text-base leading-7 text-white/68 sm:text-lg">
              {service.description} The system reads, decides, updates and
              responds while your team stays focused.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ButtonLink
              href={ROUTES.contact}
              variant="outlineLight"
              icon={ArrowUpRight}
            >
              Explore AI automation
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <AutomationWorkflowGraphic />
        </Reveal>
      </Container>
    </section>
  );
}
