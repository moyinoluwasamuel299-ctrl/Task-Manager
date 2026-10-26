"use client";

import { Trash2 } from "lucide-react";
import Modal from "./Modal";

export default function ConfirmDialog({ task, onCancel, onConfirm }) {
  return (
    <Modal title="Delete this task?" onClose={onCancel}>
      <div className="flex gap-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-rose-50 text-rose-600" aria-hidden="true">
          <Trash2 className="size-5" />
        </span>
        <p className="break-words text-sm text-ink/70">
          “{task.title}” will be permanently removed. This can’t be undone.
        </p>
      </div>

      <div className="mt-7 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl px-4 py-2.5 text-sm font-semibold text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 active:scale-[0.98] motion-reduce:transition-none"
        >
          Delete Task
        </button>
      </div>
    </Modal>
  );
}