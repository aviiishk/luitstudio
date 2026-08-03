"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CopyLinkButtonProps {
  value: string;
}

export function CopyLinkButton({ value }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={() => void handleCopy()}
      className="border-border text-ink hover:border-brand hover:text-brand flex w-full items-center justify-center gap-2 rounded-xl border bg-white px-4 py-2.5 text-sm font-medium transition-colors"
    >
      {copied ? (
        <>
          <Check aria-hidden="true" size={15} className="text-green-ink" />
          Copied
        </>
      ) : (
        <>
          <Copy aria-hidden="true" size={15} />
          Copy link
        </>
      )}
    </button>
  );
}
