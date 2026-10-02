import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";

import { getAllDayTripCards } from "@/lib/wordpress/day-trips";

import { Link, type Locale } from "@/i18n/routing";
import Tripadvisor from "@/components/ui/Tripadvisor";
import InstagramSection from "@/components/ui/Instgramme";

type PageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

const CONTENT = {
  en: {
    eyebrow: "Private Day Trips",
    title: "Day Trips from Marrakech",
    description:
      "Leave Marrakech for a day and explore some of Morocco’s most remarkable landscapes, historic towns and mountain valleys. Our private day trips offer comfortable transport, flexible stops and time to enjoy each destination at your own pace.",

    from: "From Marrakech",
    viewTrip: "View day trip",
    empty: "No day trips available yet.",
  },

  es: {
    eyebrow: "Excursiones privadas",
    title: "Excursiones desde Marrakech",
    description:
      "Sal de Marrakech por un día para conocer algunos de los paisajes, pueblos históricos y valles de montaña más interesantes de Marruecos. Nuestras excursiones privadas ofrecen transporte cómodo, paradas flexibles y tiempo para disfrutar de cada destino a tu ritmo.",

    from: "Desde Marrakech",
    viewTrip: "Ver excursión",
    empty: "Todavía no hay excursiones disponibles.",
  },
} as const;

export default async function DayTripsPage({ params }: PageProps) {
  const { locale } = await params;

  const content = CONTENT[locale];

  const dayTrips = await getAllDayTripCards(locale);

  return (
    <section className="bg-background">
      {/* HERO */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {content.eyebrow}
          </p>

          <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {content.title}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            {content.description}
          </p>
        </div>
      </section>

      {/* DAY TRIPS */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* CARDS */}
        {dayTrips.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dayTrips.map((trip) => (
              <article
                key={trip.id}
                className=" group relative overflow-hidden rounded-[12px] border border-black/5 bg-white"
              >
                {/* IMAGE */}
                <Link
                  href={{
                    pathname: "/day-trips/[slug]",
                    params: {
                      slug: trip.slug,
                    },
                  }}
                  locale={locale}
                  className="relative block aspect-[4/3] overflow-hidden bg-muted"
                >
                  <Image
                    src={trip.image || "/images/hero.jpg"}
                    alt={trip.imageAlt || trip.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />

                  {/* BADGE */}
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/20 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
                    <MapPin className="size-3.5" />
                    <span>{content.from}</span>
                  </div>

                  {/* SMALL BOTTOM LABEL */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">
                      {locale === "es"
                        ? "Excursión privada"
                        : "Private Day Trip"}
                    </p>
                  </div>
                </Link>

                {/* CONTENT */}
                <div className="relative p-5 sm:p-6">
                  {/* TITLE */}
                  <h3 className="text-[20px] font-semibold leading-[1.25] tracking-[-0.02em] text-foreground transition-colors duration-300 group-hover:text-primary sm:text-[21px]">
                    <Link
                      href={{
                        pathname: "/day-trips/[slug]",
                        params: {
                          slug: trip.slug,
                        },
                      }}
                      locale={locale}
                    >
                      {trip.title}
                    </Link>
                  </h3>

                  {/* DESCRIPTION */}
                  {trip.description && (
                    <p className="mt-3 line-clamp-3 text-[15px] leading-6 text-foreground/70">
                      {trip.description}
                    </p>
                  )}

                  {/* FOOTER */}
                  <div className="flex items-center justify-between pt-5 gap-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4 text-primary" />

                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/65">
                        {locale === "es" ? "Desde Marrakech" : "From Marrakech"}
                      </span>
                    </div>

                    <Link
                      href={{
                        pathname: "/day-trips/[slug]",
                        params: {
                          slug: trip.slug,
                        },
                      }}
                      locale={locale}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
                      aria-label={`${content.viewTrip}: ${trip.title}`}
                    >
                      <span>{content.viewTrip}</span>
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border px-5 py-10 text-center text-sm text-muted-foreground">
            {content.empty}
          </div>
        )}
      </section>
      <section className="pb-12">
        <Tripadvisor locale={locale} />
        <InstagramSection />
      </section>
    </section>
  );
}
