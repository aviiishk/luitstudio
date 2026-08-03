import { ClientLogo } from "@/components/sections/client-marquee/ClientLogo";
import { clientLogos } from "@/components/sections/client-marquee/logo-data";
import { Container } from "@/components/ui/container";

export function ClientMarquee() {
  return (
    <section
      aria-labelledby="client-marquee-heading"
      className="overflow-hidden py-16 md:py-20 xl:py-24"
    >
      <Container>
        <div className="mx-auto mb-10 flex max-w-2xl items-center gap-4 sm:gap-6">
          <span aria-hidden="true" className="bg-border h-px flex-1" />
          <h2
            id="client-marquee-heading"
            className="text-body max-w-[18rem] text-center text-sm leading-5 font-normal sm:max-w-none sm:text-base"
          >
            Loved by 1000+ big and small brands around the world
          </h2>
          <span aria-hidden="true" className="bg-border h-px flex-1" />
        </div>
      </Container>

      <div
        role="region"
        className="client-marquee-viewport focus-visible:outline-offset-[-2px]"
        tabIndex={0}
        aria-label="Client logo marquee. Focus or hover to pause the animation."
      >
        <div className="client-marquee-track">
          <ul
            className="client-marquee-group client-marquee-primary"
            aria-label="Featured clients"
          >
            {clientLogos.map((logo) => (
              <ClientLogo key={logo.id} logo={logo} />
            ))}
          </ul>
          <ul
            className="client-marquee-group client-marquee-copy"
            aria-hidden="true"
          >
            {clientLogos.map((logo) => (
              <ClientLogo key={`duplicate-${logo.id}`} logo={logo} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
