"use client";

import { Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface DeleteEntityButtonProps {
  id: string;
  label: string;
  // A bare reference to a "use server" action, e.g. `action={deleteOpening}`.
  // Server Components can only pass Server Action references as props to
  // Client Components — never a wrapping closure like `() => deleteX(id)`,
  // which isn't serializable across that boundary. Keep `id` as its own
  // prop so callers never need to build one.
  action: (id: string) => Promise<{ error?: string }>;
  redirectTo?: string;
}

export function DeleteEntityButton({
  id,
  label,
  action,
  redirectTo,
}: DeleteEntityButtonProps) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await action(id);
      if (redirectTo) {
        router.push(redirectTo);
      }
      router.refresh();
    });
  }

  if (confirming) {
    return (
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          aria-label={`Confirm delete ${label}`}
          className="text-rose-ink hover:bg-rose/20 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors disabled:opacity-50"
        >
          {isPending ? "Deleting…" : "Delete?"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          aria-label="Cancel delete"
          className="text-body hover:text-ink grid size-7 place-items-center rounded-full transition-colors"
        >
          <X aria-hidden="true" size={14} />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      aria-label={`Delete ${label}`}
      className="text-body hover:text-rose-ink grid size-9 shrink-0 place-items-center rounded-full transition-colors"
    >
      <Trash2 aria-hidden="true" size={16} />
    </button>
  );
}
