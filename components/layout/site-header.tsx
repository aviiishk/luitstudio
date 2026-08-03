"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";

import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Logo } from "@/components/shared/Logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { mobileNavigationItems, navigationItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants/routes";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrolled } from "@/hooks/use-scrolled";

const sectionIds = navigationItems.map((item) => item.sectionId);

export function SiteHeader() {
  const pathname = usePathname();
  const isScrolled = useScrolled();
  const activeSection = useActiveSection(sectionIds);
  const shouldReduceMotion = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <>
      <motion.header
        className="motion-enhanced no-js-header fixed inset-x-0 top-0 z-50 py-3"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.45,
          ease: "easeOut",
        }}
      >
        <Container>
          <div
            className={`grid min-h-14 grid-cols-[1fr_auto] items-center rounded-full px-3 transition-[background-color,box-shadow] duration-300 xl:grid-cols-[1fr_auto_1fr] ${
              isScrolled ? "shadow-soft bg-white" : "bg-transparent"
            }`}
          >
            <Link
              href={ROUTES.home}
              className="w-fit rounded-sm transition-[transform,opacity] duration-200 hover:-translate-y-0.5 hover:opacity-80 active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none"
              aria-label={`${siteConfig.name} home`}
              onClick={closeMenu}
            >
              <Logo className="h-9 w-auto" priority />
            </Link>

            <nav aria-label="Main navigation" className="hidden xl:block">
              <ul className="bg-surface flex items-center gap-1 rounded-full p-1">
                {navigationItems.map((item) => {
                  const isActive =
                    pathname === "/" && activeSection === item.sectionId;

                  return (
                    <li key={item.sectionId}>
                      <Link
                        href={item.href}
                        aria-current={isActive ? "location" : undefined}
                        className={`hover:text-ink hover:shadow-soft block rounded-full px-4 py-2 text-base font-medium transition-[transform,color,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-white focus-visible:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none ${
                          isActive
                            ? "text-brand shadow-soft ring-brand/15 bg-white ring-1"
                            : "text-body"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="hidden justify-self-end xl:block">
              <ButtonLink
                href={ROUTES.contact}
                variant={pathname === ROUTES.contact ? "brand" : "dark"}
                aria-current={pathname === ROUTES.contact ? "page" : undefined}
                className="min-h-10 px-5"
              >
                Contact
              </ButtonLink>
            </div>

            <button
              ref={menuTriggerRef}
              type="button"
              className="js-only group text-ink grid size-11 place-items-center justify-self-end rounded-full transition-[transform,background-color,opacity] duration-200 hover:-translate-y-0.5 hover:bg-white/70 active:translate-y-0 active:scale-[0.96] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transform-none xl:hidden"
              aria-label="Open navigation"
              aria-controls="mobile-navigation"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transform-none"
                size={28}
                strokeWidth={1.75}
              />
            </button>
          </div>

          <noscript>
            <nav
              aria-label="Mobile navigation fallback"
              className="shadow-soft mt-3 rounded-2xl bg-white p-3 xl:hidden"
            >
              <ul className="grid gap-1">
                {mobileNavigationItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="text-ink hover:text-brand flex min-h-11 items-center rounded-xl px-4 font-medium transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </noscript>
        </Container>
      </motion.header>

      <MobileNavigation
        activeSection={activeSection}
        isOpen={isMenuOpen}
        onClose={closeMenu}
        pathname={pathname}
        triggerRef={menuTriggerRef}
      />
    </>
  );
}
