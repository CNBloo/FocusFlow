"use client";

import { useState } from "react";
import { Button, Card, EmptyState, Input, SectionHeader } from "@/components/ui";
import { CheckIcon, ListIcon, PlusIcon, TrashIcon } from "@/components/icons";
import { STORAGE_KEYS } from "@/lib/constants";
import type { Task } from "@/lib/types";
import { generateId } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export function TasksSection() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEYS.tasks, []);
  const [text, setText] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setTasks((prev) => [
      { id: generateId(), text: trimmed, completed: false, createdAt: new Date().toISOString() },
      ...prev,
    ]);
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

  const completedCount = tasks.filter((t) => t.completed).length;

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
        <Button type="submit" variant="secondary">
          <PlusIcon /> Add
        </Button>
      </form>

      {tasks.length === 0 ? (
        <EmptyState message="No tasks yet. Add something small to get started." />
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-3 rounded-xl bg-zinc-50 px-3 py-2.5 dark:bg-zinc-800/50"
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-colors ${
                  task.completed
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-zinc-300 dark:border-zinc-600"
                }`}
                aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
              >
                {task.completed && <CheckIcon className="h-3.5 w-3.5" />}
              </button>
              <span
                className={`flex-1 text-sm ${
                  task.completed
                    ? "text-zinc-400 line-through dark:text-zinc-500"
                    : "text-zinc-700 dark:text-zinc-300"
                }`}
              >
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
                aria-label={`Delete task ${task.text}`}
              >
                <TrashIcon />
              </button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
