import type { Locale } from "@/lib/wordpress/tours";

const TITLES = {
  en: "Your route on the map",
  es: "Tu itinerario en el mapa",
} satisfies Record<Locale, string>;

type MapProps = {
  tour: string | null;
  locale: Locale;
};

export default function Map({ tour, locale }: MapProps) {

    if(!tour){
        return null;
    }

  const title = TITLES[locale];

  return (
    <section
      className="mt-6 lg:mt-10 w-full"
      aria-labelledby="tour-map-heading"
    >
      <h2
        id="tour-map-heading"
        className="mb-6 text-3xl font-semibold text-primary/90 sm:text-4xl"
      >
        {title}
      </h2>

      <div className="overflow-hidden bg-muted">
        <iframe
          src={tour}
          title={title}
          width="1200"
          height="500"
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="block h-[320px] w-full border-0"
        />
      </div>
    </section>
  );
}
