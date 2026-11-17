/**
 * Загальні налаштування сайту.
 * УВАГА: телефон, адреса та пошта — заглушки, замініть реальними перед запуском.
 */
/** Підтека публікації ("" для кореня домену). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
/** Демо-режим: показує плашку про умовні дані, забороняє індексацію, форми нічого не надсилають. */
export const isPreview = process.env.NEXT_PUBLIC_PREVIEW === "1";

export const site = {
  name: "GnathoHUB",
  /** Рік у футері: фіксований, щоб сторінки були повністю статичними. */
  copyrightYear: 2026,
  software: "GnathoLine",
  /** Слоган сайту: шість складових функціонального лікування. */
  slogan: {
    uk: ["Естетика", "М'язи", "Суглоб", "Баланс", "Постура", "Ментальність"],
    en: ["Aesthetics", "Muscles", "TMJ", "Balance", "Posture", "Mind"],
  },
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://gnathohub.com") + basePath,
  city: { uk: "Київ", en: "Kyiv" },
  address: { uk: "[Адреса клініки]", en: "[Clinic address]" },
  phone: "[+380 00 000 00 00]",
  email: "[hello@example.com]",
  hours: { uk: "Пн–Пт 9:00–19:00", en: "Mon–Fri 9:00–19:00" },
};
