"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";

import {
  createOpening,
  updateOpening,
  type OpeningInput,
} from "@/app/admin/(dashboard)/careers/actions";
import { ButtonAction } from "@/components/ui/button";
import type { JobOpeningStatus } from "@/types/career";
import { slugify } from "@/utils/slugify";

interface OpeningFormProps {
  mode: "create" | "edit";
  openingId?: string;
  initial?: OpeningInput;
}

const inputClasses =
  "border-border w-full rounded-xl border px-4 py-2.5 text-sm text-ink outline-none transition-[border-color,box-shadow] duration-200 focus:border-brand focus:ring-2 focus:ring-brand/20";
const labelClasses = "text-ink mb-2 block text-sm font-medium";

const emptyInitial: OpeningInput = {
  title: "",
  slug: "",
  department: "",
  employmentType: "Full-time",
  location: "Guwahati, Assam",
  summary: "",
  description: "",
  responsibilities: "",
  requirements: "",
  status: "draft",
};

export function OpeningForm({ mode, openingId, initial }: OpeningFormProps) {
  const router = useRouter();
  const values = initial ?? emptyInitial;

  const [title, setTitle] = useState(values.title);
  const [slug, setSlug] = useState(values.slug);
  const [slugEdited, setSlugEdited] = useState(mode === "edit");
  const [department, setDepartment] = useState(values.department);
  const [employmentType, setEmploymentType] = useState(values.employmentType);
  const [location, setLocation] = useState(values.location);
  const [summary, setSummary] = useState(values.summary);
  const [description, setDescription] = useState(values.description);
  const [responsibilities, setResponsibilities] = useState(
    values.responsibilities,
  );
  const [requirements, setRequirements] = useState(values.requirements);
  const [status, setStatus] = useState<JobOpeningStatus>(values.status);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleTitleChange(next: string) {
    setTitle(next);
    if (!slugEdited) setSlug(slugify(next));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !slug.trim() || !summary.trim()) {
      setError("Title, slug, and a short summary are required.");
      return;
    }

    setError("");
    const input: OpeningInput = {
      title,
      slug,
      department,
      employmentType,
      location,
      summary,
      description,
      responsibilities,
      requirements,
      status,
    };

    startTransition(async () => {
      const result =
        mode === "create"
          ? await createOpening(input)
          : await updateOpening(openingId!, input);

      if (result.error) {
        setError(result.error);
        return;
      }

      router.push("/admin/careers");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-6">
      <div>
        <label htmlFor="title" className={labelClasses}>
          Role title
        </label>
        <input
          id="title"
          value={title}
          onChange={(event) => handleTitleChange(event.target.value)}
          placeholder="e.g. Product Designer"
          required
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="slug" className={labelClasses}>
          Slug
        </label>
        <input
          id="slug"
          value={slug}
          onChange={(event) => {
            setSlugEdited(true);
            setSlug(slugify(event.target.value));
          }}
          placeholder="product-designer"
          required
          className={`${inputClasses} font-mono`}
        />
        <p className="text-body mt-1.5 text-xs">
          /career/apply/{slug || "…"}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label htmlFor="department" className={labelClasses}>
            Department
          </label>
          <input
            id="department"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            placeholder="Design"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="employmentType" className={labelClasses}>
            Employment type
          </label>
          <select
            id="employmentType"
            value={employmentType}
            onChange={(event) => setEmploymentType(event.target.value)}
            className={inputClasses}
          >
            {["Full-time", "Part-time", "Contract", "Internship", "Freelance"].map(
              (option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ),
            )}
          </select>
        </div>
        <div>
          <label htmlFor="location" className={labelClasses}>
            Location
          </label>
          <input
            id="location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="summary" className={labelClasses}>
          Short summary
        </label>
        <input
          id="summary"
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
          placeholder="One line shown on the careers page card"
          required
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="description" className={labelClasses}>
          Full description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={4}
          className={`${inputClasses} resize-y`}
        />
      </div>

      <div>
        <label htmlFor="responsibilities" className={labelClasses}>
          Responsibilities
        </label>
        <textarea
          id="responsibilities"
          value={responsibilities}
          onChange={(event) => setResponsibilities(event.target.value)}
          rows={4}
          placeholder={"One per line\ne.g.\nDesign end-to-end product flows\nRun user research"}
          className={`${inputClasses} resize-y`}
        />
        <p className="text-body mt-1.5 text-xs">One per line.</p>
      </div>

      <div>
        <label htmlFor="requirements" className={labelClasses}>
          Requirements
        </label>
        <textarea
          id="requirements"
          value={requirements}
          onChange={(event) => setRequirements(event.target.value)}
          rows={4}
          placeholder={"One per line"}
          className={`${inputClasses} resize-y`}
        />
        <p className="text-body mt-1.5 text-xs">One per line.</p>
      </div>

      <div>
        <label htmlFor="status" className={labelClasses}>
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(event) => setStatus(event.target.value as JobOpeningStatus)}
          className={inputClasses}
        >
          <option value="draft">Draft — hidden from the site</option>
          <option value="published">Published — live on /career</option>
          <option value="closed">Closed — hidden, kept for records</option>
        </select>
      </div>

      {error ? <p className="text-rose-ink text-sm">{error}</p> : null}

      <div>
        <ButtonAction type="submit" variant="brand" disabled={isPending}>
          {isPending
            ? "Saving…"
            : mode === "create"
              ? "Create opening"
              : "Save changes"}
        </ButtonAction>
      </div>
    </form>
  );
}
