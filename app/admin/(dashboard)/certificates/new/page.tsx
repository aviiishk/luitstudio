import { CertificateForm } from "@/components/admin/CertificateForm";
import { getEnrolledStudents } from "@/lib/students";

interface NewCertificatePageProps {
  searchParams: Promise<{ studentId?: string }>;
}

export default async function NewCertificatePage({
  searchParams,
}: NewCertificatePageProps) {
  const { studentId } = await searchParams;
  const students = await getEnrolledStudents();

  return (
    <div>
      <h1 className="text-ink mb-8 text-2xl">Issue certificate</h1>
      <CertificateForm students={students} initialStudentId={studentId} />
    </div>
  );
}
