import { ArrowRight, CalendarDays, MapPinned, ShieldCheck } from "lucide-react";

import { Link } from "@/i18n/routing";

type Locale = "en" | "es";

type TravelExpertSectionProps = {
  locale: Locale;
};

export default function TravelExpertSection({locale,}: TravelExpertSectionProps): React.JSX.Element {

  const content = {
    en: {
      eyebrow: "Complimentary Travel Planning",
      title: "Not Sure Which Morocco Tour Fits You?",
      description:
        "Share your travel dates, interests and places you would like to visit. Our local Morocco experts will help you shape the right private journey — completely free and with no obligation to book.",

      itinerary: "Tailor-made ideas",
      local: "Local Morocco expertise",
      flexible: "Free planning advice",

      freeLabel: "100% Free Advice",
      note: "Speak directly with our local travel team",
      button: "Get Free Travel Advice",
      smallText: "No payment. No booking required. No obligation.",
    },

    es: {
      eyebrow: "Planificación de viaje gratuita",
      title: "¿No sabes qué tour por Marruecos elegir?",
      description:
        "Cuéntanos tus fechas, intereses y los lugares que te gustaría visitar. Nuestros expertos locales te ayudarán a crear el viaje privado adecuado para ti — totalmente gratis y sin obligación de reservar.",

      itinerary: "Ideas a medida",
      local: "Experiencia local en Marruecos",
      flexible: "Asesoramiento gratuito",

      freeLabel: "Asesoramiento 100 % gratuito",
      note: "Habla directamente con nuestro equipo local",
      button: "Recibir asesoramiento gratuito",
      smallText: "Sin pago. Sin reserva obligatoria. Sin compromiso.",
    },
  };

  const t = content[locale];

  return (
    <section className="mt-16">
      <div className="relative overflow-hidden rounded-xl border border-border bg-surface-soft">
        <div className="relative grid gap-10 px-6 py-9 sm:px-8 lg:grid-cols-[1fr_320px] lg:items-center">
          {/* LEFT */}
          <div>
            <div className="flex items-center gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {t.eyebrow}
              </p>
            </div>

            <h2 className="mt-5 max-w-2xl font-heading text-3xl font-semibold leading-tight text-heading sm:text-4xl">
              {t.title}
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
              {t.description}
            </p>

            {/* Benefits */}
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-muted text-primary">
                  <MapPinned className="h-4 w-4" aria-hidden="true" />
                </span>

                <span className="text-sm font-medium text-text-main">
                  {t.itinerary}
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-muted text-primary">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                </span>

                <span className="text-sm font-medium text-text-main">
                  {t.local}
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-muted text-primary">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                </span>

                <span className="text-sm font-medium text-text-main">
                  {t.flexible}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className=" pt-7 lg:pl-8 lg:pt-0">
            {/* Free badge */}
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
                {t.freeLabel}
              </span>
            </div>

            <p className="mt-4 text-sm font-medium leading-6 text-text-secondary">
              {t.note}
            </p>

            <Link
              href="/contact"
              locale={locale}
              className="group mt-5 inline-flex w-full items-center justify-between rounded-xl bg-primary px-5 py-4 text-sm font-bold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover"
            >
              <span>{t.button}</span>

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>

            <p className="mt-3 text-xs leading-5 text-primary">
              {t.smallText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
