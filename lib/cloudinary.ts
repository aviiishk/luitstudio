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
