export type GlossaryLocale =
  | "ar"
  | "zh"
  | "fr"
  | "de"
  | "it"
  | "ja"
  | "ko"
  | "pt"
  | "ru"
  | "es"

export interface GlossaryTranslation {
  value: string
  description: string
}

export interface GlossaryEntry {
  slug: string
  fullFormEn: string
  shortForm: string
  category: string
  regex: string
  /** English description with trailing `*` stripped. */
  description: string
  /** "Related" column value as-is from the CSV (space-separated terms). */
  related: string
  /** True when the original Description field ended with `*`. */
  isControversial: boolean
  /** Per-locale translations; only locales with a non-empty term value are included. */
  translations: Partial<Record<GlossaryLocale, GlossaryTranslation>>
}

/** Reduced entry for fast client-side search — omits description, regex, related, isControversial, and translations. */
export interface GlossarySummaryEntry {
  slug: string
  fullFormEn: string
  shortForm: string
  category: string
}
