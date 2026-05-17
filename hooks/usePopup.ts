"use client";

import { useEffect, useState } from "react";

type UsePopupOptions = {
  enabled?: boolean;
  storageKey?: string;
  delayMs?: number;
  scrollThreshold?: number;
};

export function usePopup({
  enabled = true,
  storageKey = "popup-dismissed",
  delayMs = 1700,
  scrollThreshold = 140,
}: UsePopupOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    if (sessionStorage.getItem(storageKey) === "true") return;

    let hasTriggered = false;

    const openPopup = () => {
      if (hasTriggered || sessionStorage.getItem(storageKey) === "true") return;
      hasTriggered = true;
      setIsOpen(true);
    };

    const timer = window.setTimeout(openPopup, delayMs);
    const onScroll = () => {
      if (window.scrollY >= scrollThreshold) openPopup();
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [delayMs, enabled, scrollThreshold, storageKey]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        sessionStorage.setItem(storageKey, "true");
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, storageKey]);

  const close = () => {
    sessionStorage.setItem(storageKey, "true");
    setIsOpen(false);
  };

  return { isOpen, close };
}
