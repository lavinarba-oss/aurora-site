import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "en"] as const,
  defaultLocale: "ru",
  // /ru/* and /en/* — always show prefix so SEO is symmetric for both langs.
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

/**
 * Cast an unknown locale string to a strict Locale.
 * Falls back to the default locale if unrecognised — middleware should
 * already have filtered invalid ones, but this gives us a typed value.
 */
export function asLocale(locale: string): Locale {
  return (routing.locales as readonly string[]).includes(locale)
    ? (locale as Locale)
    : routing.defaultLocale;
}
