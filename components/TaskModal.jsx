"use client";

import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";

export default function TaskModal({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setError("Enter a task title to continue.");
      titleRef.current?.focus();
      return;
    }
    onCreate({ title: cleanTitle, description: description.trim() });
  };

  return (
    <Modal title="New task" onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="task-title" className="mb-1.5 block text-sm font-medium">
            Title <span className="text-rose-600">*</span>
          </label>
          <input
            id="task-title"
            ref={titleRef}
            type="text"
            maxLength={120}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError("");
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "task-title-error" : undefined}
            placeholder="e.g. Prepare sprint review notes"
            className={`w-full rounded-xl border bg-white px-3.5 py-2.5 placeholder:text-ink/40 transition-colors ${
              error ? "border-rose-400" : "border-ink/20 hover:border-ink/35"
            }`}
          />
          {error && (
            <p id="task-title-error" className="mt-1.5 text-sm text-rose-600">
              {error}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="task-description" className="mb-1.5 block text-sm font-medium">
            Description <span className="font-normal text-ink/50">(optional)</span>
          </label>
          <textarea
            id="task-description"
            rows={3}
            maxLength={500}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add details your team should know"
            className="w-full resize-none rounded-xl border border-ink/20 bg-white px-3.5 py-2.5 placeholder:text-ink/40 transition-colors hover:border-ink/35"
          />
        </div>

        <div className="flex justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-deep active:scale-[0.98] motion-reduce:transition-none"
          >
            Create Task
          </button>
        </div>
      </form>
    </Modal>
  );
}