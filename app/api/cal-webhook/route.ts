import { timingSafeEqual, createHmac } from "node:crypto";
import { NextResponse } from "next/server";

import { notifyByEmail } from "@/lib/email-notify";
import { notifyWhatsApp } from "@/lib/whatsapp-notify";

interface CalWebhookPayload {
  triggerEvent: string;
  payload: {
    title: string;
    startTime: string;
    attendees: { name: string; email: string }[];
  };
}

function isValidSignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret || !signature) return false;

  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  const receivedBuffer = Buffer.from(signature, "hex");

  return (
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer)
  );
}

export async function POST(request: Request): Promise<NextResponse> {
  const rawBody = await request.text();
  const signature = request.headers.get("x-cal-signature-256");

  if (!isValidSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let data: CalWebhookPayload;
  try {
    data = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (data.triggerEvent === "BOOKING_CREATED") {
    const attendee = data.payload.attendees[0];
    const startTime = new Date(data.payload.startTime).toLocaleString("en-IN", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    });

    const message = `New Cal.com booking\nEvent: ${data.payload.title}\nWith: ${
      attendee?.name ?? "Unknown"
    } (${attendee?.email ?? "no email"})\nWhen: ${startTime}`;

    await Promise.all([
      notifyWhatsApp(message),
      notifyByEmail(`New booking: ${data.payload.title}`, message),
    ]);
  }

  return NextResponse.json({ received: true });
}
