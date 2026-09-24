import type { Metadata } from "next";

import { AboutApproach } from "@/components/sections/about/AboutApproach";
import { AboutBelief } from "@/components/sections/about/AboutBelief";
import { AboutCTA } from "@/components/sections/about/AboutCTA";
import { AboutGlobal } from "@/components/sections/about/AboutGlobal";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutJourney } from "@/components/sections/about/AboutJourney";
import { AboutOrigin } from "@/components/sections/about/AboutOrigin";
import { AboutPeople } from "@/components/sections/about/AboutPeople";
import { AboutWork } from "@/components/sections/about/AboutWork";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import { aboutMetadata } from "@/config/metadata";
import { ROUTES } from "@/constants/routes";
import { getPublishedTeamMembers } from "@/lib/team";

export const metadata: Metadata = aboutMetadata;

// "What's next" is deliberately not built yet — it needs a real, modest
// direction from the founders, not an invented roadmap.
export default async function AboutPage() {
  const teamMembers = await getPublishedTeamMembers();

  return (
    <main id="main-content">
      <BreadcrumbSchema items={[{ name: "About", path: ROUTES.about }]} />
      <AboutHero />
      <AboutJourney>
        <AboutOrigin />
        <AboutBelief />
        <AboutApproach />
        <AboutPeople members={teamMembers} />
        <AboutWork />
        <AboutGlobal />
      </AboutJourney>
      <AboutCTA />
    </main>
  );
}
