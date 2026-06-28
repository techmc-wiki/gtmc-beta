import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs"
import { join } from "node:path"
import { load as yamlLoad } from "js-yaml"

const CONFIG_DIR = join(process.cwd(), "lib", "articles", "config")
const PEOPLE_PATH = join(CONFIG_DIR, "people.yml")
const ALIASES_PATH = join(CONFIG_DIR, "authors-alias.yml")
const ALIAS_OVERRIDES_PATH = join(CONFIG_DIR, "author-alias-overrides.yml")
const OUTPUT_PATH = join(CONFIG_DIR, "author-profiles.json")

type AliasMap = Record<string, string[]>

function loadYaml<T>(filePath: string): T | null {
  if (!existsSync(filePath)) return null
  return yamlLoad(readFileSync(filePath, "utf-8")) as T
}

function buildAliasResolver(
  auto: AliasMap | null,
  overrides: AliasMap | null
): Map<string, string> {
  const map = new Map<string, string>()
  const merge = (entries: AliasMap): void => {
    for (const [canonical, aliases] of Object.entries(entries)) {
      map.set(canonical, canonical)
      for (const alias of aliases) {
        map.set(alias, canonical)
      }
    }
  }
  if (auto) merge(auto)
  if (overrides) merge(overrides)
  return map
}

function main(): void {
  const people = loadYaml<Record<string, unknown>>(PEOPLE_PATH)
  if (!people || typeof people !== "object" || Array.isArray(people)) {
    process.stderr.write(`Error: could not parse ${PEOPLE_PATH}\n`)
    process.exit(1)
  }

  const autoAliases = loadYaml<AliasMap>(ALIASES_PATH)
  const overrideAliases = loadYaml<AliasMap>(ALIAS_OVERRIDES_PATH)
  const resolver = buildAliasResolver(autoAliases, overrideAliases)

  const profileMap: Record<string, string> = {}
  for (const peopleKey of Object.keys(people)) {
    profileMap[peopleKey] = resolver.get(peopleKey) ?? peopleKey
  }

  const outputDir = join(OUTPUT_PATH, "..")
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
  }

  const sorted: Record<string, string> = {}
  for (const key of Object.keys(profileMap).toSorted()) {
    sorted[key] = profileMap[key]
  }

  writeFileSync(OUTPUT_PATH, JSON.stringify(sorted, null, 2) + "\n")
  process.stdout.write(
    `Generated author-profiles.json with ${Object.keys(sorted).length} entries\n`
  )
}

main()
