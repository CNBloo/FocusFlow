# FocusFlow

A personal productivity dashboard built to help you stay focused, build habits, and track long-term goals — without the noise.


## Features

**🎲 Roll Instead of Scrolling**  
When the urge to doom-scroll hits, roll for a random productive activity from your custom idea bank. Categories include Fitness, Learning, and Productivity.

**⏱️ Focus Mode**  
Built-in Pomodoro-style timer with 5, 15, and 25-minute presets. Set it and stay off your phone.

**🎯 Goals**  
Track long-term goals across categories and visualize your progress over time.

**✅ Daily Tasks**  
Quick-win task list for the day, with priority levels to keep things manageable.

**🔁 Daily Habits**  
Check off recurring habits (LeetCode, workout, reading, hydration, sleep) and build your streak.

**📰 Stay Updated in Tech**  
Curated tech headlines across Cloud, Cybersecurity, Startups, and AI — refreshable on demand, no feed required.

**📊 Weekly Summary**  
At-a-glance stats: activities completed, tasks done, goals finished, and average goal progress.

**Coming Soon:** Budget Tracker · Meal & Calorie Log · Marathon Prep · Calendar & Schedule

## Tech Stack

- [Next.js 14](https://nextjs.org/) — App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) with [Geist](https://vercel.com/font)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

To start editing, modify `app/page.tsx` — the page hot-reloads as you save.

## Project Structure

```
app/
├── dashboard/        # Main dashboard layout and widgets
├── components/       # Reusable UI components
├── page.tsx          # Entry point
public/               # Static assets
```

## Deployment

Deploy instantly with [Vercel](https://vercel.com/new):

```bash
npx vercel
```

Or connect your GitHub repo to Vercel for automatic deployments on every push.

See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for other options.
