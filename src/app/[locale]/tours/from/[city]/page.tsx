import { getTourCardsByDeparture } from "@/lib/wordpress/tours";
import { TourCard } from "@/components/sections/Tours/TourCard";
import type { Locale } from "@/i18n/routing";
import {notFound} from "next/navigation";
import Tripadvisor from "@/components/ui/Tripadvisor";
import InstagramSection from "@/components/ui/Instgramme";

type PageProps = {
  params: Promise<{
    locale: Locale;
    city: string;
  }>;
};


const CONTENT = {
  en: {
    title: (city: string) => (
      <>
        Tours from{" "}
        <span className="text-primary">{city}</span>
      </>
    ),
    description: (city: string) =>
      `Browse our private tours from ${city}, with routes across Morocco including desert journeys, cultural stops, mountain landscapes and multi-day trips.`,
    empty: "No tours are available from this city yet.",
  },

  es: {
    title: (city: string) => (
      <>
        Tours desde{" "}
        <span className="text-primary">{city}</span>
      </>
    ),
    description: (city: string) =>
      `Consulta nuestros tours privados desde ${city}, con rutas por Marruecos que incluyen el desierto, ciudades históricas, montañas y viajes de varios días.`,
    empty: "Todavía no hay tours disponibles desde esta ciudad.",
  },
};


function formatCity(slug: string): string {
  return slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}


export default async function Page({ params }: PageProps) {
  const { locale, city } = await params;
  const tours = await getTourCardsByDeparture(locale, city);
  
  if(!tours){
    notFound();
  }


  const cityName = tours[0]?.departure || formatCity(city);
  const content = CONTENT[locale];

  return (
    <div className="bg-background">
      {/* INTRODUCTION */}
      <section
        aria-labelledby="tours-heading"
        className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">
            Luxury Morocco Tours
          </p>

          <h1
            id="tours-heading"
            className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-heading sm:text-5xl lg:text-6xl"
          >
            {content.title(cityName)}
          </h1>

          <p className="mt-4 text-[15px] leading-8 text-text-secondary sm:text-base">
            {content.description(cityName)}
          </p>
        </div>
      </section>

      {/* TOURS */}
      <section
        aria-labelledby="available-tours-heading"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8"
      >
        <h2 id="available-tours-heading" className="sr-only">
          {locale === "es"
            ? `Tours disponibles desde ${cityName}`
            : `Available tours from ${cityName}`}
        </h2>

        {tours.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((card) => (
              <TourCard key={card.id} card={card} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-text-secondary">{content.empty}</p>
          </div>
        )}
      </section>

      {/* TRIPADVISOR */}
      <section className=" py-6">
        <Tripadvisor locale={locale} />
      </section>

      {/* INSTAGRAM */}
      <section className="py-6">
        <InstagramSection />
      </section>
    </div>
  );
}
