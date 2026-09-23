import TourCard from "@/components/sections/Tours/TourCard";
import type { TourCard as TourCardType } from "@/lib/wordpress/tours";
import type { Locale } from "@/i18n/routing";

type RelatedToursProps = {
  tours: TourCardType[];
  locale: Locale;
};

const CONTENT = {
  en: {
    label: "You may also like",
    title: "Related Morocco Tours",
    description:
      "Continue exploring Morocco with a few journeys that connect naturally with this route.",
  },

  es: {
    label: "También te puede interesar",
    title: "Tours relacionados por Marruecos",
    description:
      "Sigue explorando Marruecos con algunos viajes que combinan naturalmente con esta ruta.",
  },
} satisfies Record<
  Locale,
  {
    label: string;
    title: string;
    description: string;
  }
>;

export default function RelatedTours({ tours, locale }: RelatedToursProps) {
  if (!tours.length) {
    return null;
  }

  const content = CONTENT[locale];

  return (
    <section
      className=" pt-14"
      aria-labelledby="related-tours-heading"
    >
      <div className="mb-8 max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          {content.label}
        </p>

        <h2
          id="related-tours-heading"
          className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-heading sm:text-4xl"
        >
          {content.title}
        </h2>

        <p className="mt-3 text-[15px] leading-7 text-text-secondary sm:text-base">
          {content.description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((card) => (
          <TourCard key={card.id} card={card} locale={locale} />
        ))}
      </div>
    </section>
  );
}
