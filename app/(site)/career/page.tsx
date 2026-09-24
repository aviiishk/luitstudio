import type { Metadata } from "next";

import { CareerPage } from "@/components/sections/career/CareerPage";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import { careerMetadata } from "@/config/metadata";
import { ROUTES } from "@/constants/routes";
import { getPublishedOpenings } from "@/lib/careers";

export const metadata: Metadata = careerMetadata;

export default async function CareerRoute() {
  const openings = await getPublishedOpenings();
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Career", path: ROUTES.career }]} />
      <CareerPage openings={openings} />
    </>
  );
}
