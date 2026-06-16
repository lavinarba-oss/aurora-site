import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { asLocale, routing } from "@/i18n/routing";

// Pre-rendered at build time for the static export (one PNG per locale).
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "AURORRA — digital agency";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Dynamically rendered OG image for the home page of each locale */
export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeStr } = await params;
  const locale = asLocale(localeStr);
  const t = await getTranslations({
    locale,
    namespace: "home.hero",
  });

  const title = `${t("title")} ${t("titleAccent")}`;
  const eyebrow = t("eyebrow");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#050816",
          color: "#F8FAFC",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Aurora glow blobs */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -150,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "#B967FF",
            opacity: 0.25,
            filter: "blur(120px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -150,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "#01CDFE",
            opacity: 0.2,
            filter: "blur(120px)",
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: -0.5,
            zIndex: 1,
          }}
        >
          <span
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg,#B967FF 0%,#01CDFE 50%,#FF71CE 100%)",
              boxShadow: "0 0 30px #B967FF",
            }}
          />
          AURORRA
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontSize: 18,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#8B93B8",
            }}
          >
            {eyebrow}
          </span>
          <span
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: -1.5,
              maxWidth: 1000,
              backgroundImage:
                "linear-gradient(135deg,#B967FF 0%,#01CDFE 50%,#FF71CE 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {title}
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
