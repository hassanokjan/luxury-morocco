import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getBlogCards } from "@/lib/wordpress/blogs";
import Blogcart from "@/components/sections/blog/Blogcart";
import { BlogPagination } from "@/components/sections/blog/BlogPagination";

const CONTENT = {
  en: {
    title: "Luxury Morocco Destinations Blog",
    description:
      "Travel stories, local insights and practical guides to Morocco. From charming riads to Sahara journeys, find ideas to make your next trip your own.",
    empty: "New travel stories are on their way. Check back soon.",
  },
  es: {
    title: "Blog de Luxury Morocco Destinations",
    description:
      "Historias de viaje, consejos locales y guías prácticas de Marruecos. Desde riads con encanto hasta rutas por el Sahara, encuentra ideas para preparar un viaje a tu medida.",
    empty: "Pronto compartiremos nuevas historias de viaje.",
  },
};

type BlogPageProps = {
  params: Promise<{ locale: string }>;
};

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
