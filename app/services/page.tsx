"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Footer from "@/components/layout/Footer";
import { BLUR_DATA_URL, HERO_IMAGES, SERVICE_IMAGES } from "@/lib/site-images";

const capabilities = [
  { title: "Cloud Systems",  desc: "Scalable backend systems built for performance and reliability.",  img: SERVICE_IMAGES.cloud,      accent: "#06B6D4" },
  { title: "Mobile First",   desc: "Optimized mobile-first experiences across all devices.",           img: SERVICE_IMAGES.mobile,     accent: "#EC4899" },
  { title: "Analytics",      desc: "Data-driven insights for smarter business decisions.",             img: SERVICE_IMAGES.analytics,  accent: "#06B6D4" },
  { title: "Automation",     desc: "Automate workflows and scale operations efficiently.",              img: SERVICE_IMAGES.automation, accent: "#EC4899" },
  { title: "Security",       desc: "Enterprise-grade security and infrastructure design.",             img: SERVICE_IMAGES.security,   accent: "#06B6D4" },
];

const services = [
  { title: "Web Development",       img: SERVICE_IMAGES.code,      accent: "#EC4899" },
  { title: "UI/UX Design",          img: SERVICE_IMAGES.uiux,      accent: "#06B6D4" },
  { title: "SEO Optimization",      img: SERVICE_IMAGES.seo,       accent: "#EC4899" },
  { title: "Social Media",          img: SERVICE_IMAGES.social,    accent: "#06B6D4" },
  { title: "Performance Marketing", img: SERVICE_IMAGES.marketing, accent: "#EC4899" },
  { title: "Branding",              img: SERVICE_IMAGES.branding,  accent: "#06B6D4" },
];

