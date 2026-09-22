import type { Locale } from "@/lib/wordpress/tours";

const TITLES = {
  en: "Tour highlights",
  es: "Lo más destacado del circuito",
} satisfies Record<Locale, string>;

type HighlitsProps = {
  highlights: string[] | null;
  locale: Locale;
};

export default function Highlits({ highlights, locale }: HighlitsProps) {
  if (!highlights?.length) return null;

  return (
    <section className="mt-6 lg:mt-10" aria-labelledby="tour-highlights-heading">
      <div className="mb-8 max-w-2xl">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
          {locale === "es" ? "Experiencia del viaje" : "Journey experience"}
        </p>

        <h2
          id="tour-highlights-heading"
          className="text-3xl font-semibold leading-tight tracking-tight text-heading sm:text-4xl"
        >
          {TITLES[locale]}
        </h2>
      </div>

      <ul className="grid grid-cols-1 gap-x-10 gap-y-0 lg:grid-cols-2">
        {highlights.map((highlight, index) => (
          <li
            key={`${index}-${highlight}`}
            className="
              group flex items-start gap-4
              border-b border-border
              py-5
            "
          >
            {/* NUMBER */}
            <span
              aria-hidden="true"
              className="
                mt-0.5 flex size-9 shrink-0 items-center justify-center
                rounded-full border border-primary/20
                bg-primary/5
                text-[11px] font-semibold
                text-primary
                transition-colors duration-300
                group-hover:border-primary/40
                group-hover:bg-primary
                group-hover:text-primary-foreground
              "
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* TEXT */}
            <div className="flex min-w-0 flex-1 items-start justify-between gap-4">
              <span className="text-[16px] font-medium leading-7 text-heading sm:text-[17px]">
                {highlight}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
