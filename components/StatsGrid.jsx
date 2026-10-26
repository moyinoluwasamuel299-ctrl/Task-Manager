import { CheckCircle2, Clock } from "lucide-react";

function StatCard({ label, value, hint, icon: Icon, iconClass }) {
  return (
    <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-ink/65">{label}</p>
        <span className={`grid size-9 place-items-center rounded-xl ${iconClass}`} aria-hidden="true">
          <Icon className="size-[18px]" />
        </span>
      </div>
      <p className="mt-4 font-display text-5xl font-semibold tabular-nums leading-none">{value}</p>
      <p className="mt-2 text-sm text-ink/55">{hint}</p>
    </div>
  );
}

export default function StatsGrid({ total, pending, completed }) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <section aria-label="Task statistics" className="mt-10 grid gap-4 sm:grid-cols-2">
      <div className="rounded-3xl bg-ink p-6 text-white shadow-xl shadow-ink/15 sm:col-span-2 sm:p-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-white/70">Total Tasks</p>
            <p className="mt-3 font-display text-7xl font-semibold tabular-nums leading-none sm:text-8xl">
              {total}
            </p>
          </div>

          <div className="w-full sm:w-80">
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-medium">{percent}% complete</span>
              <span className="text-white/60">
                {completed} of {total} done
              </span>
            </div>
            <div
              role="progressbar"
              aria-label="Tasks completed"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percent}
              className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/15"
            >
              <div
                className="h-full rounded-full bg-emerald-400 transition-[width] duration-700 ease-out motion-reduce:transition-none"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <StatCard
        label="Pending Tasks"
        value={pending}
        hint="Still waiting to be done"
        icon={Clock}
        iconClass="bg-amber-50 text-amber-600"
      />
      <StatCard
        label="Completed Tasks"
        value={completed}
        hint="Marked as done"
        icon={CheckCircle2}
        iconClass="bg-emerald-50 text-emerald-600"
      />
    </section>
  );
}