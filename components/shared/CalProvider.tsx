"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

import { calConfig } from "@/config/cal";

let calApiPromise: ReturnType<typeof getCalApi> | null = null;

function initCal() {
  calApiPromise ??= getCalApi({ namespace: calConfig.namespace }).then(
    (cal) => {
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: "light",
      });
      return cal;
    },
  );
  return calApiPromise;
}

/**
 * Loads the Cal.com embed script lazily, on hover/focus intent over a
 * [data-cal-link] trigger, rather than on every page load. Cal's embed
 * script sets a Cloudflare __cf_bm cookie the instant it's requested, which
 * Lighthouse flags on every page view if loaded eagerly — deferring it
 * until real interaction intent (which always precedes a click) avoids
 * that without weakening the booking button itself.
 */
export function CalProvider() {
  useEffect(() => {
    const onIntent = (event: Event) => {
      const target = event.target;
      if (target instanceof Element && target.closest("[data-cal-link]")) {
        void initCal();
      }
    };

    document.addEventListener("pointerenter", onIntent, {
      capture: true,
      passive: true,
    });
    document.addEventListener("focusin", onIntent, { capture: true });

    return () => {
      document.removeEventListener("pointerenter", onIntent, {
        capture: true,
      });
      document.removeEventListener("focusin", onIntent, { capture: true });
    };
  }, []);

  return null;
}
