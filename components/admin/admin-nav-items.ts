import { Award, GraduationCap, LayoutDashboard, Newspaper } from "lucide-react";

export const adminNavItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Blog", href: "/admin/blog", icon: Newspaper },
  { label: "Students", href: "/admin/students", icon: GraduationCap },
  { label: "Certificates", href: "/admin/certificates", icon: Award },
] as const;

export function isAdminNavItemActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}
