import type { NewsItem } from "./types";

/**
 * Mock tech news data for the MVP.
 * Replace fetchMockNews() with a real API/RSS call when ready.
 */
const NEWS_POOL: NewsItem[] = [
  {
    id: "1",
    title: "OpenAI Releases New Reasoning Model for Developers",
    source: "TechCrunch",
    description:
      "The latest model offers improved chain-of-thought capabilities and lower latency for production apps.",
    url: "https://techcrunch.com",
    category: "AI",
  },
  {
    id: "2",
    title: "Rust Adoption Surges in Systems Programming",
    source: "The Register",
    description:
      "Major cloud providers report growing use of Rust for performance-critical infrastructure services.",
    url: "https://theregister.com",
    category: "Software Engineering",
  },
  {
    id: "3",
    title: "Critical Zero-Day Patched in Popular VPN Software",
    source: "Krebs on Security",
    description:
      "Security researchers urge immediate updates after active exploitation was detected in the wild.",
    url: "https://krebsonsecurity.com",
    category: "Cybersecurity",
  },
  {
    id: "4",
    title: "YC Demo Day Highlights AI-First Startups",
    source: "VentureBeat",
    description:
      "This batch features tools for code review, sales automation, and vertical AI agents.",
    url: "https://venturebeat.com",
    category: "Startups",
  },
  {
    id: "5",
    title: "AWS Announces New Graviton4 Instances",
    source: "AWS News Blog",
    description:
      "Fourth-generation ARM chips promise up to 30% better price-performance for compute workloads.",
    url: "https://aws.amazon.com/blogs/aws",
    category: "Cloud",
  },
  {
    id: "6",
    title: "Google DeepMind Advances Protein Structure Prediction",
    source: "Nature Tech",
    description:
      "Updated AlphaFold model accelerates drug discovery pipelines for pharmaceutical partners.",
    url: "https://nature.com",
    category: "AI",
  },
  {
    id: "7",
    title: "GitHub Copilot Workspace Enters Public Preview",
    source: "GitHub Blog",
    description:
      "AI-assisted development environment helps plan, build, and test features from natural language.",
    url: "https://github.blog",
    category: "Software Engineering",
  },
  {
    id: "8",
    title: "Ransomware Groups Target Healthcare Cloud Backups",
    source: "BleepingComputer",
    description:
      "FBI advisory warns hospitals to segment backup systems and enforce MFA on admin accounts.",
    url: "https://bleepingcomputer.com",
    category: "Cybersecurity",
  },
  {
    id: "9",
    title: "Series B Funding Round Values DevTools Startup at $800M",
    source: "Crunchbase News",
    description:
      "Platform for AI-powered observability sees 3x revenue growth year over year.",
    url: "https://news.crunchbase.com",
    category: "Startups",
  },
  {
    id: "10",
    title: "Azure OpenAI Service Adds Fine-Tuning Support",
    source: "Microsoft Azure Blog",
    description:
      "Enterprise customers can now customize models on proprietary data within Azure compliance boundaries.",
    url: "https://azure.microsoft.com/blog",
    category: "Cloud",
  },
];

/** Simulate an async fetch — swap this for a real API later */
export async function fetchMockNews(count = 4): Promise<NewsItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const shuffled = [...NEWS_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
