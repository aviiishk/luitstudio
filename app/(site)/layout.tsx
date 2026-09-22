import { SiteHeader } from "@/components/layout/site-header";
import { Footer } from "@/components/sections/footer";
import { CalProvider } from "@/components/shared/CalProvider";
import { FloatingWhatsAppButton } from "@/components/shared/FloatingWhatsAppButton";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <CalProvider />
      <SiteHeader />
      {children}
      <Footer />
      <FloatingWhatsAppButton />
    </>
  );
}
