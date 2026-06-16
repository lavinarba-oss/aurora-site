import { cn, assetPath } from "@/lib/utils";

/**
 * The kind of UI a case represents. Drives which mockup scene renders.
 * Keep in sync with the `visual` field on CaseDef in lib/cases.ts.
 */
export type CaseVisualKind =
  | "dashboard"
  | "landing"
  | "calculator"
  | "quiz"
  | "bot"
  | "player"
  | "terminal"
  | "document"
  | "carousel";

type CaseVisualProps = {
  kind: CaseVisualKind;
  /** CSS gradient string from the case accent */
  accent: string;
  /** Client / product name shown in chrome where relevant */
  client?: string;
  /** Real screenshot of the shipped product (in /public). Takes priority over the CSS mockup. */
  image?: string;
  /** Object-position for the real screenshot */
  imagePosition?: "top" | "center";
  /** Fit mode for the real screenshot */
  imageFit?: "cover" | "contain";
  className?: string;
};

/**
 * The product a case delivered — a real screenshot when available,
 * otherwise a stylized CSS mockup keyed to the case kind.
 * Pure presentational (no hooks) so it renders on server and client alike.
 */
export function CaseVisual({
  kind,
  accent,
  client,
  image,
  imagePosition = "top",
  imageFit = "cover",
  className,
}: CaseVisualProps) {
  if (image) {
    return (
      <div
        className={cn(
          "relative isolate h-full w-full overflow-hidden",
          className
        )}
      >
        <div
          className="absolute inset-0 opacity-25 blur-2xl"
          style={{ background: accent }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assetPath(image)}
          alt={client ? `Реальный экран проекта — ${client}` : "Скриншот проекта"}
          loading="lazy"
          decoding="async"
          className={cn(
            "relative z-10 h-full w-full",
            imageFit === "contain" ? "object-contain" : "object-cover",
            imagePosition === "top" ? "object-top" : "object-center"
          )}
        />
        {/* subtle inner edge */}
        <div className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] ring-1 ring-inset ring-white/10" />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={cn(
        "relative isolate flex h-full w-full items-center justify-center overflow-hidden",
        className
      )}
    >
      {/* Aurora wash behind the device */}
      <div
        className="absolute inset-0 opacity-30 blur-2xl"
        style={{ background: accent }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_120%,rgba(5,8,22,0.85)_0%,rgba(5,8,22,0)_55%)]" />

      <div className="relative z-10 w-full max-w-[88%] [perspective:1400px]">
        <Scene kind={kind} accent={accent} client={client} />
      </div>
    </div>
  );
}

function Scene({
  kind,
  accent,
  client,
}: {
  kind: CaseVisualKind;
  accent: string;
  client?: string;
}) {
  switch (kind) {
    case "dashboard":
      return <DashboardScene accent={accent} client={client} />;
    case "landing":
      return <LandingScene accent={accent} client={client} />;
    case "calculator":
      return <CalculatorScene accent={accent} />;
    case "quiz":
      return <QuizScene accent={accent} />;
    case "bot":
      return <BotScene accent={accent} client={client} />;
    case "player":
      return <PlayerScene accent={accent} client={client} />;
    case "terminal":
      return <TerminalScene accent={accent} />;
    case "document":
      return <DocumentScene accent={accent} client={client} />;
    case "carousel":
      return <CarouselScene accent={accent} client={client} />;
    default:
      return <LandingScene accent={accent} client={client} />;
  }
}

/* ------------------------------------------------------------------ */
/* Frames                                                              */
/* ------------------------------------------------------------------ */

