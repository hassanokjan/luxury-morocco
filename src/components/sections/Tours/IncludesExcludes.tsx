import { Check, X } from "lucide-react";

import type { TourDetail } from "@/lib/wordpress/tours";
import type { Locale } from "@/i18n/routing";

type IncludesExcludesProps = {
  includes: TourDetail["includes"];
  excludes: TourDetail["excludes"];
  locale: Locale;
};

const CONTENT = {
  en: {
    label: "What's included",
    title: "Included in your journey",
    excludeLabel: "Not included",
    excludeTitle: "What to plan separately",
  },

  es: {
    label: "Qué está incluido",
    title: "Incluido en tu viaje",
    excludeLabel: "No incluido",
    excludeTitle: "Qué debes prever aparte",
  },
} satisfies Record<
  Locale,
  {
    label: string;
    title: string;
    excludeLabel: string;
    excludeTitle: string;
  }
>;

function parseList(html: string): string[] {
  if (!html?.trim()) {
    return [];
  }

  return Array.from(html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi))
    .map((match) => match[1]?.trim())
    .filter(Boolean);
}

export default function IncludesExcludes({
  includes,
  excludes,
  locale,
}: IncludesExcludesProps) {
  const includedItems = parseList(includes ?? "");

  const excludedItems = parseList(excludes ?? "");

  if (!includedItems.length && !excludedItems.length) {
    return null;
  }

  const t = CONTENT[locale];

  return (
    <section className="mt-6 lg:mt-10" aria-labelledby="tour-inclusions-heading">
      {/* SECTION HEADER */}
      <div className="mb-8 max-w-2xl">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
          {locale === "es" ? "Detalles del tour" : "Tour details"}
        </p>

        <h2
          id="tour-inclusions-heading"
          className="text-3xl font-semibold leading-tight tracking-tight text-heading sm:text-4xl"
        >
          {locale === "es"
            ? "Qué incluye tu experiencia"
            : "What's included in your experience"}
        </h2>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* INCLUDED */}
        <article
          className="
            relative overflow-hidden
            rounded-2xl border border-primary/15
            bg-card p-6
            shadow-sm
            sm:p-7
          "
        >
          {/* subtle accent */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 bg-primary"
          />

          <div className="mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
              {t.label}
            </span>

            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-heading">
              {t.title}
            </h3>
          </div>

          <ul className="space-y-4">
            {includedItems.map((item, index) => (
              <li
                key={`${index}-${item}`}
                className="
                    flex items-start gap-3
                    border-b border-border/70
                    pb-4
                    last:border-b-0
                    last:pb-0
                  "
              >
                <span
                  aria-hidden="true"
                  className="
                      mt-0.5 flex size-7 shrink-0
                      items-center justify-center
                      rounded-full
                      bg-primary/10
                      text-primary
                    "
                >
                  <Check className="size-4" />
                </span>

                <div
                  className="
                      min-w-0
                      text-[15px]
                      leading-7
                      text-text-secondary

                      [&_strong]:font-semibold
                      [&_strong]:text-heading
                    "
                  dangerouslySetInnerHTML={{
                    __html: item,
                  }}
                />
              </li>
            ))}
          </ul>
        </article>

        {/* EXCLUDED */}
        <article
          className="
            relative overflow-hidden
            rounded-2xl border border-border
            bg-muted/40 p-6
            shadow-sm
            sm:p-7
          "
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 bg-heading/20"
          />

          <div className="mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
              {t.excludeLabel}
            </span>

            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-heading">
              {t.excludeTitle}
            </h3>
          </div>

          <ul className="space-y-4">
            {excludedItems.map((item, index) => (
              <li
                key={`${index}-${item}`}
                className="
                    flex items-start gap-3
                    border-b border-border/70
                    pb-4
                    last:border-b-0
                    last:pb-0
                  "
              >
                <span
                  aria-hidden="true"
                  className="
                      mt-0.5 flex size-7 shrink-0
                      items-center justify-center
                      rounded-full
                      bg-heading/5
                      text-text-muted
                    "
                >
                  <X className="size-4" />
                </span>

                <div
                  className="
                      min-w-0
                      text-[15px]
                      leading-7
                      text-text-secondary

                      [&_strong]:font-semibold
                      [&_strong]:text-heading
                    "
                  dangerouslySetInnerHTML={{
                    __html: item,
                  }}
                />
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
