"use client";

import { ArrowUpRight } from "lucide-react";
import { useState, type FormEvent } from "react";

import { contactDetails } from "@/config/contact";
import { ROUTES } from "@/constants/routes";
import type { ContactField } from "@/types/contact";

interface ContactFormProps {
  fields: readonly ContactField[];
  submitLabel: string;
}

const controlClasses =
  "min-h-12 w-full rounded-2xl border border-border bg-white px-5 py-3 text-ink placeholder:text-body transition-[border-color,box-shadow,opacity] duration-200 hover:border-body focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-50";

export function ContactForm({ fields, submitLabel }: ContactFormProps) {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(
      "The form interface is complete. Submission will be enabled when a backend endpoint is connected.",
    );
  }

  return (
    <form
      action={ROUTES.contact}
      method="post"
      autoComplete="on"
      onSubmit={handleSubmit}
      aria-describedby="contact-form-status"
      className="grid gap-x-6 sm:grid-cols-2"
    >
      {fields.map((field) => {
        const isWide = field.type === "textarea";
        const errorId = `${field.id}-error`;

        return (
          <div
            key={field.id}
            className={`js-only ${isWide ? "sm:col-span-2" : ""}`}
          >
            <label
              htmlFor={field.id}
              className="text-ink mb-2 block font-medium"
            >
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.id}
                name={field.name}
                rows={5}
                required={field.required}
                placeholder={field.placeholder}
                aria-describedby={errorId}
                className={`${controlClasses} resize-y`}
              />
            ) : field.type === "select" ? (
              <select
                id={field.id}
                name={field.name}
                required={field.required}
                defaultValue={field.options?.[0]?.value}
                aria-describedby={errorId}
                className={controlClasses}
              >
                {field.options?.map((option) => (
                  <option
                    key={option.value || option.label}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.id}
                name={field.name}
                type={field.type}
                required={field.required}
                placeholder={field.placeholder}
                autoComplete={field.autocomplete}
                aria-describedby={errorId}
                className={controlClasses}
              />
            )}
            <p
              id={errorId}
              aria-live="polite"
              className="text-rose-ink min-h-7 pt-1 text-sm"
            />
          </div>
        );
      })}
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
          className="group bg-ink hover:bg-brand focus-visible:outline-brand hover:shadow-soft mx-auto flex min-h-12 items-center justify-center gap-3 rounded-full px-6 font-medium text-white transition-[transform,background-color,box-shadow,opacity] duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none motion-reduce:transform-none"
        >
          {submitLabel}
          <span className="text-ink grid size-8 place-items-center rounded-full bg-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:rotate-45 group-focus-visible:translate-x-0.5 group-focus-visible:rotate-45 group-active:translate-x-0 group-active:rotate-0 motion-reduce:transform-none">
            <ArrowUpRight aria-hidden="true" size={18} />
          </span>
        </button>
        <p
          id="contact-form-status"
          role="status"
          aria-live="polite"
          className="text-body mx-auto mt-4 min-h-6 max-w-xl text-center text-sm"
        >
          {status}
        </p>
      </div>
    </form>
  );
}
