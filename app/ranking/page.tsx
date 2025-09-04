"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { generateStatsSVG } from "../../cards/github-stats/svg-generator";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Função para gerar dados de exemplo para níveis específicos
const generateExampleData = (targetLevel: number) => {
  // Calcular pontos necessários para atingir o nível desejado
  // Baseado no sistema real de cálculo de níveis (média entre stars, repos e followers)
  let requiredAverageScore = 0;

  if (targetLevel <= 100) {
    requiredAverageScore = targetLevel - 1; // 1 ponto por nível
  } else if (targetLevel <= 500) {
    requiredAverageScore = 100 + (targetLevel - 100) * 2; // 2 pontos por nível
  } else if (targetLevel <= 1000) {
    requiredAverageScore = 500 + (targetLevel - 500) * 2.0; // 2.02 pontos por nível
  } else if (targetLevel <= 2000) {
    requiredAverageScore = 1500 + (targetLevel - 1000) * 10; // 10 pontos por nível
  } else if (targetLevel <= 3000) {
    requiredAverageScore = 4000 + (targetLevel - 2000) * 20; // 20 pontos por nível
  } else if (targetLevel <= 4000) {
    requiredAverageScore = 8000 + (targetLevel - 3000) * 50; // 50 pontos por nível
  } else if (targetLevel <= 5000) {
    requiredAverageScore = 15000 + (targetLevel - 4000) * 100; // 100 pontos por nível
  }

  // Como o sistema usa média entre stars, repos e followers, cada um precisa ter o valor da média
  const stars = Math.floor(requiredAverageScore);
  const repos = Math.floor(requiredAverageScore);
  const followers = Math.floor(requiredAverageScore);

  return {
    name: `DevLevel${targetLevel}`,
    username: `DevLevel${targetLevel}`,
    avatar: `https://github.com/DevLevel${targetLevel}.png`,
    level: targetLevel,
    repos: repos,
    stars: stars,
    forks: Math.floor(requiredAverageScore * 0.5),
    commits: Math.floor(requiredAverageScore * 1.99),
    issues: Math.floor(requiredAverageScore * 0.3),
    prs: Math.floor(requiredAverageScore * 0.4),
    reviews: Math.floor(requiredAverageScore * 0.2),
    followers: followers,
    following: Math.floor(requiredAverageScore * 0.6),
    languages: [
      { name: "JavaScript", count: Math.floor(requiredAverageScore * 0.4) },
      { name: "TypeScript", count: Math.floor(requiredAverageScore * 0.3) },
      { name: "Python", count: Math.floor(requiredAverageScore * 0.2) },
      { name: "Java", count: Math.floor(requiredAverageScore * 0.1) },
      { name: "Go", count: Math.floor(requiredAverageScore * 0.05) },
    ],
    accountAge: Math.floor(Math.random() * 3650) + 365, // 1-10 anos
  };
};

