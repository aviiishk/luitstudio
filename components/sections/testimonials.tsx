"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Founder",
    company: "StartupX",
    content:
      "Luit Studios completely transformed our digital presence. The UI and performance exceeded our expectations.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Ayesha Khan",
    role: "Marketing Head",
    company: "GrowthLab",
    content:
      "From branding to execution, everything was handled flawlessly. Highly recommended!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Michael D",
    role: "Product Manager",
    company: "InnovateTech",
    content:
      "The team delivered beyond expectations. Clean code, premium UI, and amazing support.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  // ✅ auto rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-black text-white py-28 px-6 overflow-hidden">

      {/* 🌈 BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">

        {/* glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full" />

        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* 🧠 LEFT (FIXED) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-20"
        >
          <div className="space-y-6 max-w-md">

            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/10 backdrop-blur-md">
              <Star className="mr-1 h-4 w-4 fill-white" />
              Trusted globally
            </div>

            <h2 className="text-4xl md:text-6xl tracking-tight leading-[1.1]">
              What our clients
              <br />
              say
            </h2>

            <p className="text-white/60">
              Real experiences from people who trusted Luit Studios.
            </p>

            {/* DOTS */}
            <div className="flex gap-3 pt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2.5 rounded-full transition-all ${active === i
                      ? "w-10 bg-white"
                      : "w-2.5 bg-white/30"
                    }`}
                />
              ))}
            </div>

          </div>
        </motion.div>

        {/* 🎬 RIGHT */}
        <div className="relative h-[380px]">

          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 100 }}
              animate={{
                opacity: active === i ? 1 : 0,
                x: active === i ? 0 : 100,
                scale: active === i ? 1 : 0.95,
              }}
              transition={{ duration: 0.5 }}
              style={{ zIndex: active === i ? 10 : 0 }}
            >

              {/* 🔥 CARD */}
              <div className="relative rounded-2xl p-[1px] overflow-hidden">

                {/* animated border */}
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.15),rgba(255,255,255,0.02),rgba(255,255,255,0.15))] bg-[length:200%_200%] animate-[borderMove_6s_linear_infinite]" />

                {/* content */}
                <div className="relative bg-black border border-white/10 rounded-2xl p-8 h-full flex flex-col">

                  {/* ⭐ */}
                  <div className="flex gap-2 mb-6">
                    {Array(t.rating)
                      .fill(0)
                      .map((_, idx) => (
                        <Star
                          key={idx}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                  </div>

                  {/* 💬 */}
                  <div className="relative flex-1 mb-6">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-white/20 rotate-180" />
                    <p className="text-lg leading-relaxed">
                      "{t.content}"
                    </p>
                  </div>

                  {/* 👤 */}
                  <div className="flex items-center gap-4 mt-auto">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border border-white/20"
                    />
                    <div>
                      <h3 className="font-semibold">{t.name}</h3>
                      <p className="text-sm text-white/60">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </motion.div>
          ))}

        </div>

      </div>

      {/* 🔥 KEYFRAME */}
      <style jsx>{`
        @keyframes borderMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>

    </section>
  );
}