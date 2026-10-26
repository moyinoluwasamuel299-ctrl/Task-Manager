"use client";

import { useMemo, useState } from "react";
import Sidebar, { FILTERS } from "@/components/Sidebar";
import Header from "@/components/Header";
import StatsGrid from "@/components/StatsGrid";
import TaskList from "@/components/TaskList";
import TaskModal from "@/components/TaskModal";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useTasks } from "@/hooks/useTasks";

export default function Page() {
  const { tasks, ready, stats, addTask, toggleTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState("all");
  const [adding, setAdding] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const visibleTasks = useMemo(() => {
    if (filter === "pending") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const listTitle = FILTERS.find((f) => f.key === filter)?.label ?? "All Tasks";

  const handleCreate = (values) => {
    addTask(values);
    setAdding(false);
  };

  const handleConfirmDelete = () => {
    deleteTask(taskToDelete.id);
    setTaskToDelete(null);
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[18rem_1fr]">
      <Sidebar filter={filter} onFilter={setFilter} counts={stats} />

      <main className="mx-auto w-full min-w-0 max-w-4xl px-4 pb-20 pt-8 sm:px-8 lg:pt-14">
        <Header onAdd={() => setAdding(true)} />
        <StatsGrid {...stats} />
        <TaskList
          title={listTitle}
          filter={filter}
          tasks={visibleTasks}
          ready={ready}
          onToggle={toggleTask}
          onDelete={setTaskToDelete}
          onAdd={() => setAdding(true)}
        />
      </main>

      {adding && <TaskModal onClose={() => setAdding(false)} onCreate={handleCreate} />}
      {taskToDelete && (
        <ConfirmDialog
          task={taskToDelete}
          onCancel={() => setTaskToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}