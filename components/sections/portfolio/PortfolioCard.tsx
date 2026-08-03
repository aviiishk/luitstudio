import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { PortfolioBadge } from "@/components/sections/portfolio/PortfolioBadge";
import type { PortfolioProject } from "@/types/portfolio";
import { getExternalLinkAttributes } from "@/utils/external-link";

interface PortfolioCardProps {
  project: PortfolioProject;
}

export function PortfolioCard({ project }: PortfolioCardProps) {
  const cardContent = (
    <>
      <div className="bg-surface relative aspect-[624/410] overflow-hidden rounded-2xl">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1360px) calc(50vw - 36px), 636px"
          placeholder="blur"
          blurDataURL={project.image.blurDataURL}
          className={`h-full w-full object-cover transition-transform duration-500 ease-out motion-reduce:transform-none ${
            project.cta
              ? "group-hover:scale-[1.035] group-focus-visible:scale-[1.035]"
              : ""
          }`}
        />

        {project.cta ? (
          <>
            <span
              aria-hidden="true"
              className="bg-ink/65 absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
            />
            <span className="text-ink shadow-soft group-hover:bg-brand group-focus-visible:bg-brand absolute top-5 right-5 grid size-12 translate-y-2 place-items-center rounded-full bg-white opacity-0 transition-[transform,opacity,background-color,color] duration-300 group-hover:translate-y-0 group-hover:text-white group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:text-white group-focus-visible:opacity-100 motion-reduce:transform-none">
              <ArrowUpRight
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5 motion-reduce:transform-none"
                size={26}
                strokeWidth={1.6}
              />
            </span>
          </>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 pt-5">
        <h3
          className={`text-ink text-2xl font-medium transition-colors duration-200 ${
            project.cta
              ? "group-hover:text-brand group-focus-visible:text-brand"
              : ""
          }`}
        >
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-3">
          <PortfolioBadge>{project.category}</PortfolioBadge>
          {project.technologies.map((technology) => (
            <PortfolioBadge key={technology}>{technology}</PortfolioBadge>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <article className="h-full">
      {project.cta ? (
        <Link
          href={project.cta.href}
          className="group focus-visible:outline-brand hover:shadow-soft focus-visible:shadow-soft block h-full rounded-2xl transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 active:translate-y-0 active:scale-[0.995] motion-reduce:transform-none"
          {...(project.cta.external
            ? getExternalLinkAttributes(project.cta.label)
            : { "aria-label": project.cta.label })}
        >
          {cardContent}
        </Link>
      ) : (
        <div className="h-full">{cardContent}</div>
      )}
    </article>
  );
}
