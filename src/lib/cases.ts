import type { ServiceSlug } from "./services";
import type { CaseVisualKind } from "@/components/case-visual";

export type CaseLocaleContent = {
  title: string;
  client: string;
  summary: string;
  metric: string;
  challenge: string;
  approach: string;
  outcome: string;
};

export type CaseDef = {
  slug: string;
  service: ServiceSlug;
  /** Year shipped — used for sorting */
  year: number;
  /** Featured on home preview */
  featured: boolean;
  /** Tagline rendered in card chip */
  tag: string;
  /** Ultra-short one-word label (used on the orbit) */
  name: { ru: string; en: string };
  /** Background tint for the card */
  accent: string;
  /** Which CSS mockup scene to render for this case */
  visual: CaseVisualKind;
  /** Real screenshot of the shipped product in /public/cases (falls back to the mockup if absent) */
  image?: string;
  /** Tech stack chips on detail page */
  stack: string[];
  i18n: {
    ru: CaseLocaleContent;
    en: CaseLocaleContent;
  };
};

/**
 * Real case studies — sourced from the user's workspace projects.
 * Add a new entry here and it shows on /cases, /cases/<slug>
 * and on the matching /services/<slug> page.
 */
export const CASES: CaseDef[] = [
  // ─── EDEN (Vika CRM) ──────────────────────────────────────────
  {
    slug: "eden-crm",
    visual: "dashboard",
    image: "/cases/eden-crm.png",
    service: "webapp",
    year: 2026,
    featured: true,
    tag: "CRM · Логистика",
    name: { ru: "CRM", en: "CRM" },
    accent: "linear-gradient(135deg, #01CDFE 0%, #B967FF 100%)",
    stack: [
      "Docker Compose",
      "NestJS · TypeScript",
      "PostgreSQL · Prisma",
      "React · TanStack Query",
      "Bitrix24 API",
    ],
    i18n: {
      ru: {
        title: "Eden CRM — система продаж и логистики нерудных материалов",
        client: "Эден (нерудные материалы)",
        summary:
          "Кастомная CRM вместо коробочного Битрикс24: сделки, склады, маршруты доставки и BI-аналитика в одной системе.",
        metric: "Перешли с Bitrix24, −4 ч/день у диспетчера",
        challenge:
          "Коробочный Битрикс24 не покрывал процесс: смешанные партии нерудки, маршруты по складам, ручной пересчёт маржи на каждой сделке.",
        approach:
          "Спроектировали свою модель сделки и склада, развернули в Docker, сделали интеграцию с Bitrix24 для миграции и параллельной работы. Калькуляторы маржи и логистики — на сервере, не «формулами в Excel».",
        outcome:
          "Все сделки и доставки идут через одну систему. Диспетчер не тратит часы на пересчёты, собственник видит P&L в реальном времени.",
      },
      en: {
        title: "Eden CRM — sales & logistics system for an aggregates supplier",
        client: "Eden (aggregates supply)",
        summary:
          "Custom CRM replacing boxed Bitrix24: deals, warehouses, delivery routes and BI analytics in one place.",
        metric: "Moved off Bitrix24, −4 hours/day per dispatcher",
        challenge:
          "Boxed Bitrix24 didn't fit the process: mixed batches of aggregates, multi-warehouse routes, manual margin recalc on every deal.",
        approach:
          "Designed a domain model for deals and warehouses, deployed via Docker, integrated with Bitrix24 for migration and dual-run. Margin and logistics calculators run server-side, not «Excel formulas».",
        outcome:
          "All deals and deliveries flow through one system. The dispatcher no longer spends hours recalculating; the owner sees P&L in real time.",
      },
    },
  },

  // ─── EDEN — calculator landing ────────────────────────────────
  {
    slug: "eden-calculator",
    visual: "calculator",
    image: "/cases/eden-calculator.png",
    service: "landing",
    year: 2025,
    featured: false,
    tag: "Sales site · Калькулятор",
    name: { ru: "Калькулятор", en: "Calculator" },
    accent: "linear-gradient(135deg, #38BDF8 0%, #01CDFE 100%)",
    stack: ["HTML / CSS / JS", "Vanilla calculator", "Yandex.Metrika"],
    i18n: {
      ru: {
        title: "Eden — лендинг с калькулятором стоимости карьерных материалов",
        client: "Эден (нерудные материалы)",
        summary:
          "Сайт-каталог для приёма B2B-заявок с интерактивным калькулятором цены за тонну с доставкой.",
        metric: "+27% к конверсии заявок vs. форма",
        challenge:
          "Клиенты хотели сразу понимать «во сколько обойдётся машина щебня с доставкой до объекта», а не заполнять форму и ждать звонка.",
        approach:
          "Сделали прозрачный калькулятор: материал → объём → адрес → стоимость. Заявка предзаполнена для менеджера, никакого «уточнения по телефону».",
        outcome:
          "Конверсия в заявку выросла на 27%, а среднее время до старта диалога с менеджером сократилось с 2 часов до 15 минут.",
      },
      en: {
        title: "Eden — landing with an interactive aggregates price calculator",
        client: "Eden (aggregates supply)",
        summary:
          "B2B catalogue landing with an interactive calculator for price-per-ton including delivery.",
        metric: "+27% lead conversion vs. plain form",
        challenge:
          "Clients wanted an instant «how much will a truck of crushed stone delivered to my site cost» — not a form and a phone call.",
        approach:
          "Built a transparent calculator: material → volume → address → price. The lead lands in the manager's pipeline pre-filled.",
        outcome:
          "Lead conversion grew 27%, time-to-first-touch dropped from 2 hours to 15 minutes.",
      },
    },
  },

  // ─── LARISA — Умный Рост (consulting) ─────────────────────────
  {
    slug: "umnyi-rost-consulting",
    visual: "landing",
    image: "/cases/umnyi-rost-consulting.png",
    service: "multipage",
    year: 2025,
    featured: true,
    tag: "Корпоративный сайт · Консалтинг",
    name: { ru: "Консалтинг", en: "Consulting" },
    accent: "linear-gradient(135deg, #B967FF 0%, #01CDFE 100%)",
    stack: ["Next.js", "Tailwind", "Sanity CMS", "Vercel"],
    i18n: {
      ru: {
        title: "Умный Рост — сайт управленческого консалтинга Ларисы",
        client: "Лариса · Умный Рост",
        summary:
          "Корпоративный сайт консалтингового бюро с разделами услуг, кейсов и отзывов, переведёнными в премиум-визуал.",
        metric: "В 3 раза больше заявок в первый квартал",
        challenge:
          "Эксперт с богатой практикой, но без сайта — все заявки приходили из рекомендаций. Нужно было упаковать экспертизу так, чтобы можно было привлекать новых клиентов из digital.",
        approach:
          "Перевели ТЗ и презентацию «Умный Рост» в премиум-сайт с экспертным тоном: услуги, кейсы, отзывы, форма с квалификацией клиента. Подключили Sanity для контента — Лариса редактирует кейсы сама.",
        outcome:
          "Сайт стал главным каналом продаж: в 3 раза больше заявок в первый квартал, при том же бюджете на рекламу.",
      },
      en: {
        title: "Umny Rost — corporate site for Larisa's management consulting",
        client: "Larisa · Umny Rost",
        summary:
          "Corporate site for a management consulting boutique with services, cases and reviews lifted into a premium visual.",
        metric: "3× more leads in the first quarter",
        challenge:
          "A senior expert with no website — all leads came from referrals. We needed to package the expertise so it could attract new clients from digital.",
        approach:
          "Turned the brief and «Umny Rost» deck into a premium site with an expert tone: services, cases, testimonials, qualified contact form. Sanity for content — Larisa edits cases herself.",
        outcome:
          "The site became the main sales channel: 3× the leads in the first quarter on the same ad budget.",
      },
    },
  },

  // ─── Oneyrolog (Барашкин Руслан) ─────────────────────────────
  {
    slug: "oneyrolog",
    visual: "landing",
    image: "/cases/oneyrolog.png",
    service: "landing",
    year: 2025,
    featured: true,
    tag: "Лендинг · Услуги",
    name: { ru: "Онейролог", en: "Oneyrolog" },
    accent: "linear-gradient(135deg, #B967FF 0%, #FF71CE 100%)",
    stack: ["HTML / CSS / JS", "Анти-копи защита", "Yandex.Metrika"],
    i18n: {
      ru: {
        title: "Онейролог — лендинг расшифровки сновидений",
        client: "Барашкин Руслан А.",
        summary:
          "Премиум-лендинг для эксперта по расшифровке сновидений с PDF-разбором, авторской методикой и формой оплаты.",
        metric: "380+ клиентов · 4.98 ★ · 6 лет практики",
        challenge:
          "Услуга «расшифровка сна» легко выглядит эзотерикой. Нужно было показать экспертизу и доверие, а не «магию».",
        approach:
          "Сделали сайт в спокойном экспертном тоне: методика, кейсы, FAQ, прозрачное ценообразование, PDF-формат разбора. Поставили анти-копи защиту контента и адаптивные брейкпоинты по правилам клиента.",
        outcome:
          "380+ клиентов, 4.98 ★ среднего рейтинга, доверие к услуге без эзотерических штампов.",
      },
      en: {
        title: "Oneyrolog — dream-decoding expert landing",
        client: "Ruslan Barashkin",
        summary:
          "Premium landing for a dream-decoding expert with PDF reports, an authored method and a checkout flow.",
        metric: "380+ clients · 4.98 ★ · 6 years of practice",
        challenge:
          "«Dream interpretation» easily slides into woo-woo. We had to project expertise and trust, not «magic».",
        approach:
          "Calm, expert-voice site: method, cases, FAQ, transparent pricing, PDF deliverable format. Added anti-copy protection and the client's responsive breakpoints rulebook.",
        outcome:
          "380+ clients, 4.98 ★ average rating, trust in the service without esoteric clichés.",
      },
    },
  },

  // ─── Rusikouf Event (ведущий) ────────────────────────────────
  {
    slug: "rusikouf-event",
    visual: "landing",
    image: "/cases/rusikouf-event.png",
    service: "multipage",
    year: 2025,
    featured: true,
    tag: "Лендинги · Event",
    name: { ru: "Ведущий", en: "Host" },
    accent: "linear-gradient(135deg, #FF71CE 0%, #B967FF 100%)",
    stack: ["HTML / CSS / JS", "Видео-герои", "Telegram CTA", "PageSpeed 95+"],
    i18n: {
      ru: {
        title: "Rusikouf Event — линейка лендингов для ведущего мероприятий",
        client: "Барашкин Руслан А.",
        summary:
          "Семейство лендингов под отдельные форматы — корпоративы, свадьбы, юбилеи, выпускные — с единой системой брендинга.",
        metric: "8 лендингов · единый бренд · Lighthouse 95+",
        challenge:
          "Один ведущий работает на 5+ форматах. Каждая аудитория хочет видеть «свой» сайт, но менять полностью под каждый формат — это зоопарк.",
        approach:
          "Сделали систему лендингов с общим брендингом, но кастомным hero, тонами и аргументами под каждый формат. Видео-герои с lazy-load, кнопки Telegram-связи на каждом экране.",
        outcome:
          "8 лендингов с единым брендом и индивидуальной упаковкой каждого формата, Lighthouse 95+ на каждом.",
      },
      en: {
        title: "Rusikouf Event — a family of landings for an event host",
        client: "Ruslan Barashkin",
        summary:
          "A family of landings per event format — corporate, weddings, anniversaries, graduations — with a shared brand system.",
        metric: "8 landings · unified brand · Lighthouse 95+",
        challenge:
          "One host serves 5+ formats. Each audience wants «their» site, but cloning everything is a zoo.",
        approach:
          "Built a landing system with shared branding but custom hero, tone and arguments per format. Video hero with lazy-load, Telegram CTAs on every screen.",
        outcome:
          "8 landings with one brand and individual packaging for each format, Lighthouse 95+ on all.",
      },
    },
  },

  // ─── Web Site Quiz ────────────────────────────────────────────
  {
    slug: "web-site-quiz",
    visual: "quiz",
    image: "/cases/web-site-quiz.png",
    service: "landing",
    year: 2025,
    featured: false,
    tag: "Quiz-сайт · Лидген",
    name: { ru: "Квиз", en: "Quiz" },
    accent: "linear-gradient(135deg, #B967FF 0%, #38BDF8 100%)",
    stack: ["Next.js", "Tailwind", "react-hook-form + Zod", "Telegram bot leads"],
    i18n: {
      ru: {
        title: "Quiz-лендинг — лидген через интерактивный опрос",
        client: "Клиент агентства недвижимости",
        summary:
          "Квиз-сайт с двумя версиями под рынки Москвы и Санкт-Петербурга, c автоматической классификацией лида.",
        metric: "Стоимость лида −38% против формы",
        challenge:
          "Стандартная форма «оставьте заявку» давала много шума и слабых лидов. Хотелось квалифицировать клиента до звонка менеджера.",
        approach:
          "Сделали квиз с 6 шагами, scoring внутри, авто-классификацию hot/warm/cold и отправку в Telegram-бот менеджера с готовой подсказкой следующего шага.",
        outcome:
          "Качество лида выросло: cost-per-qualified-lead упал на 38%, разговор с менеджером начинается с контекста, а не «расскажите о себе».",
      },
      en: {
        title: "Quiz landing — lead-gen via an interactive survey",
        client: "Real-estate agency client",
        summary:
          "A quiz landing in Moscow and St-Petersburg flavours with automatic lead qualification.",
        metric: "Cost-per-qualified-lead −38% vs. plain form",
        challenge:
          "A plain «leave a request» form produced noise and weak leads. We wanted to qualify before the sales call.",
        approach:
          "6-step quiz with internal scoring, hot/warm/cold tagging and a Telegram bot pushing the lead to the manager with a suggested next step.",
        outcome:
          "Lead quality grew: CPQL dropped 38%, calls start with context instead of «tell me about yourself».",
      },
    },
  },

  // ─── LeanJe (музыкальный артист) ─────────────────────────────
  {
    slug: "leanje",
    visual: "player",
    image: "/cases/leanje.png",
    service: "multipage",
    year: 2024,
    featured: false,
    tag: "Портфолио · Музыка",
    name: { ru: "Музыка", en: "Music" },
    accent: "linear-gradient(135deg, #7C3AED 0%, #FF71CE 100%)",
    stack: ["HTML / CSS / JS", "Аудио-плеер", "Media kit PDF"],
    i18n: {
      ru: {
        title: "LeanJe — портфолио музыкального артиста",
        client: "LeanJe",
        summary:
          "Сайт-портфолио с биографией, релизами, медиа-китом для лейблов и встроенным плеером.",
        metric: "Media kit для лейблов · встроенный плеер",
        challenge:
          "Артисту нужно было одно место, куда можно отправить лейбла, журналиста или продюсера — без хаоса из Drive-папок.",
        approach:
          "Сделали лаконичное портфолио: биография, релизы, статистика, медиа-кит в PDF и встроенный плеер. Стиль — артистический, но без перегруза эффектами.",
        outcome:
          "Артист отправляет одну ссылку вместо архива из 30 файлов; общение с лейблами стало предметным.",
      },
      en: {
        title: "LeanJe — portfolio site for a music artist",
        client: "LeanJe",
        summary:
          "A portfolio site with bio, releases, a label-ready media kit and an embedded player.",
        metric: "Label-ready media kit · embedded player",
        challenge:
          "The artist needed one place to send to labels, journalists and producers — instead of a chaos of Drive folders.",
        approach:
          "A lean portfolio: bio, releases, stats, PDF media kit and embedded player. Artistic but not visually noisy.",
        outcome:
          "One link replaces a 30-file archive; conversations with labels became substantive.",
      },
    },
  },

  // ─── Mafia Питер ─────────────────────────────────────────────
  {
    slug: "mafia-spb",
    visual: "bot",
    image: "/cases/mafia-spb.png",
    service: "multipage",
    year: 2025,
    featured: false,
    tag: "Сайт · Event-клуб",
    name: { ru: "Мафия", en: "Mafia" },
    accent: "linear-gradient(135deg, #FF4D6D 0%, #B967FF 100%)",
    stack: ["HTML / CSS / JS", "Telegram-бот регистрации", "Анимации"],
    i18n: {
      ru: {
        title: "Mafia Питер — сайт и Telegram-бот клуба «Мафия»",
        client: "Mafia-клуб (Санкт-Петербург)",
        summary:
          "Сайт-афиша игровых вечеров с тёмным брендом и Telegram-ботом для записи и подтверждения брони.",
        metric: "Регистрация за 2 тапа в Telegram",
        challenge:
          "Записи на игры велись в ручную, бронь часто терялась. Нужно было поднять предсказуемость и автоматизировать связь с гостями.",
        approach:
          "Сайт-афиша с расписанием игр, форматами и ценами; Telegram-бот для записи — гость подтверждает бронь за 2 тапа, бот напоминает за день и за час.",
        outcome:
          "Заполняемость игр стала прогнозируемой, no-show упал; ведущему не нужно «обзванивать» — бот ведёт сам.",
      },
      en: {
        title: "Mafia SPb — site & Telegram bot for a mafia-game club",
        client: "Mafia club (St-Petersburg)",
        summary:
          "Event-listing site with a dark brand and a Telegram bot for booking and confirmation.",
        metric: "2-tap booking in Telegram",
        challenge:
          "Bookings were handled manually, frequently lost. We had to lift predictability and automate guest comms.",
        approach:
          "Event-listing site with schedule, formats and prices; a Telegram bot books the seat in 2 taps and nudges the guest a day and an hour before the game.",
        outcome:
          "Game attendance became predictable, no-shows dropped; the host no longer cold-calls — the bot leads the dialogue.",
      },
    },
  },

  // ─── SVOYYA CMS ──────────────────────────────────────────────
  {
    slug: "svoyya-cms",
    visual: "dashboard",
    service: "webapp",
    year: 2026,
    featured: true,
    tag: "Продукт · Multi-tenant CMS",
    name: { ru: "CMS", en: "CMS" },
    accent: "linear-gradient(135deg, #01CDFE 0%, #B967FF 100%)",
    stack: [
      "pnpm monorepo",
      "NestJS · Prisma",
      "PostgreSQL",
      "Next.js 15 (admin)",
      "Next.js 15 (public-site)",
    ],
    i18n: {
      ru: {
        title: "СВОЯ — мультитенантная CMS для агентства",
        client: "AURORA (внутренний продукт)",
        summary:
          "Платформа, на которой команда поддерживает 30+ клиентских сайтов с единой админкой, ролями и аналитикой.",
        metric: "API :3000 · admin :3001 · public-site :3002",
        challenge:
          "Чтобы держать 30+ клиентских сайтов на ходу, нужна была одна CMS, а не «WordPress на каждый сайт по-разному».",
        approach:
          "Сделали мультитенантную платформу: NestJS API, Prisma + Postgres, отдельный Next.js-админ, отдельный publik-site с ISR. Роли по тенантам, единая аналитика, единый деплой.",
        outcome:
          "Запуск нового клиента — это создать тенант, а не «развернуть сайт». Поддержка стала линейной.",
      },
      en: {
        title: "SVOYYA — a multi-tenant CMS for the agency",
        client: "AURORA (internal product)",
        summary:
          "A platform powering 30+ client sites with a single admin, roles and analytics.",
        metric: "API :3000 · admin :3001 · public-site :3002",
        challenge:
          "Running 30+ client sites needed one CMS, not «WordPress per site, each one different».",
        approach:
          "Multi-tenant platform: NestJS API, Prisma + Postgres, dedicated Next.js admin, dedicated Next.js public-site with ISR. Per-tenant roles, unified analytics, one deploy.",
        outcome:
          "Launching a new client = create a tenant, not «spin up a site». Support scales linearly.",
      },
    },
  },

  // ─── Bitrix24 margin recalc ──────────────────────────────────
  {
    slug: "bitrix-margin-recalc",
    visual: "terminal",
    service: "automation",
    year: 2025,
    featured: false,
    tag: "Интеграция · Bitrix24",
    name: { ru: "Маржа", en: "Margin" },
    accent: "linear-gradient(135deg, #38BDF8 0%, #B967FF 100%)",
    stack: ["Python 3", "Bitrix24 incoming webhook", "CLI · --dry-run"],
    i18n: {
      ru: {
        title: "Bitrix24 — авто-пересчёт маржи по сделкам",
        client: "Внутренний инструмент для отдела продаж",
        summary:
          "Скрипт, который через входящий webhook пересчитывает маржу на сделках Bitrix24 и подсвечивает аномалии.",
        metric: "Пересчёт за минуты вместо часов вручную",
        challenge:
          "Отдел продаж пересчитывал маржу руками после правок прайса. Ошибки и потерянное время.",
        approach:
          "Python-скрипт с входящим webhook: `--deal ID` или массовый прогон, режим `--dry-run` для проверки. Лог всех изменений, без перезаписи руками внесённых значений.",
        outcome:
          "Пересчёт минут вместо часов, ошибки видны до записи, отдел продаж не тратит время на ручной математический труд.",
      },
      en: {
        title: "Bitrix24 — automatic deal-margin recalc",
        client: "Internal tool for the sales team",
        summary:
          "A script that, via an incoming webhook, recalculates margin on Bitrix24 deals and flags anomalies.",
        metric: "Minutes instead of hours of manual recalc",
        challenge:
          "Sales recalculated margin by hand after price-list edits. Errors and lost time.",
        approach:
          "Python script with an incoming webhook: `--deal ID` or a bulk run, `--dry-run` for safety. Full log of changes, no overwrite of hand-set values.",
        outcome:
          "Minutes instead of hours, anomalies caught before commit, sales doesn't grind on math.",
      },
    },
  },

  // ─── PDF Catalog Designer ────────────────────────────────────
  {
    slug: "pdf-catalog-designer",
    visual: "document",
    image: "/cases/pdf-catalog-designer.png",
    service: "automation",
    year: 2025,
    featured: false,
    tag: "Инструмент · PDF-каталоги",
    name: { ru: "Каталоги", en: "Catalogues" },
    accent: "linear-gradient(135deg, #B967FF 0%, #7C3AED 100%)",
    stack: ["Python", "WeasyPrint", "PNG previews", "ENV-driven outputs"],
    i18n: {
      ru: {
        title: "PDF-каталоги — конвейер портфолио для клиентов",
        client: "Внутренний инструмент агентства",
        summary:
          "Python-движок, который из конфига собирает A4-PDF портфолио для клиентов с превью-картинками.",
        metric: "Новый каталог за 30 минут вместо дня",
        challenge:
          "Каждое новое портфолио верстали с нуля в InDesign — 1-2 дня работы на проект. Не масштабируется.",
        approach:
          "Собрали Python-движок: `_common.py` с render-функцией, по скрипту на нишу, PNG-превью генерируются автоматически. Выходные папки управляются через ENV.",
        outcome:
          "Новый каталог под клиента — 30 минут вместо дня. Бренд агентства остаётся консистентным.",
      },
      en: {
        title: "PDF Catalog Designer — a portfolio pipeline",
        client: "Internal agency tool",
        summary:
          "A Python engine that assembles A4 portfolio PDFs for clients with auto-generated PNG previews.",
        metric: "New catalogue in 30 minutes vs. a day",
        challenge:
          "Each new portfolio used to be laid out from scratch in InDesign — 1–2 days per project. Doesn't scale.",
        approach:
          "A Python engine: `_common.py` with a render function, one script per niche, PNG previews generated automatically. Output dirs via ENV.",
        outcome:
          "A new client catalogue takes 30 minutes instead of a day; the agency brand stays consistent.",
      },
    },
  },

  // ─── Контент Завод (Русик Уфы) ───────────────────────────────
  {
    slug: "content-factory",
    visual: "carousel",
    image: "/cases/content-factory.png",
    service: "automation",
    year: 2026,
    featured: false,
    tag: "Контент · Соцсети",
    name: { ru: "Контент", en: "Content" },
    accent: "linear-gradient(135deg, #FF71CE 0%, #01CDFE 100%)",
    stack: [
      "Python · Pillow",
      "Карусели Instagram-формат",
      "Правила бренда (SKILL.md)",
    ],
    i18n: {
      ru: {
        title: "Контент-завод — конвейер визуала для соцсетей",
        client: "Русик Уфы",
        summary:
          "Версионируемые Python-генераторы каруселей и постов под строгие правила бренда (без обрезки лиц, без перекрытий текста).",
        metric: "Серия постов за час вместо смены дизайнера",
        challenge:
          "Контент-команде нужны были регулярные карусели в едином стиле, без размытия бренда и без зависимости от занятости дизайнера.",
        approach:
          "Сделали версионируемые генераторы (`_generator_v9.py`, `_fix_k25_v3.py`) с жёсткими правилами из SKILL.md. Каждая новая итерация — новая версия скрипта, прошлые остаются.",
        outcome:
          "Серия постов собирается за час, дизайн остаётся в бренде, без зависимости от свободного дизайнера.",
      },
      en: {
        title: "Content Factory — a social-creative pipeline",
        client: "Rusik Ufa",
        summary:
          "Versioned Python generators for Instagram carousels and posts under strict brand rules.",
        metric: "A post series in an hour vs. a designer's shift",
        challenge:
          "The content team needed regular carousels on-brand without depending on a designer's availability.",
        approach:
          "Versioned generators (`_generator_v9.py`, `_fix_k25_v3.py`) with hard rules from SKILL.md. Each iteration is a new script — older ones stay.",
        outcome:
          "A post series ships in an hour, on-brand, no designer bottleneck.",
      },
    },
  },
];
