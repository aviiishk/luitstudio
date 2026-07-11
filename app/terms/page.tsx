import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions — Luit Studio",
  description: "Terms and conditions governing the use of Luit Studio's services.",
};

const INK    = "#111110";
const MUTED  = "#6B6B68";
const LIGHT  = "#A9A9A5";
const BORDER = "#E5E3DE";
const BG     = "#FAFAF7";

const EFFECTIVE_DATE = "July 11, 2026";

const SECTIONS = [
  {
    title: "1. Agreement to Terms",
    body: `By engaging Luit Studio ("we", "us", "our") for any service — whether through our website, email, or any other channel — you ("the Client") agree to be bound by these Terms & Conditions. If you do not agree, please do not proceed with any engagement.

These terms constitute the entire agreement between Luit Studio and the Client unless a separate written contract has been signed, in which case that contract shall take precedence.`,
  },
  {
    title: "2. Our Services",
    body: `Luit Studio provides digital design and development services including, but not limited to:

— Web design and development
— Mobile application development
— SEO strategy and growth consulting

The exact scope of services for each project will be defined in a project proposal or statement of work agreed upon by both parties prior to commencement of work.`,
  },
  {
    title: "3. Project Proposals & Acceptance",
    body: `Before commencing any project, Luit Studio will provide a written proposal outlining:

— Scope of work
— Timeline and milestones
— Pricing and payment schedule
— Deliverables

A project is considered accepted when the Client provides written confirmation (email confirmation is sufficient) or makes an initial payment. Changes to the agreed scope after acceptance may result in revised timelines and additional charges.`,
  },
  {
    title: "4. Payment Terms",
    body: `**Standard payment structure:**
— 50% advance payment required before project commencement
— Remaining 50% due upon project completion, prior to final delivery

**Invoicing:**
Invoices are issued in Indian Rupees (INR) unless otherwise agreed in writing. Payment is due within 7 days of invoice date.

**Late payments:**
Luit Studio reserves the right to pause or suspend work on projects where payment is overdue by more than 14 days. We may charge a late fee of 2% per month on outstanding balances.

**Refunds:**
Advance payments are non-refundable once work has commenced. If a project is cancelled before commencement, a full refund of the advance will be issued within 14 business days.`,
  },
  {
    title: "5. Client Responsibilities",
    body: `To ensure timely delivery, the Client agrees to:

— Provide all required content, assets, credentials, and feedback within agreed timelines
— Designate a primary point of contact with authority to approve deliverables
— Review and provide feedback on deliverables within 5 business days unless otherwise agreed
— Ensure that all materials provided to Luit Studio do not infringe any third-party intellectual property rights

Delays caused by the Client (including late feedback or asset delivery) may result in revised delivery timelines and Luit Studio bears no liability for such delays.`,
  },
  {
    title: "6. Intellectual Property",
    body: `**Client-owned materials:**
All content, logos, and assets provided by the Client remain the property of the Client.

**Work product:**
Upon receipt of full payment, Luit Studio assigns to the Client all intellectual property rights in the final deliverables produced specifically for the Client under the project.

**Luit Studio tools & frameworks:**
Any proprietary tools, frameworks, methodologies, or code libraries developed by Luit Studio prior to or independently of the project remain the exclusive property of Luit Studio. The Client receives a licence to use these in the final deliverable but does not acquire ownership of the underlying code.

**Portfolio rights:**
Unless the Client requests confidentiality in writing, Luit Studio reserves the right to display work completed for the Client in our portfolio, case studies, and marketing materials.`,
  },
  {
    title: "7. Confidentiality",
    body: `Both parties agree to keep confidential any sensitive business information shared during the course of the engagement. This obligation continues for 2 years after the end of the project.

Confidential information does not include:
— Information that is or becomes publicly available through no breach of this agreement
— Information independently developed by either party
— Information required to be disclosed by law or regulation`,
  },
  {
    title: "8. Revisions & Change Requests",
    body: `Each project proposal will specify the number of revision rounds included. Additional revisions beyond the agreed number will be billed at our standard hourly rate, which will be communicated to the Client before the work is undertaken.

Major changes to the project scope — including changes to design direction, technology stack, or core functionality — constitute a new scope of work and will require a revised proposal and additional fees.`,
  },
  {
    title: "9. Third-Party Services",
    body: `Some projects may involve third-party platforms, software, or services (e.g., hosting providers, CMS platforms, payment gateways, analytics tools). The Client is responsible for:

— Obtaining and maintaining any required licences or subscriptions for third-party services
— Complying with the terms of service of any third-party platforms integrated into their project

Luit Studio is not liable for disruptions, pricing changes, or policy changes made by third-party service providers.`,
  },
  {
    title: "10. Warranties & Disclaimers",
    body: `Luit Studio warrants that:
— Work will be performed with reasonable skill and care
— Deliverables will substantially conform to the agreed specifications

Luit Studio does not warrant that:
— The website or application will be free from all bugs or errors after handover
— Any SEO or marketing strategy will produce specific business results, rankings, or revenue (results depend on many factors beyond our control)

Any post-launch support or bug fixes beyond the agreed warranty period will be subject to separate agreement and billing.`,
  },
  {
    title: "11. Limitation of Liability",
    body: `To the maximum extent permitted by applicable law, Luit Studio's total liability to the Client for any claim arising out of or in connection with these terms or any project shall not exceed the total fees paid by the Client for the specific project giving rise to the claim.

Luit Studio shall not be liable for:
— Loss of profits, revenue, or business
— Loss of data or information
— Indirect, incidental, or consequential damages

Nothing in these terms limits liability for fraud, death, or personal injury caused by negligence.`,
  },
  {
    title: "12. Termination",
    body: `**By the Client:**
The Client may terminate a project at any time by providing written notice. Work completed up to the termination date will be invoiced and must be paid. Any advance already paid is non-refundable once work has commenced.

**By Luit Studio:**
Luit Studio may terminate an engagement with 14 days' written notice if:
— The Client materially breaches these terms
— Payment is overdue by more than 30 days
— The project becomes technically or ethically incompatible with our studio's values

Upon termination, Luit Studio will provide all completed work product to the Client upon receipt of all outstanding payments.`,
  },
  {
    title: "13. Governing Law & Disputes",
    body: `These Terms & Conditions are governed by and construed in accordance with the laws of India.

Any dispute arising from these terms or any project engagement shall first be attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to arbitration in accordance with the Arbitration and Conciliation Act, 1996, with proceedings conducted in Guwahati, Assam, India.`,
  },
  {
    title: "14. Amendments",
    body: `Luit Studio reserves the right to update these Terms & Conditions at any time. Material changes will be communicated to active clients. Continued engagement with Luit Studio after any update constitutes acceptance of the revised terms.

For project-specific agreements already in progress, the terms in effect at the time of project commencement shall govern.`,
  },
  {
    title: "15. Contact",
    body: `For any questions about these Terms & Conditions, please contact:

**Luit Studio**
Guwahati, Assam, India
Email: luitstudio.in@gmail.com`,
  },
];

