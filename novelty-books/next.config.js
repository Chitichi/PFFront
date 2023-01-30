/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    RUTA_BACK: "https://backendnoveltybooks.onrender.com"
  }
}

module.exports = nextConfig
