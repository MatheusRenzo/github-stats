/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações de imagem otimizadas para Vercel
  images: {
    unoptimized: true,
    domains: ["avatars.githubusercontent.com"],
  },

  // Configurações de cache para APIs
  async headers() {
    return [
      {
        source: "/api/stats",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=3600",
          },
        ],
      },
    ];
  },

  // Configurações de webpack
  webpack: (config, { isServer }) => {
    // Configuração para resolver problemas de case sensitivity no Windows
    config.watchOptions = {
      ...config.watchOptions,
      ignored: /node_modules/,
    };

    // Configurar resolver para ser case-insensitive
    config.resolve = {
      ...config.resolve,
      symlinks: false,
    };

    // Configurar para ignorar avisos de case sensitivity
    config.stats = {
      ...config.stats,
      warnings: false, // Desabilitar avisos completamente
    };

    return config;
  },

  // Configurações de experimental features para melhor performance
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
