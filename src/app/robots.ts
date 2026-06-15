import type { MetadataRoute } from "next";

// Generated once at build time for the static export.
export const dynamic = "force-static";

const SITE = "https://aurora.digital";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
