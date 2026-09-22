"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import type { CareerApplicationFormState } from "@/types/career-application-form";

function readField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitApplication(
  _prevState: CareerApplicationFormState,
  formData: FormData,
): Promise<CareerApplicationFormState> {
  const fullName = readField(formData, "fullName");
  const email = readField(formData, "email");
  const roleInterest = readField(formData, "roleInterest");
  const linkUrl = readField(formData, "linkUrl");
  const resumeUrl = readField(formData, "resumeUrl");
  const message = readField(formData, "message");
  const jobOpeningId = readField(formData, "jobOpeningId");

  if (!fullName || !email || !message) {
    return {
      status: "error",
      message: "Please fill in your name, email, and a short message.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("job_applications").insert({
    job_opening_id: jobOpeningId || null,
    full_name: fullName,
    email,
    role_interest: roleInterest || null,
    link_url: linkUrl || null,
    resume_url: resumeUrl || null,
    message,
  });

  if (error) {
    console.error("Failed to save job application:", error.message);
    return {
      status: "error",
      message:
        "Something went wrong sending your application. Please try again or email us directly.",
    };
  }

  revalidatePath("/admin/careers/applications");

  return {
    status: "success",
    message: "Thanks — we've got your application and will be in touch.",
  };
}
