import { getDayTripsByIds } from "@/lib/wordpress/day-trips";

import type { Locale } from "@/i18n/routing";

import DayTripCard from "./DayTripCard";

type Props = {
  ids: number[];
  locale: Locale;
  currentId?: number;
};

const CONTENT = {
  en: {
    eyebrow: "Continue exploring",
    title: "Other day trips from Marrakech",
    description:
      "More private excursions you may want to add to your time in Marrakech.",
  },

  es: {
    eyebrow: "Sigue explorando",
    title: "Otras excursiones desde Marrakech",
    description:
      "Más excursiones privadas que puedes añadir a tu estancia en Marrakech.",
  },
} as const;

export default async function RelatedDayTrips({
  ids,
  locale,
  currentId,
}: Props) {
  /*
   * Sécurité :
   * - retire le trip actuel
   * - retire les doublons
   * - maximum 3 cartes
   */
  const cleanIds = [
    ...new Set(ids.filter((id) => id > 0 && id !== currentId)),
  ].slice(0, 3);

  if (!cleanIds.length) {
    return null;
  }

  const trips = await getDayTripsByIds(locale, cleanIds);

  if (!trips.length) {
    return null;
  }

  const content = CONTENT[locale];

  return (
    <section
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      aria-labelledby="related-day-trips-title"
    >
      {/* HEADER */}
      <div className="mb-8 grid gap-5 pb-7 lg:grid-cols-[1fr_0.7fr] lg:items-end">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
            {content.eyebrow}
          </p>

          <h2
            id="related-day-trips-title"
            className="mt-2 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] text-foreground sm:text-4xl"
          >
            {content.title}
          </h2>
        </div>

        <p className="max-w-md text-sm leading-6 text-muted-foreground lg:justify-self-end">
          {content.description}
        </p>
      </div>

      {/* CARDS */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip) => (
          <DayTripCard key={trip.id} trip={trip} locale={locale} />
        ))}
      </div>
    </section>
  );
}
