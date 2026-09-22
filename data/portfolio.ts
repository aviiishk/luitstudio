import type { PortfolioProject } from "@/types/portfolio";

// Previously contained 4 template-placeholder projects (FlowBank, Academy.co,
// Genome, Hotto) that were never real Luit Studio work and all linked to
// /contact instead of a case study. Removed per the audit remediation plan —
// add real, permissioned projects here (the Portfolio section and card
// components are unchanged and ready to receive them).
export const portfolioProjects: readonly PortfolioProject[] = [] as const;
