import React from "react";
import { ExternalLink} from "lucide-react";
import { SiTripadvisor } from "react-icons/si";

const tripadvisorLink = "https://www.tripadvisor.com/Attraction_Review-g304018-d33999884-Reviews-Azul_Morocco_Travel-Ouarzazate_Draa_Tafilalet.html";

const reviews = [
  {
    name: "Krasito",
    comment:"This was my first time in Morocco and Zaid and Hassan made it amazing. They chose great places to stay, restaurants with very tasty food, and cared for us very well. When I come back to Morocco, I will definitely use their services again!",
  },
  {
    name: "Boiana S",
    comment:
      "It was an incredible journey, and throughout the entire trip we felt truly supported and cared for by our guides, Zaid and Hassan. They were exceptionally attentive, warm, smiling, and genuinely caring at every moment.",
  },
  {
    name: "Iveta N",
    comment:
      "Zaid and Hassan were absolutely incredible guides — warm, professional, and always attentive. They made our stay in Morocco truly unforgettable, and every moment with them was enjoyable and authentic.",
  },
];

const contenu={
    "en":{
        subtitle:"Guest Reviews",
        title:"What Our Travelers Say",
        button:"View on Tripadvisor"
    },
    "es":{
        subtitle:"Reseñas de huéspedes",
        title:"Lo que dicen nuestros viajeros",
        button:"Ver en Tripadvisor"
    }
}

export default function Tripadvisor({locale}: {locale: string}): React.JSX.Element {

    const t = contenu[locale as keyof typeof contenu];
  return (
    <section className="bg-surface-soft py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8 px-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {t.subtitle}
            </span>

            <h2 className="mt-2 text-3xl font-semibold text-heading sm:text-4xl">
              {t.title}
            </h2>
          </div>

          <a
            href={tripadvisorLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover sm:flex"
          >
            {t.button}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Horizontal reviews */}
        <div className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 sm:gap-5">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="
                    flex min-w-[85%] flex-col
                    snap-start
                    rounded-xl
                    border border-border
                    bg-card
                    p-5
                    sm:min-w-[55%]
                    sm:p-6
                    lg:min-w-0
                    lg:flex-1
              "
            >
              {/* Stars */}
              <div className="mb-4 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-4 w-4 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <p className="text-sm leading-7 text-text-secondary sm:text-base">
                “{review.comment}”
              </p>

              <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                {/* Traveler */}
                <div>
                  <p className="font-semibold text-heading">{review.name}</p>

                  <p className="mt-1 text-xs font-medium text-text-muted">
                    {t.button}
                  </p>
                </div>

                {/* Tripadvisor */}
                <a
                  href={tripadvisorLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View review on Tripadvisor"
                  className="flex shrink-0 items-center gap-2 text-sm font-semibold text-heading transition-colors hover:text-[#00AA6C]"
                >
                  <SiTripadvisor
                    className="h-6 w-6 text-[#00AA6C]"
                    aria-hidden="true"
                  />
                  <span className="hidden sm:inline">Tripadvisor</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile Tripadvisor button */}
        <div className="mt-6 sm:hidden">
          <a
            href={tripadvisorLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover"
          >
            {t.button}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
