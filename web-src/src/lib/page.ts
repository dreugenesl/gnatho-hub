import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export type LocaleParams = { params: Promise<{ locale: string }> };
export type SlugParams = { params: Promise<{ locale: string; slug: string }> };

/** Перевіряє мову з URL і завантажує словник; для невідомої мови — 404. */
export async function resolveLocale(params: Promise<{ locale: string }>) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  return { locale, dict: await getDictionary(locale) };
}

export const localeParams = () => locales.map((locale) => ({ locale }));

/** Параметри для статичної генерації сторінок зі slug у кожній мові. */
export const slugParams = (slugs: string[]) =>
  locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
