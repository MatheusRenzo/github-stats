"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const [username, setUsername] = useState("MatheusRenzo");
  const [theme, setTheme] = useState("dark");
  const [showBorder, setShowBorder] = useState(true);
  const [language, setLanguage] = useState("pt");

  const [svgUrl, setSvgUrl] = useState("");
  const [cleanUrl, setCleanUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const generateCleanUrl = () => {
    return `/api/stats?username=${encodeURIComponent(
      username
    )}&theme=${theme}&showBorder=${showBorder}&language=${language}`;
  };

  const generateStats = async () => {
    const newCleanUrl = generateCleanUrl();
    const urlWithTimestamp = `${newCleanUrl}&t=${Date.now()}`;
    setCleanUrl(newCleanUrl);
    setSvgUrl(urlWithTimestamp);
  };

  const showNotificationMessage = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const copyUrl = async () => {
    const fullUrl = `${window.location.origin}${cleanUrl}`;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      showNotificationMessage("URL copiada para a área de transferência!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showNotificationMessage("Erro ao copiar URL");
    }
  };

  // Auto-generate on mount
  useEffect(() => {
    if (username) {
      generateStats();
    }
  }, [username, theme, showBorder, language]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Header />
      {/* Animated background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-10rem",
            right: "-10rem",
            width: "20rem",
            height: "20rem",
            background: "#3b82f6",
            borderRadius: "50%",
            mixBlendMode: "multiply",
            filter: "blur(40px)",
            opacity: 0.2,
            animation: "blob 7s infinite",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "-10rem",
            left: "-10rem",
            width: "20rem",
            height: "20rem",
            background: "#8b5cf6",
            borderRadius: "50%",
            mixBlendMode: "multiply",
            filter: "blur(40px)",
            opacity: 0.2,
            animation: "blob 7s infinite",
            animationDelay: "2s",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: "10rem",
            left: "10rem",
            width: "20rem",
            height: "20rem",
            background: "#ec4899",
            borderRadius: "50%",
            mixBlendMode: "multiply",
            filter: "blur(40px)",
            opacity: 0.2,
            animation: "blob 7s infinite",
            animationDelay: "4s",
          }}
        ></div>
      </div>

      <div
        className="container"
        style={{ position: "relative", zIndex: 10, padding: "2rem 1rem" }}
      >
        {/* Hero Section */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              background: "linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            GitHub Stats Generator
          </h1>
          <p
            style={{
              color: "#9ca3af",
              fontSize: "1.25rem",
              maxWidth: "48rem",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Gere estatísticas gamificadas do GitHub com sistema de níveis e
            escudos únicos
          </p>

          {/* Card Type Selection */}
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/"
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                color: "white",
                textDecoration: "none",
                fontWeight: "600",
                transition: "all 0.2s ease",
                border: "2px solid transparent",
              }}
            >
              📊 Estatísticas do Usuário
            </Link>
            <Link
              href="/repos"
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                background: "rgba(17, 24, 39, 0.5)",
                color: "white",
                textDecoration: "none",
                fontWeight: "600",
                transition: "all 0.2s ease",
                border: "2px solid rgba(75, 85, 99, 0.3)",
              }}
            >
              📁 Estatísticas dos Repositórios
            </Link>
          </div>
        </div>

        {/* Main Controls */}
        <div className="card" style={{ marginBottom: "2rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "white",
                  marginBottom: "0.5rem",
                }}
              >
                Username do GitHub
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu username"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid rgba(75, 85, 99, 0.3)",
                  background: "rgba(17, 24, 39, 0.5)",
                  color: "white",
                  fontSize: "1rem",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "white",
                  marginBottom: "0.5rem",
                }}
              >
                Tema
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid rgba(75, 85, 99, 0.3)",
                  background: "rgba(17, 24, 39, 0.5)",
                  color: "white",
                  fontSize: "1rem",
                }}
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="dracula">Dracula</option>
                <option value="nord">Nord</option>
                <option value="gruvbox">Gruvbox</option>
                <option value="monokai">Monokai</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "white",
                  marginBottom: "0.5rem",
                }}
              >
                Idioma
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid rgba(75, 85, 99, 0.3)",
                  background: "rgba(17, 24, 39, 0.5)",
                  color: "white",
                  fontSize: "1rem",
                }}
              >
                <option value="pt">Português</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="ja">日本語</option>
              </select>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "white",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={showBorder}
                onChange={(e) => setShowBorder(e.target.checked)}
                style={{ margin: 0 }}
              />
              Mostrar borda
            </label>
          </div>

          <button
            onClick={generateStats}
            disabled={!username}
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              color: "white",
              fontSize: "1.125rem",
              fontWeight: "600",
              cursor: !username ? "not-allowed" : "pointer",
              opacity: !username ? 0.6 : 1,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (username) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(59, 130, 246, 0.3)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Gerar Estatísticas
          </button>
        </div>

        {/* Generated Stats */}
        {svgUrl && (
          <div className="card" style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "white",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              Seu Escudo GitHub
            </h2>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "2rem",
              }}
            >
              <img
                src={svgUrl}
                alt="GitHub Stats"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "0.5rem",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                  opacity: 1,
                  transition: "none",
                  animation: "none",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={copyUrl}
                disabled={copied}
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.5rem",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  background: copied
                    ? "rgba(16, 185, 129, 0.2)"
                    : "rgba(16, 185, 129, 0.1)",
                  color: "#10b981",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  cursor: copied ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {copied ? "✓ Copiado!" : "📋 Copiar URL"}
              </button>
            </div>

            <div style={{ marginTop: "2rem" }}>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "white",
                  marginBottom: "1rem",
                }}
              >
                Exemplo de Uso:
              </h3>
              <div
                style={{
                  background: "rgba(17, 24, 39, 0.5)",
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                  border: "1px solid rgba(75, 85, 99, 0.3)",
                }}
              >
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#9ca3af",
                    marginBottom: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  Markdown para README.md:
                </p>
                <div
                  style={{
                    background: "rgba(31, 41, 55, 0.5)",
                    borderRadius: "0.5rem",
                    padding: "1rem",
                    border: "1px solid rgba(75, 85, 99, 0.3)",
                  }}
                >
                  <code
                    style={{
                      fontSize: "0.875rem",
                      color: "#10b981",
                      fontFamily: "monospace",
                      wordBreak: "break-all",
                    }}
                  >
                    {`![GitHub Stats](https://seu-dominio.com/api/stats?username=${username}&theme=${theme}&language=${language})`}
                  </code>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notification Toast */}
        {showNotification && (
          <div
            style={{
              position: "fixed",
              top: "1rem",
              right: "1rem",
              zIndex: 50,
              background: "rgba(17, 24, 39, 0.95)",
              color: "white",
              padding: "1rem 1.5rem",
              borderRadius: "0.5rem",
              border: "1px solid rgba(75, 85, 99, 0.3)",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(10px)",
            }}
          >
            {notificationMessage}
          </div>
        )}
      </div>

      <Footer />

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .card {
          background: rgba(17, 24, 39, 0.5);
          border: 1px solid rgba(75, 85, 99, 0.3);
          border-radius: 1rem;
          padding: 2rem;
          backdrop-filter: blur(10px);
        }

        @media (max-width: 768px) {
          .card {
            padding: 1.5rem;
          }

          h1 {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
