import Link from "next/link";
import { href, tr } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { formatDate } from "@/lib/seo";
import { getPerson } from "@/data/people";
import type { Article, Locale, Person, Service } from "@/types";
import { Badge } from "@/components/ui";

const cardLink =
  "group flex h-full flex-col rounded-2xl border border-line bg-panel p-6 transition-colors hover:border-brand-700";

export function Avatar({ person, locale, size = "h-12 w-12 text-base" }: { person: Person; locale: Locale; size?: string }) {
  const initials = tr(person.name, locale)
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <span aria-hidden="true" className={`flex flex-none items-center justify-center rounded-full bg-brand-700 font-semibold text-on-brand ${size}`}>
      {initials}
    </span>
  );
}

export function ServiceCard({ service, locale, dict }: { service: Service; locale: Locale; dict: Dictionary }) {
  return (
    <Link href={href(locale, `/services/${service.slug}`)} className={cardLink}>
      <Badge>{dict.services[service.category]}</Badge>
      <h3 className="mt-4 text-lg font-semibold text-ink-950 group-hover:text-brand-700">{tr(service.title, locale)}</h3>
      <p className="mt-2 flex-1 text-sm text-ink-500">{tr(service.summary, locale)}</p>
      <p className="mt-5 text-sm font-medium text-ink-900">
        {dict.common.from} {service.priceFrom.toLocaleString("uk-UA")} {dict.common.uah} · {service.durationMinutes} {dict.common.minutes}
      </p>
    </Link>
  );
}

export function ArticleCard({ article, locale, dict }: { article: Article; locale: Locale; dict: Dictionary }) {
  const author = getPerson(article.authorSlug);
  return (
    <article className="h-full">
      <Link href={href(locale, `/blog/${article.slug}`)} className={cardLink}>
        <div className="flex items-center gap-2">
          <Badge tone={article.audience === "patients" ? "mint" : "blue"}>{dict.blog[article.audience]}</Badge>
          <span className="text-xs text-ink-500">
            {article.readingMinutes} {dict.common.readingTime}
          </span>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-ink-950 group-hover:text-brand-700">{tr(article.title, locale)}</h3>
        <p className="mt-2 flex-1 text-sm text-ink-500">{tr(article.excerpt, locale)}</p>
        {author ? (
          <p className="mt-5 flex items-center gap-3 text-sm">
            <Avatar person={author} locale={locale} size="h-9 w-9 text-xs" />
            <span>
              <span className="block font-medium text-ink-950">{tr(author.name, locale)}</span>
              <time dateTime={article.publishedAt} className="text-ink-500">
                {formatDate(article.publishedAt, locale)}
              </time>
            </span>
          </p>
        ) : null}
      </Link>
    </article>
  );
}

export function PersonCard({ person, locale }: { person: Person; locale: Locale }) {
  return (
    <Link href={href(locale, `/doctors/${person.slug}`)} className={cardLink}>
      <Avatar person={person} locale={locale} size="h-14 w-14 text-lg" />
      <h3 className="mt-4 text-lg font-semibold text-ink-950 group-hover:text-brand-700">{tr(person.name, locale)}</h3>
      <p className="mt-1 text-sm font-medium text-sand-700">{tr(person.role, locale)}</p>
      <p className="mt-3 flex-1 text-sm text-ink-500">{tr(person.bio, locale)}</p>
    </Link>
  );
}

/** Блок «Автор статті / Перевірено лікарем» — видимий сигнал E-E-A-T. */
export function AuthorBox({
  author,
  reviewer,
  locale,
  dict,
}: {
  author: Person;
  reviewer?: Person;
  locale: Locale;
  dict: Dictionary;
}) {
  const rows = [
    { label: dict.blog.author, person: author },
    ...(reviewer ? [{ label: dict.blog.reviewer, person: reviewer }] : []),
  ];
  return (
    <aside className="grid gap-4 rounded-2xl border border-line bg-surface p-5 sm:grid-cols-2">
      {rows.map(({ label, person }) => (
        <div key={label} className="flex gap-4">
          <Avatar person={person} locale={locale} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{label}</p>
            <Link href={href(locale, `/doctors/${person.slug}`)} rel="author" className="font-semibold text-ink-950 hover:text-brand-700">
              {tr(person.name, locale)}
            </Link>
            <p className="text-sm text-ink-500">{tr(person.role, locale)}</p>
          </div>
        </div>
      ))}
    </aside>
  );
}
