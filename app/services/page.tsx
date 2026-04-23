"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/* ================= DATA ================= */

const capabilities = [
  {
    title: "Cloud Systems",
    desc: "Scalable backend systems built for performance and reliability.",
    img: "/services/cloud.jpg",
  },
  {
    title: "Mobile First",
    desc: "Optimized mobile-first experiences across all devices.",
    img: "/services/mobile.jpg",
  },
  {
    title: "Analytics",
    desc: "Data-driven insights for smarter business decisions.",
    img: "/services/analytics.jpg",
  },
  {
    title: "Automation",
    desc: "Automate workflows and scale operations efficiently.",
    img: "/services/automation.jpg",
  },
  {
    title: "Security",
    desc: "Enterprise-grade security and infrastructure design.",
    img: "/services/security.jpg",
  },
];

const services = [
  { title: "Web Development", img: "/services/code.png" },
  { title: "UI/UX Design", img: "/services/uiux.png" },
  { title: "SEO Optimization", img: "/services/seo.png" },
  { title: "Social Media", img: "/services/social.png" },
  { title: "Performance Marketing", img: "/services/marketing.png" },
  { title: "Branding", img: "/services/branding.png" },
];

/* ================= COMPONENT ================= */

export default function ServicesPage() {
  return (
    <main className="overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative h-[85vh] flex items-center justify-center text-white">

        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-center px-6"
        >
          <h1 className="text-5xl md:text-7xl font-semibold leading-tight">
            What we <i>build</i>
          </h1>

          <p className="mt-6 text-gray-300 max-w-xl mx-auto text-lg">
            High-performance digital solutions designed to scale with your business.
          </p>
        </motion.div>
      </section>

      {/* ================= EXPERTISE ================= */}
      <section className="bg-[#f5f5f4] px-6 md:px-12 py-28">

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-20"
        >
          OUR{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            EXPERTISE
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[420px] rounded-2xl overflow-hidden"
          >
            <Image src="/services/payflow.png" alt="" fill className="object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex gap-2 flex-wrap mb-6">
              <span className="text-xs border px-3 py-1">APP DEVELOPMENT</span>
              <span className="text-xs border px-3 py-1">UI/UX</span>
              <span className="text-xs border px-3 py-1">WEB DEVELOPMENT</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-semibold mb-6 leading-snug">
              Crafting scalable digital experiences
            </h3>

            <p className="text-gray-600 text-lg max-w-md">
              We design and develop systems that are fast, reliable, and built for real-world scale.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ================= CAPABILITIES (SCROLL STORY) ================= */}
      <section className="bg-black text-white">

        {capabilities.map((item, i) => (
          <div
            key={i}
            className="min-h-[90vh] flex items-center border-b border-white/10"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-20 items-center">

              {/* TEXT */}
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-sm text-gray-400 mb-4">
                  0{i + 1}
                </p>

                <h2 className="text-4xl md:text-6xl font-semibold mb-6">
                  {item.title}
                </h2>

                <p className="text-gray-400 text-lg max-w-md">
                  {item.desc}
                </p>
              </motion.div>

              {/* IMAGE */}
              <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden"
              >
                <Image src={item.img} alt="" fill className="object-cover" />
              </motion.div>

            </div>
          </div>
        ))}

      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="bg-[#f5f5f4] px-6 md:px-12 py-32">

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">

          {services.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -15 }}
              className="group"
            >
              <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-lg">

                <Image
                  src={item.img}
                  alt=""
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition" />

                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-semibold">
                    {item.title}
                  </h3>
                </div>

              </div>
            </motion.div>
          ))}

        </div>

      </section>

      {/* ================= TESTIMONIAL ================= */}
      <section className="bg-black text-white px-6 md:px-12 py-28">

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl mb-10"
        >
          What our clients say
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white/10 p-8 rounded-2xl max-w-xl backdrop-blur"
        >
          <p className="text-gray-300 mb-4 text-lg">
            “The team delivered beyond expectations. Clean code, amazing UI.”
          </p>

          <p className="text-sm text-gray-400">
            — Product Manager, Startup
          </p>
        </motion.div>

      </section>

      {/* ================= CTA ================= */}
      <section className="bg-[#f5f5f4] px-6 md:px-12 py-32 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl mb-8"
        >
          Let’s build something that stands out
        </motion.h2>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-black text-white rounded-full text-lg"
        >
          Start a Project
        </motion.button>

      </section>

    </main>
  );
}