import { getBlogCards, type Locale } from "@/lib/wordpress/blogs";
import Blogcart from "@/components/sections/blog/Blogcart";
import { BlogPagination } from "@/components/sections/blog/BlogPagination";
import { redirect, notFound } from "next/navigation";

export const revalidate = 3600;

interface PaginatedBlogProps {
  params: Promise<{
    locale: Locale;
    number: string;
  }>;
}

const CONTENT = {
  en: {
    title: "Luxury Morocco Destinations Blog",
    page: "Page",
    description:
      "Travel stories, local insights and practical guides to Morocco. From charming riads to Sahara journeys, find ideas to make your next trip your own.",
    empty: "New travel stories are on their way. Check back soon.",
  },

  es: {
    title: "Blog de Luxury Morocco Destinations",
    page: "Página",
    description:
      "Historias de viaje, consejos locales y guías prácticas de Marruecos. Desde riads con encanto hasta rutas por el Sahara, encuentra ideas para preparar un viaje a tu medida.",
    empty: "Pronto compartiremos nuevas historias de viaje.",
  },
} satisfies Record<
  Locale,
  {
    title: string;
    page: string;
    description: string;
    empty: string;
  }
>;

function getBlogPageUrl(locale: Locale, page: number) {
  if (page === 1) {
    return locale === "en" ? "/blog" : `/${locale}/blog`;
  }

  return locale === "en"
    ? `/blog/page/${page}`
    : `/${locale}/blog/page/${page}`;
}

export async function generateMetadata({ params }: PaginatedBlogProps) {
  const { locale, number } = await params;

  const pageNumber = Number.parseInt(number, 10);

  if (!["en", "es"].includes(locale) || Number.isNaN(pageNumber) || pageNumber < 1 ) {
    return {};
  }

  const t = CONTENT[locale];

  return {
    title: `${t.title} - ${t.page} ${pageNumber}`,
    description: t.description,

    alternates: {
      canonical: getBlogPageUrl(locale, pageNumber),

      languages: {
        en: getBlogPageUrl("en", pageNumber),
        es: getBlogPageUrl("es", pageNumber),
        "x-default": getBlogPageUrl("en", pageNumber),
      },
    },
  };
}

export default async function PaginatedBlogPage({
  params,
}: PaginatedBlogProps) {
  const { locale, number } = await params;

  if (locale !== "en" && locale !== "es") {
    notFound();
  }

  const pageNumber = Number.parseInt(number, 10);

  if (Number.isNaN(pageNumber) || pageNumber < 1) {
    notFound();
  }
 
  if (pageNumber === 1) {
    redirect(locale === "en" ? "/blog" : "/es/blog");
  }

  const { cards, totalPages } = await getBlogCards(locale, pageNumber);

  if (pageNumber > totalPages && totalPages > 0) {
    notFound();
  }

  if (cards.length === 0 && pageNumber > 1) {
    notFound();
  }

  const t = CONTENT[locale];

  return (
    <section className="bg-background">
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
        {cards.length === 0 ? (
          <div className="rounded-2xl border border-border/60 bg-card p-12 text-center">
            <p className="font-medium text-text-secondary">{t.empty}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6 sm:gap-16">
            {cards.map((card) => (
              <Blogcart key={card.id} card={card} locale={locale} />
            ))}
          </div>
        )}
      </section>

      <BlogPagination
        locale={locale}
        currentPage={pageNumber}
        totalPages={totalPages}
      />
    </section>
  );
}
