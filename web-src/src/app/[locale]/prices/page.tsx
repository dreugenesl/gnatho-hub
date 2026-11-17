import { ButtonLink, Container, PageHeader } from "@/components/ui";
import { priceGroups } from "@/data/laboratory";
import { href, tr } from "@/i18n/config";
import { resolveLocale, type LocaleParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  return buildMetadata({ locale, path: "/prices", title: dict.pages.prices.title, description: dict.pages.prices.lead });
}

export default async function PricesPage({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  const page = dict.pages.prices;
  return (
    <>
      <PageHeader locale={locale} homeLabel={dict.common.home} crumbs={[{ name: page.title, path: "/prices" }]} title={page.title} lead={page.lead} />
      <Container className="grid gap-8 py-12 lg:grid-cols-2">
        {priceGroups.map((group, i) => (
          <section key={i} className="rounded-2xl border border-line">
            <h2 className="border-b border-line px-6 py-4 text-lg font-semibold">{tr(group.title, locale)}</h2>
            <table className="w-full text-sm">
              <tbody>
                {group.items.map((item, j) => (
                  <tr key={j} className="border-b border-line last:border-0">
                    <th scope="row" className="px-6 py-3.5 text-left font-normal text-ink-700">
                      {tr(item.name, locale)}
                    </th>
                    <td className="whitespace-nowrap px-6 py-3.5 text-right font-semibold text-ink-950">
                      {item.price} {dict.common.uah}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}
      </Container>
      <Container className="pb-14">
        <ButtonLink to={href(locale, "/software/pricing")} variant="outline">
          {dict.pages.softwarePricing.title} →
        </ButtonLink>
      </Container>
    </>
  );
}
