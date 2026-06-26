"use client";

import { useState } from "react";
import { Button, Card, EmptyState, Input, SectionHeader, Select } from "@/components/ui";
import { CheckIcon, ListIcon, PlusIcon, TrashIcon } from "@/components/shared/icons";
import { STORAGE_KEYS } from "@/lib/constants";
import type { Priority, Task } from "@/lib/types";
import { generateId } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const PRIORITY_DOT: Record<Priority, string> = {
  low: "bg-zinc-300 dark:bg-zinc-600",
  medium: "bg-amber-400",
  high: "bg-red-500",
};

export function TasksSection() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEYS.tasks, []);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setTasks((prev) => {
      const newTask: Task = {
        id: generateId(),
        text: trimmed,
        completed: false,
        priority,
        createdAt: new Date().toISOString(),
      };
      // High-priority incomplete tasks float to top
      const highPending = prev.filter((t) => !t.completed && t.priority === "high");
      const rest = prev.filter((t) => t.completed || t.priority !== "high");
      if (priority === "high") return [newTask, ...highPending, ...rest];
      return [newTask, ...prev];
    });
    setText("");
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const pending = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) => t.completed);
  const completedCount = completed.length;

  // Sort: high → medium → low within each group
  const priorityOrder: Record<Priority, number> = { high: 0, medium: 1, low: 2 };
  const sortedPending = [...pending].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  return (
    <Card>
      <SectionHeader
        icon={<ListIcon />}
        title="Daily Tasks"
        subtitle={
          tasks.length > 0
            ? `${completedCount} of ${tasks.length} done today`
            : "Quick wins for today"
        }
      />

      <form onSubmit={handleAdd} className="mb-4 flex gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task for today..."
          className="flex-1"
        />
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="w-28 shrink-0"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
        <Button type="submit" variant="secondary">
          <PlusIcon /> Add
        </Button>
      </form>

      {tasks.length === 0 ? (
        <EmptyState message="No tasks yet. Add something small to get started." />
      ) : (
        <div className="space-y-4">
          {/* Pending */}
          {sortedPending.length > 0 && (
            <ul className="space-y-2">
              {sortedPending.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))}
            </ul>
          )}

          {/* Completed */}
          {completed.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Completed
              </p>
              <ul className="space-y-2">
                {completed.map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

function TaskRow({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <li className="flex items-center gap-3 rounded-xl bg-zinc-50 px-3 py-2.5 dark:bg-zinc-800/50">
      {/* Priority dot */}
      <span
        className={`h-2 w-2 shrink-0 rounded-full ${PRIORITY_DOT[task.priority]}`}
        title={`${task.priority} priority`}
      />

      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-colors ${
          task.completed
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-zinc-300 dark:border-zinc-600"
        }`}
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
      >
        {task.completed && <CheckIcon className="h-3.5 w-3.5" />}
      </button>

      {/* Text */}
      <span
        className={`flex-1 text-sm ${
          task.completed
            ? "text-zinc-400 line-through dark:text-zinc-500"
            : "text-zinc-700 dark:text-zinc-300"
        }`}
      >
        {task.text}
      </span>

      {/* Priority badge (only for high) */}
      {task.priority === "high" && !task.completed && (
        <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600 dark:bg-red-900/40 dark:text-red-400">
          High
        </span>
      )}

      {/* Delete */}
      <button
        onClick={() => onDelete(task.id)}
        className="rounded-lg p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
        aria-label={`Delete task ${task.text}`}
      >
        <TrashIcon />
      </button>
    </li>
  );
}
