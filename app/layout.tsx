import "./globals.css";

export const metadata = {
  title: "GitHub Stats Generator | Gerador de Estatísticas do GitHub",
  description:
    "Gere estatísticas dinâmicas do GitHub em formato SVG para seu perfil. Ferramenta gratuita e fácil de usar para desenvolvedores.",
  keywords: [
    "github",
    "stats",
    "estatísticas",
    "svg",
    "perfil",
    "desenvolvedor",
    "programador",
  ],
  authors: [{ name: "Matheus Renzo" }],
  creator: "Matheus Renzo",
  publisher: "GitHub Stats Generator",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://github-stats.vercel.app",
    title: "GitHub Stats Generator",
    description:
      "Gere estatísticas dinâmicas do GitHub em formato SVG para seu perfil",
    siteName: "GitHub Stats Generator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GitHub Stats Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub Stats Generator",
    description:
      "Gere estatísticas dinâmicas do GitHub em formato SVG para seu perfil",
    images: ["/og-image.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#3b82f6",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
