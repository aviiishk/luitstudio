"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, CheckCircle, Briefcase, Code2, Palette,
  TrendingUp, Globe, Megaphone, Clock, Users, Award, Zap,
} from "lucide-react";
import Footer from "@/components/layout/Footer";

const SKILLS = [
  "Web Dev", "UI/UX", "React", "Node.js", "Mobile Dev",
  "SEO", "Marketing", "Design", "Content Writing",
];
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Final Year"];
const PERKS = [
  { icon: Clock,    label: "3 Month Program", desc: "Structured curriculum built for real-world skills" },
  { icon: Users,    label: "Mentorship",       desc: "1:1 guidance from industry professionals"          },
  { icon: Award,    label: "Certificate",      desc: "Verified certificate of completion"               },
  { icon: Zap,      label: "Live Projects",    desc: "Work on actual client projects from day one"      },
];
const TRACKS = [
  { icon: Code2,      label: "Web Development",       color: "#EC4899" },
  { icon: Palette,    label: "UI/UX Design",           color: "#06B6D4" },
  { icon: Globe,      label: "SEO & Growth",           color: "#EC4899" },
  { icon: TrendingUp, label: "Performance Marketing",  color: "#06B6D4" },
  { icon: Megaphone,  label: "Social Media",           color: "#EC4899" },
  { icon: Briefcase,  label: "Brand Strategy",         color: "#06B6D4" },
];
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const stepVariants = {
  enter:  (d: number) => ({ x: d * 60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (d: number) => ({ x: d * -60, opacity: 0 }),
};

function InternForm() {
  const [step, setStep]         = useState(1);
  const [dir, setDir]           = useState(1);
  const [status, setStatus]     = useState<"idle"|"loading"|"success"|"error">("idle");
  const [feedback, setFeedback] = useState("");
  const [form, setForm] = useState({
    full_name: "", email: "", phone: "",
    college: "", course: "", year: "",
    skills: [] as string[], why_join: "", portfolio_url: "",
  });

  const set = (k: string, v: unknown) => setForm(p => ({ ...p, [k]: v }));
  const toggleSkill = (s: string) => set("skills", form.skills.includes(s) ? form.skills.filter(x => x !== s) : [...form.skills, s]);
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

  const inp = "w-full bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.1] rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 font-body outline-none focus:border-[#EC4899]/60 focus:ring-2 focus:ring-[#EC4899]/10 transition-all duration-200";
  const lbl = "block text-xs text-gray-500 dark:text-white/55 font-body mb-1.5 uppercase tracking-wider";

  if (status === "success") return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE }} className="flex flex-col items-center text-center py-12 px-6 gap-5">
      <div className="w-20 h-20 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/30 flex items-center justify-center">
        <CheckCircle size={36} className="text-[#06B6D4]" />
      </div>
      <div>
        <h3 className="font-heading text-2xl font-black text-gray-900 dark:text-white mb-2">Application Received!</h3>
        <p className="text-gray-500 dark:text-white/50 font-body text-sm max-w-xs">We&apos;ll review your application and get back within 3–5 business days.</p>
      </div>
      <Link href="/" className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 dark:border-white/[0.12] text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-white/25 font-body text-sm transition-all duration-200">
        Back to home <ArrowRight size={14} />
      </Link>
    </motion.div>
  );

  return (
    <div>
      {/* Progress bar */}
      <div className="px-6 pt-6 pb-5">
        <div className="flex items-center mb-3">
          {[1,2,3].map((n, idx) => (
            <div key={n} className="flex items-center flex-1 last:flex-none">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-body transition-all duration-300 shrink-0 ${step >= n ? "bg-gradient-to-r from-[#EC4899] to-[#06B6D4] text-white" : "bg-gray-100 dark:bg-white/[0.06] text-gray-400 dark:text-white/30 border border-gray-200 dark:border-white/[0.1]"}`}>{n}</div>
              {idx < 2 && <div className="flex-1 mx-2 h-px bg-gray-200 dark:bg-white/[0.08]"><div className="h-full bg-gradient-to-r from-[#EC4899] to-[#06B6D4] rounded-full transition-all duration-500" style={{ width: step > n ? "100%" : "0%" }} /></div>}
            </div>
          ))}
        </div>
        <p className="text-[11px] text-gray-400 dark:text-white/35 font-body uppercase tracking-wider">
          {step === 1 ? "Personal Info" : step === 2 ? "Academic Details" : "Your Story"}
        </p>
      </div>

      <div className="px-6 pb-6 overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={step} custom={dir} variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.32, ease: EASE }}>
            {step === 1 && (
              <div className="space-y-4">
                <div><label className={lbl}>Full Name <span className="text-[#EC4899]">*</span></label><input className={inp} placeholder="Alex Johnson" value={form.full_name} onChange={e => set("full_name", e.target.value)} /></div>
                <div><label className={lbl}>Email <span className="text-[#EC4899]">*</span></label><input className={inp} type="email" placeholder="you@email.com" value={form.email} onChange={e => set("email", e.target.value)} /></div>
                <div><label className={lbl}>Phone <span className="text-[#EC4899]">*</span></label><input className={inp} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => set("phone", e.target.value)} /></div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <div><label className={lbl}>College / University <span className="text-[#EC4899]">*</span></label><input className={inp} placeholder="e.g. Gauhati University" value={form.college} onChange={e => set("college", e.target.value)} /></div>
                <div><label className={lbl}>Course / Degree <span className="text-[#EC4899]">*</span></label><input className={inp} placeholder="e.g. B.Tech Computer Science" value={form.course} onChange={e => set("course", e.target.value)} /></div>
                <div>
                  <label className={lbl}>Year of Study <span className="text-[#EC4899]">*</span></label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {YEARS.map(y => (
                      <button key={y} type="button" onClick={() => set("year", y)} className={`py-2 rounded-xl text-xs font-body font-medium transition-all duration-200 cursor-pointer ${form.year === y ? "bg-gradient-to-r from-[#EC4899] to-[#06B6D4] text-white" : "bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.1] text-gray-500 dark:text-white/50 hover:border-gray-300 dark:hover:border-white/25 hover:text-gray-900 dark:hover:text-white"}`}>{y}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <label className={lbl}>Skills <span className="text-gray-400 dark:text-white/30">(pick all that apply)</span></label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {SKILLS.map(s => (
                      <button key={s} type="button" onClick={() => toggleSkill(s)} className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-all duration-200 cursor-pointer ${form.skills.includes(s) ? "bg-gradient-to-r from-[#EC4899] to-[#06B6D4] text-white" : "bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.1] text-gray-500 dark:text-white/50 hover:border-gray-300 dark:hover:border-white/25 hover:text-gray-900 dark:hover:text-white"}`}>{s}</button>
                    ))}
                  </div>
                </div>
                <div><label className={lbl}>Why Luit Studio? <span className="text-[#EC4899]">*</span></label><textarea rows={4} className={inp + " resize-none"} placeholder="Tell us your motivation, what you want to learn, and what you'll bring to the team..." value={form.why_join} onChange={e => set("why_join", e.target.value)} /></div>
                <div><label className={lbl}>Portfolio / GitHub <span className="text-gray-400 dark:text-white/30">(optional)</span></label><input className={inp} placeholder="https://yourportfolio.com" value={form.portfolio_url} onChange={e => set("portfolio_url", e.target.value)} /></div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {status === "error" && feedback && <p className="mt-4 text-xs text-red-500 font-body bg-red-50 dark:bg-red-400/10 border border-red-200 dark:border-red-400/20 rounded-lg px-3 py-2">{feedback}</p>}

        <div className="flex gap-3 mt-6">
          {step > 1 && <button type="button" onClick={() => goTo(step - 1)} className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-white/[0.1] text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-white/25 font-body text-sm transition-all duration-200 cursor-pointer">Back</button>}
          {step < 3
            ? <button type="button" onClick={() => goTo(step + 1)} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#06B6D4] text-white font-body font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_24px_rgba(236,72,153,0.25)]">Continue</button>
            : <button type="button" onClick={handleSubmit} disabled={status === "loading"} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#06B6D4] text-white font-body font-semibold text-sm hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity cursor-pointer shadow-[0_0_24px_rgba(236,72,153,0.25)] flex items-center justify-center gap-2">
                {status === "loading" ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting…</> : "Submit Application"}
              </button>}
        </div>
      </div>
    </div>
  );
}

