import { ArrowRight, Compass} from "lucide-react";
import Image from "next/image";
import { Link, routing, getPathname } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactCta from "@/components/ui/Contactitem";
import { Check } from "lucide-react";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";


export async function generateMetadata({params,}: {params: Promise<{ locale: string }>;}): Promise<Metadata> {

  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const metadataByLocale = {
    en: {
      title: "About Us | Luxury Morocco Destinations",
      description:
        "Meet Hassan, founder of Luxury Morocco Destinations, and learn about our approach to private Morocco tours, personal service and flexible travel.",
      keywords: [
        "Luxury Morocco Destinations",
        "about Luxury Morocco Destinations",
        "private Morocco tours",
        "tailor-made Morocco travel",
        "luxury Morocco tours",
      ],
      ogLocale: "en_US",
      imageAlt: "Hassan, founder of Luxury Morocco Destinations",
    },

    es: {
      title: "Sobre nosotros | Luxury Morocco Destinations",
      description:
        "Conoce a Hassan, fundador de Luxury Morocco Destinations, y nuestra forma de organizar viajes privados por Marruecos con atención personal y flexibilidad.",
      keywords: [
        "Luxury Morocco Destinations",
        "sobre Luxury Morocco Destinations",
        "tours privados por Marruecos",
        "viajes a medida a Marruecos",
        "viajes de lujo a Marruecos",
      ],
      ogLocale: "es_ES",
      imageAlt: "Hassan, fundador de Luxury Morocco Destinations",
    },
  };

  const content = metadataByLocale[locale];

  const canonical = getPathname({
    locale,
    href: "/about",
  });

  return {
    title: content.title,
    description: content.description,
    keywords: content.keywords,

    alternates: {
      canonical,
      languages: {
        en: getPathname({ locale: "en", href: "/about" }),
        es: getPathname({ locale: "es", href: "/about" }),
        "x-default": getPathname({ locale: "en", href: "/about" }),
      },
    },

    openGraph: {
      type: "website",
      siteName: "Luxury Morocco Destinations",
      title: content.title,
      description: content.description,
      url: canonical,
      locale: content.ogLocale,
      alternateLocale: routing.locales
        .filter((language) => language !== locale)
        .map((language) => metadataByLocale[language].ogLocale),
      images: [
        {
          url: "/personnel/hassan1.jpeg",
          alt: content.imageAlt,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: [
        {
          url: "/personnel/hassan1.jpeg",
          alt: content.imageAlt,
        },
      ],
    },
  };
}


const CORE_VALUE_KEYS = [
  "safety",
  "flexibility",
  "atmosphere",
  "vehicles",
  "service",
  "recommendations",
  "care",
] as const;


export default async function AboutUs({params,}: {params: Promise<{ locale: string }>;}): Promise<React.JSX.Element> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "AboutUs" });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://luxurymoroccodestinations.com";

  const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        url: new URL(
          getPathname({ locale, href: "/about" }),
          baseUrl,
        ).toString(),
        name: t("hero.title"),
        description: t("hero.description"),
        inLanguage: locale,
        image: new URL("/images/mer1.webp", baseUrl).toString(),

        mainEntity: {
          "@type": "Organization",
          "@id": new URL("/#organization", baseUrl).toString(),
          name: "Luxury Morocco Destinations",
          url: new URL("/", baseUrl).toString(),

          founder: {
            "@type": "Person",
            "@id": new URL("/#founder", baseUrl).toString(),
            name: t("story.founder"),
            jobTitle: t("commitment.founderRole"),
            image: new URL("/personnel/hassan1.jpeg", baseUrl).toString(),
          },
        },
      }


  return (
    <>
    {jsonLd && (
       <script
         type="application/ld+json"
            dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
     )}
    <section className="bg-background">
      {/* HERO */}
      <section className="relative min-h-[420px] overflow-hidden sm:min-h-[480px]">
        <Image
          src="/images/mer1.webp"
          alt={t("hero.imageAlt")}
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/25 to-black/15"
        />

        <div className="relative z-10 mx-auto flex min-h-[420px] max-w-7xl items-center px-4 sm:min-h-[480px] sm:px-6 lg:min-h-[540px] lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>

            <p className="mt-5 max-w-2xl text-xl leading-9 text-white sm:text-base">
              {t("hero.description")}
            </p>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="bg-background py-10">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
          {/* LEFT — STORY */}
          <div>
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                {t("story.eyebrow")}
              </span>
            </div>

            <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight text-heading sm:text-4xl">
              {t("story.title")}
              <span className="text-primary">
                {" "}
                {t("story.titleHighlight")}
              </span>
            </h2>

            <div className="mt-7 max-w-2xl space-y-5 text-sm leading-8 text-text-secondary sm:text-base">
              <p>
                <strong className="font-semibold text-heading">
                  Luxury Morocco Destinations
                </strong>{" "}
                {t("story.introduction")}
              </p>

              <p>
                {t("story.founderIntro")}{" "}
                <strong className="font-semibold text-heading">
                  {t("story.founder")}
                </strong>
                {t("story.founderDescription")}
              </p>

              <p>
                {t("story.journeysIntro")}{" "}
                <strong className="font-semibold text-heading">
                  {t("story.journeysHighlight")}
                </strong>{" "}
                {t("story.journeysDescription")}
              </p>

              <p>
                {t("story.luxury")}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tours"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover"
              >
                {t("story.toursButton")}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>

              <Link
                href="/customize-your-tour"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-heading transition-colors hover:border-primary hover:text-primary"
              >
                {t("story.customizeButton")}
              </Link>
            </div>
          </div>


          {/* RIGHT — HASSAN + COMMITMENT */}
          <div className="overflow-hidden pt-12">
            {/* Image */}
            <div className="relative aspect-[4/4]">
              <Image
                src="/personnel/hassan1.jpeg"
                alt={t("story.imageAlt")}
                fill
                quality={85}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top rounded-[3px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* OUR COMMITMENT */}
      <section className="bg-background py-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* LEFT — CLIENT IMAGE */}
          <div className="relative overflow-hidden rounded-[3px]">
            <div className="relative aspect-[4/3]">
              <Image
                src="/personnel/hassan4.jpeg"
                alt={t("commitment.imageAlt")}
                fill
                quality={85}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* RIGHT — PERSONAL COMMITMENT */}
          <div className="relative overflow-hidden rounded-[3px] bg-secondary p-6">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gold/10 blur-3xl" />

            <div className="relative">
              <h3 className="mt-5 max-w-xl text-2xl font-semibold leading-tight text-white sm:text-3xl">
                {t("commitment.title")}
                <span className="block text-gold">{t("commitment.titleHighlight")}</span>
              </h3>

              <p className="mt-3 max-w-xl text-base leading-8 text-white/80">
                {t("commitment.description")}
              </p>

              <p className="mt-2 max-w-xl text-base leading-8 text-white/70">
                {t("commitment.priority")}
              </p>

              <div className="mt-6 flex items-center justify-between gap-5 pt-5">
                <div>
                  <p className="text-base font-semibold text-white">Hassan</p>

                  <p className="mt-1 text-sm text-white/55">
                    {t("commitment.founderRole")}
                  </p>
                </div>

                <span className="font-heading text-5xl leading-none text-gold/80">
                  “
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="">
            <h2 className="text-3xl font-semibold leading-tight text-primary sm:text-4xl lg:text-5xl">
              {t("values.title")}
            </h2>
          </div>

          {/* Values */}
          <div className="mx-auto mt-10 max-w-7xl">
            <ul className="space-y-4">
              {CORE_VALUE_KEYS.map((value) => (
                <li key={t("values.items." + value)} className="flex items-start gap-4 pb-4">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>

                  <p className="text-base leading-7 text-text-main sm:text-xl font-semibold">
                    {t("values.items." + value)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>



      <ContactCta
        title={t("contact.title")}
        description={t("contact.description")}
        buttonLabel={t("contact.buttonLabel")}
      />
    </section>
  </>
  );
}

