import Image, { type StaticImageData } from "next/image";
import { FaInstagram } from "react-icons/fa";
import React from "react";

import photo1 from "@/../public/personnel/hassan1.jpeg";
import photo3 from "@/../public/personnel/hassan6.jpeg";
import photo2 from "@/../public/personnel/hassan4.jpeg";
import photo4 from "@/../public/personnel/hassan5.jpeg";


type Photo = {
  id: number;
  src: StaticImageData;
  alt: string;
};

const photos: Photo[] = [
  {
    id: 1,
    src: photo1,
    alt: "Moroccan desert host wearing a traditional blue turban inside a Sahara camp",
  },
  {
    id: 2,
    src: photo2,
    alt: "Local Moroccan guide overlooking a palm oasis during a private Morocco tour",
  },
  {
    id: 3,
    src: photo3,
    alt: "Travelers enjoying a guided Morocco experience near a palm valley and traditional village",
  },
  {
    id: 4,
    src: photo4,
    alt: "Guests sharing traditional Moroccan tea with local hosts during a desert experience",
  },
];


export default async function InstagramSection(): Promise<React.JSX.Element> {
  return (
    <section className="bg-background px-4 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-primary sm:text-4xl">
          Follow Our Journey
        </h2>

        <p className="mx-auto mt-4 max-w-6xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
          Follow Luxury Morocco Destinations for a closer look at Morocco — Sahara sunsets, Marrakech streets, Atlas landscapes, coastal escapes, and moments from our private luxury tours.
        </p>

        <div className="mt-10 mx-auto max-w-5xl grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="relative aspect-4/5 overflow-hidden rounded-xl border border-border bg-card shadow-sm "
            >
              <Image
                src={photo?.src}
                alt={photo?.alt}
                fill
                loading="lazy"
                quality={60}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center hover:scale-105 transition-transform duration-300 ease-in-out hover:cursor-pointer"
              />
            </div>
          ))}
        </div>

        <a
          href="https://www.instagram.com/luxury_morocco_destinations?stkn=MTd6NHNnM24yY2RsYg%3D%3D&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-7 py-3 text-sm font-extrabold text-text-main shadow-sm transition-colors hover:bg-muted hover:text-gold-soft"
        >
          <FaInstagram className="h-5 w-5" />
          Follow us on Instagram
        </a>
      </div>
    </section>
  );
}
