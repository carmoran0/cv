import React from "react";
import { m } from "framer-motion";
import { useTranslation } from "react-i18next";
import { contactData } from "../../data/cv";
import { extractGitHubUsername } from "../../services/github";
import { useGitHubData, useGitHubSummary } from "../../hooks/useGitHubData";
import BorderGlow from "../ui/BorderGlow";
import { GitHubIcon } from "../icons/Icons";
import { GitHubCalendar } from "react-github-calendar";

const GitHubSection: React.FC = () => {
  const { t } = useTranslation();
  const username = extractGitHubUsername(contactData.github);
  const { data, loading, error, refresh } = useGitHubData(username);
  const summary = useGitHubSummary(data);
  const revealOnScroll = {
    initial: { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.35, ease: "easeOut" },
  } as const;

  return (
    <section id="github" className="px-4 md:px-8 lg:px-16 py-8 md:py-12">
      <div className="mx-auto w-full max-w-6xl">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary border-b border-border pb-4 mb-2">
            {t("github.title")}
          </h2>
          <p className="text-sm text-text-secondary max-w-2xl">
            {t("github.subtitle")}
          </p>
        </div>
      </div>

      {loading && !data ? <GitHubSkeleton t={t} /> : null}

      {!loading && error && !data ? (
        <GitHubErrorState t={t} error={error} onRetry={refresh} />
      ) : null}

      {data ? (
        <div className="space-y-4">
          <m.div {...revealOnScroll}>
            <BorderGlow
              edgeSensitivity={28}
              glowColor="155 100 45"
              backgroundColor="#111118"
              borderRadius={16}
              glowRadius={20}
              glowIntensity={0.55}
              coneSpread={24}
              animated={false}
              colors={["#00e5a0", "#14c98f", "#6ee7c8"]}
              className="rounded-2xl border-accent/35"
            >
              <div className="rounded-2xl bg-surface/85 p-4 md:p-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={data.profile.avatar_url}
                      alt={data.profile.name ?? data.profile.login}
                      className="w-12 h-12 rounded-full border border-border"
                    />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-text-secondary">{t("github.profile")}</p>
                      <h3 className="text-lg font-semibold text-text-primary">{data.profile.name ?? data.profile.login}</h3>
                      <p className="text-xs text-text-secondary">@{data.profile.login}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full md:w-auto">
                    <StatBadge label={t("github.stats.followers")} value={data.profile.followers} />
                    <StatBadge label={t("github.stats.repos")} value={data.profile.public_repos} />
                    <StatBadge label={t("github.stats.stars")} value={summary.totalStars} />
                    <StatBadge label={t("github.stats.forks")} value={summary.totalForks} />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-text-secondary">
                  <span className="rounded-full border border-border bg-bg/60 px-2 py-1">
                    {t("github.stats.top_language")}: {summary.topLanguage ?? t("github.none")}
                  </span>
                  <span className="rounded-full border border-border bg-bg/60 px-2 py-1">
                    {data.stale ? t("github.cached_stale") : t("github.cached_fresh")}
                  </span>
                </div>
              </div>
            </BorderGlow>
          </m.div>

          {username && (
            <m.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: 0.06, ease: "easeOut" }}
              className="w-full flex-col items-center flex rounded-xl border border-border bg-surface/40 p-4 md:p-6 overflow-x-hidden relative"
            >
              <h3 className="text-xs font-semibold tracking-widest uppercase text-text-secondary w-full text-left mb-4">
                {t("github.contributions", "Contributions")}
              </h3>
              <div className="w-full overflow-x-auto pb-2 flex justify-center scrollbar-thin">
                <div style={{ minWidth: "max-content" }}>
                  <GitHubCalendar
                    username={username}
                    year="last"
                    blockSize={12}
                    blockMargin={4}
                    fontSize={12}
                    colorScheme="dark"
                  />
                </div>
              </div>
            </m.div>
          )}

          <m.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <h3 className="text-xs font-semibold tracking-widest uppercase text-text-secondary">{t("github.repos")}</h3>
              <a
                href={data.profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-accent/35 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/20 transition-colors"
              >
                <GitHubIcon className="w-4 h-4" />
                {t("github.open_profile")}
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {summary.topRepositories.map((repo, index) => (
                <RepositoryCard key={repo.id} repo={repo} index={index} t={t} />
              ))}
            </div>
          </m.div>
        </div>
      ) : null}

      {!loading && error && data ? (
        <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">
          <p>{t("github.cached_warning")}</p>
          <button
            type="button"
            onClick={refresh}
            className="mt-3 rounded-md border border-amber-300/30 px-3 py-1.5 text-xs font-medium text-amber-100 hover:bg-amber-400/10 transition-colors"
          >
            {t("github.retry")}
          </button>
        </div>
      ) : null}
      </div>
    </section>
  );
};

