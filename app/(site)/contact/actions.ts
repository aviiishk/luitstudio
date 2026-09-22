"use server";

import { notifyByEmail } from "@/lib/email-notify";
import { createClient } from "@/lib/supabase/server";
import { notifyWhatsApp } from "@/lib/whatsapp-notify";
import type { ContactFormState } from "@/types/contact-form";

function readField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = readField(formData, "name");
  const email = readField(formData, "email");
  const interest = readField(formData, "interest");
  const budget = readField(formData, "budget");
  const message = readField(formData, "message");

  if (!name || !email || !interest || !message) {
    return {
      status: "error",
      message: "Please fill in all required fields before submitting.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").insert({
    name,
    email,
    interest,
    budget: budget || null,
    message,
  });

  if (error) {
    console.error("Failed to save contact submission:", error.message);
    return {
      status: "error",
      message:
        "Something went wrong sending your message. Please try again or email us directly.",
    };
  }

  const notificationBody = `New contact form submission\nName: ${name}\nEmail: ${email}\nInterested in: ${interest}\n${
    budget ? `Budget: ${budget}\n` : ""
  }Message: ${message}`;

  await Promise.all([
    notifyWhatsApp(notificationBody),
    notifyByEmail(`New contact form submission from ${name}`, notificationBody),
  ]);

  return {
    status: "success",
    message: "Thanks — we've got your message and will reply soon.",
  };
}
