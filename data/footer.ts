import { contactDetails } from "@/config/contact";
import { footerNavigationGroups } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { contactSocialLinks } from "@/config/social";
import { ROUTES } from "@/constants/routes";
import type { FooterContent } from "@/types/footer";

export const footerContent = {
  cta: {
    eyebrow: "The next chapter starts here",
    title: "Let’s build something",
    emphasis: "people remember.",
    description:
      "Helping ambitious brands design, build and grow better digital products.",
    label: "Book a Discovery Call",
  },
  navigationGroups: footerNavigationGroups,
  services: [
    { label: "Brand Identity", href: ROUTES.services },
    { label: "Web Design", href: ROUTES.services },
    { label: "Development", href: ROUTES.services },
    { label: "SEO", href: ROUTES.services },
    { label: "AI Automation", href: ROUTES.services },
  ],
  contact: {
    email: contactDetails.email,
  },
  socialLinks: contactSocialLinks,
  projects: [
    { name: "PredictX", status: "Building" },
    { name: "DailyKiit", status: "Beta" },
    { name: "Luit Identity", status: "Live" },
    { name: "Studio OS", status: "Coming Soon" },
  ],
  editorialCopy: "Built with curiosity, coffee and clean code.",
  copyright: siteConfig.copyright,
} as const satisfies FooterContent;
