"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";

import {
  createTeamMember,
  updateTeamMember,
  type TeamMemberInput,
} from "@/app/admin/(dashboard)/team/actions";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ButtonAction } from "@/components/ui/button";
import type { TeamMemberStatus } from "@/types/team";

interface TeamMemberFormProps {
  mode: "create" | "edit";
  memberId?: string;
  initial?: TeamMemberInput;
}

const inputClasses =
  "border-border w-full rounded-xl border px-4 py-2.5 text-sm text-ink outline-none transition-[border-color,box-shadow] duration-200 focus:border-brand focus:ring-2 focus:ring-brand/20";
const labelClasses = "text-ink mb-2 block text-sm font-medium";

const emptyInitial: TeamMemberInput = {
  name: "",
  role: "",
  bio: "",
  imageUrl: "",
  isFounder: false,
  displayOrder: 0,
  status: "draft",
};

export function TeamMemberForm({ mode, memberId, initial }: TeamMemberFormProps) {
  const router = useRouter();
  const values = initial ?? emptyInitial;

  const [name, setName] = useState(values.name);
  const [role, setRole] = useState(values.role);
  const [bio, setBio] = useState(values.bio);
  const [imageUrl, setImageUrl] = useState(values.imageUrl);
  const [isFounder, setIsFounder] = useState(values.isFounder);
  const [displayOrder, setDisplayOrder] = useState(values.displayOrder);
  const [status, setStatus] = useState<TeamMemberStatus>(values.status);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !role.trim()) {
      setError("Name and role are required.");
      return;
    }

    setError("");
    const input: TeamMemberInput = {
      name,
      role,
      bio,
      imageUrl,
      isFounder,
      displayOrder,
      status,
    };

    startTransition(async () => {
      const result =
        mode === "create"
          ? await createTeamMember(input)
          : await updateTeamMember(memberId!, input);

      if (result.error) {
        setError(result.error);
        return;
      }

      router.push("/admin/team");
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-border shadow-soft max-w-3xl rounded-2xl border bg-white p-6 sm:p-8"
    >
      <div className="flex flex-col gap-8 sm:flex-row">
        <div className="w-full shrink-0 sm:w-48">
          <ImageUploadField
            label="Portrait"
            value={imageUrl}
            onChange={setImageUrl}
            aspectClassName="aspect-3/4"
          />
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <div>
            <label htmlFor="name" className={labelClasses}>
              Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Abhishek Kumar Prasad"
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="role" className={labelClasses}>
              Role
            </label>
            <input
              id="role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              placeholder="e.g. Co-Founder, Video Editor"
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="bio" className={labelClasses}>
              Short bio (optional)
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              rows={3}
              placeholder="One or two lines — shown on hover/detail, kept short."
              className={`${inputClasses} resize-y`}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="displayOrder" className={labelClasses}>
                Display order
              </label>
              <input
                id="displayOrder"
                type="number"
                value={displayOrder}
                onChange={(event) => setDisplayOrder(Number(event.target.value))}
                className={inputClasses}
              />
              <p className="text-body mt-1.5 text-xs">
                Lower numbers show first.
              </p>
            </div>

            <div>
              <label htmlFor="status" className={labelClasses}>
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as TeamMemberStatus)
                }
                className={inputClasses}
              >
                <option value="draft">Draft — hidden from the site</option>
                <option value="published">Published — live on /about</option>
              </select>
            </div>
          </div>

          <label className="border-border flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm">
            <input
              type="checkbox"
              checked={isFounder}
              onChange={(event) => setIsFounder(event.target.checked)}
              className="border-border size-4 rounded"
            />
            <span className="text-ink font-medium">Co-founder</span>
            <span className="text-body">— shown with a founder badge</span>
          </label>

          {error ? <p className="text-rose-ink text-sm">{error}</p> : null}

          <div>
            <ButtonAction type="submit" variant="brand" disabled={isPending}>
              {isPending
                ? "Saving…"
                : mode === "create"
                  ? "Add team member"
                  : "Save changes"}
            </ButtonAction>
          </div>
        </div>
      </div>
    </form>
  );
}
