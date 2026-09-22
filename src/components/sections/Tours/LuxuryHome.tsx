import { getLuxuryTourCards } from "@/lib/wordpress/tours";
import TourCard from "@/components/sections/Tours/TourCard";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";

type LuxuryHomeProps = {
  locale: Locale;
};

const CONTENT = {
  en: {
    title: "Luxury Morocco Tours",
    description:
      "Cross the High Atlas, spend a night beside the Sahara dunes, walk through historic medinas and experience Morocco through private journeys shaped around real places and local moments.",
    link: "View all luxury tours",
  },

  es: {
    title: "Tours de lujo por Marruecos",
    description:
      "Cruza el Alto Atlas, pasa una noche junto a las dunas del Sahara, recorre antiguas medinas y vive Marruecos a través de viajes privados centrados en lugares auténticos y momentos locales.",
    link: "Ver todos los tours de lujo",
  },
};

export default async function LuxuryHome({ locale }: LuxuryHomeProps) {
  const tours = await getLuxuryTourCards(locale, 6);

  if (!tours.length) {
    return null;
  }

  const t = CONTENT[locale];

  return (
    <section
      className="bg-background pb-8"
      aria-labelledby="luxury-tours-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2
              id="luxury-tours-heading"
              className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl"
            >
              {t.title}
            </h2>

            <p className="mt-4 max-w-xl text-[15px] leading-7 text-text-secondary sm:text-base">
              {t.description}
            </p>
          </div>

          <Link
            href="/tours"
            locale={locale}
            className="
              group inline-flex w-fit items-center gap-2
              text-sm font-semibold text-heading
              transition-colors hover:text-primary
            "
          >
            {t.link}

            <span
              aria-hidden="true"
              className="
                flex size-9 items-center justify-center
                rounded-full border border-border
                bg-card
                transition-all duration-300
                group-hover:border-primary
                group-hover:bg-primary
                group-hover:text-primary-foreground
              "
            >
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
        </div>

        {/* TOURS */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((card) => (
            <TourCard key={card.id} card={card} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
