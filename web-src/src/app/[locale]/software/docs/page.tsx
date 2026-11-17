import { Card, CheckList, Container, PageHeader } from "@/components/ui";
import { site } from "@/data/site";
import { docsSections } from "@/data/software";
import { tr } from "@/i18n/config";
import { resolveLocale, type LocaleParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  return buildMetadata({ locale, path: "/software/docs", title: dict.pages.softwareDocs.title, description: dict.pages.softwareDocs.lead });
}

export default async function SoftwareDocsPage({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  const page = dict.pages.softwareDocs;
  return (
    <>
      <PageHeader
        locale={locale}
        homeLabel={dict.common.home}
        crumbs={[
          { name: site.software, path: "/software" },
          { name: page.title, path: "/software/docs" },
        ]}
        title={page.title}
        lead={page.lead}
      />
      <Container className="grid gap-5 py-12 sm:grid-cols-2">
        {docsSections.map((section, i) => (
          <Card key={i}>
            <h2 className="mb-4 text-lg font-semibold text-ink-950">{tr(section.title, locale)}</h2>
            <CheckList items={section.items.map((x) => tr(x, locale))} />
          </Card>
        ))}
      </Container>
    </>
  );
}
