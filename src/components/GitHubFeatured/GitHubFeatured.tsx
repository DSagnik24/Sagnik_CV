import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ExternalLink, Github, Star, GitFork, Clock3 } from 'lucide-react';

const GITHUB_PROFILE_URL = 'https://github.com/DSagnik24';

export type GitHubPinnedRepo = {
  id: string;
  name: string;
  owner: string;
  description: string | null;
  url: string;
  homepage: string | null;
  primaryLanguage: string | null;
  stargazerCount: number;
  forkCount: number;
  updatedAt: string | null;
  topics: string[];
};

type RepoCardProps = {
  repo: GitHubPinnedRepo;
};

function formatUpdatedAt(value: string | null) {
  if (!value) return 'Updated recently';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Updated recently';

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function GitHubRepoSkeleton() {
  return (
    <div className="github-grid">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="github-card rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4 animate-pulse">
          <div className="h-4 w-2/5 rounded bg-slate-700/80" />
          <div className="mt-4 h-3 w-full rounded bg-slate-700/70" />
          <div className="mt-2 h-3 w-4/5 rounded bg-slate-700/60" />
          <div className="mt-5 flex gap-2">
            <div className="h-6 w-16 rounded-full bg-slate-700/70" />
            <div className="h-6 w-20 rounded-full bg-slate-700/70" />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="h-3 w-16 rounded bg-slate-700/70" />
            <div className="h-3 w-20 rounded bg-slate-700/70" />
          </div>
          <div className="mt-4 h-3 w-28 rounded bg-slate-700/60" />
        </div>
      ))}
    </div>
  );
}

function GitHubEmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 text-center">
      <p className="text-lg font-medium text-[var(--text-primary)]">No featured repositories yet.</p>
      <a href={GITHUB_PROFILE_URL} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
        View GitHub Profile <ArrowRight size={14} />
      </a>
    </div>
  );
}

function GitHubRepoCard({ repo }: RepoCardProps) {
  const description = repo.description?.trim() || 'Repository description unavailable.';

  return (
    <div className="github-card group flex min-w-0 flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-400/40 hover:shadow-[0_10px_30px_rgba(14,165,233,0.08)]">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="truncate text-base font-semibold text-[var(--text-primary)]">{repo.name}</div>
          <div className="mt-1 truncate text-xs uppercase tracking-[0.14em] text-[var(--text-subtle)]">{repo.owner}</div>
        </div>
        <div className="rounded-full border border-[var(--border-subtle)] bg-[var(--accent-soft)] p-2 text-[var(--accent)]">
          <Github size={15} />
        </div>
      </div>

      <p className="mt-3 min-h-[48px] text-sm leading-6 text-[var(--text-muted)]">{description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {repo.primaryLanguage ? (
          <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-medium text-[var(--text-primary)]">
            {repo.primaryLanguage}
          </span>
        ) : null}
        {repo.topics.slice(0, 2).map((topic) => (
          <span key={topic} className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface-strong)] px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-[var(--text-subtle)]">
            {topic}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
        <span className="inline-flex items-center gap-1.5"><Star size={12} /> {repo.stargazerCount}</span>
        <span className="inline-flex items-center gap-1.5"><GitFork size={12} /> {repo.forkCount}</span>
      </div>

      <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[var(--text-subtle)]">
        <Clock3 size={11} /> {formatUpdatedAt(repo.updatedAt)}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 pt-3">
        <a href={repo.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
          View Repository <ArrowRight size={14} />
        </a>
        {repo.homepage ? (
          <a href={repo.homepage} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            Demo <ExternalLink size={12} />
          </a>
        ) : null}
      </div>
    </div>
  );
}

function GitHubFeaturedError() {
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5 text-sm text-[var(--text-muted)]">
      <p className="text-base font-medium text-[var(--text-primary)]">GitHub repositories are temporarily unavailable.</p>
      <a href={GITHUB_PROFILE_URL} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-[var(--accent)]">
        View GitHub Profile <ArrowRight size={14} />
      </a>
    </div>
  );
}

export function GitHubFeatured() {
  const [repos, setRepos] = useState<GitHubPinnedRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPinnedRepos = async () => {
      try {
        const res = await fetch('/api/github-pinned', { signal: controller.signal });
        if (!res.ok) {
          throw new Error('Failed to fetch GitHub data.');
        }

        const data = (await res.json()) as GitHubPinnedRepo[];
        setRepos(data ?? []);
        setError(false);
      } catch {
        setRepos([]);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPinnedRepos();
    return () => controller.abort();
  }, []);

  const content = useMemo(() => {
    if (loading) return <GitHubRepoSkeleton />;
    if (error) return <GitHubFeaturedError />;
    if (!repos.length) return <GitHubEmptyState />;

    return (
      <div className="github-grid">
        {repos.map((repo) => (
          <GitHubRepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    );
  }, [error, loading, repos]);

  return <>{content}</>;
}
