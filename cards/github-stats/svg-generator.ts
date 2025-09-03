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

export function generateStatsSVG(
  stats: SimpleStats,
  theme: string = "dark",
  language: string = "pt",

  showBorder: boolean = true
): string {
  const currentTheme = themes[theme] || themes.dark;

  // Sistema de 5000 níveis baseado na média de estrelas, repos e seguidores
  const calculateLevel = () => {
    // Calcular média entre estrelas, repositórios e seguidores
    const averageScore = (stats.stars + stats.repos + stats.followers) / 3;

    // Sistema de progressão MUITO mais difícil - exponencial agressivo
    // Níveis 1-100: fácil (1-3 pontos por nível)
    // Níveis 101-500: médio (3-10 pontos por nível)
    // Níveis 501-1000: difícil (10-30 pontos por nível)
    // Níveis 1001-2000: muito difícil (30-100 pontos por nível)
    // Níveis 2001-3000: extremamente difícil (100-300 pontos por nível)
    // Níveis 3001-4000: impossível (300-800 pontos por nível)
    // Níveis 4001-5000: lendário (800+ pontos por nível)

    if (averageScore < 100) {
      // Níveis 1-100: progressão linear suave
      return Math.min(100, Math.floor(averageScore) + 1);
    } else if (averageScore < 500) {
      // Níveis 101-500: 2 pontos por nível
      return Math.min(500, 100 + Math.floor((averageScore - 100) / 2) + 1);
    } else if (averageScore < 1500) {
      // Níveis 501-1000: 5 pontos por nível
      return Math.min(1000, 500 + Math.floor((averageScore - 500) / 5) + 1);
    } else if (averageScore < 4000) {
      // Níveis 1001-2000: 10 pontos por nível
      return Math.min(2000, 1000 + Math.floor((averageScore - 1500) / 10) + 1);
    } else if (averageScore < 8000) {
      // Níveis 2001-3000: 20 pontos por nível
      return Math.min(3000, 2000 + Math.floor((averageScore - 4000) / 20) + 1);
    } else if (averageScore < 15000) {
      // Níveis 3001-4000: 50 pontos por nível
      return Math.min(4000, 3000 + Math.floor((averageScore - 8000) / 50) + 1);
    } else {
      // Níveis 4001-5000: 100 pontos por nível
      return Math.min(
        5000,
        4000 + Math.floor((averageScore - 15000) / 100) + 1
      );
    }
  };

  const userLevel = calculateLevel();

  // Função para calcular o progresso dentro do nível atual
  const calculateProgress = () => {
    // Calcular média atual
    const currentScore = (stats.stars + stats.repos + stats.followers) / 3;

    // Calcular pontos necessários para o nível atual e próximo
    let currentLevelRequired = 0;
    let nextLevelRequired = 0;

    if (userLevel <= 100) {
      // Níveis 1-100: 1 ponto por nível
      currentLevelRequired = userLevel - 1;
      nextLevelRequired = userLevel;
    } else if (userLevel <= 500) {
      // Níveis 101-500: 2 pontos por nível
      currentLevelRequired = 100 + (userLevel - 100 - 1) * 2;
      nextLevelRequired = 100 + (userLevel - 100) * 2;
    } else if (userLevel <= 1000) {
      // Níveis 501-1000: 5 pontos por nível
      currentLevelRequired = 500 + (userLevel - 500 - 1) * 5;
      nextLevelRequired = 500 + (userLevel - 500) * 5;
    } else if (userLevel <= 2000) {
      // Níveis 1001-2000: 10 pontos por nível
      currentLevelRequired = 1500 + (userLevel - 1000 - 1) * 10;
      nextLevelRequired = 1500 + (userLevel - 1000) * 10;
    } else if (userLevel <= 3000) {
      // Níveis 2001-3000: 20 pontos por nível
      currentLevelRequired = 4000 + (userLevel - 2000 - 1) * 20;
      nextLevelRequired = 4000 + (userLevel - 2000) * 20;
    } else if (userLevel <= 4000) {
      // Níveis 3001-4000: 50 pontos por nível
      currentLevelRequired = 8000 + (userLevel - 3000 - 1) * 50;
      nextLevelRequired = 8000 + (userLevel - 3000) * 50;
    } else {
      // Níveis 4001-5000: 100 pontos por nível
      currentLevelRequired = 15000 + (userLevel - 4000 - 1) * 100;
      nextLevelRequired = 15000 + (userLevel - 4000) * 100;
    }

    // Calcular progresso
    const progress =
      (currentScore - currentLevelRequired) /
      (nextLevelRequired - currentLevelRequired);
    return Math.min(1, Math.max(0, progress));
  };

  const progressPercentage = calculateProgress();

  // Função para obter título gamificado do nível (5 em 5 até 500, depois 50 em 50)
  const getLevelTitle = (level: number, language: string) => {
    const titles = {
      pt: {
        // Níveis 1-4: Iniciante
        1: "APRENDIZ",
        2: "APRENDIZ",
        3: "APRENDIZ",
        4: "APRENDIZ",

        // Níveis 5-100: Mágico (a cada 5)
        5: "MAGO",
        10: "ARQUIMAGO",
        15: "MESTRE DOS MAGOS",
        20: "LORDE MÁGICO",
        25: "REI DOS MAGOS",
        30: "IMPERADOR MÁGICO",
        35: "DEUS DA MAGIA",
        40: "SUPREMO MÁGICO",
        45: "PRIMORDIAL MÁGICO",
        50: "CÓSMICO MÁGICO",
        55: "MAGO SUPREMO",
        60: "ARQUIMAGO SUPREMO",
        65: "MESTRE SUPREMO DOS MAGOS",
        70: "LORDE SUPREMO MÁGICO",
        75: "REI SUPREMO DOS MAGOS",
        80: "IMPERADOR SUPREMO MÁGICO",
        85: "DEUS SUPREMO DA MAGIA",
        90: "SUPREMO MÁGICO ABSOLUTO",
        95: "PRIMORDIAL MÁGICO SUPREMO",
        100: "CÓSMICO MÁGICO SUPREMO",

        // Níveis 105-500: Mágico Épico (a cada 5)
        105: "MAGO ÉPICO",
        110: "ARQUIMAGO ÉPICO",
        115: "MESTRE ÉPICO DOS MAGOS",
        120: "LORDE ÉPICO MÁGICO",
        125: "REI ÉPICO DOS MAGOS",
        130: "IMPERADOR ÉPICO MÁGICO",
        135: "DEUS ÉPICO DA MAGIA",
        140: "SUPREMO ÉPICO MÁGICO",
        145: "PRIMORDIAL ÉPICO MÁGICO",
        150: "CÓSMICO ÉPICO MÁGICO",
        155: "MAGO SUPREMO ÉPICO",
        160: "ARQUIMAGO SUPREMO ÉPICO",
        165: "MESTRE SUPREMO ÉPICO",
        170: "LORDE SUPREMO ÉPICO",
        175: "REI SUPREMO ÉPICO",
        180: "IMPERADOR SUPREMO ÉPICO",
        185: "DEUS SUPREMO ÉPICO",
        190: "SUPREMO ABSOLUTO ÉPICO",
        195: "PRIMORDIAL SUPREMO ÉPICO",
        200: "MÁGICO SUPREMO ÉPICO",
        205: "MAGO LENDÁRIO",
        210: "ARQUIMAGO LENDÁRIO",
        215: "MESTRE LENDÁRIO DOS MAGOS",
        220: "LORDE LENDÁRIO MÁGICO",
        225: "REI LENDÁRIO DOS MAGOS",
        230: "IMPERADOR LENDÁRIO MÁGICO",
        235: "DEUS LENDÁRIO DA MAGIA",
        240: "SUPREMO LENDÁRIO MÁGICO",
        245: "PRIMORDIAL LENDÁRIO MÁGICO",
        250: "CÓSMICO LENDÁRIO MÁGICO",
        255: "MAGO SUPREMO LENDÁRIO",
        260: "ARQUIMAGO SUPREMO LENDÁRIO",
        265: "MESTRE SUPREMO LENDÁRIO",
        270: "LORDE SUPREMO LENDÁRIO",
        275: "REI SUPREMO LENDÁRIO",
        280: "IMPERADOR SUPREMO LENDÁRIO",
        285: "DEUS SUPREMO LENDÁRIO",
        290: "SUPREMO ABSOLUTO LENDÁRIO",
        295: "PRIMORDIAL SUPREMO LENDÁRIO",
        300: "CÓSMICO SUPREMO LENDÁRIO",
        305: "MAGO MÍTICO",
        310: "ARQUIMAGO MÍTICO",
        315: "MESTRE MÍTICO DOS MAGOS",
        320: "LORDE MÍTICO MÁGICO",
        325: "REI MÍTICO DOS MAGOS",
        330: "IMPERADOR MÍTICO MÁGICO",
        335: "DEUS MÍTICO DA MAGIA",
        340: "SUPREMO MÍTICO MÁGICO",
        345: "PRIMORDIAL MÍTICO MÁGICO",
        350: "CÓSMICO MÍTICO MÁGICO",
        355: "MAGO SUPREMO MÍTICO",
        360: "ARQUIMAGO SUPREMO MÍTICO",
        365: "MESTRE SUPREMO MÍTICO",
        370: "LORDE SUPREMO MÍTICO",
        375: "REI SUPREMO MÍTICO",
        380: "IMPERADOR SUPREMO MÍTICO",
        385: "DEUS SUPREMO MÍTICO",
        390: "SUPREMO ABSOLUTO MÍTICO",
        395: "PRIMORDIAL SUPREMO MÍTICO",
        400: "CÓSMICO SUPREMO MÍTICO",
        405: "MAGO CELESTIAL",
        410: "ARQUIMAGO CELESTIAL",
        415: "MESTRE CELESTIAL DOS MAGOS",
        420: "LORDE CELESTIAL MÁGICO",
        425: "REI CELESTIAL DOS MAGOS",
        430: "IMPERADOR CELESTIAL MÁGICO",
        435: "DEUS CELESTIAL DA MAGIA",
        440: "SUPREMO CELESTIAL MÁGICO",
        445: "PRIMORDIAL CELESTIAL MÁGICO",
        450: "CÓSMICO CELESTIAL MÁGICO",
        455: "MAGO SUPREMO CELESTIAL",
        460: "ARQUIMAGO SUPREMO CELESTIAL",
        465: "MESTRE SUPREMO CELESTIAL",
        470: "LORDE SUPREMO CELESTIAL",
        475: "REI SUPREMO CELESTIAL",
        480: "IMPERADOR SUPREMO CELESTIAL",
        485: "DEUS SUPREMO CELESTIAL",
        490: "SUPREMO ABSOLUTO CELESTIAL",
        495: "PRIMORDIAL SUPREMO CELESTIAL",
        500: "CÓSMICO SUPREMO CELESTIAL",

        // Níveis 550-5000: Títulos especiais (a cada 50)
        550: "TRANSCENDENTE MÁGICO",
        600: "ONIPOTENTE MÁGICO",
        650: "ONISCIENTE MÁGICO",
        700: "ONIPRESENTE MÁGICO",
        750: "INFINITO MÁGICO",
        800: "ETERNAL MÁGICO",
        850: "ABSOLUTO MÁGICO",
        900: "PRIMORDIAL MÁGICO",
        950: "CÓSMICO MÁGICO",
        1000: "UNIVERSAL MÁGICO",
        1050: "MULTIVERSAL MÁGICO",
        1100: "DIMENSIONAL MÁGICO",
        1150: "TEMPORAL MÁGICO",
        1200: "ESPACIAL MÁGICO",
        1250: "QUÂNTICO MÁGICO",
        1300: "RELATIVISTA MÁGICO",
        1350: "NUCLEAR MÁGICO",
        1400: "ATÔMICO MÁGICO",
        1450: "MOLECULAR MÁGICO",
        1500: "CELULAR MÁGICO",
        1550: "ORGANÍSTICO MÁGICO",
        1600: "BIOLÓGICO MÁGICO",
        1650: "PSÍQUICO MÁGICO",
        1700: "MENTAL MÁGICO",
        1750: "ESPIRITUAL MÁGICO",
        1800: "DIVINO MÁGICO",
        1850: "ANGELICAL MÁGICO",
        1900: "DEMONÍACO MÁGICO",
        1950: "LENDÁRIO MÁGICO",
        2000: "MÍTICO MÁGICO",
        2050: "ÉPICO MÁGICO",
        2100: "HERÓICO MÁGICO",
        2150: "LEGENDÁRIO MÁGICO",
        2200: "IMORTAL MÁGICO",
        2250: "ETERNAL MÁGICO",
        2300: "INFINITO MÁGICO",
        2350: "ABSOLUTO MÁGICO",
        2400: "PRIMORDIAL MÁGICO",
        2450: "CÓSMICO MÁGICO",
        2500: "UNIVERSAL MÁGICO",
        2550: "MULTIVERSAL MÁGICO",
        2600: "DIMENSIONAL MÁGICO",
        2650: "TEMPORAL MÁGICO",
        2700: "ESPACIAL MÁGICO",
        2750: "QUÂNTICO MÁGICO",
        2800: "RELATIVISTA MÁGICO",
        2850: "NUCLEAR MÁGICO",
        2900: "ATÔMICO MÁGICO",
        2950: "MOLECULAR MÁGICO",
        3000: "CELULAR MÁGICO",
        3050: "ORGANÍSTICO MÁGICO",
        3100: "BIOLÓGICO MÁGICO",
        3150: "PSÍQUICO MÁGICO",
        3200: "MENTAL MÁGICO",
        3250: "ESPIRITUAL MÁGICO",
        3300: "DIVINO MÁGICO",
        3350: "ANGELICAL MÁGICO",
        3400: "DEMONÍACO MÁGICO",
        3450: "LENDÁRIO MÁGICO",
        3500: "MÍTICO MÁGICO",
        3550: "ÉPICO MÁGICO",
        3600: "HERÓICO MÁGICO",
        3650: "LEGENDÁRIO MÁGICO",
        3700: "IMORTAL MÁGICO",
        3750: "ETERNAL MÁGICO",
        3800: "INFINITO MÁGICO",
        3850: "ABSOLUTO MÁGICO",
        3900: "PRIMORDIAL MÁGICO",
        3950: "CÓSMICO MÁGICO",
        4000: "UNIVERSAL MÁGICO",
        4050: "MULTIVERSAL MÁGICO",
        4100: "DIMENSIONAL MÁGICO",
        4150: "TEMPORAL MÁGICO",
        4200: "ESPACIAL MÁGICO",
        4250: "QUÂNTICO MÁGICO",
        4300: "RELATIVISTA MÁGICO",
        4350: "NUCLEAR MÁGICO",
        4400: "ATÔMICO MÁGICO",
        4450: "MOLECULAR MÁGICO",
        4500: "CELULAR MÁGICO",
        4550: "ORGANÍSTICO MÁGICO",
        4600: "BIOLÓGICO MÁGICO",
        4650: "PSÍQUICO MÁGICO",
        4700: "MENTAL MÁGICO",
        4750: "ESPIRITUAL MÁGICO",
        4800: "DIVINO MÁGICO",
        4850: "ANGELICAL MÁGICO",
        4900: "DEMONÍACO MÁGICO",
        4950: "LENDÁRIO MÁGICO",
        5000: "MÁGICO SUPREMO UNIVERSAL",
      },
      en: {
        // Níveis 1-4: Beginner
        1: "APPRENTICE",
        2: "APPRENTICE",
        3: "APPRENTICE",
        4: "APPRENTICE",

        // Níveis 5-100: Magical (every 5)
        5: "MAGE",
        10: "ARCHMAGE",
        15: "MASTER OF MAGES",
        20: "MAGIC LORD",
        25: "KING OF MAGES",
        30: "MAGIC EMPEROR",
        35: "GOD OF MAGIC",
        40: "MAGIC SUPREME",
        45: "PRIMORDIAL MAGE",
        50: "COSMIC MAGE",
        55: "SUPREME MAGE",
        60: "SUPREME ARCHMAGE",
        65: "SUPREME MASTER OF MAGES",
        70: "SUPREME MAGIC LORD",
        75: "SUPREME KING OF MAGES",
        80: "SUPREME MAGIC EMPEROR",
        85: "SUPREME GOD OF MAGIC",
        90: "ABSOLUTE SUPREME MAGE",
        95: "SUPREME PRIMORDIAL MAGE",
        100: "SUPREME COSMIC MAGE",

        // Níveis 105-500: Epic Magical (every 5)
        105: "EPIC MAGE",
        110: "EPIC ARCHMAGE",
        115: "EPIC MASTER OF MAGES",
        120: "EPIC MAGIC LORD",
        125: "EPIC KING OF MAGES",
        130: "EPIC MAGIC EMPEROR",
        135: "EPIC GOD OF MAGIC",
        140: "EPIC SUPREME MAGE",
        145: "EPIC PRIMORDIAL MAGE",
        150: "EPIC COSMIC MAGE",
        155: "EPIC SUPREME MAGE",
        160: "EPIC SUPREME ARCHMAGE",
        165: "EPIC SUPREME MASTER",
        170: "EPIC SUPREME LORD",
        175: "EPIC SUPREME KING",
        180: "EPIC SUPREME EMPEROR",
        185: "EPIC SUPREME GOD",
        190: "EPIC ABSOLUTE SUPREME",
        195: "EPIC SUPREME PRIMORDIAL",
        200: "EPIC SUPREME MAGE",
        205: "LEGENDARY MAGE",
        210: "LEGENDARY ARCHMAGE",
        215: "LEGENDARY MASTER OF MAGES",
        220: "LEGENDARY MAGIC LORD",
        225: "LEGENDARY KING OF MAGES",
        230: "LEGENDARY MAGIC EMPEROR",
        235: "LEGENDARY GOD OF MAGIC",
        240: "LEGENDARY SUPREME MAGE",
        245: "LEGENDARY PRIMORDIAL MAGE",
        250: "LEGENDARY COSMIC MAGE",
        255: "LEGENDARY SUPREME MAGE",
        260: "LEGENDARY SUPREME ARCHMAGE",
        265: "LEGENDARY SUPREME MASTER",
        270: "LEGENDARY SUPREME LORD",
        275: "LEGENDARY SUPREME KING",
        280: "LEGENDARY SUPREME EMPEROR",
        285: "LEGENDARY SUPREME GOD",
        290: "LEGENDARY ABSOLUTE SUPREME",
        295: "LEGENDARY SUPREME PRIMORDIAL",
        300: "LEGENDARY SUPREME COSMIC",
        305: "MYTHIC MAGE",
        310: "MYTHIC ARCHMAGE",
        315: "MYTHIC MASTER OF MAGES",
        320: "MYTHIC MAGIC LORD",
        325: "MYTHIC KING OF MAGES",
        330: "MYTHIC MAGIC EMPEROR",
        335: "MYTHIC GOD OF MAGIC",
        340: "MYTHIC SUPREME MAGE",
        345: "MYTHIC PRIMORDIAL MAGE",
        350: "MYTHIC COSMIC MAGE",
        355: "MYTHIC SUPREME MAGE",
        360: "MYTHIC SUPREME ARCHMAGE",
        365: "MYTHIC SUPREME MASTER",
        370: "MYTHIC SUPREME LORD",
        375: "MYTHIC SUPREME KING",
        380: "MYTHIC SUPREME EMPEROR",
        385: "MYTHIC SUPREME GOD",
        390: "MYTHIC ABSOLUTE SUPREME",
        395: "MYTHIC SUPREME PRIMORDIAL",
        400: "MYTHIC SUPREME COSMIC",
        405: "CELESTIAL MAGE",
        410: "CELESTIAL ARCHMAGE",
        415: "CELESTIAL MASTER OF MAGES",
        420: "CELESTIAL MAGIC LORD",
        425: "CELESTIAL KING OF MAGES",
        430: "CELESTIAL MAGIC EMPEROR",
        435: "CELESTIAL GOD OF MAGIC",
        440: "CELESTIAL SUPREME MAGE",
        445: "CELESTIAL PRIMORDIAL MAGE",
        450: "CELESTIAL COSMIC MAGE",
        455: "CELESTIAL SUPREME MAGE",
        460: "CELESTIAL SUPREME ARCHMAGE",
        465: "CELESTIAL SUPREME MASTER",
        470: "CELESTIAL SUPREME LORD",
        475: "CELESTIAL SUPREME KING",
        480: "CELESTIAL SUPREME EMPEROR",
        485: "CELESTIAL SUPREME GOD",
        490: "CELESTIAL ABSOLUTE SUPREME",
        495: "CELESTIAL SUPREME PRIMORDIAL",
        500: "CELESTIAL SUPREME COSMIC",

        // Níveis 550-5000: Special titles (every 50)
        550: "TRANSCENDENT MAGE",
        600: "OMNIPOTENT MAGE",
        650: "OMNISCIENT MAGE",
        700: "OMNIPRESENT MAGE",
        750: "INFINITE MAGE",
        800: "ETERNAL MAGE",
        850: "ABSOLUTE MAGE",
        900: "PRIMORDIAL MAGE",
        950: "COSMIC MAGE",
        1000: "UNIVERSAL MAGE",
        1050: "MULTIVERSAL MAGE",
        1100: "DIMENSIONAL MAGE",
        1150: "TEMPORAL MAGE",
        1200: "SPATIAL MAGE",
        1250: "QUANTUM MAGE",
        1300: "RELATIVISTIC MAGE",
        1350: "NUCLEAR MAGE",
        1400: "ATOMIC MAGE",
        1450: "MOLECULAR MAGE",
        1500: "CELLULAR MAGE",
        1550: "ORGANIC MAGE",
        1600: "BIOLOGICAL MAGE",
        1650: "PSYCHIC MAGE",
        1700: "MENTAL MAGE",
        1750: "SPIRITUAL MAGE",
        1800: "DIVINE MAGE",
        1850: "ANGELIC MAGE",
        1900: "DEMONIC MAGE",
        1950: "LEGENDARY MAGE",
        2000: "MYTHIC MAGE",
        2050: "EPIC MAGE",
        2100: "HEROIC MAGE",
        2150: "LEGENDARY MAGE",
        2200: "IMMORTAL MAGE",
        2250: "ETERNAL MAGE",
        2300: "INFINITE MAGE",
        2350: "ABSOLUTE MAGE",
        2400: "PRIMORDIAL MAGE",
        2450: "COSMIC MAGE",
        2500: "UNIVERSAL MAGE",
        2550: "MULTIVERSAL MAGE",
        2600: "DIMENSIONAL MAGE",
        2650: "TEMPORAL MAGE",
        2700: "SPATIAL MAGE",
        2750: "QUANTUM MAGE",
        2800: "RELATIVISTIC MAGE",
        2850: "NUCLEAR MAGE",
        2900: "ATOMIC MAGE",
        2950: "MOLECULAR MAGE",
        3000: "CELLULAR MAGE",
        3050: "ORGANIC MAGE",
        3100: "BIOLOGICAL MAGE",
        3150: "PSYCHIC MAGE",
        3200: "MENTAL MAGE",
        3250: "SPIRITUAL MAGE",
        3300: "DIVINE MAGE",
        3350: "ANGELIC MAGE",
        3400: "DEMONIC MAGE",
        3450: "LEGENDARY MAGE",
        3500: "MYTHIC MAGE",
        3550: "EPIC MAGE",
        3600: "HEROIC MAGE",
        3650: "LEGENDARY MAGE",
        3700: "IMMORTAL MAGE",
        3750: "ETERNAL MAGE",
        3800: "INFINITE MAGE",
        3850: "ABSOLUTE MAGE",
        3900: "PRIMORDIAL MAGE",
        3950: "COSMIC MAGE",
        4000: "UNIVERSAL MAGE",
        4050: "MULTIVERSAL MAGE",
        4100: "DIMENSIONAL MAGE",
        4150: "TEMPORAL MAGE",
        4200: "SPATIAL MAGE",
        4250: "QUANTUM MAGE",
        4300: "RELATIVISTIC MAGE",
        4350: "NUCLEAR MAGE",
        4400: "ATOMIC MAGE",
        4450: "MOLECULAR MAGE",
        4500: "CELLULAR MAGE",
        4550: "ORGANIC MAGE",
        4600: "BIOLOGICAL MAGE",
        4650: "PSYCHIC MAGE",
        4700: "MENTAL MAGE",
        4750: "SPIRITUAL MAGE",
        4800: "DIVINE MAGE",
        4850: "ANGELIC MAGE",
        4900: "DEMONIC MAGE",
        4950: "LEGENDARY MAGE",
        5000: "UNIVERSAL SUPREME MAGE",
      },
    };

    const langTitles = titles[language as keyof typeof titles] || titles.pt;

    // Encontrar o título mais próximo
    for (let i = level; i >= 1; i--) {
      if (langTitles[i as keyof typeof langTitles]) {
        return langTitles[i as keyof typeof langTitles];
      }
    }

    // Fallback para níveis acima de 5000
    return language === "pt"
      ? "MÁGICO SUPREMO UNIVERSAL"
      : "UNIVERSAL SUPREME MAGE";
  };

  const levelTitle = getLevelTitle(userLevel, language);

  // Função para gerar escudo baseado no nível
  const generateShieldAvatar = (level: number, theme: Theme) => {
    // Usar o nível como seed para consistência
    const seed = level;

    // Definir faixas de níveis com características específicas - design melhorado para maior clareza visual
    const getShieldTier = (level: number) => {
      if (level <= 5)
        return {
          tier: "bronze_basic",
          color: "#8B4513",
          glow: false,
          gems: 0,
          pattern: "simple",
        };
      if (level <= 10)
        return {
          tier: "bronze",
          color: "#CD7F32",
          glow: false,
          gems: 1,
          pattern: "lines",
        };
      if (level <= 15)
        return {
          tier: "bronze_enhanced",
          color: "#B8860B",
          glow: false,
          gems: 1,
          pattern: "decorated",
        };
      if (level <= 25)
        return {
          tier: "bronze_superior",
          color: "#DAA520",
          glow: false,
          gems: 2,
          pattern: "floral",
        };
      if (level <= 35)
        return {
          tier: "silver_basic",
          color: "#A8A8A8",
          glow: false,
          gems: 2,
          pattern: "ornate",
        };
      if (level <= 50)
        return {
          tier: "silver",
          color: "#C0C0C0",
          glow: false,
          gems: 2,
          pattern: "crown",
        };
      if (level <= 65)
        return {
          tier: "silver_enhanced",
          color: "#D3D3D3",
          glow: true,
          gems: 3,
          pattern: "royal",
        };
      if (level <= 80)
        return {
          tier: "silver_superior",
          color: "#E6E6FA",
          glow: true,
          gems: 3,
          pattern: "wings",
        };
      if (level <= 100)
        return {
          tier: "gold_basic",
          color: "#FFD700",
          glow: true,
          gems: 3,
          pattern: "divine",
        };
      if (level <= 120)
        return {
          tier: "gold",
          color: "#FFA500",
          glow: true,
          gems: 4,
          pattern: "dragon",
        };
      if (level <= 140)
        return {
          tier: "gold_enhanced",
          color: "#FF8C00",
          glow: true,
          gems: 4,
          pattern: "legendary",
        };
      if (level <= 160)
        return {
          tier: "gold_superior",
          color: "#FF7F50",
          glow: true,
          gems: 5,
          pattern: "epic",
        };
      if (level <= 180)
        return {
          tier: "platinum_basic",
          color: "#E5E4E2",
          glow: true,
          gems: 5,
          pattern: "cosmic",
        };
      if (level <= 200)
        return {
          tier: "platinum",
          color: "#F8F8FF",
          glow: true,
          gems: 5,
          pattern: "universal",
        };
      if (level <= 220)
        return {
          tier: "platinum_enhanced",
          color: "#FFFFFF",
          glow: true,
          gems: 6,
          pattern: "phoenix",
        };
      if (level <= 250)
        return {
          tier: "platinum_superior",
          color: "#F0F8FF",
          glow: true,
          gems: 6,
          pattern: "stars",
        };
      if (level <= 280)
        return {
          tier: "diamond_basic",
          color: "#B9F2FF",
          glow: true,
          gems: 6,
          pattern: "infinity",
        };
      if (level <= 320)
        return {
          tier: "diamond",
          color: "#00BFFF",
          glow: true,
          gems: 7,
          pattern: "supreme",
        };
      if (level <= 360)
        return {
          tier: "diamond_enhanced",
          color: "#1E90FF",
          glow: true,
          gems: 7,
          pattern: "supreme",
        };
      if (level <= 400)
        return {
          tier: "diamond_superior",
          color: "#4169E1",
          glow: true,
          gems: 8,
          pattern: "supreme",
        };
      if (level <= 450)
        return {
          tier: "mythril_basic",
          color: "#8A2BE2",
          glow: true,
          gems: 8,
          pattern: "supreme",
        };
      if (level <= 500)
        return {
          tier: "mythril",
          color: "#9932CC",
          glow: true,
          gems: 8,
          pattern: "supreme",
        };
      if (level <= 600)
        return {
          tier: "mythril_enhanced",
          color: "#DA70D6",
          glow: true,
          gems: 9,
          pattern: "supreme",
        };
      if (level <= 700)
        return {
          tier: "mythril_superior",
          color: "#FF69B4",
          glow: true,
          gems: 9,
          pattern: "supreme",
        };
      if (level <= 800)
        return {
          tier: "adamant_basic",
          color: "#00FF41",
          glow: true,
          gems: 9,
          pattern: "supreme",
        };
      if (level <= 900)
        return {
          tier: "adamant",
          color: "#32CD32",
          glow: true,
          gems: 10,
          pattern: "supreme",
        };
      if (level <= 1000)
        return {
          tier: "adamant_enhanced",
          color: "#00FF00",
          glow: true,
          gems: 10,
          pattern: "supreme",
        };
      if (level <= 1200)
        return {
          tier: "adamant_superior",
          color: "#7FFF00",
          glow: true,
          gems: 11,
          pattern: "supreme",
        };
      if (level <= 1400)
        return {
          tier: "void_basic",
          color: "#000000",
          glow: true,
          gems: 11,
          pattern: "supreme",
        };
      if (level <= 1600)
        return {
          tier: "void",
          color: "#1C1C1C",
          glow: true,
          gems: 12,
          pattern: "supreme",
        };
      if (level <= 1800)
        return {
          tier: "void_enhanced",
          color: "#2F2F2F",
          glow: true,
          gems: 12,
          pattern: "supreme",
        };
      if (level <= 2000)
        return {
          tier: "void_superior",
          color: "#404040",
          glow: true,
          gems: 13,
          pattern: "supreme",
        };
      if (level <= 2300)
        return {
          tier: "transcendent_basic",
          color: "#FF00FF",
          glow: true,
          gems: 13,
          pattern: "supreme",
        };
      if (level <= 2600)
        return {
          tier: "transcendent",
          color: "#FF1493",
          glow: true,
          gems: 14,
          pattern: "supreme",
        };
      if (level <= 2900)
        return {
          tier: "transcendent_enhanced",
          color: "#FF69B4",
          glow: true,
          gems: 14,
          pattern: "supreme",
        };
      if (level <= 3200)
        return {
          tier: "transcendent_superior",
          color: "#FFB6C1",
          glow: true,
          gems: 15,
          pattern: "supreme",
        };
      if (level <= 3600)
        return {
          tier: "celestial_basic",
          color: "#00FFFF",
          glow: true,
          gems: 15,
          pattern: "supreme",
        };
      if (level <= 4000)
        return {
          tier: "celestial",
          color: "#87CEEB",
          glow: true,
          gems: 16,
          pattern: "supreme",
        };
      if (level <= 4500)
        return {
          tier: "celestial_enhanced",
          color: "#B0E0E6",
          glow: true,
          gems: 16,
          pattern: "supreme",
        };
      if (level <= 4800)
        return {
          tier: "celestial_superior",
          color: "#E0FFFF",
          glow: true,
          gems: 17,
          pattern: "supreme",
        };
      if (level <= 4950)
        return {
          tier: "divine_basic",
          color: "#FFD700",
          glow: true,
          gems: 17,
          pattern: "supreme",
        };
      if (level <= 4990)
        return {
          tier: "divine",
          color: "#FFA500",
          glow: true,
          gems: 18,
          pattern: "supreme",
        };
      if (level <= 4999)
        return {
          tier: "divine_enhanced",
          color: "#FF8C00",
          glow: true,
          gems: 18,
          pattern: "supreme",
        };
      // Nível 5000 é especial e único - escudo majestoso
      return {
        tier: "supreme_majestic",
        color: "#FFD700",
        glow: true,
        gems: 20,
        pattern: "majestic",
      };
    };

    const shieldTier = getShieldTier(level);

    // Cores baseadas no tier - design melhorado para maior contraste e hierarquia visual
    const tierColors = {
      bronze_basic: ["#8B4513", "#A0522D", "#CD7F32"],
      bronze: ["#CD7F32", "#B8860B", "#DAA520"],
      bronze_enhanced: ["#B8860B", "#DAA520", "#FF8C00"],
      bronze_superior: ["#DAA520", "#FF8C00", "#FFA500"],
      silver_basic: ["#A8A8A8", "#C0C0C0", "#D3D3D3"],
      silver: ["#C0C0C0", "#D3D3D3", "#E6E6FA"],
      silver_enhanced: ["#D3D3D3", "#E6E6FA", "#F0F8FF"],
      silver_superior: ["#E6E6FA", "#F0F8FF", "#FFFFFF"],
      gold_basic: ["#FFD700", "#FFA500", "#FF8C00"],
      gold: ["#FFA500", "#FF8C00", "#FF7F50"],
      gold_enhanced: ["#FF8C00", "#FF7F50", "#FF6347"],
      gold_superior: ["#FF7F50", "#FF6347", "#FF4500"],
      platinum_basic: ["#E5E4E2", "#F0F0F0", "#FFFFFF"],
      platinum: ["#F0F0F0", "#FFFFFF", "#F8F8FF"],
      platinum_enhanced: ["#FFFFFF", "#F8F8FF", "#E6E6FA"],
      platinum_superior: ["#F8F8FF", "#E6E6FA", "#D3D3D3"],
      diamond_basic: ["#87CEEB", "#00BFFF", "#1E90FF"],
      diamond: ["#00BFFF", "#1E90FF", "#4169E1"],
      diamond_enhanced: ["#1E90FF", "#4169E1", "#0000FF"],
      diamond_superior: ["#4169E1", "#0000FF", "#0000CD"],
      mythril_basic: ["#8A2BE2", "#9932CC", "#DA70D6"],
      mythril: ["#9932CC", "#DA70D6", "#FF69B4"],
      mythril_enhanced: ["#DA70D6", "#FF69B4", "#FF1493"],
      mythril_superior: ["#FF69B4", "#FF1493", "#FF00FF"],
      adamant_basic: ["#00FF41", "#32CD32", "#00FF00"],
      adamant: ["#32CD32", "#00FF00", "#7FFF00"],
      adamant_enhanced: ["#00FF00", "#7FFF00", "#ADFF2F"],
      adamant_superior: ["#7FFF00", "#ADFF2F", "#FFFF00"],
      void_basic: ["#000000", "#1C1C1C", "#2F2F2F"],
      void: ["#1C1C1C", "#2F2F2F", "#404040"],
      void_enhanced: ["#2F2F2F", "#404040", "#696969"],
      void_superior: ["#404040", "#696969", "#808080"],
      transcendent_basic: ["#FF00FF", "#FF1493", "#FF69B4"],
      transcendent: ["#FF1493", "#FF69B4", "#FFB6C1"],
      transcendent_enhanced: ["#FF69B4", "#FFB6C1", "#FFC0CB"],
      transcendent_superior: ["#FFB6C1", "#FFC0CB", "#FFE4E1"],
      celestial_basic: ["#00FFFF", "#87CEEB", "#B0E0E6"],
      celestial: ["#87CEEB", "#B0E0E6", "#E0FFFF"],
      celestial_enhanced: ["#B0E0E6", "#E0FFFF", "#F0FFFF"],
      celestial_superior: ["#E0FFFF", "#F0FFFF", "#FFFFFF"],
      divine_basic: ["#FFD700", "#FFA500", "#FF8C00"],
      divine: ["#FFA500", "#FF8C00", "#FF7F50"],
      divine_enhanced: ["#FF8C00", "#FF7F50", "#FF6347"],
      supreme_majestic: ["#FFD700", "#FFA500", "#FF8C00", "#FFD700", "#FFFF00"], // Nível 5000 especial com 5 cores
    };

    const shieldColors = tierColors[shieldTier.tier as keyof typeof tierColors];
    const primaryColor = shieldColors[0];
    const secondaryColor = shieldColors[1];
    const accentColor = shieldColors[2];
    // Para o escudo majestoso (nível 5000), usar cores especiais
    const majesticColor1 = shieldColors[3] || shieldColors[0];
    const majesticColor2 = shieldColors[4] || shieldColors[1];

    // Padrões baseados no tier
    const patterns = {
      simple: "basic",
      lines: "lines",
      decorated: "decorated",
      floral: "floral",
      ornate: "ornate",
      crown: "crown",
      royal: "royal",
      wings: "wings",
      divine: "divine",
      dragon: "dragon",
      legendary: "legendary",
      epic: "epic",
      cosmic: "cosmic",
      universal: "universal",
      supreme: "supreme",
      majestic: "majestic", // Padrão especial e majestoso para nível 5000
    };

    const pattern = patterns[shieldTier.pattern as keyof typeof patterns];

    // Gemas baseadas no nível (progressão gradativa)
    const getGems = (level: number) => {
      const gems = [];
      const gemColors = [
        "#FF0000",
        "#00FF00",
        "#0000FF",
        "#FFFF00",
        "#FF00FF",
        "#00FFFF",
        "#FFA500",
        "#800080",
      ];

      for (let i = 0; i < shieldTier.gems; i++) {
        gems.push({
          color: gemColors[i % gemColors.length],
          size: 1 + i * 0.2,
          position: i,
        });
      }
      return gems;
    };

    const gems = getGems(level);

    // Efeitos especiais baseados no nível
    const hasInnerGlow = level > 100;
    const hasOuterGlow = level > 500;
    const hasParticles = level > 1000;
    const hasAura = level > 2000;
    const hasCosmicEffect = level > 3000;
    const hasTranscendentEffect = level > 4000;

    return `
      <g transform="translate(40, 5)">
        <!-- Aura externa para níveis altos (contida no card) -->
        ${
          hasAura
            ? `
          <defs>
            <radialGradient id="auraGradient-${level}" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:0.4" />
              <stop offset="50%" style="stop-color:${primaryColor};stop-opacity:0.2" />
              <stop offset="100%" style="stop-color:${primaryColor};stop-opacity:0" />
            </radialGradient>
          </defs>
          <circle cx="20" cy="20" r="22" fill="url(#auraGradient-${level})" filter="url(#shieldGlow)">
            <animate attributeName="r" values="20;24;20" dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite"/>
          </circle>
        `
            : ""
        }
        
        <!-- Efeito cósmico para níveis muito altos (contido no card) -->
        ${
          hasCosmicEffect
            ? `
          <circle cx="20" cy="20" r="20" fill="none" stroke="${primaryColor}" stroke-width="1.5" opacity="0.4">
            <animate attributeName="r" values="18;22;18" dur="4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="20" cy="20" r="16" fill="none" stroke="${primaryColor}" stroke-width="1" opacity="0.6">
            <animate attributeName="r" values="14;18;14" dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="20" cy="20" r="12" fill="none" stroke="${primaryColor}" stroke-width="0.5" opacity="0.8">
            <animate attributeName="r" values="10;14;10" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite"/>
          </circle>
        `
            : ""
        }
        
        <!-- Efeito transcendente (contido no card) -->
        ${
          hasTranscendentEffect
            ? `
          <circle cx="20" cy="20" r="24" fill="none" stroke="${primaryColor}" stroke-width="1" opacity="0.3">
            <animate attributeName="r" values="22;26;22" dur="5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.1;0.4;0.1" dur="4s" repeatCount="indefinite"/>
          </circle>
          <circle cx="20" cy="20" r="20" fill="none" stroke="${primaryColor}" stroke-width="1" opacity="0.4">
            <animate attributeName="r" values="18;22;18" dur="4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="20" cy="20" r="16" fill="none" stroke="${primaryColor}" stroke-width="1" opacity="0.5">
            <animate attributeName="r" values="14;18;14" dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="20" cy="20" r="12" fill="none" stroke="${primaryColor}" stroke-width="1" opacity="0.6">
            <animate attributeName="r" values="10;14;10" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="1.5s" repeatCount="indefinite"/>
          </circle>
        `
            : ""
        }
        
        <!-- Efeito majestoso supremo para nível 5000 (contido no card) -->
        ${
          level === 5000
            ? `
          <!-- Aura majestosa com múltiplas camadas animadas -->
          <circle cx="20" cy="20" r="28" fill="none" stroke="#FFD700" stroke-width="2.5" opacity="0.7" filter="url(#majesticGlow)">
            <animate attributeName="r" values="26;30;26" dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="20" cy="20" r="24" fill="none" stroke="#FFA500" stroke-width="2" opacity="0.8">
            <animate attributeName="r" values="22;26;22" dur="2.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;0.9;0.6" dur="1.8s" repeatCount="indefinite"/>
          </circle>
          <circle cx="20" cy="20" r="20" fill="none" stroke="#FF8C00" stroke-width="1.5" opacity="0.9">
            <animate attributeName="r" values="18;22;18" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="20" cy="20" r="16" fill="none" stroke="#FFD700" stroke-width="1" opacity="1">
            <animate attributeName="r" values="14;18;14" dur="1.5s" repeatCount="indefinite"/>
          </circle>
          
          <!-- Partículas douradas flutuantes animadas -->
          <circle cx="20" cy="8" r="0.8" fill="#FFD700" opacity="0.9">
            <animate attributeName="cy" values="8;6;8" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="32" cy="20" r="0.6" fill="#FFA500" opacity="0.8">
            <animate attributeName="cx" values="32;34;32" dur="2.2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;0.9;0.6" dur="1.7s" repeatCount="indefinite"/>
          </circle>
          <circle cx="20" cy="32" r="0.8" fill="#FFD700" opacity="0.9">
            <animate attributeName="cy" values="32;34;32" dur="2.1s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.7;1;0.7" dur="1.6s" repeatCount="indefinite"/>
          </circle>
          <circle cx="8" cy="20" r="0.6" fill="#FFA500" opacity="0.8">
            <animate attributeName="cx" values="8;6;8" dur="2.3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;0.9;0.6" dur="1.8s" repeatCount="indefinite"/>
          </circle>
          <circle cx="28" cy="12" r="0.5" fill="#FFFF00" opacity="0.7">
            <animate attributeName="r" values="0.3;0.7;0.3" dur="1.8s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.5;0.8;0.5" dur="1.4s" repeatCount="indefinite"/>
          </circle>
          <circle cx="28" cy="28" r="0.5" fill="#FFFF00" opacity="0.7">
            <animate attributeName="r" values="0.3;0.7;0.3" dur="1.9s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.5;0.8;0.5" dur="1.3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="12" cy="12" r="0.5" fill="#FFFF00" opacity="0.7">
            <animate attributeName="r" values="0.3;0.7;0.3" dur="1.7s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.5;0.8;0.5" dur="1.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="12" cy="28" r="0.5" fill="#FFFF00" opacity="0.7">
            <animate attributeName="r" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.5;0.8;0.5" dur="1.2s" repeatCount="indefinite"/>
          </circle>
          
          <!-- Raios de luz majestosos animados -->
          <line x1="20" y1="5" x2="20" y2="10" stroke="#FFD700" stroke-width="1.5" opacity="0.8">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite"/>
          </line>
          <line x1="35" y1="20" x2="30" y2="20" stroke="#FFD700" stroke-width="1.5" opacity="0.8">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="1.6s" repeatCount="indefinite"/>
          </line>
          <line x1="20" y1="35" x2="20" y2="30" stroke="#FFD700" stroke-width="1.5" opacity="0.8">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="1.4s" repeatCount="indefinite"/>
          </line>
          <line x1="5" y1="20" x2="10" y2="20" stroke="#FFD700" stroke-width="1.5" opacity="0.8">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="1.7s" repeatCount="indefinite"/>
          </line>
          <line x1="26" y1="10" x2="28" y2="12" stroke="#FFA500" stroke-width="1" opacity="0.7">
            <animate attributeName="opacity" values="0.5;0.8;0.5" dur="1.3s" repeatCount="indefinite"/>
          </line>
          <line x1="28" y1="28" x2="26" y2="30" stroke="#FFA500" stroke-width="1" opacity="0.7">
            <animate attributeName="opacity" values="0.5;0.8;0.5" dur="1.8s" repeatCount="indefinite"/>
          </line>
          <line x1="14" y1="30" x2="12" y2="28" stroke="#FFA500" stroke-width="1" opacity="0.7">
            <animate attributeName="opacity" values="0.5;0.8;0.5" dur="1.2s" repeatCount="indefinite"/>
          </line>
          <line x1="12" y1="12" x2="14" y2="10" stroke="#FFA500" stroke-width="1" opacity="0.7">
            <animate attributeName="opacity" values="0.5;0.8;0.5" dur="1.9s" repeatCount="indefinite"/>
          </line>
        `
            : ""
        }
        
        <!-- Base do escudo com gradiente -->
        <defs>
          ${
            level === 5000
              ? `
          <!-- Gradiente majestoso especial para nível 5000 -->
          <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:${majesticColor1};stop-opacity:1" />
            <stop offset="25%" style="stop-color:${majesticColor2};stop-opacity:0.95" />
            <stop offset="50%" style="stop-color:${primaryColor};stop-opacity:0.9" />
            <stop offset="75%" style="stop-color:${majesticColor2};stop-opacity:0.95" />
            <stop offset="100%" style="stop-color:${majesticColor1};stop-opacity:1" />
          </linearGradient>
          <radialGradient id="majesticGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#FFD700;stop-opacity:0.8" />
            <stop offset="50%" style="stop-color:#FFA500;stop-opacity:0.4" />
            <stop offset="100%" style="stop-color:#FF8C00;stop-opacity:0.1" />
          </radialGradient>
          `
              : `
          <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
            <stop offset="50%" style="stop-color:${secondaryColor};stop-opacity:0.9" />
            <stop offset="100%" style="stop-color:${accentColor};stop-opacity:0.8" />
          </linearGradient>
          `
          }
        </defs>
        
        <!-- Forma principal do escudo (clássico medieval - pontudo embaixo, reto em cima) -->
        <path d="M 8 8 L 32 8 L 32 16 L 30 24 L 20 36 L 10 24 L 8 16 Z" fill="url(#shieldGradient)" stroke="${primaryColor}" stroke-width="2"/>
        
        ${
          level === 5000
            ? `
        <!-- Brilho majestoso especial para nível 5000 -->
        <path d="M 8 8 L 32 8 L 32 16 L 30 24 L 20 36 L 10 24 L 8 16 Z" fill="url(#majesticGlow)" opacity="0.3"/>
        `
            : ""
        }
        
        <!-- Borda interna -->
        <path d="M 10 10 L 30 10 L 30 16 L 28 22 L 20 32 L 12 22 L 10 16 Z" fill="none" stroke="${secondaryColor}" stroke-width="1.5" opacity="0.8"/>
        
        <!-- Padrão interno baseado no tier - design melhorado para maior clareza -->
        ${
          pattern === "simple"
            ? `
          <circle cx="20" cy="20" r="4" fill="${accentColor}" opacity="0.6"/>
          <circle cx="20" cy="20" r="2" fill="${accentColor}" opacity="0.8"/>
        `
            : pattern === "lines"
            ? `
          <line x1="20" y1="12" x2="20" y2="28" stroke="${accentColor}" stroke-width="1.5" opacity="0.8"/>
          <line x1="12" y1="20" x2="28" y2="20" stroke="${accentColor}" stroke-width="1.5" opacity="0.8"/>
          <circle cx="20" cy="20" r="2" fill="${accentColor}" opacity="0.6"/>
        `
            : pattern === "decorated"
            ? `
          <rect x="16" y="16" width="8" height="8" fill="${accentColor}" opacity="0.7" rx="1"/>
          <circle cx="20" cy="20" r="2" fill="${accentColor}" opacity="0.9"/>
          <path d="M 12 12 L 14 14 L 12 16 L 10 14 Z" fill="${accentColor}" opacity="0.5"/>
          <path d="M 28 12 L 30 14 L 28 16 L 26 14 Z" fill="${accentColor}" opacity="0.5"/>
          <path d="M 12 24 L 14 26 L 12 28 L 10 26 Z" fill="${accentColor}" opacity="0.5"/>
          <path d="M 28 24 L 30 26 L 28 28 L 26 26 Z" fill="${accentColor}" opacity="0.5"/>
        `
            : pattern === "floral"
            ? `
          <circle cx="20" cy="18" r="3" fill="${accentColor}" opacity="0.8"/>
          <circle cx="16" cy="14" r="1.5" fill="${accentColor}" opacity="0.6"/>
          <circle cx="24" cy="14" r="1.5" fill="${accentColor}" opacity="0.6"/>
          <circle cx="16" cy="22" r="1.5" fill="${accentColor}" opacity="0.6"/>
          <circle cx="24" cy="22" r="1.5" fill="${accentColor}" opacity="0.6"/>
          <path d="M 20 15 L 20 21" stroke="${accentColor}" stroke-width="1" opacity="0.7"/>
        `
            : pattern === "crown"
            ? `
          <path d="M 12 16 L 15 13 L 18 16 L 20 10 L 22 16 L 25 13 L 28 16" stroke="${accentColor}" stroke-width="2" fill="none" opacity="0.9"/>
          <circle cx="20" cy="10" r="2" fill="${accentColor}" opacity="1"/>
          <circle cx="15" cy="13" r="1" fill="${accentColor}" opacity="0.8"/>
          <circle cx="25" cy="13" r="1" fill="${accentColor}" opacity="0.8"/>
        `
            : pattern === "wings"
            ? `
          <path d="M 15 13 Q 20 8 25 13" stroke="${accentColor}" stroke-width="2.5" fill="none" opacity="0.8"/>
          <path d="M 15 23 Q 20 28 25 23" stroke="${accentColor}" stroke-width="2.5" fill="none" opacity="0.8"/>
          <circle cx="20" cy="18" r="2" fill="${accentColor}" opacity="0.7"/>
        `
            : pattern === "dragon"
            ? `
          <path d="M 12 18 Q 16 14 20 18 Q 24 14 28 18" stroke="${accentColor}" stroke-width="2.5" fill="none" opacity="0.9"/>
          <circle cx="20" cy="18" r="2.5" fill="${accentColor}" opacity="0.7"/>
          <circle cx="16" cy="16" r="1" fill="${accentColor}" opacity="0.6"/>
          <circle cx="24" cy="16" r="1" fill="${accentColor}" opacity="0.6"/>
        `
            : pattern === "phoenix"
            ? `
          <path d="M 20 10 Q 25 14 20 18 Q 15 14 20 10" stroke="${accentColor}" stroke-width="2.5" fill="none" opacity="0.9"/>
          <path d="M 20 18 Q 25 22 20 26 Q 15 22 20 18" stroke="${accentColor}" stroke-width="2.5" fill="none" opacity="0.9"/>
          <circle cx="20" cy="18" r="2" fill="${accentColor}" opacity="0.8"/>
        `
            : pattern === "ornate"
            ? `
          <path d="M 20 8 L 22 12 L 26 12 L 23 15 L 24 19 L 20 17 L 16 19 L 17 15 L 14 12 L 18 12 Z" fill="${accentColor}" opacity="0.9"/>
          <circle cx="20" cy="22" r="2" fill="${accentColor}" opacity="0.7"/>
          <path d="M 12 16 L 14 18 L 12 20 L 10 18 Z" fill="${accentColor}" opacity="0.6"/>
          <path d="M 28 16 L 30 18 L 28 20 L 26 18 Z" fill="${accentColor}" opacity="0.6"/>
        `
            : pattern === "royal"
            ? `
          <path d="M 20 6 L 22 10 L 26 10 L 23 13 L 24 17 L 20 15 L 16 17 L 17 13 L 14 10 L 18 10 Z" fill="${accentColor}" opacity="1"/>
          <circle cx="20" cy="20" r="2.5" fill="${accentColor}" opacity="0.8"/>
          <path d="M 12 14 L 15 17 L 12 20 L 9 17 Z" fill="${accentColor}" opacity="0.7"/>
          <path d="M 28 14 L 31 17 L 28 20 L 25 17 Z" fill="${accentColor}" opacity="0.7"/>
          <circle cx="20" cy="24" r="1.5" fill="${accentColor}" opacity="0.6"/>
        `
            : pattern === "stars"
            ? `
          <path d="M 20 8 L 21 12 L 25 12 L 22 14 L 23 18 L 20 16 L 17 18 L 18 14 L 15 12 L 19 12 Z" fill="${accentColor}" opacity="0.9"/>
          <circle cx="20" cy="24" r="1.5" fill="${accentColor}" opacity="0.7"/>
          <circle cx="12" cy="18" r="1" fill="${accentColor}" opacity="0.6"/>
          <circle cx="28" cy="18" r="1" fill="${accentColor}" opacity="0.6"/>
        `
            : pattern === "infinity"
            ? `
          <path d="M 12 18 Q 16 13 20 18 Q 24 13 28 18 Q 24 23 20 18 Q 16 23 12 18" stroke="${accentColor}" stroke-width="2" fill="none" opacity="0.8"/>
        `
            : pattern === "supreme"
            ? `
          <!-- Padrão supremo -->
          <path d="M 20 8 L 21 12 L 25 12 L 22 14 L 23 18 L 20 16 L 17 18 L 18 14 L 15 12 L 19 12 Z" fill="${accentColor}" opacity="0.9"/>
          <circle cx="20" cy="24" r="2" fill="${accentColor}" opacity="0.8"/>
          <circle cx="12" cy="18" r="1.5" fill="${accentColor}" opacity="0.7"/>
          <circle cx="28" cy="18" r="1.5" fill="${accentColor}" opacity="0.7"/>
          <path d="M 12 18 Q 16 13 20 18 Q 24 13 28 18 Q 24 23 20 18 Q 16 23 12 18" stroke="${accentColor}" stroke-width="2" fill="none" opacity="0.8"/>
          <circle cx="20" cy="18" r="3" fill="${accentColor}" opacity="0.6"/>
        `
            : pattern === "majestic"
            ? `
          <!-- Padrão majestoso especial para nível 5000 -->
          <!-- Estrela central majestosa -->
          <path d="M 20 6 L 22 12 L 28 12 L 23 16 L 25 22 L 20 18 L 15 22 L 17 16 L 12 12 L 18 12 Z" fill="${majesticColor1}" opacity="1"/>
          <!-- Coroa dourada -->
          <path d="M 8 16 L 10 12 L 12 16 L 14 10 L 16 16 L 18 10 L 20 12 L 22 10 L 24 16 L 26 10 L 28 16 L 30 12 L 32 16" stroke="${majesticColor2}" stroke-width="2" fill="none" opacity="0.9"/>
          <!-- Símbolos reais -->
          <circle cx="20" cy="26" r="3" fill="${majesticColor1}" opacity="0.8"/>
          <circle cx="20" cy="26" r="1.5" fill="${majesticColor2}" opacity="0.9"/>
          <!-- Ornamentos laterais -->
          <path d="M 12 20 Q 16 15 20 20 Q 24 15 28 20" stroke="${majesticColor1}" stroke-width="2" fill="none" opacity="0.8"/>
          <path d="M 12 24 Q 16 29 20 24 Q 24 29 28 24" stroke="${majesticColor1}" stroke-width="2" fill="none" opacity="0.8"/>
          <!-- Pequenas estrelas decorativas -->
          <path d="M 8 12 L 9 14 L 11 14 L 9.5 15 L 10 17 L 8 16 L 6 17 L 6.5 15 L 5 14 L 7 14 Z" fill="${majesticColor2}" opacity="0.7"/>
          <path d="M 32 12 L 33 14 L 35 14 L 33.5 15 L 34 17 L 32 16 L 30 17 L 30.5 15 L 29 14 L 31 14 Z" fill="${majesticColor2}" opacity="0.7"/>
          <path d="M 8 28 L 9 30 L 11 30 L 9.5 31 L 10 33 L 8 32 L 6 33 L 6.5 31 L 5 30 L 7 30 Z" fill="${majesticColor2}" opacity="0.7"/>
          <path d="M 32 28 L 33 30 L 35 30 L 33.5 31 L 34 33 L 32 32 L 30 33 L 30.5 31 L 29 30 L 31 30 Z" fill="${majesticColor2}" opacity="0.7"/>
        `
            : ""
        }
        
        <!-- Gemas baseadas no nível (animadas) -->
        ${gems
          .map((gem, index) => {
            const angle = (index * 360) / gems.length;
            const radius = 12;
            const x = 20 + Math.cos((angle * Math.PI) / 180) * radius;
            const y = 20 + Math.sin((angle * Math.PI) / 180) * radius;
            const delay = index * 0.2; // Delay escalonado para cada gema

            return `
            <circle cx="${x}" cy="${y}" r="${gem.size}" fill="${
              gem.color
            }" opacity="0.9">
              <animate attributeName="r" values="${gem.size};${
              gem.size * 1.2
            };${gem.size}" dur="2s" repeatCount="indefinite" begin="${delay}s"/>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" begin="${delay}s"/>
            </circle>
            <circle cx="${x}" cy="${y}" r="${
              gem.size * 0.6
            }" fill="#FFFFFF" opacity="0.6">
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.8s" repeatCount="indefinite" begin="${delay}s"/>
            </circle>
            <circle cx="${x}" cy="${y}" r="${
              gem.size * 0.3
            }" fill="#FFFFFF" opacity="0.8">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="1.2s" repeatCount="indefinite" begin="${delay}s"/>
            </circle>
          `;
          })
          .join("")}
        
        <!-- Brilho interno para níveis altos (animado) -->
        ${
          hasInnerGlow
            ? `
          <circle cx="20" cy="20" r="15" fill="none" stroke="${primaryColor}" stroke-width="1" opacity="0.4">
            <animate attributeName="r" values="13;17;13" dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="20" cy="20" r="12" fill="none" stroke="${primaryColor}" stroke-width="0.5" opacity="0.6">
            <animate attributeName="r" values="10;14;10" dur="2.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite"/>
          </circle>
        `
            : ""
        }
        
        <!-- Brilho externo para níveis altos (animado) -->
        ${
          hasOuterGlow
            ? `
          <circle cx="20" cy="20" r="22" fill="none" stroke="${primaryColor}" stroke-width="1" opacity="0.3">
            <animate attributeName="r" values="20;24;20" dur="4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.1;0.5;0.1" dur="3s" repeatCount="indefinite"/>
          </circle>
        `
            : ""
        }
        
        <!-- Partículas para níveis muito altos (animadas e contidas no card) -->
        ${
          hasParticles
            ? `
          <circle cx="20" cy="8" r="0.6" fill="${primaryColor}" opacity="0.8">
            <animate attributeName="cy" values="8;6;8" dur="2.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="32" cy="20" r="0.5" fill="${primaryColor}" opacity="0.7">
            <animate attributeName="cx" values="32;34;32" dur="2.8s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2.2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="20" cy="32" r="0.6" fill="${primaryColor}" opacity="0.8">
            <animate attributeName="cy" values="32;34;32" dur="2.3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite"/>
          </circle>
          <circle cx="8" cy="20" r="0.5" fill="${primaryColor}" opacity="0.7">
            <animate attributeName="cx" values="8;6;8" dur="2.7s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2.1s" repeatCount="indefinite"/>
          </circle>
          <circle cx="28" cy="12" r="0.4" fill="${primaryColor}" opacity="0.6">
            <animate attributeName="r" values="0.3;0.6;0.3" dur="1.9s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="1.6s" repeatCount="indefinite"/>
          </circle>
          <circle cx="28" cy="28" r="0.4" fill="${primaryColor}" opacity="0.6">
            <animate attributeName="r" values="0.3;0.6;0.3" dur="2.1s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="1.7s" repeatCount="indefinite"/>
          </circle>
          <circle cx="12" cy="12" r="0.4" fill="${primaryColor}" opacity="0.6">
            <animate attributeName="r" values="0.3;0.6;0.3" dur="1.8s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="1.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="12" cy="28" r="0.4" fill="${primaryColor}" opacity="0.6">
            <animate attributeName="r" values="0.3;0.6;0.3" dur="2.2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="1.9s" repeatCount="indefinite"/>
          </circle>
        `
            : ""
        }
      </g>
    `;
  };

  // Função para calcular largura dinâmica da caixa baseada no texto
  const calculateBoxWidth = (text: string) => {
    // Aproximação: cada caractere ocupa ~6px com font-size 8
    const baseWidth = 100; // largura mínima
    const charWidth = 6;
    const calculatedWidth = Math.max(baseWidth, text.length * charWidth + 20); // +20 para padding
    return Math.min(calculatedWidth, 200); // largura máxima para não quebrar o layout
  };

  const boxWidth = calculateBoxWidth(levelTitle);
  const avatarCenterX = 60; // Centro do avatar
  const boxStartX = avatarCenterX - boxWidth / 2; // Posição inicial da caixa para centralizar
  const boxCenterX = avatarCenterX; // Centro da caixa = centro do avatar

  // Função para gerar texto medieval/mágico da data de entrada
  const getMedievalDateText = (level: number, language: string) => {
    const date = new Date(Date.now() - stats.accountAge * 24 * 60 * 60 * 1000);
    const formattedDate = date.toLocaleDateString(
      language === "pt" ? "pt-BR" : "en-US",
      {
        month: "short",
        year: "numeric",
      }
    );

    // Texto simples para todos os níveis
    const medievalText =
      language === "pt"
        ? "Iniciou sua jornada mágica em"
        : "Began their magical journey in";

    return `${medievalText} ${formattedDate}`;
  };

  const medievalDateText = getMedievalDateText(userLevel, language);

  // Traduções
  const translations = {
    pt: {
      title: "Estatísticas do GitHub",
      totalStars: "Total de Estrelas:",
      totalRepos: "Total de Repositórios:",
      totalForks: "Total de Forks:",
      totalFollowers: "Total de Seguidores:",
      topLanguages: "Principais Linguagens:",
      gettingStarted: "Code Explorer",
      active: "Bug Hunter",
      veryActive: "Code Wizard",
      level: "Nível",
      joined: "Entrou em",
      stats: "Estatísticas do GitHub",
    },
    en: {
      title: "GitHub Stats",
      totalStars: "Total Stars Earned:",
      totalRepos: "Total Repositories:",
      totalForks: "Total Forks:",
      totalFollowers: "Total Followers:",
      topLanguages: "Top Languages:",
      gettingStarted: "Code Explorer",
      active: "Bug Hunter",
      veryActive: "Code Wizard",
      level: "Level",
      joined: "Joined",
      stats: "GitHub Stats",
    },
  };

  const t =
    translations[language as keyof typeof translations] || translations.pt;

  // Bordas fixas para cada tema
  const getThemeBorder = () => {
    if (!showBorder) return "";

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
      `,
      tanjiro: `
        .led-segment {
          animation: tanjiroCycle 3s ease-in-out infinite;
          stroke-linecap: round;
        }
      `,
    };

    return (
      borderStyles[theme as keyof typeof borderStyles] || borderStyles.dark
    );
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
      <rect width="550" height="220" fill="transparent" rx="20"/>
      <title id="titleId">${escapeXml(stats.username)} - ${t.title}</title>
      <desc id="descId">${
        language === "pt"
          ? `${t.stats} para ${escapeXml(stats.username)}: ${
              stats.repos
            } repositórios, ${formatNumber(
              stats.stars
            )} estrelas, ${formatNumber(stats.forks)} forks, ${formatNumber(
              stats.followers
            )} seguidores`
          : `GitHub statistics for ${escapeXml(stats.username)}: ${
              stats.repos
            } repositories, ${formatNumber(stats.stars)} stars, ${formatNumber(
              stats.forks
            )} forks, ${formatNumber(stats.followers)} followers`
      }</desc>
      
      <defs>
        <clipPath id="avatar-clip">
          <circle cx="60" cy="25" r="20"/>
        </clipPath>
        
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
        
        <!-- Filtro de faíscas de fogo -->
        <filter id="fireSparkles" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.1 0.1" numOctaves="3" seed="5" result="sparkles">
            <animate attributeName="baseFrequency"
                     values="0.1 0.1;0.15 0.15;0.1 0.1"
                     dur="1.5s"
                     repeatCount="indefinite"/>
          </feTurbulence>
          <feColorMatrix type="matrix" values="0 0 0 0 1
                                              0 0 0 0 0.5
                                              0 0 0 0 0
                                              0 0 0 1 0" result="redSparkles"/>
          <feGaussianBlur stdDeviation="1" result="blurredSparkles"/>
          <feComposite in="blurredSparkles" in2="SourceGraphic" operator="screen"/>
        </filter>
        
        <!-- Neon Glow Filter -->
        <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <!-- Shield Glow Filter -->
        <filter id="shieldGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <!-- Majestic Glow Filter -->
        <filter id="majesticGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
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
        
        <!-- Sparkle Animation -->
        <animate id="sparkleAnimation" attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
        
        <!-- Pulse Animation -->
        <animate id="pulseAnimation" attributeName="r" values="1;1.5;1" dur="1.5s" repeatCount="indefinite"/>
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
        
        .pulse-gold {
          animation: pulseGold 2s ease-in-out infinite;
        }
        
        @keyframes pulseGold {
          0%, 100% { 
            stroke: #FFD700;
            stroke-width: 1.5;
            filter: drop-shadow(0 0 3px #FFD700);
          }
          50% { 
            stroke: #FFA500;
            stroke-width: 2;
            filter: drop-shadow(0 0 8px #FFD700) drop-shadow(0 0 12px #FFA500);
          }
        }
        
        .sparkle {
          animation: sparkle 4.2s ease-in infinite;
        }
        
        @keyframes sparkle {
          0% { 
            opacity: 0.8;
            transform: translateY(0px) scale(1);
          }
          20% { 
            opacity: 1;
            transform: translateY(8px) scale(1);
          }
          40% { 
            opacity: 0.9;
            transform: translateY(20px) scale(0.95);
          }
          60% { 
            opacity: 0.6;
            transform: translateY(35px) scale(0.8);
          }
          80% { 
            opacity: 0.2;
            transform: translateY(55px) scale(0.6);
          }
          100% { 
            opacity: 0;
            transform: translateY(80px) scale(0.3);
          }
        }
        
        .progress-bar {
          transition: width 0.8s ease-in-out;
          animation: progressFill 1.5s ease-out;
        }
        
        @keyframes progressFill {
          from { width: 0; }
          to { width: ${progressPercentage * 116}px; }
        }
        
        .shield-float {
          animation: shieldFloat 6s ease-in-out infinite;
        }
        
        @keyframes shieldFloat {
          0%, 100% { 
            transform: translateY(0px) scale(1);
          }
          25% { 
            transform: translateY(-3px) scale(1.02);
          }
          50% { 
            transform: translateY(-5px) scale(1.03);
          }
          75% { 
            transform: translateY(-3px) scale(1.02);
          }
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
      
      ${
        showBorder
          ? theme === "tanjiro"
            ? `
        <!-- Tanjiro Flame Borders - na borda do background colorido (BORDAS GROSSAS) -->
        <!-- Top flame border -->
        <rect x="20.5" y="5.5" width="509" height="25" fill="url(#fireGradient)" filter="url(#flameWave)">
          <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="2s" repeatCount="indefinite"/>
        </rect>
        <!-- Bottom flame border -->
        <rect x="20.5" y="189.5" width="509" height="25" fill="url(#fireGradient)" filter="url(#flameWave)">
          <animateTransform attributeName="transform" type="translate" values="0 0;0 5;0 0" dur="2s" repeatCount="indefinite"/>
        </rect>
        <!-- Left flame border -->
        <rect x="20.5" y="5.5" width="25" height="209" fill="url(#fireGradient)" filter="url(#flameWave)">
          <animateTransform attributeName="transform" type="translate" values="0 0;-5 0;0 0" dur="2s" repeatCount="indefinite"/>
        </rect>
        <!-- Right flame border -->
        <rect x="504.5" y="5.5" width="25" height="209" fill="url(#fireGradient)" filter="url(#flameWave)">
          <animateTransform attributeName="transform" type="translate" values="0 0;5 0;0 0" dur="2s" repeatCount="indefinite"/>
        </rect>

        <!-- Partículas discretas nas bordas -->
        <g fill="yellow" opacity="0.5">
          <circle cx="75" cy="10.5" r="1">
            <animate attributeName="cy" values="10.5;30.5" dur="1.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="450" cy="204.5" r="1.5">
            <animate attributeName="cy" values="204.5;184.5" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/>
          </circle>
        </g>
      `
            : `
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
      `
          : ""
      }
      
      <!-- Background -->
      <rect
        data-testid="card-bg"
        x="25.5"
        y="10.5"
        rx="4.5"
        height="199"
        stroke="${currentTheme.border}"
        width="499"
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
        height="169"
        width="469"
        fill="rgba(0, 0, 0, 0.3)"
        stroke="none"
      />
      `
          : ""
      }
      
      <!-- Header -->
      <g data-testid="card-title" transform="translate(50, 35)">
        <g transform="translate(0, 0)">
          <text x="0" y="0" class="header" data-testid="header">
            ${escapeXml(stats.username)}'s ${t.title}
          </text>
        </g>
      </g>
      
      <!-- Right side info panel -->
      <g transform="translate(375, 20)">
        <!-- Avatar circle (sem fundo e sem borda) -->
        <circle cx="60" cy="25" r="20" fill="none" stroke="none"/>
        <g class="shield-float">
          ${(() => {
            // Sempre usar escudo baseado no nível
            return generateShieldAvatar(userLevel, currentTheme);
          })()}
        </g>
        
                        <!-- Level Title -->
        <g transform="translate(0, 60)">
          <rect x="${boxStartX}" y="0" width="${boxWidth}" height="25" fill="${
    currentTheme.cardBg
  }" rx="4" stroke="#FFD700" stroke-width="1.5" class="pulse-gold"/>
          
          <!-- Partículas douradas caindo da faixa inferior -->
          <g class="sparkle" style="animation-delay: 0s;">
            <circle cx="${
              boxStartX + boxWidth * 0.15
            }" cy="28" r="0.8" fill="#FFD700" opacity="0.9"/>
          </g>
          <g class="sparkle" style="animation-delay: 0.3s;">
            <circle cx="${
              boxStartX + boxWidth * 0.35
            }" cy="28" r="0.6" fill="#FFA500" opacity="0.8"/>
          </g>
          <g class="sparkle" style="animation-delay: 0.6s;">
            <circle cx="${
              boxStartX + boxWidth * 0.55
            }" cy="28" r="0.9" fill="#FFD700" opacity="0.9"/>
          </g>
          <g class="sparkle" style="animation-delay: 0.9s;">
            <circle cx="${
              boxStartX + boxWidth * 0.75
            }" cy="28" r="0.7" fill="#FFA500" opacity="0.8"/>
          </g>
          <g class="sparkle" style="animation-delay: 1.2s;">
            <circle cx="${
              boxStartX + boxWidth * 0.85
            }" cy="28" r="0.8" fill="#FFD700" opacity="0.9"/>
          </g>
          <g class="sparkle" style="animation-delay: 1.5s;">
            <circle cx="${
              boxStartX + boxWidth * 0.25
            }" cy="28" r="0.6" fill="#FFA500" opacity="0.8"/>
          </g>
          <g class="sparkle" style="animation-delay: 1.8s;">
            <circle cx="${
              boxStartX + boxWidth * 0.45
            }" cy="28" r="0.9" fill="#FFD700" opacity="0.9"/>
          </g>
          <g class="sparkle" style="animation-delay: 2.1s;">
            <circle cx="${
              boxStartX + boxWidth * 0.65
            }" cy="28" r="0.7" fill="#FFA500" opacity="0.8"/>
          </g>
          
          <text x="${boxCenterX}" y="16" fill="${
    currentTheme.text
  }" font-family="Segoe UI, system-ui, sans-serif" font-size="8" font-weight="600" text-anchor="middle">
            ${levelTitle}
          </text>
        </g>
        
        <!-- Level badge with progress -->
        <g transform="translate(0, 95)">
          <rect x="0" y="0" width="120" height="20" fill="${
            currentTheme.primary
          }" opacity="0.1" rx="4" stroke="${
    currentTheme.primary
  }" stroke-width="1"/>
          <rect x="2" y="2" width="${Math.min(
            116,
            progressPercentage * 116
          )}" height="16" fill="${
    currentTheme.primary
  }" opacity="0.3" rx="2" class="progress-bar"/>
          <text x="60" y="13" fill="${
            currentTheme.primary
          }" font-family="Segoe UI, system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle">
            NVL ${userLevel}
          </text>
        </g>
        
        <!-- Medieval Date -->
        <g transform="translate(0, 130)">
          <text x="60" y="0" fill="${
            currentTheme.text
          }" font-family="Segoe UI, system-ui, sans-serif" font-size="7" font-weight="400" text-anchor="middle">
            ${
              medievalDateText.split(" em ")[0] ||
              medievalDateText.split(" in ")[0]
            }
          </text>
          <text x="60" y="10" fill="${
            currentTheme.text
          }" font-family="Segoe UI, system-ui, sans-serif" font-size="7" font-weight="400" text-anchor="middle">
            ${
              medievalDateText.split(" em ")[1] ||
              medievalDateText.split(" in ")[1] ||
              ""
            }
          </text>
        </g>
      </g>
      
      <!-- Main Stats - Clean Design -->
      <g data-testid="main-card-body" transform="translate(0, 70)">
        <svg data-testid="lang-items" x="50">
          <!-- Stars -->
          <g class="stagger" style="animation-delay: 450ms" transform="translate(0, 0)">
            <g class="icon-container" transform="translate(0, -1)">
              <circle cx="8" cy="8" r="9" fill="${
                currentTheme.primary
              }" opacity="0.12"/>
              <circle cx="8" cy="8" r="7" fill="${
                currentTheme.primary
              }" opacity="0.05"/>
              <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" filter="url(#neonGlow)">
                <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"/>
              </svg>
            </g>
            <text class="stat-label" x="25" y="12.5">${t.totalStars}</text>
            <text class="stat-value" x="219.01" y="12.5" data-testid="stars" fill="${
              currentTheme.primary
            }">${formatNumber(stats.stars)}</text>
            <!-- Subtle separator line -->
            <line x1="25" y1="20" x2="215" y2="20" stroke="${
              currentTheme.primary
            }" stroke-width="0.5" opacity="0.1"/>
          </g>
          
          <!-- Repositories -->
          <g class="stagger" style="animation-delay: 600ms" transform="translate(0, 25)">
            <g class="icon-container" transform="translate(0, -1)">
              <circle cx="8" cy="8" r="9" fill="${
                currentTheme.secondary
              }" opacity="0.12"/>
              <circle cx="8" cy="8" r="7" fill="${
                currentTheme.secondary
              }" opacity="0.05"/>
              <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" filter="url(#neonGlow)">
                <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
              </svg>
            </g>
            <text class="stat-label" x="25" y="12.5">${t.totalRepos}</text>
            <text class="stat-value" x="219.01" y="12.5" data-testid="repos" fill="${
              currentTheme.secondary
            }">${stats.repos}</text>
            <!-- Subtle separator line -->
            <line x1="25" y1="20" x2="215" y2="20" stroke="${
              currentTheme.secondary
            }" stroke-width="0.5" opacity="0.1"/>
          </g>
        
        <!-- Forks -->
          <g class="stagger" style="animation-delay: 750ms" transform="translate(0, 50)">
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
            <text class="stat-value" x="219.01" y="12.5" data-testid="forks" fill="${
              currentTheme.accent
            }">${formatNumber(stats.forks)}</text>
            <!-- Subtle separator line -->
            <line x1="25" y1="20" x2="215" y2="20" stroke="${
              currentTheme.accent
            }" stroke-width="0.5" opacity="0.1"/>
          </g>
          
          <!-- Followers -->
          <g class="stagger" style="animation-delay: 900ms" transform="translate(0, 75)">
            <g class="icon-container" transform="translate(0, -1)">
              <circle cx="8" cy="8" r="9" fill="${
                currentTheme.primary
              }" opacity="0.12"/>
              <circle cx="8" cy="8" r="7" fill="${
                currentTheme.primary
              }" opacity="0.05"/>
              <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" filter="url(#neonGlow)">
                <path fill-rule="evenodd" d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"/>
              </svg>
            </g>
            <text class="stat-label" x="25" y="12.5">${t.totalFollowers}</text>
            <text class="stat-value" x="219.01" y="12.5" data-testid="followers" fill="${
              currentTheme.primary
            }">${formatNumber(stats.followers)}</text>
            <!-- Subtle separator line -->
            <line x1="25" y1="20" x2="215" y2="20" stroke="${
              currentTheme.primary
            }" stroke-width="0.5" opacity="0.1"/>
          </g>
        
        <!-- Top Languages -->
          <g class="stagger" style="animation-delay: 1050ms" transform="translate(0, 100)">
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
            <text class="stat-label" x="25" y="12.5">${t.topLanguages}</text>
            <text class="stat-value" x="219.01" y="12.5" data-testid="languages" fill="${
              currentTheme.secondary
            }">
              ${stats.languages
                .slice(0, 3)
                .map((lang) => lang.name)
                .join(", ")}
            </text>
            <!-- Subtle separator line -->
            <line x1="25" y1="20" x2="215" y2="20" stroke="${
              currentTheme.secondary
            }" stroke-width="0.5" opacity="0.1"/>
          </g>
        </svg>
      </g>
    </svg>
  `;
}
