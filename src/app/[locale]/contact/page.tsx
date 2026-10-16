import ContactForm from '@/components/sections/Contact/ContactForms';
import ContactInformation from '@/components/sections/Contact/ContactInformation';
import { Clock, MapPin, Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { ContactItem} from "@/type/contact";
import FindUs from '@/components/sections/Contact/FindUs';
import ContactHero from '@/components/sections/Contact/ContactHero';
import { type Locale, getPathname } from "@/i18n/routing";
import type { Metadata } from "next";


const WHATSAPP_NUMBER = "212667182357";
const SITE_URL = "https://luxurymoroccodestinations.com";
const SITE_NAME = "Luxury Morocco Destinations";

const META = {
  en: {
    title: "Contact Luxury Morocco Destinations | Plan Your Morocco Trip",
    description:
      "Contact Luxury Morocco Destinations to plan a private Morocco tour, Sahara journey, day trip or tailor-made itinerary. Reach us by WhatsApp, phone or email.",
  },
  es: {
    title:"Contacto Luxury Morocco Destinations | Planifica tu Viaje a Marruecos",
    description:
      "Contacta con Luxury Morocco Destinations para organizar un tour privado por Marruecos, una ruta por el Sahara, una excursión o un viaje a medida.",
  },
} as const;



export async function generateMetadata({params,}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en" && locale !== "es") {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const t = META[locale];

  const canonicalPath = getPathname({
    locale,
    href: "/contact",
  });

  const canonical = new URL(canonicalPath, SITE_URL).toString();

  const enUrl = new URL(
    getPathname({
      locale: "en",
      href: "/contact",
    }),
    SITE_URL,
  ).toString();

  const esUrl = new URL(
    getPathname({
      locale: "es",
      href: "/contact",
    }),
    SITE_URL,
  ).toString();

  return {
    title: t.title,

    description: t.description,

    alternates: {
      canonical,

      languages: {
        en: enUrl,

        es: esUrl,

        "x-default": enUrl,
      },
    },

    openGraph: {
      type: "website",
      title: t.title,
      description: t.description,
      url: canonical,
      siteName: SITE_NAME,
      locale: locale === "es" ? "es_ES" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_ES"],
    },

    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
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


const ITEMS: ContactItem[] = [
  {
    icon: <FaWhatsapp className="h-5 w-5" aria-hidden="true" />,
    label: "WhatsApp",
    value: "+212 6 67 18 23 57",
    note: "Chat with us for a quick reply!",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
  {
    icon: <Phone className="h-5 w-5" aria-hidden="true" />,
    label: "Phone",
    value: "+212 6 67 18 23 57",
    href: "tel:+212667182357",
  },
  {
    icon: <Mail className="h-5 w-5" aria-hidden="true" />,
    label: "Email",
    value: "info@luxurymoroccodestinations.com",
    href: "mailto:info@luxurymoroccodestinations.com",
  },
  {
    icon: <MapPin className="h-5 w-5" aria-hidden="true" />,
    label: "Location",
    value: "Casablanca, Morocco",
  },
  {
    icon: <Clock className="h-5 w-5" aria-hidden="true" />,
    label: "Available 7 Days a Week",
    value: "Monday – Sunday: 24/7",
  },
];

type PageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};



async function page({ params }: PageProps) {
  const { locale } = await params;

  return (
    <>
      <ContactHero numero={WHATSAPP_NUMBER} locale={locale} />
      <section className="bg-background pt-8 lg:pt-26">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
          <ContactForm />
          <ContactInformation ITEMS={ITEMS} />
        </div>
      </section>
      <FindUs />
    </>
  );
}

export default page
