import { ROUTES } from "@/constants/routes";
import type { PricingTrack } from "@/types/pricing";

// Two tracks instead of flat monthly tiers, since Luit Studio's services
// split naturally into ongoing work and scoped project work. Mid-market
// starting prices, dual currency for Indian and international clients.
// Adjust these two lines whenever real rates change.
export const pricingTracks: readonly PricingTrack[] = [
  {
    id: "retainer",
    title: "Ongoing Retainer",
    model: "retainer",
    description:
      "For services that run every month — content, social, and video that need to stay consistent.",
    serviceIds: [
      "digital-marketing",
      "social-media-handling",
      "video-editing",
      "motion-graphics",
    ],
    priceNote: "From ₹45,000/mo · $550/mo",
    highlighted: false,
    cta: { label: "Start a retainer", href: ROUTES.contact },
  },
  {
    id: "project",
    title: "Project-Based",
    model: "quote",
    description:
      "For scoped work with a clear start and finish — a site, a product, an automation.",
    serviceIds: [
      "web-development",
      "ai-automation",
      "ui-ux-design",
      "graphic-design",
    ],
    priceNote: "From ₹75,000 · $900",
    highlighted: true,
    cta: { label: "Get a quote", href: ROUTES.contact },
  },
] as const;
