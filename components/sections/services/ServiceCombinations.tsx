import { services } from "@/components/sections/services/service-data";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/ui/container";

const combinations = [
  {
    title: "Launch a new product",
    serviceIds: ["web-development", "ui-ux-design", "graphic-design"],
  },
  {
    title: "Grow an existing business",
    serviceIds: [
      "digital-marketing",
      "social-media-handling",
      "graphic-design",
    ],
  },
  {
    title: "Automate operations",
    serviceIds: ["ai-automation", "web-development"],
  },
  {
    title: "Build a new brand",
    serviceIds: ["graphic-design", "ui-ux-design", "web-development"],
  },
] as const;

export function ServiceCombinations() {
  return (
    <section
      aria-labelledby="combinations-heading"
      className="py-12 md:py-14 xl:py-16"
    >
      <Container className="flex flex-col gap-8 md:gap-10">
        <Reveal className="max-w-2xl">
          <h2
            id="combinations-heading"
            className="text-ink text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-[-0.035em] text-balance"
          >
            Most projects need{" "}
            <em className="font-display leading-[1.12] font-normal">
              more than one discipline.
            </em>
          </h2>
          <p className="text-body mt-4 max-w-xl text-base leading-7">
            The services are built to work together. These are a few shapes that
            come up often.
          </p>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {combinations.map((combo, index) => {
            const items = combo.serviceIds
              .map((id) => services.find((service) => service.id === id))
              .filter((service): service is (typeof services)[number] =>
                Boolean(service),
              );

            return (
              <Reveal
                key={combo.title}
                delay={0.05 + index * 0.06}
                className="bg-surface/65 rounded-lg p-4 sm:p-5"
              >
                <h3 className="text-ink text-lg font-semibold">
                  {combo.title}
                </h3>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {items.map((service) => (
                    <span
                      key={service.id}
                      className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium"
                      style={{ color: service.accentColor }}
                    >
                      <service.icon aria-hidden="true" size={13} />
                      {service.title}
                    </span>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
