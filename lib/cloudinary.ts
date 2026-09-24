const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

/**
 * Uploads an image directly from the browser to Cloudinary using an
 * unsigned upload preset. General-purpose — not blog-specific — so it can
 * back any image upload surface on the site.
 */
export async function uploadImageToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary is not configured.");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files can be uploaded.");
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("Image must be smaller than 10MB.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData },
  );

  if (!response.ok) {
    throw new Error("Image upload failed. Please try again.");
  }

  const data = (await response.json()) as { secure_url: string };
  return data.secure_url;
}

/**
 * Turns a Cloudinary URL into one that downloads instead of opening inline
 * in the browser (Cloudinary serves PDFs for inline viewing by default).
 * Inserts the `fl_attachment` delivery flag right after `/upload/`, which
 * makes Cloudinary respond with a Content-Disposition: attachment header.
 * Non-Cloudinary URLs are returned unchanged.
 */
export function toCloudinaryDownloadUrl(url: string, filename?: string): string {
  const marker = "/upload/";
  const markerIndex = url.indexOf(marker);
  if (markerIndex === -1) return url;

  const insertAt = markerIndex + marker.length;
  const flag = filename
    ? `fl_attachment:${encodeURIComponent(filename)}`
    : "fl_attachment";

  return `${url.slice(0, insertAt)}${flag}/${url.slice(insertAt)}`;
}

/**
 * Turns a Cloudinary URL into a resized, auto-format/auto-quality delivery
 * URL, using the same "insert a flag after /upload/" trick as
 * toCloudinaryDownloadUrl. Cover images are uploaded at their original
 * resolution (often several MB) and rendered as plain <img> tags since
 * they're arbitrary external URLs Next's image optimizer can't resize —
 * this asks Cloudinary itself to serve a properly sized WebP/AVIF instead,
 * which is what was blowing up the page weight. Non-Cloudinary URLs are
 * returned unchanged.
 */
export function toCloudinaryImageUrl(url: string, width: number): string {
  const marker = "/upload/";
  const markerIndex = url.indexOf(marker);
  if (markerIndex === -1) return url;

  const insertAt = markerIndex + marker.length;
  const transform = `f_auto,q_auto,w_${width}`;

  return `${url.slice(0, insertAt)}${transform}/${url.slice(insertAt)}`;
}

const RESUME_MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

const RESUME_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

/**
 * Uploads a resume (PDF/DOC/DOCX) directly from the browser to Cloudinary
 * using the same unsigned preset as image uploads. Deliberately uploaded
 * as resource_type "raw" rather than letting Cloudinary's "auto" endpoint
 * decide — "auto" routes PDFs into the "image" resource type, and newer
 * Cloudinary accounts block inline/attachment delivery of non-image
 * formats (PDF/ZIP) under "image" by default for security reasons, which
 * makes the file 404/error on download. Raw delivery has no such
 * restriction and needs no Cloudinary security setting changed.
 */
export async function uploadResumeToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary is not configured.");
  }

  if (!RESUME_MIME_TYPES.includes(file.type)) {
    throw new Error("Please upload a PDF, DOC, or DOCX file.");
  }

  if (file.size > RESUME_MAX_UPLOAD_BYTES) {
    throw new Error("Resume must be smaller than 8MB.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
    { method: "POST", body: formData },
  );

  if (!response.ok) {
    throw new Error("Resume upload failed. Please try again.");
  }

  const data = (await response.json()) as { secure_url: string };
  return data.secure_url;
}
