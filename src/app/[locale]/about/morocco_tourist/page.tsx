import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPathname } from "@/i18n/routing";
import InstagramSection from "@/components/ui/Instgramme";


export async function generateMetadata({params,}: {params: Promise<{ locale: string }>;}): Promise<Metadata> {

  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MoroccoTourist.meta" });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://luxurymoroccodestinations.com";

  const localizedPath = getPathname({
    locale,
    href: "/about/morocco_tourist",
  });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "morocco luxury tours",
      "why travel to morocco",
      "best destinations in morocco",
      "morocco people and culture",
      "where is morocco",
      "morocco tourism statistics",
      "luxury tours morocco",
      "morocco geography",
      "morocco flag",
      "morocco destinations",
    ],
    alternates: {
      canonical: `${baseUrl}${localizedPath}`,
      languages: {
        en: `${baseUrl}/about/morocco-tourist`,
        es: `${baseUrl}/es/sobre-nosotros/turismo-marruecos`,
        "x-default": `${baseUrl}/about/morocco-tourist`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${baseUrl}${localizedPath}`,
      siteName: "Luxury Morocco Destinations",
      type: "article",
      images: [
        {
          url: "/og-image.jpeg",
          width: 1200,
          height: 630,
          alt: "Morocco travel guide — culture, geography and top destinations",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}


export default async function MoroccoTouristPage({params,}: { params: Promise<{ locale: string }>;}) {

  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("MoroccoTourist");

  /* JSON-LD for SEO */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("meta.title"),
    description: t("meta.description"),
    image: "/og-image.jpeg",
    author: {
      "@type": "Organization",
      name: "Luxury Morocco Destinations",
      url: "https://luxurymoroccodestinations.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Luxury Morocco Destinations",
      url: "https://luxurymoroccodestinations.com",
    },
    about: {
      "@type": "Country",
      name: "Morocco",
      alternateName: ["Kingdom of Morocco", "Maroc", "Marruecos", "المغرب"],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative bg-background w-full overflow-hidden">
        <div className="relative min-h-[360px] w-full lg:min-h-[500px]">
          <Image
            src="/images/aitbenhaddou.jpeg"
            alt="Traditional Moroccan zellige mosaic tilework"
            fill
            priority
            quality={85}
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* ⬇️ OVERLAY MANQUANT — c'est ça qui rend le texte illisible */}
          <div aria-hidden="true" className="absolute inset-0 bg-black/40" />

          {/* Content */}
          <div className="relative mx-auto flex min-h-[360px] max-w-4xl flex-col items-center justify-center px-4 py-14 text-center sm:px-6 lg:min-h-[500px] lg:px-8">
            <span className="text-xl font-bold uppercase tracking-widest text-orange-100 drop-shadow-md">
              {t("hero.eyebrow")}
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl xl:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/85 drop-shadow-md sm:text-base">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-12 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/4] p-4 overflow-hidden ">
              <Image
                src="/images/morocco.jpg"
                alt="Map of Morocco showing Marrakech, Fes, Merzouga, Chefchaouen and the Sahara desert"
                fill
                className="object-cover rounded-[6px]"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={85}
              />
            </div>

            {/* Text */}
            <div>
              <h2 className="text-2xl font-bold text-heading sm:text-3xl lg:text-4xl">
                {t("geography.title")}
              </h2>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-text-secondary">
                <p>
                  {t.rich("geography.paragraph1", {
                    bold: (chunks) => (
                      <strong className="font-semibold text-heading">
                        {chunks}
                      </strong>
                    ),
                  })}
                </p>
                <p>
                  {t.rich("geography.paragraph2", {
                    bold: (chunks) => (
                      <strong className="font-semibold text-heading">
                        {chunks}
                      </strong>
                    ),
                  })}
                </p>
              </div>

              {/* Flag */}
              <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-6">
                <Image
                  src="/images/flag.webp"
                  alt="Flag of Morocco — red with a green pentacle star"
                  width={160}
                  height={200}
                  className="h-auto rounded-[6px] w-36 shrink-0 sm:w-80"
                />
                <div className="flex flex-col items-center gap-2 sm:items-start">
                  <p className="text-base text-primary font-bold sm:text-lg">
                    {t("geography.flagTitle")}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {t("geography.flagDescription")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <span className="text-sm font-medium italic text-primary">
                {t("culture.eyebrow")}
              </span>
              <h2 className="mt-2 text-2xl font-bold text-heading sm:text-3xl lg:text-4xl">
                {t("culture.title")}
              </h2>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-text-secondary">
                <p>
                  {t.rich("culture.paragraph1", {
                    bold: (chunks) => (
                      <strong className="font-semibold text-heading">
                        {chunks}
                      </strong>
                    ),
                  })}
                </p>
                <p>
                  {t.rich("culture.paragraph2", {
                    bold: (chunks) => (
                      <strong className="font-semibold text-heading">
                        {chunks}
                      </strong>
                    ),
                  })}
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[6px]">
                <Image
                  src="/images/hassan5.jpeg"
                  alt="Moroccan people in traditional dress at a local souk in Marrakech"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={85}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl  px-4 py-6 sm:px-6 lg:px-8">
          <span className="text-sm font-medium italic text-primary">
            {t("why.eyebrow")}
          </span>
          <h2 className="mt-2 text-2xl font-bold text-heading sm:text-3xl lg:text-4xl">
            {t("why.title")}
          </h2>

          <div className="mt-8 space-y-5 text-base leading-8 text-text-secondary sm:text-[1.05rem]">
            <p>
              {t.rich("why.p1", {
                bold: (chunks) => (
                  <strong className="font-semibold text-heading">
                    {chunks}
                  </strong>
                ),
              })}
            </p>
            <p>
              {t.rich("why.p2", {
                bold: (chunks) => (
                  <strong className="font-semibold text-heading">
                    {chunks}
                  </strong>
                ),
              })}
            </p>
            <p>
              {t.rich("why.p3", {
                bold: (chunks) => (
                  <strong className="font-semibold text-heading">
                    {chunks}
                  </strong>
                ),
              })}
            </p>
            <p>
              {t.rich("why.p4", {
                bold: (chunks) => (
                  <strong className="font-semibold text-heading">
                    {chunks}
                  </strong>
                ),
              })}
            </p>
            <p>
              {t.rich("why.p5", {
                bold: (chunks) => (
                  <strong className="font-semibold text-heading">
                    {chunks}
                  </strong>
                ),
              })}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <span className="text-sm font-medium italic text-primary">
            {t("practical.eyebrow")}
          </span>
          <h2 className="mt-2 text-2xl font-bold text-heading sm:text-3xl lg:text-4xl">
            {t("practical.title")}
          </h2>

          <div className="mt-8 space-y-5 text-base leading-8 text-text-secondary sm:text-[1.05rem]">
            <p>
              {t.rich("practical.p1", {
                bold: (chunks) => (
                  <strong className="font-semibold text-heading">
                    {chunks}
                  </strong>
                ),
              })}
            </p>
            <p>
              {t.rich("practical.p2", {
                bold: (chunks) => (
                  <strong className="font-semibold text-heading">
                    {chunks}
                  </strong>
                ),
              })}
            </p>
            <p>
              {t.rich("practical.p3", {
                bold: (chunks) => (
                  <strong className="font-semibold text-heading">
                    {chunks}
                  </strong>
                ),
              })}
            </p>
          </div>
        </div>
      </section>
      <section className="bg-background pb-12">
        <InstagramSection />
      </section>
    </>
  );
}
