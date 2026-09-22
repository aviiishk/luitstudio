import "server-only";

import { Resend } from "resend";

// Best-effort, same as lib/whatsapp-notify.ts: failures are swallowed so a
// notification outage never blocks a real form submission from saving.
function getRecipients(): string[] {
  const raw = process.env.CONTACT_NOTIFICATION_EMAILS;
  if (!raw) return [];

  return raw
    .split(",")
    .map((email) => email.trim())
    .filter((email) => email.length > 0);
}

export async function notifyByEmail(subject: string, text: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const recipients = getRecipients();

  if (!apiKey || !from || recipients.length === 0) return;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: recipients,
      subject,
      text,
    });

    if (error) console.error("Resend email notify failed:", error.message);
  } catch (error) {
    console.error("Resend email notify failed:", error);
  }
}
