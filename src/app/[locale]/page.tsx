import Faq from "@/components/sections/Home/Faq";
import Hero from "@/components/sections/Home/Hero";
import InstagramSection from "@/components/ui/Instgramme";
import Tripadvisor from "@/components/ui/Tripadvisor";
import { setRequestLocale } from "next-intl/server";
import { routing,getPathname } from "@/i18n/routing";
import { Metadata } from "next";
import {notFound} from "next/navigation";


export async function generateMetadata({params,}: {params: Promise<{ locale: string }>;}): Promise<Metadata> {

  const { locale } = await params;

  if (locale !== "en" && locale !== "fr" && locale !== "es") {
    notFound();
  }

  const metadataByLocale = {
    en: {
      title: "Luxury Morocco Destinations | Private Morocco Tours",
      description:"Plan your private Morocco tour with Luxury Morocco Destinations. From Marrakech and Fes to the Sahara, build a journey around your interests.",
      keywords: [
        "Luxury Morocco Destinations",
        "luxury Morocco tours",
        "private Morocco tours",
        "luxury desert tour morocco",
        "Morocco travel destinations",
        "Marrakech desert tours",
        "Merzouga desert tour",
        "tailor-made Morocco tours",
        "morocco destinations",
      ],
      ogLocale: "en_US",
      imageAlt: "Luxury Morocco Destinations — Morocco tours",
    },

    fr: {
      title: "Luxury Morocco Destinations | Voyages privés au Maroc",
      description:
        "Préparez votre voyage privé au Maroc avec Luxury Morocco Destinations. De Marrakech et Fès au Sahara, composez un itinéraire selon vos envies.",
      keywords: [
        "Luxury Morocco Destinations",
        "voyage de luxe au Maroc",
        "circuit privé au Maroc",
        "voyage sur mesure au Maroc",
        "destinations au Maroc",
        "circuit désert depuis Marrakech",
        "séjour à Merzouga",
      ],
      ogLocale: "fr_FR",
      imageAlt: "Luxury Morocco Destinations — Voyages au Maroc",
    },

    es: {
      title: "Luxury Morocco Destinations | Viajes privados a Marruecos",
      description:
        "Prepara tu viaje privado a Marruecos con Luxury Morocco Destinations. De Marrakech y Fez al Sahara, crea una ruta adaptada a tus intereses.",
      keywords: [
        "Luxury Morocco Destinations",
        "viajes de lujo a Marruecos",
        "tours privados por Marruecos",
        "viajes a medida a Marruecos",
        "destinos de Marruecos",
        "desierto desde Marrakech",
        "viaje a Merzouga",
      ],
      ogLocale: "es_ES",
      imageAlt: "Luxury Morocco Destinations — Viajes por Marruecos",
    },
  };

  const content = metadataByLocale[locale];

  const canonical = getPathname({
    locale,
    href: "/",
  });

  return {
    title: content.title,
    description: content.description,
    keywords: content.keywords,

    alternates: {
      canonical,
      languages: {
        en: getPathname({ locale: "en", href: "/" }),
        es: getPathname({ locale: "es", href: "/" }),
        "x-default": getPathname({ locale: "en", href: "/" }),
      },
    },

    openGraph: {
      type: "website",
      url: canonical,
      title: content.title,
      description: content.description,
      siteName: "Luxury Morocco Destinations",
      locale: content.ogLocale,
      alternateLocale: routing.locales
        .filter((language) => language !== locale)
        .map((language) => metadataByLocale[language].ogLocale),
      images: [
        {
          url: "/og-image.jpeg",
          width: 1200,
          height: 630,
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
          url: "/og-image.jpeg",
          alt: content.imageAlt,
        },
      ],
    },
  };
}


export default async function Home({params}: {params: {locale: string}}) {
  const { locale } =await params;
  setRequestLocale(locale);    

  return (
    <>
    <Hero />
    <Tripadvisor locale={locale} />
    <InstagramSection />
    <Faq locale={locale} />
    </>
  );
}
