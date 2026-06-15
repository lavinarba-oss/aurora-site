export type Testimonial = {
  id: string;
  /** Initials for the avatar fallback */
  initials: string;
  /** Background gradient for avatar fallback */
  accent: string;
  ru: {
    name: string;
    role: string;
    quote: string;
  };
  en: {
    name: string;
    role: string;
    quote: string;
  };
};

/**
 * Placeholder testimonials — swap with real client quotes when available.
 * Each entry has both locales so the wall can render either /ru or /en
 * with the same source array.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    initials: "ИК",
    accent: "linear-gradient(135deg,#B967FF,#01CDFE)",
    ru: {
      name: "Игорь Кравцов",
      role: "CEO, VETRA",
      quote:
        "Подняли конверсию магазина в полтора раза, перенесли каталог без даун-тайма. Чёткий и предсказуемый процесс.",
    },
    en: {
      name: "Igor Kravtsov",
      role: "CEO, VETRA",
      quote:
        "They lifted store conversion by 1.5×, migrated the catalogue with zero downtime. Clear, predictable process.",
    },
  },
  {
    id: "t2",
    initials: "AM",
    accent: "linear-gradient(135deg,#01CDFE,#FF71CE)",
    ru: {
      name: "Анна Морозова",
      role: "Founder, Neva Beauty",
      quote:
        "Сделали Telegram Mini App за месяц. 12 000 записей в первый квартал — и без боли с CRM.",
    },
    en: {
      name: "Anna Morozova",
      role: "Founder, Neva Beauty",
      quote:
        "Shipped a Telegram Mini App in a month. 12,000 bookings in the first quarter — and no CRM headaches.",
    },
  },
  {
    id: "t3",
    initials: "ДВ",
    accent: "linear-gradient(135deg,#FF71CE,#B967FF)",
    ru: {
      name: "Денис Власов",
      role: "Ops Lead, FleetMind",
      quote:
        "Сэкономили по 4 часа в день каждому диспетчеру. CRM не выглядит как «1С-форма», и это уже подвиг.",
    },
    en: {
      name: "Denis Vlasov",
      role: "Ops Lead, FleetMind",
      quote:
        "Saved 4 hours a day per dispatcher. The CRM doesn't look like a 1C form — that alone is a miracle.",
    },
  },
  {
    id: "t4",
    initials: "СБ",
    accent: "linear-gradient(135deg,#7C3AED,#38BDF8)",
    ru: {
      name: "Светлана Беляева",
      role: "Product, Kondor",
      quote:
        "Приложение взлетело без рекламы благодаря классной онбордингу. Команда умеет в продукт, не только в код.",
    },
    en: {
      name: "Svetlana Belyaeva",
      role: "Product, Kondor",
      quote:
        "App took off without paid ads thanks to a great onboarding. The team thinks product, not just code.",
    },
  },
  {
    id: "t5",
    initials: "ME",
    accent: "linear-gradient(135deg,#38BDF8,#B967FF)",
    ru: {
      name: "Михаил Ершов",
      role: "CTO, Lumen Lab",
      quote:
        "Поддерживают код после релиза без героических усилий — это уже редкость в digital.",
    },
    en: {
      name: "Mikhail Ershov",
      role: "CTO, Lumen Lab",
      quote:
        "They support the code post-launch without heroics — rare in digital.",
    },
  },
  {
    id: "t6",
    initials: "ОТ",
    accent: "linear-gradient(135deg,#FF71CE,#01CDFE)",
    ru: {
      name: "Ольга Тимофеева",
      role: "Marketing, Orbit Travel",
      quote:
        "Сайт выглядит как премиум, а грузится мгновенно. Lighthouse 99 и команда, которая на стороне продукта.",
    },
    en: {
      name: "Olga Timofeeva",
      role: "Marketing, Orbit Travel",
      quote:
        "The site looks premium and loads instantly. Lighthouse 99 and a team that's on the product's side.",
    },
  },
  {
    id: "t7",
    initials: "АН",
    accent: "linear-gradient(135deg,#B967FF,#7C3AED)",
    ru: {
      name: "Артём Нестеров",
      role: "Founder, Pulse Auto",
      quote:
        "Вместо «когда-нибудь сделаем» — релиз через 6 недель. И боты, и CRM, и сайт.",
    },
    en: {
      name: "Artem Nesterov",
      role: "Founder, Pulse Auto",
      quote:
        "Instead of «someday» — a release in 6 weeks. Bots, CRM and the website.",
    },
  },
  {
    id: "t8",
    initials: "ЕС",
    accent: "linear-gradient(135deg,#01CDFE,#B967FF)",
    ru: {
      name: "Екатерина Соколова",
      role: "COO, Volta Foods",
      quote:
        "Дизайн, который не стыдно показать инвестору. Скорость, которая не стыдно показать пользователю.",
    },
    en: {
      name: "Ekaterina Sokolova",
      role: "COO, Volta Foods",
      quote:
        "Design we're proud to show investors. Speed we're proud to show users.",
    },
  },
];
