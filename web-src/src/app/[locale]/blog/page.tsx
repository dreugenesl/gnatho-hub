import { BlogList } from "@/components/blog/BlogList";
import { resolveLocale, type LocaleParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  return buildMetadata({ locale, path: "/blog", title: dict.pages.blog.title, description: dict.pages.blog.lead });
}

export default async function BlogPage({ params }: LocaleParams) {
  const { locale, dict } = await resolveLocale(params);
  return <BlogList locale={locale} dict={dict} />;
}
