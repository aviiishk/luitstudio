"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle,
  ChevronDown,
  Clock,
  Code2,
  Gift,
  Headphones,
  Layers,
  Medal,
  MessageCircle,
  Palette,
  PenTool,
  Sparkles,
  Target,
  Trophy,
  Users,
  Workflow,
} from "lucide-react";
import Footer from "@/components/layout/Footer";

const SKILLS = [
  "Web Dev", "UI/UX", "React", "Node.js", "Mobile Dev",
  "SEO", "Marketing", "Design", "Content Writing",
];
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Final Year"];
const PERKS = [
  { icon: Workflow, label: "Agency Workflow", desc: "Learn how modern digital teams plan, ship, and review work" },
  { icon: BriefcaseBusiness, label: "Live Projects", desc: "Build with real briefs, practical constraints, and mentor feedback" },
  { icon: Award, label: "Certificate", desc: "Official completion credential for active participants" },
  { icon: Clock, label: "3 Months", desc: "Focused program structure with clear weekly outcomes" },
];
const TRACKS = [
  {
    icon: Code2,
    label: "Web Development",
    desc: "Build responsive landing pages, SaaS interfaces, and deployable full-stack systems.",
    color: "#EC4899",
  },
  {
    icon: Palette,
    label: "UI/UX Design",
    desc: "Learn interface hierarchy, design systems, product thinking, and conversion-focused layouts.",
    color: "#06B6D4",
  },
  {
    icon: BrainCircuit,
    label: "AI Workflows",
    desc: "Use modern AI tools for research, automation, ideation, prototyping, and delivery support.",
    color: "#A855F7",
  },
  {
    icon: PenTool,
    label: "Product Building",
    desc: "From ideation to execution, learn how to build, launch, and iterate on digital products.",
    color: "#F59E0B",
  },
];
const TRUST_ITEMS = [
  { icon: Layers, label: "Project-Based Learning" },
  { icon: Target, label: "Portfolio Focused" },
  { icon: Workflow, label: "Real Workflow Exposure" },
  { icon: MessageCircle, label: "Mentor Feedback" },
  { icon: Users, label: "Community Driven" },
  { icon: Sparkles, label: "Modern Tech Stack" },
];
const TIMELINE = [
  { period: "Week 1-2", title: "Modern UI & frontend foundations" },
  { period: "Week 3-4", title: "Agency workflow & deployment" },
  { period: "Week 5-6", title: "AI workflows & collaboration" },
  { period: "Week 7-8", title: "Portfolio & freelancing" },
  { period: "Final Week", title: "Startup challenge & showcase" },
];
const REWARDS = [
  { icon: Trophy, rank: "Rank 1", prize: "Premium gadget" },
  { icon: Headphones, rank: "Rank 2", prize: "Wireless earbuds" },
  { icon: Gift, rank: "Rank 3", prize: "Productivity essentials" },
  { icon: Medal, rank: "Top 10", prize: "Exclusive coding merchandise & recognition" },
];
const FAQS = [
  {
    q: "Is this beginner friendly?",
    a: "Yes, the program is designed for beginners and intermediate learners looking to gain practical experience with modern digital workflows and real-world projects.",
  },
  {
    q: "Will I receive a certificate?",
    a: "Yes, Participants who complete the program and maintain active participation will receive an official completion certificate from Luit Studios.",
  },
  {
    q: "Is this paid or unpaid?",
    a: "This is a paid industry training & internship program focused on practical learning, collaboration, and real-world workflow exposure.",
  },
  {
    q: "Will there be live sessions?",
    a: "Yes, Weekly live sessions, mentor reviews, and collaborative discussions will be conducted throughout the program.",
  },
  {
    q: "Are there rewards?",
    a: "Yes, Top performers will receive rewards, recognition, and exclusive opportunities based on leaderboard performance and participation.",
  },
  {
    q: "What will we build?",
    a: "Participants will work on SaaS landing pages, ecommerce UI systems, branding projects, workflow simulations, and portfolio-ready assignments.",
  },
  {
    q: "Is placement guaranteed?",
    a: "No guaranteed placements. However, top performers may receive future collaboration opportunities.",
  },
];

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const STEP_LABELS = ["Personal Info", "Academic Details", "Your Story"];

