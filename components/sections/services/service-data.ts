import {
  Bot,
  Clapperboard,
  Megaphone,
  PanelsTopLeft,
  Palette,
  Share2,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ServiceData {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  themeClassName: string;
  colorName: string;
  accentColor: string;
  fact: string;
}

// Card colors are drawn from Assam rather than a generic pastel set:
// muga silk gold, gamosa red, tea-garden green, Brahmaputra river blue,
// xorai (bell-metal) bronze, Ahom violet, Kaziranga sunset orange, and
// terracotta. `accentColor` powers the hover/focus fact reveal on each
// ServiceCard — see ServiceCard.tsx.
export const services: readonly ServiceData[] = [
  {
    id: "web-development",
    title: "Web and App Development",
    description: "Fast, modern websites and web apps, built to launch.",
    icon: PanelsTopLeft,
    themeClassName:
      "bg-[#fbedc7] text-[#8a6a00] hover:border-[#8a6a00]/25 focus-visible:border-[#8a6a00]/25",
    colorName: "Muga Gold",
    accentColor: "#8a6a00",
    fact: "Muga silk comes only from Assam — the world's only golden silk, and it gets more lustrous with every wash.",
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    description: "Workflows and tools that cut out the repetitive work.",
    icon: Bot,
    themeClassName:
      "bg-[#dcedf7] text-sky-ink hover:border-sky-ink/25 focus-visible:border-sky-ink/25",
    colorName: "Brahmaputra Blue",
    accentColor: "#155b8a",
    fact: "The Brahmaputra is one of the few rivers in India addressed as ‘he’ — most others are goddesses.",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description: "Interfaces that are clear to use and easy to trust.",
    icon: WandSparkles,
    themeClassName:
      "bg-[#f8dede] text-rose-ink hover:border-rose-ink/25 focus-visible:border-rose-ink/25",
    colorName: "Gamosa Red",
    accentColor: "#9e3e50",
    fact: "The red motifs on a gamosa are Assam's highest form of respect — handed to guests, gods, and champions alike.",
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    description: "Logos, layouts, and visuals that hold a brand together.",
    icon: Palette,
    themeClassName:
      "bg-[#f6ded0] text-[#9a4420] hover:border-[#9a4420]/25 focus-visible:border-[#9a4420]/25",
    colorName: "Terracotta Clay",
    accentColor: "#9a4420",
    fact: "Asharikandi in Assam has shaped terracotta art for centuries — one of India's oldest living pottery traditions.",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Campaigns and positioning built around real numbers.",
    icon: Megaphone,
    themeClassName:
      "bg-[#e1f0dc] text-green-ink hover:border-green-ink/25 focus-visible:border-green-ink/25",
    colorName: "Tea Garden Green",
    accentColor: "#2f6b24",
    fact: "Assam produces more tea than any other Indian state — some of the world's favourite chai starts right here.",
  },
  {
    id: "social-media-handling",
    title: "Social Media Handling",
    description: "Consistent posting, community replies, and a real voice.",
    icon: Share2,
    themeClassName:
      "bg-[#f0e2cf] text-[#7a4a1e] hover:border-[#7a4a1e]/25 focus-visible:border-[#7a4a1e]/25",
    colorName: "Xorai Bronze",
    accentColor: "#7a4a1e",
    fact: "A xorai — Assam's bell-metal offering tray — is the mark of welcome, and sits right on the state emblem.",
  },
  {
    id: "video-editing",
    title: "Video Editing",
    description: "Documentaries, YouTube videos, reels, and short films.",
    icon: Clapperboard,
    themeClassName:
      "bg-[#ffe9d6] text-orange-ink hover:border-orange-ink/25 focus-visible:border-orange-ink/25",
    colorName: "Kaziranga Orange",
    accentColor: "#8a4a0e",
    fact: "Kaziranga, Assam, shelters about two-thirds of the world's one-horned rhinos — found nowhere else in such numbers.",
  },
  {
    id: "motion-graphics",
    title: "Motion Graphics",
    description: "Animated graphics and titles that make footage move.",
    icon: Sparkles,
    themeClassName:
      "bg-[#ece0f7] text-violet-ink hover:border-violet-ink/25 focus-visible:border-violet-ink/25",
    colorName: "Ahom Violet",
    accentColor: "#6d3b98",
    fact: "The Ahom dynasty ruled Assam for 600 years — one of the few kingdoms the Mughals never conquered.",
  },
] as const;
