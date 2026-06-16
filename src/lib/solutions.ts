/**
 * The real AURORA service catalogue, as data.
 *
 * Seven web-solution types we build for B2B clients across every niche.
 * Each entry carries long-form, locale-specific copy (the detail-page article
 * is ≥1000 characters), who it suits, what's included and a price range.
 *
 * Pricing reflects AURORA's actual band: from 30 000 ₽ to 500 000 ₽ depending
 * on complexity. Every project starts with a jointly-written PRD and a
 * stage-by-stage estimate agreed before development begins (see PROCESS_STEPS).
 *
 * Editing copy? It's all here — no scattered translation keys.
 */

export type SolutionSlug =
  | "landing"
  | "catalog"
  | "multipage"
  | "ecommerce"
  | "webapp"
  | "integrations"
  | "automation"
  | "design"
  | "marketing"
  | "support";

export type SolutionLocale = {
  /** Card + nav title */
  title: string;
  /** One-line card description */
  short: string;
  /** Detail-page eyebrow/tagline */
  tagline: string;
  /** Long-form article, ≥1000 chars */
  article: string;
  /** Who this solution is for */
  audience: string[];
  /** When to choose it over the alternatives */
  bestFor: string;
  /** What's included in the build */
  includes: string[];
};

export type SolutionDef = {
  slug: SolutionSlug;
  /** Price band in rubles (within AURORA's 30 000–500 000 ₽ range) */
  price: { from: number; to: number };
  ru: SolutionLocale;
  en: SolutionLocale;
};

const RU = (n: number) => `${n.toLocaleString("ru-RU")} ₽`;

/** Format a solution price band for display, e.g. "от 30 000 ₽" / "30 000–120 000 ₽" */
export function formatPrice(s: SolutionDef, locale: "ru" | "en"): string {
  const { from, to } = s.price;
  if (locale === "en") {
    const usd = (n: number) => `$${Math.round(n / 85 / 100) * 100}`;
    return `${usd(from)}–${usd(to)}`;
  }
  return `${RU(from)} — ${RU(to)}`;
}

