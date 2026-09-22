import "server-only";

// CallMeBot (callmebot.com) — a free, unofficial WhatsApp send API. Each
// recipient must individually opt in once (message the bot number, get an
// API key back) before we can push messages to their number. Best-effort:
// failures are swallowed so a notification outage never blocks a real form
// submission from saving.
interface CallMeBotRecipient {
  phone: string;
  apiKey: string;
}

function getRecipients(): CallMeBotRecipient[] {
  const candidates: (CallMeBotRecipient | null)[] = [
    process.env.CALLMEBOT_ABHISHEK_PHONE && process.env.CALLMEBOT_ABHISHEK_API_KEY
      ? {
          phone: process.env.CALLMEBOT_ABHISHEK_PHONE,
          apiKey: process.env.CALLMEBOT_ABHISHEK_API_KEY,
        }
      : null,
    process.env.CALLMEBOT_PRINCE_PHONE && process.env.CALLMEBOT_PRINCE_API_KEY
      ? {
          phone: process.env.CALLMEBOT_PRINCE_PHONE,
          apiKey: process.env.CALLMEBOT_PRINCE_API_KEY,
        }
      : null,
  ];

  return candidates.filter((recipient): recipient is CallMeBotRecipient => recipient !== null);
}

export async function notifyWhatsApp(message: string): Promise<void> {
  const recipients = getRecipients();
  if (recipients.length === 0) return;

  await Promise.allSettled(
    recipients.map(async (recipient) => {
      const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(
        recipient.phone,
      )}&text=${encodeURIComponent(message)}&apikey=${encodeURIComponent(recipient.apiKey)}`;

      try {
        await fetch(url);
      } catch (error) {
        console.error("CallMeBot WhatsApp notify failed:", error);
      }
    }),
  );
}
