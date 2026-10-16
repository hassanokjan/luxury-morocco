import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getPathname, type Locale } from "@/i18n/routing";
import { getBlogCards } from "@/lib/wordpress/blogs";
import Blogcart from "@/components/sections/blog/Blogcart";
import { BlogPagination } from "@/components/sections/blog/BlogPagination";
const SITE_URL = "https://luxurymoroccodestinations.com";
const SITE_NAME = "Luxury Morocco Destinations";

const CONTENT = {
  en: {
    title: "Luxury Morocco Destinations Blog",

    description:
      "Travel stories, local insights and practical guides to Morocco. From charming riads to Sahara journeys, find ideas to make your next trip your own.",

    empty: "New travel stories are on their way. Check back soon.",

    seoTitle: "Morocco Travel Blog | Guides, Tips & Travel Inspiration",

    seoDescription:
      "Explore Morocco travel guides, local tips, destination ideas and practical advice for Marrakech, the Sahara, Fes, Casablanca and more.",
  },

  es: {
    title: "Blog de Luxury Morocco Destinations",

    description:
      "Historias de viaje, consejos locales y guías prácticas de Marruecos. Desde riads con encanto hasta rutas por el Sahara, encuentra ideas para preparar un viaje a tu medida.",

    empty: "Pronto compartiremos nuevas historias de viaje.",

    seoTitle: "Blog de Viajes a Marruecos | Guías, Consejos e Inspiración",

    seoDescription:
      "Descubre guías de viaje por Marruecos, consejos locales, destinos e información práctica sobre Marrakech, el Sahara, Fez, Casablanca y más.",
  },
} as const;

type BlogPageProps = {
  params: Promise<{
    locale: string;
  }>;
};



export async function generateMetadata({params,}: BlogPageProps): Promise<Metadata> {

  const { locale } = await params;

  if (locale !== "en" && locale !== "es") {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const currentLocale = locale as Locale;

  const t = CONTENT[currentLocale];

  /*
   * Current canonical
   */
  const canonicalPath = getPathname({
    locale: currentLocale,
    href: "/blog",
  });

  const canonical = new URL(canonicalPath, SITE_URL).toString();

  /*
   * EN version
   */
  const englishPath = getPathname({
    locale: "en",
    href: "/blog",
  });

  const englishUrl = new URL(englishPath, SITE_URL).toString();

  /*
   * ES version
   */
  const spanishPath = getPathname({
    locale: "es",
    href: "/blog",
  });

  const spanishUrl = new URL(spanishPath, SITE_URL).toString();

  return {
    title: t.seoTitle,
    description: t.seoDescription,
    alternates: {
      canonical,
      languages: {
        en: englishUrl,
        es: spanishUrl,
        "x-default": englishUrl,
      },
    },

    openGraph: {
      type: "website",
      title: t.seoTitle,
      description: t.seoDescription,
      url: canonical,
      siteName: SITE_NAME,
      locale: currentLocale === "es" ? "es_ES" : "en_US",
      alternateLocale: currentLocale === "es" ? ["en_US"] : ["es_ES"],
    },

    twitter: {
      card: "summary_large_image",
      title: t.seoTitle,
      description: t.seoDescription,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}


export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;

  if (locale !== "en" && locale !== "es") {
    notFound();
  }

  setRequestLocale(locale);

  const t = CONTENT[locale];
  const { cards, currentPage, totalPages } = await getBlogCards(locale, 1, 6);

  return (
    <>
      <section
        aria-labelledby="blog-heading"
        className="min-h-screen bg-background pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* PRÉSENTATION */}
          <header className="mx-auto mb-12 max-w-5xl text-center sm:mb-16 lg:mb-20">
            <h1
              id="blog-heading"
              className="text-balance font-heading text-4xl font-semibold leading-[1.1] tracking-tight text-heading sm:text-5xl lg:text-6xl"
            >
              {t.title}
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-pretty text-base leading-8 text-text-secondary sm:text-lg">
              {t.description}
            </p>
          </header>

          {/* ARTICLES */}
          {cards.length > 0 ? (
            <div className="space-y-12 sm:space-y-16">
              {cards.map((card) => (
                <Blogcart key={card.id} card={card} locale={locale} />
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-base text-text-secondary">
              {t.empty}
            </p>
          )}
        </div>
      </section>
      <BlogPagination
        locale={locale}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}
