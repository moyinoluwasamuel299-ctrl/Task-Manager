import { ClipboardList, Plus } from "lucide-react";

const COPY = {
  all: {
    title: "No tasks yet",
    body: "Add your first task to start tracking your team’s work.",
  },
  pending: {
    title: "Nothing pending",
    body: "Everything is done. Add a task when something new comes up.",
  },
  completed: {
    title: "No completed tasks yet",
    body: "Tasks you finish will show up here.",
  },
};

export default function EmptyState({ filter, onAdd }) {
  const { title, body } = COPY[filter] ?? COPY.all;

  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-brand/10 text-brand" aria-hidden="true">
        <ClipboardList className="size-7" />
      </span>
      <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
      <p className="mt-1.5 max-w-xs text-sm text-ink/65">{body}</p>
      {filter !== "completed" && (
        <button
          type="button"
          onClick={onAdd}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-deep"
        >
          <Plus className="size-4" strokeWidth={2.5} aria-hidden="true" />
          Add Task
        </button>
      )}
    </div>
  );
}