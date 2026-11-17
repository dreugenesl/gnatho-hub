import { notFound } from "next/navigation";
import { BlogList } from "@/components/blog/BlogList";
import { audiences } from "@/data/articles";
import { locales } from "@/i18n/config";
import { resolveLocale } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";
import type { Audience } from "@/types";

type Props = { params: Promise<{ locale: string; audience: string }> };

export const generateStaticParams = () => locales.flatMap((locale) => audiences.map((audience) => ({ locale, audience })));

const isAudience = (v: string): v is Audience => (audiences as string[]).includes(v);

export async function generateMetadata({ params }: Props) {
  const { locale, dict } = await resolveLocale(params);
  const { audience } = await params;
  if (!isAudience(audience)) return {};
  return buildMetadata({
    locale,
    path: `/blog/category/${audience}`,
    title: `${dict.pages.blog.title}: ${dict.blog[audience].toLowerCase()}`,
    description: dict.pages.blog.lead,
  });
}

export default async function BlogCategoryPage({ params }: Props) {
  const { locale, dict } = await resolveLocale(params);
  const { audience } = await params;
  if (!isAudience(audience)) notFound();
  return <BlogList locale={locale} dict={dict} audience={audience} />;
}