function BrowserFrame({
  children,
  url,
}: {
  children: React.ReactNode;
  url?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0B1030] shadow-2xl shadow-black/50 ring-1 ring-white/5">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-3 py-2">
        <span className="size-2 rounded-full bg-[#FF5F57]/70" />
        <span className="size-2 rounded-full bg-[#FEBC2E]/70" />
        <span className="size-2 rounded-full bg-[#28C840]/70" />
        <div className="ml-2 flex h-4 flex-1 items-center rounded-md bg-white/[0.05] px-2">
          <span className="truncate text-[7px] text-white/40">
            {url ?? "aurora.studio"}
          </span>
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-[44%] min-w-[150px] overflow-hidden rounded-[1.6rem] border border-white/12 bg-[#080B1E] p-1.5 shadow-2xl shadow-black/60 ring-1 ring-white/5">
      <div className="overflow-hidden rounded-[1.2rem] bg-[#0B1030]">
        {/* notch */}
        <div className="flex justify-center py-1.5">
          <span className="h-1 w-10 rounded-full bg-white/15" />
        </div>
        {children}
      </div>
    </div>
  );
}

/* small helpers */
function Bar({
  w = "w-full",
  className,
}: {
  w?: string;
  className?: string;
}) {
  return <span className={cn("block h-1.5 rounded-full bg-white/12", w, className)} />;
}

/* ------------------------------------------------------------------ */
/* Scenes                                                              */
/* ------------------------------------------------------------------ */

