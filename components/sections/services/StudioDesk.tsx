import {
  AudioWaveform,
  Camera,
  Code2,
  Laptop,
  Layers,
  Palette,
  PenTool,
  Smartphone,
  Type as TypeIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/ui/container";

const deskItems: Array<{ label: string; icon: LucideIcon; rotate: number }> = [
  { label: "Laptop", icon: Laptop, rotate: -4 },
  { label: "Phone", icon: Smartphone, rotate: 5 },
  { label: "Camera", icon: Camera, rotate: -6 },
  { label: "Sketches", icon: PenTool, rotate: 4 },
  { label: "Typography", icon: TypeIcon, rotate: -3 },
  { label: "Color cards", icon: Palette, rotate: 6 },
  { label: "Code", icon: Code2, rotate: -5 },
  { label: "Timeline", icon: AudioWaveform, rotate: 3 },
  { label: "Wireframes", icon: Layers, rotate: -7 },
];

export function StudioDesk() {
  return (
    <section
      aria-labelledby="studio-desk-heading"
      className="py-16 md:py-20 xl:py-24"
    >
      <Container className="flex flex-col items-center gap-10 text-center">
        <Reveal className="flex flex-col items-center gap-3">
          <span className="text-body/60 text-xs font-semibold tracking-[0.2em] uppercase">
            What&apos;s on the desk
          </span>
          <h2
            id="studio-desk-heading"
            className="font-handwriting text-ink -rotate-1 text-3xl sm:text-4xl"
          >
            Design × Technology × Content
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {deskItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="border-border flex flex-col items-center gap-2 rounded-2xl border bg-white px-5 py-4 shadow-sm transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-md motion-reduce:transform-none"
                style={{ transform: `rotate(${item.rotate}deg)` }}
              >
                <Icon aria-hidden="true" size={20} strokeWidth={1.6} className="text-ink/70" />
                <span className="text-body/60 text-[0.65rem] font-medium tracking-wide uppercase">
                  {item.label}
                </span>
              </div>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
