"use client";

import { ArrowUpRight } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";

import { submitApplication } from "@/app/(site)/career/actions";
import { ResumeUploadField } from "@/components/sections/career/ResumeUploadField";
import { contactDetails } from "@/config/contact";
import { initialCareerApplicationFormState } from "@/types/career-application-form";

interface ApplicationFormProps {
  jobOpeningId?: string;
  roleLabel?: string;
  defaultRoleInterest?: string;
}

const controlClasses =
  "min-h-12 w-full rounded-2xl border border-border bg-white px-5 py-3 text-ink placeholder:text-body transition-[border-color,box-shadow,opacity] duration-200 hover:border-body focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-50";
const labelClasses = "text-ink mb-2 block font-medium";

export function ApplicationForm({
  jobOpeningId,
  roleLabel,
  defaultRoleInterest,
}: ApplicationFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitApplication,
    initialCareerApplicationFormState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      setResumeUrl("");
    }
  }, [state.status]);

  return (
    <form
      ref={formRef}
      action={formAction}
      autoComplete="on"
      aria-describedby="application-form-status"
      className="grid gap-x-6 gap-y-5 sm:grid-cols-2"
    >
      {jobOpeningId ? (
        <input type="hidden" name="jobOpeningId" value={jobOpeningId} />
      ) : null}

      <div className="js-only">
        <label htmlFor="fullName" className={labelClasses}>
          Your name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          autoComplete="name"
          placeholder="Full name"
          className={controlClasses}
        />
      </div>

      <div className="js-only">
        <label htmlFor="email" className={labelClasses}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={controlClasses}
        />
      </div>

      {jobOpeningId ? (
        roleLabel ? (
          <div className="js-only sm:col-span-2">
            <span className={labelClasses}>Applying for</span>
            <p className="text-ink border-border rounded-2xl border bg-white px-5 py-3">
              {roleLabel}
            </p>
          </div>
        ) : null
      ) : (
        <div className="js-only sm:col-span-2">
          <label htmlFor="roleInterest" className={labelClasses}>
            What kind of work do you do?
          </label>
          <input
            id="roleInterest"
            name="roleInterest"
            type="text"
            defaultValue={defaultRoleInterest}
            placeholder="e.g. Product design, development, video editing"
            className={controlClasses}
          />
        </div>
      )}

      <div className="js-only sm:col-span-2">
        <label htmlFor="linkUrl" className={labelClasses}>
          Portfolio link (optional)
        </label>
        <input
          id="linkUrl"
          name="linkUrl"
          type="url"
          placeholder="https://"
          className={controlClasses}
        />
      </div>

      <div className="js-only sm:col-span-2">
        <ResumeUploadField value={resumeUrl} onChange={setResumeUrl} />
        <input type="hidden" name="resumeUrl" value={resumeUrl} readOnly />
      </div>

      <div className="js-only sm:col-span-2">
        <label htmlFor="message" className={labelClasses}>
          Tell us about your work
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="What you make, what you want to learn, and where you think you could make the work better."
          className={`${controlClasses} resize-y`}
        />
      </div>

      <noscript>
        <p className="text-ink sm:col-span-2">
          Online form submission requires JavaScript. You can email us at{" "}
          <a
            className="text-brand underline"
            href={`mailto:${contactDetails.email}`}
          >
            {contactDetails.email}
          </a>
          .
        </p>
      </noscript>

      <div className="js-only sm:col-span-2">
        <button
          type="submit"
          disabled={isPending}
          className="group bg-ink hover:bg-brand focus-visible:outline-brand hover:shadow-soft flex min-h-12 items-center justify-center gap-3 rounded-full px-6 font-medium text-white transition-[transform,background-color,box-shadow,opacity] duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none motion-reduce:transform-none"
        >
          {isPending ? "Sending…" : "Send application"}
          <span className="text-ink grid size-8 place-items-center rounded-full bg-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:rotate-45 group-focus-visible:translate-x-0.5 group-focus-visible:rotate-45 group-active:translate-x-0 group-active:rotate-0 motion-reduce:transform-none">
            <ArrowUpRight aria-hidden="true" size={18} />
          </span>
        </button>
        <p
          id="application-form-status"
          role="status"
          aria-live="polite"
          className={`mt-4 min-h-6 max-w-xl text-sm ${
            state.status === "error" ? "text-rose-ink" : "text-body"
          }`}
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}
