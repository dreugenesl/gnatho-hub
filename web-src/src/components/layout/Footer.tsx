import Link from "next/link";
import { navGroups, plainLinks } from "@/data/navigation";
import { site } from "@/data/site";
import { href, tr } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types";
import { Container } from "@/components/ui";
import { Logo } from "./Header";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const columns = [
    ...navGroups.map((g) => ({ title: dict.footer[g.segment], links: g.links })),
    {
      title: dict.footer.company,
      links: [
        ...plainLinks,
        { href: "/cases", label: { uk: dict.nav.cases } },
        { href: "/prices", label: { uk: dict.nav.prices } },
      ],
    },
  ];

  return (
    <footer className="bg-deep text-ink-300">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(4,minmax(0,1fr))]">
          <div>
            <Logo locale={locale} light />
            <p className="mt-4 max-w-xs text-sm">{dict.footer.about}</p>
            <p className="mt-3 max-w-xs text-xs uppercase tracking-widest text-ink-500">{site.slogan[locale].join(" · ")}</p>
            <address className="mt-4 space-y-1 text-sm not-italic">
              <p>
                {site.city[locale]}, {site.address[locale]}
              </p>
              <p>{site.phone}</p>
              <p>{site.email}</p>
              <p>{site.hours[locale]}</p>
            </address>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-sm font-semibold text-white">{col.title}</h2>
              <ul className="mt-3 space-y-1">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={href(locale, l.href)} className="inline-flex min-h-8 items-center text-sm hover:text-sand-400">
                      {tr(l.label, locale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs sm:flex-row sm:justify-between">
          <p>
            © {site.copyrightYear} {site.name}. {dict.footer.rights}
          </p>
          <p>{dict.footer.medical}</p>
        </div>
      </Container>
    </footer>
  );
}
