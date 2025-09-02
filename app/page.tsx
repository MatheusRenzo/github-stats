"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [username, setUsername] = useState("MatheusRenzo");
  const [theme, setTheme] = useState("dark");
  const [showBorder, setShowBorder] = useState(true);
  const [language, setLanguage] = useState("pt");
  const [useCustomAvatar, setUseCustomAvatar] = useState(false);
  const [customAvatar, setCustomAvatar] = useState("");

  const [svgUrl, setSvgUrl] = useState("");
  const [cleanUrl, setCleanUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const generateCleanUrl = () => {
    let url = `/api/stats?username=${encodeURIComponent(
      username
    )}&theme=${theme}&showBorder=${showBorder}&language=${language}`;

    if (useCustomAvatar && customAvatar) {
      url += `&useCustomAvatar=true&avatar=${encodeURIComponent(customAvatar)}`;
    }

    return url;
  };

  const generateStats = async () => {
    setIsLoading(true);
    const newCleanUrl = generateCleanUrl();
    const urlWithTimestamp = `${newCleanUrl}&t=${Date.now()}`;
    setCleanUrl(newCleanUrl);
    setSvgUrl(urlWithTimestamp);
    setIsLoading(false);
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
  }, [username, theme, showBorder, language, useCustomAvatar, customAvatar]);

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
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
        {/* Header */}
        <header style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "4rem",
              height: "4rem",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              borderRadius: "50%",
              marginBottom: "1.5rem",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
            }}
          >
            <svg
              style={{ width: "2rem", height: "2rem", color: "white" }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </div>
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
            Gere estatísticas simples do GitHub em formato SVG
          </p>
        </header>

        {/* Main Controls */}
        <div className="card" style={{ marginBottom: "2rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#d1d5db",
                  marginBottom: "0.5rem",
                }}
              >
                Username do GitHub
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input"
                  placeholder="Digite o username"
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "0.75rem",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                >
                  <svg
                    style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      color: "#9ca3af",
                    }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#d1d5db",
                  marginBottom: "0.5rem",
                }}
              >
                Tema
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="input"
                style={{ appearance: "none", cursor: "pointer" }}
              >
                <option value="dark">🌙 Dark</option>
                <option value="light">☀️ Light</option>
                <option value="radical">🎨 Radical</option>
                <option value="neon">⚡ Neon</option>
                <option value="cyber">🤖 Cyber</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#d1d5db",
                  marginBottom: "0.5rem",
                }}
              >
                Idioma
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="input"
                style={{ appearance: "none", cursor: "pointer" }}
              >
                <option value="pt">🇧🇷 Português</option>
                <option value="en">🇺🇸 English</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#d1d5db",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={showBorder}
                  onChange={(e) => setShowBorder(e.target.checked)}
                  style={{
                    width: "1rem",
                    height: "1rem",
                    accentColor: "#3b82f6",
                  }}
                />
                Mostrar Borda
              </label>
            </div>
          </div>

          {/* Avatar Customization Section */}
          <div
            style={{
              border: "1px solid rgba(75, 85, 99, 0.3)",
              borderRadius: "0.75rem",
              padding: "1.5rem",
              marginBottom: "1.5rem",
              background: "rgba(17, 24, 39, 0.3)",
            }}
          >
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "white",
                marginBottom: "1rem",
              }}
            >
              🎭 Personalização do Avatar
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1.5rem",
              }}
            >
              <div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#d1d5db",
                    cursor: "pointer",
                    marginBottom: "0.75rem",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={useCustomAvatar}
                    onChange={(e) => setUseCustomAvatar(e.target.checked)}
                    style={{
                      width: "1rem",
                      height: "1rem",
                      accentColor: "#3b82f6",
                    }}
                  />
                  Usar Avatar Personalizado
                </label>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#9ca3af",
                    marginBottom: "0.5rem",
                  }}
                >
                  {useCustomAvatar
                    ? "Avatar personalizado será usado"
                    : "Avatar do GitHub será usado (padrão)"}
                </p>
              </div>

              {useCustomAvatar && (
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: "#d1d5db",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Avatar Personalizado
                  </label>
                  <input
                    type="text"
                    value={customAvatar}
                    onChange={(e) => setCustomAvatar(e.target.value)}
                    className="input"
                    placeholder="URL da imagem ou emoji (ex: 🚀)"
                  />
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "#9ca3af",
                      marginTop: "0.5rem",
                    }}
                  >
                    Digite uma URL de imagem ou um emoji
                  </p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={generateStats}
            disabled={isLoading || !username.trim()}
            className="btn btn-primary"
            style={{
              width: "100%",
              padding: "1rem 1.5rem",
              fontSize: "1rem",
              opacity: isLoading || !username.trim() ? 0.5 : 1,
              cursor: isLoading || !username.trim() ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    marginRight: "0.75rem",
                    animation: "spin 1s linear infinite",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    style={{ opacity: 0.25 }}
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    style={{ opacity: 0.75 }}
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Gerando...
              </div>
            ) : (
              "Gerar Estatísticas"
            )}
          </button>
        </div>

        {/* Generated Card Display */}
        {cleanUrl && (
          <div className="card" style={{ marginBottom: "2rem" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "white",
                    marginBottom: "0.5rem",
                  }}
                >
                  GitHub Stats
                </h2>
                <p style={{ color: "#9ca3af" }}>Card gerado com sucesso!</p>
              </div>
              <button
                onClick={copyUrl}
                className={copied ? "btn btn-secondary" : "btn btn-secondary"}
                style={{
                  alignSelf: "flex-start",
                  padding: "0.75rem 1.5rem",
                  fontSize: "0.875rem",
                }}
              >
                {copied ? (
                  <>
                    <svg
                      style={{
                        width: "1rem",
                        height: "1rem",
                        marginRight: "0.5rem",
                      }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Copiado!
                  </>
                ) : (
                  <>
                    <svg
                      style={{
                        width: "1rem",
                        height: "1rem",
                        marginRight: "0.5rem",
                      }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                    Copiar URL
                  </>
                )}
              </button>
            </div>

            <div
              style={{
                background: "rgba(17, 24, 39, 0.5)",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                border: "1px solid rgba(75, 85, 99, 0.3)",
                overflow: "auto",
                marginBottom: "1.5rem",
              }}
            >
              <iframe
                src={svgUrl}
                style={{
                  width: "100%",
                  height: "220px",
                  border: "none",
                  display: "block",
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
                  borderRadius: "0.5rem",
                }}
                title="GitHub Stats"
                onError={(e) => {
                  alert(
                    "Erro ao carregar as estatísticas. Verifique se o username existe e se as variáveis de ambiente estão configuradas."
                  );
                }}
              />
            </div>

            <div
              style={{
                padding: "1rem",
                background: "rgba(55, 65, 81, 0.3)",
                borderRadius: "0.75rem",
                border: "1px solid rgba(75, 85, 99, 0.3)",
              }}
            >
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#d1d5db",
                  marginBottom: "0.75rem",
                  fontWeight: "600",
                }}
              >
                URL da imagem:
              </p>
              <div
                style={{
                  background: "rgba(17, 24, 39, 0.5)",
                  borderRadius: "0.5rem",
                  padding: "0.75rem",
                  border: "1px solid rgba(75, 85, 99, 0.3)",
                }}
              >
                <code
                  style={{
                    fontSize: "0.875rem",
                    color: "#10b981",
                    wordBreak: "break-all",
                    fontFamily: "monospace",
                  }}
                >
                  {`${window.location.origin}${cleanUrl}`}
                </code>
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="card" style={{ marginBottom: "2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "1.875rem",
                fontWeight: "bold",
                color: "white",
                marginBottom: "1rem",
              }}
            >
              ✨ Funcionalidades
            </h2>
            <p
              style={{
                color: "#9ca3af",
                fontSize: "1.125rem",
              }}
            >
              Todas as opções disponíveis na API
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <div
              style={{
                background: "rgba(17, 24, 39, 0.3)",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                border: "1px solid rgba(75, 85, 99, 0.3)",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "white",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                🌍 Idiomas
              </h3>
              <ul style={{ color: "#d1d5db", lineHeight: "1.6" }}>
                <li>🇧🇷 Português (pt)</li>
                <li>🇺🇸 English (en)</li>
              </ul>
            </div>

            <div
              style={{
                background: "rgba(17, 24, 39, 0.3)",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                border: "1px solid rgba(75, 85, 99, 0.3)",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "white",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                🎨 Temas
              </h3>
              <ul style={{ color: "#d1d5db", lineHeight: "1.6" }}>
                <li>🌙 Dark</li>
                <li>☀️ Light</li>
                <li>🎨 Radical</li>
                <li>⚡ Neon</li>
                <li>🤖 Cyber</li>
              </ul>
            </div>

            <div
              style={{
                background: "rgba(17, 24, 39, 0.3)",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                border: "1px solid rgba(75, 85, 99, 0.3)",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "white",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                🎭 Avatares
              </h3>
              <ul style={{ color: "#d1d5db", lineHeight: "1.6" }}>
                <li>👤 Avatar do GitHub</li>
                <li>🖼️ URL de imagem</li>
                <li>😀 Emojis</li>
                <li>✨ Borda animada</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div className="card">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "1.875rem",
                fontWeight: "bold",
                color: "white",
                marginBottom: "1rem",
              }}
            >
              Como Usar
            </h2>
            <p
              style={{
                color: "#9ca3af",
                fontSize: "1.125rem",
              }}
            >
              Siga estes passos para integrar o card em seu projeto
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "white",
                  marginBottom: "1rem",
                }}
              >
                Passos:
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {[
                  "Digite um username válido do GitHub",
                  "Escolha um tema e idioma",
                  "Configure o avatar (GitHub ou personalizado)",
                  'Clique em "Gerar Estatísticas"',
                  "Use a URL gerada em seu README.md",
                ].map((step, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        width: "2rem",
                        height: "2rem",
                        background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "0.875rem",
                      }}
                    >
                      {index + 1}
                    </div>
                    <p
                      style={{
                        color: "#d1d5db",
                        lineHeight: "1.6",
                        paddingTop: "0.25rem",
                      }}
                    >
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
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
                    {`![GitHub Stats](https://seu-dominio.com/api/stats?username=${username}&theme=${theme}&language=${language}${
                      useCustomAvatar && customAvatar
                        ? `&useCustomAvatar=true&avatar=${encodeURIComponent(
                            customAvatar
                          )}`
                        : ""
                    })`}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {showNotification && (
        <div
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            zIndex: 50,
          }}
          className="animate-in slide-in-from-right-2"
        >
          <div
            style={{
              padding: "1rem 1.5rem",
              borderRadius: "0.75rem",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
              border: "1px solid #10b981",
              background: "rgba(16, 185, 129, 0.9)",
              color: "white",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <svg
                style={{ width: "1.25rem", height: "1.25rem" }}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span style={{ fontWeight: "500" }}>{notificationMessage}</span>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
