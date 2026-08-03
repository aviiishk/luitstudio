import {
  ChartNoAxesCombined,
  Images,
  PanelsTopLeft,
  Palette,
  WandSparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ServiceData {
  id: string;
  title: string;
  icon: LucideIcon;
  themeClassName: string;
}

export const services: readonly ServiceData[] = [
  {
    id: "brand-strategy",
    title: "Brand Strategy",
    icon: Palette,
    themeClassName:
      "bg-[#f1e6fc] text-violet-ink hover:border-violet-ink/25 focus-visible:border-violet-ink/25",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: Images,
    themeClassName:
      "bg-[#e2f0ff] text-sky-ink hover:border-sky-ink/25 focus-visible:border-sky-ink/25",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    icon: WandSparkles,
    themeClassName:
      "bg-[#ffefe1] text-orange-ink hover:border-orange-ink/25 focus-visible:border-orange-ink/25",
  },
  {
    id: "analytics-reporting",
    title: "Analytics & Reporting",
    icon: ChartNoAxesCombined,
    themeClassName:
      "bg-[#e4f6df] text-green-ink hover:border-green-ink/25 focus-visible:border-green-ink/25",
  },
  {
    id: "web-development",
    title: "Web Development",
    icon: PanelsTopLeft,
    themeClassName:
      "bg-[#fde7eb] text-rose-ink hover:border-rose-ink/25 focus-visible:border-rose-ink/25",
  },
] as const;
