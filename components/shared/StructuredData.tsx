import { contactDetails } from "@/config/contact";
import { contactSocialLinks } from "@/config/social";
import { siteConfig } from "@/config/site";
import { studioLocation } from "@/config/studio";
import { whatsappConfig } from "@/config/whatsapp";
import { services } from "@/components/sections/services/service-data";
import { pricingTracks } from "@/data/pricing";
import { getPublishedTeamMembers } from "@/lib/team";

// Guwahati city-centre coordinates -- a public geographic fact, not a
// claim about the studio's exact address.
const GUWAHATI_GEO = { latitude: 26.1445, longitude: 91.7362 };

const AREA_SERVED = ["Guwahati", "Assam", "Northeast India", "India"];

function buildOrganizationSchema() {
  // A single node carrying both Organization and ProfessionalService
  // (a LocalBusiness subtype) is valid schema.org practice and is what
  // makes "best [service] in Guwahati" style local queries findable --
  // Organization alone carries no geo/areaServed/telephone signal.
  //
  // Conventional relative tier notation (₹ budget / ₹₹ moderate / ₹₹₹
  // premium), not an absolute figure -- schema.org's priceRange expects
  // this style, and data/pricing.ts's real project-track pricing (from
  // ₹75,000) puts the studio at "moderate". Update by hand if that
  // changes meaningfully.
  const hasPricingData = pricingTracks.length > 0;

  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon-512.png`,
    image: `${siteConfig.url}/icon-512.png`,
    email: contactDetails.email,
    telephone: `+${whatsappConfig.number}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: studioLocation.city,
      addressRegion: studioLocation.state,
      addressCountry: studioLocation.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GUWAHATI_GEO.latitude,
      longitude: GUWAHATI_GEO.longitude,
    },
    areaServed: AREA_SERVED,
    ...(hasPricingData ? { priceRange: "₹₹" } : {}),
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

function buildServiceSchemas() {
  return services.map((service) => ({
    "@type": "Service",
    "@id": `${siteConfig.url}/#service-${service.id}`,
    name: service.title,
    description: service.description,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: AREA_SERVED,
  }));
}

async function buildPersonSchemas() {
  const members = await getPublishedTeamMembers();

  return members.map((member) => ({
    "@type": "Person",
    "@id": `${siteConfig.url}/#person-${member.id}`,
    name: member.name,
    jobTitle: member.role,
    worksFor: { "@id": `${siteConfig.url}/#organization` },
    ...(member.imageUrl ? { image: member.imageUrl } : {}),
  }));
}

export async function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      buildWebsiteSchema(),
      ...buildServiceSchemas(),
      ...(await buildPersonSchemas()),
    ],
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
