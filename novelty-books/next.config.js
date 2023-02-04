/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    RUTA_BACK: "https://backendnoveltybooks.onrender.com",
    // RUTA_BACK: "https://localhost:3001",
    GITHUB_ID: "4e0965b23bd83d2b28bd",
    GITHUB_SECRET: "89d1a06ddb242851467593fd46e931a81c331ddc",

    GOOGLE_ID:
      "152335691114-27l3c5ihqvg0h46lu1u9i43uual3h1s3.apps.googleusercontent.com",
    GOOGLE_SECRET: "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",
  },
};

module.exports = nextConfig;
