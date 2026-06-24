"use client";

import { DiceRollSection } from "@/components/DiceRollSection";
import { ThemeProvider } from "@/components/DashboardHeader";
import { FocusModeTimer } from "@/components/FocusModeTimer";
import { GoalsSection } from "@/components/GoalsSection";
import { TasksSection } from "@/components/TasksSection";
import { TechNewsSection } from "@/components/TechNewsSection";
import { WeeklyProgressSection } from "@/components/WeeklyProgressSection";
import type { NewsItem } from "@/lib/types";

interface DashboardProps {
  initialNews: NewsItem[];
}

export function Dashboard({ initialNews }: DashboardProps) {
  return (
    <ThemeProvider>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main column — primary features */}
        <div className="space-y-6 lg:col-span-2">
          <DiceRollSection />
          <GoalsSection />
          <TasksSection />
        </div>

        {/* Sidebar — bonus features & news */}
        <div className="space-y-6">
          <FocusModeTimer />
          <WeeklyProgressSection />
          <TechNewsSection initialNews={initialNews} />
        </div>
      </div>
    </ThemeProvider>
  );
}
