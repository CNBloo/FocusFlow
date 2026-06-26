import { Dashboard } from "@/components/layout/Dashboard";
import { fetchMockNews } from "@/lib/newsData";

export default async function DashboardPage() {
  const initialNews = await fetchMockNews(4);

  return <Dashboard initialNews={initialNews} />;
}
