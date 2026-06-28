import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { PageHeader } from "@/components/ui/page-header"
import { SectionTitle } from "@/components/ui/section-title"
import { TechCard } from "@/components/ui/tech-card"
import { GithubIcon } from "@/components/ui/social-icons"
import { toAbsoluteUrl, getSiteUrl } from "@/lib/site-url"
import { getManifestStats } from "@/lib/articles/manifest"
import {
  getUniqueAuthors,
  resolveAuthorPerson,
} from "@/lib/articles/person-resolver"
import { buildWebPageJsonLd } from "@/lib/seo/json-ld"
import type { ArticleLocale } from "@/lib/articles/manifest"

const PREVIEW_AUTHOR_COUNT = 8

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "About" })
  const canonical = toAbsoluteUrl(`/${locale}/about`)

  return {
    title: t("pageTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical,
      languages: {
        en: toAbsoluteUrl("/en/about"),
        zh: toAbsoluteUrl("/zh/about"),
        "x-default": toAbsoluteUrl("/zh/about"),
      },
    },
    openGraph: {
      title: t("pageTitle"),
      description: t("metaDescription"),
      type: "website",
      url: canonical,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/opengraph-image"],
    },
  }
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const articleLocale = locale as ArticleLocale
  const t = await getTranslations({ locale, namespace: "About" })
  const siteUrl = getSiteUrl()

  const stats = getManifestStats(articleLocale)
  const allAuthors = getUniqueAuthors()
  const previewAuthors = allAuthors.slice(0, PREVIEW_AUTHOR_COUNT)
  const resolvedAuthors = previewAuthors.map((handle) => ({
    handle,
    person: resolveAuthorPerson(handle),
  }))

  const jsonLd = buildJsonLdScript(
    siteUrl,
    locale,
    t("pageTitle"),
    t("metaDescription")
  )

  return (
    <div className="page-container-pb">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd} />

      <PageHeader
        title={t("pageTitle")}
        subtitle={t("pageDescription")}
        topMargin
      />

      <section className="mt-10">
        <SectionTitle>{t("missionTitle")}</SectionTitle>
        <div className="max-w-3xl space-y-4">
          <p className="text-tech-main-dark text-base/relaxed">
            {t("missionBody")}
          </p>
          <p className="text-tech-main text-sm/relaxed">{t("missionBody2")}</p>
        </div>
      </section>

      <section className="mt-10">
        <SectionTitle>{t("statsTitle")}</SectionTitle>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard
            label={t("statsArticles")}
            value={String(stats.articleCount)}
          />
          <StatCard
            label={t("statsContributors")}
            value={String(allAuthors.length)}
          />
          <StatCard
            label={t("statsLanguages")}
            value={t("statsLanguagesValue")}
          />
          <StatCard
            label={t("statsLastRevision")}
            value={
              stats.lastRevision
                ? new Date(stats.lastRevision).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "—"
            }
          />
        </div>
      </section>

      <section className="mt-10">
        <SectionTitle>{t("teamTitle")}</SectionTitle>
        <p className="text-tech-main mb-6 max-w-3xl text-sm/relaxed">
          {t("teamDescription")}
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resolvedAuthors.map(({ handle, person }) => (
            <TechCard key={handle} padding="compact" hover="border">
              <div className="flex items-center gap-3">
                <div className="bg-tech-main/10 flex size-9 shrink-0 items-center justify-center font-mono text-sm font-bold uppercase">
                  {person.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-tech-main-dark truncate text-sm font-medium">
                    {person.name}
                  </p>
                  {person.social.github && (
                    <p className="text-tech-main/60 truncate font-mono text-xs">
                      @{extractGithubHandle(person.social.github)}
                    </p>
                  )}
                </div>
              </div>
            </TechCard>
          ))}
        </div>
        {allAuthors.length > PREVIEW_AUTHOR_COUNT && (
          <p className="text-tech-main/60 mt-4 font-mono text-xs tracking-widest uppercase">
            {t("teamCountLabel")}: {allAuthors.length}
          </p>
        )}
      </section>

      <section className="mt-10">
        <SectionTitle>{t("contributeTitle")}</SectionTitle>
        <p className="text-tech-main mb-6 max-w-3xl text-sm/relaxed">
          {t("contributeBody")}
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TechCard padding="default" hover="border">
            <h3 className="text-tech-main-dark mb-1 text-sm font-semibold">
              {t("contributeArticles")}
            </h3>
            <p className="text-tech-main text-sm/relaxed">
              {t("contributeArticlesDescription")}
            </p>
          </TechCard>
          <TechCard padding="default" hover="border">
            <div className="flex items-start gap-3">
              <GithubIcon className="text-tech-main mt-0.5 size-4 shrink-0" />
              <div>
                <h3 className="text-tech-main-dark mb-1 text-sm font-semibold">
                  {t("contributeCode")}
                </h3>
                <p className="text-tech-main text-sm/relaxed">
                  {t("contributeCodeDescription")}
                </p>
              </div>
            </div>
          </TechCard>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href="https://github.com/gtmc-dev/gtmc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-tech-main hover:text-tech-main-dark inline-flex items-center gap-1.5 font-mono text-xs tracking-widest uppercase transition-colors">
            <GithubIcon className="size-3.5" />
            {t("linkGitHub")}
          </a>
          <a
            href="https://github.com/gtmc-dev/articles"
            target="_blank"
            rel="noopener noreferrer"
            className="text-tech-main hover:text-tech-main-dark inline-flex items-center gap-1.5 font-mono text-xs tracking-widest uppercase transition-colors">
            <GithubIcon className="size-3.5" />
            {t("linkArticlesRepo")}
          </a>
        </div>
      </section>

      <section className="mt-10">
        <SectionTitle>{t("licenseSectionTitle")}</SectionTitle>
        <div className="text-tech-main max-w-3xl space-y-2 text-sm/relaxed">
          <p>{t("licenseCode")}</p>
          <p>{t("licenseArticles")}</p>
        </div>
      </section>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <TechCard padding="compact">
      <p className="text-tech-main/60 mb-1 font-mono text-[0.625rem] tracking-[0.25em] uppercase">
        {label}
      </p>
      <p className="text-tech-main-dark text-lg font-semibold">{value}</p>
    </TechCard>
  )
}

function extractGithubHandle(github: string): string {
  if (github.startsWith("http")) {
    const parts = github.replace(/\/$/, "").split("/")
    return parts[parts.length - 1] || github
  }
  return github
}

function buildJsonLdScript(
  siteUrl: string,
  locale: string,
  title: string,
  description: string
) {
  return {
    __html: JSON.stringify(
      buildWebPageJsonLd(siteUrl, `/${locale}/about`, title, description)
    ),
  }
}
