import {
  MousePointerClick,
  LayoutGrid,
  Files,
  ShoppingBag,
  AppWindow,
  Workflow,
  Zap,
  Palette,
  Megaphone,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";
import type { SolutionSlug } from "./solutions";

/** Service slugs == solution slugs (single source of truth in solutions.ts) */
export type ServiceSlug = SolutionSlug;

export type ServiceDef = {
  slug: ServiceSlug;
  icon: LucideIcon;
  /** Accent gradient for icon background */
  accent: string;
  /** Where the detail page lives */
  href: `/services/${ServiceSlug}`;
};

export const SERVICES: ServiceDef[] = [
  {
    slug: "landing",
    icon: MousePointerClick,
    accent: "linear-gradient(135deg, #B967FF, #01CDFE)",
    href: "/services/landing",
  },
  {
    slug: "catalog",
    icon: LayoutGrid,
    accent: "linear-gradient(135deg, #01CDFE, #38BDF8)",
    href: "/services/catalog",
  },
  {
    slug: "multipage",
    icon: Files,
    accent: "linear-gradient(135deg, #38BDF8, #B967FF)",
    href: "/services/multipage",
  },
  {
    slug: "ecommerce",
    icon: ShoppingBag,
    accent: "linear-gradient(135deg, #B967FF, #FF71CE)",
    href: "/services/ecommerce",
  },
  {
    slug: "webapp",
    icon: AppWindow,
    accent: "linear-gradient(135deg, #FF71CE, #B967FF)",
    href: "/services/webapp",
  },
  {
    slug: "integrations",
    icon: Workflow,
    accent: "linear-gradient(135deg, #7C3AED, #38BDF8)",
    href: "/services/integrations",
  },
  {
    slug: "automation",
    icon: Zap,
    accent: "linear-gradient(135deg, #FF71CE, #01CDFE)",
    href: "/services/automation",
  },
  {
    slug: "design",
    icon: Palette,
    accent: "linear-gradient(135deg, #B967FF, #38BDF8)",
    href: "/services/design",
  },
  {
    slug: "marketing",
    icon: Megaphone,
    accent: "linear-gradient(135deg, #01CDFE, #FF71CE)",
    href: "/services/marketing",
  },
  {
    slug: "support",
    icon: LifeBuoy,
    accent: "linear-gradient(135deg, #7C3AED, #B967FF)",
    href: "/services/support",
  },
];

export function getService(slug: string): ServiceDef | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