export const SOLUTIONS: SolutionDef[] = [
  // ─── Landing page ────────────────────────────────────────────
  {
    slug: "landing",
    price: { from: 18000, to: 120000 },
    ru: {
      title: "Landing page",
      short: "Одностраничник под один продукт или оффер — собирает заявки.",
      tagline: "Одна страница — одна цель",
      article:
        "Landing page — это одностраничный сайт, заточенный под одно действие: оставить заявку, купить, записаться. Здесь нет меню с десятком разделов и «обо всём понемногу» — есть один продукт, один оффер и одна выверенная логика, которая ведёт посетителя от первого экрана к кнопке. Именно поэтому лендинг — самый быстрый и предсказуемый способ проверить спрос, запустить рекламу или продать конкретную услугу.\n\nХороший лендинг — это не «красивая картинка», а структура продаж: сильный первый экран с понятным оффером, блоки доверия (кейсы, цифры, отзывы), снятие возражений, прозрачная цена и заметные точки конверсии. Мы проектируем его под вашу аудиторию и трафик: что человек должен понять за 5 секунд, какие сомнения у него возникнут и чем мы их закроем. Подключаем аналитику и цели, чтобы видеть, какой блок работает, а какой нет, — и можно было улучшать на данных.\n\nЛендинг подойдёт, когда у вас один чёткий продукт или акция, идёт платный трафик, или нужно быстро протестировать нишу без больших вложений. Если же товаров много или нужен каталог и личный кабинет — это уже другая задача (каталог, магазин или веб-приложение), и мы честно об этом скажем на старте.",
      audience: [
        "Запуск нового продукта или услуги",
        "Трафик с рекламы (контекст, таргет)",
        "Быстрая проверка спроса и ниши",
        "Сбор заявок на один оффер",
      ],
      bestFor:
        "Один продукт, один оффер, платный трафик и потребность быстро получать заявки.",
      includes: [
        "Прототип и структура продаж",
        "Уникальный дизайн под бренд",
        "Адаптив под все устройства",
        "Форма заявки + интеграция с CRM/Telegram",
        "Аналитика и цели (Метрика/GA4)",
        "Базовое SEO и скорость загрузки",
      ],
    },
    en: {
      title: "Landing page",
      short: "A one-page site for a single product or offer — it captures leads.",
      tagline: "One page — one goal",
      article:
        "A landing page is a single-page site built around one action: leave a request, buy, book. There's no ten-section menu and no «a bit of everything» — there's one product, one offer and one carefully-built flow that leads the visitor from the first screen to the button. That's why a landing is the fastest, most predictable way to test demand, run ads or sell a specific service.\n\nA good landing isn't a pretty picture — it's a sales structure: a strong first screen with a clear offer, trust blocks (cases, numbers, reviews), objection handling, transparent pricing and visible conversion points. We design it around your audience and traffic: what a person must grasp in 5 seconds, what doubts they'll have and how we close them. We wire up analytics and goals so you can see which block works and improve on data.\n\nA landing fits when you have one clear product or promo, paid traffic, or need to test a niche quickly without a big budget. If you have many products or need a catalogue and an account area, that's a different job (catalogue, store or web app) — and we'll say so upfront.",
      audience: [
        "Launching a new product or service",
        "Paid traffic (search, social)",
        "Fast demand / niche validation",
        "Collecting leads for one offer",
      ],
      bestFor:
        "One product, one offer, paid traffic and a need to capture leads fast.",
      includes: [
        "Prototype & sales structure",
        "Custom on-brand design",
        "Responsive on every device",
        "Lead form + CRM/Telegram integration",
        "Analytics & goals (Metrica/GA4)",
        "Baseline SEO & load speed",
      ],
    },
  },

  // ─── Интернет-каталог ────────────────────────────────────────
  {
    slug: "catalog",
    price: { from: 55000, to: 250000 },
    ru: {
      title: "Интернет-каталог",
      short: "Витрина товаров и услуг без онлайн-оплаты — заявка или звонок.",
      tagline: "Витрина, которая приводит заявки",
      article:
        "Интернет-каталог — это сайт-витрина: вы показываете ассортимент товаров или услуг с фильтрами, карточками и ценами, но без полноценной корзины и онлайн-оплаты. Клиент находит нужное, изучает характеристики и оставляет заявку, звонит или пишет в мессенджер. Это золотая середина между лендингом и интернет-магазином: ассортимент уже большой, но продажа идёт через менеджера, а не через эквайринг.\n\nКаталог незаменим в B2B и в нишах со сложным или «договорным» ценообразованием: стройматериалы, оборудование, опт, услуги под расчёт. Здесь важнее не «положить в корзину», а быстро найти позицию, сравнить и получить коммерческое предложение. Мы проектируем удобные фильтры и структуру категорий, делаем понятные карточки товара, подключаем поиск и формы заявки прямо из карточки — чтобы путь от «нашёл» до «оставил контакт» был коротким.\n\nКаталог легко наполнять и расширять: подключаем admin-панель или выгрузку из 1С/Excel, чтобы менеджеры обновляли позиции сами. Если со временем понадобится онлайн-оплата и корзина — каталог становится фундаментом для полноценного интернет-магазина, и переход проходит эволюционно, без переписывания с нуля.",
      audience: [
        "B2B и оптовые продажи",
        "Большой ассортимент без онлайн-оплаты",
        "Договорное ценообразование, расчёт под клиента",
        "Производители, дистрибьюторы, услуги",
      ],
      bestFor:
        "Большой ассортимент, продажа через менеджера и заявку, а не через корзину.",
      includes: [
        "Структура категорий и фильтры",
        "Карточки товара/услуги с характеристиками",
        "Поиск по каталогу",
        "Заявка и быстрый запрос КП",
        "Выгрузка из 1С/Excel или админка",
        "Адаптив, SEO, аналитика",
      ],
    },
    en: {
      title: "Online catalogue",
      short: "A product/service showcase without checkout — request or call.",
      tagline: "A showcase that brings requests",
      article:
        "An online catalogue is a showcase site: you present a range of products or services with filters, cards and prices, but without a full cart and online payment. The client finds what they need, studies the specs and leaves a request, calls or messages. It's the middle ground between a landing and a store: the range is already large, but the sale goes through a manager rather than a payment gateway.\n\nA catalogue is indispensable in B2B and niches with complex or «quote-based» pricing: building materials, equipment, wholesale, made-to-order services. Here it matters less to «add to cart» and more to quickly find an item, compare and get a quote. We design convenient filters and category structure, clear product cards, search and request forms right inside the card — so the path from «found it» to «left a contact» is short.\n\nA catalogue is easy to fill and grow: we connect an admin panel or a 1C/Excel feed so managers update items themselves. If you later need checkout and a cart, the catalogue becomes the foundation for a full store — the transition is evolutionary, not a rewrite.",
      audience: [
        "B2B and wholesale",
        "Large range without online payment",
        "Quote-based / made-to-order pricing",
        "Manufacturers, distributors, services",
      ],
      bestFor:
        "A large range sold through a manager and a request, not a cart.",
      includes: [
        "Category structure & filters",
        "Product/service cards with specs",
        "Catalogue search",
        "Request & quick quote request",
        "1C/Excel feed or admin panel",
        "Responsive, SEO, analytics",
      ],
    },
  },

  // ─── Многостраничный сайт ────────────────────────────────────
  {
    slug: "multipage",
    price: { from: 85000, to: 300000 },
    ru: {
      title: "Многостраничный сайт",
      short: "Корпоративный сайт: услуги, кейсы, о компании, блог.",
      tagline: "Полноценное лицо компании в сети",
      article:
        "Многостраничный сайт — это полноценное представительство компании: главная, разделы услуг, кейсы, о компании, команда, блог, контакты. В отличие от лендинга, его задача — не один оффер, а системно рассказать о бизнесе, закрыть вопросы разных аудиторий и работать на доверие и SEO в долгую. Это выбор, когда вы продаёте экспертизу, услуги или сложный продукт, где клиент принимает решение не за один экран.\n\nМы проектируем структуру под ваши бизнес-цели: какие разделы нужны, как они связаны, какой путь проходит клиент от первого визита до заявки. Каждая страница получает свой смысл и точки конверсии, а единая дизайн-система держит бренд консистентным. Подключаем CMS, чтобы вы сами редактировали тексты, кейсы и новости без программиста, и закладываем техническое SEO: чистая разметка, скорость, корректные мета-теги и человекопонятные адреса.\n\nТакой сайт растёт вместе с компанией: добавляются услуги, кейсы, лендинги под акции, мультиязычность. Он становится центральным активом маркетинга — на него ведёт реклама, он ранжируется в поиске и формирует первое впечатление. Многостраничник подойдёт корпоративному бизнесу, консалтингу, агентствам, производству и сервисным компаниям, которым важно выглядеть солидно и системно.",
      audience: [
        "Корпоративный бизнес и услуги",
        "Консалтинг, агентства, производство",
        "Продажа экспертизы и сложных продуктов",
        "Контент-маркетинг и SEO в долгую",
      ],
      bestFor:
        "Нужно системно рассказать о компании и работать на доверие и поиск, а не на один оффер.",
      includes: [
        "Проектирование структуры и навигации",
        "Дизайн-система и уникальные страницы",
        "CMS для самостоятельного редактирования",
        "Кейсы, блог, команда, услуги",
        "Техническое SEO и скорость",
        "Аналитика, формы, мультиязычность по запросу",
      ],
    },
    en: {
      title: "Multi-page website",
      short: "A corporate site: services, cases, about, blog.",
      tagline: "Your company's full face online",
      article:
        "A multi-page website is a full company presence: home, service sections, cases, about, team, blog, contacts. Unlike a landing, its job isn't one offer but to tell the business story systematically, answer different audiences and build trust and SEO over the long run. It's the choice when you sell expertise, services or a complex product where the decision takes more than one screen.\n\nWe design the structure around your goals: which sections you need, how they connect, the path a client takes from first visit to request. Every page gets its purpose and conversion points, while a single design system keeps the brand consistent. We add a CMS so you edit copy, cases and news without a developer, and we build in technical SEO: clean markup, speed, correct meta tags and human-readable URLs.\n\nThe site grows with the company: new services, cases, promo landings, multiple languages. It becomes the central marketing asset — ads point to it, it ranks in search and it forms the first impression. A multi-page site fits corporate businesses, consulting, agencies, manufacturing and service companies that need to look solid and systematic.",
      audience: [
        "Corporate business & services",
        "Consulting, agencies, manufacturing",
        "Selling expertise & complex products",
        "Content marketing & long-term SEO",
      ],
      bestFor:
        "You need to tell the company story and build trust and search presence, not just one offer.",
      includes: [
        "Structure & navigation design",
        "Design system & unique pages",
        "CMS for self-service editing",
        "Cases, blog, team, services",
        "Technical SEO & speed",
        "Analytics, forms, multilingual on request",
      ],
    },
  },

  // ─── Интернет-магазин ────────────────────────────────────────
  {
    slug: "ecommerce",
    price: { from: 240000, to: 500000 },
    ru: {
      title: "Интернет-магазин",
      short: "Полноценные продажи онлайн: корзина, оплата, доставка.",
      tagline: "Продажи онлайн под ключ",
      article:
        "Интернет-магазин — это система онлайн-продаж: каталог с фильтрами, корзина, оформление заказа, онлайн-оплата, доставка и личный кабинет покупателя. В отличие от каталога, здесь клиент проходит весь путь сам — от выбора до оплаты, — а вы получаете заказ в готовом виде. Это инструмент, который работает 24/7 и масштабирует выручку без пропорционального роста штата менеджеров.\n\nМы проектируем магазин вокруг конверсии и удобства: быстрый поиск и фильтры, понятные карточки товара, короткий чекаут без лишних шагов, корректные расчёты доставки и складских остатков. Подключаем эквайринг (ЮKassa, Тинькофф и др.), службы доставки, онлайн-кассу под 54-ФЗ и интеграцию с 1С/складом, чтобы товары, цены и остатки не велись вручную. Всё это закрывается аналитикой: видно, где покупатель «отваливается», и что чинить в первую очередь.\n\nИнтернет-магазин подойдёт рознице и B2B-продажам с понятным ценообразованием и потоком заказов, когда нужна именно онлайн-оплата и автоматизация обработки. Если ассортимент пока небольшой или продажа идёт через менеджера — возможно, на старте достаточно каталога, и мы предложим поэтапный путь, чтобы не переплачивать за функции, которые ещё не нужны.",
      audience: [
        "Розница и e-commerce",
        "B2B-продажи с онлайн-оплатой",
        "Поток заказов, который нужно автоматизировать",
        "Бренды со своим складом и логистикой",
      ],
      bestFor:
        "Нужны онлайн-оплата, корзина и автоматическая обработка заказов, а не заявка менеджеру.",
      includes: [
        "Каталог, фильтры, карточки, корзина",
        "Чекаут и онлайн-оплата (эквайринг)",
        "Доставка, онлайн-касса (54-ФЗ)",
        "Интеграция с 1С / складом / CRM",
        "Личный кабинет покупателя",
        "Аналитика воронки и SEO",
      ],
    },
    en: {
      title: "Online store",
      short: "Full online sales: cart, payment, delivery.",
      tagline: "Turnkey online sales",
      article:
        "An online store is a sales system: a catalogue with filters, cart, checkout, online payment, delivery and a customer account. Unlike a catalogue, the client walks the whole path themselves — from choice to payment — and you receive a ready order. It's a tool that works 24/7 and scales revenue without a proportional growth in sales staff.\n\nWe design the store around conversion and convenience: fast search and filters, clear product cards, a short checkout with no extra steps, correct delivery and stock calculations. We connect payment gateways, delivery services, a compliant online cash register and 1C/warehouse integration so products, prices and stock aren't kept by hand. All of it is backed by analytics: you see where buyers drop off and what to fix first.\n\nA store fits retail and B2B sales with clear pricing and order flow, when you specifically need online payment and automated processing. If your range is small or you sell via a manager, a catalogue may be enough to start — we'll propose a phased path so you don't overpay for features you don't need yet.",
      audience: [
        "Retail & e-commerce",
        "B2B sales with online payment",
        "Order flow that needs automation",
        "Brands with their own stock & logistics",
      ],
      bestFor:
        "You need online payment, a cart and automated order processing — not a manager request.",
      includes: [
        "Catalogue, filters, cards, cart",
        "Checkout & online payment",
        "Delivery & compliant receipts",
        "1C / warehouse / CRM integration",
        "Customer account area",
        "Funnel analytics & SEO",
      ],
    },
  },

  // ─── Веб-приложение ──────────────────────────────────────────
  {
    slug: "webapp",
    price: { from: 250000, to: 500000 },
    ru: {
      title: "Веб-приложение",
      short: "Сервис, портал, личный кабинет, SaaS, CRM в браузере.",
      tagline: "Когда нужен не сайт, а инструмент",
      article:
        "Веб-приложение — это не сайт-витрина, а рабочий инструмент в браузере: личный кабинет, портал, SaaS-сервис, кастомная CRM, дашборд, система учёта или бронирования. Здесь главное не «рассказать», а «дать сделать»: пользователи авторизуются, работают с данными, что-то считают, оформляют, отслеживают. Это самый сложный и самый ценный тип решения — он автоматизирует процесс, который сейчас живёт в Excel, мессенджерах и голове сотрудника.\n\nМы начинаем с моделирования предметной области: какие роли, сущности и сценарии есть в вашем процессе, что должно происходить автоматически, какие интеграции нужны. Дальше — архитектура, в которой данные хранятся надёжно, права разграничены, а нагрузка выдерживается при росте. Делаем понятный интерфейс, server-side логику (расчёты, не «формулы в Excel»), интеграции с оплатами, 1С, внешними API и уведомлениями. Закладываем безопасность, бэкапы и работу с персональными данными по 152-ФЗ.\n\nВеб-приложение подойдёт, когда бизнес-процесс перерос таблицы и ручную обработку, когда нужен личный кабинет для клиентов или сотрудников, или когда вы запускаете собственный цифровой продукт (SaaS). Мы часто стартуем с MVP — запускаем ключевые 20% функционала, которые уже приносят пользу, и наращиваем итерациями, чтобы не вкладывать весь бюджет в гипотезы.",
      audience: [
        "Автоматизация внутренних процессов",
        "Личные кабинеты для клиентов/сотрудников",
        "Кастомная CRM, учёт, бронирование",
        "Запуск собственного SaaS-продукта",
      ],
      bestFor:
        "Процесс перерос Excel и переписку: нужны данные, роли, расчёты и логика, а не страницы.",
      includes: [
        "Моделирование процесса и ролей",
        "Архитектура и надёжное хранение данных",
        "Авторизация и разграничение прав",
        "Серверная логика и расчёты",
        "Интеграции (оплаты, 1С, API)",
        "Безопасность, бэкапы, 152-ФЗ, MVP-подход",
      ],
    },
    en: {
      title: "Web application",
      short: "A service, portal, account area, SaaS, browser CRM.",
      tagline: "When you need a tool, not a site",
      article:
        "A web application isn't a showcase site — it's a working tool in the browser: an account area, a portal, a SaaS service, a custom CRM, a dashboard, an accounting or booking system. Here the point isn't to «tell» but to «let people do»: users log in, work with data, calculate, submit, track. It's the most complex and most valuable type of solution — it automates a process that today lives in Excel, messengers and someone's head.\n\nWe start by modelling the domain: which roles, entities and scenarios your process has, what should happen automatically, which integrations are needed. Then comes an architecture where data is stored reliably, permissions are scoped and load holds up as you grow. We build a clear interface, server-side logic (calculations, not «Excel formulas»), integrations with payments, ERP, external APIs and notifications. We bake in security, backups and personal-data compliance.\n\nA web app fits when a process has outgrown spreadsheets and manual handling, when you need an account area for clients or staff, or when you're launching your own digital product (SaaS). We often start with an MVP — shipping the key 20% that already delivers value and growing in iterations, so you don't sink the whole budget into hypotheses.",
      audience: [
        "Automating internal processes",
        "Account areas for clients/staff",
        "Custom CRM, accounting, booking",
        "Launching your own SaaS product",
      ],
      bestFor:
        "The process outgrew Excel and chat: you need data, roles, calculations and logic, not pages.",
      includes: [
        "Process & role modelling",
        "Architecture & reliable data storage",
        "Auth & permission scoping",
        "Server-side logic & calculations",
        "Integrations (payments, ERP, APIs)",
        "Security, backups, compliance, MVP approach",
      ],
    },
  },

  // ─── Интеграции ──────────────────────────────────────────────
  {
    slug: "integrations",
    price: { from: 38000, to: 250000 },
    ru: {
      title: "Интеграции",
      short: "Связываем сайт, CRM, 1С, оплаты, мессенджеры и сервисы.",
      tagline: "Чтобы системы говорили друг с другом",
      article:
        "Интеграция — это связывание разных систем в единый контур, чтобы данные передавались автоматически, а не переносились руками. Сайт и CRM, CRM и 1С, оплаты и бухгалтерия, заявки и мессенджеры, склад и магазин — по отдельности всё это уже есть, но между ними «дыра», которую закрывает менеджер копипастом. Интеграции убирают этот ручной труд, ошибки и потерю заявок.\n\nМы разбираемся, как устроен ваш поток данных, и проектируем обмен: что, куда и в какой момент передаётся, что делать при сбоях, как избежать дублей. Подключаемся к API сервисов (CRM вроде Битрикс24/amoCRM, 1С, эквайринг, службы доставки, телефония, Telegram/WhatsApp, рассылки) и настраиваем вебхуки, очереди и синхронизацию. Где готового API нет — пишем коннектор или промежуточный сервис. Всё логируется, чтобы было видно, что и когда передалось.\n\nИнтеграции подойдут, когда у вас уже есть инструменты, но они живут по отдельности: заявки с сайта не попадают в CRM, остатки расходятся со складом, оплаты приходится сверять вручную. Это часто самая окупаемая инвестиция в IT: небольшая по бюджету доработка экономит часы рутинной работы каждый день и устраняет человеческий фактор.",
      audience: [
        "Заявки с сайта не попадают в CRM",
        "1С, склад и магазин расходятся",
        "Оплаты и документы сверяются вручную",
        "Нужны уведомления в Telegram/почту",
      ],
      bestFor:
        "Инструменты есть, но не связаны — данные переносятся руками, теряются и дублируются.",
      includes: [
        "Аудит потока данных",
        "Подключение к API сервисов",
        "Вебхуки, очереди, синхронизация",
        "Кастомные коннекторы, где нет API",
        "Обработка ошибок и защита от дублей",
        "Логирование и мониторинг обмена",
      ],
    },
    en: {
      title: "Integrations",
      short: "We connect site, CRM, ERP, payments, messengers and services.",
      tagline: "So your systems talk to each other",
      article:
        "Integration is connecting different systems into one loop so data flows automatically instead of being copied by hand. Site and CRM, CRM and ERP, payments and accounting, requests and messengers, warehouse and store — individually you already have them, but there's a gap a manager fills with copy-paste. Integrations remove that manual work, errors and lost leads.\n\nWe map how your data flows and design the exchange: what goes where and when, what to do on failures, how to avoid duplicates. We connect to service APIs (CRMs like Bitrix24/amoCRM, ERP, payment gateways, delivery services, telephony, Telegram/WhatsApp, email) and set up webhooks, queues and sync. Where there's no ready API, we write a connector or a middleware service. Everything is logged so you can see what was passed and when.\n\nIntegrations fit when you already have tools but they live separately: site requests don't reach the CRM, stock drifts from the warehouse, payments are reconciled by hand. It's often the highest-ROI IT investment: a small build saves hours of routine every day and removes the human factor.",
      audience: [
        "Site requests don't reach the CRM",
        "ERP, warehouse and store drift apart",
        "Payments and docs reconciled by hand",
        "You need Telegram/email notifications",
      ],
      bestFor:
        "You have the tools but they're disconnected — data is moved by hand, lost and duplicated.",
      includes: [
        "Data-flow audit",
        "Connecting to service APIs",
        "Webhooks, queues, sync",
        "Custom connectors where no API exists",
        "Error handling & dedup",
        "Logging & exchange monitoring",
      ],
    },
  },

  // ─── Автоматизации ───────────────────────────────────────────
  {
    slug: "automation",
    price: { from: 90000, to: 200000 },
    ru: {
      title: "Автоматизации",
      short: "Боты, скрипты и сценарии, которые делают рутину за вас.",
      tagline: "Рутину — машинам",
      article:
        "Автоматизация — это когда повторяющаяся ручная работа передаётся скрипту, боту или сценарию, который выполняет её быстрее, без ошибок и круглосуточно. Telegram-бот для заявок и записи, авто-выгрузки и отчёты, пересчёты и рассылки, парсинг и обработка данных, генерация документов — всё, что сотрудник делает руками по одному и тому же алгоритму, можно и нужно автоматизировать.\n\nМы начинаем с поиска самых «дорогих» рутин: что отнимает больше всего времени, где чаще всего ошибаются, что мешает расти. Затем проектируем сценарий и реализуем его так, чтобы он встроился в ваши текущие инструменты, а не требовал переучивать команду. Это может быть Telegram-бот, фоновый скрипт по расписанию, обработчик входящих заявок или связка из нескольких шагов с уведомлениями и логами. Решение получает понятные настройки и режим проверки, чтобы вы доверяли результату.\n\nАвтоматизация подойдёт почти любому бизнесу, где есть регулярные операции: обработка заявок, отчётность, пересчёт цен и маржи, напоминания клиентам, рассылки, выгрузки. Часто это самый быстрый способ получить эффект от IT — небольшой скрипт окупается за недели, освобождая людей от монотонной работы для задач, где нужен человек.",
      audience: [
        "Telegram-боты для заявок и записи",
        "Отчёты, выгрузки, пересчёты",
        "Рассылки и напоминания клиентам",
        "Парсинг и обработка данных",
      ],
      bestFor:
        "Есть регулярная ручная рутина по одному алгоритму — её делает скрипт или бот.",
      includes: [
        "Поиск самых затратных рутин",
        "Проектирование сценария",
        "Telegram-боты, скрипты, обработчики",
        "Расписания, уведомления, логи",
        "Режим проверки (dry-run)",
        "Встраивание в текущие инструменты",
      ],
    },
    en: {
      title: "Automations",
      short: "Bots, scripts and flows that do the routine for you.",
      tagline: "Hand the routine to machines",
      article:
        "Automation is when repetitive manual work is handed to a script, bot or flow that does it faster, without errors and around the clock. A Telegram bot for requests and bookings, auto-exports and reports, recalculations and mailings, parsing and data processing, document generation — anything a person does by hand following the same algorithm can and should be automated.\n\nWe start by finding the most «expensive» routines: what eats the most time, where errors happen most, what blocks growth. Then we design the flow and build it to fit into your current tools instead of forcing the team to relearn. It can be a Telegram bot, a scheduled background script, an incoming-request handler or a multi-step chain with notifications and logs. The solution gets clear settings and a check mode so you trust the result.\n\nAutomation fits almost any business with regular operations: processing requests, reporting, recalculating prices and margin, client reminders, mailings, exports. It's often the fastest way to get value from IT — a small script pays off in weeks, freeing people from monotony for work where a human is actually needed.",
      audience: [
        "Telegram bots for requests & booking",
        "Reports, exports, recalculations",
        "Mailings & client reminders",
        "Parsing & data processing",
      ],
      bestFor:
        "There's regular manual routine on one algorithm — a script or bot does it.",
      includes: [
        "Finding the costliest routines",
        "Flow design",
        "Telegram bots, scripts, handlers",
        "Schedules, notifications, logs",
        "Dry-run check mode",
        "Fits into your current tools",
      ],
    },
  },
  // ─── Дизайн и брендинг ───────────────────────────────────────
  {
    slug: "design",
    price: { from: 30000, to: 250000 },
    ru: {
      title: "Дизайн и брендинг",
      short: "Логотип, фирстиль, прототипы и UX/UI до строчки кода.",
      tagline: "Сначала смысл и образ, потом пиксели",
      article:
        "Дизайн и брендинг — это фундамент, который определяет, как вас воспримут за первые секунды и доверятся ли вам вообще. Мы делаем не «красивые картинки», а систему: позиционирование, логотип, фирменный стиль, прототипы интерфейса и продуктовый UX/UI, на котором потом строится сайт или приложение. Хороший дизайн снимает с пользователя усилия — он понимает, что делать, и не сомневается, что перед ним серьёзная компания.\n\nРабота начинается с анализа: кто ваша аудитория, чем вы отличаетесь от конкурентов и какую задачу должен решать продукт. На этой основе мы собираем айдентику — логотип и фирменный стиль с правилами использования (цвета, шрифты, элементы), — и проектируем интерфейс: сначала прототип со структурой и логикой, который мы утверждаем до отрисовки, затем чистый визуал и дизайн-система из переиспользуемых компонентов. Это ускоряет дальнейшую разработку и держит бренд консистентным на всех носителях.\n\nДизайн подойдёт, когда вы запускаете новый продукт или компанию, обновляете устаревший образ или готовите интерфейс к разработке. Можно заказать дизайн отдельно (например, фирстиль или UX-прототип) или как первый этап перед сайтом, приложением или магазином — тогда визуал и код собираются одной командой и не «расходятся» при передаче.",
      audience: [
        "Запуск нового бренда или продукта",
        "Устаревший логотип и фирстиль",
        "Нужен UX/UI до разработки",
        "Редизайн сайта или приложения",
      ],
      bestFor:
        "Нужен сильный образ и продуманный интерфейс — как отдельно, так и первым этапом перед разработкой.",
      includes: [
        "Анализ аудитории и конкурентов",
        "Логотип и фирменный стиль с гайдами",
        "Прототипы и структура",
        "UX/UI-дизайн экранов",
        "Дизайн-система из компонентов",
        "Исходники и передача в разработку",
      ],
    },
    en: {
      title: "Design & branding",
      short: "Logo, identity, prototypes and UX/UI before a line of code.",
      tagline: "Meaning and image first, pixels second",
      article:
        "Design and branding are the foundation that decides how you're perceived in the first seconds and whether people trust you at all. We don't make «pretty pictures» — we build a system: positioning, logo, brand identity, interface prototypes and product UX/UI that the site or app is then built on. Good design removes effort from the user — they know what to do and don't doubt they're dealing with a serious company.\n\nThe work starts with analysis: who your audience is, how you differ from competitors and what job the product must do. On that basis we assemble the identity — logo and brand style with usage rules (colors, fonts, elements) — and design the interface: first a prototype with structure and logic that we approve before visuals, then clean UI and a design system of reusable components. This speeds up later development and keeps the brand consistent everywhere.\n\nDesign fits when you're launching a new product or company, refreshing a dated image, or preparing an interface for development. You can order it standalone (an identity or a UX prototype) or as the first stage before a site, app or store — so visuals and code are built by one team and don't «drift» at handoff.",
      audience: [
        "Launching a new brand or product",
        "Outdated logo and identity",
        "Need UX/UI before development",
        "Site or app redesign",
      ],
      bestFor:
        "You need a strong image and a thought-out interface — standalone or as the first stage before development.",
      includes: [
        "Audience & competitor analysis",
        "Logo & brand identity with guides",
        "Prototypes & structure",
        "UX/UI screen design",
        "Component design system",
        "Source files & dev handoff",
      ],
    },
  },

  // ─── Маркетинг и продвижение ─────────────────────────────────
  {
    slug: "marketing",
    price: { from: 30000, to: 200000 },
    ru: {
      title: "Маркетинг и продвижение",
      short: "Трафик и заявки: реклама, SEO, аналитика. От 30 000 ₽/мес.",
      tagline: "Не просто сайт, а поток клиентов",
      article:
        "Сайт без трафика — визитка, которую никто не видит. Маркетинг и продвижение — это работа на результат: привести на сайт целевых посетителей и превратить их в заявки и продажи. Мы не «осваиваем бюджет», а строим управляемый поток клиентов и считаем стоимость заявки, а не показы и лайки.\n\nНаправления зависят от задачи: контекстная и таргетированная реклама для быстрого трафика, SEO для роста из поиска вдолгую, SMM и контент для доверия и охвата. Перед запуском мы разбираем нишу и конкурентов, формируем стратегию и настраиваем сквозную аналитику — чтобы видеть, какой канал приносит заявки, а какой сливает деньги. Дальше — регулярная оптимизация: тесты гипотез, отключение неэффективного, усиление того, что работает.\n\nПродвижение обычно идёт абонентским форматом от 30 000 ₽ в месяц — так маркетинг работает системно, а не разовыми вспышками. Это подойдёт бизнесу, у которого уже есть сайт или магазин и нужны заявки, или тем, кто запускает продукт и хочет сразу выстроить привлечение. Если сайт ещё не готов — честно скажем, что сначала стоит довести продукт, иначе реклама будет лить трафик «в дырявое ведро».",
      audience: [
        "Есть сайт, но мало заявок",
        "Запуск продукта и привлечение с нуля",
        "Нужен предсказуемый поток клиентов",
        "Непонятно, какой канал окупается",
      ],
      bestFor:
        "Продукт готов, нужны целевой трафик и заявки с понятной стоимостью, а не «показы».",
      includes: [
        "Анализ ниши и конкурентов",
        "Стратегия и медиаплан",
        "Контекст, таргет, SEO, SMM",
        "Сквозная аналитика и цели",
        "Регулярная оптимизация и тесты",
        "Прозрачные отчёты по заявкам",
      ],
    },
    en: {
      title: "Marketing & growth",
      short: "Traffic and leads: ads, SEO, analytics. From $350/mo.",
      tagline: "Not just a site — a flow of clients",
      article:
        "A site without traffic is a business card nobody sees. Marketing and growth is results work: bring targeted visitors to the site and turn them into leads and sales. We don't «spend the budget» — we build a managed flow of clients and measure cost per lead, not impressions and likes.\n\nThe channels depend on the goal: paid search and social ads for fast traffic, SEO for long-term organic growth, SMM and content for trust and reach. Before launch we study the niche and competitors, build a strategy and set up end-to-end analytics — to see which channel brings leads and which burns money. Then comes regular optimization: testing hypotheses, cutting what's ineffective, doubling down on what works.\n\nGrowth usually runs as a monthly retainer from $350/mo — so marketing works systematically, not in one-off bursts. It fits businesses that already have a site or store and need leads, or those launching a product who want acquisition built in. If the site isn't ready, we'll say honestly that the product should come first — otherwise ads pour traffic into a leaky bucket.",
      audience: [
        "Have a site but few leads",
        "Product launch & acquisition from scratch",
        "Need a predictable client flow",
        "Unclear which channel pays off",
      ],
      bestFor:
        "The product is ready and you need targeted traffic and leads with a clear cost — not «impressions».",
      includes: [
        "Niche & competitor analysis",
        "Strategy & media plan",
        "Paid search, social, SEO, SMM",
        "End-to-end analytics & goals",
        "Ongoing optimization & tests",
        "Transparent lead reporting",
      ],
    },
  },

  // ─── Поддержка и сопровождение ───────────────────────────────
  {
    slug: "support",
    price: { from: 15000, to: 120000 },
    ru: {
      title: "Поддержка и сопровождение",
      short: "Обновления, мониторинг, доработки и развитие. От 15 000 ₽/мес.",
      tagline: "Запуск — это начало, а не финал",
      article:
        "Сайт или приложение — это не «сдал и забыл», а живая система, которая требует внимания: обновления безопасности, бэкапы, мониторинг доступности, мелкие правки и развитие функционала. Поддержка и сопровождение — это когда у вас есть команда, которая держит продукт в форме и помогает ему расти, а не ищет подрядчика заново при каждой задаче.\n\nМы берём на себя техническое сопровождение: следим, чтобы всё работало и быстро загружалось, обновляем зависимости и закрываем уязвимости, делаем регулярные бэкапы и реагируем на инциденты. Сюда же входят контентные и функциональные доработки — поправить текст, добавить раздел, новую интеграцию или фичу — по понятному регламенту и с прозрачным учётом времени. Вы всегда знаете, что сделано и сколько это заняло.\n\nФормат — абонентский, от 15 000 ₽ в месяц, с объёмом часов под вашу нагрузку; разовые задачи тоже возможны. Это подойдёт всем, у кого продукт уже работает и важен для бизнеса: интернет-магазину, веб-приложению, корпоративному сайту. Особенно ценно, когда нет своего штатного разработчика, а простой или уязвимость стоят дороже, чем поддержка.",
      audience: [
        "Продукт уже запущен и важен для бизнеса",
        "Нет своего штатного разработчика",
        "Нужны регулярные доработки и развитие",
        "Важны аптайм, скорость и безопасность",
      ],
      bestFor:
        "Продукт работает и его нельзя «ронять»: нужны обновления, мониторинг и доработки на потоке.",
      includes: [
        "Обновления и устранение уязвимостей",
        "Бэкапы и мониторинг доступности",
        "Контентные и функциональные доработки",
        "Реакция на инциденты по SLA",
        "Прозрачный учёт часов",
        "Развитие продукта по приоритетам",
      ],
    },
    en: {
      title: "Support & maintenance",
      short: "Updates, monitoring, fixes and growth. From $180/mo.",
      tagline: "Launch is the start, not the finish",
      article:
        "A site or app isn't «ship it and forget it» — it's a living system that needs attention: security updates, backups, uptime monitoring, small fixes and feature growth. Support and maintenance means you have a team that keeps the product in shape and helps it grow, instead of hunting for a new contractor for every task.\n\nWe take on technical maintenance: we make sure everything works and loads fast, update dependencies and patch vulnerabilities, run regular backups and respond to incidents. This also covers content and feature changes — edit text, add a section, a new integration or feature — on a clear process with transparent time tracking. You always know what was done and how long it took.\n\nThe format is a monthly retainer from $180/mo, with an hour budget matched to your load; one-off tasks are possible too. It fits anyone whose product already runs and matters to the business: an online store, a web app, a corporate site. It's especially valuable when there's no in-house developer and downtime or a vulnerability costs more than support.",
      audience: [
        "Product is live and business-critical",
        "No in-house developer",
        "Need regular fixes and growth",
        "Uptime, speed and security matter",
      ],
      bestFor:
        "The product runs and can't go down: you need updates, monitoring and fixes on tap.",
      includes: [
        "Updates & vulnerability patching",
        "Backups & uptime monitoring",
        "Content & feature changes",
        "Incident response with SLA",
        "Transparent hour tracking",
        "Prioritised product growth",
      ],
    },
  },
];

