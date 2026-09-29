import type { MetadataRoute } from "next";

import { getPathname, type Locale } from "@/i18n/routing";

import { getAllBlogSlugs } from "@/lib/wordpress/blogs";
import { getAllTourSlugs } from "@/lib/wordpress/tours";

const BASE_URL = "https://luxurymoroccodestinations.com";

const locales: Locale[] = ["en", "es"];

const departureCities = [
  "marrakech",
  "fes",
  "casablanca",
  "tangier",
  "agadir",
  "ouarzazate",
];

export const revalidate = 86400;

function absoluteUrl(pathname: string) {
  return `${BASE_URL}${pathname}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [];

  /*
   * STATIC PAGES
   */
  const staticPages = [
    "/",
    "/tours",
    "/day-trips",
    "/customize-your-tour",
    "/blog",
    "/about",
    "/about/morocco_tourist",
    "/contact",
  ] as const;

  for (const locale of locales) {
    for (const pathname of staticPages) {
      const url = getPathname({
        locale,
        href: pathname,
      });

      sitemap.push({
        url: absoluteUrl(url),
        lastModified: new Date(),
        changeFrequency: pathname === "/" ? "daily" : "weekly",
        priority: pathname === "/" ? 1 : pathname === "/tours" ? 0.9 : 0.8,
      });
    }
  }

  /*
   * TOURS FROM CITY
   */
  for (const locale of locales) {
    for (const city of departureCities) {
      const url = getPathname({
        locale,
        href: {
          pathname: "/tours/from/[city]",
          params: {
            city,
          },
        },
      });

      sitemap.push({
        url: absoluteUrl(url),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  /*
   * BLOG POSTS
   */
  const blogResults = await Promise.all(
    locales.map(async (locale) => ({
      locale,
      slugs: await getAllBlogSlugs(locale),
    })),
  );

  for (const { locale, slugs } of blogResults) {
    for (const slug of slugs) {
      const url = getPathname({
        locale,
        href: {
          pathname: "/blog/[slug]",
          params: {
            slug,
          },
        },
      });

      sitemap.push({
        url: absoluteUrl(url),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  /*
   * TOUR DETAILS
   */
  const tourResults = await Promise.all(
    locales.map(async (locale) => ({
      locale,
      slugs: await getAllTourSlugs(locale),
    })),
  );

  for (const { locale, slugs } of tourResults) {
    for (const slug of slugs) {
      const url = getPathname({
        locale,
        href: {
          pathname: "/tours/[slug]",
          params: {
            slug,
          },
        },
      });

      sitemap.push({
        url: absoluteUrl(url),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
  }

  return sitemap;
}
