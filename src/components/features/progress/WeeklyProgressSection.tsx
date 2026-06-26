"use client";

import { Card, SectionHeader } from "@/components/ui";
import { ChartIcon } from "@/components/shared/icons";
import { STORAGE_KEYS } from "@/lib/constants";
import type { DiceStats, Goal, Task } from "@/lib/types";
import { getWeeklyStats } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/useLocalStorage";

/** Weekly progress summary — bonus feature */
export function WeeklyProgressSection() {
  const [stats] = useLocalStorage<DiceStats>(STORAGE_KEYS.diceStats, {
    totalRolls: 0,
    totalCompleted: 0,
    completionDates: [],
  });
  const [tasks] = useLocalStorage<Task[]>(STORAGE_KEYS.tasks, []);
  const [goals] = useLocalStorage<Goal[]>(STORAGE_KEYS.goals, []);

  const { completionsThisWeek } = getWeeklyStats(stats.completionDates);
  const tasksDone = tasks.filter((t) => t.completed).length;
  const goalsCompleted = goals.filter((g) => g.status === "completed").length;
  const avgGoalProgress =
    goals.length > 0
      ? Math.round(
          goals.reduce((sum, g) => sum + g.progress, 0) / goals.length
        )
      : 0;

  const items = [
    { label: "Activities completed", value: completionsThisWeek },
    { label: "Tasks done", value: tasksDone },
    { label: "Goals finished", value: goalsCompleted },
    { label: "Avg goal progress", value: `${avgGoalProgress}%` },
  ];

  return (
    <Card>
      <SectionHeader
        icon={<ChartIcon />}
        title="This Week"
        subtitle="Your productivity at a glance"
      />
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50"
          >
            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
              {item.value}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