export function getSolution(slug: string): SolutionDef | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}

// ─── Shared delivery process (PRD-based, priced per stage) ─────
export type ProcessStep = {
  n: string;
  ru: { title: string; desc: string };
  en: { title: string; desc: string };
};

/**
 * Every project runs through these stages. We write the PRD together with the
 * client, agree each stage and quote the price per step BEFORE development.
 */
export const PROCESS_STEPS: ProcessStep[] = [
  {
    n: "01",
    ru: {
      title: "PRD и смета по этапам",
      desc: "Совместно составляем PRD (Product Requirements Document) — документ, где зафиксированы цели, функции, экраны и критерии готовности. На его основе разбиваем проект на этапы и заранее озвучиваем стоимость каждого шага. Вы видите цену до старта разработки.",
    },
    en: {
      title: "PRD & staged estimate",
      desc: "Together we write a PRD (Product Requirements Document) — goals, features, screens and acceptance criteria in one doc. From it we split the project into stages and quote each step upfront. You see the price before development starts.",
    },
  },
  {
    n: "02",
    ru: {
      title: "Прототип и дизайн",
      desc: "Собираем прототип и утверждаем структуру и логику до дизайна, затем — уникальный дизайн под ваш бренд. Направление вы согласуете здесь, а не на готовом продукте.",
    },
    en: {
      title: "Prototype & design",
      desc: "We build a prototype and approve structure and logic before visuals, then a custom on-brand design. You approve the direction here, not on a finished product.",
    },
  },
  {
    n: "03",
    ru: {
      title: "Разработка",
      desc: "Реализуем по утверждённому PRD итерациями. Вы видите прогресс на каждом этапе, а не «чёрный ящик» до самого конца.",
    },
    en: {
      title: "Development",
      desc: "We build against the approved PRD in iterations. You see progress at every stage — not a black box until the end.",
    },
  },
  {
    n: "04",
    ru: {
      title: "Тестирование и запуск",
      desc: "Проверяем по критериям приёмки из PRD на всех устройствах, исправляем дефекты и запускаем. Передаём исходный код и все доступы.",
    },
    en: {
      title: "QA & launch",
      desc: "We test against the PRD acceptance criteria on all devices, fix defects and launch. We hand over the source code and all access.",
    },
  },
  {
    n: "05",
    ru: {
      title: "Поддержка и развитие",
      desc: "Гарантия на сданную работу и, по желанию, поддержка: обновления, мониторинг, доработки и развитие продукта.",
    },
    en: {
      title: "Support & growth",
      desc: "Warranty on delivered work and, optionally, support: updates, monitoring, fixes and product growth.",
    },
  },
];
