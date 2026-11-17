"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeNames, locales } from "@/i18n/config";
import type { Locale } from "@/types";

/** Перемикає мову, зберігаючи поточну сторінку. */
export function LocaleSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(uk|en)(?=\/|$)/, "");

  return (
    <div role="group" aria-label={label} className="flex items-center rounded-lg border border-line p-0.5 text-xs font-semibold">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          hrefLang={l}
          aria-current={l === locale ? "true" : undefined}
          className={`flex min-h-9 items-center rounded-md px-2.5 ${
            l === locale ? "bg-brand-700 text-on-brand" : "text-ink-500 hover:text-ink-950"
          }`}
        >
          {localeNames[l]}
        </Link>
      ))}
    </div>
  );
}
