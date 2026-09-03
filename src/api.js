const API_BASE = 'https://api.github.com';

async function request(path) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: 'application/vnd.github+json' },
  });

  if (response.status === 404) {
    throw new Error('No GitHub user with that username.');
  }
  if (response.status === 403) {
    throw new Error('GitHub API rate limit reached — try again in a bit.');
  }
  if (!response.ok) {
    throw new Error(`GitHub API request failed (${response.status}).`);
  }
  return response.json();
}

export function getUser(username) {
  return request(`/users/${encodeURIComponent(username)}`);
}

export async function getUserRepos(username) {
  // GitHub's API can only sort by created/updated/pushed/full_name, not stars,
  // so fetch and sort client-side to get "most-starred first".
  const repos = await request(`/users/${encodeURIComponent(username)}/repos?per_page=100`);
  return repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
}
