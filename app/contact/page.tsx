"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle, Loader2 } from "lucide-react";
import Footer from "@/components/layout/Footer";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

const SERVICE_OPTIONS = ["Website Design", "UI/UX", "Development", "SEO", "Branding", "Other"];

export default function ContactPage() {
  const [form, setForm]         = useState({ name: "", email: "", message: "" });
  const [services, setServices] = useState<string[]>([]);
  const [status, setStatus]     = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const toggleService = (item: string) =>
    setServices((prev) =>
      prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, services }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setFeedback(data.error ?? "Something went wrong. Please try again.");
      } else {
        setStatus("success");
        setFeedback(data.message);
      }
    } catch {
      setStatus("error");
      setFeedback("Network error. Please check your connection and try again.");
    }
  };

  return (
    <main className="relative min-h-screen bg-[#fafafa] dark:bg-[#08080f] text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">

      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #EC4899 1px, transparent 1px),
              linear-gradient(to bottom, #EC4899 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#EC4899]/5 via-transparent to-[#06B6D4]/5 dark:from-[#EC4899]/10 dark:to-[#06B6D4]/10" />
        <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] bg-[#EC4899]/10 dark:bg-[#EC4899]/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-80px] right-[-80px] w-[400px] h-[400px] bg-[#06B6D4]/10 dark:bg-[#06B6D4]/20 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10">
        <section className="px-4 sm:px-6 pt-24 pb-12 md:pt-32 md:pb-14 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="w-full max-w-6xl bg-gradient-to-br from-[#EC4899] to-[#06B6D4] rounded-2xl p-[2px] shadow-[0_24px_80px_rgba(236,72,153,0.2)] dark:shadow-[0_40px_120px_rgba(236,72,153,0.3)]"
          >
            <div className="bg-white dark:bg-[#0d0d18] rounded-[14px] overflow-hidden grid grid-cols-1 md:grid-cols-2">

              {/* ── FORM SIDE ── */}
              <div className="bg-white dark:bg-[#0f0a1a] px-5 py-8 sm:px-6 md:p-12 border-r border-gray-100 dark:border-white/[0.06]">

                <motion.div {...fadeUp(0.15)}>
                  <p className="text-xs sm:text-sm text-[#EC4899] mb-3 sm:mb-4 font-body tracking-widest uppercase">
                    Luit Studios
                  </p>
                  <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
                    Get in Touch
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-white/60 mb-8 sm:mb-10 font-body">
                    Tell us about your idea — we&apos;ll turn it into reality.
                  </p>
                </motion.div>

                {/* Success state */}
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center text-center py-10 gap-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/30 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-[#06B6D4]" />
                    </div>
                    <h2 className="font-heading text-xl font-semibold text-gray-900 dark:text-white">Message sent!</h2>
                    <p className="text-gray-500 dark:text-white/60 font-body text-sm max-w-xs">{feedback}</p>
                    <button
                      onClick={() => { setStatus("idle"); setForm({ name: "", email: "", message: "" }); setServices([]); }}
                      className="mt-2 px-6 py-2.5 rounded-full border border-[#EC4899]/40 text-[#EC4899] hover:bg-[#EC4899]/10 transition-colors duration-200 font-body text-sm cursor-pointer"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7" noValidate>

                    {[
                      { key: "name",  label: "Name",  type: "text",  placeholder: "Your name",     delay: 0.25 },
                      { key: "email", label: "Email", type: "email", placeholder: "you@email.com",  delay: 0.32 },
                    ].map(({ key, label, type, placeholder, delay }) => (
                      <motion.div key={key} {...fadeUp(delay)}>
                        <label htmlFor={key} className="text-xs sm:text-sm text-gray-500 dark:text-white/70 font-body block mb-2">
                          {label}
                        </label>
                        <input
                          id={key}
                          type={type}
                          placeholder={placeholder}
                          value={form[key as keyof typeof form]}
                          onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                          required
                          className="w-full bg-transparent border-b border-gray-200 dark:border-white/20 focus:border-[#EC4899] outline-none py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 font-body transition-colors duration-200"
                        />
                      </motion.div>
                    ))}

                    <motion.div {...fadeUp(0.38)}>
                      <label htmlFor="message" className="text-xs sm:text-sm text-gray-500 dark:text-white/70 font-body block mb-2">
                        How can we help?
                      </label>
                      <textarea
                        id="message"
                        rows={3}
                        placeholder="Tell us about your project..."
                        value={form.message}
                        onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                        required
                        className="w-full bg-transparent border-b border-gray-200 dark:border-white/20 focus:border-[#EC4899] outline-none py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 font-body resize-none transition-colors duration-200"
                      />
                    </motion.div>

                    <motion.div {...fadeUp(0.44)}>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-white/70 mb-3 font-body">
                        What do you need help with?
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-sm font-body">
                        {SERVICE_OPTIONS.map((item) => (
                          <label key={item} className="flex items-center gap-3 cursor-pointer py-1 text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white transition-colors">
                            <input
                              type="checkbox"
                              checked={services.includes(item)}
                              onChange={() => toggleService(item)}
                              className="accent-[#EC4899] w-4 h-4 shrink-0"
                            />
                            {item}
                          </label>
                        ))}
                      </div>
                    </motion.div>

                    {status === "error" && feedback && (
                      <p className="text-sm text-red-500 dark:text-red-400 font-body bg-red-50 dark:bg-red-400/10 border border-red-200 dark:border-red-400/20 rounded-lg px-4 py-3">
                        {feedback}
                      </p>
                    )}

                    <motion.button
                      {...fadeUp(0.5)}
                      whileHover={status !== "loading" ? { scale: 1.02 } : {}}
                      whileTap={status !== "loading" ? { scale: 0.98 } : {}}
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full mt-4 bg-gradient-to-r from-[#EC4899] to-[#06B6D4] text-white py-3.5 rounded-xl font-body font-semibold hover:opacity-90 transition-opacity duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(236,72,153,0.3)]"
                    >
                      {status === "loading" ? (
                        <><Loader2 size={18} className="animate-spin" /> Sending…</>
                      ) : (
                        "Let's get started →"
                      )}
                    </motion.button>

                  </form>
                )}
              </div>

              {/* ── VISUAL SIDE ── */}
              <div className="relative hidden md:block min-h-[500px]">
                <Image
                  src="/hero/contact-visual.png"
                  alt="Contact Luit Studio"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#EC4899]/20 to-transparent" />
              </div>

            </div>
          </motion.div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
