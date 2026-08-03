import { ROUTES } from "@/constants/routes";
import type { CtaContent } from "@/types/cta";

export const homeCta: CtaContent = {
  id: "contact-cta",
  title: "Innovative Solutions for",
  emphasis: "Bold Brands",
  description:
    "Looking to elevate your brand? We craft immersive experiences that captivate, engage, and make your business unforgettable in every interaction.",
  background: "gradient",
  buttons: [
    { label: "Let’s Collaborate", href: ROUTES.contact, variant: "dark" },
  ],
};
