import { services } from "@/components/sections/services/service-data";
import { contactDetails } from "@/config/contact";
import { footerNavigationGroups } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { contactSocialLinks } from "@/config/social";
import { ROUTES } from "@/constants/routes";
import type { FooterContent } from "@/types/footer";

export const footerContent = {
  cta: {
    eyebrow: "The next chapter starts here",
    title: "Let's build something",
    emphasis: "people remember.",
    description:
      "Helping ambitious brands design, build and grow better digital products.",
    label: "Book a Call",
  },
  navigationGroups: footerNavigationGroups,
  services: services.map((service) => ({
    label: service.title,
    href: ROUTES.services,
  })),
  contact: {
    email: contactDetails.email,
  },
  socialLinks: contactSocialLinks,
  editorialCopy: "Built with curiosity, coffee and clean code.",
  copyright: siteConfig.copyright,
} as const satisfies FooterContent;
