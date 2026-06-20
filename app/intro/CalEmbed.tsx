"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function CalEmbed() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "intro-call" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: "light",
        cssVarsPerTheme: {
          light: {
            "cal-brand":           "#111110",
            "cal-brand-emphasis":  "#111110",
            "cal-brand-subtle":    "#E5E3DE",
            "cal-bg":              "#ffffff",
            "cal-bg-emphasis":     "#F2F0EB",
            "cal-text":            "#111110",
            "cal-text-emphasis":   "#111110",
            "cal-text-subtle":     "#6B6B68",
            "cal-border":          "#E5E3DE",
            "cal-border-emphasis": "#C8C6C0",
            "cal-border-default":  "#E5E3DE",
          },
        },
      });
    })();
  }, []);

  return (
    <Cal
      namespace="intro-call"
      calLink="luit-studio-xv0sbd/intro-call"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view", theme: "light" }}
    />
  );
}
