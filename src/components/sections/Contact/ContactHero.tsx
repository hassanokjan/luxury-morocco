import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

const CONTENT = {
  en: {
    label: "Contact Luxury Morocco Destinations",
    title: "Plan a Private Journey Through Morocco",
    description:
      "Tell us your travel dates, group size and the places you want to explore. Our local team will help you design a private Morocco itinerary tailored to your pace, interests and preferred level of comfort.",
    button: "Request Your Free Quote on WhatsApp",
    imageAlt: "Luxury private journey through Morocco",
  },

  es: {
    label: "Contacta con Luxury Morocco Destinations",
    title: "Diseña tu viaje privado por Marruecos",
    description:
      "Cuéntanos tus fechas de viaje, el número de personas y los lugares que quieres conocer. Nuestro equipo local te ayudará a crear un itinerario privado por Marruecos adaptado a tu ritmo, tus intereses y el nivel de comodidad que prefieras.",
    button: "Solicita tu presupuesto gratis por WhatsApp",
    imageAlt: "Viaje privado de lujo por Marruecos",
  },
};



type ContactHeroProps = {
  numero: string;
  locale: string;
};

export default function ContactHero({ numero,locale,}: ContactHeroProps): React.JSX.Element {

  const currentLocale = locale === "es" ? locale : "en";
  const t = CONTENT[currentLocale];

  const whatsappUrl = `https://wa.me/${numero}`;

  return (
    <section className="relative w-full overflow-hidden">
      {/* IMAGE */}
      <div className="relative min-h-[360px] w-full lg:min-h-[420px]">
        <Image
          src="/images/desertsunrise.jpeg"
          alt={t.imageAlt}
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* DÉGRADÉ */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-secondary/60 via-secondary/5 to-secondary/1"
        />

        {/* CONTENU */}
        <div className="relative mx-auto flex min-h-[360px] max-w-7xl flex-col justify-center px-4 py-14 sm:px-6 lg:min-h-[420px] lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold uppercase tracking-widest text-white">
                {t.label}
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">
              {t.title}
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              {t.description}
            </p>

            {/* WHATSAPP */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary-hover"
              >
                <FaWhatsapp className="h-4 w-4 shrink-0" aria-hidden="true" />
                {t.button}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
