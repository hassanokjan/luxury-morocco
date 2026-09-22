import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowUpRight, MapPin } from "lucide-react";

import type { TourCard as TourCardType } from "@/lib/wordpress/tours";
import type { Locale } from "@/i18n/routing";

const LABELS = {
  en: {
    departure: "Departure",
    noImage: "No image available",
    private: "Private tour",
    viewDetails: "View details",
  },

  es: {
    departure: "Salida",
    noImage: "Imagen no disponible",
    private: "Tour privado",
    viewDetails: "Ver detalles",
  },
} satisfies Record<
  Locale,
  {
    departure: string;
    noImage: string;
    private: string;
    viewDetails: string;
  }
>;

export function TourCard({
  card,
  locale,
}: {
  card: TourCardType;
  locale: Locale;
}) {
  const t = LABELS[locale];

  return (
    <article className=" group relative flex h-full flex-col overflow-hidden rounded-[8px] border border-primary/30 bg-card shadow-sm transition-shadow duration-300 hover:shadow-md">
      <Link
        href={{
          pathname: "/tours/[slug]",
          params: {
            slug: card.slug,
          },
        }}
        locale={locale}
        className="
          flex h-full flex-col
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-primary
        "
      >
        {/* IMAGE */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {card.image ? (
            <Image
              src={card.image}
              alt={card.imageAlt || card.title}
              fill
              sizes="
                (min-width: 1280px) 380px,
                (min-width: 1024px) 33vw,
                (min-width: 640px) 50vw,
                100vw
              "
              className="
                object-cover
                transition-transform
                duration-700
                group-hover:scale-105
              "
            />
          ) : (
            <div className="flex h-full items-center justify-center px-4 text-center text-sm text-text-secondary">
              {t.noImage}
            </div>
          )}

          {/* léger gradient pour rendre le badge lisible */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />

          {/* PRIVATE TOUR */}
          <span
            className="
              absolute bottom-4 left-4
              rounded-full
              bg-white/95
              px-3 py-1.5
              text-[10px] font-bold
              uppercase tracking-[0.12em]
              text-heading
              shadow-sm backdrop-blur-sm
            "
          >
            {t.private}
          </span>
        </div>

        {/* CONTENT */}
        <div className="flex flex-1 flex-col px-5 pb-5 pt-4 sm:px-6">
          <h3
            className="
              line-clamp-2
              text-[22px] font-semibold
              leading-[1.15]
              tracking-[-0.02em]
              text-heading
              transition-colors
              group-hover:text-primary
            "
          >
            {card.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-text-secondary">
            {card.description}
          </p>

          {/* FOOTER */}
          <div className="mt-auto pt-5">
            <div className="flex items-end justify-between gap-4 pt-2">
              {/* DEPARTURE */}
              <div className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-text-secondary">
                  {t.departure}
                </span>

                <span className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-heading">
                  <MapPin
                    aria-hidden="true"
                    className="size-3.5 shrink-0 text-primary"
                  />

                  <span className="truncate">{card.departure}</span>
                </span>
              </div>

              {/* VIEW DETAILS */}
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-sm font-semibold group-hover:text-heading transition-colors text-primary">
                  {t.viewDetails}
                </span>

                <span
                  aria-hidden="true"
                  className="
                    flex size-9
                    items-center justify-center
                    rounded-full
                    border  group-hover:border-border
                    group-hover:bg-muted/60
                    group-hover:text-heading
                    transition-all duration-300
                    border-primary
                    bg-primary
                    text-primary-foreground
                  "
                >
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default TourCard;
