/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  webpack: (config, { isServer }) => {
    // Configuração para resolver problemas de case sensitivity no Windows
    config.watchOptions = {
      ...config.watchOptions,
      ignored: /node_modules/,
    }
    
    // Configurar resolver para ser case-insensitive
    config.resolve = {
      ...config.resolve,
      symlinks: false,
    }
    
    // Configurar para ignorar avisos de case sensitivity
    config.stats = {
      ...config.stats,
      warnings: false, // Desabilitar avisos completamente
    }
    
    return config
  }
}

module.exports = nextConfig