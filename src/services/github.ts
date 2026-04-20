const CACHE_PREFIX = "github-cache";
const DEFAULT_TTL_MS = 60 * 60 * 1000;

export interface GitHubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  updated_at: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  updated_at: string;
  fork: boolean;
  archived: boolean;
}

interface CacheEntry<T> {
  timestamp: number;
  data: T;
}

export interface GitHubPayload {
  profile: GitHubProfile;
  repositories: GitHubRepository[];
  stale: boolean;
  cachedAt: number;
}

function getCacheKey(scope: string) {
  return `${CACHE_PREFIX}:${scope}`;
}

function getTtlMs(ttlMs?: number) {
  return ttlMs ?? DEFAULT_TTL_MS;
}

function canUseSessionStorage() {
  return typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";
}

function readCache<T>(scope: string): CacheEntry<T> | null {
  if (!canUseSessionStorage()) return null;

  const raw = window.sessionStorage.getItem(getCacheKey(scope));
  if (!raw) return null;

  try {
    return JSON.parse(raw) as CacheEntry<T>;
  } catch {
    return null;
  }
}

function writeCache<T>(scope: string, data: T) {
  if (!canUseSessionStorage()) return;

  const entry: CacheEntry<T> = {
    timestamp: Date.now(),
    data,
  };

  window.sessionStorage.setItem(getCacheKey(scope), JSON.stringify(entry));
}

function isFresh(timestamp: number, ttlMs: number) {
  return Date.now() - timestamp < ttlMs;
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return (await response.json()) as T;
}

export function extractGitHubUsername(githubUrl: string) {
  try {
    const parsed = new URL(githubUrl);
    const segment = parsed.pathname.split("/").filter(Boolean)[0];
    return segment || null;
  } catch {
    return null;
  }
}

export async function getGitHubPayload(username: string, ttlMs?: number): Promise<GitHubPayload> {
  const ttl = getTtlMs(ttlMs);
  const cacheScope = `profile:${username}`;
  const cached = readCache<Pick<GitHubPayload, "profile" | "repositories">>(cacheScope);

  if (cached && isFresh(cached.timestamp, ttl)) {
    return {
      ...cached.data,
      cachedAt: cached.timestamp,
      stale: false,
    };
  }

  try {
    const [profile, repositories] = await Promise.all([
      fetchJson<GitHubProfile>(`https://api.github.com/users/${username}`),
      fetchJson<GitHubRepository[]>(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated&direction=desc`),
    ]);

    const payload = {
      profile,
      repositories,
    };

    writeCache(cacheScope, payload);

    return {
      ...payload,
      stale: false,
      cachedAt: Date.now(),
    };
  } catch (error) {
    if (cached) {
      return {
        ...cached.data,
        cachedAt: cached.timestamp,
        stale: true,
      };
    }

    throw error;
  }
}
