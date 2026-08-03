import { ServiceCard } from "@/components/sections/services/ServiceCard";
import { services } from "@/components/sections/services/service-data";
import { Reveal } from "@/components/shared/reveal";

export function ServiceGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
      {services.map((service, index) => (
        <Reveal key={service.id} delay={0.06 + index * 0.06} className="h-full">
          <ServiceCard service={service} />
        </Reveal>
      ))}
    </div>
  );
}
