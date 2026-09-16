import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import ReseauxSociaux from "@/components/ui/ReseauxSociaux";

const CONTACT = {
  phone: "+212667182357",
  phoneHref: "tel:+212667182357",
  whatsapp: "https://wa.me/212667182357",
  email: "luxurymoroccodestinations@gmail.com",
  emailHref: "mailto:luxurymoroccodestinations@gmail.com",
} as const;


const FOOTER_TOURS = [
  { href: "/tours/from/marrakech" as const, key: "marrakech" },
  { href: "/tours/from/fes" as const, key: "fes" },
  { href: "/tours/from/casablanca" as const, key: "casablanca" },
  { href: "/tours/from/tangier" as const, key: "tangier" },
  { href: "/tours/from/agadir" as const, key: "agadir" },
  { href: "/tours/from/Errachidia" as const, key: "Errachidia" },
] as const;


const FOOTER_EXPLORE = [
  { href: "/day-trips" as const, key: "dayTrips" },
  { href: "/tours" as const, key: "tours" },
  { href: "/customize-your-tour" as const, key: "customTour" },
  { href: "/blog" as const, key: "blog" },
] as const;

const FOOTER_COMPANY = [
  { href: "/about" as const, key: "about" },
  { href: "/about/morocco_tourist" as const, key: "aboutMorocco" },
  { href: "/contact" as const, key: "contact" },
] as const;


export default async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="w-full bg-footer text-footer-foreground">
      {/* ── Main Footer Grid ── */}
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1.4fr_1.2fr] lg:gap-8">
          {/* ── Brand ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="Tours Marrakech Desert home">
              <Image
                src="/logo.png"
                alt="Luxury Morocco Destinations Logo"
                width={160}
                height={40}
                className="h-auto w-28 sm:w-40"
              />
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-7 text-footer-foreground">
              {t("brand.description")}
            </p>

            <div className="mt-6">
              <ReseauxSociaux />
            </div>
          </div>

          {/* ── Popular Tours ── */}
          <nav aria-label={t("tours.title")}>
            <h3 className="text-[14px] font-bold uppercase tracking-[0.2em] text-footer-foreground">
              {t("tours.title")}
            </h3>
            <ul className="mt-4 space-y-1">
              {FOOTER_TOURS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={{
                      pathname: "/tours/from/[city]",
                      params: { city: item.key },
                    }}
                    className="inline-flex py-1.5 text-sm text-footer-foreground transition-colors hover:text-primary"
                  >
                    {t(`tours.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid grid-cols-2 gap-6 sm:gap-10">
            {/* ── Explore ── */}
            <nav aria-label={t("explore.title")}>
              <h3 className="text-[14px] font-bold uppercase tracking-[0.2em] text-footer-foreground">
                {t("explore.title")}
              </h3>

              <ul className="mt-4 space-y-1">
                {FOOTER_EXPLORE.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className="inline-flex py-1.5 text-sm text-footer-foreground transition-colors hover:text-primary"
                    >
                      {t(`explore.${item.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── Company ── */}
            <nav aria-label={t("company.title")}>
              <h3 className="text-[14px] font-bold uppercase tracking-[0.2em] text-footer-foreground">
                {t("company.title")}
              </h3>

              <ul className="mt-4 space-y-1">
                {FOOTER_COMPANY.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className="inline-flex py-1.5 text-sm text-footer-foreground transition-colors hover:text-primary"
                    >
                      {t(`company.${item.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── Contact ── */}
          <div>
            <h3 className="text-[14px] font-bold uppercase tracking-[0.2em] text-footer-foreground">
              {t("contact.title")}
            </h3>

            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="group flex items-center gap-3 text-sm text-footer-foreground transition-colors hover:text-primary"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-footer-border transition-colors group-hover:bg-primary/20">
                    <Phone className="h-4 w-4 text-primary" />
                  </span>
                  {CONTACT.phone}
                </a>
              </li>

              <li>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-footer-foreground transition-colors hover:text-whatsapp"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-footer-border transition-colors group-hover:bg-whatsapp/20">
                    <FaWhatsapp className="h-4 w-4 text-whatsapp" />
                  </span>
                  WhatsApp
                </a>
              </li>

              <li>
                <a
                  href={CONTACT.emailHref}
                  className="group flex items-center gap-3 text-sm text-footer-foreground transition-colors hover:text-primary"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-footer-border transition-colors group-hover:bg-primary/20">
                    <Mail className="h-4 w-4 text-primary" />
                  </span>
                  <span className="break-all">{CONTACT.email}</span>
                </a>
              </li>

              <li className="flex items-start gap-3 text-sm text-footer-foreground">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-footer-border">
                  <MapPin className="h-4 w-4 text-primary" />
                </span>
                <span className="pt-2">{t("contact.location")}</span>
              </li>
            </ul>

            {/* ── Trust badges ── */}
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-12">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-footer-muted">
                  {t("contact.payment")}
                </p>
                <Image
                  src="/images/payement.webp"
                  alt="Visa, Mastercard, PayPal accepted"
                  width={120}
                  height={36}
                  className="mt-2 h-12 w-auto object-contain opacity-70"
                />
              </div>

              <a
                href="https://www.tripadvisor.com/Attraction_Review-g304018-d33999884-Reviews-Azul_Morocco_Travel-Ouarzazate_Draa_Tafilalet.html"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TripAdvisor reviews"
              >
                <Image
                  src="/images/tripadvisor-logo-circle-owl-icon-black-green-1536x1536-1.webp"
                  alt="TripAdvisor"
                  width={44}
                  height={44}
                  className="h-20 w-20 object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Copyright ── */}
      <section className="border-t border-footer-border px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-xs text-footer-muted/60">
            © {new Date().getFullYear()} luxury Morocco destinations.{" "}
            {t("copyright")}
          </p>
          <div className="flex gap-4 text-xs text-footer-muted/60">
            <Link
              href="/about"
              className="transition-colors hover:text-footer-foreground"
            >
              {t("legal.privacy")}
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-footer-foreground"
            >
              {t("legal.terms")}
            </Link>
          </div>
        </div>
      </section>
    </footer>
  );
}
