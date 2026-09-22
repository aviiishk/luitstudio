import { DesignSystemGraphic } from "@/components/sections/services/ServiceIllustrations";
import { services } from "@/components/sections/services/service-data";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/ui/container";

const framework = [
  {
    step: "Wireframe",
    detail: "Map the user path before the polish arrives.",
  },
  {
    step: "Component",
    detail: "Turn repeated patterns into reusable interface parts.",
  },
  {
    step: "Design system",
    detail: "Define type, color, spacing, states and rules.",
  },
  {
    step: "Finished interface",
    detail: "Bring the product into a clear, usable shape.",
  },
];

export function DesignShowcase() {
  const service = services.find((item) => item.id === "ui-ux-design");
  if (!service) return null;

  return (
    <section
      id="design"
      aria-labelledby="design-heading"
      className="scroll-mt-24 py-12 md:py-14 xl:py-16"
    >
      <Container className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-12">
        <div className="flex flex-col gap-6">
          <Reveal className="max-w-2xl">
            <p className="text-body/65 text-sm font-semibold">UI/UX Design</p>
            <h2
              id="design-heading"
              className="text-ink mt-3 text-[clamp(2.35rem,5.5vw,3.85rem)] leading-[1.02] tracking-[-0.035em] text-balance"
            >
              Good interfaces{" "}
              <em className="font-display leading-[1.12] font-normal">
                feel obvious.
              </em>
            </h2>
            <p className="text-body mt-5 text-base leading-7 sm:text-lg">
              {service.description} We make the path clear before the interface
              asks for attention.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid gap-3 sm:grid-cols-2">
              {framework.map((item) => (
                <div
                  key={item.step}
                  className="border-border rounded-lg border bg-white px-4 py-3"
                >
                  <p className="text-ink text-base font-semibold">
                    {item.step}
                  </p>
                  <p className="text-body mt-1.5 text-sm leading-6">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <DesignSystemGraphic accent={service.accentColor} />
        </Reveal>
      </Container>
    </section>
  );
}
