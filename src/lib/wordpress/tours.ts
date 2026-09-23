import { decode } from "html-entities";
import type { Locale } from "@/i18n/routing";

export type { Locale } from "@/i18n/routing";
const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

const REVALIDATE = 60;

const LANGUAGE_IDS: Record<Locale, number> = {
  en: 14,
  es: 15,
};

const LUXURY_COLLECTION_ID = 13;

interface WordPressTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

interface WordPressFeaturedImage {
  id?: number;
  source_url?: string;
  alt_text?: string;
}

interface WordPressMedia {
  id: number;
  source_url: string;
  alt_text?: string;
}

/*
 * Ton ACF retourne actuellement les images 2/3
 * comme IDs WordPress.
 *
 * Le type accepte aussi Image Array si tu changes
 * plus tard le Return Format dans ACF.
 */
type AcfImage =
  | number
  | {
      url?: string;
      alt?: string;
    }
  | false
  | null;

interface WordPressTour {
  id: number;
  slug: string;
  date: string;
  modified?: string;

  title: {
    rendered: string;
  };

  featured_media?: number;

  "departure-city"?: number[];
  tour_collection?: number[];
  tour_language?: number[];

  acf?: {
    description?: string;
    duration?: string;

    seo_title?: string;
    seo_description?: string;
    keywords?: string;

    overview_title?: string;
    overview?: string;

    itinerary?: string;

    highlights?: string;

    why_this_tour_title?: string;
    why_choose_text?: string;

    includes?: string;
    excludes?: string;

    faqs?: string;

    map_url?: string;

    tour_image_2?: AcfImage;
    tour_image_3?: AcfImage;

    translation?: number | false | null;
    related_tours?: number[] | number | false | null;
  };

  _embedded?: {
    "wp:featuredmedia"?: WordPressFeaturedImage[];

    "wp:term"?: WordPressTerm[][];
  };
}

export interface TourCard {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  departure: string;
  departureSlug: string;
}

export interface TourDetail {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration: string;
  departure: string;
  departureSlug: string;
  image: string;
  imageAlt: string;
  image2: string;
  image2Alt: string;
  image3: string;
  image3Alt: string;
  overviewTitle: string;
  overview: string;
  itinerary: string;
  highlights: string[];
  whyThisTourTitle: string;
  whyChooseText: string;
  includes: string;
  excludes: string;
  faqs: string;
  mapUrl: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  translationId: number | null;
  date: string;
  modified: string;
  relatedTourIds: number[];
}

interface WordPressResult<T> {
  posts: T[];
  total: number;
  totalPages: number;
}

async function fetchTours<T>(
  locale: Locale,
  params: Record<string, string>,
): Promise<WordPressResult<T> | null> {
  if (!API_URL) {
    console.error("Tours: NEXT_PUBLIC_API_URL is missing.");
    return null;
  }

  const query = new URLSearchParams({
    ...params,
    status: "publish",
    tour_language: String(LANGUAGE_IDS[locale]),
  });

  try {
    const response = await fetch(`${API_URL}/tours?${query}`, {
      next: {
        revalidate: REVALIDATE,
      },
    });

    if (!response.ok) {
      console.error("WordPress tours:", response.status);
      return null;
    }

    const posts: T[] = await response.json();

    return {
      posts,
      total: Number(response.headers.get("X-WP-Total") ?? 0),
      totalPages: Number(response.headers.get("X-WP-TotalPages") ?? 0),
    };
  } catch (error) {
    console.error("WordPress tours:", error);
    return null;
  }
}

async function getDepartureCityId(slug: string): Promise<number | null> {
  if (!API_URL || !slug) {
    return null;
  }

  const query = new URLSearchParams({
    slug: slug.toLowerCase(),
    per_page: "1",
    _fields: "id,slug",
  });

  try {
    const response = await fetch(`${API_URL}/departure-city?${query}`, {
      next: {
        revalidate: 86400,
      },
    });

    if (!response.ok) {
      return null;
    }

    const terms: {
      id: number;
      slug: string;
    }[] = await response.json();

    return terms[0]?.id ?? null;
  } catch {
    return null;
  }
}