export default function ServicesPage() {
  return (
    <main className="overflow-hidden bg-[#fafafa] dark:bg-[#08080f] text-gray-900 dark:text-white transition-colors duration-300">

      {/* Ambient glows */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-[-10%] hidden h-[380px] w-[460px] rounded-full bg-[#EC4899]/4 blur-[80px] md:block" />
        <div className="absolute bottom-0 right-[-10%] hidden h-[380px] w-[460px] rounded-full bg-[#06B6D4]/4 blur-[80px] md:block" />
      </div>

      {/* ── HERO ── */}
      <section className="relative h-[85vh] flex items-center justify-center">
        <Image
          src={HERO_IMAGES.cinematic}
          alt="Luit Studio services"
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#EC4899]/10 via-transparent to-[#06B6D4]/10" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 text-center px-5 sm:px-6"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#EC4899]" />
            <p className="font-body text-xs tracking-[0.28em] uppercase text-white/35">What we offer</p>
            <div className="h-px w-8 bg-gradient-to-r from-[#06B6D4] to-transparent" />
          </div>
          <h1 className="font-heading text-[36px] sm:text-[56px] md:text-[80px] font-black leading-[0.88] tracking-tight text-white">
            What we{" "}
            <em className="bg-gradient-to-r from-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent not-italic">
              build
            </em>
          </h1>
          <p className="mt-5 sm:mt-7 text-white/40 max-w-xl mx-auto text-sm sm:text-base md:text-lg font-body leading-relaxed">
            High-performance digital solutions designed to scale with your business.
          </p>
        </motion.div>
      </section>

      {/* ── EXPERTISE ── */}
      <section className="relative z-10 px-5 sm:px-6 md:px-12 py-24 md:py-32 border-t border-gray-100 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-gradient-to-r from-[#EC4899] to-transparent" />
            <p className="font-body text-xs tracking-[0.28em] uppercase text-gray-400 dark:text-white/35">Core expertise</p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading text-[30px] sm:text-[48px] md:text-[72px] font-black leading-[0.88] tracking-tight mb-12 sm:mb-16 text-gray-900 dark:text-white"
          >
            OUR{" "}
            <span className="bg-gradient-to-r from-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
              EXPERTISE
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 1.03 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[280px] sm:h-[360px] md:h-[420px] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/[0.08]"
            >
              <Image src={SERVICE_IMAGES.code} alt="Web and app development" fill sizes="(max-width: 768px) 100vw, 50vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} className="object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex gap-2 flex-wrap mb-6">
                {["APP DEVELOPMENT", "UI/UX", "WEB DEVELOPMENT"].map((tag) => (
                  <span key={tag} className="text-[10px] border border-gray-200 dark:border-white/[0.1] text-gray-500 dark:text-white/40 px-3 py-1 rounded-full font-body tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-heading text-[24px] sm:text-[32px] md:text-[40px] font-black leading-[0.92] tracking-tight mb-5 text-gray-900 dark:text-white">
                Crafting scalable digital experiences
              </h3>
              <p className="text-gray-500 dark:text-white/40 text-sm sm:text-base md:text-lg max-w-md font-body leading-relaxed">
                We design and develop systems that are fast, reliable, and built for real-world scale.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="relative z-10 border-t border-gray-100 dark:border-white/[0.06]">
        {capabilities.map((item, i) => (
          <div key={i} className="min-h-[70vh] sm:min-h-[80vh] flex items-center border-b border-gray-100 dark:border-white/[0.06]">
            <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 md:px-12 grid md:grid-cols-2 gap-10 md:gap-20 items-center py-16">

              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={i % 2 === 1 ? "md:order-2" : ""}
              >
                <p className="text-xs font-body tracking-[0.28em] uppercase mb-4" style={{ color: item.accent }}>0{i + 1}</p>
                <h2 className="font-heading text-[28px] sm:text-[40px] md:text-[56px] font-black leading-[0.88] tracking-tight mb-5 text-gray-900 dark:text-white">
                  {item.title}
                </h2>
                <p className="text-gray-500 dark:text-white/40 text-sm sm:text-base md:text-lg max-w-md font-body leading-relaxed">{item.desc}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 1.03 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`relative h-[220px] sm:h-[340px] md:h-[440px] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/[0.08] ${i % 2 === 1 ? "md:order-1" : ""}`}
              >
                <Image src={item.img} alt={item.title} fill sizes="(max-width: 768px) 100vw, 50vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} className="object-cover opacity-55" />
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ background: `radial-gradient(ellipse at 50% 100%, ${item.accent}40, transparent 70%)` }}
                />
              </motion.div>

            </div>
          </div>
        ))}
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="relative z-10 px-5 sm:px-6 md:px-12 py-24 md:py-32 border-t border-gray-100 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="h-px w-8 bg-gradient-to-r from-[#EC4899] to-transparent" />
            <p className="font-body text-xs tracking-[0.28em] uppercase text-gray-400 dark:text-white/35">Full service</p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading text-[28px] sm:text-[40px] md:text-[52px] font-black leading-[0.92] tracking-tight mb-10 sm:mb-14 text-gray-900 dark:text-white"
          >
            Our Services
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {services.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="group cursor-pointer"
              >
                <div className="relative h-[220px] sm:h-[260px] rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 dark:border-white/[0.08] dark:hover:border-white/[0.18] transition-colors duration-300">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover opacity-50 transition-all duration-500 group-hover:opacity-70 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: `radial-gradient(ellipse at 50% 100%, ${item.accent}18, transparent 70%)` }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <h3 className="font-heading text-base sm:text-lg font-bold text-white leading-tight">{item.title}</h3>
                  </div>
                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ background: `linear-gradient(to right, ${item.accent}, transparent)` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="relative z-10 px-5 sm:px-6 md:px-12 py-14 md:py-20 border-t border-gray-100 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-gradient-to-r from-[#EC4899] to-transparent" />
            <p className="font-body text-xs tracking-[0.28em] uppercase text-gray-400 dark:text-white/35">Social proof</p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-[28px] sm:text-[40px] md:text-[52px] font-black leading-[0.92] tracking-tight mb-10 text-gray-900 dark:text-white"
          >
            What our clients{" "}
            <span className="bg-gradient-to-r from-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
              say
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border bg-white border-gray-200 shadow-sm dark:bg-white/[0.03] dark:border-white/[0.08] dark:shadow-none p-6 sm:p-8 max-w-xl backdrop-blur-sm transition-colors duration-300"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#EC4899]/40 via-[#F472B6]/20 to-[#06B6D4]/40 rounded-t-2xl" />
            <p className="text-gray-700 dark:text-white/70 mb-5 text-sm sm:text-base md:text-lg font-body leading-relaxed">
              &ldquo;The team delivered beyond expectations. Clean code, amazing UI.&rdquo;
            </p>
            <p className="text-xs font-body" style={{ color: "#F472B6" }}>— Product Manager, Startup</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
