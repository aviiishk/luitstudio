import type { LucideIcon } from "lucide-react";

interface PricingFeatureProps {
  children: string;
  icon: LucideIcon;
  highlighted: boolean;
}

export function PricingFeature({
  children,
  icon: Icon,
  highlighted,
}: PricingFeatureProps) {
  return (
    <li className="text-ink flex items-start gap-3">
      <Icon
        aria-hidden="true"
        className={`mt-0.5 size-5 shrink-0 ${highlighted ? "text-brand" : "text-ink"}`}
        strokeWidth={1.8}
      />
      <span>{children}</span>
    </li>
  );
}
