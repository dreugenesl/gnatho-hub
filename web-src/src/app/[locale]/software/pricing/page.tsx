import { PricingPlans } from "@/components/PricingPlans";
import { Container, PageHeader } from "@/components/ui";
import { site } from "@/data/site";
import { resolveLocale, type LocaleParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  return buildMetadata({ locale, path: "/software/pricing", title: dict.pages.softwarePricing.title, description: dict.pages.softwarePricing.lead });
}

export default async function SoftwarePricingPage({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  const page = dict.pages.softwarePricing;
  return (
    <>
      <PageHeader
        locale={locale}
        homeLabel={dict.common.home}
        crumbs={[
          { name: site.software, path: "/software" },
          { name: page.title, path: "/software/pricing" },
        ]}
        title={page.title}
        lead={page.lead}
      />
      <Container className="py-12">
        <PricingPlans locale={locale} dict={dict} />
      </Container>
    </>
  );
}
