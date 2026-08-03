import { Star } from "lucide-react";
import Image from "next/image";

const reviewerImages = [
  "/images/profile/user-1.jpg",
  "/images/profile/user-2.jpg",
  "/images/profile/user-3.jpg",
  "/images/profile/user-4.jpg",
] as const;

export function HeroImage() {
  return (
    <div
      role="group"
      className="flex items-center justify-center gap-3 sm:gap-4"
      aria-label="Client trust rating"
    >
      <div className="flex shrink-0 -space-x-3" aria-hidden="true">
        {reviewerImages.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt=""
            width={44}
            height={44}
            sizes="44px"
            priority={index === 0}
            className="size-11 rounded-full border-2 border-white object-cover"
          />
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <div
          role="img"
          className="text-yellow flex gap-0.5"
          aria-label="4 out of 5 stars"
        >
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              aria-hidden="true"
              size={18}
              strokeWidth={1.75}
              fill={index < 4 ? "currentColor" : "none"}
            />
          ))}
        </div>
        <p className="text-body text-sm sm:text-base">
          Trusted by 1000+ clients
        </p>
      </div>
    </div>
  );
}
