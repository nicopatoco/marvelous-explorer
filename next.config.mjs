/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.annihil.us',
      },
      {
        protocol: 'http',
        hostname: 'i.annihil.us',
      },
    ],
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      // Production-specific configurations
      // Next.js automatically minimizes and optimizes your assets
      // This is true by default in production
      config.optimization.minimize = true
    }
    return config
  },
  env: {
    PUBLIC_MARVEL_API_KEY: process.env.PUBLIC_MARVEL_API_KEY,
    PRIVATE_MARVEL_API_KEY: process.env.PRIVATE_MARVEL_API_KEY,
    BASE_CHARACTER_URL: process.env.BASE_CHARACTER_URL,
  },
}

export default nextConfig
