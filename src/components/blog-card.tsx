import { ArrowUpRight } from "lucide-react";
import { GlowCard } from "@/components/glow-card";
import { TiltCard } from "@/components/tilt-card";
import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@/lib/blog";

type BlogCardProps = {
  post: BlogPost;
  variant?: "default" | "featured";
  readingLabel: string;
};

/** Single blog card used in the hub list */
export function BlogCard({ post, variant = "default", readingLabel }: BlogCardProps) {
  const isFeatured = variant === "featured";
  const formatted = new Date(post.date).toLocaleDateString(post.locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}` as never} className="block h-full">
      <TiltCard intensity={isFeatured ? 4 : 7} className="h-full">
        <GlowCard
          padding="none"
          className="flex h-full flex-col overflow-hidden"
        >
          <div
            aria-hidden
            className={isFeatured ? "relative h-72 w-full overflow-hidden" : "relative h-40 w-full overflow-hidden"}
            style={{ background: post.cover }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_100%,rgba(5,8,22,0.7)_0%,rgba(5,8,22,0)_60%)]" />
            <div className="absolute left-5 top-5 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-black/40 px-2 py-0.5 text-[11px] font-medium text-white/95 backdrop-blur"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3 p-6">
            <h3
              className={
                isFeatured
                  ? "font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl"
                  : "font-display text-lg font-semibold leading-tight tracking-tight"
              }
            >
              {post.title}
            </h3>
            <p className={isFeatured ? "text-base text-muted-foreground" : "text-sm text-muted-foreground line-clamp-3"}>
              {post.description}
            </p>
            <div className="mt-auto flex items-center justify-between pt-4 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <span>
                {formatted} · {readingLabel}
              </span>
              <ArrowUpRight className="size-4" aria-hidden />
            </div>
          </div>
        </GlowCard>
      </TiltCard>
    </Link>
  );
}
