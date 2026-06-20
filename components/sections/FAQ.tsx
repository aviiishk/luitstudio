const INK    = "#111110";
const MUTED  = "#6B6B68";
const LIGHT  = "#A9A9A5";
const BORDER = "#E5E3DE";
const BG     = "#F2F0EB";

const FAQS = [
  {
    q: "What does Luit Studio do?",
    a: "We're a full-stack digital studio offering web development, app development, UI/UX design, SEO, performance marketing, and branding. We handle everything from the first pixel to launch and beyond.",
  },
  {
    q: "Who will work on my project?",
    a: "You work directly with our senior team — no juniors, no outsourcing, no hand-offs to vendors you've never met. Every project is managed by an experienced lead with full accountability.",
  },
  {
    q: "How do we work together?",
    a: "We start with a discovery call to understand your goals, budget, and timeline. Then we create a detailed proposal, kick off with design sprints, and follow agile cycles with weekly progress updates.",
  },
  {
    q: "Do you offer full-stack development?",
    a: "Yes — we handle everything from UX design to frontend, backend, databases, deployment, and ongoing support. One team, one point of contact, one coherent product.",
  },
  {
    q: "What if my priorities change mid-project?",
    a: "We stay flexible. Priorities shift in every real project. We'll reassess scope together, update the roadmap, and keep things moving without starting from scratch.",
  },
  {
    q: "Can you work with our existing team?",
    a: "Absolutely. We integrate seamlessly with your in-house team — whether you need us for a specific layer (design, dev, SEO) or want us to run the whole project independently.",
  },
  {
    q: "Who owns the work after delivery?",
    a: "You do. Upon full payment, all intellectual property, source code, designs, and assets belong entirely to you. No licensing, no lock-in.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI, bank transfer (NEFT/RTGS), and international wire transfers. Payment terms — including milestone-based schedules — are agreed during the onboarding call.",
  },
];

export default function FAQ() {
  return (
    <section
      className="border-t faq-section"
      style={{ backgroundColor: BG, borderColor: BORDER }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 xl:px-12 pt-16 sm:pt-20 pb-16 sm:pb-20">

        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <div className="mb-3">
            <span
              className="font-body text-[10px] tracking-[0.34em] uppercase tabular-nums"
              style={{ color: LIGHT }}
            >
              [ 005 ]
            </span>
          </div>
          <h2
            className="font-heading font-black tracking-tight leading-[0.86]"
            style={{ color: INK }}
          >
            <span className="block text-[clamp(36px,5.2vw,80px)]">Frequently</span>
            <span
              className="block text-[clamp(36px,5.2vw,80px)] text-transparent select-none"
              style={{ WebkitTextStroke: `1.5px ${INK}` }}
            >
              Asked Questions.
            </span>
          </h2>
        </div>

        {/* Accordion — native <details>/<summary>, zero JS */}
        <div className="max-w-3xl">
          {FAQS.map((faq, i) => (
            <details
              key={i}
              className="faq-item border-t group"
              style={{ borderColor: BORDER }}
            >
              <summary
                className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none select-none"
                style={{ color: INK }}
              >
                <span
                  className="font-heading font-bold text-[15px] sm:text-[16px] leading-snug"
                >
                  {faq.q}
                </span>
                {/* Plus / minus via CSS pseudo-element */}
                <span className="faq-icon shrink-0 w-5 h-5 inline-flex items-center justify-center border rounded-full" style={{ borderColor: BORDER }} />
              </summary>

              <div className="pb-5">
                <p
                  className="font-body text-[14px] sm:text-[15px] leading-[1.75]"
                  style={{ color: MUTED }}
                >
                  {faq.a}
                </p>
              </div>
            </details>
          ))}
          <div className="border-t" style={{ borderColor: BORDER }} />
        </div>

      </div>

      <style>{`
        .faq-icon::before {
          content: "+";
          font-size: 13px;
          font-weight: 600;
          color: ${LIGHT};
          line-height: 1;
        }
        .faq-item[open] .faq-icon {
          background: ${INK};
          border-color: ${INK};
        }
        .faq-item[open] .faq-icon::before {
          content: "−";
          color: #FAFAF7;
        }
        .faq-item summary:hover .faq-icon { opacity: 0.7; }
        summary::-webkit-details-marker { display: none; }
      `}</style>
    </section>
  );
}
