import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";

import { Link, type Locale } from "@/i18n/routing";
import type { DayTripCard as DayTripCardType } from "@/lib/wordpress/day-trips";

type Props = {
  trip: DayTripCardType;
  locale: Locale;
};

const CONTENT = {
  en: {
    from: "From Marrakech",
    label: "Private Day Trip",
    button: "View day trip",
  },

  es: {
    from: "Desde Marrakech",
    label: "Excursión privada",
    button: "Ver excursión",
  },
} as const;

export default function DayTripCard({ trip, locale }: Props) {
  const content = CONTENT[locale];

  const href = {
    pathname: "/day-trips/[slug]" as const,
    params: {
      slug: trip.slug,
    },
  };

  return (
    <article className="group relative overflow-hidden rounded-[10px] border border-black/5 bg-white">
      {/* IMAGE */}
      <Link
        href={href}
        locale={locale}
        className="relative block aspect-[4/3] overflow-hidden bg-muted"
      >
        <Image
          src={trip.image || "/images/hero.jpg"}
          alt={trip.imageAlt || trip.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-md">
          <MapPin className="size-3.5" />
          {content.from}
        </div>

        <p className="absolute bottom-4 left-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85">
          {content.label}
        </p>
      </Link>

      {/* CONTENT */}
      <div className="p-5">
        <h3 className="text-[20px] font-semibold leading-[1.25] tracking-[-0.02em] text-foreground transition-colors duration-300 group-hover:text-primary">
          <Link href={href} locale={locale}>
            {trip.title}
          </Link>
        </h3>

        {trip.description && (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-foreground/65">
            {trip.description}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {content.from}
          </span>

          <Link
            href={href}
            locale={locale}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 hover:gap-3"
            aria-label={`${content.button}: ${trip.title}`}
          >
            {content.button}
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
