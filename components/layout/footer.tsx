import { getLocale, getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { Logo } from "@/components/ui/logo"
import { CornerBrackets } from "@/components/ui/corner-brackets"
import { TechBadge } from "@/components/ui/status-badge"
import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { articleUrl } from "@/lib/articles/url"
import { getManifestStats, type ArticleLocale } from "@/lib/articles/manifest"

export default async function Footer() {
  const locale = (await getLocale()) as ArticleLocale
  const t = await getTranslations({ locale, namespace: "Footer" })
  const stats = getManifestStats(locale)
  const buildSha = process.env.NEXT_PUBLIC_BUILD_SHA ?? "unknown"
  const startYear = 2024
  const currentYear = new Date().getFullYear()
  const lastRevision = stats.lastRevision
    ? new Date(stats.lastRevision).toISOString().slice(0, 10)
    : "—"

  return (
    <footer className="border-tech-line bg-tech-bg/80 relative mt-auto w-full border-t pt-10 pb-12 backdrop-blur-md">
      <div className="container-safe mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top status strip */}
        <div className="text-tech-main/55 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[0.625rem] tracking-[0.18em] uppercase">
          <span className="inline-flex items-center gap-2">
            <span className="bg-tech-main/60 inline-block size-1.5 animate-pulse" />
            SYS.ONLINE
          </span>
          <span>|</span>
          <span>LAST REVISION: {lastRevision}</span>
          <span>|</span>
          <span>BUILD {buildSha}</span>
        </div>

        {/* Corner brackets */}
        <div className="relative mt-6">
          <CornerBrackets
            variant="static"
            size="size-2"
            color="border-tech-main/40"
            corners="all"
          />

          {/* Main grid — brand column + title-block grid */}
          <div className="md:grid md:grid-cols-12 md:gap-10">
            {/* Brand column */}
            <div className="mb-8 md:col-span-4 md:mb-0">
              <Logo size="md" />
              <p className="text-tech-main-dark mt-4 font-mono text-sm tracking-wider uppercase">
                Graduate Texts in Minecraft
              </p>
              <p className="text-tech-main mt-2 max-w-xs text-sm/relaxed">
                {t("tagline")}
              </p>
            </div>

            {/* Title-block grid */}
            <div className="md:col-span-8">
              <div className="bg-tech-main/15 grid grid-cols-2 gap-px md:grid-cols-4">
                {[
                  { label: "ARTICLES", value: stats.articleCount },
                  { label: "AUTHORS", value: stats.authorCount },
                  { label: "EDITION", value: `${startYear}–${currentYear}` },
                  {
                    label: "STATUS",
                    value: (
                      <TechBadge className="border-amber-500/40 bg-amber-500/10 text-amber-700">
                        [ BETA ]
                      </TechBadge>
                    ),
                  },
                  {
                    label: "CONTENT LICENSE",
                    value: (
                      <a
                        href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-tech-main-dark text-xs transition-colors">
                        CC BY-NC-SA 4.0
                      </a>
                    ),
                  },
                  {
                    label: "CODE LICENSE",
                    value: (
                      <a
                        href="https://github.com/gtmc-dev/gtmc-web/blob/main/LICENSE"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-tech-main-dark text-xs transition-colors">
                        Apache-2.0
                      </a>
                    ),
                  },
                  {
                    label: "REVISION",
                    value: <code className="font-mono text-xs">{buildSha}</code>,
                  },
                  {
                    label: "LAST UPDATE",
                    value: <span className="text-xs">{lastRevision}</span>,
                  },
                ].map((cell) => (
                  <div
                    key={cell.label}
                    className="bg-tech-main/[0.03] border-tech-main/10 border px-3 py-3 font-mono">
                    <div className="text-tech-main/50 mb-1 text-[0.625rem] tracking-[0.12em] uppercase">
                      {cell.label}
                    </div>
                    <div className="text-tech-main-dark text-sm">
                      {cell.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Link grid */}
          <hr className="border-tech-main/15 my-8" />
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <h3 className="section-label">READ</h3>
              <ul className="mt-3 flex flex-col gap-2">
                <li>
                  <Link
                    href={articleUrl("Preface")}
                    className="text-tech-main hover:text-tech-main-dark text-sm transition-colors">
                    {t("linkPreface")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/articles"
                    className="text-tech-main hover:text-tech-main-dark text-sm transition-colors">
                    {t("linkArticles")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="section-label">COMMUNITY</h3>
              <ul className="mt-3 flex flex-col gap-2">
                <li>
                  <a
                    href="https://github.com/gtmc-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-tech-main hover:text-tech-main-dark text-sm transition-colors">
                    {t("linkTeam")}
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/gtmc-dev/gtmc-web/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-tech-main hover:text-tech-main-dark text-sm transition-colors">
                    {t("linkIssues")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="section-label">CODE</h3>
              <ul className="mt-3 flex flex-col gap-2">
                <li>
                  <a
                    href="https://github.com/gtmc-dev/gtmc-web"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-tech-main hover:text-tech-main-dark text-sm transition-colors">
                    {t("linkRepository")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="section-label">FORMAT</h3>
              <ul className="mt-3 flex flex-col gap-2">
                <li>
                  <Link
                    href="/pdf"
                    className="text-tech-main hover:text-tech-main-dark text-sm transition-colors">
                    {t("offlinePdf")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Colophon */}
          <hr className="border-tech-main/15 my-8" />
          <div className="gap-6 md:flex md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-tech-main/70 text-xs/relaxed">
                {t("disclaimer")}
              </p>
              <p className="text-tech-main/55 mt-2 text-xs/relaxed">
                {t("attribution")}
              </p>
            </div>
            <div className="mt-6 md:mt-0 md:text-right">
              <p className="text-tech-main/70 text-xs">
                {t("copyright", { start: startYear, year: currentYear })}
              </p>
              <LanguageSwitcher className="mt-3" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
