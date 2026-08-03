"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="border-border text-ink hover:border-brand hover:text-brand print:hidden flex items-center justify-center gap-2 rounded-xl border bg-white px-4 py-2.5 text-sm font-medium transition-colors"
    >
      <Printer aria-hidden="true" size={15} />
      Print / Save as PDF
    </button>
  );
}
