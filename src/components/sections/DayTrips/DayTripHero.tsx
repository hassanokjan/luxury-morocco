// src/components/sections/DayTrips/DayTripHero.tsx

import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Link, type Locale } from "@/i18n/routing";
import type { DayTripDetail } from "@/lib/wordpress/day-trips";

type DayTripHeroProps = {
  dayTrip: DayTripDetail;
  locale: Locale;
};

export default function DayTripHero({ dayTrip, locale }: DayTripHeroProps) {

  return (
    <section
      aria-labelledby="day-trip-title"
      className="relative isolate flex min-h-[430px] w-full items-end overflow-hidden bg-secondary lg:min-h-[530px]"
    >
      <Image
        src={dayTrip.image || "/images/hero.jpg"}
        alt={dayTrip.imageAlt || dayTrip.title || "Morocco day trip"}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* IMAGE OVERLAY */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-black/10"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        {/* BREADCRUMB */}
        <nav
          aria-label={locale === "es" ? "Ruta de navegación" : "Breadcrumb"}
          className="mb-8 text-xs text-white/75"
        >
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <li>
              <Link
                href="/"
                locale={locale}
                className="transition-colors hover:text-white"
              >
                {locale === "es" ? "Inicio" : "Home"}
              </Link>
            </li>

            <li aria-hidden="true" className="text-white/40">
              /
            </li>

            <li>
              <Link
                href="/day-trips"
                locale={locale}
                className="transition-colors hover:text-white"
              >
                {locale === "es" ? "Excursiones" : "Day Trips"}
              </Link>
            </li>

            <li aria-hidden="true" className="text-white/40">
              /
            </li>

            <li
              aria-current="page"
              className="max-w-[260px] truncate font-medium text-white sm:max-w-md"
            >
              {dayTrip.title}
            </li>
          </ol>
        </nav>

        {/* CONTENT */}
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
          {/* LEFT */}
          <div>
            {/* SMALL LABEL */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                {locale === "es" ? "Excursión privada" : "Private Day Trip"}
              </span>
            </div>

            {/* TITLE */}
            <h1
              id="day-trip-title"
              className="max-w-4xl text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {dayTrip.title}
            </h1>

            {/* DESCRIPTION */}
            {dayTrip.description && (
              <p className="mt-4 max-w-3xl text-[16px] leading-7 text-white/85 sm:text-[17px] sm:leading-8">
                {dayTrip.description}
              </p>
            )}

            {/* FROM MARRAKECH */}
            <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-5 pt-6">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">
                  {locale === "es" ? "Salida" : "Departure"}
                </dt>

                <dd className="mt-2 flex items-center gap-2 text-base font-medium text-white">
                  <MapPin className="size-4 text-primary" />

                  {locale === "es" ? "Desde Marrakech" : "From Marrakech"}
                </dd>
              </div>
            </dl>
          </div>

          {/* CTA */}
          <div className="flex justify-start lg:justify-end">
            <Link
              href="/contact"
              locale={locale}
              className="
            group inline-flex min-h-16
            items-center gap-5
            rounded-full
            border border-white/10
            bg-primary
            py-2 pl-6 pr-2
            text-primary-foreground
            shadow-[0_12px_30px_rgba(0,0,0,0.18)]
            transition-all duration-300
            hover:-translate-y-0.5
            hover:bg-primary/90
            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-white
          "
            >
              <span className="flex flex-col text-left">
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
                  {locale === "es" ? "Excursión privada" : "Private day trip"}
                </span>

                <span className="mt-0.5 text-sm font-semibold tracking-[-0.01em] text-primary-foreground sm:text-[15px]">
                  {locale === "es"
                    ? "Solicitar presupuesto gratis"
                    : "Get a free quote"}
                </span>
              </span>

              <span
                aria-hidden="true"
                className="
              flex size-11 shrink-0
              items-center justify-center
              rounded-full
              bg-white/15
              text-primary-foreground
              ring-1 ring-inset ring-white/15
              transition-all duration-300
              group-hover:rotate-3
              group-hover:bg-white/20
            "
              >
                <ArrowUpRight
                  className="
                size-[18px]
                transition-transform duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
                />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
