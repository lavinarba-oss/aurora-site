import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SERVICES } from "@/lib/services";
import { CASES } from "@/lib/cases";
import { getAllPosts } from "@/lib/blog";

// Generated once at build time for the static export.
export const dynamic = "force-static";

const SITE = "https://aurora.digital";

/**
 * Sitemap covers every page in every locale, with hreflang alternates
 * so Google understands /ru and /en as language variants of one URL.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [];

  const staticPaths = ["", "/services", "/cases", "/about", "/blog", "/faq", "/calculator", "/contacts"];

  for (const path of staticPaths) {
    pages.push(makeEntry(path, now));
  }

  for (const svc of SERVICES) {
    pages.push(makeEntry(svc.href, now));
  }

  for (const c of CASES) {
    pages.push(makeEntry(`/cases/${c.slug}`, new Date(`${c.year}-06-01`)));
  }

  for (const locale of routing.locales) {
    for (const post of getAllPosts(locale)) {
      // Skip duplicates: post in second locale will repeat the slug.
      // We dedupe by adding only once via the first locale.
      if (locale !== routing.defaultLocale) continue;
      pages.push(makeEntry(`/blog/${post.slug}`, new Date(post.date)));
    }
  }

  return pages;
}

function makeEntry(path: string, lastModified: Date) {
  const ru = `${SITE}/ru${path}`;
  const en = `${SITE}/en${path}`;

  return {
    url: ru,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : path.startsWith("/cases") || path.startsWith("/blog") ? 0.6 : 0.8,
    alternates: {
      languages: {
        ru,
        en,
      },
    },
  };
}
