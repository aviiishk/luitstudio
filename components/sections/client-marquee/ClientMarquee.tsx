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
            Clients we&apos;ve worked with
          </h2>
          <span aria-hidden="true" className="bg-border h-px flex-1" />
        </div>

        <ul className="grid grid-cols-2 items-center justify-items-center gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-8 md:grid-cols-4 xl:grid-cols-5">
          {clientLogos.map((logo) => (
            <ClientLogo key={logo.id} logo={logo} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
