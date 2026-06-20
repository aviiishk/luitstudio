"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Check, ChevronDown } from "lucide-react";
import Footer from "@/components/layout/Footer";
import {
  SiJavascript, SiReact, SiTailwindcss,
  SiNodedotjs, SiGithub, SiVercel,
  SiNextdotjs, SiPostgresql, SiGoogle, SiOpenai,
} from "react-icons/si";

const BG     = "#F5EDE0";
const YELLOW = "#F5E450";
const PINK   = "#F9CEC0";
const BLACK  = "#1A1A1A";

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Final Year"];

const TOOLS = [
  { name: "JavaScript",    Icon: SiJavascript,  color: "#F7DF1E", desc: "Make it interactive"      },
  { name: "React",         Icon: SiReact,       color: "#61DAFB", desc: "Build modern UIs"          },
  { name: "Next.js",       Icon: SiNextdotjs,   color: "#1A1A1A", desc: "Full-stack framework"      },
  { name: "Tailwind CSS",  Icon: SiTailwindcss, color: "#06B6D4", desc: "Utility-first styling"     },
  { name: "Node.js",       Icon: SiNodedotjs,   color: "#339933", desc: "Powerful backend"          },
  { name: "PostgreSQL",    Icon: SiPostgresql,  color: "#4169E1", desc: "Relational database"       },
  { name: "Google Stitch", Icon: SiGoogle,      color: "#4285F4", desc: "Data & integrations"      },
  { name: "GitHub",        Icon: SiGithub,      color: "#1A1A1A", desc: "Version control & collab" },
  { name: "Vercel",        Icon: SiVercel,      color: "#1A1A1A", desc: "Deploy instantly"          },
  { name: "Dev with AI",   Icon: SiOpenai,      color: "#10A37F", desc: "Build smarter with AI"    },
];

const LEARN_ITEMS = [
  "Build Modern Websites & Web Applications",
  "Use AI Tools to Speed Up Development",
  "Work on Real Projects",
  "Create a Portfolio for Resume & LinkedIn",
  "Understand Industry Workflows",
  "Gain Practical Development Experience",
];

const PERKS = [
  { icon: "📜", label: "Internship Certificate" },
  { icon: "🎥", label: "Live Interactive Sessions" },
  { icon: "💻", label: "Hands-on Project Experience" },
  { icon: "🗂️", label: "Portfolio Development Support" },
  { icon: "🤝", label: "1-1 Mentorship" },
];

const PRICING = [
  { label: "First 20 Students", price: "₹999",   highlight: true,  note: "Launch Offer · Limited seats" },
  { label: "Next Batch",        price: "₹1,499", highlight: false, note: "Early bird pricing"            },
  { label: "Regular Fee",       price: "₹1,999", highlight: false, note: "Standard enrollment"           },
];

const FAQS = [
  { q: "Is this beginner friendly?",  a: "Yes. The program is designed for students who want to move beyond theory. No prior professional experience needed — just a willingness to learn and build." },
  { q: "Will I get a certificate?",   a: "Yes. All active participants who complete the program receive an official Internship Certificate from Luit Studio." },
  { q: "What is the cost?",           a: "Early bird offer: ₹999 for the first 20 students. Next batch is ₹1,499. Regular fee is ₹1,999. No hidden charges." },
  { q: "Are there live sessions?",    a: "Yes. Live interactive sessions are part of the program along with hands-on project work and 1-on-1 mentorship." },
  { q: "What will we build?",         a: "Real projects — modern websites, web applications, and portfolio pieces you can show on your resume and LinkedIn." },
  { q: "Who should apply?",           a: "BCA, MCA, B.Tech, B.Sc CS, or any student interested in web development and AI. Any year, any college." },
  { q: "Is placement guaranteed?",    a: "No guaranteed placements. However, top performers may receive future collaboration and freelance opportunities from Luit Studio." },
];

