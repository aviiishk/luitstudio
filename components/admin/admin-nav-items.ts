import {
  Award,
  Briefcase,
  GraduationCap,
  LayoutDashboard,
  Mail,
  Newspaper,
  Users,
} from "lucide-react";

export const adminNavItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Blog", href: "/admin/blog", icon: Newspaper },
  { label: "Careers", href: "/admin/careers", icon: Briefcase },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Messages", href: "/admin/contact-submissions", icon: Mail },
  { label: "Students", href: "/admin/students", icon: GraduationCap },
  { label: "Certificates", href: "/admin/certificates", icon: Award },
] as const;

export function isAdminNavItemActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}
