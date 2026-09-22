import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactInfo } from "@/components/sections/contact/ContactInfo";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/ui/container";
import { contactContent } from "@/data/contact";
import type { ContactContent } from "@/types/contact";

interface ContactProps {
  content?: ContactContent;
}

export function Contact({ content = contactContent }: ContactProps) {
  return (
    <section
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-[linear-gradient(110deg,#cdeffb_0%,#fff_52%,#fdeecb_100%)] pt-36 pb-16 md:pt-44 md:pb-20 xl:pt-48 xl:pb-24"
    >
      <Container className="relative z-10 flex flex-col gap-12 lg:gap-16">
        <Reveal delay={0.05} className="flex flex-col items-center gap-4">
          <h1
            id="contact-heading"
            className="mx-auto max-w-3xl text-center text-[clamp(2.75rem,7vw,5rem)] leading-[0.98] tracking-[-0.035em]"
          >
            {content.title}{" "}
            <em className="font-display">{content.emphasizedTitle}</em>
          </h1>
          <p className="text-body mx-auto max-w-md text-center text-base sm:text-lg">
            We read every message and reply personally — no forms into the
            void.
          </p>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.42fr)]">
          <Reveal delay={0.12} className="h-full">
            <div className="shadow-soft h-full rounded-2xl bg-white p-6 sm:p-8 lg:p-10">
              <ContactForm
                fields={content.fields}
                submitLabel={content.submitLabel}
              />
            </div>
          </Reveal>
          <Reveal delay={0.2} className="h-full">
            <ContactInfo details={content.details} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
