const DEFAULT_MESSAGE = "Hi! I'd like to talk about a project.";

export const whatsappConfig = {
  number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "917634885371",
  defaultMessage: DEFAULT_MESSAGE,
} as const;

export function getWhatsAppLink(message: string = whatsappConfig.defaultMessage) {
  return `https://wa.me/${whatsappConfig.number}?text=${encodeURIComponent(message)}`;
}
