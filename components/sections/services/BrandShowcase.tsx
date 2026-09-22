import { BrandIdentityGraphic } from "@/components/sections/services/ServiceIllustrations";
import { services } from "@/components/sections/services/service-data";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/ui/container";

const systemChips = ["Logo", "Type", "Color", "Layout", "Social", "Print"];

export function BrandShowcase() {
  const service = services.find((item) => item.id === "graphic-design");
  if (!service) return null;

  return (
    <section
      id="brand"
      aria-labelledby="brand-heading"
      className="scroll-mt-24 py-12 md:py-14 xl:py-16"
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--color-rose) 7%, var(--color-canvas))",
      }}
    >
      <Container className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12">
        <Reveal className="lg:order-2">
          <BrandIdentityGraphic accent={service.accentColor} />
        </Reveal>

        <div className="flex flex-col gap-6 lg:order-1">
          <Reveal className="max-w-2xl">
            <p className="text-body/65 text-sm font-semibold">Graphic Design</p>
            <h2
              id="brand-heading"
              className="text-ink mt-3 text-[clamp(2.25rem,5vw,3.6rem)] leading-[1.04] tracking-[-0.035em] text-balance"
            >
              Visual systems people{" "}
              <em className="font-display leading-[1.12] font-normal">
                recognize fast.
              </em>
            </h2>
            <p className="text-body mt-5 text-base leading-7 sm:text-lg">
              {service.description} Every touchpoint should feel like the same
              brand, not a new file from a new folder.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex flex-wrap gap-2">
              {systemChips.map((chip) => (
                <span
                  key={chip}
                  className="border-border text-ink rounded-full border bg-white px-3 py-1.5 text-xs font-medium"
                >
                  {chip}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
