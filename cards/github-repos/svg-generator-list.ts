import { RepoStats, Theme } from "./types";

export function generateReposListSVG(
  repoStats: RepoStats,
  repos: any[] = [],
  theme: string = "dark",
  language: "pt" | "en" = "pt",
  showBorder: boolean = true
): string {
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

  const currentTheme = themes[theme] || themes.dark;
  const isDark =
    theme === "dark" ||
    theme === "radical" ||
    theme === "neon" ||
    theme === "cyber" ||
    theme === "tanjiro";

  // Textos baseados no idioma
  const texts = {
    pt: {
      title: "Repositórios do GitHub",
      totalRepos: "repositórios",
      stars: "estrelas",
      forks: "forks",
      language: "linguagem",
      updated: "atualizado",
      created: "criado",
      description: "Descrição",
      noDescription: "Sem descrição",
      public: "Público",
      private: "Privado",
    },
    en: {
      title: "GitHub Repositories",
      totalRepos: "repositories",
      stars: "stars",
      forks: "forks",
      language: "language",
      updated: "updated",
      created: "created",
      description: "Description",
      noDescription: "No description",
      public: "Public",
      private: "Private",
    },
  };

  const t = texts[language];

  // Função para formatar números
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num.toString();
  };

  // Função para formatar data
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "pt" ? "pt-BR" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Função para obter cor da linguagem
  const getLanguageColor = (language: string): string => {
    const colors: Record<string, string> = {
      JavaScript: "#f7df1e",
      TypeScript: "#3178c6",
      Python: "#3776ab",
      Java: "#f89820",
      "C#": "#239120",
      "C++": "#00599c",
      C: "#a8b9cc",
      Go: "#00add8",
      Rust: "#000000",
      PHP: "#777bb4",
      Ruby: "#cc342d",
      Swift: "#fa7343",
      Kotlin: "#7f52ff",
      HTML: "#e34c26",
      CSS: "#1572b6",
      Vue: "#4fc08d",
      React: "#61dafb",
      Angular: "#dd0031",
      "Vue.js": "#4fc08d",
      "React Native": "#61dafb",
      Flutter: "#02569b",
      Dart: "#0175c2",
      Scala: "#dc322f",
      Clojure: "#5881d8",
      Haskell: "#5d4f85",
      Elixir: "#4e2a8e",
      Erlang: "#a90533",
      Lua: "#000080",
      Perl: "#39457e",
      R: "#276dc3",
      MATLAB: "#e16737",
      Shell: "#89e051",
      PowerShell: "#012456",
      Dockerfile: "#384d54",
      Makefile: "#427819",
      YAML: "#cb171e",
      JSON: "#000000",
      XML: "#00599c",
      Markdown: "#083fa1",
      "Jupyter Notebook": "#da5b0b",
      Assembly: "#6e4c13",
      "Objective-C": "#438eff",
      "Visual Basic": "#945db7",
      Racket: "#3c5caa",
      OCaml: "#ec6813",
      "F#": "#3785ba",
      "Common Lisp": "#3fb68b",
      "Emacs Lisp": "#c065db",
      Vim: "#199f4b",
      TeX: "#3d6117",
      PureScript: "#1d222d",
      Elm: "#60b5cc",
      D: "#ba595e",
      Nim: "#ffc200",
      Crystal: "#000100",
      Zig: "#f7a41d",
      Nix: "#7e7eff",
      Terraform: "#623ce4",
      HCL: "#623ce4",
      Pulumi: "#8a3391",
      Bicep: "#519aba",
      ARM: "#0078d4",
      CloudFormation: "#ff4f8b",
      Serverless: "#fd5750",
      SAM: "#ff9900",
      CDK: "#ff9900",
      CDKTF: "#623ce4",
    };
    return colors[language] || currentTheme.primary;
  };

  // Função para truncar texto
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + "...";
  };

  // Usar repositórios reais se disponíveis, senão deixar vazio
  let reposToShow = [];

  if (repos && repos.length > 0) {
    // Filtrar repositórios (remover forks se necessário) e ordenar por estrelas
    reposToShow = repos
      .filter((repo) => !repo.fork) // Remover forks
      .sort((a, b) => b.stargazers_count - a.stargazers_count) // Ordenar por estrelas
      .slice(0, 5) // Pegar os 5 mais estrelados
      .map((repo) => ({
        name: repo.full_name,
        description: repo.description || t.noDescription,
        language: repo.language || "Unknown",
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updated_at: repo.updated_at,
        created_at: repo.created_at,
        private: repo.private,
      }));
  }
  // Se não houver repositórios, reposToShow permanece vazio

  // Gerar SVG
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
  <defs>
    <!-- Tanjiro Gradients and Patterns -->
    <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#14532d"/>
      <stop offset="100%" stop-color="#22c55e"/>
    </linearGradient>

    <!-- Padrão quadriculado Tanjiro -->
    <pattern id="tanjiroPattern" patternUnits="userSpaceOnUse" width="40" height="40">
      <rect width="40" height="40" fill="black"/>
      <rect x="0" y="0" width="20" height="20" fill="url(#greenGradient)"/>
      <rect x="20" y="20" width="20" height="20" fill="url(#greenGradient)"/>
    </pattern>

    <!-- Gradiente de fogo melhorado -->
    <linearGradient id="fireGradient" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#1a0000"/>
      <stop offset="10%" stop-color="#450a0a"/>
      <stop offset="25%" stop-color="#7f1d1d"/>
      <stop offset="35%" stop-color="#dc2626"/>
      <stop offset="45%" stop-color="#ef4444"/>
      <stop offset="55%" stop-color="#f97316"/>
      <stop offset="70%" stop-color="#fbbf24"/>
      <stop offset="85%" stop-color="#fde047"/>
      <stop offset="95%" stop-color="#fef3c7"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>

    <!-- Filtro de ondulação do fogo -->
    <filter id="flameWave">
      <feTurbulence type="fractalNoise" baseFrequency="0.02 0.05" numOctaves="2" seed="3" result="noise">
        <animate attributeName="baseFrequency"
                 values="0.02 0.05;0.03 0.08;0.02 0.05"
                 dur="4s"
                 repeatCount="indefinite"/>
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="18"/>
    </filter>
    
    <!-- Neon Glow Filter -->
    <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge> 
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <style>
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
      
      .pulse {
        animation: pulse 2s infinite;
      }

      .led-segment {
        stroke-linecap: round;
      }

      .led-segment.dark {
        animation: rgbCycle 3s ease-in-out infinite;
      }

      .led-segment.light {
        animation: rgbCycle 3s ease-in-out infinite;
      }

      .led-segment.radical {
        animation: radicalCycle 3s ease-in-out infinite;
      }

      .led-segment.neon {
        animation: neonCycle 3s ease-in-out infinite;
      }

      .led-segment.cyber {
        animation: cyberCycle 3s ease-in-out infinite;
      }

      .led-segment.tanjiro {
        animation: tanjiroCycle 3s ease-in-out infinite;
      }

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
      
      @keyframes tanjiroCycle {
        0%, 30% { 
          stroke: #ef4444;
          filter: drop-shadow(0 0 5px #ef4444) drop-shadow(0 0 10px #ef4444);
        }
        35%, 65% { 
          stroke: #f97316;
          filter: drop-shadow(0 0 5px #f97316) drop-shadow(0 0 10px #f97316);
        }
        70%, 100% { 
          stroke: #fde047;
          filter: drop-shadow(0 0 5px #fde047) drop-shadow(0 0 10px #fde047);
        }
      }
    </style>
  </defs>
  
  <!-- Background expandido para a borda neon -->
  <rect width="600" height="400" fill="transparent" rx="20"/>
  
  ${
    showBorder
      ? theme === "tanjiro"
        ? `
  <!-- Tanjiro Flame Borders - na borda do background colorido (BORDAS GROSSAS) -->
  <!-- Top flame border -->
  <rect x="20.5" y="5.5" width="559" height="25" fill="url(#fireGradient)" filter="url(#flameWave)">
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="2s" repeatCount="indefinite"/>
  </rect>
  <!-- Bottom flame border -->
  <rect x="20.5" y="369.5" width="559" height="25" fill="url(#fireGradient)" filter="url(#flameWave)">
    <animateTransform attributeName="transform" type="translate" values="0 0;0 5;0 0" dur="2s" repeatCount="indefinite"/>
  </rect>
  <!-- Left flame border -->
  <rect x="20.5" y="5.5" width="25" height="389" fill="url(#fireGradient)" filter="url(#flameWave)">
    <animateTransform attributeName="transform" type="translate" values="0 0;-5 0;0 0" dur="2s" repeatCount="indefinite"/>
  </rect>
  <!-- Right flame border -->
  <rect x="554.5" y="5.5" width="25" height="389" fill="url(#fireGradient)" filter="url(#flameWave)">
    <animateTransform attributeName="transform" type="translate" values="0 0;5 0;0 0" dur="2s" repeatCount="indefinite"/>
  </rect>

  <!-- Partículas discretas nas bordas -->
  <g fill="yellow" opacity="0.5">
    <circle cx="75" cy="10.5" r="1">
      <animate attributeName="cy" values="10.5;30.5" dur="1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="450" cy="384.5" r="1.5">
      <animate attributeName="cy" values="384.5;364.5" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/>
    </circle>
  </g>
`
        : `
  <!-- Theme-specific LED Border Segments -->
  <!-- Top segments -->
  <line x1="25" y1="10" x2="75" y2="10" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="75" y1="10" x2="125" y2="10" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="125" y1="10" x2="175" y2="10" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="175" y1="10" x2="225" y2="10" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="225" y1="10" x2="275" y2="10" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="275" y1="10" x2="325" y2="10" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="325" y1="10" x2="375" y2="10" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="375" y1="10" x2="425" y2="10" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="425" y1="10" x2="475" y2="10" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="475" y1="10" x2="525" y2="10" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="525" y1="10" x2="575" y2="10" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  
  <!-- Right segments -->
  <line x1="575" y1="10" x2="575" y2="60" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="575" y1="60" x2="575" y2="110" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="575" y1="110" x2="575" y2="160" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="575" y1="160" x2="575" y2="210" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="575" y1="210" x2="575" y2="260" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="575" y1="260" x2="575" y2="310" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="575" y1="310" x2="575" y2="360" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="575" y1="360" x2="575" y2="390" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  
  <!-- Bottom segments -->
  <line x1="575" y1="390" x2="525" y2="390" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="525" y1="390" x2="475" y2="390" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="475" y1="390" x2="425" y2="390" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="425" y1="390" x2="375" y2="390" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="375" y1="390" x2="325" y2="390" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="325" y1="390" x2="275" y2="390" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="275" y1="390" x2="225" y2="390" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="225" y1="390" x2="175" y2="390" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="175" y1="390" x2="125" y2="390" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="125" y1="390" x2="75" y2="390" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="75" y1="390" x2="25" y2="390" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  
  <!-- Left segments -->
  <line x1="25" y1="390" x2="25" y2="340" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="25" y1="340" x2="25" y2="290" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="25" y1="290" x2="25" y2="240" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="25" y1="240" x2="25" y2="190" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="25" y1="190" x2="25" y2="140" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="25" y1="140" x2="25" y2="90" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="25" y1="90" x2="25" y2="40" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
  <line x1="25" y1="40" x2="25" y2="10" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>
`
      : ""
  }
  
  <!-- Background -->
  <rect
    x="25.5"
    y="10.5"
    rx="4.5"
    height="379"
    stroke="${currentTheme.border}"
    width="549"
    fill="${
      theme === "tanjiro" ? "url(#tanjiroPattern)" : currentTheme.background
    }"
    stroke-opacity="1"
  />
  
  ${
    theme === "tanjiro"
      ? `
  <!-- Camada sólida para legibilidade do texto (ajustada para bordas grossas) -->
  <rect
    x="40.5"
    y="25.5"
    rx="4.5"
    height="349"
    width="519"
    fill="rgba(0, 0, 0, 0.3)"
    stroke="none"
  />
  `
      : ""
  }
  
  <!-- Header -->
  <g>
    <rect x="40" y="30" width="520" height="60" fill="${
      currentTheme.cardBg
    }" rx="8"/>
    <text x="300" y="55" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="bold" fill="${
      currentTheme.primary
    }" text-anchor="middle">
      📁 ${t.title}
    </text>
    <text x="300" y="78" font-family="system-ui, -apple-system, sans-serif" font-size="16" fill="${
      currentTheme.text
    }" text-anchor="middle">
      @${repoStats.username} • ${repoStats.totalRepos} ${t.totalRepos}
    </text>
  </g>
  
  <!-- Stats Summary -->
  <g>
    <rect x="40" y="100" width="520" height="40" fill="${
      currentTheme.cardBg
    }" rx="8" opacity="0.8"/>
         <text x="300" y="116" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="${
           currentTheme.text
         }" text-anchor="middle">
       ⭐ ${formatNumber(repoStats.totalStars)} ${t.stars} • 🍴 ${formatNumber(
    repoStats.totalForks
  )} ${t.forks} • 👀 ${formatNumber(repoStats.totalWatchers)} watchers
     </text>
     <text x="300" y="135" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="${
       currentTheme.text
     }" text-anchor="middle">
       🏷️ ${repoStats.languages.length} ${t.language}s
     </text>
  </g>
  
  <!-- Repositories List -->
  <g transform="translate(40, 150)">
    ${
      reposToShow.length > 0
        ? reposToShow
            .map(
              (repo, index) => `
        <g transform="translate(0, ${index * 45})">
          <!-- Repository Card -->
          <rect x="0" y="0" width="520" height="35" fill="${
            currentTheme.cardBg
          }" rx="6" stroke="${currentTheme.border}" stroke-width="1"/>
          
          <!-- Repository Icon -->    
          <text x="18" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="17" fill="white" text-anchor="middle">📁</text>
          
                                     <!-- Repository Name -->
            <text x="35" y="16" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="${
              currentTheme.primary
            }">
              ${truncateText(repo.name.split("/").pop() || repo.name, 35)}
            </text>
            
            <!-- Repository Description -->
            <text x="35" y="30" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="${
              currentTheme.text
            }">
              ${truncateText(repo.description, 55)}
            </text>
          
          <!-- Language -->
          <circle cx="380" cy="16" r="5" fill="${getLanguageColor(
            repo.language
          )}"/>
                    <text x="390" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="${
                      currentTheme.text
                    }">
              ${repo.language}
            </text>
            
            <!-- Stars -->
            <text x="450" y="14" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="${
              currentTheme.text
            }">
              ⭐ ${formatNumber(repo.stars)}
            </text>
            
            <!-- Forks -->
            <text x="450" y="30" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="${
              currentTheme.text
            }">
              🍴 ${formatNumber(repo.forks)}
            </text>
        </g>
      `
            )
            .join("")
        : `
        <!-- No Repositories Message -->
        <g transform="translate(0, 50)">
          <rect x="0" y="0" width="520" height="100" fill="${currentTheme.cardBg}" rx="8" stroke="${currentTheme.border}" stroke-width="1"/>
          <text x="260" y="45" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600" fill="${currentTheme.text}" text-anchor="middle">
            📭 Nenhum repositório encontrado
          </text>
          <text x="260" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="${currentTheme.text}" text-anchor="middle">
            Este usuário ainda não possui repositórios públicos
          </text>
        </g>
      `
    }
  </g>
  
  <!-- Footer -->
  <g transform="translate(40, 370)">
    <text x="0" y="9" font-family="system-ui, -apple-system, sans-serif" font-size="10" fill="${
      currentTheme.text
    }">
      Gerado em ${new Date().toLocaleDateString(
        language === "pt" ? "pt-BR" : "en-US"
      )} • GitHub Stats
    </text>
  </g>
</svg>`;

  return svg;
}
