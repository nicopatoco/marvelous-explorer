/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.annihil.us'],
  },
  env: {
    PUBLIC_MARVEL_API_KEY: process.env.PUBLIC_MARVEL_API_KEY,
    PRIVATE_MARVEL_API_KEY: process.env.PRIVATE_MARVEL_API_KEY,
  },
}

export default nextConfig
