import ContactForm from '@/components/sections/Contact/ContactForms';
import ContactInformation from '@/components/sections/Contact/ContactInformation';
import { Clock, MapPin, Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { ContactItem} from "@/type/contact";
import FindUs from '@/components/sections/Contact/FindUs';
import ContactHero from '@/components/sections/Contact/ContactHero';
import { type Locale } from "@/i18n/routing";

const WHATSAPP_NUMBER = "212667182357";


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
