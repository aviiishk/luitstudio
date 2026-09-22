import { BookCallButton } from "@/components/shared/BookCallButton";
import { ButtonLink } from "@/components/ui/button";

export function HeroCTA() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
        <BookCallButton variant="brand" className="min-w-40 pr-2">
          Book a Call
        </BookCallButton>
        <ButtonLink href="#process" variant="outline" className="min-w-40">
          See How It Works
        </ButtonLink>
      </div>
      <p className="text-body text-sm font-medium">
        Led personally by our co-founders — no hand-offs.
      </p>
    </div>
  );
}
