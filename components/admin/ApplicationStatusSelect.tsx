"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { setApplicationStatus } from "@/app/admin/(dashboard)/careers/applications/actions";
import type { JobApplicationStatus } from "@/types/career";

interface ApplicationStatusSelectProps {
  id: string;
  status: JobApplicationStatus;
}

const statusOptions: JobApplicationStatus[] = [
  "new",
  "reviewing",
  "shortlisted",
  "rejected",
  "hired",
];

const statusStyles: Record<JobApplicationStatus, string> = {
  new: "bg-sky/25 text-sky-ink",
  reviewing: "bg-yellow/35 text-orange-ink",
  shortlisted: "bg-violet/25 text-violet-ink",
  rejected: "bg-rose/20 text-rose-ink",
  hired: "bg-green/25 text-green-ink",
};

export function ApplicationStatusSelect({
  id,
  status,
}: ApplicationStatusSelectProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleChange(next: JobApplicationStatus) {
    startTransition(async () => {
      await setApplicationStatus(id, next);
      router.refresh();
    });
  }

  return (
    <select
      value={status}
      disabled={isPending}
      onChange={(event) =>
        handleChange(event.target.value as JobApplicationStatus)
      }
      className={`shrink-0 rounded-full border-none px-2.5 py-1 text-xs font-semibold capitalize outline-none disabled:opacity-50 ${statusStyles[status]}`}
    >
      {statusOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
