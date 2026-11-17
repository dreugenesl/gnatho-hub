import { notFound } from "next/navigation";
import { Badge, ButtonLink, Card, CheckList, Container, PageHeader } from "@/components/ui";
import { getService, services } from "@/data/services";
import { href, tr } from "@/i18n/config";
import { resolveLocale, slugParams, type SlugParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export const generateStaticParams = () => slugParams(services.map((s) => s.slug));

export async function generateMetadata({ params }: SlugParams) {
  const { locale } = await resolveLocale(params);
  const service = getService((await params).slug);
  if (!service) return {};
  return buildMetadata({
    locale,
    path: `/services/${service.slug}`,
    title: tr(service.title, locale),
    description: tr(service.summary, locale),
  });
}

export default async function ServicePage({ params }: SlugParams) {
  const { locale, dict } = await resolveLocale(params);
  const service = getService((await params).slug);
  if (!service) notFound();
  const title = tr(service.title, locale);

  return (
    <>
      <PageHeader
        locale={locale}
        homeLabel={dict.common.home}
        crumbs={[
          { name: dict.pages.services.title, path: "/services" },
          { name: title, path: `/services/${service.slug}` },
        ]}
        title={title}
        lead={tr(service.summary, locale)}
      >
        <div className="mt-5">
          <Badge>{dict.services[service.category]}</Badge>
        </div>
      </PageHeader>
      <Container className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-10">
          <div className="space-y-4 text-lg text-ink-700">
            {service.description.map((p, i) => (
              <p key={i}>{tr(p, locale)}</p>
            ))}
          </div>
          <section>
            <h2 className="mb-4 text-xl font-semibold">{dict.services.forWhom}</h2>
            <CheckList items={service.forWhom.map((x) => tr(x, locale))} />
          </section>
          <section>
            <h2 className="mb-4 text-xl font-semibold">{dict.services.steps}</h2>
            <ol className="space-y-3">
              {service.steps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-sand-50 text-sm font-semibold text-sand-700">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-ink-700">{tr(step, locale)}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
        <aside>
          <Card className="lg:sticky lg:top-24">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-ink-500">{dict.services.price}</dt>
                <dd className="text-2xl font-semibold text-ink-950">
                  {dict.common.from} {service.priceFrom.toLocaleString("uk-UA")} {dict.common.uah}
                </dd>
              </div>
              <div>
                <dt className="text-ink-500">{dict.services.duration}</dt>
                <dd className="font-medium text-ink-950">
                  {service.durationMinutes} {dict.common.minutes}
                </dd>
              </div>
            </dl>
            <ButtonLink to={href(locale, "/contacts")} className="mt-6 w-full">
              {dict.nav.book}
            </ButtonLink>
          </Card>
        </aside>
      </Container>
    </>
  );
}
