"use client"

import * as React from "react"
import { useTranslations } from "next-intl"

import { SegmentedControl } from "@/components/ui/segmented-control"

export type GlossaryDensity = "compact" | "normal" | "comfortable"

const STORAGE_KEY = "gtmc:glossary:density:v1"
const DENSITY_VALUES: readonly GlossaryDensity[] = [
  "compact",
  "normal",
  "comfortable",
]

export interface DensityToggleProps {
  value: GlossaryDensity
  onChange: (density: GlossaryDensity) => void
  className?: string
}

function isDensity(value: unknown): value is GlossaryDensity {
  return (
    typeof value === "string" &&
    (DENSITY_VALUES as readonly string[]).includes(value)
  )
}

export function DensityToggle({
  value,
  onChange,
  className,
}: DensityToggleProps) {
  const t = useTranslations("Glossary")

  const hydratedRef = React.useRef(false)
  React.useEffect(() => {
    if (hydratedRef.current) return
    hydratedRef.current = true
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (isDensity(raw) && raw !== value) {
        onChange(raw)
      }
    } catch {
      // SSR / private browsing — localStorage unavailable, use defaults
    }
  }, [onChange, value])

  const handleChange = React.useCallback(
    (next: GlossaryDensity) => {
      onChange(next)
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // SSR / private browsing
      }
    },
    [onChange]
  )

  const options = React.useMemo(
    () =>
      [
        { value: "compact" as const, label: t("densityCompact") },
        { value: "normal" as const, label: t("densityNormal") },
        { value: "comfortable" as const, label: t("densityComfortable") },
      ] as const,
    [t]
  )

  return (
    <SegmentedControl
      options={options}
      value={value}
      onValueChange={handleChange}
      controlRole="radiogroup"
      ariaLabel={t("densityNormal")}
      size="sm"
      className={className}
    />
  )
}
