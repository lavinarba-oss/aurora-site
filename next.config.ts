import type { NextConfig } from "next";
import path from "node:path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// When deployed to a GitHub Pages *project* site the app is served from
// https://<user>.github.io/<repo>/ — so all routes and assets need that
// prefix. The Pages workflow sets PAGES_BASE_PATH=/aurora-site. Locally and
// on a root-domain host the var is empty, so basePath stays undefined.
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Fully static site — `next build` emits an `out/` folder of HTML/CSS/JS
  // that can be dropped on any static host (beget, timeweb, reg.ru, …).
  output: "export",
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  // Emit folder/index.html per route so clean URLs work on any dumb host.
  trailingSlash: true,
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Required for static export — no on-the-fly image optimizer at runtime.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);
