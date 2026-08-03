"use client";

import { Check, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import {
  deleteCertificate,
  setCertificateStatus,
  updateCertificate,
  updateCertificateFile,
} from "@/app/admin/(dashboard)/certificates/actions";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ButtonAction } from "@/components/ui/button";
import type { Certificate } from "@/types/certificate";

interface CertificateDetailPanelProps {
  certificate: Certificate;
}

const inputClasses =
  "border-border w-full rounded-xl border px-4 py-2.5 text-sm text-ink outline-none transition-[border-color,box-shadow] duration-200 focus:border-brand focus:ring-2 focus:ring-brand/20";
const labelClasses = "text-ink mb-2 block text-sm font-medium";

export function CertificateDetailPanel({
  certificate,
}: CertificateDetailPanelProps) {
  const router = useRouter();
  const [studentName, setStudentName] = useState(certificate.studentName);
  const [program, setProgram] = useState(certificate.program);
  const [startDate, setStartDate] = useState(certificate.startDate ?? "");
  const [endDate, setEndDate] = useState(certificate.endDate ?? "");
  const [fileUrl, setFileUrl] = useState(certificate.certificateFileUrl ?? "");
  const [status, setStatus] = useState(certificate.status);
  const [error, setError] = useState("");
  const [justSaved, setJustSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!studentName.trim() || !program.trim()) {
      setError("Student name and program are required.");
      return;
    }

    setError("");
    setJustSaved(false);
    setIsSaving(true);
    try {
      const result = await updateCertificate(certificate.id, {
        studentName,
        program,
        startDate,
        endDate,
      });

      if (result.error) {
        setError(result.error);
        return;
      }

      setJustSaved(true);
      router.refresh();
    } finally {
      setIsSaving(false);
    }
  }

  async function handleFileChange(url: string) {
    setFileUrl(url);
    setError("");
    setIsSaving(true);
    try {
      const result = await updateCertificateFile(certificate.id, url);

      if (result.error) {
        setError(result.error);
        return;
      }

      router.refresh();
    } finally {
      setIsSaving(false);
    }
  }

  async function handleToggleStatus() {
    const nextStatus = status === "valid" ? "revoked" : "valid";
    setError("");
    setIsTogglingStatus(true);
    try {
      const result = await setCertificateStatus(certificate.id, nextStatus);

      if (result.error) {
        setError(result.error);
        return;
      }

      setStatus(nextStatus);
      router.refresh();
    } finally {
      setIsTogglingStatus(false);
    }
  }

  async function handleDelete() {
    setError("");
    setIsDeleting(true);
    try {
      const result = await deleteCertificate(certificate.id);

      if (result.error) {
        setError(result.error);
        setIsDeleting(false);
        return;
      }

      router.push("/admin/certificates");
      router.refresh();
    } catch {
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex max-w-xl flex-col gap-6">
      <div className="border-border flex items-center justify-between rounded-xl border bg-white p-4">
        <div>
          <p className="text-ink text-sm font-medium">Certificate status</p>
          <p className="text-body mt-0.5 text-xs">
            {status === "valid"
              ? "Visible as valid on the public verification page."
              : "Marked revoked — the verification page will show it as invalid."}
          </p>
        </div>
        <ButtonAction
          type="button"
          variant={status === "valid" ? "light" : "brand"}
          onClick={() => void handleToggleStatus()}
          disabled={isTogglingStatus}
          className="min-h-9 shrink-0 px-4 text-sm"
        >
          {isTogglingStatus
            ? "Updating…"
            : status === "valid"
              ? "Revoke"
              : "Mark valid"}
        </ButtonAction>
      </div>

      <ImageUploadField
        label="Certificate file"
        value={fileUrl}
        onChange={(url) => void handleFileChange(url)}
      />

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        <div>
          <label htmlFor="student-name" className={labelClasses}>
            Student name
          </label>
          <input
            id="student-name"
            value={studentName}
            onChange={(event) => {
              setStudentName(event.target.value);
              setJustSaved(false);
            }}
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="program" className={labelClasses}>
            Program
          </label>
          <input
            id="program"
            value={program}
            onChange={(event) => {
              setProgram(event.target.value);
              setJustSaved(false);
            }}
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
              onChange={(event) => {
                setStartDate(event.target.value);
                setJustSaved(false);
              }}
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
              onChange={(event) => {
                setEndDate(event.target.value);
                setJustSaved(false);
              }}
              className={inputClasses}
            />
          </div>
        </div>

        {error ? <p className="text-rose-ink text-sm">{error}</p> : null}

        <div className="flex items-center gap-3">
          <ButtonAction type="submit" variant="brand" disabled={isSaving}>
            {isSaving ? "Saving…" : "Save changes"}
          </ButtonAction>
          {justSaved && !isSaving ? (
            <span className="text-green-ink flex items-center gap-1.5 text-sm font-medium">
              <Check aria-hidden="true" size={16} />
              Saved
            </span>
          ) : null}
        </div>
      </form>

      <div className="border-border/70 flex items-center justify-between rounded-xl border border-dashed p-4">
        <div>
          <p className="text-ink text-sm font-medium">Delete certificate</p>
          <p className="text-body mt-0.5 text-xs">
            Permanently removes this record. Its verification link stops
            working immediately — this can&apos;t be undone.
          </p>
        </div>
        {confirmingDelete ? (
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => void handleDelete()}
              disabled={isDeleting}
              className="text-rose-ink hover:bg-rose/20 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors disabled:opacity-50"
            >
              {isDeleting ? "Deleting…" : "Confirm delete"}
            </button>
            <button
              type="button"
              onClick={() => setConfirmingDelete(false)}
              aria-label="Cancel delete"
              className="text-body hover:text-ink grid size-7 place-items-center rounded-full transition-colors"
            >
              <X aria-hidden="true" size={14} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmingDelete(true)}
            className="text-body hover:text-rose-ink flex shrink-0 items-center gap-1.5 text-sm font-medium transition-colors"
          >
            <Trash2 aria-hidden="true" size={15} />
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
