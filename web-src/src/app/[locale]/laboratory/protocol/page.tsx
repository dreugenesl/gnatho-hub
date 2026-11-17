import { ButtonLink, Card, CheckList, Container, PageHeader } from "@/components/ui";
import { labProtocol } from "@/data/laboratory";
import { href, tr } from "@/i18n/config";
import { resolveLocale, type LocaleParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  return buildMetadata({ locale, path: "/laboratory/protocol", title: dict.pages.labProtocol.title, description: dict.pages.labProtocol.lead });
}

export default async function LabProtocolPage({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  const page = dict.pages.labProtocol;
  return (
    <>
      <PageHeader
        locale={locale}
        homeLabel={dict.common.home}
        crumbs={[
          { name: dict.pages.laboratory.title, path: "/laboratory" },
          { name: page.title, path: "/laboratory/protocol" },
        ]}
        title={page.title}
        lead={page.lead}
      />
      <Container className="py-12">
        <div className="grid gap-5 lg:grid-cols-3">
          {labProtocol.map((group, i) => (
            <Card key={i}>
              <h2 className="mb-4 text-lg font-semibold text-ink-950">{tr(group.title, locale)}</h2>
              <CheckList items={group.items.map((x) => tr(x, locale))} />
            </Card>
          ))}
        </div>
        <ButtonLink to={href(locale, "/laboratory/order")} className="mt-8">
          {dict.home.labCta}
        </ButtonLink>
      </Container>
    </>
  );
}
