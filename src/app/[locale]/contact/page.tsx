import ContactForm from '@/components/sections/Contact/ContactForms';
import ContactInformation from '@/components/sections/Contact/ContactInformation';
import React from 'react'
import { Clock, MapPin, Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { ContactItem} from "@/type/contact";
import FindUs from '@/components/sections/Contact/FindUs';

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





function page() {
  return (
    <>
      <section className="bg-background py-8 lg:py-26">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
          <ContactForm />
          <ContactInformation ITEMS={ITEMS} />
        </div>
        <FindUs />
      </section>
    </>
  );
}

export default page
