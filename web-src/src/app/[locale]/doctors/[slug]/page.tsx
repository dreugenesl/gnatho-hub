import { notFound } from "next/navigation";
import { ArticleCard, Avatar } from "@/components/cards";
import { Badge, Container, JsonLd, PageHeader } from "@/components/ui";
import { getArticles } from "@/data/articles";
import { getPerson, people } from "@/data/people";
import { tr } from "@/i18n/config";
import { resolveLocale, slugParams, type SlugParams } from "@/lib/page";
import { buildMetadata, personJsonLd } from "@/lib/seo";

export const generateStaticParams = () => slugParams(people.map((p) => p.slug));

export async function generateMetadata({ params }: SlugParams) {
  const { locale } = await resolveLocale(params);
  const person = getPerson((await params).slug);
  if (!person) return {};
  return buildMetadata({
    locale,
    path: `/doctors/${person.slug}`,
    title: `${tr(person.name, locale)} — ${tr(person.role, locale)}`,
    description: tr(person.bio, locale),
  });
}

export default async function PersonPage({ params }: SlugParams) {
  const { locale, dict } = await resolveLocale(params);
  const person = getPerson((await params).slug);
  if (!person) notFound();
  const name = tr(person.name, locale);
  const written = getArticles().filter((a) => a.authorSlug === person.slug || a.reviewerSlug === person.slug);

  return (
    <>
      <JsonLd data={personJsonLd(person, locale)} />
      <PageHeader
        locale={locale}
        homeLabel={dict.common.home}
        crumbs={[
          { name: dict.pages.doctors.title, path: "/doctors" },
          { name, path: `/doctors/${person.slug}` },
        ]}
        title={name}
        lead={tr(person.role, locale)}
      >
        <div className="mt-6 flex items-center gap-4">
          <Avatar person={person} locale={locale} size="h-16 w-16 text-xl" />
          {person.experienceYears ? (
            <Badge>
              {person.experienceYears} {dict.common.years}
            </Badge>
          ) : null}
        </div>
      </PageHeader>
      <Container className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-10">
          <p className="text-lg text-ink-700">{tr(person.bio, locale)}</p>
          <section>
            <h2 className="mb-4 text-xl font-semibold">{dict.team.specialties}</h2>
            <ul className="flex flex-wrap gap-2">
              {person.specialties.map((s, i) => (
                <li key={i}>
                  <Badge tone="gray">{tr(s, locale)}</Badge>
                </li>
              ))}
            </ul>
          </section>
          {written.length > 0 ? (
            <section>
              <h2 className="mb-4 text-xl font-semibold">{dict.team.articles}</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {written.map((a) => (
                  <ArticleCard key={a.slug} article={a} locale={locale} dict={dict} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
        <aside className="h-fit rounded-2xl border border-line bg-surface p-6">
          <h2 className="text-lg font-semibold">{dict.team.certificates}</h2>
          <ul className="mt-4 space-y-4">
            {person.certificates.map((c, i) => (
              <li key={i} className="text-sm">
                <p className="font-medium text-ink-950">{tr(c.title, locale)}</p>
                <p className="text-ink-500">
                  {c.issuer}, {c.year}
                </p>
              </li>
            ))}
          </ul>
        </aside>
      </Container>
    </>
  );
}
