import type { NavGroup, NavLink } from "@/types";

/** Три сегменти аудиторії — основа мега-меню та блоку на головній. */
export const navGroups: NavGroup[] = [
  {
    segment: "patients",
    label: { uk: "Пацієнтам", en: "Patients" },
    tagline: {
      uk: "Діагностика та лікування порушень СНЩС",
      en: "Diagnostics and treatment of TMJ disorders",
    },
    links: [
      {
        href: "/services",
        label: { uk: "Усі послуги", en: "All services" },
        description: { uk: "Гнатологія, діагностика, капи", en: "Gnathology, diagnostics, splints" },
      },
      {
        href: "/services/konsultatsiia-hnatoloha",
        label: { uk: "Консультація гнатолога", en: "Gnathologist consultation" },
        description: { uk: "Перший крок, якщо клацає або болить суглоб", en: "The first step when the joint clicks or hurts" },
      },
      {
        href: "/services/splint-terapiia",
        label: { uk: "Сплінт-терапія", en: "Splint therapy" },
        description: { uk: "Індивідуальна капа для розвантаження суглоба", en: "A custom splint to unload the joint" },
      },
      {
        href: "/cases",
        label: { uk: "Клінічні кейси", en: "Clinical cases" },
        description: { uk: "Як проходить лікування", en: "How treatment goes" },
      },
      {
        href: "/prices",
        label: { uk: "Ціни", en: "Prices" },
        description: { uk: "Вартість прийомів і кап", en: "Cost of visits and splints" },
      },
    ],
  },
  {
    segment: "clinics",
    label: { uk: "Клінікам", en: "Clinics" },
    tagline: {
      uk: "Лабораторія: капи та сплінти за вашими сканами",
      en: "Laboratory: splints made from your scans",
    },
    links: [
      {
        href: "/laboratory",
        label: { uk: "Про лабораторію", en: "About the laboratory" },
        description: { uk: "Що виготовляємо і в які терміни", en: "What we make and how fast" },
      },
      {
        href: "/laboratory/protocol",
        label: { uk: "Протокол передачі сканів", en: "Scan transfer protocol" },
        description: { uk: "Формати, реєстрація прикусу, чек-лист", en: "Formats, bite registration, checklist" },
      },
      {
        href: "/laboratory/order",
        label: { uk: "Замовити онлайн", en: "Order online" },
        description: { uk: "Форма із завантаженням STL", en: "Form with STL upload" },
      },
    ],
  },
  {
    segment: "software",
    label: { uk: "Софт", en: "Software" },
    tagline: {
      uk: "GnathoLine — планування у віртуальному артикуляторі",
      en: "GnathoLine — planning in a virtual articulator",
    },
    links: [
      {
        href: "/software",
        label: { uk: "Огляд GnathoLine", en: "GnathoLine overview" },
        description: { uk: "Модулі та можливості", en: "Modules and capabilities" },
      },
      {
        href: "/software/pricing",
        label: { uk: "Тарифи", en: "Pricing" },
        description: { uk: "Плани для лікаря, клініки та лабораторії", en: "Plans for dentists, clinics and labs" },
      },
      {
        href: "/software/docs",
        label: { uk: "Документація", en: "Documentation" },
        description: { uk: "Встановлення та робота з модулями", en: "Installation and modules" },
      },
      {
        href: "/software/demo",
        label: { uk: "Запросити демо", en: "Request a demo" },
        description: { uk: "Покажемо на вашому випадку", en: "Shown on your own case" },
      },
    ],
  },
];

export const plainLinks: (NavLink & { key: "blog" | "doctors" | "cases" | "prices" | "contacts" })[] = [
  { key: "blog", href: "/blog", label: { uk: "Блог", en: "Blog" } },
  { key: "doctors", href: "/doctors", label: { uk: "Команда", en: "Team" } },
  { key: "contacts", href: "/contacts", label: { uk: "Контакти", en: "Contacts" } },
];
