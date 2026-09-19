import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { BlogCard, Locale } from "@/lib/wordpress/blogs";

type BlogcartProps = {
  card: BlogCard;
  locale: Locale;
};

export default function Blogcart({ card, locale }: BlogcartProps) {
  const dateOnly = card.date.split("T")[0];
  const date = new Date(`${dateOnly}T12:00:00Z`);

  const formattedDate = Number.isNaN(date.getTime())
    ? ""
    : new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(date);

  const keywords = (card.keywords ?? []).split(',').map((keyword) => keyword.trim()).filter(Boolean);

  return (
    <article>
      <Link
        href={{
          pathname: "/blog/[slug]",
          params: { slug: card.slug },
        }}
        locale={locale}
        className="group grid items-center gap-6 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-primary md:grid-cols-2 md:gap-8 lg:gap-10"
      >
        {/* IMAGE */}
        <div className="relative aspect-[8/5] w-full overflow-hidden rounded-[6px] bg-muted shadow-sm shadow-primary/5">
          {card.coverImage ? (
            <Image
              src={card.coverImage}
              alt={card.altImage || card.title}
              fill
              sizes="(min-width: 1152px) 524px, (min-width: 768px) 50vw, 100vw"
              className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-text-secondary">
              {locale === "es" ? "Imagen no disponible" : "Image unavailable"}
            </div>
          )}
        </div>

        {/* CONTENU */}
        <div className="min-w-0 py-1">
          {/* DATE */}
          {formattedDate && (
            <div className="mb-3 flex items-center gap-2 text-sm text-text-secondary">
              <CalendarDays
                aria-hidden="true"
                className="size-4 shrink-0 text-primary"
                strokeWidth={1.7}
              />

              <time dateTime={dateOnly}>{formattedDate}</time>
            </div>
          )}

          {/* TITRE */}
          <h2 className="line-clamp-3 font-heading text-3xl font-semibold leading-[1.15] tracking-tight text-heading transition-colors duration-200 group-hover:text-primary lg:text-4xl">
            {card.title}
          </h2>

          {/* DESCRIPTION */}
          {card.description && (
            <p className="mt-4 line-clamp-4 text-base leading-8 text-text-secondary lg:text-lg">
              {card.description}
            </p>
          )}

          {/* MOTS-CLÉS */}
          {keywords.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {keywords.slice(0, 5).map((keyword, index) => (
                <li
                  key={`${keyword}-${index}`}
                  className="max-w-full break-words rounded-sm bg-primary/10 px-2.5 py-1 text-xs font-medium leading-5 text-heading sm:text-sm"
                >
                  {keyword}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Link>
    </article>
  );
}
