import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "@/i18n/routing";

type Locale = "en" | "es";

type GuideProfileCardProps = {
  locale: Locale;
};

export default function GuideProfileCard({locale,}: GuideProfileCardProps): React.JSX.Element {

  const content = {
    en: {
      label: "A Local Way to Experience Morocco",
      role: "Founder & Local Guide",
      location: "Morocco",
      intro:
        "Traveling through Morocco is often about the small moments stopping in a village, sharing tea, taking a quieter road or spending more time in a place you enjoy. That local experience is what we try to bring into every trip.",
      link: "Meet your guide",
    },

    es: {
      label: "Una forma local de conocer Marruecos",
      role: "Fundador y guía local",
      location: "Marruecos",
      intro:
        "Viajar por Marruecos también está en los pequeños momentos parar en un pueblo, compartir un té, tomar una ruta más tranquila o quedarse un poco más en un lugar que te gusta. Esa experiencia local es la que intentamos aportar a cada viaje.",
      link: "Conoce a tu guía",
    },
  };
  
  const t = content[locale];

  return (
    <div className="overflow-hidden rounded-[6px] border border-border bg-card">
      {/* Photo */}
      <div className="relative h-[240px] w-full overflow-hidden">
        <Image
          src="/personnel/hassan6.jpeg"
          alt="Hassan, local Morocco guide"
          fill
          sizes="(max-width: 1024px) 100vw, 380px"
          className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
        />

        <div className="absolute bottom-4 left-4">
          <span className="inline-flex rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-primary backdrop-blur-sm">
            {t.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-heading text-2xl font-semibold leading-tight text-heading">
              Hassan
            </h3>

            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {t.role}
            </p>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-muted text-primary">
            <MapPin className="h-4 w-4" aria-hidden="true" />
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-text-secondary">{t.intro}</p>

        <div className="mt-5 border-t border-border pt-4">
          <Link
            href="/about"
            locale={locale}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-heading transition-colors hover:text-primary"
          >
            {t.link}

            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
