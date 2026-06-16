/**
 * FAQ / knowledge hub content for /faq.
 *
 * Informed by a market analysis of Western (AKQA, R/GA, MetaLab, thoughtbot,
 * Work & Co, Clay…) and Russian (AGIMA, Red Collar, JetStyle, ADV/Lebedev,
 * Nimax…) digital agencies — pricing models, process language, ownership and
 * support norms — re-voiced honestly for AURORA. Answers are vendor-neutral
 * where it builds trust, and specific where clients actually need numbers.
 *
 * Bilingual (ru/en); rendered as grouped accordions on /faq.
 */

export type FaqLocale = { q: string; a: string };

export type FaqItem = {
  id: string;
  ru: FaqLocale;
  en: FaqLocale;
};

export type FaqCategory = {
  id: string;
  ru: { title: string; blurb: string };
  en: { title: string; blurb: string };
  items: FaqItem[];
};

export type EngagementModel = {
  id: string;
  ru: { title: string; tagline: string; desc: string; best: string };
  en: { title: string; tagline: string; desc: string; best: string };
};

/** Three ways we price work — the same models the whole market uses. */
export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    id: "fix",
    ru: {
      title: "Fix-price",
      tagline: "Фиксированная цена",
      desc: "Цена и объём зафиксированы по ТЗ. Предсказуемый бюджет; изменения идут через доп. смету.",
      best: "Когда объём понятен заранее",
    },
    en: {
      title: "Fixed price",
      tagline: "Locked budget",
      desc: "Price and scope are locked to a spec. Predictable budget; changes go through a written quote.",
      best: "When scope is clear upfront",
    },
  },
  {
    id: "tm",
    ru: {
      title: "Time & Material",
      tagline: "По факту работ",
      desc: "Фиксируем ставку, объём гибкий, платите за фактически потраченное время. Меняем состав работ без допсоглашений.",
      best: "Когда продукт развивается",
    },
    en: {
      title: "Time & Material",
      tagline: "Pay as you go",
      desc: "Fixed rate, flexible scope, billed for actual time. Adjust the work without re-contracting.",
      best: "When the product evolves",
    },
  },
  {
    id: "retainer",
    ru: {
      title: "Абонентское",
      tagline: "Поддержка и развитие",
      desc: "Фиксированная команда и месячная стоимость для поддержки, доработок и роста продукта после запуска.",
      best: "Для долгой работы вдолгую",
    },
    en: {
      title: "Retainer",
      tagline: "Support & growth",
      desc: "A fixed team and monthly fee for support, fixes and product growth after launch.",
      best: "For long-term partnership",
    },
  },
];

export type PriceRange = {
  id: string;
  ru: { type: string; range: string; time: string };
  en: { type: string; range: string; time: string };
};

/**
 * Honest 2025–2026 market anchors (RU market). Ranges, not promises —
 * the real number comes after a discovery call.
 */
export const PRICE_RANGES: PriceRange[] = [
  {
    id: "landing",
    ru: { type: "Landing page", range: "от 18 000 ₽", time: "2–4 недели" },
    en: { type: "Landing page", range: "from $200", time: "2–4 weeks" },
  },
  {
    id: "automation",
    ru: { type: "Автоматизации", range: "от 90 000 ₽", time: "от 1 недели" },
    en: { type: "Automations", range: "from $1,050", time: "from 1 week" },
  },
  {
    id: "integrations",
    ru: { type: "Интеграции", range: "от 38 000 ₽", time: "1–4 недели" },
    en: { type: "Integrations", range: "from $450", time: "1–4 weeks" },
  },
  {
    id: "catalog",
    ru: { type: "Интернет-каталог", range: "от 55 000 ₽", time: "2–6 недель" },
    en: { type: "Online catalogue", range: "from $650", time: "2–6 weeks" },
  },
  {
    id: "multipage",
    ru: { type: "Многостраничный сайт", range: "от 85 000 ₽", time: "4–10 недель" },
    en: { type: "Multi-page website", range: "from $1,000", time: "4–10 weeks" },
  },
  {
    id: "ecommerce",
    ru: { type: "Интернет-магазин", range: "от 240 000 ₽", time: "2–4 месяца" },
    en: { type: "Online store", range: "from $2,800", time: "2–4 months" },
  },
  {
    id: "webapp",
    ru: { type: "Веб-приложение", range: "от 250 000 ₽", time: "от 3 месяцев" },
    en: { type: "Web application", range: "from $2,950", time: "from 3 months" },
  },
];

