"use client";

import { useId, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { TourDetail } from "@/lib/wordpress/tours";
import type { Locale } from "@/i18n/routing";

type ItineraryProps = {
  itinerary: TourDetail["itinerary"];
  title?: string;
  locale: Locale;
};

type ItineraryStep = {
  title: string;
  description: string;
};

const TITLES = {
  en: "Your itinerary",
  es: "Tu itinerario",
} satisfies Record<Locale, string>;


function parseItinerary(html: string): ItineraryStep[] {
  if (!html.trim()) {
    return [];
  }

  const parts = html.split(/<h3[^>]*>(.*?)<\/h3>/gi);
  const steps: ItineraryStep[] = [];


  for (let index = 1; index < parts.length; index += 2) {
    const title = parts[index]?.replace(/<[^>]*>/g, "").trim();
    const description = parts[index + 1]?.trim();

    if (!title) {
      continue;
    }

    steps.push({
      title,
      description: description ?? "",
    });
  }

  return steps;
}




export default function Itinerary({itinerary,title,locale,}: ItineraryProps) {

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const id = useId();
  const steps = useMemo(() => parseItinerary(itinerary ?? ""), [itinerary]);

  if (!steps.length) {
    return null;
  }

  return (
    <section className="mt-8" aria-labelledby={`${id}-heading`}>

      <div className="mb-8">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
          {locale === "es" ? "Día a día" : "Day by day"}
        </p>

        <h2
          id={`${id}-heading`}
          className="text-3xl font-semibold leading-tight tracking-tight text-heading sm:text-4xl"
        >
          {title || TITLES[locale]}
        </h2>
      </div>

      {/* ITINERARY */}
      <ol className="space-y-0">
        {steps.map((step, index) => {
          const isOpen = openIndex === index;
          const buttonId = `${id}-button-${index}`;
          const panelId = `${id}-panel-${index}`;

          return (
            <li
              key={`${index}-${step.title}`}
              className="relative flex gap-2 pb-3 last:pb-0 sm:gap-3"
            >
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-5 top-10 w-px bg-border "
                />
              )}

              {/* DAY NUMBER */}
              <span
                aria-hidden="true"
                className={` relative z-10 flex size-5 sm:size-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors duration-300
                    ${
                      isOpen
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-primary/20 bg-background text-primary"
                    }
                  `}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* CARD */}
              <div
                className={`
                    min-w-0 flex-1
                    overflow-hidden rounded-xl
                    border bg-card
                    transition-colors duration-300

                    ${isOpen ? "border-primary/30" : "border-border"}
                  `}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenIndex((current) =>
                        current === index ? null : index,
                      )
                    }
                    className="
                        flex w-full
                        cursor-pointer
                        items-center
                        justify-between
                        gap-4
                        p-5 text-left
                        font-heading
                        text-lg font-semibold
                        leading-snug
                        text-heading
                        transition-colors
                        hover:text-primary
                        focus-visible:outline-primary
                        sm:p-6
                        sm:text-xl
                      "
                  >
                    <span>{step.title}</span>

                    <ChevronDown
                      aria-hidden="true"
                      className={`
                          size-5
                          shrink-0
                          text-primary
                          transition-transform
                          duration-300

                          ${isOpen ? "rotate-180" : ""}
                        `}
                    />
                  </button>
                </h3>

                {/* CONTENT */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="
                      border-t
                      border-border/70
                      px-5 pb-6 pt-5
                      sm:px-6
                    "
                >
                  <div
                    className=" itinerary-content max-w-3xl text-[15.5px] leading-[1.75] text-text-secondary [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:font-semibold
                      [&_strong]:text-heading [&_p>strong:only-child]:text-primary [&_p>strong:only-child]:font-semibold [&_p>strong:only-child]:tracking-[-0.01em] [&_br]:leading-5 sm:text-base sm:leading-[1.8]"
                    dangerouslySetInnerHTML={{
                      __html: step.description,
                    }}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
