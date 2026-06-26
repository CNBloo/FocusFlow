"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Card, SectionHeader } from "@/components/ui";
import { TimerIcon } from "@/components/shared/icons";

const PRESETS = [
  { label: "25 min", seconds: 25 * 60 },
  { label: "15 min", seconds: 15 * 60 },
  { label: "5 min", seconds: 5 * 60 },
];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

/** Simple focus timer — bonus feature for deep work sessions */
export function FocusModeTimer() {
  const [duration, setDuration] = useState(PRESETS[0].seconds);
  const [remaining, setRemaining] = useState(PRESETS[0].seconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearTimer();
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return clearTimer;
  }, [running, clearTimer]);

  const selectPreset = (seconds: number) => {
    clearTimer();
    setRunning(false);
    setDuration(seconds);
    setRemaining(seconds);
  };

  const toggle = () => {
    if (remaining === 0) {
      setRemaining(duration);
    }
    setRunning((r) => !r);
  };

  const reset = () => {
    clearTimer();
    setRunning(false);
    setRemaining(duration);
  };

  const progress = duration > 0 ? ((duration - remaining) / duration) * 100 : 0;

  return (
    <Card>
      <SectionHeader
        icon={<TimerIcon />}
        title="Focus Mode"
        subtitle="Set a timer and stay off your phone"
      />

      <div className="flex flex-col items-center gap-4">
        {/* Circular progress indicator */}
        <div className="relative flex h-36 w-36 items-center justify-center">
          <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className="text-zinc-200 dark:text-zinc-700"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 44}`}
              strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress / 100)}`}
              className="text-indigo-500 transition-all duration-1000"
            />
          </svg>
          <span className="text-3xl font-bold tabular-nums text-zinc-900 dark:text-zinc-50">
            {formatTime(remaining)}
          </span>
        </div>

        <div className="flex gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => selectPreset(preset.seconds)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                duration === preset.seconds
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300"
                  : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <Button onClick={toggle} size="lg">
            {running ? "Pause" : remaining === 0 ? "Restart" : "Start"}
          </Button>
          <Button variant="secondary" onClick={reset}>
            Reset
          </Button>
        </div>

        {remaining === 0 && !running && (
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            Session complete — great focus!
          </p>
        )}
      </div>
    </Card>
  );
}
