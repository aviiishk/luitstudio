import { SiteHeader } from "@/components/layout/site-header";
import { Footer } from "@/components/sections/footer";
import { CalProvider } from "@/components/shared/CalProvider";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <CalProvider />
      <SiteHeader />
      {children}
      <Footer />
    </>
  );
}
