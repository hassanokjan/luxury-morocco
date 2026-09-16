import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, getPathname } from "@/i18n/routing";
import {
  MapPin,
  Calendar,
  Route,
  MessageCircle,
  Users,
  Shield,
} from "lucide-react";
import ContactForm from "@/components/sections/Contact/ContactForms";
import InstagramSection from "@/components/ui/Instgramme";

export async function generateMetadata({params,}: {params: Promise<{ locale: string }>;}): Promise<Metadata> {

  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CustomTour.meta" });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "luxurymoroccodestinations.com";

  const localizedPath = getPathname({
    locale,
    href: "/customize-your-tour",
  });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "morocco custom tours",
      "morocco destinations",
      "private morocco tour",
      "morocco trip planning",
      "custom tour",
      "marrakech itinerary",
      "custom marrakech to merzouga",
    ],
    alternates: {
      canonical: `${baseUrl}${localizedPath}`,
      languages: {
        en: `${baseUrl}/customize-your-tour`,
        es: `${baseUrl}/es/personaliza-tu-tour`,
        "x-default": `${baseUrl}/customize-your-tour`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      images: [{ url: "/og-image.jpeg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og-image.jpeg"],
    },
  };
}


const FEATURES = [
  { key: "guides", icon: MapPin },
  { key: "timing", icon: Calendar },
  { key: "itinerary", icon: Route },
  { key: "booking", icon: MessageCircle },
] as const;


const PROMISES = [
  { key: "private", icon: Users },
  { key: "flexible", icon: Calendar },
  { key: "support", icon: Shield },
  { key: "local", icon: MapPin },
] as const;

export default async function CustomTourPage({params,}: {params: Promise<{ locale: string }>;}) {

  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("CustomTour");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Luxury Morocco Destinations",
    url: "https://luxurymoroccodestinations.com",
    logo: "https://luxurymoroccodestinations.com/logo.png",
    image: "https://luxurymoroccodestinations.com/og-image.jpeg",
    description: t("meta.description"),
    telephone: "+212667182357",
    email: "info@luxurymoroccodestinations.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Medina",
      addressLocality: "casablanca",
      addressRegion: "Marrakech-Safi",
      postalCode: "20159",
      addressCountry: "MA",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Marrakech",
        sameAs: "https://en.wikipedia.org/wiki/Marrakech",
      },
      {
        "@type": "City",
        name: "Fes",
        sameAs: "https://en.wikipedia.org/wiki/Fez,_Morocco",
      },
      {
        "@type": "City",
        name: "Ouarzazate",
        sameAs: "https://en.wikipedia.org/wiki/Ouarzazate",
      },
      {
        "@type": "City",
        name: "Chefchaouen",
        sameAs: "https://en.wikipedia.org/wiki/Chefchaouen",
      },
      {
        "@type": "Country",
        name: "Morocco",
        sameAs: "https://en.wikipedia.org/wiki/Morocco",
      },
    ],
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "22:00",
    },
    sameAs: [],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Custom Morocco Tours",
      description: "Tailor-made tours for your perfect Morocco experience",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "Custom luxury Morocco Tour",
            description: "Tailor-made desert tour from Marrakech to Merzouga",
            touristType: ["Adventure tourism", "Cultural tourism"],
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "Marrakech to Merzouga 3 Days",
            description: "Classic 3-day Sahara desert tour via Ait Ben Haddou",
            touristType: ["Desert tourism", "Adventure tourism"],
          },
        },
      ],
    },
  };


  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-background py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
          {/* LEFT — Content */}
          <div className="order-2 lg:order-1">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary sm:text-sm">
              {t("hero.eyebrow")}
            </span>

            <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight text-heading sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>

            <div className="mt-8 border-l-2 border-primary pl-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted">
                {t("intro.eyebrow")}
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-heading sm:text-3xl">
                {t("intro.title")}
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-text-secondary sm:text-base">
                {t("intro.description")}
              </p>
            </div>

            <Link
              href="/contact"
              className="mt-7 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              {t("intro.cta")}
            </Link>
          </div>

          {/* RIGHT — Image */}
          <div className="order-1 lg:order-2">
            <div className="relative min-h-[360px] overflow-hidden rounded-xl sm:min-h-[430px] lg:min-h-[560px]">
              <Image
                src="/personnel/hassan5.jpeg"
                alt="Traditional Moroccan zellige mosaic tilework"
                fill
                priority
                quality={85}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <div className="relative aspect-[4/4] rounded-[4px] overflow-hidden">
              <Image
                src="/personnel/hassan4.jpeg"
                alt="Our local Berber guides with happy travelers in the Sahara desert"
                fill
                className="object-cover object-left"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={85}
              />
            </div>

            {/* Features */}
            <div className="space-y-4">
              {FEATURES.map(({ key, icon: Icon }) => (
                <div key={key} className="flex items-start gap-4">
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-heading sm:text-lg">
                      {t(`features.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary sm:text-base">
                      {t(`features.${key}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            {/* ── Colonne droite : What we guarantee ── */}
            <div>
              <h2 className="text-2xl font-bold text-primary sm:text-3xl">
                {t("promises.title")}
              </h2>

              <div className="mt-6 space-y-6">
                {PROMISES.map(({ key, icon: Icon }) => (
                  <div key={key} className="flex items-start gap-4">
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-heading sm:text-lg">
                        {t(`promises.items.${key}.title`)}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-text-secondary sm:text-base">
                        {t(`promises.items.${key}.description`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
      <section className="bg-background pb-12">
        <InstagramSection />
      </section>
    </>
  );
}
