import Image from "next/image";

import { siteConfig } from "@/config/site";

interface LogoProps {
  className?: string;
  priority?: boolean;
}

export function Logo({ className = "h-9 w-auto", priority = false }: LogoProps) {
  return (
    <Image
      src="/logo/luit-logo.png"
      alt={siteConfig.name}
      width={594}
      height={534}
      priority={priority}
      className={className}
    />
  );
}
