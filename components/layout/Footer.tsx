"use client";

import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Send, Check } from "lucide-react";
import { FaInstagram, FaLinkedinIn, FaGithub, FaXTwitter } from "react-icons/fa6";

const NAV = [
  { label: "Home",     href: "/"         },
  { label: "Work",     href: "/work"     },
  { label: "About",    href: "/about"    },
  { label: "Services", href: "/services" },
  { label: "Contact",  href: "/contact"  },
];

const SERVICES = [
  "Web Development", "App Development", "UI/UX Design",
  "SEO & Growth", "Performance Marketing", "Branding",
];

const SOCIALS = [
  { icon: FaInstagram,  href: "https://instagram.com", label: "Instagram" },
  { icon: FaXTwitter,   href: "https://twitter.com",   label: "X / Twitter" },
  { icon: FaLinkedinIn, href: "https://linkedin.com",  label: "LinkedIn"  },
  { icon: FaGithub,     href: "https://github.com",    label: "GitHub"    },
];

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 32 },
  show:    { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as const as [number,number,number,number] } },
});

function NewsletterForm() {
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status !== "idle") return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("done");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      {status === "done" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 text-sm text-[#06B6D4] font-body"
        >
          <Check size={16} /> <span>You&apos;re on the list!</span>
        </motion.div>
      ) : (
        <div className="flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 min-w-0 bg-black/[0.04] dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/25 font-body outline-none focus:border-[#EC4899]/50 transition-colors duration-200"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#EC4899] to-[#06B6D4] flex items-center justify-center cursor-pointer disabled:opacity-60 transition-opacity hover:opacity-90"
            aria-label="Subscribe"
          >
            {status === "loading"
              ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <Send size={15} className="text-white" />
            }
          </button>
        </div>
      )}
    </form>
  );
}

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <footer className="relative bg-gray-50 dark:bg-[#06060e] text-gray-900 dark:text-white overflow-hidden border-t border-gray-200 dark:border-white/[0.06] transition-colors duration-300">

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-[-10%] w-[500px] h-[400px] bg-[#EC4899]/5 dark:bg-[#EC4899]/6 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-[-10%] w-[400px] h-[400px] bg-[#06B6D4]/5 dark:bg-[#06B6D4]/6 blur-[100px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]"
          style={{ backgroundImage: "radial-gradient(circle, #EC4899 1px, transparent 1px)", backgroundSize: "38px 38px" }}
        />
      </div>

      {/* ══ CTA BLOCK ══════════════════════════════ */}
      <div className="relative z-10 border-b border-gray-200 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-16 sm:py-20 md:py-24">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-xs tracking-[0.28em] uppercase text-[#EC4899] font-body mb-5"
              >
                Let&apos;s build together
              </motion.p>

              <div className="overflow-hidden mb-2">
                <motion.h2
                  initial={{ y: 72, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] as const }}
                  className="font-heading text-[36px] sm:text-[52px] md:text-[64px] font-black leading-[0.9] tracking-tight text-gray-900 dark:text-white"
                >
                  Ready to build
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: 72, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.75, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] as const }}
                  className="font-heading text-[36px] sm:text-[52px] md:text-[64px] font-black leading-[0.9] tracking-tight bg-gradient-to-r from-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent"
                >
                  something great?
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mt-6 text-gray-500 dark:text-white/45 font-body text-base leading-relaxed max-w-md"
              >
                We take on a limited number of projects each quarter to ensure
                every client gets our full focus and best work.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="shrink-0"
            >
              <div className="bg-white dark:bg-white/[0.04] backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-2xl p-7 sm:p-8 min-w-[280px] sm:min-w-[320px] shadow-sm dark:shadow-none">
                <div className="flex items-center gap-2 mb-5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                  </span>
                  <span className="text-xs text-gray-400 dark:text-white/40 font-body uppercase tracking-widest">
                    Accepting projects
                  </span>
                </div>

                <p className="font-heading text-lg font-bold text-gray-900 dark:text-white mb-1">
                  Let&apos;s start a conversation
                </p>
                <p className="text-sm text-gray-400 dark:text-white/40 font-body mb-7">
                  Tell us about your idea — we respond within 24 hours.
                </p>

                <Link
                  href="/contact"
                  className="group w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#EC4899] to-[#06B6D4] text-white rounded-xl font-body font-semibold text-sm hover:opacity-90 transition-opacity duration-200 cursor-pointer shadow-[0_0_24px_rgba(236,72,153,0.35)]"
                >
                  Start a project
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>

                {mounted && (
                  <p className="text-center text-[11px] text-gray-300 dark:text-white/20 font-body mt-4">
                    hello@luitstudio.com
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══ MAIN GRID ══════════════════════════════ */}
      <div className="relative z-10 border-b border-gray-200 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-14 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          <motion.div
            variants={fadeUp(0.05)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <p className="font-heading text-xl font-black text-gray-900 dark:text-white mb-2">
              Luit{" "}
              <span className="bg-gradient-to-r from-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
                Studio
              </span>
            </p>
            <p className="font-body text-sm text-gray-400 dark:text-white/35 leading-relaxed mb-6 max-w-xs">
              A digital agency building high-performance websites, apps, and marketing systems for ambitious brands.
            </p>
            <p className="font-body text-xs text-gray-400 dark:text-white/40 uppercase tracking-widest mb-3">
              Stay in the loop
            </p>
            <NewsletterForm />
          </motion.div>

          <motion.div variants={fadeUp(0.1)} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-white/30 mb-5">
              Navigation
            </p>
            <ul className="space-y-3">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group font-body text-sm text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[#EC4899] transition-all duration-200 shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp(0.15)} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-white/30 mb-5">
              Services
            </p>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="group font-body text-sm text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[#06B6D4] transition-all duration-200 shrink-0" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-white/30 mb-5">
              Follow us
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-gray-200 dark:border-white/8 hover:border-[#EC4899]/40 hover:bg-[#EC4899]/5 transition-all duration-200 cursor-pointer"
                >
                  <Icon size={14} className="text-gray-400 dark:text-white/40 group-hover:text-[#EC4899] transition-colors duration-200" />
                  <span className="font-body text-[11px] text-gray-400 dark:text-white/35 group-hover:text-gray-700 dark:group-hover:text-white/60 transition-colors duration-200">
                    {label.split(" ")[0]}
                  </span>
                </a>
              ))}
            </div>

            <div className="space-y-2">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-white/30 mb-3">
                Get in touch
              </p>
              <a
                href="mailto:hello@luitstudio.com"
                className="flex items-center gap-1.5 font-body text-sm text-gray-500 dark:text-white/45 hover:text-[#EC4899] transition-colors duration-200"
              >
                <ArrowUpRight size={13} className="shrink-0" />
                hello@luitstudio.com
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-1.5 font-body text-sm text-gray-500 dark:text-white/45 hover:text-[#06B6D4] transition-colors duration-200"
              >
                <ArrowUpRight size={13} className="shrink-0" />
                Start a project
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══ BRAND TEXT ═════════════════════════════ */}
      <div className="relative z-10 overflow-hidden py-10 sm:py-14 select-none" aria-hidden="true">
        <p
          className="font-heading font-black whitespace-nowrap px-5 sm:px-6 leading-none tracking-tight"
          style={{
            fontSize: "clamp(64px, 14vw, 220px)",
            background: "linear-gradient(90deg, #EC4899, #F472B6, #06B6D4, #EC4899)",
            backgroundSize: "300% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "brandGradient 6s linear infinite",
            opacity: 0.1,
          }}
        >
          LUIT STUDIO
        </p>
      </div>

      {/* ══ BOTTOM BAR ═════════════════════════════ */}
      <div className="relative z-10 border-t border-gray-200 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p suppressHydrationWarning className="font-body text-xs text-gray-400 dark:text-white/20">
            © {new Date().getFullYear()} Luit Studio. All rights reserved.
          </p>

          <div className="flex items-center gap-1.5 font-body text-xs text-gray-300 dark:text-white/15">
            <span>Crafted with</span>
            <span className="text-[#EC4899] animate-pulse">♥</span>
            <span>by Luit Studio</span>
          </div>

          <div className="flex gap-5 font-body text-xs text-gray-400 dark:text-white/25">
            <span className="hover:text-gray-900 dark:hover:text-white/50 transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-gray-900 dark:hover:text-white/50 transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-gray-900 dark:hover:text-white/50 transition-colors cursor-pointer">Cookies</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes brandGradient {
          0%   { background-position: 0%   50%; }
          100% { background-position: 300% 50%; }
        }
      `}</style>
    </footer>
  );
}
