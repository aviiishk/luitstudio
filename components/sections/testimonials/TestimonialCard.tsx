import { Star } from "lucide-react";
import Image from "next/image";

import type { Testimonial } from "@/types/testimonial";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const toneClasses = {
  photo: "bg-ink text-white",
  yellow: "bg-yellow text-ink",
  dark: "bg-ink text-white",
  light: "bg-surface text-ink",
} as const;

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const backgroundImage =
    testimonial.tone === "photo" ? testimonial.image : null;
  const storyImage = testimonial.tone === "dark" ? testimonial.image : null;
  const authorDetails = [testimonial.role, testimonial.company]
    .filter(Boolean)
    .join(" of ");

  return (
    <article
      className={`group hover:shadow-soft relative isolate flex h-full min-h-80 flex-col overflow-hidden rounded-2xl p-6 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 motion-reduce:transform-none sm:p-8 lg:min-h-96 lg:p-10 ${toneClasses[testimonial.tone]}`}
    >
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage.src}
            alt={backgroundImage.alt}
            width={backgroundImage.width}
            height={backgroundImage.height}
            sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(50vw - 36px), 848px"
            placeholder="blur"
            blurDataURL={backgroundImage.blurDataURL}
            className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transform-none"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-black/25"
          />
        </>
      ) : null}

      <p
        className={`text-sm font-medium tracking-[0.12em] uppercase ${
          testimonial.tone === "photo" || testimonial.tone === "dark"
            ? "text-white/70"
            : "text-ink/70"
        }`}
      >
        {testimonial.eyebrow}
      </p>

      {testimonial.statistic ? (
        <div className="mt-auto flex flex-col gap-2 pt-16">
          <p className="text-[clamp(4rem,9vw,6rem)] leading-none font-medium tracking-[-0.055em]">
            {testimonial.statistic.value}
          </p>
          <p className="max-w-sm text-2xl leading-tight font-medium">
            {testimonial.statistic.label}
          </p>
        </div>
      ) : null}

      {testimonial.quote ? (
        <div
          className={`mt-auto flex flex-col gap-6 ${storyImage ? "pt-8" : "pt-16"}`}
        >
          <blockquote>
            <p
              className={`leading-tight font-medium ${
                testimonial.tone === "light"
                  ? "text-[clamp(1.75rem,4vw,2.5rem)] tracking-[-0.025em]"
                  : "text-2xl sm:text-[1.75rem]"
              }`}
            >
              “{testimonial.quote}”
            </p>
          </blockquote>

          {testimonial.rating ? (
            <div
              className="text-yellow flex gap-1"
              aria-label={`${testimonial.rating} out of 5 stars`}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  aria-hidden="true"
                  size={18}
                  fill={
                    index < Math.round(testimonial.rating ?? 0)
                      ? "currentColor"
                      : "none"
                  }
                />
              ))}
            </div>
          ) : null}

          {testimonial.name ? (
            <footer className="flex items-center gap-3">
              {testimonial.avatar ? (
                <Image
                  src={testimonial.avatar.src}
                  alt={testimonial.avatar.alt}
                  width={testimonial.avatar.width}
                  height={testimonial.avatar.height}
                  sizes="48px"
                  className="size-12 rounded-full object-cover"
                />
              ) : null}
              <div>
                <cite className="text-lg font-medium not-italic">
                  {testimonial.name}
                </cite>
                {authorDetails ? (
                  <p
                    className={
                      testimonial.tone === "photo" ||
                      testimonial.tone === "dark"
                        ? "text-sm text-white/70"
                        : "text-ink/70 text-sm"
                    }
                  >
                    {authorDetails}
                  </p>
                ) : null}
              </div>
            </footer>
          ) : null}

          {storyImage ? (
            <div className="relative aspect-[86/55] overflow-hidden rounded-xl bg-white/10">
              <Image
                src={storyImage.src}
                alt={storyImage.alt}
                width={storyImage.width}
                height={storyImage.height}
                sizes="(max-width: 767px) calc(100vw - 88px), (max-width: 1023px) calc(50vw - 84px), 344px"
                placeholder="blur"
                blurDataURL={storyImage.blurDataURL}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transform-none"
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
