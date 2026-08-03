import { Coffee, Lightbulb, MousePointer2 } from "lucide-react";

export const playgroundCards = [
  {
    title: "Fueled by ideas",
    description: "And a very reasonable amount of coffee.",
    icon: Coffee,
    background: "bg-[#f8f2e8] text-ink",
    rotation: -2,
    offset: { x: -4, y: 5 },
  },
  {
    title: "Start a little weird",
    description: "The memorable ideas rarely begin as safe ones.",
    icon: Lightbulb,
    background: "bg-yellow text-ink",
    rotation: 2,
    offset: { x: 3, y: -4 },
  },
  {
    title: "Made to matter",
    description: "Useful enough to click. Good enough to remember.",
    icon: MousePointer2,
    background: "bg-sky text-ink",
    rotation: -1,
    offset: { x: 5, y: 4 },
  },
] as const;