export default function TermsPage() {
  return (
    <main style={{ backgroundColor: BG }} className="min-h-screen">

      {/* Header */}
      <div
        className="border-b px-5 sm:px-8 xl:px-12 pt-28 pb-12"
        style={{ borderColor: BORDER }}
      >
        <div className="max-w-3xl mx-auto">
          <p
            className="font-body text-[11px] uppercase tracking-[0.28em] mb-4"
            style={{ color: LIGHT }}
          >
            Legal
          </p>
          <h1
            className="font-heading font-black tracking-tight leading-[1.05] mb-4"
            style={{ color: INK, fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            Terms & Conditions
          </h1>
          <p className="font-body text-[14px]" style={{ color: LIGHT }}>
            Effective date: {EFFECTIVE_DATE}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 xl:px-0 py-14 sm:py-16">

        <p
          className="font-body text-[15px] leading-[1.8] mb-12 pb-12 border-b"
          style={{ color: MUTED, borderColor: BORDER }}
        >
          These Terms & Conditions govern all engagements between Luit Studio and its clients. Please read them carefully before proceeding with any project or enquiry. By working with us, you agree to these terms in full.
        </p>

        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.title} className="pb-10 border-b last:border-0" style={{ borderColor: BORDER }}>
              <h2
                className="font-heading text-[18px] font-black mb-4"
                style={{ color: INK }}
              >
                {s.title}
              </h2>
              <div className="space-y-3">
                {s.body.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="font-body text-[14.5px] leading-[1.8] whitespace-pre-line"
                    style={{ color: MUTED }}
                    dangerouslySetInnerHTML={{
                      __html: para
                        .replace(/\*\*(.+?)\*\*/g, `<strong style="color:${INK};font-weight:600">$1</strong>`)
                        .replace(/^— /gm, "· "),
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer nav */}
        <div
          className="mt-14 pt-8 border-t flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
          style={{ borderColor: BORDER }}
        >
          <Link
            href="/privacy"
            className="font-body text-[13px] underline underline-offset-4 transition-opacity hover:opacity-55"
            style={{ color: MUTED }}
          >
            Read our Privacy Policy →
          </Link>
          <Link
            href="/"
            className="font-body text-[13px] transition-opacity hover:opacity-55"
            style={{ color: LIGHT }}
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
