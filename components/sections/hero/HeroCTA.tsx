import { HeroImage } from "@/components/sections/hero/HeroImage";
import { BookCallButton } from "@/components/shared/BookCallButton";

export function HeroCTA() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-10">
      <BookCallButton variant="brand" className="min-w-40 pr-2">
        Book a Call
      </BookCallButton>
      <HeroImage />
    </div>
  );
}
