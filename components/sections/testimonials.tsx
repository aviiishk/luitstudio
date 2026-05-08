"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1, name: "Rahul Sharma",  role: "Founder",         company: "StartupX",
    content: "Luit Studios completely transformed our digital presence. The UI and performance exceeded our expectations.",
    rating: 5, avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2, name: "Ayesha Khan",   role: "Marketing Head",  company: "GrowthLab",
    content: "From branding to execution, everything was handled flawlessly. Highly recommended!",
    rating: 5, avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3, name: "Michael D",     role: "Product Manager", company: "InnovateTech",
    content: "The team delivered beyond expectations. Clean code, premium UI, and amazing support.",
    rating: 5, avatar: "https://randomuser.me/api/portraits/men/46.jpg",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative bg-[#fafafa] dark:bg-[#08080f] text-gray-900 dark:text-white pt-20 pb-14 sm:pt-24 sm:pb-16 px-5 sm:px-6 overflow-hidden border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">

      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-[#EC4899]/6 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-[#06B6D4]/6 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 sm:gap-16 items-center">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-gradient-to-r from-[#EC4899] to-transparent" />
            <p className="font-body text-xs tracking-[0.28em] uppercase text-gray-400 dark:text-white/35">Social proof</p>
          </div>

          <h2 className="font-heading text-[34px] sm:text-[46px] md:text-[56px] font-black leading-[0.92] tracking-tight mb-4">
            What our clients
            <br />
            <span className="bg-gradient-to-r from-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
              say
            </span>
          </h2>

          <p className="font-body text-sm text-gray-400 dark:text-white/38 mb-8 max-w-sm">
            Real experiences from people who trusted Luit Studios with their digital presence.
          </p>

          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#EC4899]/20 bg-[#EC4899]/5 mb-8">
            <Star className="h-3.5 w-3.5 fill-[#EC4899] text-[#EC4899]" />
            <span className="font-body text-xs text-[#F472B6]">5.0 average across all projects</span>
          </div>

          {/* Dots */}
          <div className="flex gap-2.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  active === i ? "w-8 bg-[#06B6D4]" : "w-2 bg-gray-300 dark:bg-white/15 hover:bg-gray-400 dark:hover:bg-white/30"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Right — cards */}
        <div className="relative min-h-[320px] sm:min-h-[360px]">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 64 }}
              animate={{ opacity: active === i ? 1 : 0, x: active === i ? 0 : 64, scale: active === i ? 1 : 0.97 }}
              transition={{ duration: 0.42, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ zIndex: active === i ? 10 : 0 }}
            >
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/[0.08] bg-white shadow-sm dark:bg-white/[0.03] dark:shadow-none h-full flex flex-col p-5 sm:p-7">
                {/* Subtle gradient top border */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#EC4899]/40 via-[#F472B6]/20 to-[#06B6D4]/40" />

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array(t.rating).fill(0).map((_, idx) => (
                    <Star key={idx} className="h-3.5 w-3.5 fill-[#EC4899] text-[#EC4899]" />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative flex-1 mb-6">
                  <Quote className="absolute -top-1 -left-1 h-6 w-6 text-[#EC4899]/15 rotate-180" />
                  <p className="text-sm sm:text-base leading-relaxed font-body text-gray-700 dark:text-white/75 pl-3">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3.5 mt-auto pt-4 border-t border-gray-100 dark:border-white/[0.06]">
                  <Image
                    src={t.avatar} alt={t.name}
                    width={40} height={40}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-white/12"
                  />
                  <div>
                    <h3 className="font-heading font-semibold text-sm text-gray-900 dark:text-white">{t.name}</h3>
                    <p className="font-body text-xs text-gray-400 dark:text-white/35">{t.role}, {t.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
