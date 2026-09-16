import { MapPin } from "lucide-react";

const MAP_EMBED_URL = "https://www.google.com/maps?q=Casablanca,Morocco&output=embed";

export default function FindUs(): React.JSX.Element {
  return (
    <section className="bg-surface-soft pt-12">
        {/* Map */}
        <div className="overflow-hidden bg-card sm:mt-12">
          <div className="h-[340px] w-full sm:h-[430px] lg:h-[420px]">
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
