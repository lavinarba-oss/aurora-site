import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Sparkles } from "lucide-react";
import { AuroraBackground } from "@/components/aurora-background";
import { GradientText } from "@/components/gradient-text";
import { Reveal } from "@/components/reveal";
import { BlogCard } from "@/components/blog-card";
import { ServiceCta } from "@/components/sections/service-cta";
import { getAllPosts } from "@/lib/blog";
import { asLocale, type Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeStr } = await params;
  const locale = asLocale(localeStr);
  const t = await getTranslations({ locale, namespace: "blog.hub" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { ru: "/ru/blog", en: "/en/blog" },
    },
  };
}

export default async function BlogHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeStr } = await params;
  const locale = asLocale(localeStr);
  setRequestLocale(locale);

  const t = await getTranslations("blog.hub");
  const tPost = await getTranslations("blog.post");
  const posts = getAllPosts(locale);

  if (posts.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="font-display text-4xl font-semibold">{t("title")}</h1>
        <p className="mt-4 text-muted-foreground">{t("empty")}</p>
      </main>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <AuroraBackground />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-28 pb-12 text-center sm:pt-36 sm:pb-16">
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
            <Sparkles
              className="size-3.5 text-[var(--aurora-cyan)]"
              aria-hidden
            />
            {t("eyebrow")}
          </span>

          <h1 className="mt-8 font-display text-4xl font-semibold leading-[1.04] tracking-tight text-balance sm:text-6xl md:text-7xl">
            <GradientText>{t("title")}</GradientText>
          </h1>

          <p className="mt-6 max-w-2xl text-base text-muted-foreground text-balance sm:text-lg">
            {t("subtitle")}
          </p>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background"
        />
      </section>

      {/* Featured */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <BlogCard
              post={featured}
              variant="featured"
              readingLabel={tPost("readingMinutes", { minutes: featured.readingMinutes })}
            />
          </Reveal>
        </div>
      </section>

      {/* Rest */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Reveal key={post.slug} child>
                <BlogCard
                  post={post}
                  readingLabel={tPost("readingMinutes", { minutes: post.readingMinutes })}
                />
              </Reveal>
            ))}
          </Reveal>
        </div>
      </section>

      <ServiceCta />
    </>
  );
}
