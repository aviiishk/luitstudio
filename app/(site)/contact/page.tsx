import { Contact } from "@/components/sections/contact";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import { contactMetadata } from "@/config/metadata";
import { ROUTES } from "@/constants/routes";

export const metadata = contactMetadata;

export default function ContactPage() {
  return (
    <main id="main-content">
      <BreadcrumbSchema items={[{ name: "Contact", path: ROUTES.contact }]} />
      <Contact />
    </main>
  );
}
