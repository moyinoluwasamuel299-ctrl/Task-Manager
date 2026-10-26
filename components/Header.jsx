import { Plus } from "lucide-react";

export default function Header({ onAdd }) {
  return (
    <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-medium text-brand">BrightEdge Technologies</p>
        <h1 className="mt-1 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Task Manager
        </h1>
        <p className="mt-3 max-w-md text-ink/65">
          Welcome back. Plan the day, track what’s moving, and close out what’s done.
        </p>
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-deep active:scale-[0.98] motion-reduce:transition-none"
      >
        <Plus className="size-4" strokeWidth={2.5} aria-hidden="true" />
        Add Task
      </button>
    </header>
  );
}