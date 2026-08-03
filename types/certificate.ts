export type CertificateStatus = "valid" | "revoked";

export interface Student {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  course: string;
  college: string;
  year: string;
  skills: readonly string[];
  portfolioUrl: string | null;
  appliedAt: string;
}

export interface Certificate {
  id: string;
  certificateNumber: string;
  internApplicationId: string | null;
  studentName: string;
  program: string;
  startDate: string | null;
  endDate: string | null;
  issueDate: string;
  status: CertificateStatus;
  certificateFileUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PublicCertificate {
  studentName: string;
  program: string;
  startDate: string | null;
  endDate: string | null;
  issueDate: string;
  certificateNumber: string;
  status: CertificateStatus;
  certificateFileUrl: string | null;
}
