"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const INK = "#111110";
const MUTED = "#6B6B68";
const BG = "#eeeeee";

const FAQS = [
  {
    q: "What does Luit Studio do?",
    a: "We're a full-stack digital studio offering web development, app development, UI/UX design, SEO, performance marketing, and branding. We handle everything from the first pixel to launch and beyond.",
  },
  {
    q: "Who will work on my project?",
    a: "You work directly with our senior team â€” no juniors, no outsourcing, no hand-offs to vendors you've never met. Every project is managed by an experienced lead with full accountability.",
  },
  {
    q: "How do we work together?",
    a: "We start with a discovery call to understand your goals, budget, and timeline. Then we create a detailed proposal, kick off with design sprints, and follow agile cycles with weekly progress updates.",
  },
  {
    q: "Do you offer full-stack development?",
    a: "Yes â€” we handle everything from UX design to frontend, backend, databases, deployment, and ongoing support. One team, one point of contact, one coherent product.",
  },
  {
    q: "What if my priorities change mid-project?",
    a: "We stay flexible. Priorities shift in every real project. We'll reassess scope together, update the roadmap, and keep things moving without starting from scratch.",
  },
  {
    q: "Can you work with our existing team?",
    a: "Absolutely. We integrate seamlessly with your in-house team â€” whether you need us for a specific layer (design, dev, SEO) or want us to run the whole project independently.",
  },
  {
    q: "Who owns the work after delivery?",
    a: "You do. Upon full payment, all intellectual property, source code, designs, and assets belong entirely to you. No licensing, no lock-in.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI, bank transfer (NEFT/RTGS), and international wire transfers. Payment terms â€” including milestone-based schedules â€” are agreed during the onboarding call.",
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  function toggleItem(index: number) {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <section className="faq-section" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-28">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center font-heading text-[30px] font-black tracking-tight sm:mb-14 sm:text-[34px]"
          style={{ color: INK }}
        >
          FAQs
        </motion.h2>

        <div className="mx-auto flex max-w-[676px] flex-col gap-4">
          {FAQS.map((faq, i) => {
            const isOpen = openItems.has(i);

            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.38, delay: i * 0.035, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-[28px] bg-white shadow-[0_1px_0_rgba(17,17,16,0.02)]"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => toggleItem(i)}
                  className="group flex w-full items-center justify-between gap-5 px-5 py-4 text-left sm:px-6"
                  style={{ color: INK }}
                >
                  <span className="font-heading text-[18px] font-black leading-snug tracking-[-0.02em] sm:text-[20px]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={22}
                    strokeWidth={2.7}
                    className={`shrink-0 transition-transform duration-300 ease-out ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p
                        className="px-5 pb-5 pt-0 font-body text-[14px] leading-[1.75] sm:px-6 sm:pb-6 sm:text-[15px]"
                        style={{ color: MUTED }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
