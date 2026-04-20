import { useCallback, useEffect, useMemo, useState } from "react";
import { getGitHubPayload, GitHubPayload } from "../services/github";

export interface GitHubSummary {
  totalStars: number;
  totalForks: number;
  topLanguage: string | null;
  topRepositories: GitHubPayload["repositories"];
}

interface UseGitHubDataState {
  data: GitHubPayload | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useGitHubData(username: string | null): UseGitHubDataState {
  const [data, setData] = useState<GitHubPayload | null>(null);
  const [loading, setLoading] = useState(Boolean(username));
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!username) return;

    setLoading(true);
    setError(null);

    try {
      const payload = await getGitHubPayload(username);
      setData(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "GitHub load failed");
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    data,
    loading,
    error,
    refresh: load,
  };
}

export function useGitHubSummary(data: GitHubPayload | null): GitHubSummary {
  return useMemo(() => {
    const repositories = data?.repositories ?? [];

    const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repositories.reduce((sum, repo) => sum + repo.forks_count, 0);
    const languageFrequency = repositories.reduce<Record<string, number>>((accumulator, repo) => {
      if (!repo.language) return accumulator;
      accumulator[repo.language] = (accumulator[repo.language] ?? 0) + 1;
      return accumulator;
    }, {});

    const topLanguage = Object.entries(languageFrequency).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

    const topRepositories = [...repositories]
      .filter((repo) => !repo.fork && !repo.archived)
      .sort((a, b) => {
        const starDelta = b.stargazers_count - a.stargazers_count;
        if (starDelta !== 0) return starDelta;
        return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
      })
      .slice(0, 2);

    return {
      totalStars,
      totalForks,
      topLanguage,
      topRepositories,
    };
  }, [data]);
}
