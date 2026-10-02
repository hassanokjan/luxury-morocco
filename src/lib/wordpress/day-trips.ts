import { decode } from "html-entities";
import type { Locale } from "@/i18n/routing";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

const REVALIDATE = 20;

const LANGUAGE_IDS: Record<Locale, number> = {
  en: 14,
  es: 15,
};

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type AcfImage =
  | number
  | {
      url?: string;
      alt?: string;
    }
  | false
  | null;

interface WordPressDayTrip {
  id: number;
  slug: string;
  date: string;
  modified?: string;

  title: {
    rendered: string;
  };

  acf?: {
    description?: string;

    seo_title?: string;
    seo_description?: string;
    keywords?: string;

    overview?: string;
    itinerary?: string;
    highlights?: string;
    why_choose?: string;

    includes?: string;
    excludes?: string;

    tour_image_2?: AcfImage;

    related_trips?: number[] | number | false | null;

    translation_tour?: number | false | null;
  };

  _embedded?: {
    "wp:featuredmedia"?: {
      source_url?: string;
      alt_text?: string;
    }[];
  };
}

/* -------------------------------------------------------------------------- */
/* FRONTEND TYPES                                                             */
/* -------------------------------------------------------------------------- */

export interface DayTripCard {
  id: number;
  slug: string;
  title: string;
  description: string;

  image: string;
  imageAlt: string;
}

export interface DayTripDetail {
  id: number;
  slug: string;

  title: string;
  description: string;

  image: string;
  imageAlt: string;

  image2: string;
  image2Alt: string;

  overview: string;
  itinerary: string;
  highlights: string[];

  whyChoose: string;

  includes: string;
  excludes: string;

  seoTitle: string;
  seoDescription: string;
  keywords: string;

  relatedTripIds: number[];

  translationId: number | null;

  date: string;
  modified: string;
}

/* -------------------------------------------------------------------------- */
/* FETCH                                                                      */
/* -------------------------------------------------------------------------- */

async function fetchDayTrips<T>(
  locale: Locale,
  params: Record<string, string>,
): Promise<T[]> {
  if (!API_URL) {
    console.error("NEXT_PUBLIC_API_URL is missing.");
    return [];
  }

  const query = new URLSearchParams({
    ...params,
    status: "publish",
    tour_language: String(LANGUAGE_IDS[locale]),
  });

  try {
    const response = await fetch(`${API_URL}/day-trip?${query}`, {
      next: {
        revalidate: REVALIDATE,
      },
    });

    if (!response.ok) {
      console.error(`WordPress day trips error: ${response.status}`);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("WordPress day trips:", error);

    return [];
  }
}

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

function cleanTitle(value: string): string {
  return decode(value.replace(/<[^>]*>/g, ""));
}

function getFeaturedImage(post: WordPressDayTrip) {
  const image = post._embedded?.["wp:featuredmedia"]?.[0];

  return {
    url: image?.source_url ?? "",
    alt: image?.alt_text || cleanTitle(post.title.rendered),
  };
}

async function resolveImage(
  image: AcfImage | undefined,
): Promise<{ url: string; alt: string }> {
  if (!image) {
    return {
      url: "",
      alt: "",
    };
  }

  /*
   * ACF Image Array
   */
  if (typeof image === "object") {
    return {
      url: image.url ?? "",
      alt: image.alt ?? "",
    };
  }

  /*
   * ACF Image ID
   */
  if (!API_URL) {
    return {
      url: "",
      alt: "",
    };
  }

  try {
    const response = await fetch(
      `${API_URL}/media/${image}?_fields=id,source_url,alt_text`,
      {
        next: {
          revalidate: 86400,
        },
      },
    );

    if (!response.ok) {
      return {
        url: "",
        alt: "",
      };
    }

    const media: {
      source_url?: string;
      alt_text?: string;
    } = await response.json();

    return {
      url: media.source_url ?? "",
      alt: media.alt_text ?? "",
    };
  } catch {
    return {
      url: "",
      alt: "",
    };
  }
}

/* -------------------------------------------------------------------------- */
/* CARD CONVERSION                                                            */
/* -------------------------------------------------------------------------- */

function toDayTripCard(post: WordPressDayTrip): DayTripCard {
  const image = getFeaturedImage(post);

  return {
    id: post.id,

    slug: post.slug,

    title: cleanTitle(post.title.rendered),

    description: post.acf?.description ?? "",

    image: image.url,

    imageAlt: image.alt,
  };
}

/* -------------------------------------------------------------------------- */
/* DETAIL CONVERSION                                                          */
/* -------------------------------------------------------------------------- */

async function toDayTripDetail(post: WordPressDayTrip): Promise<DayTripDetail> {
  const title = cleanTitle(post.title.rendered);

  const featured = getFeaturedImage(post);

  const image2 = await resolveImage(post.acf?.tour_image_2);

  const highlights =
    post.acf?.highlights
      ?.split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean) ?? [];

  const relatedTripIds = Array.isArray(post.acf?.related_trips)
    ? post.acf.related_trips
    : typeof post.acf?.related_trips === "number"
      ? [post.acf.related_trips]
      : [];

  return {
    id: post.id,

    slug: post.slug,

    title,

    description: post.acf?.description ?? "",

    image: featured.url,

    imageAlt: featured.alt,

    image2: image2.url,

    image2Alt: image2.alt,

    overview: post.acf?.overview ?? "",

    itinerary: post.acf?.itinerary ?? "",

    highlights,

    whyChoose: post.acf?.why_choose ?? "",

    includes: post.acf?.includes ?? "",

    excludes: post.acf?.excludes ?? "",

    seoTitle: post.acf?.seo_title || title,

    seoDescription: post.acf?.seo_description || post.acf?.description || "",

    keywords: post.acf?.keywords ?? "",

    relatedTripIds,

    translationId:
      typeof post.acf?.translation_tour === "number"
        ? post.acf.translation_tour
        : null,

    date: post.date,

    modified: post.modified ?? post.date,
  };
}

