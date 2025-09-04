import { RepoStats, Theme } from "./types";

const themes: Record<string, Theme> = {
  dark: {
    background: "#151515",
    text: "#FEFEFE",
    primary: "#79ff97",
    secondary: "#79ff97",
    accent: "#79ff97",
    border: "#E4E2E2",
    cardBg: "rgba(21, 21, 21, 0.8)",
  },
  light: {
    background: "#ffffff",
    text: "#24292f",
    primary: "#0969da",
    secondary: "#0969da",
    accent: "#0969da",
    border: "#d0d7de",
    cardBg: "rgba(255, 255, 255, 0.9)",
  },
  radical: {
    background: "#141321",
    text: "#a9fef7",
    primary: "#fe428e",
    secondary: "#f8d847",
    accent: "#00d4aa",
    border: "#1a1b26",
    cardBg: "rgba(26, 27, 38, 0.8)",
  },
  neon: {
    background: "#000000",
    text: "#00ff88",
    primary: "#00ffff",
    secondary: "#ff00ff",
    accent: "#ffff00",
    border: "#00ff88",
    cardBg: "rgba(0, 255, 136, 0.1)",
  },
  cyber: {
    background: "#0a0a0a",
    text: "#00ff41",
    primary: "#ff073a",
    secondary: "#00d4ff",
    accent: "#ff6b35",
    border: "#00ff41",
    cardBg: "rgba(0, 255, 65, 0.1)",
  },
  tanjiro: {
    background: "url(#tanjiroPattern)",
    text: "#ffffff",
    primary: "#ffffff",
    secondary: "#ffffff",
    accent: "#ffffff",
    border: "#ef4444",
    cardBg: "rgba(0, 0, 0, 0.3)",
  },
};

