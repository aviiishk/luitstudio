"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

import { calConfig } from "@/config/cal";

export function CalProvider() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: calConfig.namespace });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: "light",
      });
    })();
  }, []);

  return null;
}