function cleanTitle(value: string): string {
  return decode(value.replace(/<[^>]*>/g, ""));
}

function getDeparture(post: WordPressTour): { name: string; slug: string } {
  const groups = post._embedded?.["wp:term"] ?? [];
  const terms = groups.flat();
  const departure = terms.find((term) => term.taxonomy === "departure-city");

  return {
    name: departure?.name ?? "",
    slug: departure?.slug ?? "",
  };
}

function getFeaturedImage(post: WordPressTour): { url: string; alt: string } {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const title = cleanTitle(post.title.rendered);

  return {
    url: media?.source_url ?? "",
    alt: media?.alt_text || title,
  };
}

/*
|--------------------------------------------------------------------------
| CARD CONVERSION
|--------------------------------------------------------------------------
*/

function toTourCard(post: WordPressTour): TourCard {
  const image = getFeaturedImage(post);

  const departure = getDeparture(post);

  return {
    id: String(post.id),
    slug: post.slug,
    title: cleanTitle(post.title.rendered),
    description: post.acf?.description ?? "",
    image: image.url,
    imageAlt: image.alt,
    departure: departure.name,
    departureSlug: departure.slug,
  };
}

/*
|--------------------------------------------------------------------------
| MEDIA
|--------------------------------------------------------------------------
|
| Seulement utilisé actuellement pour image 2 / image 3
| car ACF retourne des IDs:
|
| tour_image_2: 65
| tour_image_3: 107
|
|--------------------------------------------------------------------------
*/

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
   * Si plus tard tu choisis
   * ACF -> Return Format -> Image Array
   */
  if (typeof image === "object") {
    return {
      url: image.url ?? "",
      alt: image.alt ?? "",
    };
  }

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

    const media: WordPressMedia = await response.json();

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

export async function getTourCardsByDeparture(
  locale: Locale,
  departureSlug: string,
  limit = 9,
): Promise<TourCard[]> {
  const departureId = await getDepartureCityId(departureSlug);

  if (!departureId) {
    return [];
  }

  const safeLimit = Math.min(100, Math.max(1, limit));

  const result = await fetchTours<WordPressTour>(locale, {
    "departure-city": String(departureId),
    per_page: String(safeLimit),
    orderby: "date",
    order: "desc",
    _embed: "wp:featuredmedia,wp:term",
    _fields: "id,slug,title,acf.description,_links,_embedded",
  });

  return result?.posts.map(toTourCard) ?? [];
}

export async function getLuxuryTourCards(
  locale: Locale,
  limit = 12,
): Promise<TourCard[]> {
  const safeLimit = Math.min(100, Math.max(1, limit));

  const result = await fetchTours<WordPressTour>(locale, {
    tour_collection: String(LUXURY_COLLECTION_ID),
    per_page: String(safeLimit),
    _embed: "wp:featuredmedia,wp:term",
    _fields: "id,slug,title,acf.description,_links,_embedded",
  });

  return result?.posts.map(toTourCard) ?? [];
}

/*
|--------------------------------------------------------------------------
| 3. TOUR DETAIL
|--------------------------------------------------------------------------
|
| Exemple:
|
| getTourDetail(
|   "en",
|   "3-days-tour-from-marrakech-to-merzouga-desert",
| )
|
|--------------------------------------------------------------------------
*/