export function generateReposSVG(
  stats: RepoStats,
  theme: string = "dark",
  language: string = "pt",
  showBorder: boolean = true
): string {
  const currentTheme = themes[theme] || themes.dark;

  // Traduções
  const translations = {
    pt: {
      title: "Repositórios do GitHub",
      totalRepos: "Total de Repositórios:",
      totalStars: "Total de Estrelas:",
      totalForks: "Total de Forks:",
      totalWatchers: "Total de Observadores:",
      mostStarred: "Mais Estrelado:",
      recentlyUpdated: "Atualizado Recentemente:",
      languages: "Linguagens:",
      publicRepos: "Repositórios Públicos:",
      privateRepos: "Repositórios Privados:",
      originalRepos: "Repositórios Originais:",
      forkedRepos: "Repositórios Forkados:",
      reposWithIssues: "Com Issues:",
      reposWithWiki: "Com Wiki:",
      reposWithPages: "Com Páginas:",
      averageSize: "Tamanho Médio:",
      mostUsedLanguage: "Linguagem Principal:",
      accountAge: "Idade da Conta:",
      days: "dias",
    },
    en: {
      title: "GitHub Repositories",
      totalRepos: "Total Repositories:",
      totalStars: "Total Stars:",
      totalForks: "Total Forks:",
      totalWatchers: "Total Watchers:",
      mostStarred: "Most Starred:",
      recentlyUpdated: "Recently Updated:",
      languages: "Languages:",
      publicRepos: "Public Repos:",
      privateRepos: "Private Repos:",
      originalRepos: "Original Repos:",
      forkedRepos: "Forked Repos:",
      reposWithIssues: "With Issues:",
      reposWithWiki: "With Wiki:",
      reposWithPages: "With Pages:",
      averageSize: "Average Size:",
      mostUsedLanguage: "Main Language:",
      accountAge: "Account Age:",
      days: "days",
    },
  };

  const t =
    translations[language as keyof typeof translations] || translations.pt;

  const escapeXml = (text: string) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  const formatSize = (size: number) => {
    if (size >= 1024) {
      return (size / 1024).toFixed(1) + "MB";
    }
    return size + "KB";
  };

  return `
    <svg width="550" height="280" viewBox="0 0 550 280" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="descId">
      <title id="titleId">${escapeXml(stats.username)} - ${t.title}</title>
      <desc id="descId">${
        language === "pt"
          ? `Repositórios do GitHub para ${escapeXml(stats.username)}: ${
              stats.totalRepos
            } repositórios, ${formatNumber(
              stats.totalStars
            )} estrelas, ${formatNumber(stats.totalForks)} forks`
          : `GitHub repositories for ${escapeXml(stats.username)}: ${
              stats.totalRepos
            } repositories, ${formatNumber(
              stats.totalStars
            )} stars, ${formatNumber(stats.totalForks)} forks`
      }</desc>
      
      <defs>
        <clipPath id="avatar-clip">
          <circle cx="60" cy="25" r="20"/>
        </clipPath>
        
        <!-- Neon Glow Filter -->
        <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <style>
        .header {
          font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
          fill: ${currentTheme.text};
        }
        @supports(-moz-appearance: auto) {
          .header { font-size: 15.5px; }
        }
        
        .stat {
          font: 600 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; 
          fill: ${currentTheme.text};
          letter-spacing: 0.3px;
        }
        @supports(-moz-appearance: auto) {
          .stat { font-size: 12px; }
        }
        
        .stat-value {
          font: 700 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif;
          letter-spacing: 0.5px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
          filter: drop-shadow(0 0 3px rgba(0,0,0,0.1));
        }
        @supports(-moz-appearance: auto) {
          .stat-value { font-size: 12px; }
        }
        
        .stat-label {
          font: 600 13px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif;
          fill: ${currentTheme.text};
          letter-spacing: 0.2px;
        }
        @supports(-moz-appearance: auto) {
          .stat-label { font-size: 11px; }
        }
        
        .icon-container {
          transition: transform 0.2s ease;
        }
        
        .icon-container:hover {
          transform: scale(1.05);
        }
        
        .bold { font-weight: 700 }
        .icon { fill: ${currentTheme.primary}; }
      </style>
      
      ${
        showBorder
          ? `
        <!-- Theme-specific LED Border Segments -->
        <!-- Top segments -->
        <line x1="25" y1="10" x2="75" y2="10" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="75" y1="10" x2="125" y2="10" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="125" y1="10" x2="175" y2="10" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="175" y1="10" x2="225" y2="10" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="225" y1="10" x2="275" y2="10" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="275" y1="10" x2="325" y2="10" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="325" y1="10" x2="375" y2="10" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="375" y1="10" x2="425" y2="10" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="425" y1="10" x2="475" y2="10" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="475" y1="10" x2="525" y2="10" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        
        <!-- Right segments -->
        <line x1="525" y1="10" x2="525" y2="60" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="525" y1="60" x2="525" y2="110" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="525" y1="110" x2="525" y2="160" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="525" y1="160" x2="525" y2="210" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="525" y1="210" x2="525" y2="260" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        
        <!-- Bottom segments -->
        <line x1="525" y1="260" x2="475" y2="260" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="475" y1="260" x2="425" y2="260" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="425" y1="260" x2="375" y2="260" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="375" y1="260" x2="325" y2="260" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="325" y1="260" x2="275" y2="260" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="275" y1="260" x2="225" y2="260" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="225" y1="260" x2="175" y2="260" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="175" y1="260" x2="125" y2="260" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="125" y1="260" x2="75" y2="260" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="75" y1="260" x2="25" y2="260" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        
        <!-- Left segments -->
        <line x1="25" y1="260" x2="25" y2="210" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="25" y1="210" x2="25" y2="160" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="25" y1="160" x2="25" y2="110" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="25" y1="110" x2="25" y2="60" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="25" y1="60" x2="25" y2="10" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
      `
          : ""
      }
      
      <!-- Background -->
      <rect
        data-testid="card-bg"
        x="25.5"
        y="10.5"
        rx="4.5"
        height="249"
        stroke="${currentTheme.border}"
        width="499"
        fill="${currentTheme.background}"
        stroke-opacity="1"
      />
      
      <!-- Header -->
      <g data-testid="card-title" transform="translate(50, 35)">
        <g transform="translate(0, 0)">
          <text x="0" y="0" class="header" data-testid="header">
            ${escapeXml(stats.username)}'s ${t.title}
          </text>
        </g>
      </g>
      
      <!-- Main Stats -->
      <g data-testid="main-card-body" transform="translate(0, 70)">
        <svg data-testid="lang-items" x="50">
          <!-- Total Repositories -->
          <g transform="translate(0, 0)">
            <g class="icon-container" transform="translate(0, -1)">
              <circle cx="8" cy="8" r="9" fill="${
                currentTheme.primary
              }" opacity="0.12"/>
              <circle cx="8" cy="8" r="7" fill="${
                currentTheme.primary
              }" opacity="0.05"/>
              <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" filter="url(#neonGlow)">
                <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
              </svg>
            </g>
            <text class="stat-label" x="25" y="12.5">${t.totalRepos}</text>
            <text class="stat-value" x="219.01" y="12.5" data-testid="totalRepos" fill="${
              currentTheme.primary
            }">${stats.totalRepos}</text>
            <line x1="25" y1="20" x2="215" y2="20" stroke="${
              currentTheme.primary
            }" stroke-width="0.5" opacity="0.1"/>
          </g>
          
          <!-- Total Stars -->
          <g transform="translate(0, 25)">
            <g class="icon-container" transform="translate(0, -1)">
              <circle cx="8" cy="8" r="9" fill="${
                currentTheme.secondary
              }" opacity="0.12"/>
              <circle cx="8" cy="8" r="7" fill="${
                currentTheme.secondary
              }" opacity="0.05"/>
              <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" filter="url(#neonGlow)">
                <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"/>
              </svg>
            </g>
            <text class="stat-label" x="25" y="12.5">${t.totalStars}</text>
            <text class="stat-value" x="219.01" y="12.5" data-testid="totalStars" fill="${
              currentTheme.secondary
            }">${formatNumber(stats.totalStars)}</text>
            <line x1="25" y1="20" x2="215" y2="20" stroke="${
              currentTheme.secondary
            }" stroke-width="0.5" opacity="0.1"/>
          </g>
        
          <!-- Total Forks -->
          <g transform="translate(0, 50)">
            <g class="icon-container" transform="translate(0, -1)">
              <circle cx="8" cy="8" r="9" fill="${
                currentTheme.accent
              }" opacity="0.12"/>
              <circle cx="8" cy="8" r="7" fill="${
                currentTheme.accent
              }" opacity="0.05"/>
              <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" filter="url(#neonGlow)">
                <path fill-rule="evenodd" d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"/>
              </svg>
            </g>
            <text class="stat-label" x="25" y="12.5">${t.totalForks}</text>
            <text class="stat-value" x="219.01" y="12.5" data-testid="totalForks" fill="${
              currentTheme.accent
            }">${formatNumber(stats.totalForks)}</text>
            <line x1="25" y1="20" x2="215" y2="20" stroke="${
              currentTheme.accent
            }" stroke-width="0.5" opacity="0.1"/>
          </g>
          
          <!-- Public vs Private Repos -->
          <g transform="translate(0, 75)">
            <g class="icon-container" transform="translate(0, -1)">
              <circle cx="8" cy="8" r="9" fill="${
                currentTheme.primary
              }" opacity="0.12"/>
              <circle cx="8" cy="8" r="7" fill="${
                currentTheme.primary
              }" opacity="0.05"/>
              <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" filter="url(#neonGlow)">
                <path fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"/>
              </svg>
            </g>
            <text class="stat-label" x="25" y="12.5">${t.publicRepos}</text>
            <text class="stat-value" x="219.01" y="12.5" data-testid="publicRepos" fill="${
              currentTheme.primary
            }">${stats.publicRepos}</text>
            <line x1="25" y1="20" x2="215" y2="20" stroke="${
              currentTheme.primary
            }" stroke-width="0.5" opacity="0.1"/>
          </g>
        
          <!-- Most Used Language -->
          <g transform="translate(0, 100)">
            <g class="icon-container" transform="translate(0, -1)">
              <circle cx="8" cy="8" r="9" fill="${
                currentTheme.secondary
              }" opacity="0.12"/>
              <circle cx="8" cy="8" r="7" fill="${
                currentTheme.secondary
              }" opacity="0.05"/>
              <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" filter="url(#neonGlow)">
                <path fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"/>
              </svg>
            </g>
            <text class="stat-label" x="25" y="12.5">${
              t.mostUsedLanguage
            }</text>
            <text class="stat-value" x="219.01" y="12.5" data-testid="mostUsedLanguage" fill="${
              currentTheme.secondary
            }">
              ${stats.mostUsedLanguage || "N/A"}
            </text>
            <line x1="25" y1="20" x2="215" y2="20" stroke="${
              currentTheme.secondary
            }" stroke-width="0.5" opacity="0.1"/>
          </g>
          
          <!-- Account Age -->
          <g transform="translate(0, 125)">
            <g class="icon-container" transform="translate(0, -1)">
              <circle cx="8" cy="8" r="9" fill="${
                currentTheme.accent
              }" opacity="0.12"/>
              <circle cx="8" cy="8" r="7" fill="${
                currentTheme.accent
              }" opacity="0.05"/>
              <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" filter="url(#neonGlow)">
                <path fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"/>
              </svg>
            </g>
            <text class="stat-label" x="25" y="12.5">${t.accountAge}</text>
            <text class="stat-value" x="219.01" y="12.5" data-testid="accountAge" fill="${
              currentTheme.accent
            }">
              ${stats.accountAge} ${t.days}
            </text>
            <line x1="25" y1="20" x2="215" y2="20" stroke="${
              currentTheme.accent
            }" stroke-width="0.5" opacity="0.1"/>
          </g>
        </svg>
      </g>
    </svg>
  `;
}
