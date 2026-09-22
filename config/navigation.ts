import { ROUTES } from "@/constants/routes";
import type {
  MobileNavigationItem,
  NavigationGroup,
  NavigationItem,
} from "@/types/navigation";

// "Work" is intentionally left out of navigation until there is at least one
// real, permissioned case study to show — see the audit remediation plan.
// Re-add a Work entry (ROUTES.work) once that content exists.
//
// Multi-page structure: Home keeps its full content, and Services/About/
// Career/Blog/Contact are now real routes (not homepage anchors). Pricing
// stays a Home-only section, reachable from the footer, not the top nav.

export const navigationItems = [
  { label: "Home", href: ROUTES.home },
  { label: "Services", href: ROUTES.services },
  { label: "About", href: ROUTES.about },
  { label: "Career", href: ROUTES.career },
  { label: "Blog", href: ROUTES.blog },
  { label: "Contact", href: ROUTES.contact },
] as const satisfies readonly NavigationItem[];

export const mobileNavigationItems = [
  { label: "Home", href: ROUTES.home, id: "home", icon: "home" },
  {
    label: "Services",
    href: ROUTES.services,
    id: "services",
    icon: "services",
  },
  { label: "About", href: ROUTES.about, id: "about", icon: "about" },
  { label: "Career", href: ROUTES.career, id: "career", icon: "career" },
  { label: "Blog", href: ROUTES.blog, id: "blog", icon: "blog" },
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
      { label: "Home", href: ROUTES.home },
      { label: "Services", href: ROUTES.services },
      { label: "About", href: ROUTES.about },
      { label: "Career", href: ROUTES.career },
      { label: "Pricing", href: ROUTES.pricing },
      { label: "Blog", href: ROUTES.blog },
      { label: "Contact", href: ROUTES.contact },
    ],
  },
] as const satisfies readonly NavigationGroup[];
