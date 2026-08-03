export interface PricingCta {
  href: string;
  label: string;
}

export interface PricingPlan {
  currency?: string;
  cta: PricingCta;
  description: string;
  duration?: string;
  features: readonly string[];
  highlighted: boolean;
  id: string;
  price: number | string;
  title: string;
}
