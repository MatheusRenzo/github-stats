import { GitHubUser, GitHubRepo } from "@/cards/github-stats/types";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) throw new Error("GitHub user not found");
  return response.json();
}

export async function fetchGitHubRepos(
  username: string
): Promise<GitHubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!response.ok) throw new Error("Failed to fetch repos");
  return response.json();
}