const stepVariants = {
  enter: (d: number) => ({ x: d * 32, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d * -32, opacity: 0 }),
};

function SectionIntro({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: EASE }}
      className="mb-10"
    >
      <p className="font-body text-[11px] tracking-[0.28em] uppercase text-white/25 mb-3">{eyebrow}</p>
      <h2 className="font-heading text-[28px] sm:text-[38px] font-black text-white tracking-tight">{title}</h2>
      {sub && <p className="font-body text-sm sm:text-base text-white/38 leading-relaxed max-w-2xl mt-3">{sub}</p>}
    </motion.div>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative px-5 sm:px-8 xl:px-16 py-20 border-t border-white/[0.06] bg-[#08080f]">
      <div className="max-w-4xl mx-auto">
        <SectionIntro
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          sub="Everything you need to know before applying."
        />

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const active = open === i;
            const answerId = `faq-answer-${i}`;

            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.38, delay: i * 0.035, ease: EASE }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.025] overflow-hidden"
              >
                <button
                  type="button"
                  aria-expanded={active}
                  aria-controls={answerId}
                  onClick={() => setOpen(active ? -1 : i)}
                  className="w-full flex items-center justify-between gap-5 px-5 sm:px-6 py-5 text-left cursor-pointer"
                >
                  <span className="font-body text-sm sm:text-base font-semibold text-white">{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-white/35 shrink-0 transition-transform duration-300 ${active ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      id={answerId}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-6 pb-5 font-body text-sm text-white/42 leading-relaxed">
                        {item.a}
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

function FinalCTASection() {
  const scrollToApplication = () => {
    document.getElementById("application-form")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <section className="relative px-5 sm:px-8 xl:px-16 py-20 sm:py-24 border-t border-white/[0.06] bg-[#0a0a12] overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EC4899]/[0.08] blur-[110px]" />
        <div className="absolute left-[58%] top-[42%] h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06B6D4]/[0.07] blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: EASE }}
        className="relative mx-auto max-w-4xl rounded-3xl border border-white/[0.1] bg-white/[0.035] px-6 py-10 text-center shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:px-10 sm:py-14"
      >
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#EC4899]/60 to-transparent" />
        <div className="absolute inset-x-14 bottom-0 h-px bg-gradient-to-r from-transparent via-[#06B6D4]/45 to-transparent" />

        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.05] px-4 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
          <span className="font-body text-[11px] uppercase tracking-[0.22em] text-white/50">SUMMER INTERNSHIP 2026</span>
        </div>

        <h2 className="mx-auto max-w-2xl font-heading text-[30px] font-black leading-tight tracking-tight text-white sm:text-[44px]">
          Ready to start building real-world digital skills?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-white/42 sm:text-base">
          Join a modern internship experience focused on practical learning, live projects, mentorship, and portfolio-ready execution.
        </p>

        <div className="mt-8 flex flex-col items-center">
          <button
            type="button"
            onClick={scrollToApplication}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#06B6D4] px-7 py-3.5 font-body text-sm font-semibold text-white shadow-[0_18px_42px_rgba(236,72,153,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(6,182,212,0.22)] sm:w-auto"
          >
            Apply Now
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
          <p className="mt-4 font-body text-xs text-white/32">
            Limited seats available • Applications reviewed personally
          </p>
        </div>

        <div className="mx-auto mt-7 grid max-w-3xl grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {["Beginner Friendly", "Remote", "Project Based", "Portfolio Focused"].map(item => (
            <div
              key={item}
              className="flex items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-2 font-body text-xs text-white/48"
            >
              <Check size={13} className="text-[#06B6D4]" />
              {item}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function InternForm() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [form, setForm] = useState({
    full_name: "", email: "", phone: "",
    college: "", course: "", year: "",
    skills: [] as string[], why_join: "", portfolio_url: "",
  });

  const set = (k: string, v: unknown) => setForm(p => ({ ...p, [k]: v }));
  const toggleSkill = (s: string) =>
    set("skills", form.skills.includes(s) ? form.skills.filter(x => x !== s) : [...form.skills, s]);
  const goTo = (n: number) => { setDir(n > step ? 1 : -1); setStep(n); };

  const handleSubmit = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/intern", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) { setStatus("error"); setFeedback(data.error); }
      else setStatus("success");
    } catch { setStatus("error"); setFeedback("Network error. Please try again."); }
  };

  const inp = "w-full min-h-12 bg-white/[0.07] border border-white/[0.16] rounded-xl px-4 py-3.5 text-base sm:text-[15px] leading-relaxed text-white placeholder:text-white/45 font-body outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] focus:border-[#EC4899]/70 focus:ring-2 focus:ring-[#EC4899]/[0.16] focus:bg-white/[0.085] transition-all duration-200";
  const lbl = "block text-sm sm:text-[15px] leading-snug font-body font-semibold text-white/72 mb-2.5 uppercase tracking-[0.14em]";

  if (status === "success") return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="flex flex-col items-center text-center px-6 py-14 sm:px-8 sm:py-16 gap-5"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.1] px-3.5 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200">
        Summer Internship 2026 - Review Pending
      </div>
      <div className="w-16 h-16 rounded-full bg-emerald-400/15 border border-emerald-400/25 flex items-center justify-center">
        <CheckCircle size={28} className="text-emerald-400" />
      </div>
      <div>
        <h3 className="font-heading text-2xl sm:text-3xl font-black text-white mb-2">Application Under Review</h3>
        <p className="text-white/58 font-body text-base max-w-[330px] leading-relaxed mx-auto">
          Our team reviews every application personally. Selected applicants will receive onboarding details via email.
        </p>
      </div>
      <Link href="/"
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/[0.16] px-5 py-2.5 font-body text-sm font-semibold text-white/62 transition-all duration-200 hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]/35">
        Back to home <ArrowRight size={14} />
      </Link>
    </motion.div>
  );

  return (
    <div className="p-5 sm:p-7 lg:p-8">
      <div className="mb-7 sm:mb-8">
        <div className="flex items-center mb-4">
          {[1, 2, 3].map((n, idx) => (
            <div key={n} className="flex items-center flex-1 last:flex-none">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-body text-sm font-bold transition-all duration-300 ${
                step > n
                  ? "bg-gradient-to-br from-[#EC4899] to-[#06B6D4] border-transparent text-white shadow-[0_0_24px_rgba(6,182,212,0.18)]"
                  : step === n
                  ? "bg-gradient-to-br from-[#EC4899] to-[#06B6D4] border-transparent text-white shadow-[0_0_28px_rgba(236,72,153,0.2)]"
                  : "bg-white/[0.035] border-white/[0.16] text-white/48"
              }`}>
                {step > n ? <Check size={14} /> : n}
              </div>
              {idx < 2 && (
                <div className="relative mx-2 h-[2px] flex-1 overflow-hidden rounded-full bg-white/[0.12] sm:mx-2.5">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#EC4899] to-[#06B6D4] rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: step > n ? 1 : 0 }}
                    style={{ transformOrigin: "left" }}
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="font-body text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-white/55">
          {STEP_LABELS[step - 1]} - {step}/3
        </p>
      </div>

      <div className="min-h-[268px] overflow-hidden sm:min-h-[250px]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.26, ease: EASE }}
          >
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className={lbl}>Full Name <span className="text-[#EC4899] normal-case tracking-normal">*</span></label>
                  <input className={inp} placeholder="Priya Sharma" value={form.full_name} onChange={e => set("full_name", e.target.value)} />
                </div>
                <div>
                  <label className={lbl}>Email <span className="text-[#EC4899] normal-case tracking-normal">*</span></label>
                  <input className={inp} type="email" placeholder="you@email.com" value={form.email} onChange={e => set("email", e.target.value)} />
                </div>
                <div>
                  <label className={lbl}>Phone <span className="text-[#EC4899] normal-case tracking-normal">*</span></label>
                  <input className={inp} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => set("phone", e.target.value)} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label className={lbl}>College / University <span className="text-[#EC4899] normal-case tracking-normal">*</span></label>
                  <input className={inp} placeholder="e.g. Gauhati University" value={form.college} onChange={e => set("college", e.target.value)} />
                </div>
                <div>
                  <label className={lbl}>Course / Degree <span className="text-[#EC4899] normal-case tracking-normal">*</span></label>
                  <input className={inp} placeholder="e.g. B.Tech Computer Science" value={form.course} onChange={e => set("course", e.target.value)} />
                </div>
                <div>
                  <label className={lbl}>Year of Study <span className="text-[#EC4899] normal-case tracking-normal">*</span></label>
                  <div className="mt-2 grid grid-cols-2 gap-2 min-[380px]:grid-cols-3 sm:grid-cols-5">
                    {YEARS.map(y => (
                      <button key={y} type="button" onClick={() => set("year", y)}
                        className={`min-h-11 rounded-xl border px-2 py-2.5 font-body text-sm font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]/30 ${
                          form.year === y
                            ? "bg-gradient-to-r from-[#EC4899] to-[#06B6D4] text-white border-transparent shadow-[0_12px_28px_rgba(6,182,212,0.12)]"
                            : "bg-white/[0.045] border-white/[0.14] text-white/64 hover:text-white hover:border-white/[0.26] hover:bg-white/[0.07]"
                        }`}>{y}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <label className={lbl}>Skills <span className="normal-case tracking-normal text-white/45">(pick all that apply)</span></label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {SKILLS.map(s => (
                      <button key={s} type="button" onClick={() => toggleSkill(s)}
                        className={`min-h-10 rounded-full border px-3.5 py-2 font-body text-sm font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]/30 ${
                          form.skills.includes(s)
                            ? "bg-gradient-to-r from-[#EC4899] to-[#06B6D4] text-white border-transparent shadow-[0_12px_28px_rgba(236,72,153,0.12)]"
                            : "bg-white/[0.045] border-white/[0.14] text-white/64 hover:text-white hover:border-white/[0.26] hover:bg-white/[0.07]"
                        }`}>{s}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={lbl}>Why Luit Studio? <span className="text-[#EC4899] normal-case tracking-normal">*</span></label>
                  <textarea rows={4} className={inp + " resize-none"} placeholder="Tell us your motivation, what you want to build, and what you bring..." value={form.why_join} onChange={e => set("why_join", e.target.value)} />
                </div>
                <div>
                  <label className={lbl}>Portfolio / GitHub <span className="normal-case tracking-normal text-white/45">(optional)</span></label>
                  <input className={inp} placeholder="https://yourportfolio.com" value={form.portfolio_url} onChange={e => set("portfolio_url", e.target.value)} />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {status === "error" && feedback && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mt-4 rounded-xl border border-red-400/25 bg-red-400/[0.1] px-4 py-3 font-body text-sm leading-relaxed text-red-200">
            {feedback}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-7 flex gap-3">
        {step > 1 && (
          <button type="button" onClick={() => goTo(step - 1)}
            className="min-h-12 shrink-0 rounded-xl border border-white/[0.16] px-5 py-3 font-body text-sm font-semibold text-white/68 transition-all duration-200 cursor-pointer hover:border-white/30 hover:bg-white/[0.045] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20">
            Back
          </button>
        )}
        {step < 3 ? (
          <button type="button" onClick={() => goTo(step + 1)}
            className="min-h-12 flex-1 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#06B6D4] px-5 py-3 font-body text-base font-semibold text-white shadow-[0_16px_38px_rgba(236,72,153,0.18)] transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_20px_46px_rgba(6,182,212,0.2)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]/40">
            Continue
          </button>
        ) : (
          <button type="button" onClick={handleSubmit} disabled={status === "loading"}
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#06B6D4] px-5 py-3 font-body text-base font-semibold text-white shadow-[0_16px_38px_rgba(236,72,153,0.18)] transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_20px_46px_rgba(6,182,212,0.2)] active:translate-y-0 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]/40">
            {status === "loading"
              ? <><span className="w-4 h-4 border-[1.5px] border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
              : "Submit Application"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function InternPage() {
  return (
    <main className="bg-[#08080f] text-white min-h-screen overflow-x-hidden transition-colors duration-300">
      <section className="relative min-h-screen flex items-center px-5 sm:px-8 xl:px-16 pt-24 pb-20 bg-[#08080f]">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-[#EC4899]/[0.06] blur-[140px]" />
          <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-[#06B6D4]/[0.06] blur-[140px]" />
          <div className="absolute inset-0 opacity-[0.015]"
            style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-12 xl:gap-20 items-center">
            <div>
              <div className="mb-10 sm:mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 backdrop-blur-sm"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                  </span>
                  <span className="font-body text-[11px] uppercase tracking-[0.2em] text-white/50">APPLICATIONS OPEN — SUMMER INTERNSHIP 2026</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
                  className="mt-3 flex max-w-full flex-wrap items-center gap-x-2.5 gap-y-1.5 font-body text-sm leading-relaxed text-white/42 sm:text-[15px]"
                >
                  <CalendarDays size={14} className="shrink-0 text-white/34" />
                  <span className="tracking-[0.03em]">Applications: 1 June 2026</span>
                  <span className="h-1 w-1 rounded-full bg-white/22" aria-hidden="true" />
                  <span className="tracking-[0.03em]">Starts: 1 July 2026</span>
                </motion.div>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
                className="font-heading text-[46px] sm:text-[58px] lg:text-[64px] xl:text-[72px] font-black leading-[0.88] tracking-tight mb-6"
              >
                Launch your<br />career in<br />
                <span className="bg-gradient-to-r from-[#EC4899] via-[#F472B6] to-[#06B6D4] bg-clip-text text-transparent">
                  digital era.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
                className="text-white/45 font-body text-base sm:text-[17px] leading-relaxed max-w-[500px] mb-10"
              >
                A 3-month intensive internship designed around real agency workflows, live projects, and modern digital skills.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
                className="flex flex-wrap gap-x-8 gap-y-5 mb-10 pb-10 border-b border-white/[0.07]"
              >
                {[
                  { value: "3 Months", label: "Program Duration" },
                  { value: "Remote", label: "Remote Mode" },
                  { value: "30 Seats", label: "Limited Intake" },
                  { value: "\u20B91,999", label: "Full Program Fee" },
                ].map(s => (
                  <div key={s.label}>
                    <p className="font-heading text-2xl sm:text-3xl font-black text-white">{s.value}</p>
                    <p className="font-body text-[11px] text-white/25 uppercase tracking-wider mt-1">{s.label}</p>
                  </div>
                ))}
              </motion.div>

              <motion.ul
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.26, ease: EASE }}
                className="space-y-3.5"
              >
                {PERKS.map(p => (
                  <li key={p.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#EC4899]/15 to-[#06B6D4]/15 border border-white/[0.07] flex items-center justify-center shrink-0">
                      <p.icon size={14} className="text-[#EC4899]" />
                    </div>
                    <div className="font-body text-sm">
                      <span className="text-white font-semibold">{p.label}</span>
                      <span className="text-white/35"> - {p.desc}</span>
                    </div>
                  </li>
                ))}
              </motion.ul>
            </div>

            <motion.div
              id="application-form"
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
              className="relative lg:sticky lg:top-24"
            >
              <div className="mb-4 rounded-2xl border border-white/[0.13] bg-white/[0.045] px-5 py-[1.125rem] backdrop-blur-sm sm:px-6 sm:py-5">
                <p className="font-body text-base font-semibold leading-snug text-white">Limited seats available for Summer Internship 2026</p>
                <p className="mt-2 font-body text-sm leading-relaxed text-white/56">
                  Selection is based on consistency, curiosity, and willingness to learn.
                </p>
              </div>

              <div aria-hidden className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-[#EC4899]/10 to-[#06B6D4]/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-2xl border border-white/[0.14] bg-[#0e0e1a] shadow-[0_32px_80px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.05)]">
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-[#EC4899] via-[#F472B6]/60 to-[#06B6D4]" />
                <InternForm />
              </div>

              <p className="mt-4 text-center font-body text-sm leading-relaxed text-white/42">
                Every application is reviewed personally by our team.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative px-5 sm:px-8 xl:px-16 py-18 sm:py-20 border-t border-white/[0.06] bg-[#0a0a12]">
        <div className="max-w-6xl mx-auto">
          <SectionIntro
            eyebrow="Why this internship"
            title="Built like a digital agency internship."
            sub="The program is structured for learners who want practical experience, stronger portfolios, and a clearer understanding of how modern teams execute."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TRUST_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: EASE }}
                className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-4"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#EC4899]/15 to-[#06B6D4]/15 border border-white/[0.08] flex items-center justify-center shrink-0">
                  <item.icon size={16} className="text-[#06B6D4]" />
                </div>
                <p className="font-body text-sm font-medium text-white/72">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 sm:px-8 xl:px-16 py-20 border-t border-white/[0.06] bg-[#08080f]">
        <div className="max-w-6xl mx-auto">
          <SectionIntro
            eyebrow="Learning tracks"
            title="Learn. Build. Ship."
            sub="Explore hands-on tracks focused on modern web development, AI workflows, and real-world digital execution."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {TRACKS.map((track, i) => (
              <motion.div
                key={track.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.055, ease: EASE }}
                className="group relative rounded-2xl p-px bg-gradient-to-br from-white/[0.16] via-white/[0.05] to-transparent hover:from-[#EC4899]/35 hover:to-[#06B6D4]/25 transition-all duration-300"
              >
                <div className="h-full rounded-2xl bg-[#0d0d17] px-5 py-6 border border-white/[0.04]">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/[0.07] mb-5 transition-transform duration-300 group-hover:-translate-y-0.5"
                    style={{ background: `${track.color}18` }}>
                    <track.icon size={17} style={{ color: track.color }} />
                  </div>
                  <h3 className="font-body text-sm font-semibold text-white mb-2">{track.label}</h3>
                  <p className="font-body text-sm text-white/38 leading-relaxed">{track.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 sm:px-8 xl:px-16 py-20 border-t border-white/[0.06] bg-[#0a0a12]">
        <div className="max-w-5xl mx-auto">
          <SectionIntro
            eyebrow="Roadmap"
            title="What You'll Learn"
            sub="A simple progression from foundations to portfolio-ready execution."
          />
          <div className="relative">
            <div aria-hidden className="absolute left-4 sm:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-[#EC4899]/45 via-white/[0.12] to-[#06B6D4]/45" />
            <div className="space-y-4">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.period}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: EASE }}
                  className={`relative grid sm:grid-cols-2 gap-5 ${i % 2 === 0 ? "" : "sm:[&>div]:col-start-2"}`}
                >
                  <div className="ml-10 sm:ml-0 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-5 py-5">
                    <div className="absolute left-[9px] sm:left-1/2 sm:-translate-x-1/2 top-6 w-3.5 h-3.5 rounded-full bg-[#08080f] border-2 border-[#EC4899]" />
                    <p className="font-body text-[11px] tracking-[0.22em] uppercase text-[#06B6D4] mb-2">{item.period}</p>
                    <h3 className="font-body text-base font-semibold text-white">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 sm:px-8 xl:px-16 py-20 border-t border-white/[0.06] bg-[#08080f]">
        <div className="max-w-6xl mx-auto">
          <SectionIntro
            eyebrow="Recognition"
            title="Performance Rewards"
            sub="Recognition for consistency, creativity, and execution."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {REWARDS.map((reward, i) => (
              <motion.div
                key={reward.rank}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: EASE }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EC4899]/15 to-[#06B6D4]/15 border border-white/[0.08] flex items-center justify-center mb-5">
                  <reward.icon size={17} className="text-[#F472B6]" />
                </div>
                <p className="font-body text-[11px] tracking-[0.22em] uppercase text-white/28 mb-2">{reward.rank}</p>
                <h3 className="font-body text-sm font-semibold text-white leading-relaxed">{reward.prize}</h3>
              </motion.div>
            ))}
          </div>

          <p className="mt-5 font-body text-xs text-white/30">Leaderboard-based performance system.</p>
        </div>
      </section>

      <FAQSection />

      <FinalCTASection />

      <Footer variant="internship" />
    </main>
  );
}
