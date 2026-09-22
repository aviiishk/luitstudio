import type { SocialLink } from "@/types/contact";
import type { NavigationGroup, NavigationLink } from "@/types/navigation";

export interface FooterContent {
  cta: {
    eyebrow: string;
    title: string;
    emphasis: string;
    description: string;
    label: string;
  };
  navigationGroups: readonly NavigationGroup[];
  services: readonly NavigationLink[];
  contact: {
    email: string;
  };
  socialLinks: readonly SocialLink[];
  editorialCopy: string;
  copyright: string;
}
