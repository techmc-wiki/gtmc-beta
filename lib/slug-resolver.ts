import {
  ArticleManifest,
  MANIFEST_FILE_NAME,
  MANIFEST_PATH,
  type ArticleEntry,
} from "./article-manifest"

export { ArticleManifest, MANIFEST_FILE_NAME, MANIFEST_PATH }
export type { ArticleEntry }

const filePathToSlugKey: Record<string, string> = (() => {
  const inverted: Record<string, string> = {}
  for (const [slugKey, entry] of Object.entries(ArticleManifest)) {
    if (entry?.filePath) {
      inverted[entry.filePath.replace(/\.md$/i, "")] = slugKey
    }
  }
  return inverted
})()

export interface ResolveResult {
  filePath: string | null
}

/**
 * Resolves a slug path to its corresponding file path.
 * @param slugPath - The slug path to resolve (e.g., "tree-farm/basics")
 * @returns The file path if found, null otherwise
 */
export function resolveSlug(slugPath: string): string | null {
  const result = resolveSlugWithIndicator(slugPath)
  return result.filePath
}

/**
 * Resolves a slug path with indicator for raw file path fallback.
 */
export function resolveSlugWithIndicator(slugPath: string): ResolveResult {
  // 1. Direct slug lookup
  if (ArticleManifest[slugPath] !== undefined) {
    return { filePath: ArticleManifest[slugPath].filePath }
  }

  // 2. Try with .md extension in article manifest
  if (ArticleManifest[`${slugPath}.md`] !== undefined) {
    return {
      filePath: ArticleManifest[`${slugPath}.md`].filePath,
    }
  }

  return { filePath: null }
}

/**
 * Gets the slug for a given file path if it exists in the article manifest.
 */
export function getSlugForFilePath(filePath: string): string | null {
  return filePathToSlugKey[filePath.replace(/\.md$/i, "")] ?? null
}

/**
 * Gets the article manifest entry for a given slug path.
 */
export function getArticleEntry(slugPath: string): ArticleEntry | null {
  return ArticleManifest[slugPath] ?? null
}

export function encodeSlug(slug: string): string {
  return slug.split("/").map(encodeURIComponent).join("/")
}

export function decodeSlugPath(segments: string[]): string {
  return segments.map(decodeURIComponent).join("/")
}

export function getSlugTail(slug: string): string {
  return slug.split("/").pop() ?? slug
}

/**
 * Slug validation regex and utility function.
 *
 * Valid slug format:
 * - Lowercase letters and numbers only
 * - Hyphens allowed between segments (not at start/end)
 * - Examples: "tree-farm", "basics", "advanced-techniques", "01-introduction"
 */

export const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/**
 * Validates if a string is a valid slug.
 * @param slug - The string to validate
 * @returns true if valid slug format, false otherwise
 */
export function validateSlug(slug: string): boolean {
  return SLUG_REGEX.test(slug)
}
