// src/components/sections/Home/HomeDayTrips.tsx

import { ArrowRight } from "lucide-react";

import { getLastDayTrips } from "@/lib/wordpress/day-trips";

import { Link, type Locale } from "@/i18n/routing";

import DayTripCard from "@/components/sections/DayTrips/DayTripCard";

type Props = {
  locale: Locale;
};

const CONTENT = {
  en: {
    eyebrow: "Private Day Trips",
    title: "Day Trips from Marrakech",
    description:
      "Step beyond Marrakech for a day and explore mountain valleys, historic villages, coastal towns and some of Morocco’s most memorable landscapes.",

    button: "View all day trips",
  },

  es: {
    eyebrow: "Excursiones privadas",
    title: "Excursiones desde Marrakech",
    description:
      "Sal de Marrakech por un día y conoce valles de montaña, pueblos históricos, ciudades costeras y algunos de los paisajes más memorables de Marruecos.",

    button: "Ver todas las excursiones",
  },
} as const;

export default async function HomeDayTrips({ locale }: Props) {
  const content = CONTENT[locale];

  const dayTrips = await getLastDayTrips(locale, 3);

  if (!dayTrips.length) {
    return null;
  }

  return (
    <section className="bg-background py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-4 flex flex-col gap-6 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              {content.eyebrow}
            </p>

            <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-[-0.03em] text-foreground sm:text-4xl lg:text-5xl">
              {content.title}
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              {content.description}
            </p>
          </div>

          {/* DESKTOP BUTTON */}
          <Link
            href="/day-trips"
            locale={locale}
            className="
    group hidden
    items-center gap-2
    rounded-full
    bg-primary
    px-5 py-3
    text-sm font-semibold
    text-white
    shadow-sm
    transition-all duration-300
    hover:-translate-y-0.5
    hover:bg-primary/90
    hover:shadow-md
    lg:inline-flex
  "
          >
            {content.button}

            <ArrowRight
              className="
      size-4
      transition-transform duration-300
      group-hover:translate-x-1
    "
            />
          </Link>
        </div>

        {/* CARDS */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dayTrips.map((trip) => (
            <DayTripCard key={trip.id} trip={trip} locale={locale} />
          ))}
        </div>

        {/* MOBILE BUTTON */}
        <div className="mt-8 flex justify-center lg:hidden">
          <Link
            href="/day-trips"
            locale={locale}
            className="
              group inline-flex
              items-center gap-2
              rounded-full
              bg-primary
              px-5 py-3
              text-sm font-semibold
              text-white
              transition-all duration-300
              hover:bg-primary/90
            "
          >
            {content.button}

            <ArrowRight
              className="
                size-4
                transition-transform duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
