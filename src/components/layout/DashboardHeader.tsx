"use client";

import { useEffect } from "react";
import { Button, StatCard } from "@/components/ui";
import {
  CheckIcon,
  FlameIcon,
  MoonIcon,
  SunIcon,
  TargetIcon,
} from "@/components/shared/icons";
import { MOTIVATIONAL_MESSAGES, STORAGE_KEYS } from "@/lib/constants";
import type { DiceStats, Goal, Task, Theme } from "@/lib/types";
import {
  calculateStreak,
  formatTodayDate,
  getDailyMessage,
} from "@/lib/utils";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface DashboardHeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function DashboardHeader({ theme, onToggleTheme }: DashboardHeaderProps) {
  const [goals] = useLocalStorage<Goal[]>(STORAGE_KEYS.goals, []);
  const [tasks] = useLocalStorage<Task[]>(STORAGE_KEYS.tasks, []);
  const [stats] = useLocalStorage<DiceStats>(STORAGE_KEYS.diceStats, {
    totalRolls: 0,
    totalCompleted: 0,
    completionDates: [],
  });

  const activeGoals = goals.filter((g) => g.status === "active").length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const streak = calculateStreak(stats.completionDates);
  const message = getDailyMessage(MOTIVATIONAL_MESSAGES);

  return (
    <header className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            FocusFlow
          </p>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            Welcome back
          </h1>
        </div>
        <Button variant="ghost" size="sm" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>

      {/* Date & motivation */}
      <div className="rounded-2xl bg-linear-to-r from-indigo-500 to-violet-600 p-6 text-white shadow-lg shadow-indigo-500/20">
        <p className="text-sm font-medium text-indigo-100">
          {formatTodayDate()}
        </p>
        <p className="mt-2 text-lg font-medium leading-relaxed">
          {message}
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard
          label="Active goals"
          value={activeGoals}
          icon={<TargetIcon className="h-5 w-5" />}
          accent="bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400"
        />
        <StatCard
          label="Tasks completed"
          value={completedTasks}
          icon={<CheckIcon className="h-5 w-5" />}
          accent="bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
        />
        <StatCard
          label="Day streak"
          value={streak}
          icon={<FlameIcon className="h-5 w-5" />}
          accent="bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400"
        />
      </div>
    </header>
  );
}

/** Applies dark mode class to document and persists preference */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>(STORAGE_KEYS.theme, "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <DashboardHeader theme={theme} onToggleTheme={toggleTheme} />
        <main className="mt-8 space-y-6">{children}</main>
        <footer className="mt-12 border-t border-zinc-200 py-6 text-center text-sm text-zinc-400 dark:border-zinc-800">
          FocusFlow — choose progress over scrolling
        </footer>
      </div>
    </div>
  );
}
