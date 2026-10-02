import React from 'react'
import {
  getDayTripDetail,
  getAllDayTripSlugs,
  getAlternateDayTripSlugs,
} from "@/lib/wordpress/day-trips";
import { Locale } from '@/lib/wordpress/blogs';
import {notFound} from 'next/navigation';
import DayTripHero from '@/components/sections/DayTrips/DayTripHero';
import GuideProfileCard from '@/components/ui/GuideProfileCard';
import ContactForm from '@/components/sections/Contact/ContactForms';
import IncludesExcludes from '@/components/sections/Tours/IncludesExcludes';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import Itinerary from '@/components/sections/Tours/Itinerary';
import InstagramSection from '@/components/ui/Instgramme';
import Tripadvisor from '@/components/ui/Tripadvisor';
import DayTripHighlights from '@/components/sections/DayTrips/DayTripHighlights';
import Image from "next/image";
import RelatedDayTrips from '@/components/sections/DayTrips/RelatedDayTrips';
import type { Metadata } from "next";
import { routing,getPathname } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import DayTripJsonLd from '@/seo/DayTripJsonLd';
import { RegisterAlternateSlugs } from '@/components/RegisterAlternateSlugs';


export async function generateStaticParams() {
  const locales: Locale[] = ["en", "es"];

  const params = await Promise.all(
    locales.map(async (locale) => {
      const slugs = await getAllDayTripSlugs(locale);

      return slugs.map((slug) => ({
        locale,
        slug,
      }));
    }),
  );

  return params.flat();
}


export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const dayTrip = await getDayTripDetail(locale, slug);

  if (!dayTrip) {
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
  const alternateSlugs = await getAlternateDayTripSlugs(
    locale,
    dayTrip.slug,
    dayTrip.translationId,
  );

  /*
   * Canonical
   */
  const canonical = getPathname({
    locale,

    href: {
      pathname: "/day-trips/[slug]",

      params: {
        slug: dayTrip.slug,
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
        pathname: "/day-trips/[slug]",

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
        pathname: "/day-trips/[slug]",

        params: {
          slug: alternateSlugs.es,
        },
      },
    });
  }

  const keywords = dayTrip.keywords
    ? dayTrip.keywords
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean)
    : [];

  const title = dayTrip.seoTitle || dayTrip.title;

  const description = dayTrip.seoDescription || dayTrip.description;

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

      images: dayTrip.image
        ? [
            {
              url: dayTrip.image,

              alt: dayTrip.imageAlt || dayTrip.title,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: dayTrip.image ? [dayTrip.image] : [],
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

async function page({ params }: PageProps): Promise<React.JSX.Element> {
  const { locale, slug } = await params;

  const dayTrip = await getDayTripDetail(locale, slug);

  if (!dayTrip) {
     notFound();
  }

  const alternateSlugs = await getAlternateDayTripSlugs(
    locale,
    dayTrip.slug,
    dayTrip.translationId,
  );

  return (
    <section className="bg-background">
      <RegisterAlternateSlugs slugs={alternateSlugs} />
      <DayTripJsonLd dayTrip={dayTrip} locale={locale} />
      <DayTripHero dayTrip={dayTrip} locale={locale} />
      <section className="mx-auto my-4 max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="min-w-0 lg:col-span-8">
            {dayTrip?.overview && (
              <div className="blog-content mt-2 sm:mt-4">
                <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
                  {dayTrip.overview}
                </ReactMarkdown>
              </div>
            )}

            {dayTrip?.highlights && (
              <DayTripHighlights
                highlights={dayTrip.highlights}
                locale={locale}
              />
            )}

            <Itinerary itinerary={dayTrip.itinerary} locale={locale} />

            <IncludesExcludes
              includes={dayTrip.includes}
              excludes={dayTrip.excludes}
              locale={locale}
            />

            {dayTrip.image2 && (
              <figure className="mt-8 overflow-hidden rounded-[28px]">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                  <Image
                    src={dayTrip.image2}
                    alt={dayTrip.image2Alt || dayTrip.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                  />
                </div>

                <figcaption className="mt-3 text-xs leading-5 text-muted-foreground">
                  {locale === "es"
                    ? "Una mirada más cercana al paisaje y la arquitectura que forman parte de esta excursión."
                    : "A closer look at the landscapes and architecture that shape this day trip."}
                </figcaption>
              </figure>
            )}

            {dayTrip?.whyChoose && (
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
                    {dayTrip.whyChoose}
                  </ReactMarkdown>
                </div>
              </section>
            )}
          </div>

          {/* CONTACT */}
          <aside className="min-w-0 lg:sticky lg:top-24 lg:col-span-4">
            <div className="space-y-8">
              <ContactForm />
              <GuideProfileCard locale={locale} />
            </div>
          </aside>
        </div>
      </section>

      <RelatedDayTrips
        ids={dayTrip.relatedTripIds}
        currentId={dayTrip.id}
        locale={locale}
      />

      <section className=" pb-12">
        <Tripadvisor locale={locale} />
        <InstagramSection />
      </section>
    </section>
  );
}

export default page
