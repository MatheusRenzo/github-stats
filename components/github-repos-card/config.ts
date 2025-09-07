import { ThemeConfig } from "./types";

// Configuração de temas para o card de repositórios
export const themes: ThemeConfig = {
  dark: {
    background: "#0d1117",
    text: "#c9d1d9",
    primary: "#58a6ff",
    secondary: "#7c3aed",
    accent: "#f78166",
    border: "#30363d",
    cardBg: "rgba(22, 27, 34, 0.8)",
  },
  light: {
    background: "#ffffff",
    text: "#24292f",
    primary: "#0969da",
    secondary: "#8250df",
    accent: "#cf222e",
    border: "#d0d7de",
    cardBg: "rgba(248, 250, 252, 0.9)",
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
    background: "#0d1117",
    text: "#f97316",
    primary: "#dc2626",
    secondary: "#fbbf24",
    accent: "#ef4444",
    border: "#7f1d1d",
    cardBg: "rgba(20, 20, 20, 0.9)",
  },
};

// Configuração de estilos CSS
export const cardStyles = {
  container: {
    minHeight: "100vh",
    position: "relative" as const,
  },
  background: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden" as const,
    pointerEvents: "none" as const,
    zIndex: 0,
  },
  mainContainer: {
    position: "relative" as const,
    zIndex: 10,
    padding: "2rem 1rem",
  },
  header: {
    textAlign: "center" as const,
    marginBottom: "3rem",
  },
  iconContainer: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "4rem",
    height: "4rem",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    borderRadius: "50%",
    marginBottom: "1.5rem",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    background: "linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: "1.25rem",
    maxWidth: "48rem",
    margin: "0 auto",
    lineHeight: "1.6",
  },
};

// Configuração de animações
export const animations = {
  blob: {
    animation: "blob 7s infinite",
  },
  spin: {
    animation: "spin 1s linear infinite",
  },
  slideIn: {
    animation: "slide-in-from-right-2",
  },
};

// Configuração de notificações
export const notificationConfig = {
  duration: 3000,
  position: {
    position: "fixed" as const,
    top: "1rem",
    right: "1rem",
    zIndex: 50,
  },
  style: {
    padding: "1rem 1.5rem",
    borderRadius: "0.75rem",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
    border: "1px solid #10b981",
    background: "rgba(16, 185, 129, 0.9)",
    color: "white",
  },
};
