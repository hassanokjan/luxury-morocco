import { getLuxuryTourCards } from "@/lib/wordpress/tours";
import TourCard from "@/components/sections/Tours/TourCard";
import type { Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

const CONTENT = {
  en: {
    label: "Private journeys across Morocco",
    title: "Luxury Morocco Tours",
    description:
      "Cross the Atlas Mountains, travel between Morocco’s historic cities and spend time beside the Sahara dunes. These private journeys bring together some of the country’s most rewarding routes, landscapes and local experiences.",
    empty: "No luxury tours are available yet.",
  },

  es: {
    label: "Viajes privados por Marruecos",
    title: "Tours de lujo por Marruecos",
    description:
      "Cruza las montañas del Atlas, viaja entre las ciudades históricas de Marruecos y pasa tiempo junto a las dunas del Sahara. Estos viajes privados reúnen algunas de las rutas, paisajes y experiencias locales más interesantes del país.",
    empty: "Todavía no hay tours de lujo disponibles.",
  },
} satisfies Record<
  Locale,
  {
    label: string;
    title: string;
    description: string;
    empty: string;
  }
>;

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  const tours = await getLuxuryTourCards(locale, 100);

  const content = CONTENT[locale];

  return (
    <div className="bg-background">
      {/* INTRO */}
      <section
        aria-labelledby="luxury-tours-heading"
        className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-14 sm:pt-12 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">
            {content.label}
          </p>

          <h1
            id="luxury-tours-heading"
            className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-heading sm:text-5xl lg:text-6xl"
          >
            {content.title}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-8 text-text-secondary sm:text-base">
            {content.description}
          </p>
        </div>
      </section>

      {/* TOURS */}
      <section
        aria-labelledby="luxury-tours-list"
        className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
      >
        <h2 id="luxury-tours-list" className="sr-only">
          {content.title}
        </h2>

        {tours.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((card) => (
              <TourCard key={card.id} card={card} locale={locale} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-text-secondary">
            {content.empty}
          </p>
        )}
      </section>
    </div>
  );
}
