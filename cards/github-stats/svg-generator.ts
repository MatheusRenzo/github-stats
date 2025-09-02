import { SimpleStats, Theme } from "./types";

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
};

export function generateStatsSVG(
  stats: SimpleStats,
  theme: string = "dark",
  language: string = "pt",
  showAvatar: boolean = true,
  showBorder: boolean = true
): string {
  const currentTheme = themes[theme] || themes.dark;

  // Traduções
  const translations = {
    pt: {
      title: "Estatísticas do GitHub",
      totalStars: "Total de Estrelas:",
      totalRepos: "Total de Repositórios:",
      totalForks: "Total de Forks:",
      gettingStarted: "Code Explorer",
      active: "Bug Hunter",
      veryActive: "Code Wizard",
      level: "Nível",
      joined: "Entrou em",
      stats: "Estatísticas do GitHub"
    },
    en: {
      title: "GitHub Stats",
      totalStars: "Total Stars Earned:",
      totalRepos: "Total Repositories:",
      totalForks: "Total Forks:",
      gettingStarted: "Code Explorer",
      active: "Bug Hunter",
      veryActive: "Code Wizard",
      level: "Level",
      joined: "Joined",
      stats: "GitHub Stats"
    }
  };

  const t = translations[language] || translations.pt;

  // Bordas fixas para cada tema
  const getThemeBorder = () => {
    if (!showBorder) return '';
    
    const borderStyles = {
      dark: `
        .led-segment {
          animation: rgbCycle 3s ease-in-out infinite;
          stroke-linecap: round;
        }
      `,
      light: `
        .led-segment {
          animation: rgbCycle 3s ease-in-out infinite;
          stroke-linecap: round;
        }
      `,
      radical: `
        .led-segment {
          animation: radicalCycle 3s ease-in-out infinite;
          stroke-linecap: round;
        }
      `,
      neon: `
        .led-segment {
          animation: neonCycle 3s ease-in-out infinite;
          stroke-linecap: round;
        }
      `,
      cyber: `
        .led-segment {
          animation: cyberCycle 3s ease-in-out infinite;
          stroke-linecap: round;
        }
      `
    };
    
    return borderStyles[theme] || borderStyles.dark;
  };

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

  return `
    <svg width="550" height="220" viewBox="0 0 550 220" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="descId">
      <!-- Background expandido para a borda neon -->
      <rect width="550" height="220" fill="#0a0a0a" opacity="0.1" rx="20"/>
      <title id="titleId">${escapeXml(stats.username)} - ${t.title}</title>
      <desc id="descId">${language === 'pt' ? `${t.stats} para ${escapeXml(stats.username)}: ${stats.repos} repositórios, ${formatNumber(stats.stars)} estrelas, ${formatNumber(stats.forks)} forks, ${formatNumber(stats.followers)} seguidores` : `GitHub statistics for ${escapeXml(stats.username)}: ${stats.repos} repositories, ${formatNumber(stats.stars)} stars, ${formatNumber(stats.forks)} forks, ${formatNumber(stats.followers)} followers`}</desc>
      
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
        
        <!-- RGB Gradient -->
        <linearGradient id="rgbGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#ff0000;stop-opacity:1" />
          <stop offset="33%" style="stop-color:#00ff00;stop-opacity:1" />
          <stop offset="66%" style="stop-color:#0000ff;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#ff0000;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <style>
        .header {
          font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
          fill: ${currentTheme.text};
          animation: fadeInAnimation 0.8s ease-in-out forwards;
        }
        @supports(-moz-appearance: auto) {
          .header { font-size: 15.5px; }
        }
        
        .stat {
          font: 600 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; 
          fill: #9f9f9f;
        }
        @supports(-moz-appearance: auto) {
          .stat { font-size: 12px; }
        }
        
        .bold { font-weight: 700 }
        .icon { fill: ${currentTheme.primary}; }
        .stagger {
          opacity: 0;
          animation: fadeInAnimation 0.3s ease-in-out forwards;
        }
        
        @keyframes fadeInAnimation {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .blink {
          animation: blink 2s ease-in-out infinite;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
        }
        
        ${getThemeBorder()}
        
        @keyframes rgbCycle {
          0% { 
            stroke: #ff0000;
            filter: drop-shadow(0 0 5px #ff0000) drop-shadow(0 0 10px #ff0000);
          }
          12.5% { 
            stroke: #ff8000;
            filter: drop-shadow(0 0 5px #ff8000) drop-shadow(0 0 10px #ff8000);
          }
          25% { 
            stroke: #ffff00;
            filter: drop-shadow(0 0 5px #ffff00) drop-shadow(0 0 10px #ffff00);
          }
          37.5% { 
            stroke: #80ff00;
            filter: drop-shadow(0 0 5px #80ff00) drop-shadow(0 0 10px #80ff00);
          }
          50% { 
            stroke: #00ff00;
            filter: drop-shadow(0 0 5px #00ff00) drop-shadow(0 0 10px #00ff00);
          }
          62.5% { 
            stroke: #00ff80;
            filter: drop-shadow(0 0 5px #00ff80) drop-shadow(0 0 10px #00ff80);
          }
          75% { 
            stroke: #00ffff;
            filter: drop-shadow(0 0 5px #00ffff) drop-shadow(0 0 10px #00ffff);
          }
          87.5% { 
            stroke: #0080ff;
            filter: drop-shadow(0 0 5px #0080ff) drop-shadow(0 0 10px #0080ff);
          }
          100% { 
            stroke: #ff0000;
            filter: drop-shadow(0 0 5px #ff0000) drop-shadow(0 0 10px #ff0000);
          }
        }
        
        @keyframes radicalCycle {
          0%, 45% { 
            stroke: #a9fef7;
            filter: drop-shadow(0 0 5px #a9fef7) drop-shadow(0 0 10px #a9fef7);
          }
          50%, 95% { 
            stroke: #fe428e;
            filter: drop-shadow(0 0 5px #fe428e) drop-shadow(0 0 10px #fe428e);
          }
          100% { 
            stroke: #a9fef7;
            filter: drop-shadow(0 0 5px #a9fef7) drop-shadow(0 0 10px #a9fef7);
          }
        }
        
        @keyframes neonCycle {
          0%, 45% { 
            stroke: #00ff88;
            filter: drop-shadow(0 0 5px #00ff88) drop-shadow(0 0 10px #00ff88);
          }
          50%, 95% { 
            stroke: #00ffff;
            filter: drop-shadow(0 0 5px #00ffff) drop-shadow(0 0 10px #00ffff);
          }
          100% { 
            stroke: #00ff88;
            filter: drop-shadow(0 0 5px #00ff88) drop-shadow(0 0 10px #00ff88);
          }
        }
        
        @keyframes cyberCycle {
          0%, 45% { 
            stroke: #00ff41;
            filter: drop-shadow(0 0 5px #00ff41) drop-shadow(0 0 10px #00ff41);
          }
          50%, 95% { 
            stroke: #ff073a;
            filter: drop-shadow(0 0 5px #ff073a) drop-shadow(0 0 10px #ff073a);
          }
          100% { 
            stroke: #00ff41;
            filter: drop-shadow(0 0 5px #00ff41) drop-shadow(0 0 10px #00ff41);
          }
        }
      </style>
      
      ${showBorder ? `
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
        
        <!-- Bottom segments -->
        <line x1="525" y1="210" x2="475" y2="210" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="475" y1="210" x2="425" y2="210" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="425" y1="210" x2="375" y2="210" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="375" y1="210" x2="325" y2="210" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="325" y1="210" x2="275" y2="210" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="275" y1="210" x2="225" y2="210" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="225" y1="210" x2="175" y2="210" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="175" y1="210" x2="125" y2="210" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="125" y1="210" x2="75" y2="210" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="75" y1="210" x2="25" y2="210" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        
        <!-- Left segments -->
        <line x1="25" y1="210" x2="25" y2="160" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="25" y1="160" x2="25" y2="110" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="25" y1="110" x2="25" y2="60" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
        <line x1="25" y1="60" x2="25" y2="10" stroke-width="8" class="led-segment" filter="url(#neonGlow)"/>
      ` : ''}
      
      <!-- Background -->
      <rect
        data-testid="card-bg"
        x="25.5"
        y="10.5"
        rx="4.5"
        height="199"
        stroke="${currentTheme.border}"
        width="499"
        fill="${currentTheme.background}"
        stroke-opacity="1"
      />
      
      <!-- Header -->
      <g data-testid="card-title" transform="translate(50, 35)">
        <g transform="translate(0, 0)">
          <text x="0" y="0" class="header" data-testid="header">
            ${escapeXml(stats.username)}'s GitHub Stats
          </text>
        </g>
      </g>
      
      <!-- Right side info panel -->
      <g transform="translate(375, 20)">
        <!-- Avatar circle with real image -->
        <circle cx="60" cy="25" r="20" fill="${currentTheme.primary}" opacity="0.1" stroke="${currentTheme.primary}" stroke-width="2"/>
        ${stats.avatar && showAvatar ? `
          <defs>
            <pattern id="avatarPattern" patternUnits="userSpaceOnUse" width="40" height="40">
              <image href="${stats.avatar}" x="0" y="0" width="40" height="40" preserveAspectRatio="xMidYMid slice"/>
            </pattern>
          </defs>
          <circle cx="60" cy="25" r="20" fill="url(#avatarPattern)" clip-path="url(#avatar-clip)"/>
          <circle cx="60" cy="25" r="20" fill="none" stroke="${currentTheme.primary}" stroke-width="2" opacity="0.3"/>
        ` : `
          <text x="60" y="30" fill="${currentTheme.primary}" font-family="Segoe UI, system-ui, sans-serif" font-size="16" font-weight="700" text-anchor="middle">👤</text>
        `}
        
                <!-- Activity indicator -->
        <g transform="translate(0, 60)">
          <rect x="0" y="0" width="120" height="25" fill="${currentTheme.cardBg}" rx="4" stroke="${currentTheme.border}" stroke-width="0.5"/>
          <circle cx="8" cy="12.5" r="3" fill="${stats.stars > 50 ? '#00ff88' : stats.stars > 10 ? '#ffa500' : '#ff6b6b'}" class="blink"/>
          <text x="18" y="16" fill="${currentTheme.text}" font-family="Segoe UI, system-ui, sans-serif" font-size="10" font-weight="600">
            ${stats.stars > 50 ? t.veryActive : stats.stars > 10 ? t.active : t.gettingStarted}
      </text>
        </g>
        
        <!-- Level badge with progress -->
        <g transform="translate(0, 95)">
          <rect x="0" y="0" width="120" height="20" fill="${currentTheme.primary}" opacity="0.1" rx="4" stroke="${currentTheme.primary}" stroke-width="1"/>
          <rect x="2" y="2" width="${Math.min(116, (stats.stars % 10) * 11.6)}" height="16" fill="${currentTheme.primary}" opacity="0.3" rx="2"/>
          <text x="60" y="13" fill="${currentTheme.primary}" font-family="Segoe UI, system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle">
            ${t.level} ${Math.min(10, Math.floor(stats.stars / 10) + 1)}
          </text>
        </g>
        
        <!-- Join date -->
        <g transform="translate(0, 125)">
          <text x="0" y="0" fill="#9f9f9f" font-family="Segoe UI, system-ui, sans-serif" font-size="9" font-weight="400">
            ${t.joined} ${new Date(Date.now() - stats.accountAge * 24 * 60 * 60 * 1000).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', { month: 'short', year: 'numeric' })}
          </text>
        </g>
      </g>
      
      <!-- Main Stats -->
      <g data-testid="main-card-body" transform="translate(0, 70)">
        <svg data-testid="lang-items" x="50">
          <!-- Stars -->
          <g class="stagger" style="animation-delay: 450ms" transform="translate(0, 0)">
            <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16">
              <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"/>
            </svg>
            <text class="stat bold" x="25" y="12.5">${t.totalStars}</text>
            <text class="stat bold" x="219.01" y="12.5" data-testid="stars">${formatNumber(stats.stars)}</text>
          </g>
          
          <!-- Repositories -->
          <g class="stagger" style="animation-delay: 600ms" transform="translate(0, 25)">
            <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16">
              <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
            </svg>
            <text class="stat bold" x="25" y="12.5">${t.totalRepos}</text>
            <text class="stat bold" x="219.01" y="12.5" data-testid="repos">${stats.repos}</text>
          </g>
        
        <!-- Forks -->
          <g class="stagger" style="animation-delay: 750ms" transform="translate(0, 50)">
            <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16">
              <path fill-rule="evenodd" d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"/>
            </svg>
            <text class="stat bold" x="25" y="12.5">${t.totalForks}</text>
            <text class="stat bold" x="219.01" y="12.5" data-testid="forks">${formatNumber(stats.forks)}</text>
          </g>
          
          <!-- Followers -->
          <g class="stagger" style="animation-delay: 900ms" transform="translate(0, 75)">
            <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16">
              <path fill-rule="evenodd" d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"/>
            </svg>
            <text class="stat bold" x="25" y="12.5">Total Followers:</text>
            <text class="stat bold" x="219.01" y="12.5" data-testid="followers">${formatNumber(stats.followers)}</text>
          </g>
        
        <!-- Top Languages -->
          <g class="stagger" style="animation-delay: 1050ms" transform="translate(0, 100)">
            <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16">
              <path fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"/>
            </svg>
            <text class="stat bold" x="25" y="12.5">Top Languages:</text>
            <text class="stat" x="219.01" y="12.5" data-testid="languages">
              ${stats.languages.slice(0, 3).map(lang => lang.name).join(", ")}
        </text>
          </g>
        </svg>
      </g>
    </svg>
  `;
}
