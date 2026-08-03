"use client";

import { Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { deletePost } from "@/app/admin/(dashboard)/blog/actions";

interface DeletePostButtonProps {
  id: string;
  title: string;
}

export function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deletePost(id);
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
          aria-label={`Confirm delete ${title}`}
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
      aria-label={`Delete ${title}`}
      className="text-body hover:text-rose-ink grid size-9 shrink-0 place-items-center rounded-full transition-colors"
    >
      <Trash2 aria-hidden="true" size={16} />
    </button>
  );
}
