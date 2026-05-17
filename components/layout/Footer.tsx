"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
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
            className="flex-1 min-w-0 rounded-xl border border-gray-300/[0.8] bg-white/[0.7] px-4 py-2.5 text-sm text-gray-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] outline-none transition-colors duration-300 placeholder:text-gray-500 focus:border-[#06B6D4]/[0.6] focus:shadow-[0_0_0_3px_rgba(6,182,212,0.12),inset_0_1px_0_rgba(255,255,255,0.8)] dark:border-white/[0.13] dark:bg-white/[0.06] dark:text-white dark:placeholder:text-white/[0.35] dark:focus:border-[#67E8F9]/[0.45] font-body md:backdrop-blur-sm"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#EC4899] via-[#F472B6] to-[#06B6D4] flex items-center justify-center cursor-pointer disabled:opacity-60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(6,182,212,0.22),0_0_28px_rgba(236,72,153,0.2)]"
            aria-label="Subscribe"
          >
            {status === "loading"
              ? <span className="w-4 h-4 border-2 border-white/[0.3] border-t-white rounded-full animate-spin" />
              : <Send size={15} className="text-white" />
            }
          </button>
        </div>
      )}
    </form>
  );
}

type FooterProps = {
  variant?: "agency" | "internship";
};

export default function Footer({ variant = "agency" }: FooterProps) {
  const pathname = usePathname();
  const shouldReduce = useReducedMotion();
  const isInternship = variant === "internship";
  const isInternshipRoute = pathname === "/intern" || pathname.startsWith("/intern/");
  const hideProjectCTA = isInternship || isInternshipRoute;
  const showProjectCTA = !hideProjectCTA;
  const footerCopyVariant = hideProjectCTA ? "internship" : "agency";

  return (
    <footer className="relative overflow-hidden bg-[#f6f8fc] text-gray-900 transition-colors duration-300 dark:bg-[#050713] dark:text-white">

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#06B6D4]/[0.6] to-transparent shadow-[0_0_34px_rgba(6,182,212,0.35)]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#06B6D4]/10 via-[#EC4899]/5 to-transparent dark:from-[#06B6D4]/12 dark:via-[#EC4899]/8" />
        <motion.div
          className="absolute top-[-18%] left-[-12%] hidden h-[26rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.14),rgba(139,92,246,0.08)_38%,transparent_72%)] blur-[58px] md:block"
          animate={shouldReduce ? undefined : { x: [0, 18, 0], y: [0, 12, 0], opacity: [0.56, 0.78, 0.58] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-22%] right-[-12%] hidden h-[26rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.16),rgba(59,130,246,0.08)_42%,transparent_74%)] blur-[60px] md:block"
          animate={shouldReduce ? undefined : { x: [0, -18, 0], y: [0, -12, 0], opacity: [0.54, 0.82, 0.58] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-x-[-18%] bottom-[19%] hidden h-28 bg-[linear-gradient(90deg,transparent,rgba(6,182,212,0.1),rgba(236,72,153,0.1),transparent)] blur-[34px] md:block" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_36%,rgba(255,255,255,0.44)_80%,rgba(255,255,255,0.86)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(5,7,19,0.5)_78%,rgba(5,7,19,0.94)_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay dark:opacity-[0.13]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E\")" }} />
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(236,72,153,0.75) 1px, transparent 1px), radial-gradient(circle, rgba(6,182,212,0.55) 1px, transparent 1px)", backgroundSize: "58px 58px, 86px 86px" }}
        />
      </div>

      {/* ══ CTA BLOCK ══════════════════════════════ */}
      {showProjectCTA && (
        <div className="relative z-10 border-b border-transparent">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-300/[0.8] to-transparent dark:via-white/[0.12]" />
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-16 sm:py-20 md:py-24">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-xs tracking-[0.28em] uppercase text-[#BE185D] dark:text-[#F472B6] font-body font-semibold mb-5 drop-shadow-[0_0_18px_rgba(236,72,153,0.22)]"
              >
                Let&apos;s build together
              </motion.p>

              <div className="overflow-hidden mb-2">
                <motion.h2
                  initial={{ y: 72, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] as const }}
                  className="font-heading text-[36px] sm:text-[52px] md:text-[64px] font-black leading-[0.9] tracking-tight text-gray-950 dark:text-white drop-shadow-[0_18px_42px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_18px_46px_rgba(0,0,0,0.64)]"
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
                  className="font-heading text-[36px] sm:text-[52px] md:text-[64px] font-black leading-[0.9] tracking-tight bg-gradient-to-r from-[#EC4899] via-[#F472B6] to-[#06B6D4] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(236,72,153,0.22)]"
                >
                  something great?
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mt-6 text-gray-600 dark:text-white/[0.62] font-body text-base leading-relaxed max-w-md"
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
              <div className="bg-white/[0.82] dark:bg-white/[0.07] md:backdrop-blur-xl border border-white/[0.8] dark:border-white/[0.14] rounded-2xl p-7 sm:p-8 min-w-[280px] sm:min-w-[320px] shadow-[0_18px_46px_rgba(15,23,42,0.1),inset_0_1px_0_rgba(255,255,255,0.72)] dark:shadow-[0_20px_58px_rgba(0,0,0,0.38),0_0_34px_rgba(6,182,212,0.08),inset_0_1px_0_rgba(255,255,255,0.12)]">
                <div className="flex items-center gap-2 mb-5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                  </span>
                  <span className="text-xs text-gray-600 dark:text-white/[0.58] font-body uppercase tracking-widest font-semibold">
                    Accepting projects
                  </span>
                </div>

                <p className="font-heading text-lg font-bold text-gray-900 dark:text-white mb-1">
                  Let&apos;s start a conversation
                </p>
                <p className="text-sm text-gray-500 dark:text-white/[0.52] font-body mb-7">
                  Tell us about your idea — we respond within 24 hours.
                </p>

                <Link
                  href="/contact"
                  className="group w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#EC4899] via-[#F472B6] to-[#06B6D4] text-white rounded-xl font-body font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shadow-[0_16px_44px_rgba(236,72,153,0.28),0_0_28px_rgba(6,182,212,0.16)]"
                >
                  Start a project
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>

                <p className="text-center text-[11px] text-gray-400 dark:text-white/[0.32] font-body mt-4">
                  luitstudio.in@gmail.com
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      )}

      {/* ══ MAIN GRID ══════════════════════════════ */}
      <div className="relative z-10 border-b border-transparent">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-300/[0.8] to-transparent dark:via-white/[0.11]" />
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-14 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          <motion.div
            variants={fadeUp(0.05)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <p className="font-heading text-xl font-black text-gray-950 dark:text-white mb-2 drop-shadow-[0_12px_30px_rgba(0,0,0,0.14)] dark:drop-shadow-[0_12px_30px_rgba(0,0,0,0.55)]">
              Luit{" "}
              <span className="bg-gradient-to-r from-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
                Studio
              </span>
            </p>
            <p className="font-body text-sm text-gray-600 dark:text-white/[0.58] leading-relaxed mb-6 max-w-xs">
              {footerCopyVariant === "internship"
                ? "A modern internship experience for practical learning, live projects, mentorship, and portfolio-ready execution."
                : "A digital agency building high-performance websites, apps, and marketing systems for ambitious brands."}
            </p>
            <p className="font-body text-xs text-gray-500 dark:text-white/[0.46] uppercase tracking-widest mb-3 font-semibold">
              Stay in the loop
            </p>
            <NewsletterForm />
          </motion.div>

          <motion.div variants={fadeUp(0.1)} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-white/[0.42] mb-5">
              Navigation
            </p>
            <ul className="space-y-3">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group font-body text-sm text-gray-600 dark:text-white/[0.62] hover:text-gray-950 dark:hover:text-white transition-all duration-300 flex items-center gap-1.5"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[#EC4899] transition-all duration-300 shrink-0 shadow-[0_0_12px_rgba(236,72,153,0.5)]" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp(0.15)} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-white/[0.42] mb-5">
              Services
            </p>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="group font-body text-sm text-gray-600 dark:text-white/[0.62] hover:text-gray-950 dark:hover:text-white transition-all duration-300 flex items-center gap-1.5"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[#06B6D4] transition-all duration-300 shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.5)]" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-white/[0.42] mb-5">
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
                  className="group flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.65] dark:bg-white/[0.055] border border-gray-300/[0.7] dark:border-white/[0.12] hover:border-[#EC4899]/[0.45] dark:hover:border-[#EC4899]/[0.45] hover:bg-white/[0.9] dark:hover:bg-white/[0.085] transition-transform duration-300 cursor-pointer hover:-translate-y-0.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.58)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                >
                  <Icon size={14} className="text-gray-600 dark:text-white/[0.58] group-hover:text-[#EC4899] transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(236,72,153,0.45)]" />
                  <span className="font-body text-[11px] text-gray-600 dark:text-white/[0.56] group-hover:text-gray-950 dark:group-hover:text-white transition-colors duration-300">
                    {label.split(" ")[0]}
                  </span>
                </a>
              ))}
            </div>

            <div className="space-y-2">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-white/[0.42] mb-3">
                Get in touch
              </p>
              <a
                href="mailto:luitstudio.in@gmail.com"
                className="flex items-center gap-1.5 font-body text-sm text-gray-600 dark:text-white/[0.62] hover:text-[#EC4899] transition-colors duration-300"
              >
                <ArrowUpRight size={13} className="shrink-0" />
                luitstudio.in@gmail.com
              </a>
              <Link
                href={footerCopyVariant === "internship" ? "/intern#application-form" : "/contact"}
                className="flex items-center gap-1.5 font-body text-sm text-gray-600 dark:text-white/[0.62] hover:text-[#06B6D4] transition-colors duration-300"
              >
                <ArrowUpRight size={13} className="shrink-0" />
                {footerCopyVariant === "internship" ? "Apply for internship" : "Start a project"}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══ BRAND TEXT ═════════════════════════════ */}
      <div className="relative z-10 overflow-hidden py-8 sm:py-12 select-none [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]" aria-hidden="true">
        <div className="absolute inset-x-0 top-1/2 h-24 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.16),rgba(236,72,153,0.08)_42%,transparent_72%)] blur-2xl" />
        <p
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 font-heading font-black whitespace-nowrap px-5 sm:px-6 leading-none tracking-tight opacity-[0.15]"
          style={{
            fontSize: "clamp(58px, 14vw, 198px)",
            background: "linear-gradient(90deg, rgba(236,72,153,0.55), rgba(6,182,212,0.55), rgba(244,114,182,0.55))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          LUIT STUDIO
        </p>
        <p
          className="relative font-heading font-black whitespace-nowrap px-5 sm:px-6 leading-none tracking-[-0.03em]"
          style={{
            fontSize: "clamp(58px, 14vw, 198px)",
            background: "linear-gradient(90deg, rgba(236,72,153,0.26), rgba(244,114,182,0.18), rgba(6,182,212,0.26), rgba(236,72,153,0.2))",
            backgroundSize: "300% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "brandGradient 12s linear infinite",
            opacity: 0.72,
          }}
        >
          LUIT STUDIO
        </p>
      </div>

      {/* ══ BOTTOM BAR ═════════════════════════════ */}
      <div className="relative z-10 border-t border-transparent">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300/[0.8] to-transparent dark:via-white/[0.11]" />
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p suppressHydrationWarning className="font-body text-xs text-gray-500 dark:text-white/[0.38]">
            © {new Date().getFullYear()} Luit Studio. All rights reserved.
          </p>

          <div className="flex items-center gap-1.5 font-body text-xs text-gray-500 dark:text-white/[0.32]">
            <span>Crafted with</span>
            <span className="text-[#EC4899] animate-pulse">♥</span>
            <span>by Luit Studio</span>
          </div>

          <div className="flex gap-5 font-body text-xs text-gray-500 dark:text-white/[0.42]">
            <span className="hover:text-gray-950 dark:hover:text-white transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-gray-950 dark:hover:text-white transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-gray-950 dark:hover:text-white transition-colors cursor-pointer">Cookies</span>
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
