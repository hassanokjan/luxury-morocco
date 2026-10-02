// src/seo/TourJsonLd.tsx

import { decode } from "html-entities";

import { getPathname, type Locale } from "@/i18n/routing";

import type { TourDetail } from "@/lib/wordpress/tours";

type Props = {
  tour: TourDetail;
  locale: Locale;
};

const SITE_URL = "https://luxurymoroccodestinations.com";

const SITE_NAME = "Luxury Morocco Destinations";

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

/*
 * Remove HTML while keeping readable text.
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
 * Extract itinerary H3 headings.
 *
 * Example:
 * <h3>Day 1: Marrakech – Dades</h3>
 */
function extractItineraryItems(html: string): string[] {
  if (!html) {
    return [];
  }

  const matches = [...html.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>/gi)];

  return matches.map((match) => cleanText(match[1] ?? "")).filter(Boolean);
}

/*
 * Extract WordPress FAQ:
 *
 * <h3>Question?</h3>
 * <p>Answer...</p>
 */
function extractFaqItems(html: string) {
  if (!html) {
    return [];
  }

  const matches = [
    ...html.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>\s*([\s\S]*?)(?=<h3\b|$)/gi),
  ];

  return matches
    .map((match) => ({
      question: cleanText(match[1] ?? ""),

      answer: cleanText(match[2] ?? ""),
    }))
    .filter((item) => item.question && item.answer);
}

export default function TourJsonLd({ tour, locale }: Props) {
  /*
   * CURRENT TOUR URL
   */
  const path = getPathname({
    locale,

    href: {
      pathname: "/tours/[slug]",

      params: {
        slug: tour.slug,
      },
    },
  });

  const url = absoluteUrl(path);

  /*
   * TOURS PAGE
   */
  const toursPath = getPathname({
    locale,
    href: "/tours",
  });

  /*
   * HOME PAGE
   */
  const homePath = getPathname({
    locale,
    href: "/",
  });

  /*
   * SEO CONTENT
   */
  const title = tour.seoTitle || tour.title;

  const description = tour.seoDescription || tour.description;

  const keywords = tour.keywords
    ? tour.keywords
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
  const itineraryItems = extractItineraryItems(tour.itinerary ?? "");

  /*
   * FAQ
   */
  const faqItems = extractFaqItems(tour.faqs ?? "");

  /*
   * TOUR IMAGES
   */
  const images = [tour.image, tour.image2, tour.image3].filter(
    (image): image is string => Boolean(image),
  );

  const uniqueImages = [...new Set(images)];

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

          contentUrl: `${SITE_URL}/logo.png`,
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

        headline: tour.title,

        description,

        inLanguage: language,

        ...(tour.date && {
          datePublished: tour.date,
        }),

        ...(tour.modified && {
          dateModified: tour.modified,
        }),

        ...(keywords.length > 0 && {
          keywords: keywords.join(", "),
        }),

        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },

        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },

        breadcrumb: {
          "@id": `${url}#breadcrumb`,
        },

        ...(tour.image && {
          primaryImageOfPage: {
            "@id": `${url}#primaryimage`,
          },
        }),

        mainEntity: {
          "@id": `${url}#tour`,
        },
      },

      /*
       * PRIMARY IMAGE
       */
      ...(tour.image
        ? [
            {
              "@type": "ImageObject",

              "@id": `${url}#primaryimage`,

              url: tour.image,

              contentUrl: tour.image,

              caption: tour.imageAlt || tour.title,

              representativeOfPage: true,
            },
          ]
        : []),

      /*
       * TOURIST TRIP
       */
      {
        "@type": "TouristTrip",

        "@id": `${url}#tour`,

        name: tour.title,

        url,

        description: tour.description || description,

        ...(uniqueImages.length > 0 && {
          image: uniqueImages,
        }),

        /*
         * Departure city
         */
        ...(tour.departure && {
          tripOrigin: {
            "@type": "Place",

            name: `${tour.departure}, Morocco`,
          },
        }),

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
         * REAL ITINERARY
         */
        ...(itineraryItems.length > 0 && {
          itinerary: {
            "@type": "ItemList",

            name:
              locale === "es"
                ? `Itinerario de ${tour.title}`
                : `${tour.title} itinerary`,

            numberOfItems: itineraryItems.length,

            itemListOrder: "https://schema.org/ItemListOrderAscending",

            itemListElement: itineraryItems.map((item, index) => ({
              "@type": "ListItem",

              position: index + 1,

              name: item,
            })),
          },
        }),

        /*
         * This tour is the main entity
         * described by the page.
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

            /*
             * Same wording as the
             * visible breadcrumb.
             */
            name: "Tours",

            item: absoluteUrl(toursPath),
          },

          {
            "@type": "ListItem",

            position: 3,

            name: tour.title,

            item: url,
          },
        ],
      },

      /*
       * FAQ
       *
       * Only generated if the page
       * actually contains FAQs.
       */
      ...(faqItems.length > 0
        ? [
            {
              "@type": "FAQPage",

              "@id": `${url}#faq`,

              /*
               * Real page URL.
               * #faq remains only
               * the entity identifier.
               */
              url,

              inLanguage: language,

              isPartOf: {
                "@id": `${SITE_URL}/#website`,
              },

              mainEntity: faqItems.map((faq) => ({
                "@type": "Question",

                name: faq.question,

                acceptedAnswer: {
                  "@type": "Answer",

                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
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
