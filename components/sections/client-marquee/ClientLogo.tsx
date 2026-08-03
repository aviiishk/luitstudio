import {
  Blocks,
  CircleDotDashed,
  MoveUpRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

import type {
  ClientLogoData,
  ClientLogoMark,
} from "@/components/sections/client-marquee/logo-data";

interface ClientLogoProps {
  logo: ClientLogoData;
}

const logoMarks = {
  arrow: MoveUpRight,
  grid: Blocks,
  orbit: CircleDotDashed,
  shield: ShieldCheck,
  spark: Sparkles,
} satisfies Record<ClientLogoMark, typeof Sparkles>;

export function ClientLogo({ logo }: ClientLogoProps) {
  if (logo.type === "image") {
    return (
      <li className="flex h-12 w-44 shrink-0 items-center justify-center sm:w-48">
        <Image
          src={logo.src}
          alt={logo.name}
          width={logo.width}
          height={logo.height}
          className="h-8 w-auto object-contain sm:h-9"
        />
      </li>
    );
  }

  const Mark = logoMarks[logo.mark];

  return (
    <li className="flex h-12 w-44 shrink-0 items-center justify-center sm:w-48">
      <span className="flex items-center gap-2.5" style={{ color: logo.color }}>
        <Mark aria-hidden="true" size={30} strokeWidth={2.2} />
        <span className="text-xl font-semibold tracking-[-0.035em]">
          {logo.name}
        </span>
      </span>
    </li>
  );
}
