import { NextRequest } from "next/server";
import {
  fetchGitHubUser,
  fetchGitHubRepos,
} from "@/cards/github-stats/github-api";
import { generateStatsSVG } from "@/cards/github-stats/svg-generator";
import {
  fetchGitHubRepos as fetchRepos,
  processRepoStats,
} from "@/cards/github-repos/github-api";
import { generateReposListSVG } from "@/cards/github-repos/svg-generator-list";
import { generateTopReposSVG } from "@/cards/github-repos/svg-generator-top-repos";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "MatheusRenzo";
  const theme = searchParams.get("theme") || "dark";
  const showBorder = searchParams.get("showBorder") !== "false";
  const language = searchParams.get("language") || "pt";
  const cardType = searchParams.get("type") || "stats"; // "stats", "repos-list" ou "top-repos"
  const maxRepos = parseInt(searchParams.get("maxRepos") || "5"); // 3, 5 ou 10
  const borderType = (searchParams.get("borderType") as "fire" | "water") || "fire"; // "fire" ou "water" para tema Tanjiro

  try {
    if (cardType === "repos-list") {
      // Card de lista de repositórios
      const [user, repos] = await Promise.all([
        fetchGitHubUser(username),
        fetchRepos(username),
      ]);
      const repoStats = processRepoStats(repos, username, user.public_repos);
      const svg = generateReposListSVG(
        repoStats,
        repos,
        theme,
        language as "pt" | "en",
        showBorder,
        maxRepos,
        borderType
      );

      return new Response(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      });
    } else if (cardType === "top-repos") {
      // Card dos 3 repositórios mais estrelados
      const [user, repos] = await Promise.all([
        fetchGitHubUser(username),
        fetchRepos(username),
      ]);
      const repoStats = processRepoStats(repos, username, user.public_repos);
      const svg = generateTopReposSVG(
        repoStats,
        repos,
        theme,
        language as "pt" | "en",
        showBorder,
        borderType
      );

      return new Response(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      });
    } else {
      // Card de estatísticas (padrão)
      const [user, repos] = await Promise.all([
        fetchGitHubUser(username),
        fetchGitHubRepos(username),
      ]);

      // Calcular estatísticas básicas
      const totalStars = repos.reduce(
        (acc, repo) => acc + repo.stargazers_count,
        0
      );
      const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);

      // Top 3 linguagens
      const languageCounts: Record<string, number> = {};
      repos.forEach((repo) => {
        if (repo.language) {
          languageCounts[repo.language] =
            (languageCounts[repo.language] || 0) + 1;
        }
      });

      const topLanguages = Object.entries(languageCounts)
        .sort(([, a], [, b]) => (b as number) - (a as number))
        .slice(0, 3)
        .map(([name, count]) => ({ name, count: count as number }));

      const stats = {
        username: user.login,
        name: user.name || user.login,
        avatar: user.avatar_url,
        repos: user.public_repos,
        stars: totalStars,
        forks: totalForks,
        followers: user.followers,
        following: user.following,
        languages: topLanguages,
        accountAge: Math.floor(
          (new Date().getTime() - new Date(user.created_at).getTime()) /
            (1000 * 60 * 60 * 24)
        ),
      };

      const svg = generateStatsSVG(stats, theme, language, showBorder, borderType);

      return new Response(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      });
    }
  } catch (error) {
    console.error("Error generating stats:", error);

    if (cardType === "repos-list" || cardType === "top-repos") {
      // Erro para card de lista de repositórios ou top repos
      const errorRepoStats = {
        username: username,
        totalRepos: 0,
        totalStars: 0,
        totalForks: 0,
        totalWatchers: 0,
        totalSize: 0,
        languages: [],
        mostStarred: null,
        recentlyUpdated: null,
        oldestRepo: null,
        newestRepo: null,
        reposWithIssues: 0,
        reposWithWiki: 0,
        reposWithPages: 0,
        publicRepos: 0,
        privateRepos: 0,
        forkedRepos: 0,
        originalRepos: 0,
        averageRepoSize: 0,
        mostUsedLanguage: null,
        accountAge: 0,
      };

      const errorSVG =
        cardType === "top-repos"
          ? generateTopReposSVG(
              errorRepoStats,
              [],
              theme,
              language as "pt" | "en",
              showBorder,
              borderType
            )
          : generateReposListSVG(
              errorRepoStats,
              [],
              theme,
              language as "pt" | "en",
              showBorder,
              maxRepos,
              borderType
            );

      return new Response(errorSVG, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });
    } else {
      // Erro para card de estatísticas
      const errorStats = {
        username: username,
        name: username,
        avatar: "",
        repos: 0,
        stars: 0,
        forks: 0,
        followers: 0,
        following: 0,
        languages: [],
        accountAge: 0,
      };

      const errorSVG = generateStatsSVG(
        errorStats,
        theme,
        language,
        showBorder,
        borderType
      );

      return new Response(errorSVG, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });
    }
  }
}
