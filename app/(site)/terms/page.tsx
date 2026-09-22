import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { contactDetails } from "@/config/contact";
import { siteConfig } from "@/config/site";
import { studioLocationLabel } from "@/config/studio";
import { ROUTES } from "@/constants/routes";

// Standard boilerplate. This has not been reviewed by a lawyer — get that
// review before relying on it, especially given the Indian
// consumer-protection context.

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions governing the use of ${siteConfig.name}'s services.`,
  alternates: { canonical: "/terms" },
};

const EFFECTIVE_DATE = "September 14, 2026";

const SECTIONS = [
  {
    title: "1. Agreement to terms",
    body: `By engaging ${siteConfig.name} ("we", "us", "our") for any service — through our website, email, or any other channel — you ("the Client") agree to these Terms & Conditions. If you do not agree, please do not proceed with an engagement.

These terms are the entire agreement between ${siteConfig.name} and the Client unless a separate written contract has been signed, in which case that contract takes precedence.`,
  },
  {
    title: "2. Our services",
    body: `${siteConfig.name} provides web development, AI automation, UI/UX design, digital marketing, social media handling, video editing, and motion graphics, among related services.

The exact scope for each project is defined in a project proposal or statement of work agreed by both parties before work begins.`,
  },
  {
    title: "3. Project proposals & acceptance",
    body: `Before starting a project, we provide a written proposal outlining scope, timeline, pricing, and deliverables.

A project is accepted once the Client confirms in writing (email is sufficient) or makes an initial payment. Changes to scope after acceptance may mean revised timelines and additional charges.`,
  },
  {
    title: "4. Payment terms",
    body: `**Standard structure:** an advance payment before work begins, with the remainder due on completion, unless otherwise agreed in the proposal for retainer-based work.

**Invoicing:** invoices are issued in INR or USD as agreed, due within 7 days.

**Late payments:** we may pause work on projects overdue by more than 14 days and may charge a late fee on outstanding balances.

**Refunds:** advance payments are non-refundable once work has commenced. If a project is cancelled before work begins, the advance is refunded within 14 business days.`,
  },
  {
    title: "5. Client responsibilities",
    body: `The Client agrees to provide required content, assets, credentials, and feedback within agreed timelines; designate a point of contact with authority to approve deliverables; and ensure materials provided don't infringe third-party rights.

Delays caused by the Client (late feedback or assets) may push delivery timelines, and we bear no liability for such delays.`,
  },
  {
    title: "6. Intellectual property",
    body: `**Client-owned materials:** content, logos, and assets the Client provides remain the Client's property.

**Work product:** on receipt of full payment, we assign the Client all IP rights in final deliverables built specifically for that project.

**Our tools & frameworks:** proprietary tools, frameworks, or code libraries we developed before or independently of a project remain our property. The Client gets a licence to use them in the deliverable, not ownership of the underlying code.

**Portfolio rights:** unless the Client requests confidentiality in writing, we may display completed work in our portfolio and marketing materials.`,
  },
  {
    title: "7. Confidentiality",
    body: `Both parties agree to keep sensitive business information shared during the engagement confidential, for 2 years after the project ends. This doesn't cover information that's public, independently developed, or required to be disclosed by law.`,
  },
  {
    title: "8. Revisions & change requests",
    body: `Each proposal specifies included revision rounds. Additional revisions are billed at our standard rate, communicated before the work is undertaken. Major changes to scope, design direction, or technology require a revised proposal and additional fees.`,
  },
  {
    title: "9. Third-party services",
    body: `Some projects involve third-party platforms (hosting, CMS, payment gateways, analytics). The Client is responsible for any licences or subscriptions these require and for complying with their terms. We're not liable for disruptions or policy changes made by third-party providers.`,
  },
  {
    title: "10. Warranties & disclaimers",
    body: `We warrant that work is performed with reasonable skill and care, and that deliverables substantially conform to agreed specifications.

We don't warrant that a website or application will be free of all bugs after handover, or that any marketing or SEO strategy will produce specific rankings, traffic, or revenue — results depend on factors outside our control. Support beyond the agreed warranty period is billed separately.`,
  },
  {
    title: "11. Limitation of liability",
    body: `To the extent permitted by law, our total liability for any claim arising from these terms or a project is capped at the fees paid by the Client for that project. We're not liable for loss of profits, revenue, business, or data, or for indirect or consequential damages. Nothing here limits liability for fraud or for death or injury caused by negligence.`,
  },
  {
    title: "12. Termination",
    body: `**By the Client:** the Client may terminate a project on written notice. Work completed up to that point is invoiced and payable; any advance already paid is non-refundable once work has commenced.

**By us:** we may terminate an engagement on 14 days' written notice for material breach of these terms, payment overdue by more than 30 days, or a project becoming incompatible with our studio's values. On termination, we provide all completed work on receipt of outstanding payment.`,
  },
  {
    title: "13. Governing law & disputes",
    body: `These terms are governed by the laws of India. Disputes are first attempted to be resolved through good-faith negotiation; if unresolved within 30 days, they go to arbitration under the Arbitration and Conciliation Act, 1996, with proceedings in ${studioLocationLabel}.`,
  },
  {
    title: "14. Amendments",
    body: `We may update these terms at any time; material changes are communicated to active clients. Continued engagement after an update means acceptance of the revised terms. Projects already in progress are governed by the terms in effect when they began.`,
  },
  {
    title: "15. Contact",
    body: `Questions about these terms:

**${siteConfig.name}**
${studioLocationLabel}
Email: ${contactDetails.email}`,
  },
] as const;

export default function TermsPage() {
  return (
    <main id="main-content">
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 xl:pt-48 xl:pb-24">
        <Container className="max-w-3xl">
          <p className="text-body text-xs font-semibold tracking-[0.28em] uppercase">
            Legal
          </p>
          <h1 className="text-ink mt-4 text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.035em]">
            Terms &amp; Conditions
          </h1>
          <p className="text-body mt-4 text-sm">
            Effective date: {EFFECTIVE_DATE}
          </p>

          <p className="text-body border-border mt-10 border-b pb-10 leading-7">
            These Terms &amp; Conditions govern all engagements between{" "}
            {siteConfig.name} and its clients. Please read them before
            starting a project. By working with us, you agree to these
            terms.
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
              href="/privacy"
              className="text-brand text-sm underline underline-offset-4"
            >
              Read our Privacy Policy →
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
