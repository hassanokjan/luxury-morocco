import { getPathname } from "@/i18n/routing";
import type { BlogDetail, Locale } from "@/lib/wordpress/blogs";

type SeoBlogJsonLdProps = {
  locale: Locale;
  blog: BlogDetail;
};

export default function SeoBlogJsonLd({locale,blog,}: SeoBlogJsonLdProps): React.JSX.Element {
    
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://luxurymoroccodestinations.com";

  const pathname = getPathname({
    locale,
    href: {
      pathname: "/blog/[slug]",
      params: {
        slug: blog.slug,
      },
    },
  });

  const canonicalUrl = new URL(pathname, baseUrl).toString();

  const blogUrl = new URL(
    getPathname({
      locale,
      href: "/blog",
    }),
    baseUrl,
  ).toString();

  const homeUrl = new URL(
    getPathname({
      locale,
      href: "/",
    }),
    baseUrl,
  ).toString();

  const articleId = `${canonicalUrl}#article`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;

  const organizationId = `${baseUrl}/#travel-agency`;
  const websiteId = `${baseUrl}/#website`;

  const jsonLd = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": articleId,

        url: canonicalUrl,

        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },

        headline: blog.title,

        description: blog.seoDescription || blog.description,

        ...(blog.coverImage && {
          image: {
            "@type": "ImageObject",
            url: blog.coverImage,
            contentUrl: blog.coverImage,
            caption: blog.altImage || blog.title,
          },
        }),

        datePublished: blog.date,

        author: {
          "@id": organizationId,
        },

        publisher: {
          "@id": organizationId,
        },

        isPartOf: {
          "@id": websiteId,
        },

        inLanguage: locale === "es" ? "es-ES" : "en-US",

        ...(blog.keywords && {
          keywords: blog.keywords,
        }),

        genre: "Travel Guide",
      },

      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,

        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === "es" ? "Inicio" : "Home",
            item: homeUrl,
          },

          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: blogUrl,
          },

          {
            "@type": "ListItem",
            position: 3,
            name: blog.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
