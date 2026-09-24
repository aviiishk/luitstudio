import { siteConfig } from "@/config/site";

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbSchemaProps {
  items: readonly BreadcrumbItem[];
}

// Always prepends Home -- callers only pass the trail after that.
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const trail = [{ name: "Home", path: "/" }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
