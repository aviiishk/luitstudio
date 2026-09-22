export type PricingModel = "retainer" | "quote";

export interface PricingCta {
  href: string;
  label: string;
}

export interface PricingTrack {
  id: string;
  title: string;
  model: PricingModel;
  description: string;
  serviceIds: readonly string[];
  priceNote: string;
  highlighted: boolean;
  cta: PricingCta;
}
