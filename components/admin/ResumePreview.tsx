"use client";

import { Download, FileText } from "lucide-react";
import dynamic from "next/dynamic";

import { toCloudinaryDownloadUrl } from "@/lib/cloudinary";

// pdfjs-dist touches `window`/`document` at module-eval time, which
// crashes if this ever runs during Next.js's server render of this
// (already client-only) component. `ssr: false` keeps it out of the
// server bundle entirely, loading only once the browser mounts it.
const ResumePdfViewer = dynamic(
  () =>
    import("@/components/admin/ResumePdfViewer").then(
      (mod) => mod.ResumePdfViewer,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="border-border bg-surface grid h-full place-items-center rounded-xl border">
        <p className="text-body text-sm">Loading preview…</p>
      </div>
    ),
  },
);

interface ResumePreviewProps {
  url: string;
  className?: string;
}

export function ResumePreview({ url, className = "" }: ResumePreviewProps) {
  const isPdf = url.split("?")[0].toLowerCase().endsWith(".pdf");

  if (!isPdf) {
    return (
      <div
        className={`border-border bg-canvas flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-8 text-center ${className}`}
      >
        <div className="bg-surface text-body grid size-11 place-items-center rounded-full">
          <FileText aria-hidden="true" size={18} />
        </div>
        <p className="text-body text-sm">
          Preview isn&apos;t available for this file type.
        </p>
        <a
          href={toCloudinaryDownloadUrl(url)}
          download
          className="text-brand inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
        >
          <Download aria-hidden="true" size={14} />
          Download to view
        </a>
      </div>
    );
  }

  return (
    <div className={className}>
      <ResumePdfViewer url={url} />
    </div>
  );
}
