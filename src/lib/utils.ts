/** Format today's date for display */
export function formatTodayDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** ISO date string YYYY-MM-DD for streak tracking */
export function toDateKey(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

/** Pick a random item from an array */
export function pickRandom<T>(items: T[]): T | null {
  if (items.length === 0) return null;
  return items[Math.floor(Math.random() * items.length)];
}

/** Calculate consecutive-day streak from completion dates */
export function calculateStreak(completionDates: string[]): number {
  if (completionDates.length === 0) return 0;

  const uniqueDates = [...new Set(completionDates)].sort().reverse();
  const today = toDateKey();
  const yesterday = toDateKey(new Date(Date.now() - 86400000));

  // Streak must include today or yesterday to still be active
  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) {
    return 0;
  }

  let streak = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    const prev = new Date(uniqueDates[i - 1]);
    const curr = new Date(uniqueDates[i]);
    const diffDays = Math.round(
      (prev.getTime() - curr.getTime()) / 86400000
    );
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

/** Count completions in the current calendar week (Mon–Sun) */
export function getWeeklyStats(completionDates: string[]): {
  rollsThisWeek: number;
  completionsThisWeek: number;
} {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);
  monday.setHours(0, 0, 0, 0);

  const completionsThisWeek = completionDates.filter((d) => {
    const date = new Date(d + "T12:00:00");
    return date >= monday;
  }).length;

  return { rollsThisWeek: 0, completionsThisWeek };
}

export function generateId(): string {
  return crypto.randomUUID();
}

/** Pick a motivational message based on the day */
export function getDailyMessage(messages: string[]): string {
  const dayIndex = new Date().getDate() % messages.length;
  return messages[dayIndex];
}

export function clampProgress(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)));
}
