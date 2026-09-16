import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "as-needed",

  pathnames: {
    "/": "/",

    // Tours
    "/tours": {
      en: "/tours",
      es: "/tours",
    },

    "/tours/[slug]": {
      en: "/tours/[slug]",
      es: "/tours/[slug]",
    },

    "/tours/from/[city]": {
      en: "/tours/from/[city]",
      es: "/tours/desde/[city]",
    },

    // Day Trips
    "/day-trips": {
      en: "/day-trips",
      es: "/excursiones",
    },

    "/day-trips/[slug]": {
      en: "/day-trips/[slug]",
      es: "/excursiones/[slug]",
    },

    // Customize
    "/customize-your-tour": {
      en: "/customize-your-tour",
      es: "/personaliza-tu-tour",
    },

    // Blog
    "/blog": {
      en: "/blog",
      es: "/blog",
    },

    "/blog/[slug]": {
      en: "/blog/[slug]",
      fr: "/blog/[slug]",
      es: "/blog/[slug]",
    },

    // About
    "/about": {
      en: "/about",
      fr: "/a-propos",
      es: "/sobre-nosotros",
    },
    "/about/morocco_tourist": {
      en: "/about/morocco-tourist",
      fr: "/a-propos/tourisme-maroc",
      es: "/sobre-nosotros/turismo-marruecos",
    },

    // Contact
    "/contact": {
      en: "/contact",
      fr: "/contact",
      es: "/contacto",
    },
  },

});

export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof typeof routing.pathnames;


export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
