import Link from "next/link";
import { ArticleCard } from "@/components/cards";
import { Container, PageHeader } from "@/components/ui";
import { audiences, getArticles } from "@/data/articles";
import { href } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Audience, Locale } from "@/types";

/** Список статей із фільтром аудиторії. Фільтр — це окремі URL, щоб їх індексували пошуковики. */
export function BlogList({ locale, dict, audience }: { locale: Locale; dict: Dictionary; audience?: Audience }) {
  const page = dict.pages.blog;
  const tabs = [
    { key: "all", label: dict.common.all, path: "/blog", active: !audience },
    ...audiences.map((a) => ({ key: a, label: dict.blog[a], path: `/blog/category/${a}`, active: a === audience })),
  ];
  const crumbs = [{ name: page.title, path: "/blog" }];
  if (audience) crumbs.push({ name: dict.blog[audience], path: `/blog/category/${audience}` });

  return (
    <>
      <PageHeader
        locale={locale}
        homeLabel={dict.common.home}
        crumbs={crumbs}
        title={audience ? `${page.title}: ${dict.blog[audience].toLowerCase()}` : page.title}
        lead={page.lead}
      >
        <nav aria-label={page.title} className="mt-7 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Link
              key={tab.key}
              href={href(locale, tab.path)}
              aria-current={tab.active ? "page" : undefined}
              className={`inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-semibold transition-colors ${
                tab.active ? "border-brand-700 bg-brand-700 text-on-brand" : "border-ink-300 bg-panel text-ink-900 hover:border-brand-700"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </PageHeader>
      <Container className="grid gap-5 py-12 md:grid-cols-2 lg:grid-cols-3">
        {getArticles(audience).map((a) => (
          <ArticleCard key={a.slug} article={a} locale={locale} dict={dict} />
        ))}
      </Container>
    </>
  );
}
