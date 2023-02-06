/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    RUTA_BACK: "https://backendnoveltybooks.onrender.com",
    // RUTA_BACK: "https://localhost:3001",
    
  },
};

module.exports = nextConfig;
