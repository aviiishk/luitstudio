import type { Metadata } from "next";

import { AutomationShowcase } from "@/components/sections/services/AutomationShowcase";
import { BrandShowcase } from "@/components/sections/services/BrandShowcase";
import { BuildShowcase } from "@/components/sections/services/BuildShowcase";
import { ContentShowcase } from "@/components/sections/services/ContentShowcase";
import { DesignShowcase } from "@/components/sections/services/DesignShowcase";
import { GrowShowcase } from "@/components/sections/services/GrowShowcase";
import { HowWeWork } from "@/components/sections/services/HowWeWork";
import { ServiceCombinations } from "@/components/sections/services/ServiceCombinations";
import { ServiceMap } from "@/components/sections/services/ServiceMap";
import { ServicesFinalCTA } from "@/components/sections/services/ServicesFinalCTA";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { WhatYouGet } from "@/components/sections/services/WhatYouGet";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import { servicesMetadata } from "@/config/metadata";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = servicesMetadata;

// A purpose-built page, not a homepage remix. Every discipline gets its
// own visual language instead of a repeated card: a browser mockup for
// Build, a dark workflow diagram for Automation, floating UI artifacts
// for Design, a brand-system collage for Graphic Design, a two-column
// editorial split for Grow, and a cinematic film frame for Video/Motion.
// See discipline-map.ts for the single source tying it all together.
export default function ServicesPage() {
  return (
    <main id="main-content">
      <BreadcrumbSchema items={[{ name: "Services", path: ROUTES.services }]} />
      <ServicesHero />
      <ServiceMap />
      <BuildShowcase />
      <AutomationShowcase />
      <DesignShowcase />
      <BrandShowcase />
      <GrowShowcase />
      <ContentShowcase />
      <HowWeWork />
      <WhatYouGet />
      <ServiceCombinations />
      <ServicesFinalCTA />
    </main>
  );
}
