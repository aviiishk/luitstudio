import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Palette,
  Twitter,
} from "lucide-react";

import type { SocialLink, SocialPlatform } from "@/types/contact";
import { getExternalLinkAttributes } from "@/utils/external-link";

interface FooterSocialProps {
  links: readonly SocialLink[];
}

const socialIcons = {
  behance: Palette,
  dribbble: Palette,
  facebook: Facebook,
  github: Github,
  instagram: Instagram,
  linkedin: Linkedin,
  x: Twitter,
} satisfies Record<SocialPlatform, typeof Github>;

const featuredPlatforms = [
  { platform: "instagram", label: "Instagram" },
  { platform: "x", label: "X" },
  { platform: "facebook", label: "Facebook" },
] as const satisfies readonly {
  platform: SocialPlatform;
  label: string;
}[];

export function FooterSocial({ links }: FooterSocialProps) {
  const featuredLinks = featuredPlatforms.map((featured) => ({
    ...featured,
    link: links.find((link) => link.platform === featured.platform),
  }));
  const additionalLinks = links.filter(
    (link) =>
      !featuredPlatforms.some(
        (featured) => featured.platform === link.platform,
      ),
  );

  return (
    <section aria-labelledby="footer-connect-heading">
      <h2
        id="footer-connect-heading"
        className="text-ink/70 text-xs font-semibold tracking-[0.2em] uppercase"
      >
        Connect
      </h2>

      <ul aria-label="Social media" className="mt-5 flex flex-wrap gap-2.5">
        {featuredLinks.map(({ platform, label, link }) => {
          const Icon = socialIcons[platform];

          return (
            <li key={platform}>
              {link ? (
                <a
                  href={link.href}
                  {...getExternalLinkAttributes(link.label)}
                  className="group border-ink/15 text-ink hover:border-brand hover:bg-brand focus-visible:border-brand focus-visible:bg-brand grid size-11 place-items-center rounded-full border bg-white/60 transition-[transform,color,background-color,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:text-white hover:shadow-md focus-visible:-translate-y-1 focus-visible:text-white motion-reduce:transform-none"
                >
                  <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
                  <span className="sr-only">{label}</span>
                </a>
              ) : (
                <span
                  role="img"
                  aria-label={`${label} profile coming soon`}
                  title={`${label} profile coming soon`}
                  className="border-ink/20 text-ink/45 grid size-11 cursor-not-allowed place-items-center rounded-full border border-dashed"
                >
                  <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
                </span>
              )}
            </li>
          );
        })}

        {additionalLinks.map((link) => {
          const Icon = socialIcons[link.platform];

          return (
            <li key={link.platform}>
              <a
                href={link.href}
                {...getExternalLinkAttributes(link.label)}
                className="border-ink/15 text-ink hover:border-brand hover:bg-brand focus-visible:border-brand focus-visible:bg-brand grid size-11 place-items-center rounded-full border bg-white/60 transition-[transform,color,background-color,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:text-white hover:shadow-md focus-visible:-translate-y-1 focus-visible:text-white motion-reduce:transform-none"
              >
                <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
                <span className="sr-only">{link.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
