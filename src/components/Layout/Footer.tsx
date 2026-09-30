import Image from "next/image";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/routing";
import ReseauxSociaux from "@/components/ui/ReseauxSociaux";

const CONTACT = {
  phone: "+212667182357",
  phoneHref: "tel:+212667182357",
  whatsapp: "https://wa.me/212667182357",
  email: "info@luxurymoroccodestinations.com",
  emailHref: "mailto:info@luxurymoroccodestinations.com",
} as const;

const FOOTER_TOURS = [
  { city: "marrakech", key: "marrakech" },
  { city: "fes", key: "fes" },
  { city: "casablanca", key: "casablanca" },
  { city: "tangier", key: "tangier" },
  { city: "agadir", key: "agadir" },
] as const;

const FOOTER_EXPLORE = [
  { href: "/day-trips" as const, key: "dayTrips" },
  { href: "/tours" as const, key: "tours" },
  {
    href: "/customize-your-tour" as const,
    key: "customTour",
  },
  { href: "/blog" as const, key: "blog" },
] as const;

const FOOTER_COMPANY = [
  { href: "/about" as const, key: "about" },
  {
    href: "/about/morocco_tourist" as const,
    key: "aboutMorocco",
  },
  { href: "/contact" as const, key: "contact" },
] as const;

export default async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="w-full bg-footer text-footer-foreground">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        {/* TOP */}
        <div className="grid gap-2 border-b border-footer-border pb-8 lg:grid-cols-2 lg:items-center">
          {/* BRAND */}
          <div>
            <Link
              href="/"
              aria-label="Luxury Morocco Destinations home"
              className="inline-flex"
            >
              <Image
                src="/logo.png"
                alt="Luxury Morocco Destinations Logo"
                width={170}
                height={55}
                className="h-auto w-32 sm:w-40"
              />
            </Link>

            <p className="mt-4 max-w-lg text-sm leading-7 text-footer-muted">
              {t("brand.description")}
            </p>

            <div className="mt-5">
              <ReseauxSociaux />
            </div>
          </div>

          {/* CONTACT CARDS */}
          <div className="grid gap-1">
            {/* PHONE */}
            <a
              href={CONTACT.phoneHref}
              className="group flex items-center gap-3 rounded-xl border border-footer-border px-4 py-3 transition-all duration-200 hover:border-primary/40 hover:bg-white/[0.03]"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
                <Phone className="size-4 text-primary" />
              </span>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-footer-muted">
                  Phone
                </p>

                <p className="mt-0.5 text-sm font-medium text-footer-foreground">
                  {CONTACT.phone}
                </p>
              </div>
            </a>

            {/* WHATSAPP */}
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-footer-border px-4 py-3 transition-all duration-200 hover:border-whatsapp/40 hover:bg-white/[0.03]"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
                <FaWhatsapp className="size-4 text-whatsapp" />
              </span>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-footer-muted">
                  WhatsApp
                </p>

                <p className="mt-0.5 text-sm font-medium text-footer-foreground">
                  {CONTACT.phone}
                </p>
              </div>
            </a>

            {/* EMAIL */}
            <a
              href={CONTACT.emailHref}
              className="group flex min-w-0 items-center gap-3 rounded-xl border border-footer-border px-4 py-3 transition-all duration-200 hover:border-primary/40 hover:bg-white/[0.03]"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
                <Mail className="size-4 text-primary" />
              </span>

              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-footer-muted">
                  Email
                </p>

                <p className="mt-0.5 truncate text-sm font-medium text-footer-foreground">
                  {CONTACT.email}
                </p>
              </div>
            </a>

            {/* LOCATION */}
            <div className="flex items-center gap-3 rounded-xl border border-footer-border px-4 py-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
                <MapPin className="size-4 text-primary" />
              </span>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-footer-muted">
                  Location
                </p>

                <p className="mt-0.5 text-sm font-medium text-footer-foreground">
                  {t("contact.location")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 py-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* POPULAR TOURS */}
          <nav aria-label={t("tours.title")}>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              {t("tours.title")}
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {FOOTER_TOURS.map((item) => (
                <Link
                  key={item.city}
                  href={{
                    pathname: "/tours/from/[city]",
                    params: {
                      city: item.city,
                    },
                  }}
                  className="
            rounded-full
            border border-footer-border
            px-4 py-2
            text-sm
            text-footer-muted
            transition-all duration-200
            hover:border-primary/40
            hover:bg-primary/10
            hover:text-primary
          "
                >
                  {t(`tours.${item.key}`)}
                </Link>
              ))}
            </div>
          </nav>

          {/* EXPLORE */}
          <nav aria-label={t("explore.title")}>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              {t("explore.title")}
            </h3>

            <ul className="mt-4 space-y-2.5">
              {FOOTER_EXPLORE.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="
              group
              inline-flex
              items-center
              gap-2
              text-sm
              text-footer-muted
              transition-colors
              hover:text-footer-foreground
            "
                  >
                    <span>{t(`explore.${item.key}`)}</span>

                    <ArrowUpRight className="size-3 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* COMPANY */}
          <nav aria-label={t("company.title")}>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              {t("company.title")}
            </h3>

            <ul className="mt-4 space-y-2.5">
              {FOOTER_COMPANY.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className=" group inline-flex items-center gap-2 text-sm text-footer-muted transition-colors hover:text-footer-foreground"
                  >
                    <span>{t(`company.${item.key}`)}</span>

                    <ArrowUpRight className="size-3 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* TRUST & SECURITY */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              Trust & Security
            </h3>

            <div className="mt-4 space-y-3">
              {/* PAYMENT */}
              <div
                className="rounded-2xl border border-footer-border bg-white/[0.02] p-4"
              >
                <p className="text-xs font-medium text-footer-muted">
                  Secure payment
                </p>

                <Image
                  src="/images/payement.webp"
                  alt="Visa Mastercard PayPal accepted"
                  width={150}
                  height={45}
                 className="mt-3 h-9 w-auto object-contain opacity-80"
                />
              </div>

              {/* TRIPADVISOR */}
              <a
                href="https://www.tripadvisor.com/Attraction_Review-g304018-d33999884-Reviews-Azul_Morocco_Travel-Ouarzazate_Draa_Tafilalet.html"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-footer-border bg-white/[0.02] p-4 transition-all duration-300 hover:border-primary/40 hover:bg-white/[0.04] "
              >
                <Image
                  src="/images/tripadvisor-logo-circle-owl-icon-black-green-1536x1536-1.webp"
                  alt="TripAdvisor reviews"
                  width={56}
                  height={56}
                  className="
            size-14
            shrink-0
            object-contain
            transition-transform duration-300
            group-hover:scale-105
          "
                />

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-footer-foreground">
                    TripAdvisor
                  </p>

                  <p className="mt-1 text-xs leading-5 text-footer-muted">
                    Read guest reviews
                  </p>
                </div>

                <ArrowUpRight className="ml-auto size-4 shrink-0 text-footer-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-footer-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-footer-muted/70 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} Luxury Morocco Destinations.{" "}
            {t("copyright")}
          </p>

          <div className="flex gap-4">
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
      </div>
    </footer>
  );
}
