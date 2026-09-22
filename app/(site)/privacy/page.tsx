import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { contactDetails } from "@/config/contact";
import { siteConfig } from "@/config/site";
import { studioLocationLabel } from "@/config/studio";
import { ROUTES } from "@/constants/routes";

// Standard boilerplate reflecting how this site actually collects data
// (the contact form, Cal.com bookings, basic analytics). This has not been
// reviewed by a lawyer — get that review before relying on it, especially
// given the Indian consumer-protection context.

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your personal information.`,
  alternates: { canonical: "/privacy" },
};

const EFFECTIVE_DATE = "September 14, 2026";

const SECTIONS = [
  {
    title: "1. Who we are",
    body: `${siteConfig.name} ("we", "us", "our") is a design and build studio based in ${studioLocationLabel}. We provide web development, AI automation, UI/UX design, digital marketing, social media handling, video editing, and motion graphics services.

Contact: ${contactDetails.email}`,
  },
  {
    title: "2. Information we collect",
    body: `We collect information in the following ways:

**Information you provide directly**
— Name and email address when you submit our contact form or book a call
— Project details, budget range, and message content you share with us

**Information collected automatically**
— Basic analytics data such as pages visited and referral source
— Cookies necessary for the website to function

**Information from third-party tools**
— Cal.com (scheduling): when you book a call, Cal.com processes your name, email, and selected time slot under its own privacy policy
— We do not sell, rent, or trade your personal data to any third party`,
  },
  {
    title: "3. How we use your information",
    body: `We use the information we collect to:

— Respond to enquiries and schedule calls
— Deliver the services you've engaged us for
— Send project updates, invoices, and related communications
— Improve our website and services
— Comply with legal obligations

We do not send unsolicited marketing emails. Any communication from us relates directly to a service you have enquired about or engaged us for.`,
  },
  {
    title: "4. Cookies",
    body: `Our website uses a minimal set of cookies:

— **Essential cookies**: required for the website to function (e.g. session handling)
— **Analytics cookies**: used to understand how visitors use the site, in aggregate

You can disable non-essential cookies in your browser settings without affecting your ability to use the site.`,
  },
  {
    title: "5. Third-party services",
    body: `Our website and workflow integrate the following third-party services, each governed by its own privacy policy:

— **Cal.com** — used for scheduling calls
— **Supabase** — used for data storage (contact form submissions, blog content)
— Our hosting and infrastructure providers, which may process server-side request logs

We choose partners who apply reasonable data protection standards.`,
  },
  {
    title: "6. Data retention",
    body: `We retain personal information only as long as necessary for the purpose it was collected:

— Enquiry and contact-form data: retained for 24 months from last contact
— Client project data: retained for the engagement plus 3 years for accounting purposes

You can request deletion of your data at any time by emailing ${contactDetails.email}.`,
  },
  {
    title: "7. Data security",
    body: `We apply reasonable technical and organisational measures to protect your data, including HTTPS encryption and access controls limiting data access to authorised team members. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "8. Your rights",
    body: `Depending on your location, you may have rights to access, correct, delete, object to the processing of, or receive a portable copy of your personal data. To exercise any of these, email ${contactDetails.email}; we aim to respond within 30 days.`,
  },
  {
    title: "9. Children's privacy",
    body: `Our services are not directed to individuals under 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected a minor's information, contact us and we will delete it.`,
  },
  {
    title: "10. Changes to this policy",
    body: `We may update this policy from time to time. Material changes will update the effective date above. Continued use of our website after a change constitutes acceptance of the updated policy.`,
  },
  {
    title: "11. Contact us",
    body: `Questions about this policy or how we handle your data:

**${siteConfig.name}**
${studioLocationLabel}
Email: ${contactDetails.email}`,
  },
] as const;

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 xl:pt-48 xl:pb-24">
        <Container className="max-w-3xl">
          <p className="text-body text-xs font-semibold tracking-[0.28em] uppercase">
            Legal
          </p>
          <h1 className="text-ink mt-4 text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.035em]">
            Privacy Policy
          </h1>
          <p className="text-body mt-4 text-sm">
            Effective date: {EFFECTIVE_DATE}
          </p>

          <p className="text-body border-border mt-10 border-b pb-10 leading-7">
            At {siteConfig.name}, we respect your privacy and aim to protect
            your personal data. This policy explains what information we
            collect, how we use it, and what rights you have over it.
          </p>

          <div className="mt-10 flex flex-col gap-10">
            {SECTIONS.map((section) => (
              <div
                key={section.title}
                className="border-border border-b pb-10 last:border-0 last:pb-0"
              >
                <h2 className="text-ink text-lg font-medium">
                  {section.title}
                </h2>
                <div className="mt-4 flex flex-col gap-3">
                  {section.body.split("\n\n").map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-body text-sm leading-7 whitespace-pre-line"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-border mt-12 flex flex-col items-start justify-between gap-4 border-t pt-8 sm:flex-row sm:items-center">
            <Link
              href="/terms"
              className="text-brand text-sm underline underline-offset-4"
            >
              Read our Terms &amp; Conditions →
            </Link>
            <Link href={ROUTES.home} className="text-body text-sm">
              ← Back to home
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
