"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
}

export default function Header({
  showBackButton = false,
  backButtonText = "← Voltar para o Gerador",
  backButtonHref = "/",
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Gerador", href: "/", icon: "⚡" },
    { name: "Rankings", href: "/ranking", icon: "🏆" },
    { name: "Sobre", href: "/about", icon: "👨‍💻" },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(15, 23, 42, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(75, 85, 99, 0.3)",
        padding: "1rem 0",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo and Back Button Container */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {/* Back Button */}
          {showBackButton && (
            <Link
              href={backButtonHref}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: "500",
                transition: "all 0.2s ease",
                background: "rgba(75, 85, 99, 0.1)",
                color: "#9ca3af",
                border: "1px solid rgba(75, 85, 99, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(75, 85, 99, 0.2)";
                e.currentTarget.style.color = "#d1d5db";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(75, 85, 99, 0.1)";
                e.currentTarget.style.color = "#9ca3af";
              }}
            >
              <span style={{ fontSize: "1rem" }}>←</span>
              {backButtonText}
            </Link>
          )}

          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.25rem",
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
                style={{ width: "1.25rem", height: "1.25rem", color: "white" }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <span
              style={{
                background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              GitHub Stats
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
          className="desktop-nav"
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: "500",
                transition: "all 0.2s ease",
                background: isActive(item.href)
                  ? "rgba(59, 130, 246, 0.2)"
                  : "transparent",
                color: isActive(item.href) ? "#60a5fa" : "#9ca3af",
                border: isActive(item.href)
                  ? "1px solid rgba(59, 130, 246, 0.3)"
                  : "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.href)) {
                  e.currentTarget.style.background = "rgba(75, 85, 99, 0.1)";
                  e.currentTarget.style.color = "#d1d5db";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.href)) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#9ca3af";
                }
              }}
            >
              <span style={{ fontSize: "1rem" }}>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: "none",
            flexDirection: "column",
            gap: "0.25rem",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
            borderRadius: "0.375rem",
          }}
          className="mobile-menu-button"
        >
          <div
            style={{
              width: "1.5rem",
              height: "2px",
              background: "white",
              borderRadius: "1px",
              transition: "all 0.3s ease",
              transform: isMenuOpen
                ? "rotate(45deg) translate(5px, 5px)"
                : "none",
            }}
          />
          <div
            style={{
              width: "1.5rem",
              height: "2px",
              background: "white",
              borderRadius: "1px",
              transition: "all 0.3s ease",
              opacity: isMenuOpen ? 0 : 1,
            }}
          />
          <div
            style={{
              width: "1.5rem",
              height: "2px",
              background: "white",
              borderRadius: "1px",
              transition: "all 0.3s ease",
              transform: isMenuOpen
                ? "rotate(-45deg) translate(7px, -6px)"
                : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        style={{
          display: isMenuOpen ? "block" : "none",
          background: "rgba(15, 23, 42, 0.98)",
          borderTop: "1px solid rgba(75, 85, 99, 0.3)",
          padding: "1rem 2rem",
        }}
        className="mobile-nav"
      >
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "1rem",
                borderRadius: "0.5rem",
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: "500",
                transition: "all 0.2s ease",
                background: isActive(item.href)
                  ? "rgba(59, 130, 246, 0.2)"
                  : "rgba(75, 85, 99, 0.1)",
                color: isActive(item.href) ? "#60a5fa" : "#d1d5db",
                border: isActive(item.href)
                  ? "1px solid rgba(59, 130, 246, 0.3)"
                  : "1px solid transparent",
              }}
            >
              <span style={{ fontSize: "1.25rem" }}>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }

          .mobile-menu-button {
            display: flex !important;
          }
        }

        @media (min-width: 769px) {
          .mobile-nav {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
