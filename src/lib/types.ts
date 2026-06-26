export type GoalCategory =
  | "Coding"
  | "Fitness"
  | "School"
  | "Career"
  | "Personal"
  | "Finances"
  | "Health";

export type GoalStatus = "active" | "completed";

export type Priority = "low" | "medium" | "high";

export type IdeaCategory =
  | "Fitness"
  | "Learning"
  | "Health"
  | "Productivity"
  | "Fun";

export type NewsCategory =
  | "AI"
  | "Software Engineering"
  | "Cybersecurity"
  | "Startups"
  | "Cloud";

export interface DiceIdea {
  id: string;
  text: string;
  category: IdeaCategory;
}

export interface Goal {
  id: string;
  title: string;
  category: GoalCategory;
  priority: Priority;
  deadline?: string;
  progress: number;
  status: GoalStatus;
  createdAt: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: string;
}

export interface Habit {
  id: string;
  label: string;
  icon: string;
  /** ISO date strings (YYYY-MM-DD) when this habit was completed */
  completedDates: string[];
}

export interface DiceStats {
  totalRolls: number;
  totalCompleted: number;
  /** ISO date strings (YYYY-MM-DD) when at least one activity was completed */
  completionDates: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  description: string;
  url: string;
  category: NewsCategory;
}

export type Theme = "light" | "dark";
