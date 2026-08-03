import type { SocialLink, SocialPlatform } from "@/types/contact";

function createSocialLink(
  label: string,
  platform: SocialPlatform,
  value: string | undefined,
): SocialLink | null {
  if (!value) return null;

  try {
    const url = new URL(value);
    const isProfilePath = url.pathname !== "/";

    if (url.protocol !== "https:" || !isProfilePath) return null;

    return { label, platform, href: url.toString() };
  } catch {
    return null;
  }
}

const configuredSocialLinks = [
  createSocialLink(
    "Facebook",
    "facebook",
    process.env.NEXT_PUBLIC_FACEBOOK_URL,
  ),
  createSocialLink("X", "x", process.env.NEXT_PUBLIC_X_URL),
  createSocialLink(
    "LinkedIn",
    "linkedin",
    process.env.NEXT_PUBLIC_LINKEDIN_URL,
  ),
  createSocialLink(
    "Instagram",
    "instagram",
    process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  ),
  createSocialLink("GitHub", "github", process.env.NEXT_PUBLIC_GITHUB_URL),
  createSocialLink("Behance", "behance", process.env.NEXT_PUBLIC_BEHANCE_URL),
].filter((link): link is SocialLink => link !== null);

export const contactSocialLinks: readonly SocialLink[] = configuredSocialLinks;

export const mobileSocialLinks: readonly SocialLink[] = configuredSocialLinks;
