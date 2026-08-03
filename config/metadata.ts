import type { Metadata, Viewport } from "next";

import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants/routes";

const defaultTitle = `${siteConfig.name} — Creative Agency`;
const contactDescription = `Start a branding, ecommerce, or digital design project with ${siteConfig.name}.`;
const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — Creative Agency`,
} as const;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  alternates: {
    canonical: ROUTES.home,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: defaultTitle,
    description: siteConfig.description,
    url: ROUTES.home,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
    images: [socialImage],
  },
};

export const defaultViewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export const contactMetadata: Metadata = {
  title: "Contact",
  description: contactDescription,
  alternates: {
    canonical: ROUTES.contact,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: `Contact ${siteConfig.name}`,
    description: contactDescription,
    url: ROUTES.contact,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact ${siteConfig.name}`,
    description: contactDescription,
    images: [socialImage],
  },
};
