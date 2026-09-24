import type { Metadata, Viewport } from "next";

import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants/routes";

const defaultTitle = `${siteConfig.name} — Web Development & Design Studio in Guwahati, Assam`;
const contactDescription = `Start a web development, design, or marketing project with ${siteConfig.name} — serving Guwahati, Assam, Northeast India, and clients abroad.`;
const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — Web Development & Design Studio in Guwahati, Assam`,
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
  verification: {
    google: "txZyO1V3lFNg4uZt0EzAPc6LoR3G-tBwfwUk3GTPcNk",
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
  title: "Contact Us — Guwahati, Assam",
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

const servicesDescription = `Web development, AI automation, UI/UX design, digital marketing, social media, video editing, and motion graphics — from ${siteConfig.name}, serving Guwahati, Assam, Northeast India, and clients abroad.`;

export const servicesMetadata: Metadata = {
  title: "Web Development, AI Automation & Design Services in Guwahati",
  description: servicesDescription,
  alternates: {
    canonical: ROUTES.services,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: `Services | ${siteConfig.name}`,
    description: servicesDescription,
    url: ROUTES.services,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `Services | ${siteConfig.name}`,
    description: servicesDescription,
    images: [socialImage],
  },
};

const aboutDescription = `${siteConfig.name} is a design and build studio in Guwahati, Assam, co-founded by Abhishek Kumar Prasad and Prince Das.`;

export const aboutMetadata: Metadata = {
  title: "About Us — Guwahati-based Design & Build Studio",
  description: aboutDescription,
  alternates: {
    canonical: ROUTES.about,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: `About | ${siteConfig.name}`,
    description: aboutDescription,
    url: ROUTES.about,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `About | ${siteConfig.name}`,
    description: aboutDescription,
    images: [socialImage],
  },
};

const careerDescription = `Careers at ${siteConfig.name} — a small design and build studio in Guwahati, Assam.`;

export const careerMetadata: Metadata = {
  title: "Careers in Guwahati, Assam",
  description: careerDescription,
  alternates: {
    canonical: ROUTES.career,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: `Careers | ${siteConfig.name}`,
    description: careerDescription,
    url: ROUTES.career,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `Careers | ${siteConfig.name}`,
    description: careerDescription,
    images: [socialImage],
  },
};
