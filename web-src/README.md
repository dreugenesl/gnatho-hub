# GnathoHUB — вебсайт

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4. Статичний експорт (`output: "export"`) для GitHub Pages.

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000 → редирект на /uk
npm run build    # результат у теці out/
```

Змінні середовища:

- `NEXT_PUBLIC_SITE_URL` — домен для canonical, sitemap і JSON-LD.
- `NEXT_PUBLIC_BASE_PATH` — підтека публікації, наприклад `/next`.
- `NEXT_PUBLIC_PREVIEW=1` — демо-режим: плашка про умовні дані, `noindex`, форми нічого не надсилають.

Демо на gnathohub.com/next/ зібране так:

```bash
NEXT_PUBLIC_BASE_PATH=/next NEXT_PUBLIC_PREVIEW=1 npm run build
# вміст out/ копіюється в теку next/ гілки main репозиторію gnatho-hub
```

## Структура

```
src/
├─ app/
│  ├─ [locale]/                 uk | en
│  │  ├─ layout.tsx             <html lang>, Header, Footer
│  │  ├─ page.tsx               Головна — хаб на 3 сегменти
│  │  ├─ services/              список + [slug]
│  │  ├─ laboratory/            лендінг, protocol/, order/ (форма)
│  │  ├─ software/              лендінг, pricing/, demo/, docs/
│  │  ├─ blog/                  список, category/[audience], [slug]
│  │  ├─ doctors/               список + [slug]
│  │  ├─ cases/  prices/  contacts/
│  │  └─ not-found.tsx
│  ├─ sitemap.ts  robots.ts
│  └─ globals.css               дизайн-токени (@theme)
├─ components/
│  ├─ layout/                   Header, Nav (мега-меню), LocaleSwitcher, Footer
│  ├─ forms/                    LabOrderForm, LeadForm
│  ├─ blog/BlogList.tsx
│  ├─ cards.tsx  PricingPlans.tsx
│  └─ ui/index.tsx              Container, Section, ButtonLink, PageHeader…
├─ data/                        типізовані мок-дані
├─ i18n/                        config.ts, dictionaries/{uk,en}.json
├─ lib/                         seo.ts (metadata, JSON-LD), page.ts, submit.ts (форми — заглушки)
├─ types/index.ts
public/index.html                редирект на мову за налаштуваннями браузера
```

## Мультимовність

- Тексти інтерфейсу — у `src/i18n/dictionaries`.
- Контент у `src/data` має тип `Localized = { uk: string; en?: string }`.
  Якщо `en` не заповнено, англійська версія показує український текст.

## Що замінити перед запуском

1. `src/data/site.ts` — телефон, адреса, пошта (зараз заглушки в квадратних дужках).
2. `src/data/people.ts` — усі особи, крім засновника, вигадані; сертифікати — заглушки.
3. `src/data/cases.ts` — кейси демонстраційні, не публікуйте їх як реальні.
4. Ціни, тарифи й назви модулів у `src/data` — приклади.
5. `src/lib/submit.ts` — форми лише перевіряють дані й нічого не надсилають. Підключіть сервіс форм, Supabase або власний API.
6. Файли сканів зараз не передаються на сервер (надсилаються лише назви й розміри).
   Для реального завантаження STL використайте пряме вивантаження в обʼєктне сховище за підписаним URL.
