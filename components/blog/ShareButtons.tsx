"use client";

import { Check, Link2, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

const iconButtonClasses =
  "border-border text-body hover:border-brand hover:text-brand grid size-9 place-items-center rounded-full border transition-colors duration-200";

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — silently ignore
    }
  }

  const xShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-2">
      <a
        href={xShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className={iconButtonClasses}
      >
        <Twitter aria-hidden="true" size={15} />
      </a>
      <a
        href={linkedinShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className={iconButtonClasses}
      >
        <Linkedin aria-hidden="true" size={15} />
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link"
        className={iconButtonClasses}
      >
        {copied ? (
          <Check aria-hidden="true" size={15} />
        ) : (
          <Link2 aria-hidden="true" size={15} />
        )}
      </button>
    </div>
  );
}
