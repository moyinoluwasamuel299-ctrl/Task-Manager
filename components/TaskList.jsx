import TaskItem from "./TaskItem";
import EmptyState from "./EmptyState";

function SkeletonRows() {
  return (
    <div aria-hidden="true" className="divide-y divide-ink/10">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-4 px-6 py-5">
          <div className="size-6 animate-pulse rounded-full bg-ink/10" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-ink/10" />
        </div>
      ))}
    </div>
  );
}

export default function TaskList({ title, filter, tasks, ready, onToggle, onDelete, onAdd }) {
  return (
    <section aria-labelledby="task-list-heading" className="mt-12">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 id="task-list-heading" className="font-display text-2xl font-semibold tracking-tight">
          {title}
        </h2>
        {ready && (
          <p className="text-sm text-ink/60" aria-live="polite">
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          </p>
        )}
      </div>

      <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm">
        {!ready ? (
          <SkeletonRows />
        ) : tasks.length === 0 ? (
          <EmptyState filter={filter} onAdd={onAdd} />
        ) : (
          <ul className="divide-y divide-ink/10">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}