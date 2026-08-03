import { ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export function ServicesCTA() {
  return (
    <aside
      aria-label="Start a project"
      className="bg-ink grid items-center gap-8 rounded-2xl p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:p-10"
    >
      <h3 className="max-w-md text-center text-2xl leading-tight text-white lg:text-left">
        See Our Work in Action. Start Your Creative Journey with Us!
      </h3>
      <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-end">
        <ButtonLink
          href={ROUTES.contact}
          variant="light"
          icon={ArrowUpRight}
          className="pr-2"
        >
          Let&apos;s Collaborate
        </ButtonLink>
        <ButtonLink
          href={ROUTES.work}
          variant="outlineLight"
          icon={ArrowUpRight}
          className="pr-2"
        >
          View Portfolio
        </ButtonLink>
      </div>
    </aside>
  );
}
