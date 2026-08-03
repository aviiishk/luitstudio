import type { SocialLink } from "@/types/contact";
import type { NavigationGroup, NavigationLink } from "@/types/navigation";

export type FooterProjectStatus = "Beta" | "Building" | "Coming Soon" | "Live";

export interface FooterProject {
  name: string;
  status: FooterProjectStatus;
}

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
  projects: readonly FooterProject[];
  editorialCopy: string;
  copyright: string;
}
