import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "brightedge-tasks";

const makeId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

// Only called inside useEffect, so it never runs on the server.
function readStoredTasks() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (t) => t && typeof t.id === "string" && typeof t.title === "string"
    );
  } catch {
    return [];
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [ready, setReady] = useState(false);

  // Load once after mount.
  useEffect(() => {
    setTasks(readStoredTasks());
    setReady(true);
  }, []);

  // Save on every change, but only after the initial load finished,
  // so saved data is never overwritten by the empty starting state.
  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // Storage full or blocked: the app keeps working in memory.
    }
  }, [tasks, ready]);

  const addTask = useCallback(({ title, description }) => {
    setTasks((prev) => [
      { id: makeId(), title, description, completed: false, createdAt: Date.now() },
      ...prev,
    ]);
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const stats = useMemo(() => {
    const completed = tasks.filter((t) => t.completed).length;
    return { total: tasks.length, completed, pending: tasks.length - completed };
  }, [tasks]);

  return { tasks, ready, stats, addTask, toggleTask, deleteTask };
}