export async function getTourDetail(
  locale: Locale,
  slug: string,
): Promise<TourDetail | null> {
  const cleanSlug = slug;

  if (!cleanSlug) {
    return null;
  }

  const result = await fetchTours<WordPressTour>(locale, {
    slug: cleanSlug,
    per_page: "1",
    _embed: "wp:featuredmedia,wp:term",
  });

  const post = result?.posts[0];

  if (!post) {
    return null;
  }

  const title = cleanTitle(post.title.rendered);
  const featured = getFeaturedImage(post);
  const departure = getDeparture(post);

  /*
   * Les deux images sont récupérées
   * en parallèle.
   */
  const [image2, image3] = await Promise.all([
    resolveImage(post.acf?.tour_image_2),
    resolveImage(post.acf?.tour_image_3),
  ]);

  const highlights =
    post.acf?.highlights
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean) ?? [];

  const relatedTourIds = Array.isArray(post.acf?.related_tours)
    ? post.acf.related_tours
    : typeof post.acf?.related_tours === "number"
      ? [post.acf.related_tours]
      : [];

  return {
    id: String(post.id),
    slug: post.slug,
    title,
    description: post.acf?.description ?? "",
    duration: post.acf?.duration ?? "",
    departure: departure.name,
    departureSlug: departure.slug,
    image: featured.url,
    imageAlt: featured.alt,
    image2: image2.url,
    image2Alt: image2.alt,
    image3: image3.url,
    image3Alt: image3.alt,
    overviewTitle: post.acf?.overview_title ?? "",
    overview: post.acf?.overview ?? "",
    itinerary: post.acf?.itinerary ?? "",
    highlights,
    whyThisTourTitle: post.acf?.why_this_tour_title ?? "",
    whyChooseText: post.acf?.why_choose_text ?? "",
    includes: post.acf?.includes ?? "",
    excludes: post.acf?.excludes ?? "",
    faqs: post.acf?.faqs ?? "",
    mapUrl: post.acf?.map_url ?? "",
    seoTitle: post.acf?.seo_title || title,
    seoDescription: post.acf?.seo_description || post.acf?.description || "",
    keywords: post.acf?.keywords ?? "",
    translationId:
      typeof post.acf?.translation === "number" ? post.acf.translation : null,
    date: post.date,
    relatedTourIds,
    modified: post.modified ?? post.date,
  };
}

/*
|--------------------------------------------------------------------------
| 5. ALTERNATE TOUR SLUGS
|--------------------------------------------------------------------------
|
| Utilisé par:
|
| LanguageSwitcher
| hreflang
| SEO metadata
|
| IMPORTANT:
|
| On passe directement translationId provenant
| déjà de getTourDetail().
|
| On évite donc de rechercher une deuxième fois
| le tour courant.
|
|--------------------------------------------------------------------------
*/

export async function getAlternateTourSlugs(
  locale: Locale,
  currentSlug: string,
  translationId: number | null,
): Promise<Record<Locale, string> | null> {
  if (!currentSlug || !translationId) {
    return null;
  }

  const alternateLocale: Locale = locale === "en" ? "es" : "en";

  const result = await fetchTours<{
    id: number;
    slug: string;
  }>(alternateLocale, {
    include: String(translationId),

    per_page: "1",

    _fields: "id,slug",
  });

  const translatedTour = result?.posts[0];

  if (!translatedTour?.slug) {
    return null;
  }

  if (locale === "en") {
    return {
      en: currentSlug,

      es: translatedTour.slug,
    };
  }

  return {
    en: translatedTour.slug,

    es: currentSlug,
  };
}

// get all tour slugs for static generation

export async function getAllTourSlugs(locale: Locale): Promise<string[]> {
  const result = await fetchTours<{
    slug: string;
  }>(locale, {
    per_page: "100",
    _fields: "slug",
  });

  if (!result) {
    return [];
  }

  return result.posts.map((post) => post.slug).filter(Boolean);
}

// get relative tours by id

export async function getToursByIds(
  locale: Locale,
  ids: number[],
): Promise<TourCard[]> {
  const safeIds = [
    ...new Set(ids.filter((id) => Number.isInteger(id) && id > 0)),
  ];

  if (!safeIds.length) {
    return [];
  }

  const result = await fetchTours<WordPressTour>(locale, {
    include: safeIds.join(","),
    per_page: String(Math.min(safeIds.length, 100)),
    orderby: "include",
    _embed: "wp:featuredmedia,wp:term",
    _fields: "id,slug,title,acf.description,_links,_embedded",
  });

  return result?.posts.map(toTourCard) ?? [];
}