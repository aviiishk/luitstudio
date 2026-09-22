export type JobOpeningStatus = "draft" | "published" | "closed";

export interface JobOpening {
  id: string;
  title: string;
  slug: string;
  department: string | null;
  employmentType: string;
  location: string;
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  status: JobOpeningStatus;
  createdAt: string;
  updatedAt: string;
}

export type JobApplicationStatus =
  | "new"
  | "reviewing"
  | "shortlisted"
  | "rejected"
  | "hired";

export interface JobApplication {
  id: string;
  jobOpeningId: string | null;
  jobOpeningTitle: string | null;
  fullName: string;
  email: string;
  roleInterest: string | null;
  linkUrl: string | null;
  resumeUrl: string | null;
  message: string;
  status: JobApplicationStatus;
  createdAt: string;
}
