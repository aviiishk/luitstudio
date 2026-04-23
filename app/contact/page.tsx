"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden">

      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 z-0">

        <div className="absolute inset-0 bg-[#020617]" />

        <div className="absolute inset-0 
          bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),
              linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]
          bg-[size:40px_40px]"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-purple-900/30" />

        {/* responsive glow */}
        <div className="absolute top-[-120px] left-[-120px] w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-blue-500/30 blur-[140px] md:blur-[180px] rounded-full" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-purple-500/30 blur-[140px] md:blur-[180px] rounded-full" />

      </div>

      <div className="relative z-10">
        <Navbar />

        {/* ================= SECTION ================= */}
        <section className="px-4 sm:px-6 py-20 md:py-32 flex justify-center">

          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
            className="w-full max-w-6xl bg-gradient-to-br from-[#1e3a8a] to-[#4f46e5] 
            rounded-2xl p-2 sm:p-3 md:p-4 shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
          >

            {/* CARD */}
            <div className="bg-white rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

              {/* ================= FORM ================= */}
              <div className="bg-[#1e3a8a] px-5 py-8 sm:px-6 md:p-12 text-white">

                <motion.div variants={fadeUp}>
                  <p className="text-xs sm:text-sm opacity-70 mb-3 sm:mb-4">
                    Luit Studios
                  </p>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
                    Get in Touch
                  </h1>

                  <p className="text-xs sm:text-sm opacity-80 mb-8 sm:mb-10">
                    Tell us about your idea — we’ll turn it into reality.
                  </p>
                </motion.div>

                <form className="space-y-7 sm:space-y-6">

                  {/* NAME */}
                  <motion.div variants={fadeUp}>
                    <label className="text-xs sm:text-sm opacity-80">Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full mt-2 bg-transparent border-b border-white/40 
                      focus:border-white outline-none py-3 text-sm 
                      placeholder:text-white/40"
                    />
                  </motion.div>

                  {/* EMAIL */}
                  <motion.div variants={fadeUp}>
                    <label className="text-xs sm:text-sm opacity-80">Email</label>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      className="w-full mt-2 bg-transparent border-b border-white/40 
                      focus:border-white outline-none py-3 text-sm 
                      placeholder:text-white/40"
                    />
                  </motion.div>

                  {/* MESSAGE */}
                  <motion.div variants={fadeUp}>
                    <label className="text-xs sm:text-sm opacity-80">
                      How can we help?
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your project..."
                      className="w-full mt-2 bg-transparent border-b border-white/40 
                      focus:border-white outline-none py-3 text-sm 
                      placeholder:text-white/40 resize-none"
                    />
                  </motion.div>

                  {/* CHECKBOX */}
                  <motion.div variants={fadeUp}>
                    <p className="text-xs sm:text-sm opacity-80 mb-3">
                      What do you need help with?
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

                      {[
                        "Website Design",
                        "UI/UX",
                        "Development",
                        "SEO",
                        "Branding",
                        "Other",
                      ].map((item) => (
                        <label
                          key={item}
                          className="flex items-center gap-3 cursor-pointer py-1"
                        >
                          <input type="checkbox" className="accent-white" />
                          {item}
                        </label>
                      ))}

                    </div>
                  </motion.div>

                  {/* BUTTON */}
                  <motion.button
                    variants={fadeUp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full mt-8 bg-white text-black py-3.5 rounded-lg font-medium hover:bg-gray-200 transition"
                  >
                    Let’s get started
                  </motion.button>

                </form>
              </div>

              {/* ================= IMAGE ================= */}
              <div className="relative hidden md:block min-h-[500px]">

                <Image
                  src="/hero/contact-visual.png"
                  alt="Contact Visual"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />

              </div>

            </div>

          </motion.div>

        </section>

        <Footer />
      </div>

    </main>
  );
}