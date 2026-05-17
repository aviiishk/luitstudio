import { ABOUT_IMAGES, HERO_IMAGES } from "@/lib/site-images";
import { PROJECT_ARTWORK } from "@/lib/project-artwork";

export const siteConfig = {
  name: "Luit Studio",
  legalName: "Luit Studio",
  url: "https://luitstudio.com",
  email: "luitstudio.in@gmail.com",
  locale: "en_US",
  location: {
    locality: "Guwahati",
    region: "Assam",
    postalCode: "781001",
    country: "IN",
  },
  socialLinks: [
    "https://www.instagram.com/luitstudio",
    "https://x.com/luitstudio",
    "https://www.linkedin.com/company/luitstudio",
    "https://github.com/luitstudio",
  ],
  keywords: [
    "creative agency guwahati",
    "web design guwahati",
    "branding agency guwahati",
    "UI UX agency guwahati",
    "SEO agency guwahati",
    "digital agency guwahati",
    "web development agency",
    "performance marketing agency",
    "Luit Studio",
  ],
} as const;

export const SITE_URL = siteConfig.url;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export const seoImages = {
  home: absoluteUrl(HERO_IMAGES.cinematic),
  about: absoluteUrl(ABOUT_IMAGES.hero),
  services: absoluteUrl(HERO_IMAGES.cinematic),
  work: absoluteUrl(PROJECT_ARTWORK.fintrack),
  contact: absoluteUrl(HERO_IMAGES.contact),
  logo: absoluteUrl("/icon-512.png"),
} as const;

export const defaultDescription =
  "Luit Studio is a creative digital agency in Guwahati building high-performance websites, UI/UX systems, brand identities, SEO strategies, and growth-focused digital products.";

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: seoImages.logo,
      },
      image: seoImages.home,
      email: siteConfig.email,
      contactPoint: {
        "@type": "ContactPoint",
        email: siteConfig.email,
        contactType: "customer support",
        areaServed: "IN",
        availableLanguage: ["en"],
      },
      sameAs: siteConfig.socialLinks,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.location.locality,
        addressRegion: siteConfig.location.region,
        postalCode: siteConfig.location.postalCode,
        addressCountry: siteConfig.location.country,
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: siteConfig.name,
      url: SITE_URL,
      image: seoImages.home,
      logo: seoImages.logo,
      email: siteConfig.email,
      priceRange: "$$",
      areaServed: [
        {
          "@type": "City",
          name: "Guwahati",
        },
        {
          "@type": "State",
          name: "Assam",
        },
        {
          "@type": "Country",
          name: "India",
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.location.locality,
        addressRegion: siteConfig.location.region,
        postalCode: siteConfig.location.postalCode,
        addressCountry: siteConfig.location.country,
      },
      sameAs: siteConfig.socialLinks,
      parentOrganization: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: siteConfig.name,
      url: SITE_URL,
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      inLanguage: "en",
    },
  ],
} as const;
