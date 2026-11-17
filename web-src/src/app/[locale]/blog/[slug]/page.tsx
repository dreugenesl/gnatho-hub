import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorBox } from "@/components/cards";
import { Badge, Container, JsonLd, PageHeader } from "@/components/ui";
import { articles, getArticle } from "@/data/articles";
import { getPerson } from "@/data/people";
import { href, tr } from "@/i18n/config";
import { resolveLocale, slugParams, type SlugParams } from "@/lib/page";
import { articleJsonLd, buildMetadata, formatDate } from "@/lib/seo";

export const generateStaticParams = () => slugParams(articles.map((a) => a.slug));

export async function generateMetadata({ params }: SlugParams) {
  const { locale } = await resolveLocale(params);
  const article = getArticle((await params).slug);
  if (!article) return {};
  const author = getPerson(article.authorSlug);
  return {
    ...buildMetadata({
      locale,
      path: `/blog/${article.slug}`,
      title: tr(article.title, locale),
      description: tr(article.excerpt, locale),
      type: "article",
    }),
    authors: author ? [{ name: tr(author.name, locale), url: href(locale, `/doctors/${author.slug}`) }] : undefined,
  };
}

export default async function ArticlePage({ params }: SlugParams) {
  const { locale, dict } = await resolveLocale(params);
  const article = getArticle((await params).slug);
  const author = article ? getPerson(article.authorSlug) : undefined;
  if (!article || !author) notFound();
  const reviewer = article.reviewerSlug ? getPerson(article.reviewerSlug) : undefined;
  const title = tr(article.title, locale);

  return (
    <article>
      <JsonLd data={articleJsonLd(article, author, reviewer, locale)} />
      <PageHeader
        locale={locale}
        homeLabel={dict.common.home}
        crumbs={[
          { name: dict.pages.blog.title, path: "/blog" },
          { name: dict.blog[article.audience], path: `/blog/category/${article.audience}` },
          { name: title, path: `/blog/${article.slug}` },
        ]}
        title={title}
        lead={tr(article.excerpt, locale)}
      >
        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-ink-500">
          <Badge tone={article.audience === "patients" ? "mint" : "blue"}>{dict.blog[article.audience]}</Badge>
          <span>
            {dict.common.published}: <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, locale)}</time>
          </span>
          {article.updatedAt !== article.publishedAt ? (
            <span>
              {dict.common.updated}: <time dateTime={article.updatedAt}>{formatDate(article.updatedAt, locale)}</time>
            </span>
          ) : null}
          <span>
            {article.readingMinutes} {dict.common.readingTime}
          </span>
        </div>
      </PageHeader>

      <Container className="max-w-3xl py-12">
        <AuthorBox author={author} reviewer={reviewer} locale={locale} dict={dict} />

        <div className="mt-10 space-y-5 text-lg leading-relaxed text-ink-700">
          {article.body.map((block, i) => {
            switch (block.type) {
              case "heading":
                return (
                  <h2 key={i} className="pt-4 text-2xl font-semibold text-ink-950">
                    {tr(block.text, locale)}
                  </h2>
                );
              case "paragraph":
                return <p key={i}>{tr(block.text, locale)}</p>;
              case "list":
                return (
                  <ul key={i} className="list-disc space-y-2 pl-6 marker:text-sand-700">
                    {block.items.map((item, j) => (
                      <li key={j}>{tr(item, locale)}</li>
                    ))}
                  </ul>
                );
              case "note":
                return (
                  <p key={i} className="rounded-xl border-l-4 border-sand-500 bg-sand-50 p-5 text-base text-ink-900">
                    {tr(block.text, locale)}
                  </p>
                );
            }
          })}
        </div>

        <ul className="mt-10 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <li key={tag}>
              <Badge tone="gray">{tag}</Badge>
            </li>
          ))}
        </ul>

        {article.audience === "patients" ? (
          <p className="mt-8 border-t border-line pt-6 text-sm text-ink-500">{dict.blog.disclaimer}</p>
        ) : null}

        <p className="mt-8">
          <Link href={href(locale, "/blog")} className="font-semibold text-sand-700 hover:text-brand-700">
            ← {dict.home.blogAll}
          </Link>
        </p>
      </Container>
    </article>
  );
}
