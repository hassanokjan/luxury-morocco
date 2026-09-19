import { decode } from "html-entities";

export type Locale = "en" | "es";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
const PAGE_SIZE = 6;

const LANGUAGE_CATEGORIES: Record<Locale, number> = {
  en: 4,
  es: 6,
};

/* TYPES */

interface WordPressPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  content: { rendered: string };
  acf?: {
    description?: string;
    seo_title?: string;
    seo_description?: string;
    keywords?: string;
    translation?: number | false | null;
  };
  _embedded?: {
    "wp:featuredmedia"?: {
      source_url?: string;
      alt_text?: string;
    }[];
  };
}

export interface BlogCard {
  id: string;
  slug: string;
  title: string;
  description: string;
  keywords: string;
  coverImage: string;
  altImage: string;
  date: string;
}

export interface BlogDetail extends BlogCard {
  content: string;
  seoTitle: string;
  seoDescription: string;
  translationId: number | null;
}

export interface PaginatedBlogCards {
  cards: BlogCard[];
  total: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
}

interface WordPressResult<T> {
  posts: T[];
  total: number;
  totalPages: number;
}

/* REQUÊTE COMMUNE */

async function fetchPosts<T>(
  locale: Locale,
  params: Record<string, string>,
): Promise<WordPressResult<T> | null> {
  if (!API_URL || !LANGUAGE_CATEGORIES[locale]) {
    console.error("Blogs: URL API ou langue invalide.");
    return null;
  }

  const query = new URLSearchParams({
    ...params,
    status: "publish",
    categories: String(LANGUAGE_CATEGORIES[locale]),
  });

  try {
    const response = await fetch(`${API_URL}/posts?${query}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error("WordPress blogs: HTTP", response.status);
      return null;
    }

    const posts: T[] = await response.json();

    return {
      posts,
      total: Number(response.headers.get("X-WP-Total") ?? 0),
      totalPages: Number(response.headers.get("X-WP-TotalPages") ?? 0),
    };
  } catch (error) {
    console.error("WordPress blogs:", error);
    return null;
  }
}

/* CONVERSION POUR LE FRONTEND */

function toBlogCard(post: WordPressPost): BlogCard {
  const image = post._embedded?.["wp:featuredmedia"]?.[0];
  const title = decode(post.title.rendered.replace(/<[^>]*>/g, ""));

  return {
    id: String(post.id),
    slug: post.slug,
    title,
    description: post.acf?.description ?? "",
    keywords: post.acf?.keywords ?? "",
    coverImage: image?.source_url ?? "",
    altImage: image?.alt_text || title,
    date: post.date,
  };
}

/* 1. ARTICLES AVEC PAGINATION WORDPRESS */

export async function getBlogCards(
  locale: Locale,
  pageNumber = 1,
  pageSize = PAGE_SIZE,
): Promise<PaginatedBlogCards> {
  const page = Number.isFinite(pageNumber)
    ? Math.max(1, Math.floor(pageNumber))
    : 1;

  const limit = Number.isFinite(pageSize)
    ? Math.min(100, Math.max(1, Math.floor(pageSize)))
    : PAGE_SIZE;

  const result = await fetchPosts<WordPressPost>(locale, {
    page: String(page),
    per_page: String(limit),
    orderby: "date",
    order: "desc",
    _embed: "wp:featuredmedia",
  });

  return {
    cards: result?.posts.map(toBlogCard) ?? [],
    total: result?.total ?? 0,
    totalPages: result?.totalPages ?? 0,
    currentPage: page,
    hasMore: page < (result?.totalPages ?? 0),
  };
}

/* 2. DÉTAIL PAR SLUG ET LANGUE */

export async function getBlogDetail(
  locale: Locale,
  slug: string,
): Promise<BlogDetail | null> {
  if (!slug.trim()) return null;

  const result = await fetchPosts<WordPressPost>(locale, {
    slug: slug.trim(),
    per_page: "1",
    _embed: "wp:featuredmedia",
  });

  const post = result?.posts[0];

  if (!post) return null;

  const card = toBlogCard(post);

  return {
    ...card,
    content: post.content.rendered,
    seoTitle: post.acf?.seo_title || card.title,
    seoDescription: post.acf?.seo_description || card.description,
    translationId: post.acf?.translation || null,
  };
}

/* 3. TOUS LES SLUGS POUR SITEMAP / GENERATESTATICPARAMS */

export async function getAllBlogSlugs(locale: Locale): Promise<string[]> {
  const slugs: string[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const result = await fetchPosts<{ slug: string }>(locale, {
      page: String(page),
      per_page: "100",
      orderby: "id",
      order: "asc",
      _fields: "slug",
    });

    if (!result) return [];

    slugs.push(...result.posts.map((post) => post.slug));
    totalPages = result.totalPages;
    page += 1;
  } while (page <= totalPages);

  return [...new Set(slugs.filter(Boolean))];
}



export async function getAlternateSlugs(
  locale: Locale,
  slug: string,
): Promise<Record<Locale, string> | null> {
  if (!slug.trim()) return null;

  // 1. Récupérer l'article courant
  const currentResult = await fetchPosts<WordPressPost>(locale, {
    slug: slug.trim(),
    per_page: "1",
  });

  const currentPost = currentResult?.posts[0];

  if (!currentPost) {
    return null;
  }

  const translationId = currentPost.acf?.translation;

  // Pas de traduction liée
  if (!translationId || typeof translationId !== "number") {
    return null;
  }

  // 2. Déterminer l'autre langue
  const alternateLocale: Locale = locale === "en" ? "es" : "en";

  // 3. Chercher l'article traduit par son ID WordPress
  const translatedResult = await fetchPosts<WordPressPost>(alternateLocale, {
    include: String(translationId),
    per_page: "1",
    _fields: "id,slug",
  });

  const translatedPost = translatedResult?.posts[0];

  if (!translatedPost?.slug) {
    return null;
  }

  // 4. Retourner toujours { en, es }
  if (locale === "en") {
    return {
      en: currentPost.slug,
      es: translatedPost.slug,
    };
  }

  return {
    en: translatedPost.slug,
    es: currentPost.slug,
  };
}