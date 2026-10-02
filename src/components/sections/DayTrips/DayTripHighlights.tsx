// src/components/sections/DayTrips/DayTripHighlights.tsx

import type { Locale } from "@/i18n/routing";

type DayTripHighlightsProps = {
  highlights: string[];
  locale: Locale;
};

const CONTENT = {
  en: {
    eyebrow: "Highlights",
    title: "A day shaped by remarkable moments",
    description:
      "From the road through the Atlas to the atmosphere of the destination itself, these are the details that give the day its character.",
  },

  es: {
    eyebrow: "Momentos destacados",
    title: "Un día marcado por momentos memorables",
    description:
      "Desde la carretera por el Atlas hasta el ambiente del destino, estos son los detalles que dan personalidad a la jornada.",
  },
} as const;

export default function DayTripHighlights({
  highlights,
  locale,
}: DayTripHighlightsProps) {
  if (!highlights.length) {
    return null;
  }

  const content = CONTENT[locale];

  const [firstHighlight, ...otherHighlights] = highlights;

  return (
    <section className="mt-6" aria-labelledby="day-trip-highlights-title">
      {/* HEADER */}
      <div className="grid gap-3 pb-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
            {content.eyebrow}
          </p>

          <h2
            id="day-trip-highlights-title"
            className="mt-3 max-w-md text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-4xl"
          >
            {content.title}
          </h2>
        </div>

        <p className="max-w-xl text-[15px] leading-7 text-muted-foreground lg:justify-self-end">
          {content.description}
        </p>
      </div>

      {/* FEATURED HIGHLIGHT */}
      {firstHighlight && (
        <div className="relative overflow-hidden py-4 sm:py-6">
          <div className="grid items-center gap-6 sm:grid-cols-[110px_1fr] lg:grid-cols-[150px_1fr]">
            <div className="select-none text-[72px] font-semibold leading-none tracking-[-0.08em] text-primary/15 sm:text-[96px] lg:text-[120px]">
              01
            </div>

            <p className="max-w-3xl text-2xl font-medium leading-snug tracking-[-0.02em] text-foreground sm:text-3xl">
              {firstHighlight}
            </p>
          </div>

          <div
            aria-hidden="true"
            className="absolute right-0 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full border border-primary/10 sm:h-40 sm:w-40"
          />
        </div>
      )}

      {/* OTHER HIGHLIGHTS */}
      <div className="grid sm:grid-cols-2">
        {otherHighlights.map((highlight, index) => {
          const number = index + 2;

          return (
            <article
              key={`${highlight}-${index}`}
              className="
                group relative
                border-b border-border
                py-3
                sm:px-6
                sm:py-6
                sm:odd:pl-0
                sm:even:pr-0
              "
            >
              <div className="flex items-start gap-5">
                {/* NUMBER */}
                <span className="min-w-8 text-sm font-semibold tabular-nums text-primary">
                  {String(number).padStart(2, "0")}
                </span>

                {/* TEXT */}
                <div className="relative flex-1">
                  <p className="pr-4 text-[17px] font-medium leading-7 text-foreground sm:text-[18px]">
                    {highlight}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
