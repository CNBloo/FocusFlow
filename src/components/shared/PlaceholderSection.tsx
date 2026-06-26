import { Card } from "@/components/ui";

interface PlaceholderSectionProps {
  icon: string;
  title: string;
  description: string;
}

export function PlaceholderSection({ icon, title, description }: PlaceholderSectionProps) {
  return (
    <Card className="relative overflow-hidden opacity-75">
      {/* Coming soon ribbon */}
      <div className="absolute right-4 top-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
          🚧 Coming Soon
        </span>
      </div>

      <div className="flex items-start gap-4 pr-28">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 text-2xl dark:bg-zinc-800">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-zinc-700 dark:text-zinc-300">{title}</h3>
          <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">{description}</p>
        </div>
      </div>

      {/* Placeholder bar skeleton */}
      <div className="mt-5 space-y-2">
        <div className="h-2.5 w-3/4 rounded-full bg-zinc-100 dark:bg-zinc-800" />
        <div className="h-2.5 w-1/2 rounded-full bg-zinc-100 dark:bg-zinc-800" />
      </div>
    </Card>
  );
}
