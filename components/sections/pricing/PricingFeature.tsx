import { Check } from "lucide-react";

interface PricingFeatureProps {
  children: string;
  highlighted: boolean;
}

export function PricingFeature({ children, highlighted }: PricingFeatureProps) {
  return (
    <li
      className={`flex items-start gap-3 ${highlighted ? "text-white" : "text-ink"}`}
    >
      <Check
        aria-hidden="true"
        className="mt-0.5 size-5 shrink-0"
        strokeWidth={1.8}
      />
      <span>{children}</span>
    </li>
  );
}
