"use client";

import { useEffect, useState } from "react";
import { Button, Card, Input, SectionHeader } from "@/components/ui";
import { FlameIcon, PlusIcon, TrashIcon } from "@/components/icons";
import { DEFAULT_HABITS, STORAGE_KEYS } from "@/lib/constants";
import type { Habit } from "@/lib/types";
import { calculateStreak, generateId, toDateKey } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export function HabitTrackerSection() {
  const [habits, setHabits, habitsLoaded] = useLocalStorage<Habit[]>(
    STORAGE_KEYS.habits,
    []
  );
  const [newLabel, setNewLabel] = useState("");
  const [newIcon, setNewIcon] = useState("✅");
  const [showForm, setShowForm] = useState(false);

  // Seed defaults on first visit
  useEffect(() => {
    if (habitsLoaded && habits.length === 0) {
      setHabits(DEFAULT_HABITS.map((h) => ({ ...h, completedDates: [] })));
    }
  }, [habitsLoaded, habits.length, setHabits]);

  const today = toDateKey();

  const toggleToday = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const alreadyDone = h.completedDates.includes(today);
        return {
          ...h,
          completedDates: alreadyDone
            ? h.completedDates.filter((d) => d !== today)
            : [...h.completedDates, today],
        };
      })
    );
  };

  const deleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const label = newLabel.trim();
    if (!label) return;
    setHabits((prev) => [
      ...prev,
      { id: generateId(), label, icon: newIcon.trim() || "✅", completedDates: [] },
    ]);
    setNewLabel("");
    setNewIcon("✅");
    setShowForm(false);
  };

  const completedToday = habits.filter((h) => h.completedDates.includes(today)).length;

  return (
    <Card>
      <SectionHeader
        icon={<FlameIcon />}
        title="Daily Habits"
        subtitle={
          habits.length > 0
            ? `${completedToday} of ${habits.length} done today`
            : "Build consistency one day at a time"
        }
        action={
          <Button variant="secondary" size="sm" onClick={() => setShowForm(!showForm)}>
            <PlusIcon /> Add
          </Button>
        }
      />

      {showForm && (
        <form onSubmit={handleAdd} className="mb-5 flex flex-col gap-2 sm:flex-row">
          <Input
            value={newIcon}
            onChange={(e) => setNewIcon(e.target.value)}
            placeholder="Emoji"
            className="w-20 shrink-0 text-center"
            maxLength={2}
          />
          <Input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Habit name..."
            className="flex-1"
            autoFocus
          />
          <Button type="submit">Add</Button>
        </form>
      )}

      <ul className="space-y-2">
        {habits.map((habit) => {
          const doneToday = habit.completedDates.includes(today);
          const streak = calculateStreak(habit.completedDates);

          return (
            <li
              key={habit.id}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${
                doneToday
                  ? "bg-emerald-50 dark:bg-emerald-950/30"
                  : "bg-zinc-50 dark:bg-zinc-800/50"
              }`}
            >
              {/* Checkbox */}
              <button
                onClick={() => toggleToday(habit.id)}
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 text-sm transition-all ${
                  doneToday
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-zinc-300 hover:border-emerald-400 dark:border-zinc-600"
                }`}
                aria-label={doneToday ? "Mark incomplete" : "Mark done"}
              >
                {doneToday && "✓"}
              </button>

              {/* Icon + label */}
              <span className="text-xl leading-none">{habit.icon}</span>
              <span
                className={`flex-1 text-sm font-medium ${
                  doneToday
                    ? "text-emerald-700 line-through opacity-70 dark:text-emerald-400"
                    : "text-zinc-700 dark:text-zinc-300"
                }`}
              >
                {habit.label}
              </span>

              {/* Streak */}
              {streak > 0 && (
                <span className="flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-600 dark:bg-orange-900/40 dark:text-orange-400">
                  🔥 {streak}
                </span>
              )}

              {/* Delete */}
              <button
                onClick={() => deleteHabit(habit.id)}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
                aria-label={`Delete habit ${habit.label}`}
              >
                <TrashIcon />
              </button>
            </li>
          );
        })}
      </ul>

      {habits.length === 0 && (
        <p className="py-4 text-center text-sm text-zinc-400 dark:text-zinc-500">
          No habits yet. Add your first one to start building consistency.
        </p>
      )}
    </Card>
  );
}