export default function InternPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <main className="bg-[#fafafa] dark:bg-[#08080f] text-gray-900 dark:text-white min-h-screen overflow-hidden transition-colors duration-300">

      {/* ── HERO — always dark for drama ── */}
      <section className="relative min-h-screen flex items-center justify-center px-5 sm:px-6 pt-24 pb-16 bg-[#08080f]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#EC4899]/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#06B6D4]/10 blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(236,72,153,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-white/[0.12] bg-white/[0.06]">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" /></span>
            <span className="text-[11px] tracking-[0.22em] uppercase text-white/60 font-body">Now Accepting — Batch 01</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: EASE }} className="font-heading text-[40px] sm:text-[60px] md:text-[76px] font-black leading-[0.9] tracking-tight mb-6 text-white">
            Launch Your Career<br />
            <span className="bg-gradient-to-r from-[#EC4899] via-[#F472B6] to-[#06B6D4] bg-clip-text text-transparent">in Digital.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: EASE }} className="text-white/50 font-body text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
            A 3-month intensive internship at Luit Studio. Work on real client projects, learn from industry professionals, and build a portfolio that stands out.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: EASE }} className="flex flex-wrap justify-center gap-8 mb-10">
            {[{ value: "3 Months", label: "Duration" }, { value: "Remote", label: "Mode" }, { value: "Limited", label: "Seats" }, { value: "Free", label: "No cost" }].map(s => (
              <div key={s.label} className="text-center"><p className="font-heading text-xl sm:text-2xl font-black text-white">{s.value}</p><p className="font-body text-[11px] text-white/35 uppercase tracking-wider mt-0.5">{s.label}</p></div>
            ))}
          </motion.div>
          <motion.button initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4, ease: EASE }} onClick={scrollToForm} className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#EC4899] to-[#06B6D4] text-white font-body font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_32px_rgba(236,72,153,0.35)]">
            Apply Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </motion.button>
        </div>
      </section>

      {/* ── PERKS ── */}
      <section className="relative z-10 px-5 sm:px-6 py-16 sm:py-20 border-t border-gray-100 dark:border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }} className="text-center mb-12">
            <p className="font-body text-xs tracking-[0.28em] uppercase text-gray-400 dark:text-white/35 mb-4">What you get</p>
            <h2 className="font-heading text-[28px] sm:text-[40px] font-black text-gray-900 dark:text-white">More than just an internship.</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PERKS.map((perk, i) => (
              <motion.div key={perk.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }} className="rounded-2xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] shadow-sm dark:shadow-none p-6 hover:border-gray-300 dark:hover:border-white/[0.16] transition-colors duration-300">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EC4899]/15 to-[#06B6D4]/15 flex items-center justify-center mb-4">
                  <perk.icon size={18} className="text-[#EC4899]" />
                </div>
                <h3 className="font-heading font-bold text-gray-900 dark:text-white text-base mb-1.5">{perk.label}</h3>
                <p className="font-body text-xs text-gray-500 dark:text-white/40 leading-relaxed">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRACKS ── */}
      <section className="relative z-10 px-5 sm:px-6 py-16 sm:py-20 border-t border-gray-100 dark:border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }} className="text-center mb-12">
            <p className="font-body text-xs tracking-[0.28em] uppercase text-gray-400 dark:text-white/35 mb-4">Learning tracks</p>
            <h2 className="font-heading text-[28px] sm:text-[40px] font-black text-gray-900 dark:text-white">
              Pick your <span className="bg-gradient-to-r from-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">specialisation.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TRACKS.map((track, i) => (
              <motion.div key={track.label} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07, ease: EASE }} className="group flex items-center gap-3 p-4 rounded-2xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] shadow-sm dark:shadow-none hover:border-gray-300 dark:hover:border-white/[0.18] hover:bg-gray-50 dark:hover:bg-white/[0.055] transition-all duration-300">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${track.color}18` }}>
                  <track.icon size={16} style={{ color: track.color }} />
                </div>
                <span className="font-body text-sm text-gray-600 dark:text-white/70 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">{track.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM ── */}
      <section ref={formRef} className="relative z-10 px-5 sm:px-6 py-16 sm:py-24 border-t border-gray-100 dark:border-white/[0.06]">
        <div className="max-w-lg mx-auto">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }} className="text-center mb-10">
            <p className="font-body text-xs tracking-[0.28em] uppercase text-gray-400 dark:text-white/35 mb-4">Apply now</p>
            <h2 className="font-heading text-[28px] sm:text-[40px] font-black text-gray-900 dark:text-white mb-3">Start your application.</h2>
            <p className="text-gray-500 dark:text-white/40 font-body text-sm">Takes less than 3 minutes. No fees, no catch.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15, ease: EASE }} className="relative rounded-2xl border border-gray-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.03] shadow-sm dark:shadow-none overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#EC4899]/60 via-[#F472B6]/30 to-[#06B6D4]/60" />
            <InternForm />
          </motion.div>
          <p className="text-center text-gray-400 dark:text-white/20 font-body text-xs mt-5">We review every application personally. Expect a reply within 3–5 days.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