/* -------------------------------------------------------------------------- */
/* 1. ALL DAY TRIP CARDS                                                      */
/* -------------------------------------------------------------------------- */

export async function getAllDayTripCards(
  locale: Locale,
): Promise<DayTripCard[]> {
  const posts = await fetchDayTrips<WordPressDayTrip>(locale, {
    per_page: "100",

    orderby: "date",

    order: "desc",

    _embed: "wp:featuredmedia",

    _fields: "id,slug,title,acf.description,_links,_embedded",
  });

  return posts.map(toDayTripCard);
}

/* -------------------------------------------------------------------------- */
/* 2. DAY TRIP DETAIL BY SLUG                                                 */
/* -------------------------------------------------------------------------- */

export async function getDayTripDetail(
  locale: Locale,
  slug: string,
): Promise<DayTripDetail | null> {
  if (!slug) {
    return null;
  }

  const posts = await fetchDayTrips<WordPressDayTrip>(locale, {
    slug,
    per_page: "1",
    _embed: "wp:featuredmedia",
  });

  const post = posts[0];

  if (!post) {
    return null;
  }

  return toDayTripDetail(post);
}

/* -------------------------------------------------------------------------- */
/* 3. DAY TRIP BY ID                                                          */
/* -------------------------------------------------------------------------- */

export async function getDayTripById(
  locale: Locale,
  id: number,
): Promise<DayTripDetail | null> {
  if (!id) {
    return null;
  }

  const posts = await fetchDayTrips<WordPressDayTrip>(locale, {
    include: String(id),
    per_page: "1",
    _embed: "wp:featuredmedia",
  });

  const post = posts[0];

  if (!post) {
    return null;
  }

  return toDayTripDetail(post);
}

/* -------------------------------------------------------------------------- */
/* 4. ALL DAY TRIP SLUGS                                                      */
/* -------------------------------------------------------------------------- */

export async function getAllDayTripSlugs(locale: Locale): Promise<string[]> {
  const posts = await fetchDayTrips<{
    slug: string;
  }>(locale, {
    per_page: "100",

    _fields: "slug",
  });

  return posts.map((post) => post.slug).filter(Boolean);
}

/* -------------------------------------------------------------------------- */
/* 5. LAST DAY TRIPS FOR HOME                                                 */
/* -------------------------------------------------------------------------- */

export async function getLastDayTrips(
  locale: Locale,
  limit = 3,
): Promise<DayTripCard[]> {
  const safeLimit = Math.min(6, Math.max(1, limit));

  const posts = await fetchDayTrips<WordPressDayTrip>(locale, {
    per_page: String(safeLimit),

    orderby: "date",

    order: "desc",

    _embed: "wp:featuredmedia",

    _fields: "id,slug,title,acf.description,_links,_embedded",
  });

  return posts.map(toDayTripCard);
}

/* -------------------------------------------------------------------------- */
/* 6. DAY TRIPS BY IDS                                                        */
/* -------------------------------------------------------------------------- */

export async function getDayTripsByIds(
  locale: Locale,
  ids: number[],
): Promise<DayTripCard[]> {
  const safeIds = [
    ...new Set(ids.filter((id) => Number.isInteger(id) && id > 0)),
  ];

  if (!safeIds.length) {
    return [];
  }

  const posts = await fetchDayTrips<WordPressDayTrip>(locale, {
    include: safeIds.join(","),

    per_page: String(Math.min(safeIds.length, 100)),

    orderby: "include",

    _embed: "wp:featuredmedia",

    _fields: "id,slug,title,acf.description,_links,_embedded",
  });

  return posts.map(toDayTripCard);
}

export async function getAlternateDayTripSlugs(
  locale: Locale,
  currentSlug: string,
  translationId: number | null,
): Promise<Record<Locale, string> | null> {
  if (!currentSlug || !translationId) {
    return null;
  }

  const otherLocale: Locale = locale === "en" ? "es" : "en";

  const translatedDayTrip = await getDayTripById(otherLocale, translationId);

  if (!translatedDayTrip?.slug) {
    return null;
  }

  if (locale === "en") {
    return {
      en: currentSlug,
      es: translatedDayTrip.slug,
    };
  }

  return {
    en: translatedDayTrip.slug,
    es: currentSlug,
  };
}