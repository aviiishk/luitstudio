"use client";

import { ChevronLeft, ChevronRight, Download, Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import type { PageCallback } from "react-pdf/dist/shared/types.js";

import { toCloudinaryDownloadUrl } from "@/lib/cloudinary";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Self-hosted via Next's asset bundler (not a CDN), so it satisfies the
// site's CSP `worker-src 'self' blob:` — a CDN worker URL would be blocked.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.2;
const PAGE_PADDING = 24;

interface ResumePdfViewerProps {
  url: string;
}

export function ResumePdfViewer({ url }: ResumePdfViewerProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [pageSize, setPageSize] = useState<{ width: number; height: number } | null>(
    null,
  );
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setViewportSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scale that fits the whole page inside the visible panel at 100% zoom,
  // so the resume reads in full without needing to scroll by default.
  const fitScale =
    pageSize && viewportSize.width > 0 && viewportSize.height > 0
      ? Math.min(
          (viewportSize.width - PAGE_PADDING) / pageSize.width,
          (viewportSize.height - PAGE_PADDING) / pageSize.height,
        )
      : 1;
  const scale = Math.max(fitScale, 0.1) * zoom;

  return (
    <div className="border-border flex h-full flex-col overflow-hidden rounded-xl border bg-white">
      <div className="border-border bg-canvas flex items-center justify-between gap-3 border-b px-3 py-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPageNumber((page) => Math.max(1, page - 1))}
            disabled={pageNumber <= 1}
            aria-label="Previous page"
            className="text-body hover:text-ink hover:bg-surface grid size-7 place-items-center rounded-full transition-colors disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft aria-hidden="true" size={16} />
          </button>
          <span className="text-body min-w-[5.5rem] text-center text-xs font-medium whitespace-nowrap">
            Page {pageNumber} of {numPages || "–"}
          </span>
          <button
            type="button"
            onClick={() =>
              setPageNumber((page) => Math.min(numPages || page, page + 1))
            }
            disabled={pageNumber >= numPages}
            aria-label="Next page"
            className="text-body hover:text-ink hover:bg-surface grid size-7 place-items-center rounded-full transition-colors disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight aria-hidden="true" size={16} />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() =>
              setZoom((value) => Math.max(MIN_ZOOM, +(value - ZOOM_STEP).toFixed(2)))
            }
            disabled={zoom <= MIN_ZOOM}
            aria-label="Zoom out"
            className="text-body hover:text-ink hover:bg-surface grid size-7 place-items-center rounded-full transition-colors disabled:pointer-events-none disabled:opacity-30"
          >
            <Minus aria-hidden="true" size={14} />
          </button>
          <span className="text-body w-10 text-center text-xs font-medium">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() =>
              setZoom((value) => Math.min(MAX_ZOOM, +(value + ZOOM_STEP).toFixed(2)))
            }
            disabled={zoom >= MAX_ZOOM}
            aria-label="Zoom in"
            className="text-body hover:text-ink hover:bg-surface grid size-7 place-items-center rounded-full transition-colors disabled:pointer-events-none disabled:opacity-30"
          >
            <Plus aria-hidden="true" size={14} />
          </button>

          <span className="bg-border mx-1 h-4 w-px" aria-hidden="true" />

          <a
            href={toCloudinaryDownloadUrl(url)}
            download
            aria-label="Download resume"
            title="Download"
            className="text-body hover:text-ink hover:bg-surface grid size-7 place-items-center rounded-full transition-colors"
          >
            <Download aria-hidden="true" size={14} />
          </a>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="bg-surface flex flex-1 items-center justify-center overflow-auto p-3"
      >
        {error ? (
          <p className="text-body my-auto text-center text-sm">
            Couldn&apos;t load a preview for this file. Use Download instead.
          </p>
        ) : (
          <Document
            file={url}
            onLoadSuccess={({ numPages: total }) => {
              setNumPages(total);
              setPageNumber(1);
            }}
            onLoadError={() => setError(true)}
            loading={
              <p className="text-body my-auto text-sm">Loading preview…</p>
            }
            className="shadow-soft"
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              onLoadSuccess={(page: PageCallback) => {
                const viewport = page.getViewport({ scale: 1 });
                setPageSize({ width: viewport.width, height: viewport.height });
              }}
              renderAnnotationLayer
              renderTextLayer
            />
          </Document>
        )}
      </div>
    </div>
  );
}
