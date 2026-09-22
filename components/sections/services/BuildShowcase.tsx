import { ArrowRight } from "lucide-react";

import { BuildTechnicalDiagram } from "@/components/sections/services/ServiceIllustrations";
import { services } from "@/components/sections/services/service-data";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/ui/container";

const buildLabels = ["Frontend", "Backend", "API", "Database", "Deployment"];

const whatWeBuild = [
  "Marketing websites",
  "Business platforms",
  "SaaS products",
  "Mobile applications",
  "Dashboards",
  "Custom web applications",
];

export function BuildShowcase() {
  const service = services.find((item) => item.id === "web-development");
  if (!service) return null;

  return (
    <section
      id="build"
      aria-labelledby="build-heading"
      className="scroll-mt-24 py-12 md:py-14 xl:py-16"
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--color-yellow) 8%, var(--color-canvas))",
      }}
    >
      <Container className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12">
        <Reveal className="lg:order-2">
          <BuildTechnicalDiagram accent={service.accentColor} />
        </Reveal>

        <div className="flex flex-col gap-6 lg:order-1">
          <Reveal className="max-w-xl">
            <p className="text-body/65 text-sm font-semibold">
              Web and App Development
            </p>
            <h2
              id="build-heading"
              className="font-display text-ink mt-3 text-[clamp(2.7rem,6vw,4.6rem)] leading-[0.98] italic"
            >
              Build
            </h2>
            <p className="text-body mt-5 text-base leading-7 sm:text-lg">
              Digital products that are made to work, made to launch and made to
              keep improving after the first release.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex flex-wrap gap-2">
              {buildLabels.map((label) => (
                <span
                  key={label}
                  className="border-border text-ink rounded-full border bg-white px-3 py-1.5 text-xs font-medium"
                >
                  {label}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="grid gap-3 sm:grid-cols-2">
              {whatWeBuild.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 rounded-lg bg-white/70 px-3 py-2.5"
                >
                  <ArrowRight
                    aria-hidden="true"
                    size={15}
                    style={{ color: service.accentColor }}
                  />
                  <span className="text-body text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-body max-w-xl text-sm leading-6">
              {service.description} We shape the product architecture,
              interface, backend, data model and deployment path as one
              connected system.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