function DashboardScene({ accent, client }: { accent: string; client?: string }) {
  const kpis = [60, 8, 94];
  const bars = [40, 65, 50, 80, 60, 95, 72];
  return (
    <BrowserFrame url={`${(client ?? "app").toLowerCase().replace(/\s.*/, "")}.crm`}>
      <div className="flex h-[230px] text-[7px] sm:h-[260px]">
        {/* sidebar */}
        <div className="flex w-[22%] flex-col gap-2 border-r border-white/[0.06] bg-white/[0.02] p-2.5">
          <span
            className="mb-1 size-4 rounded-md"
            style={{ background: accent }}
          />
          {["Сделки", "Склады", "Доставка", "Аналитика", "Клиенты"].map((s, i) => (
            <span
              key={s}
              className={cn(
                "flex items-center gap-1 rounded-md px-1.5 py-1",
                i === 0 ? "bg-white/[0.06] text-white/80" : "text-white/35"
              )}
            >
              <span className="size-1.5 rounded-[3px] bg-current opacity-60" />
              <span className="hidden truncate sm:inline">{s}</span>
            </span>
          ))}
        </div>
        {/* main */}
        <div className="flex flex-1 flex-col gap-2.5 p-3">
          <div className="flex items-center justify-between">
            <Bar w="w-16" className="h-2 bg-white/25" />
            <span
              className="rounded-md px-2 py-1 text-[6px] font-semibold text-[#0A0E27]"
              style={{ background: accent }}
            >
              + Сделка
            </span>
          </div>
          {/* KPI cards */}
          <div className="grid grid-cols-3 gap-2">
            {kpis.map((v, i) => (
              <div
                key={i}
                className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2"
              >
                <Bar w="w-6" className="h-1 bg-white/20" />
                <span
                  className="mt-1.5 block bg-clip-text text-[13px] font-bold text-transparent"
                  style={{ backgroundImage: accent }}
                >
                  {v}
                  {i === 2 ? "%" : ""}
                </span>
              </div>
            ))}
          </div>
          {/* chart */}
          <div className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
            <Bar w="w-10" className="h-1 bg-white/20" />
            <div className="mt-2 flex h-[70%] items-end gap-1.5">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{
                    height: `${h}%`,
                    background: accent,
                    opacity: 0.55 + (i / bars.length) * 0.45,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function LandingScene({ accent, client }: { accent: string; client?: string }) {
  return (
    <BrowserFrame url={`${(client ?? "site").toLowerCase().replace(/[^a-zа-я0-9]/gi, "").slice(0, 10)}.ru`}>
      <div className="h-[230px] overflow-hidden sm:h-[260px]">
        {/* nav */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
          <span className="size-2.5 rounded-[4px]" style={{ background: accent }} />
          <div className="flex gap-2">
            {[10, 8, 9, 7].map((w, i) => (
              <span key={i} className="block h-1 rounded-full bg-white/15" style={{ width: w * 2 }} />
            ))}
          </div>
          <span
            className="rounded-md px-2 py-1 text-[6px] font-semibold text-[#0A0E27]"
            style={{ background: accent }}
          >
            Связаться
          </span>
        </div>
        {/* hero */}
        <div className="relative flex flex-col items-center gap-2 px-4 pt-5 pb-4 text-center">
          <div
            className="absolute inset-x-8 top-2 h-20 rounded-2xl opacity-25 blur-xl"
            style={{ background: accent }}
          />
          <span className="relative h-2.5 w-3/5 rounded-full bg-white/30" />
          <span className="relative h-2.5 w-2/5 rounded-full bg-white/20" />
          <span className="relative mt-1 h-1 w-1/2 rounded-full bg-white/12" />
          <span
            className="relative mt-1.5 rounded-md px-3 py-1.5 text-[6px] font-semibold text-[#0A0E27]"
            style={{ background: accent }}
          >
            Оставить заявку
          </span>
        </div>
        {/* feature cards */}
        <div className="grid grid-cols-3 gap-2 px-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2"
            >
              <span
                className="block size-3 rounded-md"
                style={{ background: accent, opacity: 0.8 }}
              />
              <Bar w="w-full" className="mt-2 h-1" />
              <Bar w="w-2/3" className="mt-1 h-1" />
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

function CalculatorScene({ accent }: { accent: string }) {
  return (
    <BrowserFrame url="calc.eden.ru">
      <div className="flex h-[230px] gap-3 p-3 text-[7px] sm:h-[260px]">
        {/* form */}
        <div className="flex w-[52%] flex-col gap-2.5">
          <Bar w="w-20" className="h-2 bg-white/25" />
          <div>
            <Bar w="w-12" className="mb-1 h-1 bg-white/20" />
            <div className="flex gap-1.5">
              {["Щебень", "Песок", "ПГС"].map((m, i) => (
                <span
                  key={m}
                  className={cn(
                    "flex-1 rounded-md py-1.5 text-center text-[6px]",
                    i === 0
                      ? "font-semibold text-[#0A0E27]"
                      : "border border-white/10 text-white/45"
                  )}
                  style={i === 0 ? { background: accent } : undefined}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
          <div>
            <Bar w="w-16" className="mb-1 h-1 bg-white/20" />
            <div className="flex h-6 items-center rounded-md border border-white/10 bg-white/[0.03] px-2">
              <span className="text-[7px] text-white/55">20 м³</span>
            </div>
          </div>
          <div>
            <Bar w="w-14" className="mb-1 h-1 bg-white/20" />
            <div className="relative h-1.5 rounded-full bg-white/10">
              <span
                className="absolute inset-y-0 left-0 w-2/3 rounded-full"
                style={{ background: accent }}
              />
              <span className="absolute -top-1 left-2/3 size-3.5 -translate-x-1/2 rounded-full border-2 border-[#0B1030] bg-white" />
            </div>
          </div>
        </div>
        {/* result */}
        <div className="flex w-[48%] flex-col justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <div>
            <Bar w="w-12" className="h-1 bg-white/20" />
            <div className="mt-2 flex items-end gap-1">
              <span
                className="bg-clip-text text-[22px] font-bold leading-none text-transparent"
                style={{ backgroundImage: accent }}
              >
                48 600
              </span>
              <span className="pb-0.5 text-[9px] text-white/60">₽</span>
            </div>
            <span className="mt-1 block text-[6px] text-white/40">с доставкой до объекта</span>
          </div>
          <div className="space-y-1.5">
            {[
              ["Материал", "31 200 ₽"],
              ["Доставка", "12 400 ₽"],
              ["Разгрузка", "5 000 ₽"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-[6px] text-white/45">
                <span>{k}</span>
                <span className="text-white/70">{v}</span>
              </div>
            ))}
          </div>
          <span
            className="rounded-md py-1.5 text-center text-[6px] font-semibold text-[#0A0E27]"
            style={{ background: accent }}
          >
            Оформить заявку
          </span>
        </div>
      </div>
    </BrowserFrame>
  );
}

function QuizScene({ accent }: { accent: string }) {
  const options = ["Квартира", "Дом", "Коммерция", "Инвестиции"];
  return (
    <BrowserFrame url="quiz.estate.ru">
      <div className="flex h-[230px] flex-col gap-3 p-4 text-[7px] sm:h-[260px]">
        {/* progress */}
        <div>
          <div className="flex justify-between text-[6px] text-white/45">
            <span>Шаг 3 из 6</span>
            <span>50%</span>
          </div>
          <div className="mt-1 h-1.5 rounded-full bg-white/10">
            <span
              className="block h-full w-1/2 rounded-full"
              style={{ background: accent }}
            />
          </div>
        </div>
        {/* question */}
        <div className="mt-1 space-y-1.5">
          <Bar w="w-4/5" className="h-2 bg-white/25" />
          <Bar w="w-2/5" className="h-1.5 bg-white/15" />
        </div>
        {/* options */}
        <div className="grid flex-1 grid-cols-2 gap-2">
          {options.map((o, i) => (
            <div
              key={o}
              className={cn(
                "flex items-center gap-2 rounded-lg border p-2",
                i === 1
                  ? "border-transparent"
                  : "border-white/[0.08] bg-white/[0.02]"
              )}
              style={
                i === 1
                  ? { background: accent, color: "#0A0E27" }
                  : undefined
              }
            >
              <span
                className={cn(
                  "size-3 rounded-full border",
                  i === 1 ? "border-[#0A0E27] bg-[#0A0E27]/20" : "border-white/30"
                )}
              />
              <span className={cn("text-[7px]", i === 1 ? "font-semibold" : "text-white/55")}>
                {o}
              </span>
            </div>
          ))}
        </div>
        <span
          className="self-end rounded-md px-4 py-1.5 text-[6px] font-semibold text-[#0A0E27]"
          style={{ background: accent }}
        >
          Далее →
        </span>
      </div>
    </BrowserFrame>
  );
}

function BotScene({ accent, client }: { accent: string; client?: string }) {
  return (
    <PhoneFrame>
      <div className="flex h-[250px] flex-col bg-[#0B1030] text-[7px]">
        {/* tg header */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-2.5 py-2">
          <span className="size-5 rounded-full" style={{ background: accent }} />
          <div>
            <span className="block h-1.5 w-14 rounded-full bg-white/30" />
            <span className="mt-1 block h-1 w-8 rounded-full bg-[#28C840]/60" />
          </div>
        </div>
        {/* chat */}
        <div className="flex flex-1 flex-col gap-2 p-2.5">
          <div className="max-w-[80%] self-start rounded-2xl rounded-bl-sm bg-white/[0.06] px-2.5 py-1.5">
            <Bar w="w-20" className="h-1 bg-white/35" />
            <Bar w="w-14" className="mt-1 h-1 bg-white/25" />
          </div>
          <div
            className="max-w-[80%] self-end rounded-2xl rounded-br-sm px-2.5 py-1.5"
            style={{ background: accent }}
          >
            <span className="block h-1 w-16 rounded-full bg-[#0A0E27]/50" />
            <span className="mt-1 block h-1 w-10 rounded-full bg-[#0A0E27]/30" />
          </div>
          {/* inline keyboard */}
          <div className="mt-auto grid grid-cols-2 gap-1.5">
            {["Записаться", "Расписание", "Цены", "Контакты"].map((b) => (
              <span
                key={b}
                className="rounded-md border border-white/10 bg-white/[0.04] py-1.5 text-center text-[6px] text-white/60"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
        {/* input */}
        <div className="flex items-center gap-2 border-t border-white/[0.06] px-2.5 py-2">
          <div className="h-4 flex-1 rounded-full bg-white/[0.05]" />
          <span className="size-4 rounded-full" style={{ background: accent }} />
        </div>
      </div>
    </PhoneFrame>
  );
}

function PlayerScene({ accent, client }: { accent: string; client?: string }) {
  return (
    <PhoneFrame>
      <div className="flex h-[250px] flex-col gap-2.5 bg-[#0B1030] p-3 text-[7px]">
        {/* art */}
        <div
          className="relative aspect-square w-full overflow-hidden rounded-xl"
          style={{ background: accent }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_120%,rgba(5,8,22,0.7),transparent)]" />
          <span className="absolute bottom-2 left-2 text-[8px] font-semibold text-white/90">
            {client ?? "LeanJe"}
          </span>
        </div>
        {/* track */}
        <div>
          <Bar w="w-24" className="h-1.5 bg-white/30" />
          <Bar w="w-12" className="mt-1 h-1 bg-white/15" />
        </div>
        {/* progress */}
        <div>
          <div className="h-1 rounded-full bg-white/10">
            <span className="block h-full w-2/5 rounded-full" style={{ background: accent }} />
          </div>
          <div className="mt-1 flex justify-between text-[6px] text-white/35">
            <span>1:24</span>
            <span>3:30</span>
          </div>
        </div>
        {/* controls */}
        <div className="flex items-center justify-center gap-4">
          <span className="size-2.5 rounded-sm bg-white/30" />
          <span
            className="grid size-7 place-items-center rounded-full text-[#0A0E27]"
            style={{ background: accent }}
          >
            <span className="ml-0.5 border-y-4 border-l-[7px] border-y-transparent border-l-[#0A0E27]" />
          </span>
          <span className="size-2.5 rounded-sm bg-white/30" />
        </div>
        {/* list */}
        <div className="mt-1 space-y-1.5">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="size-4 rounded-md bg-white/[0.06]" />
              <div className="flex-1">
                <Bar w="w-2/3" className="h-1 bg-white/20" />
                <Bar w="w-1/3" className="mt-1 h-0.5 bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

function TerminalScene({ accent }: { accent: string }) {
  const lines: Array<{ t: string; c?: string }> = [
    { t: "$ python recalc_margin.py --dry-run" },
    { t: "→ Подключение к Bitrix24 webhook…" },
    { t: "✓ Загружено сделок: 248" },
    { t: "Δ Маржа пересчитана: 36 сделок" },
    { t: "⚠ Аномалии: 3 (маржа < 0)" },
    { t: "✓ Готово за 4.2с · режим dry-run" },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#070A1A] shadow-2xl shadow-black/50 ring-1 ring-white/5">
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-3 py-2">
        <span className="size-2 rounded-full bg-[#FF5F57]/70" />
        <span className="size-2 rounded-full bg-[#FEBC2E]/70" />
        <span className="size-2 rounded-full bg-[#28C840]/70" />
        <span className="ml-2 text-[7px] text-white/35">recalc_margin.py — bash</span>
      </div>
      <div className="h-[230px] space-y-2 p-3.5 font-mono text-[8px] leading-relaxed sm:h-[260px]">
        {lines.map((l, i) => (
          <div
            key={i}
            className={cn(
              i === 0 ? "text-white/85" : "text-white/55"
            )}
            style={
              l.t.startsWith("✓") || l.t.startsWith("Δ")
                ? { color: "#28C840" }
                : l.t.startsWith("⚠")
                ? { color: "#FEBC2E" }
                : undefined
            }
          >
            {l.t}
          </div>
        ))}
        <div className="flex items-center gap-1 pt-1">
          <span className="text-white/60">$</span>
          <span
            className="inline-block h-3 w-1.5 animate-pulse"
            style={{ background: accent }}
          />
        </div>
      </div>
    </div>
  );
}

function DocumentScene({ accent, client }: { accent: string; client?: string }) {
  return (
    <div className="relative mx-auto w-[62%] min-w-[170px]">
      {/* back page */}
      <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-md border border-white/[0.06] bg-white/[0.04]" />
      <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-md border border-white/[0.08] bg-white/[0.06]" />
      {/* front page */}
      <div className="relative aspect-[1/1.414] overflow-hidden rounded-md bg-[#0E1430] shadow-2xl shadow-black/50 ring-1 ring-white/10">
        {/* header band */}
        <div className="relative h-1/4 px-3 py-3" style={{ background: accent }}>
          <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_100%_0%,rgba(255,255,255,0.25),transparent)]" />
          <span className="relative block h-2 w-1/2 rounded-full bg-[#0A0E27]/40" />
          <span className="relative mt-1.5 block h-1.5 w-1/3 rounded-full bg-[#0A0E27]/25" />
          <span className="absolute right-3 top-3 text-[7px] font-semibold text-[#0A0E27]/70">
            AURORRA
          </span>
        </div>
        {/* body */}
        <div className="space-y-2.5 p-3">
          <div className="flex gap-2">
            <span className="h-10 w-1/3 rounded-sm" style={{ background: accent, opacity: 0.5 }} />
            <div className="flex-1 space-y-1">
              {[5, 4, 5, 3].map((w, i) => (
                <span key={i} className="block h-1 rounded-full bg-white/15" style={{ width: `${w * 18}%` }} />
              ))}
            </div>
          </div>
          <div className="space-y-1">
            {[6, 5, 6, 4, 5].map((w, i) => (
              <span key={i} className="block h-1 rounded-full bg-white/10" style={{ width: `${w * 15}%` }} />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-8 rounded-sm bg-white/[0.05]" />
            ))}
          </div>
        </div>
        {/* footer signature */}
        <div className="absolute inset-x-3 bottom-2.5 flex items-center justify-between">
          <span className="h-1 w-1/4 rounded-full bg-white/10" />
          <span className="text-[6px] text-white/30">{client ?? "AURORRA"}</span>
        </div>
      </div>
    </div>
  );
}

function CarouselScene({ accent, client }: { accent: string; client?: string }) {
  return (
    <div className="relative mx-auto flex h-[250px] items-center justify-center">
      {/* back slides */}
      <div className="absolute aspect-square w-[42%] -rotate-6 rounded-2xl border border-white/10 bg-white/[0.04] shadow-xl shadow-black/40" />
      <div className="absolute aspect-square w-[42%] rotate-6 translate-x-6 rounded-2xl border border-white/10 bg-white/[0.06] shadow-xl shadow-black/40" />
      {/* front slide */}
      <div className="relative aspect-square w-[46%] min-w-[150px] overflow-hidden rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/10">
        <div className="absolute inset-0" style={{ background: accent }} />
        <div className="absolute inset-0 bg-[radial-gradient(90%_90%_at_50%_120%,rgba(5,8,22,0.85),transparent_60%)]" />
        <div className="relative flex h-full flex-col justify-between p-3.5 text-[7px]">
          <div className="flex items-center gap-1.5">
            <span className="size-4 rounded-full bg-white/85" />
            <span className="h-1.5 w-12 rounded-full bg-white/70" />
          </div>
          <div className="space-y-1.5">
            <span className="block h-2.5 w-5/6 rounded-full bg-white/90" />
            <span className="block h-2.5 w-3/5 rounded-full bg-white/70" />
            <span className="mt-2 block h-1.5 w-2/5 rounded-full bg-[#0A0E27]/30" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[7px] font-semibold text-[#0A0E27]/70">
              {client ?? "Русик Уфы"}
            </span>
            <span className="text-[8px] text-[#0A0E27]/60">→</span>
          </div>
        </div>
      </div>
      {/* dots */}
      <div className="absolute bottom-1 flex gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={cn(
              "size-1 rounded-full",
              i === 0 ? "w-3" : "bg-white/25"
            )}
            style={i === 0 ? { background: accent } : undefined}
          />
        ))}
      </div>
    </div>
  );
}
