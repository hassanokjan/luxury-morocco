// components/blog/BlogPagination.tsx
import Link from "next/link";
import type { Locale } from "@/lib/wordpress/blogs";

const LABELS: Record<Locale, { prev: string; next: string }> = {
  en: { prev: "Previous", next: "Next" },
  es: { prev: "Anterior", next: "Siguiente" },
};

interface BlogPaginationProps {
  locale: Locale;
  currentPage: number;
  totalPages: number;
}

export function BlogPagination({
  locale,
  currentPage,
  totalPages,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const labels = LABELS[locale] ?? LABELS.en;

  const pageHref = (page: number) =>
    page <= 1
      ? locale === "en"
        ? "/blog"
        : `/${locale}/blog`
      : locale === "en"
        ? `/blog/page/${page}`
        : `/${locale}/blog/page/${page}`;

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  const disabledClasses =
    "pointer-events-none border-border bg-muted text-text-muted";

  const activeClasses =
    "border-border bg-background text-text-secondary hover:border-primary hover:text-primary";

  return (
    <nav
      aria-label="Pagination"
      className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-6 pb-24"
    >
      <Link
        href={pageHref(Math.max(1, currentPage - 1))}
        aria-disabled={isFirst}
        tabIndex={isFirst ? -1 : undefined}
        className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
          isFirst ? disabledClasses : activeClasses
        }`}
      >
        {labels.prev}
      </Link>

      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={pageHref(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-all ${
              page === currentPage
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-text-secondary hover:bg-muted hover:text-heading"
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      <Link
        href={pageHref(Math.min(totalPages, currentPage + 1))}
        aria-disabled={isLast}
        tabIndex={isLast ? -1 : undefined}
        className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
          isLast ? disabledClasses : activeClasses
        }`}
      >
        {labels.next}
      </Link>
    </nav>
  );
}
