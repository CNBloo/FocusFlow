export type GoalCategory =
  | "Coding"
  | "Fitness"
  | "School"
  | "Career"
  | "Personal";

export type GoalStatus = "active" | "completed";

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
  progress: number;
  status: GoalStatus;
  createdAt: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
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
