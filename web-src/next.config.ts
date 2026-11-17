import type { NextConfig } from "next";

// NEXT_PUBLIC_BASE_PATH задає підтеку, якщо сайт публікується не в корені домену (наприклад, "/next").
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Статичний експорт: сайт розміщується на GitHub Pages без сервера.
  output: "export",
  trailingSlash: true,
  basePath,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
