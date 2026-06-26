import type { DiceIdea, GoalCategory, Habit, IdeaCategory, Priority } from "./types";

export const STORAGE_KEYS = {
  ideas: "productivity-ideas",
  goals: "productivity-goals",
  tasks: "productivity-tasks",
  habits: "productivity-habits",
  diceStats: "productivity-dice-stats",
  theme: "productivity-theme",
} as const;

export const GOAL_CATEGORIES: GoalCategory[] = [
  "Coding",
  "Fitness",
  "School",
  "Career",
  "Personal",
  "Finances",
  "Health",
];

export const IDEA_CATEGORIES: IdeaCategory[] = [
  "Fitness",
  "Learning",
  "Health",
  "Productivity",
  "Fun",
];

/** Default dice roll ideas — loaded on first visit */
export const DEFAULT_IDEAS: Omit<DiceIdea, "id">[] = [
  { text: "Do 10 pushups", category: "Fitness" },
  { text: "Read 5 pages", category: "Learning" },
  { text: "Clean your desk for 5 minutes", category: "Productivity" },
  { text: "Work on coding for 15 minutes", category: "Learning" },
  { text: "Drink water", category: "Health" },
  { text: "Go for a short walk", category: "Fitness" },
  { text: "Review one LeetCode problem", category: "Learning" },
  { text: "Stretch for 5 minutes", category: "Fitness" },
  { text: "Plan tomorrow", category: "Productivity" },
  { text: "Watch one educational tech video", category: "Learning" },
];

export const MOTIVATIONAL_MESSAGES = [
  "Small actions today build the life you want tomorrow.",
  "Your future self will thank you for choosing progress over scrolling.",
  "Focus on what you can control — one task at a time.",
  "Momentum beats motivation. Start with something small.",
  "You're building habits that compound over time.",
  "Replace distraction with intention. You've got this.",
];

export const PRIORITY_COLORS: Record<Priority, string> = {
  low: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  high: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

export const DEFAULT_HABITS: Omit<Habit, "completedDates">[] = [
  { id: "h1", label: "LeetCode", icon: "💻" },
  { id: "h2", label: "Workout", icon: "🏋️" },
  { id: "h3", label: "Read", icon: "📚" },
  { id: "h4", label: "No doom scrolling", icon: "🚫" },
  { id: "h5", label: "Drink water", icon: "💧" },
  { id: "h6", label: "Sleep on time", icon: "😴" },
];

export const CATEGORY_COLORS: Record<string, string> = {
  Coding: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  Fitness: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  School: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Career: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Personal: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  Fitness_Idea: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  Learning: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  Health: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  Productivity: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  Fun: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  AI: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  "Software Engineering":
    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Cybersecurity:
    "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  Startups: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  Cloud: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
  Finances: "bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300",
};
