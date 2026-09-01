import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
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
                res.end(JSON.stringify({ error: 'GitHub data unavailable' }));
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
                if (!response.ok) {
                    res.statusCode = 502;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'GitHub repositories are temporarily unavailable.' }));
                    return;
                }
                const data = (await response.json());
                const repos = (data?.data?.user?.pinnedItems?.nodes ?? []).map((repo) => ({
                    id: repo.id,
                    name: repo.name,
                    owner: repo.owner.login,
                    description: repo.description,
                    url: repo.url,
                    homepage: repo.homepageUrl,
                    primaryLanguage: repo.primaryLanguage?.name ?? null,
                    stargazerCount: repo.stargazerCount ?? 0,
                    forkCount: repo.forkCount ?? 0,
                    updatedAt: repo.updatedAt ?? null,
                    topics: (repo.repositoryTopics?.nodes ?? []).map((topicItem) => topicItem.topic?.name).filter(Boolean),
                }));
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
                res.end(JSON.stringify(repos));
            }
            catch {
                res.statusCode = 502;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'GitHub repositories are temporarily unavailable.' }));
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
