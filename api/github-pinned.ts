import type { VercelRequest, VercelResponse } from '@vercel/node';

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const isLocalDevelopment = process.env.NODE_ENV !== 'production' && !process.env.VERCEL_ENV;

function buildMissingEnvResponse(res: VercelResponse) {
  const payload = {
    error: 'GitHub environment variables missing',
    env: {
      GITHUB_USERNAME: Boolean(GITHUB_USERNAME),
      GITHUB_TOKEN: Boolean(GITHUB_TOKEN),
    },
    ...(isLocalDevelopment
      ? {
          details:
            'Set GITHUB_USERNAME and GITHUB_TOKEN as server-side environment variables before calling /api/github-pinned.',
        }
      : {}),
  };

  return res.status(503).json(payload);
}

function buildGitHubFailureResponse(res: VercelResponse, status: number, details: string) {
  const safeDetails = details?.trim() || `GitHub responded with status ${status}.`;

  if (isLocalDevelopment) {
    return res.status(status).json({
      error: 'GitHub GraphQL request failed',
      status,
      details: safeDetails,
    });
  }

  return res.status(502).json({ error: 'GitHub repositories are temporarily unavailable.' });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!GITHUB_USERNAME || !GITHUB_TOKEN) {
    return buildMissingEnvResponse(res);
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

    const rawText = await response.text();
    let payload: any = {};

    try {
      payload = rawText ? JSON.parse(rawText) : {};
    } catch {
      payload = { message: rawText || `GitHub returned status ${response.status}.` };
    }

    if (!response.ok) {
      const githubMessage = payload?.message || payload?.errors?.[0]?.message || `GitHub responded with status ${response.status}.`;
      return buildGitHubFailureResponse(res, response.status, githubMessage);
    }

    const user = payload?.data?.user;
    const pinnedItems = user?.pinnedItems;
    const nodes = pinnedItems?.nodes;

    if (!user || !pinnedItems || !Array.isArray(nodes)) {
      const details = payload?.errors?.[0]?.message || 'GitHub did not return a valid user or pinnedItems payload.';
      return buildGitHubFailureResponse(res, 200, details);
    }

    const repositories = nodes.map((repo: any) => ({
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
        .map((topicNode: any) => topicNode.topic?.name)
        .filter((topic: string | undefined): topic is string => Boolean(topic)),
    }));

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
    return res.status(200).json({ repositories });
  } catch (error: any) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return buildGitHubFailureResponse(res, 502, message);
  }
}
