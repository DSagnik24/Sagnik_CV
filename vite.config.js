import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const isLocalDevelopment = process.env.NODE_ENV !== 'production' && !process.env.VERCEL_ENV;
const githubPinnedMiddleware = () => ({
    name: 'github-pinned-middleware',
    configureServer(server) {
        server.middlewares.use('/api/github-pinned', async (req, res, next) => {
            if (req.method !== 'GET') {
                res.statusCode = 405;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Method not allowed' }));
                return;
            }
            const username = process.env.GITHUB_USERNAME;
            const token = process.env.GITHUB_TOKEN;
            if (!username || !token) {
                res.statusCode = 503;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                    error: 'GitHub environment variables missing',
                    env: {
                        GITHUB_USERNAME: Boolean(username),
                        GITHUB_TOKEN: Boolean(token),
                    },
                    ...(isLocalDevelopment
                        ? {
                            details: 'Set GITHUB_USERNAME and GITHUB_TOKEN as server-side environment variables before calling /api/github-pinned.',
                        }
                        : {}),
                }));
                return;
            }
            const query = `
        query($login: String!) {
          user(login: $login) {
            pinnedItems(first: 6, types: [REPOSITORY]) {
              nodes {
                ... on Repository {
                  id
                  name
                  owner { login }
                  description
                  url
                  homepageUrl
                  primaryLanguage { name }
                  stargazerCount
                  forkCount
                  updatedAt
                  repositoryTopics(first: 10) {
                    nodes {
                      topic { name }
                    }
                  }
                }
              }
            }
          }
        }
      `;
            try {
                const response = await fetch('https://api.github.com/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        'User-Agent': 'Sagnik-Portfolio-App',
                    },
                    body: JSON.stringify({ query, variables: { login: username } }),
                });
                const rawText = await response.text();
                let payload = {};
                try {
                    payload = rawText ? JSON.parse(rawText) : {};
                }
                catch {
                    payload = { message: rawText || `GitHub returned status ${response.status}.` };
                }
                if (!response.ok) {
                    const githubMessage = payload?.message || payload?.errors?.[0]?.message || `GitHub responded with status ${response.status}.`;
                    const localError = {
                        error: 'GitHub GraphQL request failed',
                        status: response.status,
                        details: githubMessage,
                    };
                    res.statusCode = response.status;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(isLocalDevelopment ? localError : { error: 'GitHub repositories are temporarily unavailable.' }));
                    return;
                }
                const user = payload?.data?.user;
                const nodes = user?.pinnedItems?.nodes;
                if (!user || !user.pinnedItems || !Array.isArray(nodes)) {
                    const details = payload?.errors?.[0]?.message || 'GitHub did not return a valid user or pinnedItems payload.';
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(isLocalDevelopment ? { error: 'GitHub GraphQL response missing pinned repositories', status: 200, details } : { error: 'GitHub repositories are temporarily unavailable.' }));
                    return;
                }
                const repos = nodes.map((repo) => ({
                    id: repo.id,
                    name: repo.name,
                    owner: repo.owner?.login ?? null,
                    description: repo.description,
                    url: repo.url,
                    homepage: repo.homepageUrl ?? null,
                    primaryLanguage: repo.primaryLanguage?.name ?? null,
                    stargazerCount: repo.stargazerCount ?? 0,
                    forkCount: repo.forkCount ?? 0,
                    updatedAt: repo.updatedAt ?? null,
                    topics: (repo.repositoryTopics?.nodes ?? [])
                        .map((topicItem) => topicItem.topic?.name)
                        .filter((topic) => Boolean(topic)),
                }));
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
                res.end(JSON.stringify({ repositories: repos }));
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Unknown error';
                res.statusCode = 502;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(isLocalDevelopment ? { error: 'GitHub GraphQL request failed', status: 502, details: message } : { error: 'GitHub repositories are temporarily unavailable.' }));
            }
        });
    },
});
export default defineConfig({
    plugins: [react(), githubPinnedMiddleware()],
    server: {
        host: '0.0.0.0',
        port: 5173,
    },
    preview: {
        host: '0.0.0.0',
        port: 4173,
    },
});
