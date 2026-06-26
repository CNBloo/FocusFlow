import { Dashboard } from "@/components/Dashboard";
import { fetchMockNews } from "@/lib/mockNews";

export default async function DashboardPage() {
  const initialNews = await fetchMockNews(4);

  return <Dashboard initialNews={initialNews} />;
}
