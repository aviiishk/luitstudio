import Image from "next/image";

import { siteConfig } from "@/config/site";

interface LogoProps {
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function Logo({
  className = "h-9 w-auto",
  priority = false,
  sizes = "260px",
}: LogoProps) {
  return (
    <Image
      src="/logo/luit-logo.png"
      alt={siteConfig.name}
      width={1774}
      height={887}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
