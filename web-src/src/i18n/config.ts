import type { Locale, Localized } from "@/types";

export const locales: Locale[] = ["uk", "en"];
export const defaultLocale: Locale = "uk";

export const localeNames: Record<Locale, string> = { uk: "UA", en: "EN" };

export function hasLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}

/** Повертає текст потрібною мовою; якщо перекладу немає — українською. */
export function tr(value: Localized, locale: Locale): string {
  return value[locale] ?? value.uk;
}

/** Будує шлях із префіксом мови: href("uk", "/blog") → "/uk/blog". */
export function href(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path;
  return `/${locale}${clean}`;
}
