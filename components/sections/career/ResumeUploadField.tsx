"use client";

import { FileText, Loader2, Upload, X } from "lucide-react";
import { useRef, useState, type DragEvent } from "react";

import { uploadResumeToCloudinary } from "@/lib/cloudinary";

interface ResumeUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
}

function fileNameFromUrl(url: string) {
  try {
    const path = new URL(url).pathname;
    return decodeURIComponent(path.split("/").pop() ?? "resume");
  } catch {
    return "resume";
  }
}

export function ResumeUploadField({ value, onChange }: ResumeUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File | undefined) {
    if (!file) return;

    setError("");
    setIsUploading(true);

    try {
      const url = await uploadResumeToCloudinary(file);
      onChange(url);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Resume upload failed.",
      );
    } finally {
      setIsUploading(false);
    }
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDraggingOver(false);
    void upload(event.dataTransfer.files[0]);
  }

  return (
    <div>
      <span id="resume-upload-label" className="text-ink mb-2 block font-medium">
        Resume (optional)
      </span>

      {value ? (
        <div className="border-border flex items-center gap-3 rounded-2xl border bg-white px-5 py-3">
          <FileText aria-hidden="true" size={18} className="text-brand shrink-0" />
          <span className="text-ink min-w-0 flex-1 truncate text-sm">
            {fileNameFromUrl(value)}
          </span>
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Remove resume"
            className="text-body hover:text-rose-ink shrink-0 transition-colors"
          >
            <X aria-hidden="true" size={16} />
          </button>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          aria-labelledby="resume-upload-label"
          onClick={() => inputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDraggingOver(true);
          }}
          onDragLeave={() => setIsDraggingOver(false)}
          onDrop={handleDrop}
          className={`flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed px-5 py-3 transition-colors ${
            isDraggingOver
              ? "border-brand bg-brand/5"
              : "border-border hover:border-brand/50"
          }`}
        >
          {isUploading ? (
            <>
              <Loader2
                aria-hidden="true"
                size={18}
                className="text-brand animate-spin"
              />
              <span className="text-body text-sm">Uploading…</span>
            </>
          ) : (
            <>
              <Upload aria-hidden="true" size={18} className="text-body" />
              <span className="text-body text-sm">
                Drag & drop or click to upload — PDF, DOC, or DOCX
              </span>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={(event) => void upload(event.target.files?.[0])}
      />

      {error ? <p className="text-rose-ink mt-2 text-sm">{error}</p> : null}
    </div>
  );
}
