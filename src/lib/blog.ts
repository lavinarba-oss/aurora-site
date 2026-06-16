import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Locale } from "@/i18n/routing";

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  cover: string;
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
  locale: Locale;
  content: string;
  readingMinutes: number;
};

const ROOT = path.join(process.cwd(), "content", "blog");

function localeDir(locale: Locale) {
  return path.join(ROOT, locale);
}

/** List all posts in a locale, sorted newest first */
export function getAllPosts(locale: Locale): BlogPost[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => readPost(locale, file.replace(/\.(mdx|md)$/i, "")))
    .filter((p): p is BlogPost => Boolean(p))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Read a single post by slug; returns null if missing */
export function getPostBySlug(locale: Locale, slug: string): BlogPost | null {
  return readPost(locale, slug);
}

function readPost(locale: Locale, slug: string): BlogPost | null {
  const candidates = [".mdx", ".md"].map((ext) =>
    path.join(localeDir(locale), `${slug}${ext}`)
  );
  const file = candidates.find((p) => fs.existsSync(p));
  if (!file) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  const fm = data as Partial<BlogFrontmatter>;

  return {
    slug,
    locale,
    title: fm.title ?? slug,
    description: fm.description ?? "",
    date: fm.date ?? "2026-01-01",
    tags: fm.tags ?? [],
    author: fm.author ?? "AURORRA",
    cover: fm.cover ?? "linear-gradient(135deg,#B967FF,#01CDFE)",
    content,
    readingMinutes: Math.max(1, Math.round(stats.minutes)),
  };
}

/** All unique tags across all posts of the given locale, sorted alphabetically */
export function getAllTags(locale: Locale): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts(locale)) post.tags.forEach((t) => tags.add(t));
  return Array.from(tags).sort();
}
