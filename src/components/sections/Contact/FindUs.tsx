import { MapPin } from "lucide-react";

const MAP_EMBED_URL ="https://www.google.com/maps?q=Casablanca,Morocco&output=embed";

export default function FindUs(): React.JSX.Element {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Content */}
        <div className="mx-auto mt-10 max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />

            <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Find Us
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-semibold leading-tight text-heading sm:text-4xl ">
            Based in Casablanca, Traveling Across Morocco
          </h2>

          <p className="mx-auto mt-5 text-sm leading-7 text-text-secondary sm:text-base">
            Luxury Morocco Destinations is based in Casablanca and creates
            private Morocco luxury tours across the country, from Marrakech and
            Fes to Chefchaouen, the Atlas Mountains and the Sahara Desert.
          </p>
        </div>
        {/* Map */}
        <div className="h-[340px] w-full overflow-hidden rounded-xl border border-border sm:h-[430px] lg:h-[520px]">
          <iframe
            src={MAP_EMBED_URL}
            title="Luxury Morocco Destinations in Casablanca, Morocco"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
