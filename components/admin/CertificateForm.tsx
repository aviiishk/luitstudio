"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";

import { createCertificate } from "@/app/admin/(dashboard)/certificates/actions";
import { ButtonAction } from "@/components/ui/button";
import type { Student } from "@/types/certificate";

interface CertificateFormProps {
  students: readonly Student[];
  initialStudentId?: string;
}

const MANUAL_ENTRY_VALUE = "__manual__";

const inputClasses =
  "border-border w-full rounded-xl border px-4 py-2.5 text-sm text-ink outline-none transition-[border-color,box-shadow] duration-200 focus:border-brand focus:ring-2 focus:ring-brand/20";
const labelClasses = "text-ink mb-2 block text-sm font-medium";

export function CertificateForm({
  students,
  initialStudentId,
}: CertificateFormProps) {
  const router = useRouter();
  const preselected = students.find(
    (student) => student.id === initialStudentId,
  );

  const [selectedStudentId, setSelectedStudentId] = useState(
    preselected ? preselected.id : MANUAL_ENTRY_VALUE,
  );
  const [manualName, setManualName] = useState("");
  const [program, setProgram] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const selectedStudent = students.find(
    (student) => student.id === selectedStudentId,
  );
  const isManual = selectedStudentId === MANUAL_ENTRY_VALUE;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const studentName = isManual ? manualName.trim() : selectedStudent?.fullName.trim();

    if (!studentName) {
      setError("Student name is required.");
      return;
    }
    if (!program.trim()) {
      setError("Program is required.");
      return;
    }

    setError("");
    startTransition(async () => {
      const result = await createCertificate({
        internApplicationId: isManual ? null : (selectedStudent?.id ?? null),
        studentName,
        program,
        startDate,
        endDate,
      });

      if (result.error || !result.id) {
        setError(result.error ?? "Failed to create certificate.");
        return;
      }

      router.push(`/admin/certificates/${result.id}`);
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-6">
      <div>
        <label htmlFor="student" className={labelClasses}>
          Student
        </label>
        <select
          id="student"
          value={selectedStudentId}
          onChange={(event) => setSelectedStudentId(event.target.value)}
          className={inputClasses}
        >
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.fullName} — {student.course}
            </option>
          ))}
          <option value={MANUAL_ENTRY_VALUE}>Enter manually…</option>
        </select>
      </div>

      {isManual && (
        <div>
          <label htmlFor="manual-name" className={labelClasses}>
            Student name
          </label>
          <input
            id="manual-name"
            value={manualName}
            onChange={(event) => setManualName(event.target.value)}
            required
            className={inputClasses}
          />
        </div>
      )}

      <div>
        <label htmlFor="program" className={labelClasses}>
          Program
        </label>
        <input
          id="program"
          value={program}
          onChange={(event) => setProgram(event.target.value)}
          placeholder="e.g. Web Development Internship"
          required
          className={inputClasses}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="start-date" className={labelClasses}>
            Start date
          </label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="end-date" className={labelClasses}>
            End date
          </label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      {error ? <p className="text-rose-ink text-sm">{error}</p> : null}

      <div>
        <ButtonAction type="submit" variant="brand" disabled={isPending}>
          {isPending ? "Issuing…" : "Issue certificate"}
        </ButtonAction>
      </div>
    </form>
  );
}
