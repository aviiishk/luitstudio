export type NavigationIcon =
  | "about"
  | "blog"
  | "career"
  | "contact"
  | "home"
  | "services";

export interface NavigationItem {
  label: string;
  href: string;
}

export interface MobileNavigationItem {
  label: string;
  href: string;
  id: string;
  icon: NavigationIcon;
}

export interface NavigationLink {
  label: string;
  href: string;
}

export interface NavigationGroup {
  title: string;
  links: readonly NavigationLink[];
}