const GitHubErrorState: React.FC<{
  t: (key: string) => string;
  error: string;
  onRetry: () => Promise<void>;
}> = ({ t, error, onRetry }) => (
  <div className="rounded-xl border border-border bg-surface/70 p-5 text-sm text-text-secondary">
    <p>{t("github.error")}</p>
    <p className="mt-1 text-xs opacity-80">{error}</p>
    <button
      type="button"
      onClick={() => void onRetry()}
      className="mt-3 rounded-md border border-accent/35 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/20 transition-colors"
    >
      {t("github.retry")}
    </button>
  </div>
);

const GitHubSkeleton: React.FC<{ t: (key: string) => string }> = ({ t }) => (
  <div className="space-y-4 animate-pulse">
    <div className="rounded-2xl border border-border bg-surface/60 p-4 md:p-5">
      <div className="h-5 w-40 rounded bg-border/70" />
      <div className="mt-3 h-3 w-64 rounded bg-border/60" />
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-16 rounded-lg bg-border/45" />
        ))}
      </div>
    </div>
    <div>
      <h3 className="text-xs font-semibold tracking-widest uppercase text-text-secondary mb-3">
        {t("github.repos")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-36 rounded-xl border border-border bg-surface/60" />
        ))}
      </div>
    </div>
  </div>
);

const RepositoryCard: React.FC<{
  repo: import("../../services/github").GitHubRepository;
  index: number;
  t: (key: string) => string;
}> = ({ repo, index, t }) => (
  <m.article
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, delay: index * 0.06 }}
    className="rounded-xl border border-border bg-surface/70 p-4 hover:border-accent/30 transition-colors"
  >
    <div className="flex items-start justify-between gap-3">
      <div>
        <h4 className="text-sm font-semibold text-text-primary">{repo.name}</h4>
        <p className="mt-1 text-xs text-text-secondary leading-relaxed">
          {repo.description ?? t("github.no_description")}
        </p>
      </div>
      <span className="shrink-0 rounded-full border border-accent/25 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
        {repo.language ?? t("github.none")}
      </span>
    </div>

    <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-text-secondary">
      <span className="rounded-full border border-border bg-bg/60 px-2 py-1">
        {t("github.stats.stars")}: {repo.stargazers_count}
      </span>
      <span className="rounded-full border border-border bg-bg/60 px-2 py-1">
        {t("github.stats.forks")}: {repo.forks_count}
      </span>
      <span className="rounded-full border border-border bg-bg/60 px-2 py-1">
        {t("github.updated")}: {new Date(repo.pushed_at).toLocaleDateString()}
      </span>
    </div>

    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-flex items-center rounded-md border border-accent/35 bg-accent/10 px-2.5 py-1.5 text-xs font-medium text-accent hover:bg-accent/20 transition-colors"
    >
      {t("github.open_repo")}
    </a>
  </m.article>
);

const StatBadge: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="rounded-xl border border-border bg-bg/60 px-3 py-2">
    <p className="text-[10px] uppercase tracking-wider text-text-secondary">{label}</p>
    <p className="mt-1 text-lg font-semibold text-text-primary">{value}</p>
  </div>
);

export default GitHubSection;
