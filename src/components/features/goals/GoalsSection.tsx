"use client";

import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Input,
  SectionHeader,
  Select,
} from "@/components/ui";
import { PlusIcon, TargetIcon, TrashIcon } from "@/components/shared/icons";
import {
  CATEGORY_COLORS,
  GOAL_CATEGORIES,
  PRIORITY_COLORS,
  STORAGE_KEYS,
} from "@/lib/constants";
import type { Goal, GoalCategory, Priority } from "@/lib/types";
import { clampProgress, generateId } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export function GoalsSection() {
  const [goals, setGoals] = useLocalStorage<Goal[]>(STORAGE_KEYS.goals, []);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<GoalCategory>("Coding");
  const [priority, setPriority] = useState<Priority>("medium");
  const [deadline, setDeadline] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    setGoals((prev) => [
      ...prev,
      {
        id: generateId(),
        title: trimmed,
        category,
        priority,
        deadline: deadline || undefined,
        progress: 0,
        status: "active",
        createdAt: new Date().toISOString(),
      },
    ]);
    setTitle("");
    setDeadline("");
    setShowForm(false);
  };

  const updateProgress = (id: string, progress: number) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === id
          ? {
              ...g,
              progress: clampProgress(progress),
              status: clampProgress(progress) >= 100 ? "completed" : "active",
            }
          : g
      )
    );
  };

  const markCompleted = (id: string) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, progress: 100, status: "completed" } : g
      )
    );
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const activeGoals = goals.filter((g) => g.status === "active");
  const completedGoals = goals.filter((g) => g.status === "completed");

  return (
    <Card>
      <SectionHeader
        icon={<TargetIcon />}
        title="Goals"
        subtitle="Track long-term progress across categories"
        action={
          <Button variant="secondary" size="sm" onClick={() => setShowForm(!showForm)}>
            <PlusIcon /> New Goal
          </Button>
        }
      />

      {showForm && (
        <form onSubmit={handleAdd} className="mb-5 space-y-2">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Goal title..."
              className="flex-1"
              autoFocus
            />
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value as GoalCategory)}
              className="sm:w-36"
            >
              {GOAL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="sm:w-36"
            >
              <option value="low">Low priority</option>
              <option value="medium">Medium priority</option>
              <option value="high">High priority</option>
            </Select>
            <Input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="flex-1"
              placeholder="Deadline (optional)"
            />
            <Button type="submit">Add</Button>
          </div>
        </form>
      )}

      {goals.length === 0 ? (
        <EmptyState message="No goals yet. Set your first one to stay on track." />
      ) : (
        <div className="space-y-6">
          {activeGoals.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Active
              </h3>
              {activeGoals.map((goal) => (
                <GoalItem
                  key={goal.id}
                  goal={goal}
                  onProgressChange={updateProgress}
                  onComplete={markCompleted}
                  onDelete={deleteGoal}
                />
              ))}
            </div>
          )}
          {completedGoals.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Completed
              </h3>
              {completedGoals.map((goal) => (
                <GoalItem
                  key={goal.id}
                  goal={goal}
                  onProgressChange={updateProgress}
                  onComplete={markCompleted}
                  onDelete={deleteGoal}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

function GoalItem({
  goal,
  onProgressChange,
  onComplete,
  onDelete,
}: {
  goal: Goal;
  onProgressChange: (id: string, progress: number) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const deadlineLabel = goal.deadline
    ? new Date(goal.deadline + "T12:00:00").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const isOverdue =
    goal.deadline &&
    goal.status === "active" &&
    new Date(goal.deadline + "T23:59:59") < new Date();

  return (
    <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/40">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge
              label={goal.category}
              colorClass={CATEGORY_COLORS[goal.category]}
            />
            <Badge
              label={goal.priority}
              colorClass={PRIORITY_COLORS[goal.priority]}
            />
            {goal.status === "completed" && (
              <Badge
                label="Done"
                colorClass="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
              />
            )}
            {deadlineLabel && (
              <span
                className={`text-xs ${
                  isOverdue
                    ? "font-semibold text-red-500"
                    : "text-zinc-400 dark:text-zinc-500"
                }`}
              >
                {isOverdue ? "⚠ " : "📅 "}
                {deadlineLabel}
              </span>
            )}
          </div>
          <p
            className={`mt-1.5 font-medium text-zinc-900 dark:text-zinc-100 ${
              goal.status === "completed" ? "line-through opacity-60" : ""
            }`}
          >
            {goal.title}
          </p>
        </div>
        <button
          onClick={() => onDelete(goal.id)}
          className="shrink-0 rounded-lg p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
          aria-label={`Delete goal ${goal.title}`}
        >
          <TrashIcon />
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-2 h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            goal.status === "completed" ? "bg-emerald-500" : "bg-indigo-500"
          }`}
          style={{ width: `${goal.progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-zinc-500">{goal.progress}%</span>
        {goal.status === "active" && (
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={goal.progress}
              onChange={(e) => onProgressChange(goal.id, Number(e.target.value))}
              className="w-24 accent-indigo-600"
            />
            <Button variant="ghost" size="sm" onClick={() => onComplete(goal.id)}>
              Complete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
