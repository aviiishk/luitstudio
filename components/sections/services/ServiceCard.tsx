import type { ServiceData } from "@/components/sections/services/service-data";

interface ServiceCardProps {
  service: ServiceData;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <article
      aria-labelledby={`${service.id}-title`}
      className={`group hover:shadow-soft flex h-full min-h-48 flex-col justify-between rounded-2xl border border-transparent p-6 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 motion-reduce:transform-none sm:min-h-52 sm:p-8 ${service.themeClassName}`}
    >
      <Icon
        aria-hidden="true"
        className="size-10 transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-105 group-hover:rotate-3 motion-reduce:transform-none"
        strokeWidth={1.4}
      />
      <h3
        id={`${service.id}-title`}
        className="max-w-36 text-2xl leading-tight font-medium text-current transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
      >
        {service.title}
      </h3>
    </article>
  );
}
