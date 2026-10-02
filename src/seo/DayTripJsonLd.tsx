// src/components/seo/DayTripJsonLd.tsx

import { decode } from "html-entities";

import { getPathname, type Locale } from "@/i18n/routing";

import type { DayTripDetail } from "@/lib/wordpress/day-trips";

type Props = {
  dayTrip: DayTripDetail;
  locale: Locale;
};

const SITE_URL = "https://luxurymoroccodestinations.com";

const SITE_NAME = "Luxury Morocco Destinations";

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

/*
 * Nettoie le HTML provenant de WordPress.
 */
function cleanText(value: string) {
  return decode(
    value
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

/*
 * Récupère les titres H3 de l'itinéraire WordPress.
 *
 * Exemple :
 *
 * <h3>8:00 AM — Pickup in Marrakech</h3>
 * <p>...</p>
 *
 * devient :
 *
 * [
 *   "8:00 AM — Pickup in Marrakech"
 * ]
 */
function extractItineraryItems(html: string): string[] {
  if (!html) {
    return [];
  }

  const matches = [...html.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>/gi)];

  return matches.map((match) => cleanText(match[1] ?? "")).filter(Boolean);
}

export default function DayTripJsonLd({ dayTrip, locale }: Props) {
  /*
   * PAGE URL
   */
  const path = getPathname({
    locale,

    href: {
      pathname: "/day-trips/[slug]",

      params: {
        slug: dayTrip.slug,
      },
    },
  });

  const url = absoluteUrl(path);

  /*
   * DAY TRIPS LIST
   */
  const dayTripsPath = getPathname({
    locale,
    href: "/day-trips",
  });

  /*
   * HOME
   */
  const homePath = getPathname({
    locale,
    href: "/",
  });

  /*
   * CONTENT
   */
  const title = dayTrip.seoTitle || dayTrip.title;

  const description = dayTrip.seoDescription || dayTrip.description;

  /*
   * KEYWORDS
   */
  const keywords = dayTrip.keywords
    ? dayTrip.keywords
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean)
    : [];

  /*
   * LANGUAGE
   */
  const language = locale === "es" ? "es-ES" : "en-US";

  /*
   * ITINERARY
   */
  const itineraryItems = extractItineraryItems(dayTrip.itinerary);

  /*
   * JSON-LD
   */
  const jsonLd = {
    "@context": "https://schema.org",

    "@graph": [
      /*
       * WEBSITE
       */
      {
        "@type": "WebSite",

        "@id": `${SITE_URL}/#website`,

        url: `${SITE_URL}/`,

        name: SITE_NAME,

        /*
         * The website exists
         * in English + Spanish.
         */
        inLanguage: ["en", "es"],

        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },

      /*
       * TRAVEL AGENCY
       */
      {
        "@type": "TravelAgency",

        "@id": `${SITE_URL}/#organization`,

        name: SITE_NAME,

        url: `${SITE_URL}/`,

        logo: {
          "@type": "ImageObject",

          url: `${SITE_URL}/logo.png`,
        },

        email: "info@luxurymoroccodestinations.com",

        telephone: "+212667182357",
      },

      /*
       * WEB PAGE
       */
      {
        "@type": "WebPage",

        "@id": `${url}#webpage`,

        url,

        name: title,

        headline: dayTrip.title,

        description,

        inLanguage: language,

        datePublished: dayTrip.date,

        dateModified: dayTrip.modified,

        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },

        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },

        breadcrumb: {
          "@id": `${url}#breadcrumb`,
        },

        ...(dayTrip.image && {
          primaryImageOfPage: {
            "@id": `${url}#primaryimage`,
          },
        }),

        mainEntity: {
          "@id": `${url}#daytrip`,
        },
      },

      /*
       * PRIMARY IMAGE
       */
      ...(dayTrip.image
        ? [
            {
              "@type": "ImageObject",

              "@id": `${url}#primaryimage`,

              url: dayTrip.image,

              contentUrl: dayTrip.image,

              caption: dayTrip.imageAlt || dayTrip.title,

              representativeOfPage: true,
            },
          ]
        : []),

      /*
       * TOURIST TRIP
       */
      {
        "@type": "TouristTrip",

        "@id": `${url}#daytrip`,

        name: dayTrip.title,

        url,

        description: dayTrip.description || description,

        ...(dayTrip.image && {
          image: dayTrip.image,
        }),

        /*
         * All your Day Trips
         * depart from Marrakech.
         */
        tripOrigin: {
          "@type": "Place",

          name: "Marrakech, Morocco",
        },

        touristType: [
          "Private travelers",
          "Couples",
          "Families",
          "Small groups",
        ],

        provider: {
          "@id": `${SITE_URL}/#organization`,
        },

        /*
         * Only output itinerary
         * when real steps exist.
         */
        ...(itineraryItems.length > 0 && {
          itinerary: {
            "@type": "ItemList",

            name:
              locale === "es"
                ? `Itinerario de ${dayTrip.title}`
                : `${dayTrip.title} itinerary`,

            numberOfItems: itineraryItems.length,

            itemListOrder: "https://schema.org/ItemListOrderAscending",

            itemListElement: itineraryItems.map((item, index) => ({
              "@type": "ListItem",

              position: index + 1,

              name: item,
            })),
          },
        }),

        ...(keywords.length > 0 && {
          keywords: keywords.join(", "),
        }),

        /*
         * This TouristTrip is the
         * principal entity of this page.
         */
        mainEntityOfPage: {
          "@id": `${url}#webpage`,
        },
      },

      /*
       * BREADCRUMB
       */
      {
        "@type": "BreadcrumbList",

        "@id": `${url}#breadcrumb`,

        itemListElement: [
          {
            "@type": "ListItem",

            position: 1,

            name: locale === "es" ? "Inicio" : "Home",

            item: absoluteUrl(homePath),
          },

          {
            "@type": "ListItem",

            position: 2,

            name: locale === "es" ? "Excursiones" : "Day Trips",

            item: absoluteUrl(dayTripsPath),
          },

          {
            "@type": "ListItem",

            position: 3,

            name: dayTrip.title,

            item: url,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
