"use client";

import { useState } from "react";
import { themes } from "@/components/github-repos-card/config";

export default function ReposPage() {
  const [username, setUsername] = useState("MatheusRenzo");
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("pt");
  const [showBorder, setShowBorder] = useState(true);
  const [cardType, setCardType] = useState("repos-list");
  const [maxRepos, setMaxRepos] = useState(5);

  const generateUrl = () => {
    const params = new URLSearchParams({
      username,
      theme,
      language,
      showBorder: showBorder.toString(),
      type: cardType,
      maxRepos: maxRepos.toString(),
    });
    return `/api/stats?${params.toString()}`;
  };

  const copyToClipboard = () => {
    const url = `${window.location.origin}${generateUrl()}`;
    navigator.clipboard.writeText(url);
  };

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
            GitHub Repositories Cards
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
            Gere cards personalizados com listas dos seus repositórios do GitHub
            - lista completa ou top 3 mais estrelados
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
            <a
              href="/"
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
              📊 Estatísticas do Usuário
            </a>
            <a
              href="/repos"
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
              📁 Cards de Repositórios
            </a>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          {/* Controles */}
          <div className="card" style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "white",
                marginBottom: "1.5rem",
              }}
            >
              Configurações
            </h2>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
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
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "1px solid rgba(75, 85, 99, 0.3)",
                    background: "rgba(17, 24, 39, 0.5)",
                    color: "white",
                    fontSize: "1rem",
                  }}
                  placeholder="Digite o username"
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
                  {Object.keys(themes).map((themeName) => (
                    <option
                      key={themeName}
                      value={themeName}
                      style={{ background: "#1f2937" }}
                    >
                      {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                    </option>
                  ))}
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
                  Tipo de Card
                </label>
                <select
                  value={cardType}
                  onChange={(e) => setCardType(e.target.value)}
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
                  <option value="repos-list" style={{ background: "#1f2937" }}>
                    📁 Cards de Repositórios
                  </option>
                  <option value="top-repos" style={{ background: "#1f2937" }}>
                    🏆 Top 3 Repositórios (mais estrelados)
                  </option>
                </select>
              </div>

              {cardType === "repos-list" && (
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
                    Quantidade de Repositórios
                  </label>
                  <select
                    value={maxRepos}
                    onChange={(e) => setMaxRepos(parseInt(e.target.value))}
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
                    <option value={3} style={{ background: "#1f2937" }}>
                      📊 3 Repositórios
                    </option>
                    <option value={5} style={{ background: "#1f2937" }}>
                      📊 5 Repositórios (padrão)
                    </option>
                    <option value={10} style={{ background: "#1f2937" }}>
                      📊 10 Repositórios
                    </option>
                  </select>
                </div>
              )}

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
                  <option value="pt" style={{ background: "#1f2937" }}>
                    Português
                  </option>
                  <option value="en" style={{ background: "#1f2937" }}>
                    English
                  </option>
                </select>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  id="showBorder"
                  checked={showBorder}
                  onChange={(e) => setShowBorder(e.target.checked)}
                  style={{ margin: 0, marginRight: "0.5rem" }}
                />
                <label
                  htmlFor="showBorder"
                  style={{
                    fontSize: "0.875rem",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Mostrar borda
                </label>
              </div>

              <button
                onClick={copyToClipboard}
                style={{
                  width: "100%",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(59, 130, 246, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Copiar URL
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="card" style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "white",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              Preview
            </h2>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={generateUrl()}
                alt="GitHub Repositories Card"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "0.5rem",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                  opacity: 1,
                  transition: "none",
                  animation: "none",
                }}
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTUwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDU1MCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjU1MCIgaGVpZ2h0PSIyODAiIGZpbGw9IiNmM2Y0ZjYiLz4KICA8dGV4dCB4PSIyNzUiIHk9IjE0MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5FcnJvIGFvIGNhcnJlZ2FyIGNhcmQ8L3RleHQ+Cjwvc3ZnPg==";
                }}
              />
            </div>
          </div>
        </div>

        {/* Exemplos de uso */}
        <div className="card" style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "white",
              marginBottom: "1.5rem",
            }}
          >
            Como usar
          </h2>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "white",
                  marginBottom: "0.5rem",
                }}
              >
                Markdown
              </h3>
              <div
                style={{
                  background: "rgba(17, 24, 39, 0.5)",
                  borderRadius: "0.5rem",
                  padding: "1rem",
                  border: "1px solid rgba(75, 85, 99, 0.3)",
                  overflow: "auto",
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
                  {`![GitHub Repositories](https://github-stats-rust-ten.vercel.app/api/stats?username=${username}&type=repos-list&theme=${theme}&language=${language}&showBorder=${showBorder}&maxRepos=${maxRepos})`}
                </code>
              </div>
            </div>

            <div>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "white",
                  marginBottom: "0.5rem",
                }}
              >
                HTML
              </h3>
              <div
                style={{
                  background: "rgba(17, 24, 39, 0.5)",
                  borderRadius: "0.5rem",
                  padding: "1rem",
                  border: "1px solid rgba(75, 85, 99, 0.3)",
                  overflow: "auto",
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
                  {`<img src="https://github-stats-rust-ten.vercel.app/api/stats?username=${username}&type=repos-list&theme=${theme}&language=${language}&showBorder=${showBorder}&maxRepos=${maxRepos}" alt="GitHub Repositories" />`}
                </code>
              </div>
            </div>

            <div>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "white",
                  marginBottom: "0.5rem",
                }}
              >
                URL Direta
              </h3>
              <div
                style={{
                  background: "rgba(17, 24, 39, 0.5)",
                  borderRadius: "0.5rem",
                  padding: "1rem",
                  border: "1px solid rgba(75, 85, 99, 0.3)",
                  overflow: "auto",
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
                  {`https://github-stats-rust-ten.vercel.app/api/stats?username=${username}&type=repos-list&theme=${theme}&language=${language}&showBorder=${showBorder}&maxRepos=${maxRepos}`}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Parâmetros disponíveis */}
        <div className="card">
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "white",
              marginBottom: "1.5rem",
            }}
          >
            Parâmetros Disponíveis
          </h2>

          <div style={{ overflow: "auto" }}>
            <table
              style={{ width: "100%", fontSize: "0.875rem", color: "#9ca3af" }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(75, 85, 99, 0.3)" }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0.5rem",
                      color: "white",
                    }}
                  >
                    Parâmetro
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0.5rem",
                      color: "white",
                    }}
                  >
                    Descrição
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0.5rem",
                      color: "white",
                    }}
                  >
                    Valores
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0.5rem",
                      color: "white",
                    }}
                  >
                    Padrão
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(75, 85, 99, 0.1)" }}>
                  <td style={{ padding: "0.5rem", fontFamily: "monospace" }}>
                    username
                  </td>
                  <td style={{ padding: "0.5rem" }}>Username do GitHub</td>
                  <td style={{ padding: "0.5rem" }}>
                    Qualquer username válido
                  </td>
                  <td style={{ padding: "0.5rem" }}>MatheusRenzo</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(75, 85, 99, 0.1)" }}>
                  <td style={{ padding: "0.5rem", fontFamily: "monospace" }}>
                    type
                  </td>
                  <td style={{ padding: "0.5rem" }}>Tipo de card</td>
                  <td style={{ padding: "0.5rem" }}>
                    stats, repos-list, top-repos
                  </td>
                  <td style={{ padding: "0.5rem" }}>stats</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(75, 85, 99, 0.1)" }}>
                  <td style={{ padding: "0.5rem", fontFamily: "monospace" }}>
                    theme
                  </td>
                  <td style={{ padding: "0.5rem" }}>Tema do card</td>
                  <td style={{ padding: "0.5rem" }}>
                    dark, light, radical, neon, cyber, tanjiro
                  </td>
                  <td style={{ padding: "0.5rem" }}>dark</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(75, 85, 99, 0.1)" }}>
                  <td style={{ padding: "0.5rem", fontFamily: "monospace" }}>
                    language
                  </td>
                  <td style={{ padding: "0.5rem" }}>Idioma do card</td>
                  <td style={{ padding: "0.5rem" }}>pt, en</td>
                  <td style={{ padding: "0.5rem" }}>pt</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(75, 85, 99, 0.1)" }}>
                  <td style={{ padding: "0.5rem", fontFamily: "monospace" }}>
                    showBorder
                  </td>
                  <td style={{ padding: "0.5rem" }}>Mostrar borda animada</td>
                  <td style={{ padding: "0.5rem" }}>true, false</td>
                  <td style={{ padding: "0.5rem" }}>true</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(75, 85, 99, 0.1)" }}>
                  <td style={{ padding: "0.5rem", fontFamily: "monospace" }}>
                    maxRepos
                  </td>
                  <td style={{ padding: "0.5rem" }}>Quantidade de repositórios (apenas para repos-list)</td>
                  <td style={{ padding: "0.5rem" }}>3, 5, 10</td>
                  <td style={{ padding: "0.5rem" }}>5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
