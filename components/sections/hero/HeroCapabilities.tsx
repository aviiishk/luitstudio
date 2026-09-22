"use client";

import { motion, useReducedMotion } from "framer-motion";

import { services, type ServiceData } from "@/components/sections/services/service-data";

const MARQUEE_DURATION = 32;

function CapabilityPill({ service }: { service: ServiceData }) {
  const Icon = service.icon;

  return (
    <li className="border-border bg-surface flex shrink-0 items-center gap-2.5 rounded-full border px-5 py-2.5">
      <span
        aria-hidden="true"
        className="grid size-7 shrink-0 place-items-center rounded-full"
        style={{
          backgroundColor: `${service.accentColor}1a`,
          color: service.accentColor,
        }}
      >
        <Icon size={16} strokeWidth={2} />
      </span>
      <span className="text-ink text-sm font-medium whitespace-nowrap">
        {service.title}
      </span>
    </li>
  );
}

export function HeroCapabilities() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div aria-hidden="true" className="mt-14 sm:mt-16">
        <ul className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3 px-5">
          {services.map((service) => (
            <CapabilityPill key={service.id} service={service} />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] sm:mt-16"
    >
      <motion.ul
        className="flex w-max items-center gap-3"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: MARQUEE_DURATION,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...services, ...services].map((service, index) => (
          <CapabilityPill key={`${service.id}-${index}`} service={service} />
        ))}
      </motion.ul>
    </div>
  );
}
