import { notFound } from "next/navigation";
import { getTourDetail, getAllTourSlugs ,getAlternateTourSlugs, getToursByIds} from "@/lib/wordpress/tours";
import type { Locale } from "@/i18n/routing";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import ContactForm from "@/components/sections/Contact/ContactForms";
import GuideProfileCard from "@/components/ui/GuideProfileCard";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import Highlits from "@/components/sections/Tours/Highlits";
import InstagramSection from "@/components/ui/Instgramme";
import Tripadvisor from "@/components/ui/Tripadvisor";
import Map from "@/components/sections/Tours/Map";
import Itinerary from "@/components/sections/Tours/Itinerary";
import Faqs from "@/components/sections/Tours/Faqs";
import IncludesExcludes from "@/components/sections/Tours/IncludesExcludes";
import Gallery from "@/components/sections/Tours/Gallery";
import { Metadata } from "next";
import { getPathname, routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { RegisterAlternateSlugs } from "@/components/RegisterAlternateSlugs";
import RelatedTours from "@/components/sections/Tours/RelatedTours";


export async function generateStaticParams() {
  const locales: Locale[] = ["en", "es"];

  const params = await Promise.all(
    locales.map(async (locale) => {
      const slugs = await getAllTourSlugs(locale);

      return slugs.map((slug) => ({
        locale,
        slug,
      }));
    }),
  );

  return params.flat();
}



export async function generateMetadata({params,}: PageProps): Promise<Metadata> {

  const { locale, slug } = await params;


  if (!hasLocale(routing.locales, locale)) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const tour = await getTourDetail(locale, slug);

  if (!tour) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  /*
   * Traductions EN / ES
   */
  const alternateSlugs = await getAlternateTourSlugs(
    locale,
    tour.slug,
    tour.translationId,
  );

  /*
   * Canonical
   */
  const canonical = getPathname({
    locale,
    href: {
      pathname: "/tours/[slug]",
      params: {
        slug: tour.slug,
      },
    },
  });

  /*
   * hreflang
   */
  const languages: Record<string, string> = {};

  if (alternateSlugs?.en) {
    languages.en = getPathname({
      locale: "en",
      href: {
        pathname: "/tours/[slug]",
        params: {
          slug: alternateSlugs.en,
        },
      },
    });

    languages["x-default"] = languages.en;
  }

  if (alternateSlugs?.es) {
    languages.es = getPathname({
      locale: "es",
      href: {
        pathname: "/tours/[slug]",
        params: {
          slug: alternateSlugs.es,
        },
      },
    });
  }


  const keywords = tour.keywords ? tour.keywords.split(",").map((keyword) => keyword.trim()).filter(Boolean) : [];

  const title = tour.seoTitle || tour.title;

  const description = tour.seoDescription || tour.description;

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical,
      languages,
    },

    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      siteName: "Luxury Morocco Destinations",
      locale: locale === "es" ? "es_ES" : "en_US",
      images: tour.image
        ? [
            {
              url: tour.image,

              alt: tour.imageAlt || tour.title,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: tour.image ? [tour.image] : [],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

type PageProps = {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;

  const tour = await getTourDetail(locale, slug);

  if (!tour) {
    notFound();
  }


 const [alternateSlugs, relatedTours] = await Promise.all([
   getAlternateTourSlugs(locale, tour.slug, tour.translationId),

   getToursByIds(locale, tour.relatedTourIds),
 ]);

  return (
    <>
      <RegisterAlternateSlugs slugs={alternateSlugs} />
      <section className="min-h-screen bg-background">
        <section
          aria-labelledby="tour-title"
          className="relative isolate flex min-h-[430px] w-full items-end overflow-hidden bg-secondary lg:min-h-[530px]"
        >
          <Image
            src={tour.image || "/images/hero.jpg"}
            alt={tour.imageAlt || tour.title || "Morocco tour"}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* IMAGE OVERLAY */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/15"
          />

          <div className="relative mx-auto w-full max-w-7xl px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8 lg:py-16">
            <nav
              aria-label={locale === "es" ? "Ruta de navegación" : "Breadcrumb"}
              className="mb-8 text-xs text-white"
            >
              <ol className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <li>
                  <Link
                    href="/"
                    locale={locale}
                    className="transition-colors hover:text-white"
                  >
                    {locale === "es" ? "Inicio" : "Home"}
                  </Link>
                </li>

                <li aria-hidden="true" className="text-white/40">
                  /
                </li>

                <li>
                  <Link
                    href="/tours"
                    locale={locale}
                    className="transition-colors hover:text-white"
                  >
                    Tours
                  </Link>
                </li>

                <li aria-hidden="true" className="text-white/40">
                  /
                </li>

                <li aria-current="page" className="font-medium text-white">
                  {tour.title}
                </li>
              </ol>
            </nav>

            <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-14">
              {/* TOUR INTRO */}
              <div>
                <h1
                  id="tour-title"
                  className="max-w-3xl text-balance text-3xl font-semiboldbold lg:font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
                >
                  {tour.title}
                </h1>

                {tour.description && (
                  <p className="mt-2 sm:mt-4 max-w-2xl text-[18px] leading-8 text-white/85 sm:text-base">
                    {tour.description}
                  </p>
                )}

                {(tour.departure || tour.duration) && (
                  <dl className="mt-4 sm:mt-8 flex flex-wrap gap-x-10 gap-y-5 pt-6">
                    {tour.departure && (
                      <div>
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/65">
                          {locale === "es"
                            ? "Ciudad de salida"
                            : "Departure city"}
                        </dt>

                        <dd className="mt-2 text-base font-medium text-white">
                          {tour.departure}
                        </dd>
                      </div>
                    )}

                    {tour.duration && (
                      <div>
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/65">
                          {locale === "es" ? "Duración" : "Duration"}
                        </dt>

                        <dd className="mt-2 text-base font-medium text-white">
                          {tour.duration}
                        </dd>
                      </div>
                    )}
                  </dl>
                )}
              </div>

              <div className="flex justify-start">
                <Link
                  href="/contact"
                  locale={locale}
                  className=" group inline-flex min-h-16 items-center gap-5 rounded-full border border-white/10 bg-primary py-2 pl-6 pr-2 text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover  focus-visible:outline-2  focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <span className="flex flex-col text-left">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
                      {locale === "es"
                        ? "Planifica tu viaje"
                        : "Plan your journey"}
                    </span>

                    <span className="mt-0.5 text-sm font-semibold tracking-[-0.01em] text-primary-foreground sm:text-[15px]">
                      {locale === "es"
                        ? "Solicitar presupuesto gratis"
                        : "Get a free quote"}
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className=" flex size-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-primary-foreground ring-1 ring-inset ring-white/15 transition-all duration-300 group-hover:rotate-3 group-hover:bg-white/20 "
                  >
                    <ArrowUpRight className=" size-[18px]  transition-transform duration-300  group-hover:translate-x-0.5  group-hover:-translate-y-0.5 " />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto my-4 max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-6">
            <div className="min-w-0 lg:col-span-8">
              <h2 className="text-2xl font-semibold leading-tight tracking-tight text-primary/90 sm:text-4xl">
                {tour?.overviewTitle}
              </h2>

              {tour?.overview && (
                <div className="blog-content mt-2 sm:mt-4">
                  <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
                    {tour.overview}
                  </ReactMarkdown>
                </div>
              )}

              {tour?.highlights && (
                <Highlits highlights={tour.highlights} locale={locale} />
              )}

              <Itinerary itinerary={tour.itinerary} locale={locale} />

              {tour?.whyChooseText && (
                <section className="mt-6" aria-labelledby="why-choose-heading">
                  <h2
                    id="why-choose-heading"
                    className="text-2xl font-semibold leading-tight tracking-tight text-primary/90 sm:text-4xl"
                  >
                    {locale === "es"
                      ? "Los momentos que definen este viaje"
                      : "The moments that define this journey"}
                  </h2>

                  <div className="blog-content mt-1 sm:mt-4">
                    <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
                      {tour.whyChooseText}
                    </ReactMarkdown>
                  </div>
                </section>
              )}

              <IncludesExcludes
                includes={tour.includes}
                excludes={tour.excludes}
                locale={locale}
              />
            </div>

            {/* CONTACT */}
            <aside className="min-w-0 lg:sticky lg:top-24 lg:col-span-4">
              <div className="space-y-8">
                <ContactForm />
                <GuideProfileCard locale={locale} />
              </div>
            </aside>
          </div>
          <Gallery tour={tour} locale={locale} />
          <Map tour={tour.mapUrl} locale={locale} />
          <Faqs faqs={tour.faqs} locale={locale} />
          <RelatedTours tours={relatedTours} locale={locale} />
        </section>

        <section className=" pb-12">
          <Tripadvisor locale={locale} />
          <InstagramSection />
        </section>
      </section>
    </>
  );
}
