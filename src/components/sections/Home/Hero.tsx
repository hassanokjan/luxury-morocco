import { ArrowRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function HeroSection(): React.JSX.Element {
  const t = useTranslations("Hero");

  return (
    <section className="relative w-full">
      <div className="relative min-h-[480px] w-full overflow-hidden lg:min-h-[580px]">
        {/* Background image */}
        <Image
          src="/images/hero.jpg"
          alt={t("imageAlt")}
          fill
          priority
          fetchPriority="high"
          quality={80}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Premium dark overlay */}
        <div
          aria-hidden="true"
          className="
            absolute inset-0
            bg-gradient-to-r
            from-black/55
            via-black/25
            to-black/10
          "
        />

        {/* Content */}
        <div className=" relative z-10 mx-auto flex min-h-[480px] max-w-7xl items-center px-4 py-6 sm:px-6 lg:min-h-[580px] lg:px-8">
          <div className="max-w-3xl">
            {/* H1 */}
            <h1
              className="
                text-left
                font-heading
                text-4xl
                font-semibold
                leading-[0.98]
                tracking-[-0.02em]
                text-white
                sm:text-6xl
              "
            >
              {t("title")}
              <span className=" text-gold">{t("titleHighlight")}</span>
            </h1>

            {/* SEO subtitle */}
            <p
              className="
                mt-4 lg:mt-6
                text-left
                text-base
                font-semibold
                tracking-wide
                text-white
                sm:text-lg
                lg:text-xl
              "
            >
              {t("subtitle")}
            </p>

            {/* Description */}
            <p
              className="
                mt-5
                max-w-2xl
                text-left
                text-sm
                leading-7
                text-white/80
                sm:text-base
                sm:leading-8
              "
            >
              {t("description")}
            </p>

            {/* CTA */}
            <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
              <Link
                href="/tours"
                className="
      group
      inline-flex min-h-12 w-full items-center justify-center gap-2
      rounded-lg bg-primary px-6 py-3
      text-sm font-bold text-primary-foreground
      transition-all duration-300
      hover:-translate-y-0.5 hover:bg-primary-hover
      sm:w-auto sm:min-w-[190px]
    "
              >
                {t("toursButton")}

                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>

              <Link
                href="/contact"
                className="
      inline-flex min-h-12 w-full items-center justify-center gap-2
      rounded-lg border border-white/40 bg-white/10 px-6 py-3
      text-sm font-semibold text-white backdrop-blur-md
      transition-all duration-300
      hover:border-white hover:bg-white hover:text-heading
      sm:w-auto sm:min-w-[190px]
    "
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />

                {t("quoteButton")}
              </Link>
            </div>

            {/* Small trust line */}
            <div className=" my-8 lg:mt-8 lg:mb-0 flex flex-wrap items-center gap-x-2 lg:gap-x-6 gap-y-2 text-xs font-medium  text-white sm:text-sm ">
              <span className="h-1 w-1 rounded-full bg-gold" />

              <span>{t("tailorMade")}</span>

              <span className="h-1 w-1 rounded-full bg-gold" />

              <span>{t("expertTours")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
