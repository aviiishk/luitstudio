import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Luit Studio",
  description: "How Luit Studio collects, uses, and protects your personal information.",
};

const INK    = "#111110";
const MUTED  = "#6B6B68";
const LIGHT  = "#A9A9A5";
const BORDER = "#E5E3DE";
const BG     = "#FAFAF7";

const EFFECTIVE_DATE = "July 11, 2026";

const SECTIONS = [
  {
    title: "1. Who We Are",
    body: `Luit Studio ("we", "us", "our") is a digital design and development studio registered and operating in Guwahati, Assam, India. We provide web development, mobile app development, and SEO & growth services to businesses and individuals.

Contact: luitstudio.in@gmail.com`,
  },
  {
    title: "2. Information We Collect",
    body: `We collect information in the following ways:

**Information you provide directly**
— Name and email address when you book a call via our scheduling tool (Cal.com)
— Project details, budget range, and timeline you share in booking forms or emails
— Any content you send us via email or contact forms

**Information collected automatically**
— Basic analytics data such as pages visited, referral source, and browser type (collected through privacy-respecting analytics tools)
— Cookies necessary for the functioning of our website

**Information from third-party tools**
— Cal.com (scheduling): When you book a call, Cal.com processes your name, email, and selected time slot under their own privacy policy
— We do not sell, rent, or trade your personal data to any third party`,
  },
  {
    title: "3. How We Use Your Information",
    body: `We use the information we collect to:

— Respond to your enquiries and schedule discovery calls
— Provide and deliver our services to you
— Send project updates, invoices, and relevant communications
— Improve our website and service quality
— Comply with legal obligations

We will never send unsolicited marketing emails. Any communication from us will be directly related to a service you have enquired about or engaged us for.`,
  },
  {
    title: "4. Cookies",
    body: `Our website uses a minimal set of cookies:

— **Essential cookies**: Required for the website to function correctly (e.g., session management)
— **Analytics cookies**: Used to understand how visitors interact with our site (aggregated and anonymised data only)

You may disable non-essential cookies through your browser settings. Doing so will not affect your ability to use our website.`,
  },
  {
    title: "5. Third-Party Services",
    body: `Our website integrates the following third-party services, each governed by their own privacy policies:

— **Cal.com** – Used for scheduling intro calls. By booking a call you agree to Cal.com's privacy policy
— **Vercel** – Our hosting provider. Vercel may process server-side request logs
— **Supabase** – Used for internal data storage where applicable

We carefully choose partners who respect data privacy and operate under appropriate data protection standards.`,
  },
  {
    title: "6. Data Retention",
    body: `We retain your personal information only for as long as necessary to fulfil the purpose for which it was collected:

— Enquiry and contact information: Retained for 24 months from last contact
— Client project data: Retained for the duration of the engagement plus 3 years for legal and accounting purposes
— Analytics data: Aggregated and anonymised; not linked to individuals

You may request deletion of your data at any time by emailing us at luitstudio.in@gmail.com.`,
  },
  {
    title: "7. Data Security",
    body: `We implement reasonable technical and organisational measures to protect your personal data against unauthorised access, loss, or misuse. These include:

— Encrypted connections (HTTPS) across our website
— Access controls limiting data access to authorised team members only
— Using reputable third-party platforms with their own security standards

While we take data protection seriously, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.`,
  },
  {
    title: "8. Your Rights",
    body: `Depending on your location, you may have the following rights regarding your personal data:

— **Right to access**: Request a copy of the personal data we hold about you
— **Right to rectification**: Ask us to correct inaccurate or incomplete data
— **Right to erasure**: Request deletion of your personal data
— **Right to object**: Object to processing of your data for specific purposes
— **Right to data portability**: Receive your data in a structured, machine-readable format

To exercise any of these rights, please contact us at luitstudio.in@gmail.com. We will respond within 30 days.`,
  },
  {
    title: "9. Children's Privacy",
    body: `Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a minor, please contact us immediately and we will delete it.`,
  },
  {
    title: "10. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. When we make material changes, we will update the "Effective Date" at the top of this page. We encourage you to review this policy periodically.

Your continued use of our website after any changes constitutes acceptance of the updated policy.`,
  },
  {
    title: "11. Contact Us",
    body: `If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please contact us:

**Luit Studio**
Guwahati, Assam, India
Email: luitstudio.in@gmail.com`,
  },
];

export default function PrivacyPage() {
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
            Privacy Policy
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
          At Luit Studio, we respect your privacy and are committed to protecting your personal data. This policy explains what information we collect, how we use it, and what rights you have in relation to it. Please read it carefully.
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
            href="/terms"
            className="font-body text-[13px] underline underline-offset-4 transition-opacity hover:opacity-55"
            style={{ color: MUTED }}
          >
            Read our Terms & Conditions →
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
