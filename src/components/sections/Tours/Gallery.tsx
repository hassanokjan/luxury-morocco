"use client";

import { useEffect, useId, useRef, useState } from "react";

import Image from "next/image";

import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

import type { TourDetail } from "@/lib/wordpress/tours";
import type { Locale } from "@/i18n/routing";

const CONTENT = {
  en: {
    label: "Tour gallery",
    title: "Picture yourself on this journey",
    open: "Enlarge photo",
    close: "Close gallery",
    previous: "Previous photo",
    next: "Next photo",
    viewer: "Tour photos",
  },

  es: {
    label: "Galería del tour",
    title: "Imagínate en este viaje",
    open: "Ampliar la foto",
    close: "Cerrar la galería",
    previous: "Foto anterior",
    next: "Foto siguiente",
    viewer: "Fotos del circuito",
  },
} satisfies Record<
  Locale,
  {
    label: string;
    title: string;
    open: string;
    close: string;
    previous: string;
    next: string;
    viewer: string;
  }
>;

type GalleryProps = {
  tour: TourDetail;
  locale: Locale;
};

type GalleryImage = {
  src: string;
  alt: string;
};

export default function Gallery({ tour, locale }: GalleryProps) {
  const t = CONTENT[locale];

  const id = useId();

  const dialogRef = useRef<HTMLDialogElement>(null);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  /*
  |--------------------------------------------------------------------------
  | TOUR IMAGES
  |--------------------------------------------------------------------------
  */

  const images: GalleryImage[] = [
    {
      src: tour.image,
      alt: tour.imageAlt || tour.title,
    },

    {
      src: tour.image2,
      alt: tour.image2Alt || tour.title,
    },

    {
      src: tour.image3,
      alt: tour.image3Alt || tour.title,
    },
  ].filter((image): image is GalleryImage => Boolean(image.src?.trim()));

  const activeImage =
    activeIndex === null ? null : (images[activeIndex] ?? null);

  const isOpen = activeImage !== null;

  /*
  |--------------------------------------------------------------------------
  | OPEN / CLOSE DIALOG
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!isOpen || !dialog) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    if (!dialog.open) {
      dialog.showModal();
    }

    document.body.style.overflow = "hidden";

    return () => {
      if (dialog.open) {
        dialog.close();
      }

      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  /*
  |--------------------------------------------------------------------------
  | PREVIOUS / NEXT IMAGE
  |--------------------------------------------------------------------------
  */

  function changeImage(direction: number) {
    if (images.length < 2) {
      return;
    }

    setActiveIndex((current) => {
      if (current === null) {
        return null;
      }

      return (current + direction + images.length) % images.length;
    });
  }

  if (!images.length) {
    return null;
  }

  const threeImages = images.length === 3;

  return (
    <section className="mt-6 lg:mt-10" aria-labelledby={`${id}-heading`}>
      {/* HEADER */}
      <div className="mb-8 max-w-2xl">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
          {t.label}
        </p>

        <h2
          id={`${id}-heading`}
          className="text-2xl font-semibold leading-tight tracking-tight text-heading sm:text-4xl"
        >
          {t.title}
        </h2>
      </div>

      {/* GALLERY GRID */}
      <div
        className={`
          grid gap-3 sm:gap-4

          ${
            threeImages
              ? `
                grid-cols-2
                md:h-[460px]
                md:grid-cols-3
                md:grid-rows-2
              `
              : images.length === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1"
          }
        `}
      >
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`${t.open} ${index + 1}: ${image.alt}`}
            aria-haspopup="dialog"
            aria-controls={`${id}-dialog`}
            className={`
                group relative
                min-h-0 min-w-0
                cursor-zoom-in
                overflow-hidden
                rounded-2xl
                bg-muted
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-primary

                ${
                  threeImages
                    ? index === 0
                      ? `
                        col-span-2
                        aspect-[16/10]
                        md:row-span-2
                        md:aspect-auto
                      `
                      : `
                        aspect-[4/3]
                        md:aspect-auto
                      `
                    : images.length === 1
                      ? "aspect-[16/9] lg:aspect-[21/9]"
                      : "aspect-[4/3]"
                }
              `}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={
                images.length === 1
                  ? "100vw"
                  : threeImages
                    ? index === 0
                      ? "(min-width: 768px) 66vw, 100vw"
                      : "(min-width: 768px) 33vw, 50vw"
                    : "(min-width: 640px) 50vw, 100vw"
              }
              className="
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-[1.035]
                "
            />

            {/* subtle overlay */}
            <span
              aria-hidden="true"
              className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/20
                  via-transparent
                  to-transparent
                  transition-colors
                  duration-300
                  group-hover:from-black/30
                "
            />

            {/* ENLARGE BUTTON */}
            <span
              aria-hidden="true"
              className="
                  absolute bottom-4 right-4
                  flex size-10
                  items-center justify-center
                  rounded-full
                  border border-white/20
                  bg-black/35
                  text-white
                  shadow-sm
                  backdrop-blur-md
                  transition-all
                  duration-300
                  group-hover:scale-105
                  group-hover:bg-primary
                "
            >
              <Maximize2 className="size-4" />
            </span>
          </button>
        ))}
      </div>

      {/* FULLSCREEN VIEWER */}
      <dialog
        ref={dialogRef}
        id={`${id}-dialog`}
        aria-label={t.viewer}
        onCancel={(event) => {
          event.preventDefault();

          setActiveIndex(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();

            changeImage(1);
          }

          if (event.key === "ArrowLeft") {
            event.preventDefault();

            changeImage(-1);
          }
        }}
        className="
          fixed inset-0
          m-0
          h-dvh
          max-h-none
          w-screen
          max-w-none
          border-0
          bg-black/95
          p-0
          text-white
          backdrop:bg-black/85
        "
      >
        <div className="flex h-full flex-col">
          {/* TOP BAR */}
          <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                {t.viewer}
              </p>

              <p className="mt-1 line-clamp-1 text-sm font-medium text-white/90">
                {tour.title}
              </p>
            </div>

            <button
              type="button"
              aria-label={t.close}
              onClick={() => setActiveIndex(null)}
              className="
                flex size-11
                shrink-0
                items-center
                justify-center
                rounded-full
                border border-white/10
                bg-white/10
                transition-colors
                hover:bg-white/20
                focus-visible:outline-2
                focus-visible:outline-white
              "
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>

          {/* ACTIVE IMAGE */}
          <div className="relative min-h-0 flex-1 px-3 sm:px-16 lg:px-24">
            <div className="relative h-full w-full">
              {activeImage && (
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  sizes="100vw"
                  priority
                  className="object-contain"
                />
              )}
            </div>

            {/* DESKTOP PREVIOUS */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label={t.previous}
                  onClick={() => changeImage(-1)}
                  className="
                    absolute left-4
                    top-1/2
                    hidden size-12
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border border-white/10
                    bg-black/30
                    backdrop-blur-md
                    transition-colors
                    hover:bg-primary
                    md:flex
                  "
                >
                  <ChevronLeft className="size-5" />
                </button>

                {/* DESKTOP NEXT */}
                <button
                  type="button"
                  aria-label={t.next}
                  onClick={() => changeImage(1)}
                  className="
                    absolute right-4
                    top-1/2
                    hidden size-12
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border border-white/10
                    bg-black/30
                    backdrop-blur-md
                    transition-colors
                    hover:bg-primary
                    md:flex
                  "
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}
          </div>

          {/* BOTTOM CONTROLS */}
          <div className="flex shrink-0 items-center justify-center gap-5 px-4 py-4">
            {images.length > 1 && (
              <button
                type="button"
                aria-label={t.previous}
                onClick={() => changeImage(-1)}
                className="
                  flex size-11
                  items-center
                  justify-center
                  rounded-full
                  border border-white/10
                  bg-white/10
                  transition-colors
                  hover:bg-primary
                  md:hidden
                "
              >
                <ChevronLeft className="size-5" />
              </button>
            )}

            <p
              role="status"
              className="
                min-w-16
                text-center
                text-sm
                font-medium
                tabular-nums
                text-white/75
              "
            >
              {activeIndex === null ? 0 : activeIndex + 1}
              {" / "}
              {images.length}
            </p>

            {images.length > 1 && (
              <button
                type="button"
                aria-label={t.next}
                onClick={() => changeImage(1)}
                className="
                  flex size-11
                  items-center
                  justify-center
                  rounded-full
                  border border-white/10
                  bg-white/10
                  transition-colors
                  hover:bg-primary
                  md:hidden
                "
              >
                <ChevronRight className="size-5" />
              </button>
            )}
          </div>
        </div>
      </dialog>
    </section>
  );
}
