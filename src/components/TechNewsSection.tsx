"use client";

import { useCallback, useState } from "react";
import { Badge, Button, Card, EmptyState, SectionHeader } from "@/components/ui";
import { ExternalLinkIcon, NewsIcon, RefreshIcon } from "@/components/icons";
import { CATEGORY_COLORS } from "@/lib/constants";
import { fetchMockNews } from "@/lib/mockNews";
import type { NewsItem } from "@/lib/types";

interface TechNewsSectionProps {
  initialNews: NewsItem[];
}

/**
 * Tech news section — currently uses mock data via fetchMockNews().
 * To connect a real API, replace fetchMockNews with your fetch function
 * while keeping the same NewsItem shape.
 */
export function TechNewsSection({ initialNews }: TechNewsSectionProps) {
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [loading, setLoading] = useState(false);

  const loadNews = useCallback(async () => {
    setLoading(true);
    try {
      const items = await fetchMockNews(4);
      setNews(items);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Card>
      <SectionHeader
        icon={<NewsIcon />}
        title="Stay Updated in Tech"
        subtitle="Curated headlines to stay sharp without the scroll hole"
        action={
          <Button
            variant="secondary"
            size="sm"
            onClick={loadNews}
            disabled={loading}
          >
            <RefreshIcon className={loading ? "animate-spin" : ""} />
            Refresh
          </Button>
        }
      />

      {loading && news.length === 0 ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800"
            />
          ))}
        </div>
      ) : news.length === 0 ? (
        <EmptyState message="No news available right now." />
      ) : (
        <div className="space-y-3">
          {news.map((item) => (
            <article
              key={item.id}
              className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 transition-shadow hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-800/40"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge
                  label={item.category}
                  colorClass={CATEGORY_COLORS[item.category]}
                />
                <span className="text-xs text-zinc-400">{item.source}</span>
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {item.description}
              </p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
              >
                Read more <ExternalLinkIcon />
              </a>
            </article>
          ))}
        </div>
      )}
    </Card>
  );
}