export default function RankingPage() {
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
            🏆 Sistema de Rankings
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
            Descubra como funciona o sistema de níveis e rankings dos
            desenvolvedores
          </p>
        </div>

        {/* Seção de Introdução */}
        <div className="card" style={{ marginBottom: "2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "white",
                marginBottom: "1.5rem",
                position: "relative",
              }}
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "textGlow 2s ease-in-out infinite alternate",
                }}
              >
                🎮 O que é o Sistema de Rankings?
              </span>
            </h2>
            <p
              style={{
                color: "#9ca3af",
                fontSize: "1.25rem",
                maxWidth: "800px",
                margin: "0 auto 2rem auto",
                lineHeight: "1.8",
              }}
            >
              Um sistema gamificado que transforma suas estatísticas do GitHub
              em uma jornada épica de evolução, com níveis únicos, títulos
              lendários e escudos visuais impressionantes!
            </p>
          </div>

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
                textAlign: "center",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(59, 130, 246, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: "1rem",
                }}
              >
                📊
              </div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#3b82f6",
                  marginBottom: "1rem",
                }}
              >
                Cálculo Inteligente
              </h3>
              <p
                style={{
                  color: "#d1d5db",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                }}
              >
                Analisamos suas estrelas, repositórios, seguidores e
                contribuições para calcular seu nível de forma justa e
                equilibrada.
              </p>
            </div>

            <div
              style={{
                background: "rgba(17, 24, 39, 0.3)",
                borderRadius: "1rem",
                padding: "2rem",
                border: "1px solid #8b5cf6",
                textAlign: "center",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(139, 92, 246, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: "1rem",
                }}
              >
                🏆
              </div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#8b5cf6",
                  marginBottom: "1rem",
                }}
              >
                Títulos Épicos
              </h3>
              <p
                style={{
                  color: "#d1d5db",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                }}
              >
                Desde "APRENDIZ" até "MÁGICO SUPREMO UNIVERSAL" - mais de 1000
                combinações únicas de títulos lendários!
              </p>
            </div>

            <div
              style={{
                background: "rgba(17, 24, 39, 0.3)",
                borderRadius: "1rem",
                padding: "2rem",
                border: "1px solid #ec4899",
                textAlign: "center",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(236, 72, 153, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: "1rem",
                }}
              >
                🛡️
              </div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#ec4899",
                  marginBottom: "1rem",
                }}
              >
                Escudos Visuais
              </h3>
              <p
                style={{
                  color: "#d1d5db",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                }}
              >
                Cada nível tem um escudo único com cores, padrões e efeitos
                especiais que evoluem com seu progresso!
              </p>
            </div>
          </div>

          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
              borderRadius: "1rem",
              padding: "2rem",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#60a5fa",
                marginBottom: "1rem",
              }}
            >
              🚀 Como Funciona?
            </h3>
            <p
              style={{
                color: "#d1d5db",
                fontSize: "1.125rem",
                lineHeight: "1.8",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              O sistema analisa suas métricas do GitHub e calcula um nível
              baseado na média ponderada de suas contribuições. Quanto mais você
              contribui, mais alto seu nível e mais impressionantes seus escudos
              se tornam!
            </p>
          </div>
        </div>

        {/* Seção de Demonstração dos Escudos */}
        <div className="card" style={{ marginBottom: "2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "white",
                marginBottom: "1rem",
                position: "relative",
              }}
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #f97316)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "textGlow 2s ease-in-out infinite alternate",
                }}
              >
                🎯 Veja a Evolução dos Escudos
              </span>
            </h2>
            <p
              style={{
                color: "#9ca3af",
                fontSize: "1.25rem",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: "1.6",
              }}
            >
              Observe como os escudos evoluem do nível mais básico até o
              supremo, cada um com sua própria personalidade visual!
            </p>
          </div>

          {/* Barra de Progressão Visual */}
          <div
            style={{
              background: "rgba(17, 24, 39, 0.3)",
              borderRadius: "1rem",
              padding: "2rem",
              border: "1px solid rgba(75, 85, 99, 0.3)",
              marginBottom: "2rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "white",
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              🌟 Sua Jornada de Evolução
            </h3>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative",
                marginBottom: "2rem",
              }}
            >
              {/* Linha de progresso */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "0",
                  right: "0",
                  height: "4px",
                  background:
                    "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b)",
                  borderRadius: "2px",
                  transform: "translateY(-50%)",
                  zIndex: 1,
                }}
              />

              {/* Pontos de progresso */}
              {[
                { level: "1", label: "Iniciante", color: "#CD7F32" },
                { level: "100", label: "Intermediário", color: "#FFD700" },
                { level: "1000", label: "Avançado", color: "#00BFFF" },
                { level: "5000", label: "Supremo", color: "#FFD700" },
              ].map((point, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    zIndex: 2,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "3rem",
                      height: "3rem",
                      borderRadius: "50%",
                      background: point.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "white",
                      boxShadow: `0 0 20px ${point.color}40`,
                      marginBottom: "0.5rem",
                      animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`,
                    }}
                  >
                    {point.level}
                  </div>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: "#9ca3af",
                      textAlign: "center",
                      maxWidth: "80px",
                    }}
                  >
                    {point.label}
                  </span>
                </div>
              ))}
            </div>

            <p
              style={{
                color: "#9ca3af",
                fontSize: "1rem",
                textAlign: "center",
                lineHeight: "1.6",
              }}
            >
              Cada nível representa uma nova conquista em sua jornada como
              desenvolvedor. Quanto mais você contribui, mais impressionantes
              seus escudos se tornam! 🚀
            </p>
          </div>

          {/* Exemplos de Escudos Reais */}
          <div
            style={{
              marginBottom: "2rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              className="grid-responsive"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                alignItems: "center",
                maxWidth: "100%",
                width: "100%",
              }}
            >
              {/* Nível 1 - Básico */}
              <div
                style={{
                  background: "rgba(17, 24, 39, 0.3)",
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                  border: "1px solid #CD7F32",
                  width: "100%",
                  maxWidth: "600px",
                  transition: "all 0.3s ease",
                  animation: "slideInLeft 0.8s ease-out 0.2s both",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-5px) scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(205, 127, 50, 0.3), 0 0 20px rgba(205, 127, 50, 0.2)";
                  e.currentTarget.style.borderColor = "#FFD700";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#CD7F32";
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#CD7F32",
                    margin: "0 0 1rem 0",
                    textAlign: "center",
                  }}
                >
                  🥉 Nível 1 - Iniciante
                </h3>
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "0.5rem",
                    padding: "1rem",
                    border: "1px solid rgba(75, 85, 99, 0.3)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: generateStatsSVG(
                        generateExampleData(1),
                        "dark",
                        "pt",
                        false
                      ),
                    }}
                    style={{
                      width: "100%",
                      height: "200px",
                      display: "block",
                      borderRadius: "0.5rem",
                    }}
                  />
                </div>
              </div>

              {/* Nível 100 - Médio */}
              <div
                style={{
                  background: "rgba(17, 24, 39, 0.3)",
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                  border: "1px solid #FFD700",
                  width: "100%",
                  maxWidth: "600px",
                  transition: "all 0.3s ease",
                  animation: "slideInRight 0.8s ease-out 0.4s both",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-5px) scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(255, 215, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.2)";
                  e.currentTarget.style.borderColor = "#FFA500";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#FFD700";
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#FFD700",
                    margin: "0 0 1rem 0",
                    textAlign: "center",
                  }}
                >
                  🥇 Nível 100 - Intermediário
                </h3>
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "0.5rem",
                    padding: "1rem",
                    border: "1px solid rgba(75, 85, 99, 0.3)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: generateStatsSVG(
                        generateExampleData(100),
                        "dark",
                        "pt",
                        false
                      ),
                    }}
                    style={{
                      width: "100%",
                      height: "200px",
                      display: "block",
                      borderRadius: "0.5rem",
                    }}
                  />
                </div>
              </div>

              {/* Nível 1000 - Alto */}
              <div
                style={{
                  background: "rgba(17, 24, 39, 0.3)",
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                  border: "1px solid #00BFFF",
                  width: "100%",
                  maxWidth: "600px",
                  transition: "all 0.3s ease",
                  animation: "slideInLeft 0.8s ease-out 0.6s both",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-5px) scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0, 191, 255, 0.3), 0 0 20px rgba(0, 191, 255, 0.2)";
                  e.currentTarget.style.borderColor = "#00FFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#00BFFF";
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#00BFFF",
                    margin: "0 0 1rem 0",
                    textAlign: "center",
                  }}
                >
                  💎 Nível 1000 - Avançado
                </h3>
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "0.5rem",
                    padding: "1rem",
                    border: "1px solid rgba(75, 85, 99, 0.3)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: generateStatsSVG(
                        generateExampleData(1000),
                        "dark",
                        "pt",
                        false
                      ),
                    }}
                    style={{
                      width: "100%",
                      height: "200px",
                      display: "block",
                      borderRadius: "0.5rem",
                    }}
                  />
                </div>
              </div>

              {/* Nível 5000 - Supremo */}
              <div
                style={{
                  background: "rgba(17, 24, 39, 0.3)",
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                  border: "1px solid #FFD700",
                  width: "100%",
                  maxWidth: "600px",
                  transition: "all 0.3s ease",
                  animation: "slideInRight 0.8s ease-out 0.8s both",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-5px) scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(255, 215, 0, 0.4), 0 0 30px rgba(255, 215, 0, 0.3)";
                  e.currentTarget.style.borderColor = "#FF6B35";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#FFD700";
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#FFD700",
                    margin: "0 0 1rem 0",
                    textAlign: "center",
                  }}
                >
                  👑 Nível 5000 - Supremo
                </h3>
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "0.5rem",
                    padding: "1rem",
                    border: "1px solid rgba(75, 85, 99, 0.3)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: generateStatsSVG(
                        generateExampleData(5000),
                        "dark",
                        "pt",
                        false
                      ),
                    }}
                    style={{
                      width: "100%",
                      height: "200px",
                      display: "block",
                      borderRadius: "0.5rem",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="card" style={{ marginBottom: "2rem" }}>
          <div style={{ textAlign: "center" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "white",
                marginBottom: "1rem",
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
                🎉 Pronto para Descobrir Seu Nível?
              </span>
            </h2>
            <p
              style={{
                color: "#9ca3af",
                fontSize: "1.25rem",
                maxWidth: "600px",
                margin: "0 auto 2rem auto",
                lineHeight: "1.6",
              }}
            >
              Gere seu escudo personalizado e veja em que nível você está na sua
              jornada como desenvolvedor!
            </p>

            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                color: "white",
                textDecoration: "none",
                fontSize: "1.125rem",
                fontWeight: "600",
                padding: "1rem 2rem",
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
              Gerar Meu Escudo Agora
            </Link>
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

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .card {
          background: rgba(17, 24, 39, 0.5);
          border: 1px solid rgba(75, 85, 99, 0.3);
          border-radius: 1rem;
          padding: 2rem;
          backdrop-filter: blur(10px);
        }

        @keyframes float {
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

        @keyframes pulse {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.05;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.08;
          }
        }

        @keyframes glow {
          0% {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3),
              0 0 40px rgba(59, 130, 246, 0.3);
          }
          100% {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3),
              0 0 60px rgba(59, 130, 246, 0.5);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes textGlow {
          0% {
            text-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
          }
          100% {
            text-shadow: 0 0 20px rgba(59, 130, 246, 0.6),
              0 0 30px rgba(139, 92, 246, 0.4);
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

        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        /* Responsive design improvements */
        @media (max-width: 1200px) {
          .grid-responsive[style*="minmax(350px"] {
            grid-template-columns: repeat(
              auto-fit,
              minmax(320px, 1fr)
            ) !important;
          }
        }

        @media (max-width: 1024px) {
          .card {
            margin: 1rem 0.5rem;
            padding: 1.25rem;
          }

          h1 {
            font-size: 2.5rem !important;
          }

          h2 {
            font-size: 1.75rem !important;
          }

          .grid-responsive {
            grid-template-columns: repeat(
              auto-fit,
              minmax(300px, 1fr)
            ) !important;
          }

          /* Ajustes específicos para cards de exemplos em tablets */
          .grid-responsive[style*="minmax(350px"] {
            grid-template-columns: repeat(
              auto-fit,
              minmax(300px, 1fr)
            ) !important;
          }
        }

        @media (max-width: 768px) {
          .card {
            margin: 0.75rem 0.25rem;
            padding: 1rem;
          }

          h1 {
            font-size: 2rem !important;
          }

          h2 {
            font-size: 1.5rem !important;
          }

          h3 {
            font-size: 1.25rem !important;
          }

          .grid-responsive {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }

          .flex-responsive {
            flex-direction: column !important;
            gap: 1rem !important;
          }

          .text-responsive {
            font-size: 0.875rem !important;
          }

          .padding-responsive {
            padding: 0.75rem !important;
          }

          .margin-responsive {
            margin: 0.5rem 0 !important;
          }

          /* Cards de exemplos em coluna única */
          .grid-responsive[style*="flexDirection: column"] {
            gap: 1.5rem !important;
            max-width: 100% !important;
          }

          /* Garantir que os cards não sejam cortados */
          .card {
            overflow: visible !important;
          }
        }

        @media (max-width: 480px) {
          .card {
            margin: 0.5rem 0.125rem;
            padding: 0.75rem;
          }

          h1 {
            font-size: 1.75rem !important;
          }

          h2 {
            font-size: 1.25rem !important;
          }

          h3 {
            font-size: 1.125rem !important;
          }

          .text-responsive {
            font-size: 0.75rem !important;
          }

          .padding-responsive {
            padding: 0.5rem !important;
          }
        }

        /* Touch-friendly interactions */
        @media (hover: none) and (pointer: coarse) {
          .card:hover {
            transform: none !important;
            box-shadow: none !important;
          }

          .interactive:hover {
            transform: scale(1.02) !important;
          }
        }
      `}</style>
    </div>
  );
}
