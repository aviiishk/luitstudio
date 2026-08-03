"use client";

import { ImagePlus, Loader2, X } from "lucide-react";
import { useRef, useState, type DragEvent } from "react";

import { uploadImageToCloudinary } from "@/lib/cloudinary";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export function ImageUploadField({
  label,
  value,
  onChange,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File | undefined) {
    if (!file) return;

    setError("");
    setIsUploading(true);

    try {
      const url = await uploadImageToCloudinary(file);
      onChange(url);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Image upload failed.",
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

  const labelId = `${label.toLowerCase().replace(/\s+/g, "-")}-upload`;

  return (
    <div>
      <span id={labelId} className="text-ink mb-2 block text-sm font-medium">
        {label}
      </span>

      {value ? (
        <div className="border-border relative overflow-hidden rounded-xl border">
          {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary uploaded/external URL, not a local/optimizable asset */}
          <img src={value} alt="" className="aspect-video w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label={`Remove ${label.toLowerCase()}`}
            className="absolute top-2 right-2 grid size-8 place-items-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/75"
          >
            <X aria-hidden="true" size={16} />
          </button>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          aria-labelledby={labelId}
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
          className={`flex aspect-video cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed transition-colors ${
            isDraggingOver
              ? "border-brand bg-brand/5"
              : "border-border hover:border-brand/50"
          }`}
        >
          {isUploading ? (
            <>
              <Loader2
                aria-hidden="true"
                size={22}
                className="text-brand animate-spin"
              />
              <span className="text-body text-sm">Uploading…</span>
            </>
          ) : (
            <>
              <ImagePlus aria-hidden="true" size={22} className="text-body" />
              <span className="text-body text-sm">
                Drag & drop or click to upload
              </span>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => void upload(event.target.files?.[0])}
      />

      {error ? <p className="text-rose-ink mt-2 text-sm">{error}</p> : null}
    </div>
  );
}
