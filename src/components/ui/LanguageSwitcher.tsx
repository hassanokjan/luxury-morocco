"use client";

import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/routing";

import { useParams } from "next/navigation";

import { useAlternateSlugs } from "@/contexts/AlternateSlugsContext";

import type { Locale } from "@/i18n/routing";

import { useEffect, useRef, useState, useTransition } from "react";

import { ChevronDown, Loader2 } from "lucide-react";

import Image from "next/image";

const LANGUAGES = [
  {
    code: "en",
    label: "English",
    country: "gb",
  },
  {
    code: "es",
    label: "Español",
    country: "es",
  },
] as const;

function FlagIcon({ country, alt }: { country: string; alt: string }) {
  return (
    <Image
      src={`https://flagcdn.com/w80/${country}.png`}
      alt={alt}
      width={32}
      height={24}
      className="h-auto w-6 rounded-[2px] object-cover shadow-sm lg:w-8"
      unoptimized
    />
  );
}

export default function LanguageSwitcher() {
  const t = useTranslations("Header");

  const locale = useLocale() as Locale;

  const pathname = usePathname();

  const params = useParams();

  const router = useRouter();

  const { alternateSlugs } = useAlternateSlugs();

  const [isOpen, setIsOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = LANGUAGES.find((lang) => lang.code === locale);

  /*
   * Current dynamic slug
   */
  const currentSlug = typeof params.slug === "string" ? params.slug : "";

  const isTourDetail = Boolean(currentSlug) && (pathname === "/tours/[slug]" || pathname.startsWith("/tours/"));

  const isBlogDetail = Boolean(currentSlug) && (pathname === "/blog/[slug]" || pathname.startsWith("/blog/"));

  const isTranslatedDetailPage = isTourDetail || isBlogDetail;

  
  /*
   * Close dropdown when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /*
   * Language change
   */
  const handleChange = (newLocale: Locale) => {
    /*
     * Already using this language
     */
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    /*
     * Close immediately.
     *
     * Gives direct feedback to the user
     * even while the next page loads.
     */
    setIsOpen(false);

    /*
     * BLOG / TOUR DETAIL
     *
     * These routes can have a different
     * slug for every language.
     */
    if (isTranslatedDetailPage) {
      const targetSlug = alternateSlugs?.[newLocale];

      const registeredCurrentSlug = alternateSlugs?.[locale];

      /*
       * Protection against stale data.
       *
       * Never navigate to the translation
       * of another article/tour.
       */
      if (
        !currentSlug ||
        !targetSlug ||
        registeredCurrentSlug !== currentSlug
      ) {
        return;
      }

      startTransition(() => {
        router.replace(
          {
            pathname,
            params: {
              slug: targetSlug,
            },
          } as never,
          {
            locale: newLocale,
          },
        );
      });

      return;
    }

    /*
     * STATIC / NORMAL ROUTES
     *
     * Examples:
     * /
     * /about
     * /contact
     * /blog
     * /tours
     */
    startTransition(() => {
      router.replace(
        {
          pathname,
          params,
        } as never,
        {
          locale: newLocale,
        },
      );
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* CURRENT LANGUAGE */}
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        disabled={isPending}
        aria-label={t("changeLanguage")}
        aria-expanded={isOpen}
        className="
          flex items-center gap-2
          rounded-lg px-3 py-2
          text-sm font-semibold
          text-foreground
          transition-colors
          hover:bg-muted
          disabled:cursor-wait
        "
      >
        {currentLanguage && (
          <FlagIcon
            country={currentLanguage.country}
            alt={currentLanguage.label}
          />
        )}

        <span className="hidden sm:inline">
          {currentLanguage?.code.toUpperCase()}
        </span>

        {isPending ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <ChevronDown
            className={`h-3 w-3 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <div
          className="
            absolute right-0 top-full z-50
            mt-2 min-w-[180px]
            rounded-xl border border-border
            bg-card p-2 shadow-lg
          "
        >
          {LANGUAGES.map((lang) => {
            const isCurrent = locale === lang.code;

            return (
              <button
                key={lang.code}
                type="button"
                disabled={isPending || isCurrent}
                onClick={() => handleChange(lang.code)}
                className={`
                    flex w-full
                    items-center gap-3
                    rounded-lg
                    px-3 py-2
                    text-sm font-medium
                    transition-colors

                    ${
                      isCurrent
                        ? "bg-primary/10 text-primary"
                        : "text-text-secondary hover:bg-muted hover:text-foreground"
                    }

                    disabled:cursor-default
                  `}
              >
                <FlagIcon country={lang.country} alt={lang.label} />

                <span>{lang.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
