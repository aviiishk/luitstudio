import { contactDetails } from "@/config/contact";
import { contactSocialLinks } from "@/config/social";
import { siteConfig } from "@/config/site";
import { studioLocation } from "@/config/studio";

function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon-512.png`,
    email: contactDetails.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: studioLocation.city,
      addressRegion: studioLocation.state,
      addressCountry: studioLocation.countryCode,
    },
    ...(contactSocialLinks.length > 0
      ? { sameAs: contactSocialLinks.map((link) => link.href) }
      : {}),
  };
}

function buildWebsiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [buildOrganizationSchema(), buildWebsiteSchema()],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
