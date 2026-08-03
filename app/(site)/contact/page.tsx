import { Contact } from "@/components/sections/contact";
import { contactMetadata } from "@/config/metadata";

export const metadata = contactMetadata;

export default function ContactPage() {
  return (
    <main id="main-content">
      <Contact />
    </main>
  );
}
