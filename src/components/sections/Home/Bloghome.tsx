import Image from "next/image";

import { Link } from "@/i18n/routing";

import { getBlogCards, type Locale } from "@/lib/wordpress/blogs";

interface HomeBlogSectionProps {
  locale: Locale;
}

const SECTION_TEXTS: Record<Locale,
  {
    title: string;
    viewAll: string;
    readTime: string;
  }
> = {
  en: {
    title: "Stories & Insights from Morocco",
    viewAll: "Browse the journal",
    readTime: "read",
  },

  es: {
    title: "Historias e inspiración de Marruecos",
    viewAll: "Ver el diario",
    readTime: "de lectura",
  },
};


function formatBlogDate(dateString: string, locale: Locale): string {
  if (!dateString) return "";

  const dateOnly = dateString.split("T")[0];
  const date = new Date(`${dateOnly}T12:00:00Z`);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export default async function HomeBlogSection({locale,}: HomeBlogSectionProps): Promise<React.JSX.Element | null> {

  const { cards } = await getBlogCards(locale, 1, 4);

  const texts = SECTION_TEXTS[locale] ?? SECTION_TEXTS.en;

  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <section className="bg-background pb-3 pt-8 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-8 grid grid-cols-1 items-end gap-6 sm:mb-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-heading lg:text-3xl">
              {texts.title}
            </h2>

            <Link
              href="/blog"
              locale={locale}
              className="group mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              <span>{texts.viewAll}</span>

              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div
          className=" -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-none
            sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0
            lg:grid-cols-4 lg:gap-8
          "
        >
          {cards.map((card) => (
            <Link
              key={card.id}
              href={{
                pathname: "/blog/[slug]",
                params: {
                  slug: card.slug,
                },
              }}
              locale={locale}
              className="
                group block h-full min-w-[90%] snap-start

                sm:min-w-0
              "
            >
              <article
                className="
                  flex h-full flex-col
                  rounded-xl border border-border/70 bg-card p-3 shadow-sm
                  sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none
                "
              >
                {/* IMAGE */}
                <div
                  className="
                    relative aspect-[16/11] w-full overflow-hidden rounded-xl bg-muted
                    sm:aspect-[4/3]
                  "
                >
                  <Image
                    src={card.coverImage}
                    alt={card.altImage || card.title}
                    fill
                    sizes="
                      (min-width: 1280px) 25vw,
                      (min-width: 1024px) 33vw,
                      (min-width: 640px) 50vw,
                      84vw
                    "
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />

                  {/* DATE */}
                  <div className="absolute left-3 top-3">
                    <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white backdrop-blur-md">
                      <svg
                        className="h-3.5 w-3.5 text-white/90"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="9.5" />

                        <polyline points="12 6.5 12 12 15.5 14" />
                      </svg>

                      <span>{formatBlogDate(card.date, locale)}</span>
                    </div>
                  </div>

                  {/* ARROW */}
                  <div
                    className="
                      absolute bottom-3 right-3
                      flex h-10 w-10 items-center justify-center
                      rounded-full bg-white/95 text-heading shadow-lg

                      translate-y-0 opacity-100

                      transition-all duration-300

                      sm:translate-y-2 sm:opacity-0
                      sm:group-hover:translate-y-0
                      sm:group-hover:opacity-100
                    "
                  >
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14M13 6l6 6-6 6"
                      />
                    </svg>
                  </div>
                </div>

                {/* CONTENT */}
                <div
                  className="
                    flex flex-1 flex-col px-1 pb-1 pt-3

                    sm:px-0 sm:pb-0 sm:pt-2
                  "
                >
                  <h3 className="line-clamp-2 min-h-[52px] font-heading text-[19px] font-semibold leading-[1.35] tracking-[-0.015em] text-heading transition-colors duration-300 group-hover:text-primary">
                    {card.title}
                  </h3>

                  <p className="mt-2.5 line-clamp-2 min-h-[48px] text-[14px] leading-6 text-text-secondary">
                    {card.description}
                  </p>

                  {/* READ ARTICLE */}
                  <div className="mt-auto flex items-center gap-2 pt-5 text-xs font-semibold uppercase tracking-[0.12em] text-primary transition-colors duration-300 group-hover:text-primary-hover">
                    <span>
                      {locale === "es" ? "Leer artículo" : "Read article"}
                    </span>

                    <svg
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14M13 6l6 6-6 6"
                      />
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
