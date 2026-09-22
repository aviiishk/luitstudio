import type { Metadata } from "next";

import { CareerPage } from "@/components/sections/career/CareerPage";
import { careerMetadata } from "@/config/metadata";
import { getPublishedOpenings } from "@/lib/careers";

export const metadata: Metadata = careerMetadata;

export default async function CareerRoute() {
  const openings = await getPublishedOpenings();
  return <CareerPage openings={openings} />;
}
