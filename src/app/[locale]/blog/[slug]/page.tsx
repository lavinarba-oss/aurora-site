import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { AuroraBackground } from "@/components/aurora-background";
import { GradientText } from "@/components/gradient-text";
import { GlowCard } from "@/components/glow-card";
import { Reveal } from "@/components/reveal";
import { ServiceCta } from "@/components/sections/service-cta";
import { Link } from "@/i18n/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { routing, asLocale, type Locale } from "@/i18n/routing";

type RouteParams = { locale: string; slug: string };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllPosts(locale).map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { locale: localeStr, slug } = await params;
  const locale = asLocale(localeStr);
  const post = getPostBySlug(locale, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: {
        ru: `/ru/blog/${slug}`,
        en: `/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { locale: localeStr, slug } = await params;
  const locale = asLocale(localeStr);
  const post = getPostBySlug(locale, slug);
  if (!post) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("blog.post");
  const all = getAllPosts(locale);
  const idx = all.findIndex((p) => p.slug === slug);
  const next = all[(idx + 1) % all.length];

  const formatted = new Date(post.date).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <AuroraBackground />
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-28 pb-12 sm:pt-36 sm:pb-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            {t("back")}
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
              <Sparkles
                className="size-3.5 text-[var(--aurora-cyan)]"
                aria-hidden
              />
              {formatted}
            </span>
            <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-xs font-medium text-muted-foreground">
              {t("readingMinutes", { minutes: post.readingMinutes })}
            </span>
          </div>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.06] tracking-tight text-balance sm:text-5xl md:text-6xl">
            <GradientText>{post.title}</GradientText>
          </h1>

          <p className="mt-6 max-w-2xl text-base text-muted-foreground text-balance sm:text-lg">
            {post.description}
          </p>
        </div>
      </section>

      {/* Cover band */}
      <section className="relative pb-4">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div
            aria-hidden
            className="relative aspect-[16/5] overflow-hidden rounded-3xl border border-white/[0.06]"
            style={{ background: post.cover }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_100%,rgba(5,8,22,0.7)_0%,rgba(5,8,22,0)_60%)]" />
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="relative py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="prose">
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
            />
          </div>

          {post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {/* Next post */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Link href={`/blog/${next.slug}` as never} className="block">
            <Reveal>
              <GlowCard padding="lg" className="flex items-center justify-between gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {t("next")}
                  </span>
                  <span className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                    {next.title}
                  </span>
                </div>
                <ArrowRight
                  className="size-6 text-[var(--aurora-cyan)]"
                  aria-hidden
                />
              </GlowCard>
            </Reveal>
          </Link>
        </div>
      </section>

      <ServiceCta />
    </>
  );
}
