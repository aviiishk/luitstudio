"use client";

import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { usePopup } from "@/hooks/usePopup";

export const ENABLE_INTERNSHIP_POPUP = true;

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const FORM_TARGET_ID = "application-form";
const SCROLL_INTENT_KEY = "internship-popup-scroll-target";

export type PopupCTAContent = {
  badge: string;
  heading: string;
  subheading: string;
  ctaLabel: string;
  microcopy: string;
  trustPills: string[];
};

const defaultContent: PopupCTAContent = {
  badge: "SUMMER INTERNSHIP 2026",
  heading: "Ready to start building real-world digital skills?",
  subheading: "Join a modern internship experience focused on practical learning, live projects, mentorship, and portfolio-ready execution.",
  ctaLabel: "Apply Now",
  microcopy: "Limited seats available • Applications reviewed personally",
  trustPills: ["Beginner Friendly", "Remote", "Project Based", "Portfolio Focused"],
};

type PopupCTAProps = {
  enabled?: boolean;
  content?: Partial<PopupCTAContent>;
  targetId?: string;
};

type PopupModalProps = {
  isOpen: boolean;
  labelledBy: string;
  onClose: () => void;
  children: ReactNode;
};

function scrollToTarget(targetId: string) {
  document.getElementById(targetId)?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

export function PopupModal({ isOpen, labelledBy, onClose, children }: PopupModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledBy}
          className="fixed inset-0 z-[300] flex items-center justify-center overflow-y-auto px-4 py-6 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: EASE }}
          onMouseDown={onClose}
        >
          <div className="fixed inset-0 bg-[#03030a]/75 backdrop-blur-xl" aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="relative w-full max-w-3xl"
            onMouseDown={event => event.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const PopupCTA = ({
  enabled = ENABLE_INTERNSHIP_POPUP,
  content,
  targetId = FORM_TARGET_ID,
}: PopupCTAProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, close } = usePopup({
    enabled,
    storageKey: "internship-popup-dismissed",
    delayMs: 1700,
    scrollThreshold: 140,
  });
  const mergedContent = { ...defaultContent, ...content };

  useEffect(() => {
    if (pathname !== "/intern") return;
    if (sessionStorage.getItem(SCROLL_INTENT_KEY) !== "true") return;

    sessionStorage.removeItem(SCROLL_INTENT_KEY);
    window.setTimeout(() => scrollToTarget(targetId), 220);
  }, [pathname, targetId]);

  const handleApply = () => {
    close();

    if (document.getElementById(targetId)) {
      scrollToTarget(targetId);
      return;
    }

    sessionStorage.setItem(SCROLL_INTENT_KEY, "true");
    router.push("/intern");
  };

  if (!enabled) return null;

  return (
    <PopupModal isOpen={isOpen} labelledBy="internship-popup-title" onClose={close}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-gradient-to-br from-[#EC4899]/15 via-transparent to-[#06B6D4]/15 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EC4899]/[0.08] blur-[95px]" />

      <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-[#0e0e1a]/95 px-5 py-8 text-center shadow-[0_32px_100px_rgba(0,0,0,0.62)] backdrop-blur-xl sm:px-9 sm:py-11">
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#EC4899]/65 to-transparent" />
        <div className="absolute inset-x-12 bottom-0 h-px bg-gradient-to-r from-transparent via-[#06B6D4]/45 to-transparent" />

        <button
          type="button"
          aria-label="Close popup"
          onClick={close}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/40 transition-all duration-200 hover:border-white/[0.16] hover:bg-white/[0.08] hover:text-white"
        >
          <X size={16} />
        </button>

        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.05] px-4 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
          <span className="font-body text-[10px] uppercase tracking-[0.2em] text-white/50 sm:text-[11px]">
            {mergedContent.badge}
          </span>
        </div>

        <h2 id="internship-popup-title" className="mx-auto max-w-2xl font-heading text-[28px] font-black leading-tight tracking-tight text-white sm:text-[42px]">
          {mergedContent.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-white/42 sm:text-base">
          {mergedContent.subheading}
        </p>

        <div className="mt-8 flex flex-col items-center">
          <button
            type="button"
            onClick={handleApply}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#06B6D4] px-7 py-3.5 font-body text-sm font-semibold text-white shadow-[0_18px_42px_rgba(236,72,153,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(6,182,212,0.22)] sm:w-auto"
          >
            {mergedContent.ctaLabel}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
          <p className="mt-4 font-body text-xs text-white/32">{mergedContent.microcopy}</p>
        </div>

        <div className="mx-auto mt-7 grid max-w-3xl grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {mergedContent.trustPills.map(item => (
            <div
              key={item}
              className="flex items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-2 font-body text-xs text-white/48"
            >
              <Check size={13} className="text-[#06B6D4]" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </PopupModal>
  );
};

export default PopupCTA;