const BOTTOM_BAR = [
  { icon: "⌨",  label: "Real Projects"  },
  { icon: "👨‍🏫", label: "Expert Mentors" },
  { icon: "📜",  label: "Certificate"    },
  { icon: "💼",  label: "Career Support" },
];

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const STEP_LABELS = ["Personal Info", "Academic Details", "Payment"];
const UPI_ID = "abhishekkumarprasad03@okhdfcbank";
const stepVariants = {
  enter:  (d: number) => ({ x: d * 24, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (d: number) => ({ x: d * -24, opacity: 0 }),
};

/* ── Registration Form ───────────────────────────────────── */
function RegistrationForm() {
  const [step, setStep]     = useState(1);
  const [dir, setDir]       = useState(1);
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [feedback, setFeedback] = useState("");
  const [form, setForm] = useState({
    full_name: "", email: "", phone: "",
    college: "", course: "", year: "",
    utr: "",
  });

  const set   = (k: string, v: unknown) => setForm(p => ({ ...p, [k]: v }));
  const goTo  = (n: number) => { setDir(n > step ? 1 : -1); setStep(n); };

  const handleSubmit = async () => {
    setStatus("loading");
    try {
      const res  = await fetch("/api/intern", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) { setStatus("error"); setFeedback(data.error); }
      else          setStatus("success");
    } catch { setStatus("error"); setFeedback("Network error. Please try again."); }
  };

  const inp = "w-full bg-white border-2 border-[#1A1A1A] rounded-xl px-4 py-3 text-sm font-body text-[#1A1A1A] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#F5E450] transition-all duration-150";
  const lbl = "block text-[11px] font-body font-bold text-[#1A1A1A] mb-2 uppercase tracking-widest";

  if (status === "success") return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}
      className="flex flex-col items-center text-center py-12 px-6 gap-4">
      <div className="w-14 h-14 rounded-full border-4 border-[#1A1A1A] flex items-center justify-center" style={{ background: YELLOW }}>
        <Check size={24} strokeWidth={3} color={BLACK} />
      </div>
      <div>
        <h3 className="font-heading text-xl font-black text-[#1A1A1A] mb-1">Application Received!</h3>
        <p className="font-body text-sm text-gray-600 max-w-xs leading-relaxed">We review every application personally and reach out within 3–5 days.</p>
      </div>
      <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#1A1A1A] font-body font-semibold text-sm text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all">
        Back to home
      </Link>
    </motion.div>
  );

  return (
    <div className="p-5 sm:p-7">
      {/* Progress */}
      <div className="mb-5">
        <div className="flex items-center mb-2.5">
          {[1, 2, 3].map((n, idx) => (
            <div key={n} className="flex items-center flex-1 last:flex-none">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black border-2 transition-all duration-200 shrink-0 ${step >= n ? "border-[#1A1A1A] text-[#1A1A1A]" : "border-gray-300 text-gray-300"}`}
                style={step >= n ? { background: YELLOW } : {}}>
                {step > n ? <Check size={11} strokeWidth={3} /> : n}
              </div>
              {idx < 2 && (
                <div className="flex-1 mx-1.5 h-0.5 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#1A1A1A] transition-transform duration-300 origin-left"
                    style={{ transform: step > n ? "scaleX(1)" : "scaleX(0)" }} />
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="text-[11px] font-body font-bold text-gray-500 uppercase tracking-widest">{STEP_LABELS[step - 1]} · {step}/3</p>
      </div>

      <div className="overflow-hidden min-h-52">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={step} custom={dir} variants={stepVariants} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.2, ease: EASE }}>
            {step === 1 && (
              <div className="space-y-3.5">
                <div><label className={lbl}>Full Name *</label><input className={inp} placeholder="Priya Sharma" value={form.full_name} onChange={e => set("full_name", e.target.value)} /></div>
                <div><label className={lbl}>Email *</label><input className={inp} type="email" placeholder="you@email.com" value={form.email} onChange={e => set("email", e.target.value)} /></div>
                <div><label className={lbl}>Phone *</label><input className={inp} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => set("phone", e.target.value)} /></div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-3.5">
                <div><label className={lbl}>College / University *</label><input className={inp} placeholder="e.g. Gauhati University" value={form.college} onChange={e => set("college", e.target.value)} /></div>
                <div><label className={lbl}>Course / Degree *</label><input className={inp} placeholder="e.g. B.Tech Computer Science" value={form.course} onChange={e => set("course", e.target.value)} /></div>
                <div>
                  <label className={lbl}>Year of Study *</label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-1">
                    {YEARS.map(y => (
                      <button key={y} type="button" onClick={() => set("year", y)}
                        className={`py-2 rounded-xl text-[11px] font-body font-bold border-2 transition-all duration-150 cursor-pointer ${form.year === y ? "border-[#1A1A1A] text-[#1A1A1A]" : "border-gray-300 text-gray-400 hover:border-[#1A1A1A]"}`}
                        style={form.year === y ? { background: YELLOW } : {}}>
                        {y}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-3">
                {/* 3-step guide */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { n: "1", label: "Scan QR",   bg: "white"  },
                    { n: "2", label: "Pay ₹999",  bg: "white"  },
                    { n: "3", label: "Enter UTR",  bg: YELLOW   },
                  ].map(s => (
                    <div key={s.n} className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl border-2 border-[#1A1A1A] text-center"
                      style={{ background: s.bg }}>
                      <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-white text-[10px] font-black flex items-center justify-center shrink-0">{s.n}</span>
                      <p className="font-body text-[10px] font-black text-[#1A1A1A] leading-tight">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* QR image — centered, constrained */}
                <div className="flex justify-center">
                  <div className="w-52 rounded-2xl overflow-hidden border-2 border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A]">
                    <img src="/upi-qr.png" alt="Scan to pay ₹999" className="w-full" />
                  </div>
                </div>

                {/* UTR input — highlighted box */}
                <div className="rounded-2xl border-2 border-[#1A1A1A] overflow-hidden">
                  <div className="px-4 py-2 border-b-2 border-[#1A1A1A]" style={{ background: YELLOW }}>
                    <p className="font-body text-[11px] font-black text-[#1A1A1A] uppercase tracking-widest">
                      After paying, enter below
                    </p>
                  </div>
                  <div className="p-3 bg-white">
                    <input className={inp + " text-base font-black tracking-wider"} placeholder="UTR / Transaction ID"
                      value={form.utr} onChange={e => set("utr", e.target.value)} />
                    <p className="font-body text-[10px] text-gray-400 mt-1.5">
                      UPI app → Payment history → 12-digit reference number
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {status === "error" && feedback && (
        <p className="mt-3 text-xs font-body text-red-600 bg-red-50 border-2 border-red-200 rounded-xl px-4 py-2.5">{feedback}</p>
      )}

      <div className="flex gap-2.5 mt-5">
        {step > 1 && (
          <button type="button" onClick={() => goTo(step - 1)}
            className="px-5 py-3 rounded-xl border-2 border-[#1A1A1A] text-[#1A1A1A] font-body font-bold text-sm hover:bg-[#1A1A1A] hover:text-white transition-all cursor-pointer">
            ← Back
          </button>
        )}
        {step < 3 ? (
          <button type="button" onClick={() => goTo(step + 1)}
            className="flex-1 py-3 rounded-xl border-2 border-[#1A1A1A] bg-[#1A1A1A] text-white font-body font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer">
            {step === 2 ? "Proceed to Payment →" : "Continue →"}
          </button>
        ) : (
          <button type="button" onClick={handleSubmit} disabled={status === "loading"}
            className="flex-1 py-3 rounded-xl border-2 border-[#1A1A1A] bg-[#1A1A1A] text-white font-body font-bold text-sm hover:opacity-90 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2">
            {status === "loading"
              ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting…</>
              : "Submit Application →"}
          </button>
        )}
      </div>
    </div>
  );
}

/* ── FAQ Item — CSS grid transition, zero lag ────────────── */
function FAQItem({ item }: { item: typeof FAQS[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-2 border-[#1A1A1A] rounded-2xl overflow-hidden bg-white">
      <button type="button" onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors">
        <span className="font-body font-bold text-[#1A1A1A] text-sm sm:text-base pr-2">{item.q}</span>
        <ChevronDown size={16} className={`text-[#1A1A1A] shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {/* CSS grid-row transition — no JS, no lag */}
      <div className={`grid transition-[grid-template-rows] duration-200 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className="px-5 pb-5 pt-3 font-body text-sm text-gray-600 leading-relaxed border-t-2 border-[#1A1A1A]">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function InternshipPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main style={{ backgroundColor: BG }} className="min-h-screen overflow-x-hidden text-[#1A1A1A]">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="px-4 sm:px-8 xl:px-16 pt-20 sm:pt-24 pb-14 sm:pb-20">
        <div className="max-w-6xl mx-auto">

          {/* Label chips */}
          <div className="flex flex-wrap gap-2 mb-10">
            <span className="font-body text-[11px] font-black uppercase tracking-widest px-4 py-1.5 border-2 border-[#1A1A1A] rounded-full" style={{ background: YELLOW }}>
              Internship Program
            </span>
            <span className="font-body text-[11px] font-black uppercase tracking-widest px-4 py-1.5 border-2 border-[#1A1A1A] rounded-full bg-white">
              ⚠ Limited Seats
            </span>
            <span className="font-body text-[11px] font-black uppercase tracking-widest px-4 py-1.5 border-2 border-[#1A1A1A] rounded-full" style={{ background: PINK }}>
              ₹999 Launch Offer
            </span>
          </div>

          <div className="grid lg:grid-cols-[1fr_300px] gap-8 lg:gap-14 items-start">

            {/* Left */}
            <div>
              <h1 className="font-heading text-[52px] xs:text-[64px] sm:text-[78px] xl:text-[96px] font-black leading-[0.86] tracking-tight mb-6">
                Full Stack<br />
                Web Dev<br />
                <span className="inline-block px-3 -mx-1 rounded-sm" style={{ background: YELLOW }}>with AI</span>
              </h1>

              <p className="font-body text-sm sm:text-base text-gray-600 leading-relaxed max-w-lg mb-8">
                Designed for students who want to move beyond theory and actually build real-world projects. BCA · MCA · B.Tech · B.Sc CS welcome.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-10">
                <button onClick={scrollToForm}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-[#1A1A1A] bg-[#1A1A1A] text-white font-body font-black text-sm hover:opacity-90 transition-opacity cursor-pointer tracking-wide shadow-[3px_3px_0_#F5E450]">
                  APPLY NOW →
                </button>
                <span className="font-body text-xs font-bold text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-xl px-4 py-3">
                  luitstudio.com/internship
                </span>
              </div>

              {/* Stats bar */}
              <div className="inline-flex border-2 border-[#1A1A1A] rounded-2xl overflow-hidden bg-white">
                {[["1", "Month"], ["₹999", "Launch"], ["Remote", "Mode"], ["30", "Seats"]].map(([v, l], i) => (
                  <div key={l} className={`px-5 py-3 text-center ${i > 0 ? "border-l-2 border-[#1A1A1A]" : ""}`}>
                    <p className="font-heading text-lg sm:text-xl font-black text-[#1A1A1A]">{v}</p>
                    <p className="font-body text-[10px] text-gray-500 uppercase tracking-wider">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: bento */}
            <div className="flex flex-col gap-3 lg:pt-2">

              {/* Price */}
              <div className="border-4 border-[#1A1A1A] rounded-2xl p-5 shadow-[4px_4px_0_#1A1A1A]" style={{ background: PINK }}>
                <p className="font-body text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/60 mb-1">Launch Offer</p>
                <p className="font-heading text-5xl font-black text-[#1A1A1A] leading-none">₹999</p>
                <p className="font-body text-xs text-[#1A1A1A]/70 mt-1.5">First 20 students only</p>
                <div className="mt-3 pt-3 border-t-2 border-[#1A1A1A]">
                  <p className="font-body text-[11px] text-[#1A1A1A]/60">Next batch: ₹1,499 · Regular: ₹1,999</p>
                </div>
              </div>

              {/* Perks 2×2 */}
              <div className="grid grid-cols-2 gap-2">
                {[["📜", "Certificate"], ["🎥", "Live Sessions"], ["🤝", "1-1 Mentorship"], ["💻", "Real Projects"]].map(([icon, label]) => (
                  <div key={label} className="border-2 border-[#1A1A1A] rounded-2xl p-3 bg-white flex flex-col items-center gap-1.5 text-center">
                    <span className="text-xl">{icon}</span>
                    <p className="font-body text-[11px] font-black text-[#1A1A1A] leading-tight">{label}</p>
                  </div>
                ))}
              </div>

              {/* Duration chip */}
              <div className="border-2 border-[#1A1A1A] rounded-2xl px-4 py-3 bg-[#1A1A1A] text-white flex items-center justify-between">
                <div>
                  <p className="font-body text-[10px] text-white/50 uppercase tracking-widest">Duration</p>
                  <p className="font-heading text-xl font-black">1 Month</p>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center font-mono font-black text-sm" style={{ background: YELLOW, color: BLACK }}>
                  {"</>"}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── WHAT YOU'LL LEARN + RECEIVE ─────────────── */}
      <section className="px-4 sm:px-8 xl:px-16 py-12 sm:py-16 border-t-4 border-[#1A1A1A]">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-4">
          <div className="rounded-3xl border-4 border-[#1A1A1A] p-6 sm:p-8" style={{ background: PINK }}>
            <div className="w-11 h-11 border-2 border-[#1A1A1A] rounded-xl bg-white flex items-center justify-center font-mono font-black text-sm mb-4">{"</>"}</div>
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-[#1A1A1A] leading-tight mb-4">What You&apos;ll<br />Learn</h3>
            <div className="space-y-2.5">
              {LEARN_ITEMS.map(item => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-[#1A1A1A] flex items-center justify-center shrink-0 mt-0.5" style={{ background: YELLOW }}>
                    <Check size={10} strokeWidth={3} color={BLACK} />
                  </div>
                  <p className="font-body text-sm text-[#1A1A1A] leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border-4 border-[#1A1A1A] p-6 sm:p-8" style={{ background: YELLOW }}>
            <div className="w-11 h-11 border-2 border-[#1A1A1A] rounded-xl bg-white flex items-center justify-center text-lg mb-4">🎓</div>
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-[#1A1A1A] leading-tight mb-4">What You&apos;ll<br />Receive</h3>
            <div className="space-y-3">
              {PERKS.map(p => (
                <div key={p.label} className="flex items-center gap-3 bg-white border-2 border-[#1A1A1A] rounded-2xl px-4 py-3">
                  <span className="text-lg shrink-0">{p.icon}</span>
                  <p className="font-body font-bold text-sm text-[#1A1A1A]">{p.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────── */}
      <section className="px-4 sm:px-8 xl:px-16 py-12 sm:py-16 border-t-4 border-[#1A1A1A]">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center border-2 border-[#1A1A1A] rounded-full px-4 py-2 mb-3" style={{ background: YELLOW }}>
            <p className="font-body font-black text-xs sm:text-sm text-[#1A1A1A] uppercase tracking-widest">Launch Offer</p>
          </div>
          <h2 className="font-heading text-[28px] sm:text-[40px] font-black text-[#1A1A1A] leading-tight mb-2">Simple Pricing</h2>
          <p className="font-body text-sm text-gray-500 mb-8">Limited early bird seats available. Price increases as seats fill up.</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {PRICING.map(tier => (
              <div key={tier.label}
                className={`rounded-3xl border-4 border-[#1A1A1A] p-6 flex flex-col gap-3 ${tier.highlight ? "" : "bg-white"}`}
                style={tier.highlight ? { background: PINK } : {}}>
                {tier.highlight && (
                  <span className="self-start font-body text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border-2 border-[#1A1A1A] bg-white">
                    Early Bird
                  </span>
                )}
                <div>
                  <p className="font-body text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A]/60 mb-1">{tier.label}</p>
                  <p className="font-heading text-4xl sm:text-5xl font-black text-[#1A1A1A]">{tier.price}</p>
                </div>
                <p className="font-body text-xs text-[#1A1A1A]/60">{tier.note}</p>
                {tier.highlight && (
                  <div className="mt-auto pt-2 border-t-2 border-[#1A1A1A]">
                    <p className="font-body text-[11px] font-bold text-[#1A1A1A]">⚠ Limited seats remaining</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOOLS ───────────────────────────────────── */}
      <section className="px-4 sm:px-8 xl:px-16 py-12 sm:py-16 border-t-4 border-[#1A1A1A]">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center border-2 border-[#1A1A1A] rounded-full px-4 py-2 mb-8" style={{ background: YELLOW }}>
            <p className="font-body font-black text-xs sm:text-sm text-[#1A1A1A] uppercase tracking-widest">Tools you&apos;ll work with</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {TOOLS.map((tool, i) => (
              <motion.div key={tool.name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.25, delay: i * 0.03 }}
                className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-3 sm:p-4 flex flex-col items-center gap-2 hover:shadow-[3px_3px_0px_#1A1A1A] transition-shadow duration-150">
                <tool.Icon size={28} style={{ color: tool.color }} />
                <p className="font-body font-black text-xs text-[#1A1A1A] text-center">{tool.name}</p>
                <p className="font-body text-[10px] text-gray-500 text-center leading-tight">{tool.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REGISTRATION FORM ───────────────────────── */}
      <section ref={formRef} className="px-4 sm:px-8 xl:px-16 py-12 sm:py-16 border-t-4 border-[#1A1A1A]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_460px] gap-10 lg:gap-12 items-start">
            {/* Left copy */}
            <div className="lg:sticky lg:top-24">
              <p className="font-body text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-3">Apply Now</p>
              <h2 className="font-heading text-[32px] sm:text-[44px] font-black text-[#1A1A1A] leading-[0.9] mb-4">
                Start your<br />
                <span className="inline-block px-2 -mx-1 rounded-sm" style={{ background: YELLOW }}>journey.</span>
              </h2>
              <p className="font-body text-sm text-gray-600 leading-relaxed mb-6 max-w-sm">
                Takes less than 2 minutes. We review every application personally — no automated rejections.
              </p>
              <div className="space-y-2.5">
                {[["1 month", "Structured program"], ["₹999*", "Launch offer price"], ["Remote", "Work from anywhere"], ["Certificate", "On completion"], ["1-1 Mentorship", "Personal guidance"]].map(([v, l]) => (
                  <div key={l} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-[#1A1A1A] flex items-center justify-center shrink-0" style={{ background: YELLOW }}>
                      <Check size={10} strokeWidth={3} color={BLACK} />
                    </div>
                    <span className="font-body text-sm text-[#1A1A1A]"><strong>{v}</strong> — {l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right form */}
            <div className="border-4 border-[#1A1A1A] rounded-3xl overflow-hidden bg-white shadow-[4px_4px_0px_#1A1A1A] sm:shadow-[6px_6px_0px_#1A1A1A]">
              <div className="px-5 sm:px-7 py-4 border-b-4 border-[#1A1A1A]" style={{ background: YELLOW }}>
                <p className="font-heading font-black text-[#1A1A1A] text-base sm:text-lg">Full Stack Web Dev with AI</p>
                <p className="font-body text-xs text-[#1A1A1A]/60 mt-0.5">Launch Offer · ₹999 for first 20 seats</p>
              </div>
              <RegistrationForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO CAN APPLY ───────────────────────────── */}
      <section className="px-4 sm:px-8 xl:px-16 py-12 sm:py-16 border-t-4 border-[#1A1A1A]">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border-2 border-[#1A1A1A] rounded-3xl p-5 sm:p-6 bg-white">
            <div className="inline-flex items-center border-2 border-[#1A1A1A] rounded-full px-3 py-1 mb-4" style={{ background: YELLOW }}>
              <p className="font-body font-black text-[11px] text-[#1A1A1A] uppercase tracking-wider">Who can apply?</p>
            </div>
            <p className="font-body text-sm text-gray-600 leading-relaxed">BCA, MCA, B.Tech, B.Sc CS, or any student interested in web development and AI. If you want to build practical skills that strengthen your resume and LinkedIn, this is for you.</p>
          </div>

          <div className="border-2 border-[#1A1A1A] rounded-3xl p-5 sm:p-6" style={{ background: PINK }}>
            <p className="font-body text-[11px] font-black uppercase tracking-widest text-[#1A1A1A]/60 mb-2">Duration</p>
            <p className="font-heading text-3xl sm:text-4xl font-black text-[#1A1A1A]">1 MONTH</p>
            <p className="font-body text-sm text-[#1A1A1A]/60 mt-1">Structured weekly program</p>
          </div>

          <div className="border-4 border-[#1A1A1A] rounded-3xl p-5 sm:p-6 bg-[#1A1A1A] flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <div>
              <p className="font-body text-[11px] font-black uppercase tracking-widest text-white/50 mb-1">Mode</p>
              <p className="font-heading text-2xl font-black text-white">REMOTE</p>
            </div>
            <div>
              <p className="font-body text-[11px] font-bold uppercase tracking-widest text-white/50 mb-2">Start your journey</p>
              <button onClick={scrollToForm}
                className="w-full py-3 rounded-2xl font-heading font-black text-[#1A1A1A] text-lg hover:opacity-90 transition-opacity cursor-pointer"
                style={{ background: YELLOW }}>
                APPLY NOW!
              </button>
              <p className="font-body text-[10px] text-white/40 text-center mt-2">luitstudio.com/internship</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────── */}
      <section className="px-4 sm:px-8 xl:px-16 py-12 sm:py-16 border-t-4 border-[#1A1A1A]">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">FAQ</p>
          <h2 className="font-heading text-[28px] sm:text-[40px] font-black text-[#1A1A1A] leading-tight mb-8">
            Questions & Answers
          </h2>
          <div className="space-y-2.5">
            {FAQS.map(item => <FAQItem key={item.q} item={item} />)}
          </div>
        </div>
      </section>

      {/* ── BOTTOM BAR ──────────────────────────────── */}
      <footer className="border-t-4 border-[#1A1A1A] bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 xl:px-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x-0 sm:divide-x-2 divide-[#1A1A1A]">
            {BOTTOM_BAR.map((item, i) => (
              <div key={item.label} className={`flex items-center gap-2.5 py-4 px-3 sm:px-4 ${i >= 2 ? "border-t-2 sm:border-t-0 border-[#1A1A1A]" : ""}`}>
                <span className="text-lg sm:text-xl">{item.icon}</span>
                <span className="font-body font-black text-[11px] sm:text-sm text-[#1A1A1A] uppercase tracking-wide">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </footer>

      <Footer />
    </main>
  );
}
