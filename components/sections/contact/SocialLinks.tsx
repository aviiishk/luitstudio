import {
  Dribbble,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Palette,
  Twitter,
} from "lucide-react";

import type { SocialLink, SocialPlatform } from "@/types/contact";
import { getExternalLinkAttributes } from "@/utils/external-link";

interface SocialLinksProps {
  links: readonly SocialLink[];
  inverse?: boolean;
}

const socialIcons = {
  behance: Palette,
  dribbble: Dribbble,
  facebook: Facebook,
  github: Github,
  instagram: Instagram,
  linkedin: Linkedin,
  x: Twitter,
} satisfies Record<SocialPlatform, typeof Dribbble>;

export function SocialLinks({ links, inverse = false }: SocialLinksProps) {
  if (links.length === 0) return null;

  return (
    <ul aria-label="Social media" className="flex flex-wrap gap-3">
      {links.map((link) => {
        const Icon = socialIcons[link.platform];

        return (
          <li key={link.platform}>
            <a
              href={link.href}
              {...getExternalLinkAttributes(link.label)}
              className={`group hover:shadow-soft focus-visible:shadow-soft grid size-11 place-items-center rounded-full border transition-[color,background-color,border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 active:translate-y-0 active:scale-[0.96] motion-reduce:transform-none ${
                inverse
                  ? "hover:text-ink border-white/30 text-white hover:border-white hover:bg-white"
                  : "border-border text-ink hover:border-brand hover:bg-brand hover:text-white"
              }`}
            >
              <Icon
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:scale-105 group-hover:-rotate-6 group-focus-visible:scale-105 group-focus-visible:-rotate-6 motion-reduce:transform-none"
                size={19}
                strokeWidth={1.8}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
