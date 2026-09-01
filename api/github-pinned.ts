import type { VercelRequest, VercelResponse } from '@vercel/node';

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!GITHUB_USERNAME || !GITHUB_TOKEN) {
    return res.status(503).json({ error: 'GitHub data unavailable' });
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
                  topic {
                    name
                  }
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
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'User-Agent': 'Sagnik-Portfolio-App',
      },
      body: JSON.stringify({ query, variables: { login: GITHUB_USERNAME } }),
    });

    if (!response.ok) {
      return res.status(502).json({ error: 'GitHub repositories are temporarily unavailable.' });
    }

    const data = (await response.json()) as {
      data?: {
        user?: {
          pinnedItems?: {
            nodes?: Array<{
              id: string;
              name: string;
              owner: { login: string };
              description: string | null;
              url: string;
              homepageUrl: string | null;
              primaryLanguage: { name: string } | null;
              stargazerCount: number;
              forkCount: number;
              updatedAt: string | null;
              repositoryTopics?: { nodes?: Array<{ topic?: { name?: string } }> };
            }>;
          };
        };
      };
    };

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
      topics: (repo.repositoryTopics?.nodes ?? [])
        .map((node) => node.topic?.name)
        .filter((name): name is string => Boolean(name)),
    }));

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
    return res.status(200).json(repos);
  } catch {
    return res.status(502).json({ error: 'GitHub repositories are temporarily unavailable.' });
  }
}
