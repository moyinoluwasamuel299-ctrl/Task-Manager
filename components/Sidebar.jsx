import { CheckCircle2, Clock, HardDrive, ListTodo } from "lucide-react";

export const FILTERS = [
  { key: "all", label: "All Tasks", icon: ListTodo, countKey: "total" },
  { key: "pending", label: "Pending Tasks", icon: Clock, countKey: "pending" },
  { key: "completed", label: "Completed Tasks", icon: CheckCircle2, countKey: "completed" },
];

export default function Sidebar({ filter, onFilter, counts }) {
  return (
    <aside className="border-b border-ink/10 bg-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:border-b-0 lg:border-r">
      <div className="flex items-center gap-3 px-4 pt-4 sm:px-8 lg:px-6 lg:pt-8">
        <span
          aria-hidden="true"
          className="grid size-9 place-items-center rounded-xl bg-brand font-display text-lg font-bold text-white"
        >
          B
        </span>
        <span className="font-display text-lg font-semibold tracking-tight">BrightEdge</span>
      </div>

      <nav
        aria-label="Task filters"
        className="flex gap-1 overflow-x-auto px-4 py-3 sm:px-8 lg:flex-col lg:overflow-visible lg:px-4 lg:py-8"
      >
        {FILTERS.map(({ key, label, icon: Icon, countKey }) => {
          const active = filter === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onFilter(key)}
              aria-pressed={active}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active ? "bg-ink text-white" : "text-ink/70 hover:bg-ink/5 hover:text-ink"
              }`}
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
              <span
                className={`ml-2 rounded-full px-2 py-0.5 text-xs tabular-nums lg:ml-auto ${
                  active ? "bg-white/15 text-white" : "bg-ink/5 text-ink/70"
                }`}
              >
                {counts[countKey]}
              </span>
            </button>
          );
        })}
      </nav>

      <p className="mt-auto hidden items-center gap-2 px-6 py-6 text-xs text-ink/60 lg:flex">
        <HardDrive className="size-3.5" aria-hidden="true" />
        Tasks are saved in this browser only.
      </p>
    </aside>
  );
}