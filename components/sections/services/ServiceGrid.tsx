import { ServiceCard } from "@/components/sections/services/ServiceCard";
import { services } from "@/components/sections/services/service-data";
import { Reveal } from "@/components/shared/reveal";

export function ServiceGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {services.map(({ icon: Icon, ...service }, index) => (
        <Reveal key={service.id} delay={0.06 + index * 0.06} className="h-full">
          <ServiceCard
            service={service}
            index={index}
            icon={
              <Icon
                aria-hidden="true"
                className="size-10 transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-105 group-hover:rotate-3 motion-reduce:transform-none"
                strokeWidth={1.4}
              />
            }
          />
        </Reveal>
      ))}
    </div>
  );
}