export const FAQ_CATEGORIES: FaqCategory[] = [
  // ─── Pricing & budgeting ─────────────────────────────────────
  {
    id: "pricing",
    ru: {
      title: "Цена и бюджет",
      blurb: "Сколько это стоит, из чего складывается цена и как мы считаем.",
    },
    en: {
      title: "Pricing & budget",
      blurb: "What it costs, what drives the price, and how we quote.",
    },
    items: [
      {
        id: "how-much",
        ru: {
          q: "Сколько стоит сайт / магазин / веб-приложение?",
          a: "Наша вилка — от 18 000 до 500 000 ₽ в зависимости от сложности проекта. Ориентиры: лендинг — от 18 000 ₽, интеграции 1С/Битрикс — от 38 000 ₽, интернет-каталог — от 55 000 ₽, многостраничный сайт — от 85 000 ₽, AI-агенты и автоматизация — от 90 000 ₽, интернет-магазин — от 240 000 ₽, веб-приложение — от 250 000 ₽. Точную смету формируем после составления PRD и согласовываем цену за каждый этап до старта разработки.",
        },
        en: {
          q: "How much does a site / store / web app cost?",
          a: "Our band is from $200 to $6,000 depending on complexity. Anchors: a landing page from $200, 1C/Bitrix integration from $450, an online catalogue from $650, a multi-page site from $1,000, AI agents & automation from $1,050, an online store from $2,800, a web app from $2,950. The exact estimate is set after we write the PRD, with a price agreed for each stage before development starts.",
        },
      },
      {
        id: "price-drivers",
        ru: {
          q: "От чего зависит цена?",
          a: "Сильнее всего — объём функционала (число экранов и сценариев), сложность дизайна (кастом против шаблона), интеграции (оплаты, CRM, 1С, внешние API), объём контента и требования к тестированию и безопасности. Дороже всего — нетиповая логика: калькуляторы, личные кабинеты, дашборды, ИИ-функции.",
        },
        en: {
          q: "What drives the price up or down?",
          a: "Mostly scope (number of screens and flows), design complexity (custom vs. template), integrations (payments, CRM, ERP, third-party APIs), content volume, and the level of QA and security required. Non-standard logic — calculators, dashboards, account areas, AI features — adds the most.",
        },
      },
      {
        id: "models",
        ru: {
          q: "Как вы считаете — фикс, почасовая или абонентская?",
          a: "Тремя способами, выбираем под проект, а не «как нам удобнее». Fix-price — когда объём чётко определён (предсказуемый бюджет, но изменения идут через доп. смету). Time & Materials — когда продукт развивается и точный объём заранее неизвестен (гибко, по факту работ). Абонентское обслуживание (ретейнер) — для развития и поддержки после запуска.",
        },
        en: {
          q: "Do you charge fixed price, hourly, or retainer?",
          a: "All three — we pick the model that fits the project, not our convenience. Fixed price for well-defined scope (predictable budget; changes go through a written change request). Time & Materials when the product evolves and exact scope isn't known upfront (flexible, billed by actual work). A monthly retainer for growth and support after launch.",
        },
      },
      {
        id: "payment",
        ru: {
          q: "Какая схема оплаты и нужна ли предоплата?",
          a: "Оплата по этапам: предоплата на старте (обычно 30–50%), затем платежи привязаны к сдаче этапов — дизайн принят, разработка готова, запуск. Мы не просим 100% вперёд: деньги привязаны к приёмке работы. Работаем по договору, с НДС или без — под вашу форму (ООО / ИП / самозанятый).",
        },
        en: {
          q: "What's the payment schedule? Do you need a deposit?",
          a: "Milestone-based: a deposit at the start (usually 30–50%), then payments tied to accepted deliverables — design approved, build done, launch. We never ask for 100% upfront; money is tied to acceptance of work, all under a written contract.",
        },
      },
      {
        id: "small-budget",
        ru: {
          q: "У меня небольшой бюджет — это реально?",
          a: "Часто да — через MVP: запускаем важные 20% функционала, которые уже приносят результат, а остальное добавляем итерациями. Если задача в бюджет не влезает честно — скажем прямо и предложим более лёгкий путь (например, на готовой платформе), а не пообещаем невозможное.",
        },
        en: {
          q: "My budget is small — can you still help?",
          a: "Often yes — via an MVP: we ship the essential 20% that already delivers value and expand in iterations. If the project genuinely doesn't fit the budget, we'll say so and suggest a lighter route (e.g. a ready platform) rather than overpromise.",
        },
      },
    ],
  },

  // ─── Timeline ────────────────────────────────────────────────
  {
    id: "timeline",
    ru: {
      title: "Сроки",
      blurb: "Сколько занимает и что влияет на скорость.",
    },
    en: { title: "Timeline", blurb: "How long it takes and what affects speed." },
    items: [
      {
        id: "how-long",
        ru: {
          q: "Сколько времени займёт проект?",
          a: "Ориентиры: лендинг — 2–4 недели, корпоративный сайт — 6–12 недель, интернет-магазин или веб-приложение — несколько месяцев, MVP продукта — 3–6 месяцев, Telegram-бот — 2–4 недели. Даём не одну дату, а план по этапам с контрольными точками.",
        },
        en: {
          q: "How long will it take?",
          a: "Anchors: a landing page 2–4 weeks, a corporate site 6–12 weeks, e-commerce or a web app several months, a product MVP 3–6 months, a Telegram bot 2–4 weeks. We give a phase-by-phase plan with checkpoints, not a single date.",
        },
      },
      {
        id: "delays",
        ru: {
          q: "Из-за чего сдвигаются сроки?",
          a: "Чаще всего — со стороны заказчика: поздний контент (тексты, фото, доступы) и медленные согласования. Также — изменения объёма по ходу и сюрпризы в интеграциях. Скорость ваших решений — главный рычаг сроков, и мы проговариваем это на старте.",
        },
        en: {
          q: "What can delay the project?",
          a: "Most often the client side: late content (text, photos, logins) and slow approvals. Also mid-project scope changes and integration surprises. Your decision speed is the biggest lever on the timeline — we flag this upfront.",
        },
      },
    ],
  },

  // ─── Process & collaboration ─────────────────────────────────
  {
    id: "process",
    ru: {
      title: "Процесс и работа вместе",
      blurb: "Как устроена работа и сколько вашего участия нужно.",
    },
    en: {
      title: "Process & collaboration",
      blurb: "How the work runs and how involved you need to be.",
    },
    items: [
      {
        id: "prd",
        ru: {
          q: "Что такое PRD и зачем он нужен?",
          a: "PRD (Product Requirements Document) — документ требований к продукту: цели, функции, экраны, сценарии и критерии готовности. Мы составляем его совместно с заказчиком до разработки, разбиваем проект на этапы и заранее озвучиваем стоимость каждого шага. Так вы видите всю смету и объём до старта, а не получаете сюрпризы по ходу.",
        },
        en: {
          q: "What is a PRD and why does it matter?",
          a: "A PRD (Product Requirements Document) captures goals, features, screens, scenarios and acceptance criteria. We write it together with the client before development, split the project into stages and quote each step upfront. You see the full estimate and scope before we start — no surprises along the way.",
        },
      },
      {
        id: "steps",
        ru: {
          q: "Как устроен процесс — по шагам?",
          a: "Дискавери и стратегия → прототипы и UX → дизайн → разработка → тестирование (QA) → запуск → поддержка. Мы не прыгаем сразу «в дизайн и код» без дискавери — именно на нём снимаются риски и фиксируется объём.",
        },
        en: {
          q: "What's your process, step by step?",
          a: "Discovery & strategy → wireframes/UX → design → development → QA → launch → support. We don't jump straight into design and code without discovery — that's where risk is removed and scope is locked.",
        },
      },
      {
        id: "involvement",
        ru: {
          q: "Сколько моего участия потребуется?",
          a: "Больше, чем ожидает большинство: контент, обратная связь на каждом этапе и решения по ключевым развилкам. Мы держим один понятный канал связи (Telegram/почта), еженедельные созвоны и одного ответственного менеджера, чтобы это не съедало ваше время.",
        },
        en: {
          q: "How involved do I need to be?",
          a: "More than most expect: content, feedback at each stage, and decisions at key forks. We keep one clear channel (Telegram/email), weekly calls and a single point of contact so it doesn't eat your time.",
        },
      },
      {
        id: "changes",
        ru: {
          q: "Как вносятся правки и доработки по ходу?",
          a: "В каждый этап входит оговорённое число раундов правок. Новые хотелки сверх объёма оцениваем и согласуем отдельно (change request) до начала работ — так бюджет и сроки не «расползаются».",
        },
        en: {
          q: "How do change requests work mid-project?",
          a: "Each stage includes an agreed number of revision rounds. Anything beyond the scope is scoped, quoted and approved as a change request before work starts — so budget and timeline don't creep.",
        },
      },
    ],
  },

  // ─── Agency vs alternatives ──────────────────────────────────
  {
    id: "choosing",
    ru: {
      title: "Агентство, фрилансер или конструктор",
      blurb: "Когда что выгоднее — честно.",
    },
    en: {
      title: "Agency vs freelancer vs builder",
      blurb: "When each option makes sense — honestly.",
    },
    items: [
      {
        id: "vs-freelancer",
        ru: {
          q: "Зачем агентство, если фрилансер или конструктор дешевле?",
          a: "Вы платите за снижение риска и за команду, которую один человек не закроет: стратегия, дизайн, разработка, QA, менеджмент и ответственность по договору. Для простого лендинга это переплата — и мы так и скажем. Для сложного, бизнес-критичного продукта это обычно оправдано.",
        },
        en: {
          q: "Why an agency if a freelancer or builder is cheaper?",
          a: "You pay for reduced risk and a team one person can't cover: strategy, design, development, QA, management and contractual accountability. For a simple landing page that's overpaying — and we'll say so. For complex, business-critical work it usually pays off.",
        },
      },
      {
        id: "builder",
        ru: {
          q: "А можно просто на Tilda / конструкторе?",
          a: "Для простого сайта — да, и вы сэкономите. Конструкторы упираются в потолок на кастомной логике, владении данными, тонком SEO и масштабировании — вот тут и начинается смысл собственной разработки. Мы честно подскажем, где вам хватит конструктора.",
        },
        en: {
          q: "Can't I just use a website builder like Tilda/Webflow?",
          a: "For a simple site, yes — and you'll save money. Builders hit a ceiling on custom logic, data ownership, fine-grained SEO and scaling — that's where custom development starts to pay off. We'll tell you honestly when a builder is enough.",
        },
      },
    ],
  },

  // ─── Ownership & rights ──────────────────────────────────────
  {
    id: "ownership",
    ru: {
      title: "Права и владение",
      blurb: "Чей код, дизайн и доступы после запуска.",
    },
    en: {
      title: "Ownership & rights",
      blurb: "Who owns the code, design and accounts after launch.",
    },
    items: [
      {
        id: "who-owns",
        ru: {
          q: "Кому принадлежит код и дизайн?",
          a: "Вам — после полной оплаты исключительные права на результат передаются по договору. Это важный пункт: по умолчанию права на созданное часто остаются у исполнителя, поэтому мы прописываем явную передачу прав вам.",
        },
        en: {
          q: "Who owns the code and design?",
          a: "You do — exclusive rights to the deliverables transfer to you on final payment, in writing. This matters: by default the creator often keeps the rights, so we include an explicit assignment to you.",
        },
      },
      {
        id: "source-access",
        ru: {
          q: "Получу ли я исходный код и все доступы?",
          a: "Да: исходный код, файлы дизайна, домен, хостинг, админку и доступы к сторонним сервисам передаём вам. Никакого вендор-лока — вы в любой момент можете продолжить с другой командой.",
        },
        en: {
          q: "Will I get the source code and all access?",
          a: "Yes: source code, design files, domain, hosting, the CMS admin and all third-party logins are handed to you. No vendor lock-in — you can continue with another team anytime.",
        },
      },
    ],
  },

  // ─── Quality & guarantees ────────────────────────────────────
  {
    id: "quality",
    ru: {
      title: "Качество и гарантии",
      blurb: "Правки, тестирование и что после сдачи.",
    },
    en: {
      title: "Quality & guarantees",
      blurb: "Revisions, testing and what happens after delivery.",
    },
    items: [
      {
        id: "revisions",
        ru: {
          q: "Сколько правок входит и что если не понравится дизайн?",
          a: "В каждый этап входят раунды правок, а направление вы утверждаете на прототипе и дизайне — до дорогой разработки. Именно поэтому дискавери и прототип идут первыми: чтобы «не понравилось» не случилось на готовом продукте.",
        },
        en: {
          q: "How many revisions, and what if I don't like the design?",
          a: "Each stage includes revision rounds, and you approve direction at the prototype and design stage — before expensive build. That's exactly why discovery and prototyping come first: so «I don't like it» doesn't happen on a finished product.",
        },
      },
      {
        id: "warranty",
        ru: {
          q: "Есть ли гарантия после запуска?",
          a: "Да. На сданную работу действует гарантийный период (обычно 30–90 дней): дефекты — то, что работает не так, как в ТЗ, — чиним бесплатно. Это отдельно от платной поддержки и развития (новые функции).",
        },
        en: {
          q: "Is there a warranty after launch?",
          a: "Yes. Delivered work has a warranty period (typically 30–90 days): defects — anything not working as specified — are fixed free. That's separate from paid ongoing support and new-feature development.",
        },
      },
      {
        id: "guarantees",
        ru: {
          q: "Гарантируете первое место в Google или рост продаж?",
          a: "Нет — и любой, кто гарантирует «топ-1 в Google», должен настораживать: это зависит от факторов вне контроля подрядчика. Мы отвечаем за результат работы и лучшие практики и меряем прогресс по вашим целям и метрикам.",
        },
        en: {
          q: "Can you guarantee #1 on Google or more sales?",
          a: "No — and anyone guaranteeing «#1 on Google» should raise a flag: it depends on factors outside a vendor's control. We commit to deliverables and best practices, and measure progress against your goals and metrics.",
        },
      },
    ],
  },

  // ─── Post-launch & support ───────────────────────────────────
  {
    id: "support",
    ru: {
      title: "После запуска",
      blurb: "Поддержка, хостинг и кто правит контент.",
    },
    en: {
      title: "After launch",
      blurb: "Support, hosting and who edits content.",
    },
    items: [
      {
        id: "after",
        ru: {
          q: "Что будет после запуска — вы исчезнете?",
          a: "Нет. Предлагаем поддержку: обновления безопасности, бэкапы, мониторинг, доработки и развитие — обычно по абонентскому тарифу отдельно от стоимости разработки. Поддержка по желанию, но без обновлений ПО со временем накапливает риски.",
        },
        en: {
          q: "What happens after launch — do you disappear?",
          a: "No. We offer support: security updates, backups, monitoring, fixes and growth — usually as a monthly plan, separate from the build cost. Support is optional, but software left un-updated accumulates risk over time.",
        },
      },
      {
        id: "self-edit",
        ru: {
          q: "Смогу ли я сам менять контент?",
          a: "Да, если это предусмотрено: делаем на CMS, где тексты и картинки правит нетехнический сотрудник, и даём короткое обучение и доступы. Если каждое мелкое изменение требует подрядчика — это и расход, и зависимость, мы так не делаем по умолчанию.",
        },
        en: {
          q: "Can I edit content myself after launch?",
          a: "Yes, when that's the goal: we build on a CMS where a non-technical person edits text and images, plus a short training and the logins. If every small edit required us, that's both cost and lock-in — not our default.",
        },
      },
    ],
  },

  // ─── Tech & approach ─────────────────────────────────────────
  {
    id: "tech",
    ru: {
      title: "Технологии и подход",
      blurb: "Стек, безопасность, скорость и SEO.",
    },
    en: {
      title: "Tech & approach",
      blurb: "Stack, security, performance and SEO.",
    },
    items: [
      {
        id: "stack",
        ru: {
          q: "На каком стеке делаете и почему?",
          a: "Выбираем под задачу, а не под моду: чаще всего Next.js / React на фронте, Node.js (NestJS) и PostgreSQL на бэке, для мобильных — нативно или кросс-платформенно. Стандартные, хорошо поддерживаемые технологии — это защита от вендор-лока и простой найм команды в будущем.",
        },
        en: {
          q: "What stack do you use and why?",
          a: "We pick by need, not hype: usually Next.js/React on the front, Node.js (NestJS) and PostgreSQL on the back, native or cross-platform for mobile. Standard, well-supported tech protects you from lock-in and makes future hiring easy.",
        },
      },
      {
        id: "perf-seo",
        ru: {
          q: "Будет ли адаптив, скорость и SEO?",
          a: "Это база, а не доплата: адаптивная вёрстка mobile-first, оптимизация скорости (Core Web Vitals), чистая разметка и базовое техническое SEO входят по умолчанию. Глубокое продвижение и контент-маркетинг — отдельная услуга, о которой договариваемся прозрачно.",
        },
        en: {
          q: "Will it be mobile-friendly, fast and SEO-ready?",
          a: "That's the baseline, not an upsell: mobile-first responsive layout, speed optimization (Core Web Vitals), clean markup and technical SEO basics are included by default. Deep promotion and content marketing are a separate, clearly-scoped service.",
        },
      },
      {
        id: "security",
        ru: {
          q: "Как с безопасностью и данными?",
          a: "SSL, безопасная авторизация, бэкапы, аккуратная работа с персональными данными и 152-ФЗ. Для приложений и CRM, где есть данные пользователей, это обязательная часть, а не опция.",
        },
        en: {
          q: "How do you handle security and data?",
          a: "SSL, secure auth, backups and careful handling of personal data and compliance (e.g. 152-FZ / GDPR). For apps and CRMs with user data this is mandatory, not optional.",
        },
      },
    ],
  },

  // ─── Trust & vetting ─────────────────────────────────────────
  {
    id: "trust",
    ru: {
      title: "Доверие и договор",
      blurb: "Как проверить и на чём фиксируем отношения.",
    },
    en: {
      title: "Trust & contract",
      blurb: "How to vet us and how we put it in writing.",
    },
    items: [
      {
        id: "vetting",
        ru: {
          q: "Как понять, что вам можно доверять?",
          a: "Смотрите портфолио похожих проектов, кейсы с результатами и просите контакты клиентов для рекомендаций. Красные флаги у любого подрядчика: гарантия «топ-1 в Google», отсутствие дискавери, нет рекомендаций и давление «эта цена только сегодня».",
        },
        en: {
          q: "How do I know you're trustworthy?",
          a: "Look at a portfolio of comparable work, case studies with outcomes, and ask for client references. Red flags with any vendor: guaranteed «#1 on Google», no discovery phase, no references, and «this price only today» pressure.",
        },
      },
      {
        id: "b2b",
        ru: {
          q: "С кем вы работаете и поможете ли в нашей нише?",
          a: "Работаем с юридическими лицами во всех нишах и отраслях — от логистики и производства до услуг и e-commerce. У нас свой тендерный отдел (поможем корректно пройти закупку и подготовить документы) и свой юридический отдел (договор, ТЗ, передача прав, NDA). Отсутствие опыта именно в вашей нише не проблема: на этапе PRD мы погружаемся в ваш процесс.",
        },
        en: {
          q: "Who do you work with, and can you help in our niche?",
          a: "We work with legal entities across every niche and industry — from logistics and manufacturing to services and e-commerce. We have an in-house tender department (to run procurement and paperwork correctly) and an in-house legal department (contract, spec, IP transfer, NDA). No experience in your exact niche isn't a problem: during the PRD stage we dive into your process.",
        },
      },
      {
        id: "contract",
        ru: {
          q: "Будет ли договор и NDA?",
          a: "Да. Работаем по договору с фиксацией объёма, сроков, поэтапной оплаты, критериев приёмки, передачи прав на код и гарантии. NDA подписываем, если вы делитесь чувствительной информацией.",
        },
        en: {
          q: "Will there be a contract and NDA?",
          a: "Yes. We work under a contract that fixes scope, timeline, milestone payments, acceptance criteria, IP transfer and warranty. We sign an NDA whenever you share sensitive information.",
        },
      },
    ],
  },
];
