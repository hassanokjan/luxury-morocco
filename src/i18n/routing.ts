import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "as-needed",

  pathnames: {
    "/": "/",
    "/tours/from/[city]": "/tours/from/[city]",
    "/day-trips": "/day-trips",
    "/customize-your-tour": "/customize-your-tour",
    "/blog": "/blog",
    "/about/morocco_tourist": "/about/morocco_tourist",

    "/tours": {
      en: "/tours",
      es: "/excursiones",
    },

    "/about": {
      en: "/about",
      es: "/sobre-nosotros",
    },

    "/contact": {
      en: "/contact",
      es: "/contacto",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof typeof routing.pathnames;


export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
