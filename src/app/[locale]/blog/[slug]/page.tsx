import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Link, routing } from "@/i18n/routing";
import { getAllBlogSlugs, getAlternateSlugs, getBlogCards, getBlogDetail, Locale, } from "@/lib/wordpress/blogs";
import ContactForm from "@/components/sections/Contact/ContactForms";
import TravelExpertSection from "@/components/ui/TravelExpertSection";
import { RegisterAlternateSlugs } from "@/components/RegisterAlternateSlugs";
import GuideProfileCard from "@/components/ui/GuideProfileCard";
import { getPathname } from "@/i18n/routing";
import { Metadata } from "next";
import { hasLocale } from "next-intl";
import SeoBlogJsonLd from "@/seo/BlogJsonLd";

export async function generateStaticParams() {
  const locales: Locale[] = ["en", "es"];

  const params = await Promise.all(
    locales.map(async (locale) => {
      const slugs = await getAllBlogSlugs(locale);

      return slugs.map((slug) => ({
        locale,
        slug,
      }));
    }),
  );

  return params.flat();
}


export async function generateMetadata({params,}: BlogDetailPageProps): Promise<Metadata> {

  const { locale, slug } = await params;

    if (!hasLocale(routing.locales, locale)) {
      return {
        robots: {
          index: false,
          follow: false,
        },
      };
    }

  const [blogDetail, alternateSlugs] = await Promise.all([
    getBlogDetail(locale, slug),
    getAlternateSlugs(locale, slug),
  ]);

   if (!blogDetail) {
     return {
       robots: {
         index: false,
         follow: false,
       },
     };
   }

  // URL canonique de l'article actuel
  const canonical = getPathname({
    locale,
    href: {
      pathname: "/blog/[slug]",
      params: {
        slug: blogDetail.slug,
      },
    },
  });

  const languages: Record<string, string> = {};

  // Version anglaise
  if (alternateSlugs?.en) {
    languages.en = getPathname({
      locale: "en",
      href: {
        pathname: "/blog/[slug]",
        params: {
          slug: alternateSlugs.en,
        },
      },
    });

    languages["x-default"] = languages.en;
  }

  // Version espagnole
  if (alternateSlugs?.es) {
    languages.es = getPathname({
      locale: "es",
      href: {
        pathname: "/blog/[slug]",
        params: {
          slug: alternateSlugs.es,
        },
      },
    });
  }

  const keywords = blogDetail.keywords ? blogDetail.keywords.split(",").map((keyword) => keyword.trim()).filter(Boolean) : [];

  return {
    title: blogDetail.seoTitle || blogDetail.title,
    description: blogDetail.seoDescription || blogDetail.description,
    keywords,
    authors: [
      {
        name: "Luxury Morocco Destinations",
      },
    ],

    alternates: {
      canonical,
      languages,
    },

    openGraph: {
      type: "article",
      title: blogDetail.seoTitle || blogDetail.title,
      description: blogDetail.seoDescription || blogDetail.description,
      url: canonical,
      siteName: "Luxury Morocco Destinations",
      locale: locale === "es" ? "es_ES" : "en_US",
      publishedTime: blogDetail.date,
      images: blogDetail.coverImage ? [
            {
              url: blogDetail.coverImage,
              alt: blogDetail.altImage || blogDetail.title,
            },
          ] : [],
    },

    twitter: {
      card: "summary_large_image",
      title: blogDetail.seoTitle || blogDetail.title,
      description: blogDetail.seoDescription || blogDetail.description,
      images: blogDetail.coverImage ? [blogDetail.coverImage] : [],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}


type BlogDetailPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { locale, slug } = await params;

  if (locale !== "en" && locale !== "es") {
    notFound();
  }

  setRequestLocale(locale);

  const [blogDetail, recentBlogs, alternateSlugs] = await Promise.all([
    getBlogDetail(locale, slug),
    getBlogCards(locale, 1, 4),
    getAlternateSlugs(locale, slug)
  ]);

  if (!blogDetail) {
    notFound();
  }

  const dateOnly = blogDetail.date.split("T")[0];
  const date = new Date(`${dateOnly}T12:00:00Z`);

  const formattedDate = Number.isNaN(date.getTime())
    ? ""
    : new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(date);


  return (
    <>
      <SeoBlogJsonLd locale={locale} blog={blogDetail} />
      <RegisterAlternateSlugs slugs={alternateSlugs} />
      <section className="relative w-full bg-background">
        <section className="relative w-full overflow-hidde py-20 lg:py-22">
          {blogDetail.coverImage && (
            <Image
              src={blogDetail.coverImage}
              alt={blogDetail.altImage || blogDetail.title}
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover object-center"
            />
          )}

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/10"
          />

          <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-left text-white">
            <div className="max-w-3xl">
              <Link
                href="/blog"
                locale={locale}
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-200 hover:text-white transition-colors"
              >
                <span aria-hidden="true">←</span>
                blogs
              </Link>

              <div className="mb-4">
                <span className="inline-block rounded-full bg-primary backdrop-blur-md px-3.5 py-2 text-[11px] font-bold uppercase tracking-widest text-slate-100 border border-white/15">
                  luxury morocco destinations
                </span>
              </div>

              <h1 className="font-serif text-3xl font-medium sm:text-4xl lg:text-5xl leading-tight sm:leading-tight lg:leading-snug text-white drop-shadow-md mb-4">
                {blogDetail.title}
              </h1>

              {blogDetail.description && (
                <p className="max-w-2xl text-sm sm:text-xl text-shadow-text-secondary font-normal leading-relaxed mb-6 drop-shadow-sm">
                  {blogDetail.description}
                </p>
              )}

              {formattedDate && (
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300 font-medium">
                  <time dateTime={dateOnly}>{formattedDate}</time>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="bg-background py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* ARTICLE */}
              <article className="min-w-0 lg:col-span-8">
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{
                    __html: blogDetail.content,
                  }}
                />
              </article>

              {/* SIDEBAR */}
              <aside
                aria-label="Plan your Morocco journey"
                className="lg:col-span-4 lg:self-start lg:sticky lg:top-24 lg:h-fit"
              >
                <div className="space-y-8">
                  <ContactForm />
                  <GuideProfileCard locale={locale} />
                  <div className="mt-10">
                    {/* Header */}
                    <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                          Travel Journal
                        </span>

                        <h3 className="mt-1 font-heading text-2xl font-semibold leading-tight text-heading">
                          More Blogs
                        </h3>
                      </div>

                      <Link
                        href={`/blog`}
                        locale={locale}
                        className="group inline-flex items-center gap-1.5 pb-1 text-xs font-semibold text-text-muted transition-colors hover:text-primary"
                      >
                        View all
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>

                    {/* Blog list */}
                    <div className="divide-y divide-border">
                      {recentBlogs.cards.map((item) => (
                        <Link
                          key={item.id || item.slug}
                          href={{
                            pathname: "/blog/[slug]",
                            params: {
                              slug: item.slug,
                            },
                          }}
                          className="group flex gap-4 py-5 first:pt-5"
                        >
                          {/* Image */}
                          <div className="relative h-[92px] w-[112px] shrink-0 overflow-hidden rounded-lg bg-muted">
                            <Image
                              src={item.coverImage}
                              alt={item.altImage || item.title}
                              fill
                              sizes="112px"
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                            />

                            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
                          </div>

                          {/* Content */}
                          <div className="min-w-0 flex flex-1 flex-col justify-center">
                            <span className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                              {item.date || "Morocco Travel Tips"}
                            </span>

                            <h4 className="line-clamp-2 font-heading text-lg font-semibold leading-[1.25] text-heading transition-colors duration-200 group-hover:text-primary">
                              {item.title}
                            </h4>

                            <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-text-muted transition-colors group-hover:text-heading">
                              Read article
                              <span className="transition-transform duration-300 group-hover:translate-x-1">
                                →
                              </span>
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
            <TravelExpertSection locale={locale} />
          </div>
        </section>
      </section>
    </>
  );
}
