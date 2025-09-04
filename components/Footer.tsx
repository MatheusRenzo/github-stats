"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "rgba(15, 23, 42, 0.95)",
        borderTop: "1px solid rgba(75, 85, 99, 0.3)",
        padding: "3rem 0 2rem 0",
        marginTop: "4rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          {/* Brand Section */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2.5rem",
                  height: "2.5rem",
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  borderRadius: "50%",
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                }}
              >
                <svg
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    color: "white",
                  }}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <span
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                GitHub Stats Generator
              </span>
            </div>
            <p
              style={{
                color: "#9ca3af",
                fontSize: "0.875rem",
                lineHeight: "1.6",
                marginBottom: "1.5rem",
              }}
            >
              Transforme suas estatísticas do GitHub em escudos gamificados
              únicos com sistema de níveis e títulos épicos.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
              }}
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2.5rem",
                  height: "2.5rem",
                  background: "rgba(75, 85, 99, 0.2)",
                  borderRadius: "50%",
                  color: "#9ca3af",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(59, 130, 246, 0.2)";
                  e.currentTarget.style.color = "#60a5fa";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(75, 85, 99, 0.2)";
                  e.currentTarget.style.color = "#9ca3af";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <svg
                  style={{ width: "1.25rem", height: "1.25rem" }}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                color: "white",
                marginBottom: "1rem",
              }}
            >
              Navegação
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <Link
                href="/"
                style={{
                  color: "#9ca3af",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#60a5fa";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#9ca3af";
                }}
              >
                ⚡ Gerador de Estatísticas
              </Link>
              <Link
                href="/ranking"
                style={{
                  color: "#9ca3af",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#60a5fa";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#9ca3af";
                }}
              >
                🏆 Sistema de Rankings
              </Link>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                color: "white",
                marginBottom: "1rem",
              }}
            >
              Recursos
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  color: "#9ca3af",
                  fontSize: "0.875rem",
                }}
              >
                🎮 Sistema de Níveis
              </span>
              <span
                style={{
                  color: "#9ca3af",
                  fontSize: "0.875rem",
                }}
              >
                🏆 Títulos Épicos
              </span>
              <span
                style={{
                  color: "#9ca3af",
                  fontSize: "0.875rem",
                }}
              >
                🛡️ Escudos Visuais
              </span>
              <span
                style={{
                  color: "#9ca3af",
                  fontSize: "0.875rem",
                }}
              >
                🌍 Múltiplos Idiomas
              </span>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                color: "white",
                marginBottom: "1rem",
              }}
            >
              Suporte
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#9ca3af",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#60a5fa";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#9ca3af";
                }}
              >
                📚 Documentação
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#9ca3af",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#60a5fa";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#9ca3af";
                }}
              >
                🐛 Reportar Bug
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#9ca3af",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#60a5fa";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#9ca3af";
                }}
              >
                💡 Sugerir Feature
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(75, 85, 99, 0.3)",
            paddingTop: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#64748b",
              fontSize: "0.875rem",
              margin: 0,
            }}
          >
            © 2024 GitHub Stats Generator • Desenvolvido com ❤️ para a
            comunidade de desenvolvedores
          </p>
          <div
            style={{
              display: "flex",
              gap: "2rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <a
              href="#"
              style={{
                color: "#64748b",
                textDecoration: "none",
                fontSize: "0.75rem",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#60a5fa";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#64748b";
              }}
            >
              Política de Privacidade
            </a>
            <a
              href="#"
              style={{
                color: "#64748b",
                textDecoration: "none",
                fontSize: "0.75rem",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#60a5fa";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#64748b";
              }}
            >
              Termos de Uso
            </a>
            <a
              href="#"
              style={{
                color: "#64748b",
                textDecoration: "none",
                fontSize: "0.75rem",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#60a5fa";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#64748b";
              }}
            >
              Licença MIT
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
