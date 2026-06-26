"use client";

import Link from "next/link";
import { DiceRollSection } from "@/components/DiceRollSection";
import { ThemeProvider } from "@/components/DashboardHeader";
import { FocusModeTimer } from "@/components/FocusModeTimer";
import { GoalsSection } from "@/components/GoalsSection";
import { HabitTrackerSection } from "@/components/HabitTrackerSection";
import { PlaceholderSection } from "@/components/PlaceholderSection";
import { TasksSection } from "@/components/TasksSection";
import { TechNewsSection } from "@/components/TechNewsSection";
import { WeeklyProgressSection } from "@/components/WeeklyProgressSection";
import type { NewsItem } from "@/lib/types";

interface DashboardProps {
  initialNews: NewsItem[];
}

const FUTURE_FEATURES = [
  {
    icon: "💰",
    title: "Budget Tracker",
    description: "Log income, expenses, and savings goals. Visualize spending by category.",
  },
  {
    icon: "🥗",
    title: "Meal & Calorie Log",
    description: "Track daily meals, macros, and calories toward your nutrition goals.",
  },
  {
    icon: "🏃",
    title: "Marathon Prep",
    description: "Training plans, weekly mileage tracking, and race-day countdowns.",
  },
  {
    icon: "📅",
    title: "Calendar & Schedule",
    description: "Plan your week, block focus time, and sync with upcoming deadlines.",
  },
];

export function Dashboard({ initialNews }: DashboardProps) {
  return (
    <ThemeProvider>
      {/* Back to home */}
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          ← Home
        </Link>
      </div>

      {/* Main 3-column grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main column — primary features */}
        <div className="space-y-6 lg:col-span-2">
          <DiceRollSection />
          <GoalsSection />
          <TasksSection />
          <HabitTrackerSection />

          {/* Future features placeholder row */}
          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Coming Soon
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {FUTURE_FEATURES.map((f) => (
                <PlaceholderSection
                  key={f.title}
                  icon={f.icon}
                  title={f.title}
                  description={f.description}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar — focus tools & news */}
        <div className="space-y-6">
          <FocusModeTimer />
          <WeeklyProgressSection />
          <TechNewsSection initialNews={initialNews} />
        </div>
      </div>
    </ThemeProvider>
  );
}
