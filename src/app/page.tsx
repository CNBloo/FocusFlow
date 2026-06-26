import Link from "next/link";

const features = [
  {
    icon: "🎯",
    title: "Goal Tracker",
    description:
      "Set goals with deadlines, priorities, and category tags. Watch your progress bars climb.",
  },
  {
    icon: "✅",
    title: "Daily Tasks",
    description:
      "Add tasks with priority levels. High-priority items surface to the top automatically.",
  },
  {
    icon: "🔥",
    title: "Habit Tracker",
    description:
      "Build streaks on daily habits — LeetCode, workouts, reading, hydration, and more.",
  },
  {
    icon: "🎲",
    title: "Anti-Doomscroll Dice",
    description:
      "When you feel like mindless scrolling, roll for a productive activity instead.",
  },
  {
    icon: "⏱",
    title: "Focus Timer",
    description:
      "Pomodoro-style timer with 25, 15, and 5-minute presets and a circular progress ring.",
  },
  {
    icon: "📰",
    title: "Tech News",
    description:
      "Stay current with curated headlines across AI, Cloud, Security, and Engineering.",
  },
  {
    icon: "🚀",
    title: "More Coming",
    description:
      "Budget tracking, meal logging, marathon prep, and calendar planning — all planned.",
  },
];

const steps = [
  {
    number: "01",
    title: "Set your goals",
    description:
      "Define what matters — fitness, career, school, finances. Assign priority and a deadline.",
  },
  {
    number: "02",
    title: "Build daily habits",
    description:
      "Check off habits every day. Streaks compound. Small actions become big results.",
  },
  {
    number: "03",
    title: "Roll when tempted",
    description:
      "Instead of doom scrolling, roll the dice and do something useful for 10–20 minutes.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <span className="text-lg font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
          FocusFlow
        </span>
        <Link
          href="/dashboard"
          className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          Open Dashboard →
        </Link>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
            🧠 Personal Productivity Dashboard
          </span>

          <h1 className="mt-4 text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            <span className="bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              FocusFlow
            </span>
          </h1>

          <p className="mt-6 text-xl leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-2xl">
            Replace doom scrolling with{" "}
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              deliberate action.
            </span>
          </p>
          <p className="mt-3 text-base text-zinc-400 dark:text-zinc-500">
            Track goals, build habits, kill distractions — all in one clean dashboard.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="w-full rounded-2xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 hover:bg-indigo-700 sm:w-auto"
            >
              Open Dashboard →
            </Link>
            <a
              href="#features"
              className="w-full rounded-2xl border border-zinc-200 bg-white px-8 py-4 text-base font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 sm:w-auto"
            >
              See Features
            </a>
          </div>
        </div>

        {/* Dashboard preview card */}
        <div className="mx-auto mt-20 max-w-4xl">
          <div className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-2xl shadow-indigo-500/10 dark:border-zinc-800 dark:bg-zinc-900">
            {/* Fake browser bar */}
            <div className="flex items-center gap-2 border-b border-zinc-100 bg-zinc-50 px-5 py-3.5 dark:border-zinc-800 dark:bg-zinc-900/80">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <div className="ml-3 flex-1 rounded-md bg-zinc-100 px-3 py-1 text-xs text-zinc-400 dark:bg-zinc-800">
                focusflow.app/dashboard
              </div>
            </div>
            {/* Preview content */}
            <div className="grid grid-cols-3 gap-3 p-6">
              {/* Stat cards */}
              {[
                { label: "Active Goals", value: "4", color: "text-violet-600" },
                { label: "Tasks Done", value: "7", color: "text-emerald-600" },
                { label: "Day Streak", value: "12", color: "text-orange-500" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800"
                >
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="mt-0.5 text-xs text-zinc-400">{s.label}</p>
                </div>
              ))}
              {/* Progress bars */}
              <div className="col-span-2 rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Goals
                </p>
                {[
                  { label: "Get internship", pct: 60, color: "bg-violet-500" },
                  { label: "Run 5K", pct: 40, color: "bg-emerald-500" },
                  { label: "Save $1000", pct: 75, color: "bg-lime-500" },
                ].map((g) => (
                  <div key={g.label} className="mb-2">
                    <div className="mb-1 flex justify-between">
                      <span className="text-xs text-zinc-600 dark:text-zinc-300">
                        {g.label}
                      </span>
                      <span className="text-xs text-zinc-400">{g.pct}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                      <div
                        className={`h-full rounded-full ${g.color}`}
                        style={{ width: `${g.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {/* Habits */}
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Habits Today
                </p>
                {[
                  { icon: "💻", label: "LeetCode", done: true },
                  { icon: "🏋️", label: "Workout", done: true },
                  { icon: "📚", label: "Read", done: false },
                  { icon: "💧", label: "Water", done: false },
                ].map((h) => (
                  <div key={h.label} className="mb-1.5 flex items-center gap-2">
                    <div
                      className={`h-4 w-4 rounded border-2 text-center text-[9px] leading-3 ${
                        h.done
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-zinc-300"
                      }`}
                    >
                      {h.done && "✓"}
                    </div>
                    <span className="text-sm">{h.icon}</span>
                    <span
                      className={`text-xs ${
                        h.done
                          ? "text-zinc-400 line-through"
                          : "text-zinc-600 dark:text-zinc-300"
                      }`}
                    >
                      {h.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-t border-zinc-200 bg-white py-24 dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Features
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight">
              Everything you need to stay on track
            </h2>
            <p className="mt-4 text-zinc-500 dark:text-zinc-400">
              One dashboard for goals, habits, focus, and news — no subscriptions, no
              accounts.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-zinc-100 bg-zinc-50 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-800/50"
              >
                <span className="text-3xl">{feature.icon}</span>
                <h3 className="mt-3 font-semibold text-zinc-900 dark:text-zinc-100">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              How It Works
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight">
              Three steps to a better day
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 text-lg font-bold text-white shadow-lg shadow-indigo-500/30">
                  {step.number}
                </div>
                <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-200 bg-white py-24 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold tracking-tight">
            Ready to build momentum?
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400">
            No sign-up required. Your data stays local. Start in seconds.
          </p>
          <Link
            href="/dashboard"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-10 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 hover:bg-indigo-700"
          >
            Open Dashboard →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-8 text-center text-sm text-zinc-400 dark:border-zinc-800">
        <p>
          <span className="font-semibold text-zinc-600 dark:text-zinc-300">FocusFlow</span>{" "}
          · Built by Jose Torres · Choose progress over scrolling
        </p>
      </footer>
    </div>
  );
}
