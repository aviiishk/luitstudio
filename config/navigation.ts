import { ROUTES } from "@/constants/routes";
import type {
  MobileNavigationItem,
  NavigationGroup,
  NavigationItem,
} from "@/types/navigation";

export const navigationItems = [
  { label: "About Us", href: ROUTES.about, sectionId: "aboutus" },
  { label: "Services", href: ROUTES.services, sectionId: "services" },
  { label: "Work", href: ROUTES.work, sectionId: "work" },
  { label: "Pricing", href: ROUTES.pricing, sectionId: "pricing" },
] as const satisfies readonly NavigationItem[];

export const mobileNavigationItems = [
  { label: "Home", href: ROUTES.home, id: "home", icon: "home" },
  {
    label: "Services",
    href: ROUTES.services,
    id: "services",
    icon: "services",
  },
  { label: "Work", href: ROUTES.work, id: "work", icon: "work" },
  { label: "About", href: ROUTES.about, id: "aboutus", icon: "about" },
  {
    label: "Contact",
    href: ROUTES.contact,
    id: "contact",
    icon: "contact",
  },
] as const satisfies readonly MobileNavigationItem[];

export const footerNavigationGroups = [
  {
    title: "Company",
    links: [
      { label: "About", href: ROUTES.about },
      { label: "Services", href: ROUTES.services },
      { label: "Work", href: ROUTES.work },
      { label: "Pricing", href: ROUTES.pricing },
      { label: "Blog", href: ROUTES.blog },
      { label: "Contact", href: ROUTES.contact },
    ],
  },
] as const satisfies readonly NavigationGroup[];
