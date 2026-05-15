"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, CheckCircle, Code2,
  Clock, Users, Award, Zap, Check,
} from "lucide-react";
import Footer from "@/components/layout/Footer";

const SKILLS = [
  "Web Dev", "UI/UX", "React", "Node.js", "Mobile Dev",
  "SEO", "Marketing", "Design", "Content Writing",
];
const YEARS   = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Final Year"];
const PERKS   = [
  { icon: Zap,   label: "Live Projects",  desc: "Real client work from day one" },
  { icon: Users, label: "1:1 Mentorship", desc: "Direct guidance from industry pros" },
  { icon: Award, label: "Certificate",    desc: "Verified credential on completion" },
  { icon: Clock, label: "3 Months",       desc: "Structured, full-stack curriculum" },
];
const TRACKS  = [
  { icon: Code2, label: "Web Development", color: "#EC4899" },
];

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const STEP_LABELS = ["Personal Info", "Academic Details", "Your Story"];

const stepVariants = {
  enter:  (d: number) => ({ x: d * 32, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (d: number) => ({ x: d * -32, opacity: 0 }),
};

/* ── Form ───────────────────────────────────────────────── */
function InternForm() {
  const [step, setStep]     = useState(1);
  const [dir, setDir]       = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [form, setForm] = useState({
    full_name: "", email: "", phone: "",
    college: "", course: "", year: "",
    skills: [] as string[], why_join: "", portfolio_url: "",
  });

  const set        = (k: string, v: unknown) => setForm(p => ({ ...p, [k]: v }));
  const toggleSkill = (s: string) =>
    set("skills", form.skills.includes(s) ? form.skills.filter(x => x !== s) : [...form.skills, s]);
  const goTo = (n: number) => { setDir(n > step ? 1 : -1); setStep(n); };

  const handleSubmit = async () => {
    setStatus("loading");
    try {
      const res  = await fetch("/api/intern", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) { setStatus("error"); setFeedback(data.error); }
      else          setStatus("success");
    } catch { setStatus("error"); setFeedback("Network error. Please try again."); }
  };

  const inp = "w-full bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 font-body outline-none focus:border-[#EC4899]/50 focus:ring-2 focus:ring-[#EC4899]/[0.08] transition-all duration-200";
  const lbl = "block text-[10px] font-body font-medium text-white/40 mb-2 uppercase tracking-widest";

  if (status === "success") return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="flex flex-col items-center text-center py-14 px-8 gap-5"
    >
      <div className="w-16 h-16 rounded-full bg-emerald-400/15 border border-emerald-400/25 flex items-center justify-center">
        <CheckCircle size={28} className="text-emerald-400" />
      </div>
      <div>
        <h3 className="font-heading text-2xl font-black text-white mb-2">You&apos;re in the queue!</h3>
        <p className="text-white/40 font-body text-sm max-w-[260px] leading-relaxed mx-auto">
          We review every application personally and will reach out within 3–5 days.
        </p>
      </div>
      <Link href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.12] text-white/45 hover:text-white hover:border-white/25 font-body text-sm transition-all duration-200">
        Back to home <ArrowRight size={14} />
      </Link>
    </motion.div>
  );

  return (
    <div className="p-6 sm:p-7">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          {[1, 2, 3].map((n, idx) => (
            <div key={n} className="flex items-center flex-1 last:flex-none">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-body transition-all duration-300 shrink-0 border ${
                step > n
                  ? "bg-gradient-to-br from-[#EC4899] to-[#06B6D4] border-transparent text-white"
                  : step === n
                  ? "bg-gradient-to-br from-[#EC4899] to-[#06B6D4] border-transparent text-white"
                  : "bg-transparent border-white/[0.12] text-white/20"
              }`}>
                {step > n ? <Check size={11} /> : n}
              </div>
              {idx < 2 && (
                <div className="flex-1 mx-1.5 h-px bg-white/[0.08] relative overflow-hidden rounded-full">
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
        <p className="text-[10px] text-white/30 font-body uppercase tracking-widest">
          {STEP_LABELS[step - 1]} · {step}/3
        </p>
      </div>

      {/* Steps */}
      <div className="overflow-hidden min-h-[220px]">
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
              <div className="space-y-4">
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
              <div className="space-y-4">
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
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 mt-1.5">
                    {YEARS.map(y => (
                      <button key={y} type="button" onClick={() => set("year", y)}
                        className={`py-2 rounded-xl text-[11px] font-body font-medium transition-all duration-200 cursor-pointer border ${
                          form.year === y
                            ? "bg-gradient-to-r from-[#EC4899] to-[#06B6D4] text-white border-transparent"
                            : "bg-white/[0.04] border-white/[0.09] text-white/40 hover:text-white hover:border-white/[0.2]"
                        }`}>{y}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className={lbl}>Skills <span className="normal-case tracking-normal text-white/20">(pick all that apply)</span></label>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {SKILLS.map(s => (
                      <button key={s} type="button" onClick={() => toggleSkill(s)}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-body font-medium transition-all duration-200 cursor-pointer border ${
                          form.skills.includes(s)
                            ? "bg-gradient-to-r from-[#EC4899] to-[#06B6D4] text-white border-transparent"
                            : "bg-white/[0.04] border-white/[0.09] text-white/40 hover:text-white hover:border-white/[0.2]"
                        }`}>{s}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={lbl}>Why Luit Studio? <span className="text-[#EC4899] normal-case tracking-normal">*</span></label>
                  <textarea rows={4} className={inp + " resize-none"} placeholder="Tell us your motivation, what you want to build, and what you bring..." value={form.why_join} onChange={e => set("why_join", e.target.value)} />
                </div>
                <div>
                  <label className={lbl}>Portfolio / GitHub <span className="normal-case tracking-normal text-white/20">(optional)</span></label>
                  <input className={inp} placeholder="https://yourportfolio.com" value={form.portfolio_url} onChange={e => set("portfolio_url", e.target.value)} />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Error */}
      <AnimatePresence>
        {status === "error" && feedback && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mt-4 text-xs text-red-400 font-body bg-red-400/[0.08] border border-red-400/20 rounded-xl px-4 py-2.5">
            {feedback}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-2.5 mt-6">
        {step > 1 && (
          <button type="button" onClick={() => goTo(step - 1)}
            className="px-5 py-3 rounded-xl border border-white/[0.1] text-white/40 hover:text-white hover:border-white/25 font-body text-sm transition-all duration-200 cursor-pointer shrink-0">
            ← Back
          </button>
        )}
        {step < 3 ? (
          <button type="button" onClick={() => goTo(step + 1)}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#06B6D4] text-white font-body font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer">
            Continue →
          </button>
        ) : (
          <button type="button" onClick={handleSubmit} disabled={status === "loading"}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#06B6D4] text-white font-body font-semibold text-sm hover:opacity-90 disabled:opacity-55 disabled:cursor-not-allowed transition-opacity cursor-pointer flex items-center justify-center gap-2">
            {status === "loading"
              ? <><span className="w-4 h-4 border-[1.5px] border-white/30 border-t-white rounded-full animate-spin" /> Submitting…</>
              : "Submit Application →"}
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────── */
export default function InternPage() {
  return (
    <main className="bg-[#fafafa] dark:bg-[#08080f] text-gray-900 dark:text-white min-h-screen overflow-x-hidden transition-colors duration-300">

      {/* ── HERO + FORM ─────────────────────────────── */}
      <section className="relative min-h-screen flex items-center px-5 sm:px-8 xl:px-16 pt-24 pb-20 bg-[#08080f]">

        {/* Background ambience */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-[#EC4899]/[0.06] blur-[140px]" />
          <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-[#06B6D4]/[0.06] blur-[140px]" />
          <div className="absolute inset-0 opacity-[0.015]"
            style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-12 xl:gap-20 items-center">

            {/* ── Left: copy ───────────────────────── */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-white/[0.1] bg-white/[0.04] backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="text-[11px] tracking-[0.2em] uppercase text-white/50 font-body">Now Accepting — Batch 01</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
                className="font-heading text-[46px] sm:text-[58px] lg:text-[64px] xl:text-[72px] font-black leading-[0.88] tracking-tight mb-6"
              >
                Launch your<br />career in<br />
                <span className="bg-gradient-to-r from-[#EC4899] via-[#F472B6] to-[#06B6D4] bg-clip-text text-transparent">
                  digital.
                </span>
              </motion.h1>

              {/* Subline */}
              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
                className="text-white/40 font-body text-base sm:text-[17px] leading-relaxed max-w-[400px] mb-10"
              >
                A 3-month intensive internship at a real digital agency. Work on live client projects from week one.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
                className="flex flex-wrap gap-x-8 gap-y-5 mb-10 pb-10 border-b border-white/[0.07]"
              >
                {[
                  { value: "3 months", label: "Duration" },
                  { value: "Remote",   label: "Mode"     },
                  { value: "20",       label: "Seats"      },
                  { value: "₹1,999",   label: "3 months"  },
                ].map(s => (
                  <div key={s.label}>
                    <p className="font-heading text-2xl sm:text-3xl font-black text-white">{s.value}</p>
                    <p className="font-body text-[11px] text-white/25 uppercase tracking-wider mt-1">{s.label}</p>
                  </div>
                ))}
              </motion.div>

              {/* Perks */}
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
                      <span className="text-white/35"> — {p.desc}</span>
                    </div>
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* ── Right: form card ─────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
              className="relative lg:sticky lg:top-24"
            >
              {/* Glow */}
              <div aria-hidden className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-[#EC4899]/10 to-[#06B6D4]/10 blur-2xl" />

              {/* Card */}
              <div className="relative rounded-2xl border border-white/[0.11] bg-[#0e0e1a] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.55)]">
                {/* Top accent line */}
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-[#EC4899] via-[#F472B6]/60 to-[#06B6D4]" />
                <InternForm />
              </div>

              <p className="text-center text-white/18 font-body text-[11px] mt-4 leading-relaxed">
                ₹1,999 for 3 months · We review every application personally
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── TRACKS ─────────────────────────────────── */}
      <section className="relative px-5 sm:px-8 xl:px-16 py-20 border-t border-gray-100 dark:border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, ease: EASE }}
            className="mb-10"
          >
            <p className="font-body text-[11px] tracking-[0.28em] uppercase text-gray-400 dark:text-white/25 mb-3">Learning tracks</p>
            <h2 className="font-heading text-[28px] sm:text-[36px] font-black text-gray-900 dark:text-white">
              Pick your{" "}
              <span className="bg-gradient-to-r from-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
                specialisation.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {TRACKS.map((track, i) => (
              <motion.div
                key={track.label}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.055, ease: EASE }}
                className="group flex items-center gap-3 p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] hover:bg-gray-50 dark:hover:bg-white/[0.05] hover:border-gray-300 dark:hover:border-white/[0.14] shadow-sm dark:shadow-none transition-all duration-300 cursor-default"
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-gray-200 dark:border-white/[0.07]"
                  style={{ background: `${track.color}18` }}>
                  <track.icon size={16} style={{ color: track.color }} />
                </div>
                <span className="font-body text-sm text-gray-500 dark:text-white/50 group-hover:text-gray-900 dark:group-hover:text-white/80 transition-colors duration-200">{track.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
