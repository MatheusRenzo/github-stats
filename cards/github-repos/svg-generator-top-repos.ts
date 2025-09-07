import { RepoStats } from "./types";
import { getTheme, Theme } from "../../themes";

export function generateTopReposSVG(
  repoStats: RepoStats,
  repos: any[] = [],
  theme: string = "dark",
  language: "pt" | "en" = "pt",
  showBorder: boolean = true
): string {
  const currentTheme = getTheme(theme);
  const isDark =
    theme === "dark" ||
    theme === "radical" ||
    theme === "neon" ||
    theme === "cyber" ||
    theme === "tanjiro";

  // Textos baseados no idioma
  const texts = {
    pt: {
      title: "Top Repositórios",
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
      rank: "posição",
    },
    en: {
      title: "Top Repositories",
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
      rank: "rank",
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

  // Função para escapar caracteres especiais em XML/SVG
  const escapeXml = (text: string): string => {
    if (!text) return "";
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  // Função para truncar texto
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + "...";
  };

  // Função para quebrar texto em múltiplas linhas
  const wrapText = (
    text: string,
    maxLength: number,
    maxLines: number = 8
  ): string[] => {
    if (text.length <= maxLength) return [text];

    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      
      // Se a palavra individual é muito longa, quebra ela
      if (word.length > maxLength) {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = "";
        }
        // Quebra a palavra longa em pedaços
        let remainingWord = word;
        while (remainingWord.length > maxLength) {
          lines.push(remainingWord.substring(0, maxLength - 3) + "...");
          remainingWord = remainingWord.substring(maxLength - 3);
        }
        if (remainingWord.length > 0) {
          currentLine = remainingWord;
        }
      } else if (testLine.length <= maxLength) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          lines.push(word.substring(0, maxLength - 3) + "...");
          break;
        }
      }

      if (lines.length >= maxLines) {
        if (currentLine && lines.length === maxLines - 1) {
          lines.push(currentLine.substring(0, maxLength - 3) + "...");
        }
        break;
      }
    }

    if (currentLine && lines.length < maxLines) {
      lines.push(currentLine);
    }

    return lines;
  };

  // Função para calcular altura dinâmica do card baseada na descrição
  const calculateCardHeight = (description: string): number => {
    const wrappedLines = wrapText(description, 55, 8);
    const baseHeight = 70; // Altura base (rank, nome, linguagem, stats) - reduzida
    const lineHeight = 12; // Altura de cada linha de texto - reduzida
    const padding = 15; // Padding vertical - reduzido
    
    return baseHeight + (wrappedLines.length * lineHeight) + padding;
  };

  // Função para calcular altura total do SVG
  const calculateTotalHeight = (repos: any[]): number => {
    if (repos.length === 0) return 600; // Altura padrão se não houver repositórios
    
    const headerHeight = 125; // Header + Stats Summary
    const footerHeight = 40; // Footer
    const spacing = 5; // Espaçamento entre cards - reduzido
    
    const totalCardsHeight = repos.reduce((total, repo) => {
      const description = repo.description || t.noDescription;
      return total + calculateCardHeight(description) + spacing;
    }, 0);
    
    return headerHeight + totalCardsHeight + footerHeight + 15; // +15 para margem - reduzido
  };

  // Função para gerar bordas LED dinâmicas
  const generateLEDBorders = (height: number, theme: string): string => {
    const segmentLength = 50;
    const segmentsPerSide = Math.floor((height - 20) / segmentLength);
    const remainingHeight = (height - 20) % segmentLength;
    
    let borders = '';
    
    // Top segments
    for (let i = 0; i < 11; i++) {
      const x1 = 25 + (i * 50);
      const x2 = 25 + ((i + 1) * 50);
      borders += `<line x1="${x1}" y1="10" x2="${x2}" y2="10" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>\n  `;
    }
    
    // Right segments
    for (let i = 0; i < segmentsPerSide; i++) {
      const y1 = 10 + (i * segmentLength);
      const y2 = 10 + ((i + 1) * segmentLength);
      borders += `<line x1="575" y1="${y1}" x2="575" y2="${y2}" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>\n  `;
    }
    
    // Add remaining height segment on right side
    if (remainingHeight > 0) {
      const y1 = 10 + (segmentsPerSide * segmentLength);
      const y2 = 10 + (segmentsPerSide * segmentLength) + remainingHeight;
      borders += `<line x1="575" y1="${y1}" x2="575" y2="${y2}" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>\n  `;
    }
    
    // Bottom segments
    const bottomY = 10 + (segmentsPerSide * segmentLength) + remainingHeight;
    for (let i = 0; i < 11; i++) {
      const x1 = 575 - (i * 50);
      const x2 = 525 - (i * 50);
      borders += `<line x1="${x1}" y1="${bottomY}" x2="${x2}" y2="${bottomY}" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>\n  `;
    }
    
    // Left segments
    for (let i = 0; i < segmentsPerSide; i++) {
      const y1 = bottomY - (i * segmentLength);
      const y2 = bottomY - ((i + 1) * segmentLength);
      borders += `<line x1="25" y1="${y1}" x2="25" y2="${y2}" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>\n  `;
    }
    
    // Add remaining height segment on left side
    if (remainingHeight > 0) {
      const y1 = bottomY - (segmentsPerSide * segmentLength);
      const y2 = bottomY - (segmentsPerSide * segmentLength) - remainingHeight;
      borders += `<line x1="25" y1="${y1}" x2="25" y2="${y2}" stroke-width="8" class="led-segment ${theme}" filter="url(#neonGlow)"/>\n  `;
    }
    
    return borders;
  };

  // Filtrar e pegar os 3 repositórios mais estrelados
  let topRepos: Array<{
    name: string;
    description: string;
    language: string;
    stars: number;
    forks: number;
    updated_at: string;
    created_at: string;
    private: boolean;
    rank: number;
    cardHeight: number;
  }> = [];

  if (repos && repos.length > 0) {
    // Filtrar repositórios que não são forks
    const filteredRepos = repos.filter((repo) => !repo.fork);
    
    // Primeiro, tentar pegar repositórios com pelo menos 1 estrela
    let reposWithStars = filteredRepos.filter((repo) => repo.stargazers_count > 0);
    
    // Se não houver repositórios com estrelas, pegar os que têm pelo menos 1 fork
    if (reposWithStars.length === 0) {
      reposWithStars = filteredRepos.filter((repo) => repo.forks_count > 0);
    }
    
    // Se ainda não houver nenhum, pegar todos os repositórios
    if (reposWithStars.length === 0) {
      reposWithStars = filteredRepos;
    }
    
    // Ordenar por estrelas (peso maior) e depois por forks
    topRepos = reposWithStars
      .sort((a, b) => {
        // Primeiro critério: estrelas (peso maior)
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        // Segundo critério: forks
        return b.forks_count - a.forks_count;
      })
      .slice(0, 3) // Pegar os 3 melhores
      .map((repo, index) => {
        const description = repo.description || t.noDescription;
        return {
        name: repo.full_name,
          description: description,
        language: repo.language || "Unknown",
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updated_at: repo.updated_at,
        created_at: repo.created_at,
        private: repo.private,
        rank: index + 1,
          cardHeight: calculateCardHeight(description),
        };
      });
  }

  // Calcular altura total dinâmica
  const totalHeight = calculateTotalHeight(topRepos);

  // Gerar SVG
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="${totalHeight}" viewBox="0 0 600 ${totalHeight}">
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
  <rect width="600" height="${totalHeight}" fill="transparent" rx="20"/>
  
  ${
    showBorder
      ? theme === "tanjiro"
        ? `
  <!-- Tanjiro Flame Borders - Dynamic height -->
  <!-- Top flame border -->
  <rect x="20.5" y="5.5" width="559" height="25" fill="url(#fireGradient)" filter="url(#flameWave)">
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="2s" repeatCount="indefinite"/>
  </rect>
  <!-- Bottom flame border -->
  <rect x="20.5" y="${totalHeight - 15.5}" width="559" height="25" fill="url(#fireGradient)" filter="url(#flameWave)">
    <animateTransform attributeName="transform" type="translate" values="0 0;0 5;0 0" dur="2s" repeatCount="indefinite"/>
  </rect>
  <!-- Left flame border -->
  <rect x="20.5" y="5.5" width="25" height="${totalHeight - 20}" fill="url(#fireGradient)" filter="url(#flameWave)">
    <animateTransform attributeName="transform" type="translate" values="0 0;-5 0;0 0" dur="2s" repeatCount="indefinite"/>
  </rect>
  <!-- Right flame border -->
  <rect x="554.5" y="5.5" width="25" height="${totalHeight - 20}" fill="url(#fireGradient)" filter="url(#flameWave)">
    <animateTransform attributeName="transform" type="translate" values="0 0;5 0;0 0" dur="2s" repeatCount="indefinite"/>
  </rect>

  <!-- Partículas discretas nas bordas -->
  <g fill="yellow" opacity="0.5">
    <circle cx="75" cy="10.5" r="1">
      <animate attributeName="cy" values="10.5;30.5" dur="1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="450" cy="${totalHeight - 15.5}" r="1.5">
      <animate attributeName="cy" values="${totalHeight - 15.5};${totalHeight - 35.5}" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/>
    </circle>
  </g>
`
        : `
  <!-- Theme-specific LED Border Segments - Dynamic -->
  ${generateLEDBorders(totalHeight, theme)}
`
      : ""
  }
  
  <!-- Background -->
  <rect
    x="25.5"
    y="10.5"
    rx="4.5"
    height="${totalHeight - 20}"
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
    height="${totalHeight - 50}"
    width="519"
    fill="rgba(0, 0, 0, 0.3)"
    stroke="none"
  />
  `
      : ""
  }
  
  <!-- Header - Better organized -->
  <g>
    <rect x="40" y="30" width="520" height="55" fill="${
      currentTheme.cardBg
    }" rx="8" opacity="0.9"/>
    <text x="300" y="52" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="bold" fill="${
      currentTheme.primary
    }" text-anchor="middle">
      🏆 ${t.title}
    </text>
    <text x="300" y="72" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="${
      currentTheme.text
    }" text-anchor="middle" opacity="0.9">
      @${escapeXml(repoStats.username)}
    </text>
  </g>
  
  <!-- Stats Summary - Better positioned -->
  <g>
    <rect x="40" y="95" width="520" height="30" fill="${
      currentTheme.cardBg
    }" rx="8" opacity="0.8"/>
    <text x="300" y="112" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="${
      currentTheme.text
    }" text-anchor="middle" opacity="0.9">
      ⭐ ${formatNumber(repoStats.totalStars)} ${t.stars} • 🍴 ${formatNumber(
    repoStats.totalForks
  )} ${t.forks}
    </text>
  </g>
  
  <!-- Top Repositories List - Minimalist Design -->
  <g transform="translate(40, 130)">
    ${
      topRepos.length > 0
        ? (() => {
            let currentY = 0;
            return topRepos
              .map((repo, index) => {
                const cardHeight = repo.cardHeight;
                const wrappedLines = wrapText(repo.description, 55, 8);
                const descriptionEndY = 50 + (wrappedLines.length * 12);
                // Posicionar elementos na parte inferior do card
                const languageY = cardHeight - 25; // 25px do fundo
                const starsY = cardHeight - 25; // 25px do fundo
                
                const result = `
        <g transform="translate(0, ${currentY})">
          <!-- Repository Card with Link - Dynamic height -->
          <a href="https://github.com/${repo.name}" target="_blank" rel="noopener noreferrer">
            <rect x="0" y="0" width="520" height="${cardHeight}" fill="${
              currentTheme.cardBg
            }" rx="10" stroke="${
                  currentTheme.border
                }" stroke-width="1" opacity="0.9" style="cursor: pointer;"/>
            
            <!-- Rank Badge - Better positioned -->
            <circle cx="35" cy="35" r="18" fill="${
              currentTheme.primary
            }" opacity="0.9"/>
            <text x="35" y="40" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="bold" fill="${
              currentTheme.background
            }" text-anchor="middle">
              ${repo.rank}
            </text>
            
            <!-- Repository Name - Better positioned -->
            <text x="75" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="${
              currentTheme.primary
            }">
              ${escapeXml(truncateText(repo.name.split("/").pop() || repo.name, 45))}
            </text>
            
            <!-- Repository Description - Multi-line with proper wrapping and better spacing -->
            ${wrapText(repo.description, 55, 8)
              .map(
                (line, lineIndex) => `
              <text x="75" y="${
                50 + lineIndex * 12
              }" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="${
                  currentTheme.text
                }" opacity="0.9">
                ${escapeXml(line)}
              </text>
            `
              )
              .join("")}
            
            <!-- Language and Stats - Better organized and positioned -->
            <g transform="translate(75, ${languageY})">
              <!-- Language -->
              <circle cx="0" cy="0" r="5" fill="${getLanguageColor(
                repo.language
              )}"/>
              <text x="12" y="4" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="${
                currentTheme.text
              }" opacity="0.8">
                ${escapeXml(repo.language)}
              </text>
            </g>
            
            <!-- Stars and Forks - Right side, better positioned -->
            <g transform="translate(400, ${starsY})">
              <!-- Stars -->
              <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="${
                currentTheme.text
              }" opacity="0.9">
                ⭐ ${formatNumber(repo.stars)}
              </text>
              
              <!-- Forks -->
              <text x="0" y="14" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="${
                currentTheme.text
              }" opacity="0.9">
                🍴 ${formatNumber(repo.forks)}
              </text>
            </g>
          </a>
        </g>`;
                
                currentY += cardHeight + 5; // 5px de espaçamento entre cards
                return result;
              })
              .join("");
          })()
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
  
  <!-- Footer - Dynamic positioning based on content height -->
  <g transform="translate(40, ${topRepos.length > 0 ? 130 + topRepos.reduce((total, repo, index) => total + repo.cardHeight + (index > 0 ? 5 : 0), 0) + 15 : 570})">
    <text x="0" y="15" font-family="system-ui, -apple-system, sans-serif" font-size="10" fill="${
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
