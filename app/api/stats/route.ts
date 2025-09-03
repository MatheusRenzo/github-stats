import { NextRequest } from "next/server";
import {
  fetchGitHubUser,
  fetchGitHubRepos,
} from "@/cards/github-stats/github-api";
import { generateStatsSVG } from "@/cards/github-stats/svg-generator";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "MatheusRenzo";
  const theme = searchParams.get("theme") || "dark";
  const showBorder = searchParams.get("showBorder") !== "false";
  const language = searchParams.get("language") || "pt";

  try {
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

    const svg = generateStatsSVG(stats, theme, language, showBorder);

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error generating stats:", error);

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

    const errorSVG = generateStatsSVG(errorStats, theme, language, showBorder);

    return new Response(errorSVG, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  }
}
