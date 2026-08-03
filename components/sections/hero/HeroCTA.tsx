import { ArrowUpRight } from "lucide-react";

import { HeroImage } from "@/components/sections/hero/HeroImage";
import { ButtonLink } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export function HeroCTA() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-10">
      <ButtonLink
        href={ROUTES.contact}
        variant="brand"
        icon={ArrowUpRight}
        className="min-w-40 pr-2"
      >
        Book a Call
      </ButtonLink>
      <HeroImage />
    </div>
  );
}
