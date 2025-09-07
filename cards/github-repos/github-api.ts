import { GitHubRepo, RepoStats } from "./types";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function fetchGitHubRepos(
  username: string,
  sortBy: string = "updated",
  perPage: number = 100
): Promise<GitHubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=${perPage}&sort=${sortBy}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch repos: ${response.status}`);
  }

  return response.json();
}

export async function fetchGitHubUser(username: string) {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`);
  }

  return response.json();
}

export function processRepoStats(
  repos: GitHubRepo[],
  username: string,
  totalPublicRepos?: number
): RepoStats {
  // Filtrar repositórios (remover forks se necessário)
  const filteredRepos = repos.filter((repo) => !repo.fork);

  // Calcular estatísticas básicas
  // Usar o total real de repositórios públicos se disponível, senão usar o número de repositórios filtrados
  const totalRepos = totalPublicRepos !== undefined ? totalPublicRepos : filteredRepos.length;
  const totalStars = filteredRepos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );
  const totalForks = filteredRepos.reduce(
    (sum, repo) => sum + repo.forks_count,
    0
  );
  const totalWatchers = filteredRepos.reduce(
    (sum, repo) => sum + repo.watchers_count,
    0
  );
  const totalSize = filteredRepos.reduce((sum, repo) => sum + repo.size, 0);

  // Calcular estatísticas de tipos de repositórios
  const publicRepos = filteredRepos.filter((repo) => !repo.private).length;
  const privateRepos = filteredRepos.filter((repo) => repo.private).length;
  const forkedRepos = repos.filter((repo) => repo.fork).length;
  const originalRepos = filteredRepos.length;
  const reposWithIssues = filteredRepos.filter(
    (repo) => repo.has_issues
  ).length;
  const reposWithWiki = filteredRepos.filter((repo) => repo.has_wiki).length;
  const reposWithPages = filteredRepos.filter((repo) => repo.has_pages).length;

  // Calcular linguagens
  const languageCount: Record<string, number> = {};
  filteredRepos.forEach((repo) => {
    if (repo.language) {
      languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
    }
  });

  const languages = Object.entries(languageCount)
    .map(([name, count]) => ({
      name,
      count,
      percentage: (count / totalRepos) * 100,
    }))
    .sort((a, b) => b.count - a.count);

  // Encontrar repositórios especiais
  const mostStarred = filteredRepos.reduce(
    (max, repo) => (repo.stargazers_count > max.stargazers_count ? repo : max),
    filteredRepos[0] || null
  );

  const recentlyUpdated = filteredRepos.reduce(
    (latest, repo) =>
      new Date(repo.updated_at) > new Date(latest.updated_at) ? repo : latest,
    filteredRepos[0] || null
  );

  const oldestRepo = filteredRepos.reduce(
    (oldest, repo) =>
      new Date(repo.created_at) < new Date(oldest.created_at) ? repo : oldest,
    filteredRepos[0] || null
  );

  const newestRepo = filteredRepos.reduce(
    (newest, repo) =>
      new Date(repo.created_at) > new Date(newest.created_at) ? repo : newest,
    filteredRepos[0] || null
  );

  // Calcular idade da conta (baseado no repositório mais antigo)
  const accountAge = oldestRepo
    ? Math.floor(
        (Date.now() - new Date(oldestRepo.created_at).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  return {
    username,
    totalRepos,
    totalStars,
    totalForks,
    totalWatchers,
    totalSize,
    languages,
    mostStarred,
    recentlyUpdated,
    oldestRepo,
    newestRepo,
    reposWithIssues,
    reposWithWiki,
    reposWithPages,
    publicRepos,
    privateRepos,
    forkedRepos,
    originalRepos,
    averageRepoSize: totalRepos > 0 ? Math.round(totalSize / totalRepos) : 0,
    mostUsedLanguage: languages[0]?.name || null,
    accountAge,
  };
}
