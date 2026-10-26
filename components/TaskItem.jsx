import { Check, Trash2 } from "lucide-react";

function formatAdded(timestamp) {
  if (!timestamp) return null;
  return new Date(timestamp).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function TaskItem({ task, onToggle, onDelete }) {
  const done = task.completed;
  const added = formatAdded(task.createdAt);

  return (
    <li className="group relative flex items-start gap-4 px-5 py-4 transition-colors hover:bg-paper/70 sm:px-6 sm:py-5">
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 w-1 transition-colors ${done ? "bg-emerald-500" : "bg-amber-400"}`}
      />

      <button
        type="button"
        role="checkbox"
        aria-checked={done}
        aria-label={done ? `Mark “${task.title}” as pending` : `Mark “${task.title}” as completed`}
        onClick={() => onToggle(task.id)}
        className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border-2 transition-colors duration-200 motion-reduce:transition-none ${
          done
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-ink/25 text-transparent hover:border-brand hover:text-brand/50"
        }`}
      >
        <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3
            className={`break-words font-medium transition-colors ${
              done ? "text-ink/45 line-through" : "text-ink"
            }`}
          >
            {task.title}
          </h3>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              done ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
            }`}
          >
            {done ? "Completed" : "Pending"}
          </span>
        </div>

        {task.description && (
          <p
            className={`mt-1 whitespace-pre-line break-words text-sm ${
              done ? "text-ink/40" : "text-ink/65"
            }`}
          >
            {task.description}
          </p>
        )}

        {added && <p className="mt-2 text-xs text-ink/50">Added {added}</p>}
      </div>

      <button
        type="button"
        onClick={() => onDelete(task)}
        aria-label={`Delete “${task.title}”`}
        className="shrink-0 rounded-lg p-2 text-ink/45 transition hover:bg-rose-50 hover:text-rose-600 lg:opacity-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100"
      >
        <Trash2 className="size-[18px]" aria-hidden="true" />
      </button>
    </li>
  );
}