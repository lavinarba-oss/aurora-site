import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Prefix a root-relative asset path (e.g. "/cases/foo.png") with the configured
 * base path so static assets resolve under a GitHub Pages *project* site
 * (https://user.github.io/<repo>/). Plain <img>/url() strings are NOT rewritten
 * by Next's basePath — only next/link and next/image are — so anything that
 * references a file in /public by raw string must go through this helper.
 *
 * NEXT_PUBLIC_BASE_PATH is inlined at build time (empty locally / on a root
 * host, "/aurora-site" on Pages), so the value is available in both server and
 * client bundles. External URLs and non-rooted strings pass through untouched.
 */
export function assetPath(path: string): string {
  if (!path || !path.startsWith("/")) return path;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
