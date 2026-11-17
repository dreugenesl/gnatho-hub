import { LabOrderForm } from "@/components/forms/LabOrderForm";
import { Container, PageHeader } from "@/components/ui";
import { labProducts } from "@/data/laboratory";
import { tr } from "@/i18n/config";
import { resolveLocale, type LocaleParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  return buildMetadata({ locale, path: "/laboratory/order", title: dict.pages.labOrder.title, description: dict.pages.labOrder.lead });
}

export default async function LabOrderPage({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  const page = dict.pages.labOrder;
  const products = labProducts.map((p) => ({
    id: p.id,
    name: tr(p.name, locale),
    text: tr(p.text, locale),
    days: p.days,
    price: p.price,
  }));
  return (
    <>
      <PageHeader
        locale={locale}
        homeLabel={dict.common.home}
        crumbs={[
          { name: dict.pages.laboratory.title, path: "/laboratory" },
          { name: page.title, path: "/laboratory/order" },
        ]}
        title={page.title}
        lead={page.lead}
      />
      <Container className="py-12">
        <LabOrderForm locale={locale} products={products} />
      </Container>
    </>
  );
}
