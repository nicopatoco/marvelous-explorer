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
  env: {
    PUBLIC_MARVEL_API_KEY: process.env.PUBLIC_MARVEL_API_KEY,
    PRIVATE_MARVEL_API_KEY: process.env.PRIVATE_MARVEL_API_KEY,
    BASE_CHARACTER_URL: process.env.BASE_CHARACTER_URL,
  },
}

export default nextConfig
