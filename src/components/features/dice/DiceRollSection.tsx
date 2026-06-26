"use client";

import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Input,
  SectionHeader,
  Select,
} from "@/components/ui";
import { DiceIcon, PlusIcon, TrashIcon } from "@/components/shared/icons";
import {
  CATEGORY_COLORS,
  DEFAULT_IDEAS,
  IDEA_CATEGORIES,
  STORAGE_KEYS,
} from "@/lib/constants";
import type { DiceIdea, DiceStats, IdeaCategory } from "@/lib/types";
import { generateId, pickRandom, toDateKey } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const DEFAULT_STATS: DiceStats = {
  totalRolls: 0,
  totalCompleted: 0,
  completionDates: [],
};

export function DiceRollSection() {
  const [ideas, setIdeas, ideasLoaded] = useLocalStorage<DiceIdea[]>(
    STORAGE_KEYS.ideas,
    []
  );
  const [stats, setStats] = useLocalStorage<DiceStats>(
    STORAGE_KEYS.diceStats,
    DEFAULT_STATS
  );

  const [selected, setSelected] = useState<DiceIdea | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  const [newIdeaText, setNewIdeaText] = useState("");
  const [newIdeaCategory, setNewIdeaCategory] =
    useState<IdeaCategory>("Productivity");

  // Seed default ideas on first visit
  useEffect(() => {
    if (ideasLoaded && ideas.length === 0) {
      setIdeas(
        DEFAULT_IDEAS.map((idea) => ({ ...idea, id: generateId() }))
      );
    }
  }, [ideasLoaded, ideas.length, setIdeas]);

  const handleRoll = () => {
    if (ideas.length === 0) return;
    setIsRolling(true);
    setJustCompleted(false);
    setSelected(null);

    // Brief animation delay for feedback
    setTimeout(() => {
      const pick = pickRandom(ideas);
      setSelected(pick);
      setStats((prev) => ({ ...prev, totalRolls: prev.totalRolls + 1 }));
      setIsRolling(false);
    }, 600);
  };

  const handleComplete = () => {
    if (!selected) return;
    const today = toDateKey();
    setStats((prev) => ({
      totalRolls: prev.totalRolls,
      totalCompleted: prev.totalCompleted + 1,
      completionDates: prev.completionDates.includes(today)
        ? prev.completionDates
        : [...prev.completionDates, today],
    }));
    setJustCompleted(true);
  };

  const handleAddIdea = (e: React.FormEvent) => {
    e.preventDefault();
    const text = newIdeaText.trim();
    if (!text) return;
    setIdeas((prev) => [
      ...prev,
      { id: generateId(), text, category: newIdeaCategory },
    ]);
    setNewIdeaText("");
  };

  const handleDeleteIdea = (id: string) => {
    setIdeas((prev) => prev.filter((i) => i.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  return (
    <Card>
      <SectionHeader
        icon={<DiceIcon />}
        title="Roll Instead of Scrolling"
        subtitle="Pick a random productive activity when you feel like doom scrolling"
      />

      <div className="flex flex-col items-center gap-6">
        {/* Dice button */}
        <button
          onClick={handleRoll}
          disabled={isRolling || ideas.length === 0}
          className="group relative flex h-28 w-28 items-center justify-center rounded-3xl bg-linear-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30 transition-transform hover:scale-105 active:scale-95 disabled:opacity-60 disabled:hover:scale-100"
          aria-label="Roll the dice"
        >
          <span
            className={`text-5xl transition-transform duration-300 ${isRolling ? "animate-spin" : "group-hover:rotate-12"}`}
          >
            🎲
          </span>
        </button>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {stats.totalRolls} rolls · {stats.totalCompleted} completed
        </p>

        {/* Selected activity card */}
        {selected && (
          <div className="animate-fade-up w-full max-w-md rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-6 text-center dark:border-indigo-800 dark:bg-indigo-950/50">
            <Badge
              label={selected.category}
              colorClass={CATEGORY_COLORS[selected.category]}
            />
            <p className="mt-3 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {selected.text}
            </p>
            {!justCompleted ? (
              <Button
                onClick={handleComplete}
                className="mt-4"
                size="lg"
              >
                Mark as Completed
              </Button>
            ) : (
              <p className="mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Nice work — activity logged!
              </p>
            )}
          </div>
        )}

        {isRolling && (
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            Rolling...
          </p>
        )}
      </div>

      {/* Custom ideas manager */}
      <div className="mt-8 border-t border-zinc-100 pt-6 dark:border-zinc-800">
        <h3 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Manage Ideas
        </h3>

        <form onSubmit={handleAddIdea} className="mb-4 flex flex-col gap-2 sm:flex-row">
          <Input
            value={newIdeaText}
            onChange={(e) => setNewIdeaText(e.target.value)}
            placeholder="Add a custom idea..."
            className="flex-1"
          />
          <Select
            value={newIdeaCategory}
            onChange={(e) =>
              setNewIdeaCategory(e.target.value as IdeaCategory)
            }
            className="sm:w-40"
          >
            {IDEA_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
          <Button type="submit" variant="secondary">
            <PlusIcon /> Add
          </Button>
        </form>

        <ul className="max-h-48 space-y-2 overflow-y-auto">
          {ideas.length === 0 ? (
            <EmptyState message="No ideas yet — add your first one above." />
          ) : (
            ideas.map((idea) => (
              <li
                key={idea.id}
                className="flex items-center justify-between gap-3 rounded-xl bg-zinc-50 px-3 py-2 dark:bg-zinc-800/50"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <Badge
                    label={idea.category}
                    colorClass={CATEGORY_COLORS[idea.category]}
                  />
                  <span className="truncate text-sm text-zinc-700 dark:text-zinc-300">
                    {idea.text}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteIdea(idea.id)}
                  className="shrink-0 rounded-lg p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
                  aria-label={`Delete ${idea.text}`}
                >
                  <TrashIcon />
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </Card>
  );
}
