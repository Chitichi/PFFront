/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    RUTA_BACK: "https://backendnoveltybooks.onrender.com",
    // RUTA_BACK: "https://localhost:3001",
    NEXT_PUBLIC_GOOGLE_ID:
      "275120189754-6rb7h8aqnd58c20ung7g99su7dj7igcc.apps.googleusercontent.com",
    NEXT_PUBLIC_GOOGLE_SECRET: "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",
  },
};

module.exports = nextConfig;
