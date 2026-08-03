import { ROUTES } from "@/constants/routes";
import type { PricingPlan } from "@/types/pricing";

export const pricingPlans: readonly PricingPlan[] = [
  {
    id: "starter",
    title: "Starter",
    description:
      "For small businesses, local brands, freelancers, and focused landing-page work.",
    currency: "$",
    price: 299,
    duration: "month",
    features: [
      "Unlimited design requests (1 active at a time)",
      "Website updates",
      "Landing page optimization",
      "Basic SEO improvements",
      "Monthly performance report",
      "One strategy call per month",
    ],
    highlighted: false,
    cta: { label: "Start Subscription", href: ROUTES.contact },
  },
  {
    id: "growth",
    title: "Growth",
    description:
      "For startups, SaaS teams, and growing businesses ready to sharpen product and conversion.",
    currency: "$",
    price: 699,
    duration: "month",
    features: [
      "Everything in Starter",
      "Priority support",
      "UI/UX improvements",
      "Development support",
      "Analytics review",
      "Conversion optimization",
      "Weekly check-ins",
    ],
    highlighted: true,
    cta: { label: "Book Discovery Call", href: ROUTES.contact },
  },
] as const;
