import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "luitstudio.in@gmail.com";
const FROM_EMAIL = "Luit Studio <hello@luitstudio.com>";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  services: string[];
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: ContactPayload;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message, services } = body;

  if (!name || typeof name !== "string" || name.trim().length < 2)
    return NextResponse.json({ error: "Please enter your name." }, { status: 422 });
  if (!email || !isValidEmail(email))
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
  if (!message || typeof message !== "string" || message.trim().length < 10)
    return NextResponse.json({ error: "Message must be at least 10 characters." }, { status: 422 });

  const clean = {
    name:     name.trim().slice(0, 100),
    email:    email.trim().toLowerCase().slice(0, 200),
    message:  message.trim().slice(0, 2000),
    services: Array.isArray(services) ? services.slice(0, 10) : [],
  };

  const serviceList = clean.services.length ? clean.services.join(", ") : "Not specified";
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("[contact] missing RESEND_API_KEY");
    return NextResponse.json(
      { error: "Contact form is not configured yet. Please email us directly." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from:    FROM_EMAIL,
    to:      TO_EMAIL,
    replyTo: clean.email,
    subject: `New enquiry from ${clean.name} — Luit Studio`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#0f0a1a;color:#fff;border-radius:12px;">
        <div style="margin-bottom:24px;">
          <h1 style="font-size:22px;font-weight:700;margin:0 0 4px;">New Contact Form Submission</h1>
          <p style="margin:0;color:#a0a0b0;font-size:13px;">Received via luitstudio.com</p>
        </div>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #ffffff12;color:#a0a0b0;font-size:13px;width:120px;">Name</td>
            <td style="padding:12px 0;border-bottom:1px solid #ffffff12;font-size:14px;">${clean.name}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #ffffff12;color:#a0a0b0;font-size:13px;">Email</td>
            <td style="padding:12px 0;border-bottom:1px solid #ffffff12;font-size:14px;">
              <a href="mailto:${clean.email}" style="color:#06B6D4;text-decoration:none;">${clean.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #ffffff12;color:#a0a0b0;font-size:13px;">Services</td>
            <td style="padding:12px 0;border-bottom:1px solid #ffffff12;font-size:14px;">${serviceList}</td>
          </tr>
        </table>
        <div style="background:#ffffff08;border:1px solid #ffffff12;border-radius:8px;padding:16px;margin-bottom:24px;">
          <p style="margin:0 0 8px;color:#a0a0b0;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Message</p>
          <p style="margin:0;font-size:14px;line-height:1.7;white-space:pre-wrap;">${clean.message}</p>
        </div>
        <a href="mailto:${clean.email}" style="display:inline-block;padding:12px 24px;background:linear-gradient(to right,#EC4899,#06B6D4);color:#fff;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">
          Reply to ${clean.name}
        </a>
      </div>
    `,
  });

  if (error) {
    console.error("[contact] resend error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }

  console.log("[contact] email sent:", data?.id);
  return NextResponse.json(
    { success: true, message: "Message received. We'll be in touch within 24 hours." },
    { status: 200 }
  );
}
