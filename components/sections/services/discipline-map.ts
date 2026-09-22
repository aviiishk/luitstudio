import { Film, Layers, PenTool, TrendingUp } from "lucide-react";

// Single source of truth tying the real 8 services (service-data.ts) to
// this page's own architecture: a short hero chip code, which on-page
// section it lives in, and which of the 4 capability categories it
// belongs to. Copy here (oneLiner) is written fresh for this page, not
// the same sentence shown in the homepage's service cards.
export interface DisciplineMapItem {
  serviceId: string;
  sectionId: string;
  code: string;
  category: "Build" | "Design" | "Grow" | "Tell";
  oneLiner: string;
}

export const disciplineMap: readonly DisciplineMapItem[] = [
  {
    serviceId: "web-development",
    sectionId: "build",
    code: "WEB / APPS",
    category: "Build",
    oneLiner: "Sites and apps that launch fast and hold up.",
  },
  {
    serviceId: "ai-automation",
    sectionId: "automation",
    code: "AI",
    category: "Build",
    oneLiner: "The manual work, handled automatically.",
  },
  {
    serviceId: "ui-ux-design",
    sectionId: "design",
    code: "UI/UX",
    category: "Design",
    oneLiner: "Interfaces people don't have to think about.",
  },
  {
    serviceId: "graphic-design",
    sectionId: "brand",
    code: "BRAND",
    category: "Design",
    oneLiner: "One visual identity, everywhere it shows up.",
  },
  {
    serviceId: "digital-marketing",
    sectionId: "grow",
    code: "MARKETING",
    category: "Grow",
    oneLiner: "Getting the right people to notice.",
  },
  {
    serviceId: "social-media-handling",
    sectionId: "grow",
    code: "SOCIAL",
    category: "Grow",
    oneLiner: "A consistent voice, every single day.",
  },
  {
    serviceId: "video-editing",
    sectionId: "content",
    code: "VIDEO",
    category: "Tell",
    oneLiner: "Raw footage, cut into something worth watching.",
  },
  {
    serviceId: "motion-graphics",
    sectionId: "content",
    code: "MOTION",
    category: "Tell",
    oneLiner: "Motion that makes the static feel alive.",
  },
] as const;

export const disciplineCategories = [
  {
    label: "Build",
    blurb: "The product itself: sites, apps, and the systems behind them.",
    accent: "var(--color-brand)",
    icon: Layers,
  },
  {
    label: "Design",
    blurb: "How it looks, and how obvious it feels to use.",
    accent: "var(--color-rose)",
    icon: PenTool,
  },
  {
    label: "Grow",
    blurb: "Getting it in front of people, and keeping their attention.",
    accent: "var(--color-green)",
    icon: TrendingUp,
  },
  {
    label: "Tell",
    blurb: "Turning footage and ideas into things worth watching.",
    accent: "var(--color-violet)",
    icon: Film,
  },
] as const;
