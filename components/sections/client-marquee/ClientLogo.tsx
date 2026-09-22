import Image from "next/image";

import type { ClientLogoData } from "@/components/sections/client-marquee/logo-data";

interface ClientLogoProps {
  logo: ClientLogoData;
}

export function ClientLogo({ logo }: ClientLogoProps) {
  return (
    <li className="flex h-12 w-full max-w-36 items-center justify-center sm:max-w-44">
      <Image
        src={logo.src}
        alt={logo.name}
        width={logo.width}
        height={logo.height}
        sizes="192px"
        className="h-8 w-auto object-contain sm:h-9"
      />
    </li>
  );
}
