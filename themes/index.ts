export interface Theme {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
  border: string;
  cardBg: string;
}

export const themes: Record<string, Theme> = {
  dark: {
    background: "#000000",
    text: "#FEFEFE",
    primary: "#79ff97",
    secondary: "#79ff97",
    accent: "#79ff97",
    border: "#E4E2E2",
    cardBg: "rgb(20, 19, 19)",
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

export function getTheme(themeName: string): Theme {
  return themes[themeName] || themes.dark;
}

export function getAllThemes(): Record<string, Theme> {
  return themes;
}

export function getThemeNames(): string[] {
  return Object.keys(themes);
}

