/** Top-level navigation as it appears in header and footer. */
export type NavItem = {
  /** i18n key under "nav.*" */
  key:
    | "home"
    | "services"
    | "cases"
    | "about"
    | "blog"
    | "faq"
    | "calculator"
    | "contacts";
  /** Pathname relative to a locale */
  href: string;
};

export const NAV: NavItem[] = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "cases", href: "/cases" },
  { key: "about", href: "/about" },
  { key: "blog", href: "/blog" },
  { key: "faq", href: "/faq" },
  { key: "calculator", href: "/calculator" },
  { key: "contacts", href: "/contacts" },
];

export const SITE = {
  brand: "AURORA",
  email: "hi@aurora.digital",
  telegram: "https://t.me/aurora_digital",
  whatsapp: "https://wa.me/79999999999",
  // Placeholders — replace before launch
};
