"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

import type { Locale } from "@/i18n/routing";

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
      width={20}
      height={15}
      className="rounded-[2px] object-cover shadow-sm"
      unoptimized
    />
  );
}

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;

  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = LANGUAGES.find(
    (language) => language.code === locale,
  );

  // Fermer le dropdown si on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function changeLanguage(newLocale: Locale) {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    router.replace(
      {
        pathname,
        params,
      } as never,
      {
        locale: newLocale,
      },
    );

    setIsOpen(false);
  }

  return (
    <div ref={dropdownRef} className="relative">
      {/* Current language */}
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label="Change language"
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
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

        <ChevronDown
          className={`h-3 w-3 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Languages */}
      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[180px] rounded-xl border border-border bg-card p-2 shadow-lg">
          {LANGUAGES.map((language) => {
            const active = language.code === locale;

            return (
              <button
                key={language.code}
                type="button"
                onClick={() => changeLanguage(language.code as Locale)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-text-secondary hover:bg-muted hover:text-foreground"
                }`}
              >
                <FlagIcon country={language.country} alt={language.label} />

                <span>{language.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
