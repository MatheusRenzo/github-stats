"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AboutPage() {
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
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "8rem",
              height: "8rem",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              borderRadius: "50%",
              marginBottom: "2rem",
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Ícone de gráficos */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "4rem",
                animation: "bounce 2s infinite",
              }}
            >
              📊
            </div>
          </div>

          <h1
            style={{
              fontSize: "3.5rem",
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
              fontSize: "1.5rem",
              maxWidth: "700px",
              margin: "0 auto 2rem auto",
              lineHeight: "1.6",
            }}
          >
            A solução definitiva para personalizar seus badges do GitHub com
            sistema de níveis gamificado e escudos únicos!
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              flexWrap: "wrap",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "#60a5fa",
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              <span>🎮</span>
              <span>Sistema Gamificado</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "#60a5fa",
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              <span>🛡️</span>
              <span>Escudos Únicos</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "#60a5fa",
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              <span>⚡</span>
              <span>100% Personalizável</span>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="card" style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "white",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              🎯 Por Que Criei Este Projeto?
            </span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                background: "rgba(17, 24, 39, 0.3)",
                borderRadius: "1rem",
                padding: "2rem",
                border: "1px solid #3b82f6",
              }}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#3b82f6",
                  marginBottom: "1rem",
                }}
              >
                🔍 O Problema
              </h3>
              <p
                style={{
                  color: "#d1d5db",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                }}
              >
                Vi muita gente tentando personalizar seus GitHub badges, mas as
                ferramentas existentes não ofereciam personalização real. Eram
                sempre os mesmos templates básicos, sem identidade própria ou
                sistema de progressão que motivasse os desenvolvedores.
              </p>
              <blockquote
                style={{
                  margin: "1.5rem 0 0 0",
                  padding: "1rem",
                  background: "rgba(59, 130, 246, 0.1)",
                  borderLeft: "4px solid #3b82f6",
                  borderRadius: "0.5rem",
                  fontStyle: "italic",
                  color: "#60a5fa",
                }}
              >
                "Por que não criar algo que realmente represente a jornada única
                de cada desenvolvedor? 🚀"
              </blockquote>
            </div>

            <div
              style={{
                background: "rgba(17, 24, 39, 0.3)",
                borderRadius: "1rem",
                padding: "2rem",
                border: "1px solid #8b5cf6",
              }}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#8b5cf6",
                  marginBottom: "1rem",
                }}
              >
                💡 A Solução
              </h3>
              <p
                style={{
                  color: "#d1d5db",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                  marginBottom: "1rem",
                }}
              >
                Desenvolvi este projeto para criar a{" "}
                <strong style={{ color: "#a78bfa" }}>
                  primeira plataforma de badges gamificados
                </strong>{" "}
                do GitHub, com sistema de níveis, títulos épicos e escudos
                únicos que evoluem conforme suas contribuições.
              </p>
              <ul
                style={{
                  color: "#d1d5db",
                  fontSize: "0.9rem",
                  lineHeight: "1.6",
                  paddingLeft: "1.5rem",
                }}
              >
                <li>Sistema de níveis baseado em contribuições reais</li>
                <li>Mais de 1000 combinações de títulos únicos</li>
                <li>Escudos visuais que evoluem com o progresso</li>
                <li>Múltiplos temas e idiomas</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="card" style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "white",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #f59e0b, #f97316)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              🛠️ Tecnologias Utilizadas
            </span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[
              { name: "Next.js", icon: "⚡", color: "#000000" },
              { name: "React", icon: "⚛️", color: "#61dafb" },
              { name: "TypeScript", icon: "🔷", color: "#3178c6" },
              { name: "GitHub API", icon: "🐙", color: "#24292e" },
              { name: "SVG", icon: "🎨", color: "#ff6b35" },
              { name: "CSS3", icon: "💎", color: "#1572b6" },
              { name: "Vercel", icon: "▲", color: "#000000" },
              { name: "Tailwind", icon: "🎯", color: "#06b6d4" },
            ].map((tech, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(17, 24, 39, 0.3)",
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                  border: `1px solid ${tech.color}40`,
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = `0 10px 25px ${tech.color}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {tech.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: tech.color,
                    margin: 0,
                  }}
                >
                  {tech.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="card" style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "white",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #10b981, #3b82f6)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ✨ Funcionalidades Principais
            </span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            <div
              style={{
                background: "rgba(17, 24, 39, 0.3)",
                borderRadius: "1rem",
                padding: "2rem",
                border: "1px solid #10b981",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#10b981",
                  marginBottom: "1rem",
                }}
              >
                🎮 Sistema de Níveis
              </h3>
              <p
                style={{
                  color: "#d1d5db",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                }}
              >
                Cálculo inteligente baseado em{" "}
                <strong style={{ color: "#34d399" }}>
                  contribuições reais
                </strong>
                do GitHub, criando uma progressão justa e motivadora.
              </p>
            </div>

            <div
              style={{
                background: "rgba(17, 24, 39, 0.3)",
                borderRadius: "1rem",
                padding: "2rem",
                border: "1px solid #3b82f6",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#3b82f6",
                  marginBottom: "1rem",
                }}
              >
                🛡️ Escudos Únicos
              </h3>
              <p
                style={{
                  color: "#d1d5db",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                }}
              >
                Cada nível tem um escudo único com cores, padrões e efeitos
                especiais que evoluem conforme seu progresso.
              </p>
            </div>

            <div
              style={{
                background: "rgba(17, 24, 39, 0.3)",
                borderRadius: "1rem",
                padding: "2rem",
                border: "1px solid #8b5cf6",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#8b5cf6",
                  marginBottom: "1rem",
                }}
              >
                🏆 Títulos Épicos
              </h3>
              <p
                style={{
                  color: "#d1d5db",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                }}
              >
                Mais de{" "}
                <strong style={{ color: "#a78bfa" }}>1000 combinações</strong>
                de títulos únicos, desde "APRENDIZ" até "MÁGICO SUPREMO
                UNIVERSAL".
              </p>
            </div>
          </div>
        </div>

        {/* Development Process */}
        <div className="card" style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "white",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              🚀 Como Foi Desenvolvido
            </span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            <div
              style={{
                background: "rgba(17, 24, 39, 0.3)",
                borderRadius: "1rem",
                padding: "2rem",
                border: "1px solid #ec4899",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#ec4899",
                  marginBottom: "0.5rem",
                }}
              >
                🎯 Inspiração
              </h3>
              <p
                style={{
                  color: "#d1d5db",
                  fontSize: "1rem",
                  marginBottom: "0.5rem",
                }}
              >
                Observando a comunidade de desenvolvedores tentando personalizar
                seus perfis do GitHub sem sucesso.
              </p>
            </div>

            <div
              style={{
                background: "rgba(17, 24, 39, 0.3)",
                borderRadius: "1rem",
                padding: "2rem",
                border: "1px solid #8b5cf6",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#8b5cf6",
                  marginBottom: "0.5rem",
                }}
              >
                ⚡ Desenvolvimento
              </h3>
              <p
                style={{
                  color: "#d1d5db",
                  fontSize: "1rem",
                  marginBottom: "0.5rem",
                }}
              >
                Criado com Next.js, TypeScript e integração completa com a
                GitHub API para dados em tempo real.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="card" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "white",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              🎉 Pronto para Personalizar Seu GitHub?
            </span>
          </h2>
          <p
            style={{
              color: "#9ca3af",
              fontSize: "1.125rem",
              marginBottom: "2rem",
              maxWidth: "600px",
              margin: "0 auto 2rem auto",
            }}
          >
            Transforme seu perfil do GitHub com badges únicos e sistema de
            níveis gamificado! Comece sua jornada épica agora! 🚀
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://github.com/MatheusRenzo"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "1rem 2rem",
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                color: "white",
                textDecoration: "none",
                fontSize: "1.125rem",
                fontWeight: "600",
                borderRadius: "0.75rem",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 35px rgba(59, 130, 246, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(59, 130, 246, 0.3)";
              }}
            >
              <svg
                style={{ width: "1.5rem", height: "1.5rem" }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Gerar Meu Badge Agora
            </a>

            <a
              href="/ranking"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "1rem 2rem",
                background: "linear-gradient(135deg, #10b981, #3b82f6)",
                color: "white",
                textDecoration: "none",
                fontSize: "1.125rem",
                fontWeight: "600",
                borderRadius: "0.75rem",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 35px rgba(16, 185, 129, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(16, 185, 129, 0.3)";
              }}
            >
              <svg
                style={{ width: "1.5rem", height: "1.5rem" }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Ver Sistema de Rankings
            </a>
          </div>

          <div
            style={{
              marginTop: "2rem",
              padding: "1.5rem",
              background: "rgba(17, 24, 39, 0.3)",
              borderRadius: "1rem",
              border: "1px solid rgba(75, 85, 99, 0.3)",
            }}
          >
            <p
              style={{
                color: "#d1d5db",
                fontSize: "1rem",
                textAlign: "center",
                margin: 0,
                fontStyle: "italic",
              }}
            >
              "Por que aceitar badges genéricos quando você pode ter escudos
              únicos que contam sua história de desenvolvedor? 🛡️"
            </p>
          </div>
        </div>
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

        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translate(-50%, -50%) translateY(0);
          }
          40% {
            transform: translate(-50%, -50%) translateY(-10px);
          }
          60% {
            transform: translate(-50%, -50%) translateY(-5px);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
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
            font-size: 2.5rem !important;
          }

          h2 {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
