import Image, { type StaticImageData } from "next/image";
import { FaInstagram } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";

import photo1 from "@/../public/personnel/hassan1.jpeg";
import photo3 from "@/../public/personnel/hassan6.jpeg";
import photo4 from "@/../public/personnel/hassan2.jpeg";

type Photo = {
  id: number;
  src: StaticImageData;
  alt: string;
  label: string;
  location: string;
};

const photos: Photo[] = [
  {
    id: 1,
    src: photo1,
    alt: "Moroccan desert host wearing a traditional blue turban",
    label: "The Sahara Experience",
    location: "Moroccan Sahara",
  },
  {
    id: 2,
    src: photo3,
    alt: "Travelers enjoying a guided Morocco experience",
    label: "Authentic Encounters",
    location: "Discover Morocco",
  },
  {
    id: 3,
    src: photo4,
    alt: "Guests sharing traditional Moroccan tea with local hosts",
    label: "Moments to Remember",
    location: "Moroccan Hospitality",
  },
];

const INSTAGRAM_URL = "https://www.instagram.com/luxury_morocco_destinations/";

export default function InstagramSection() {
  return (
    <section className="relative overflow-hidden bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-primary lg:text-[46px] lg:leading-[1.12]">
            Follow Our{" "}
            <span className="font-serif italic font-normal text-gold-soft">
              Journey
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-text-secondary sm:text-lg">
            From golden Sahara sunsets to the timeless charm of Marrakech,
            discover the extraordinary moments that make every journey through
            Morocco unforgettable.
          </p>
        </div>

        {/* Premium photo gallery */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {photos.map((photo, index) => (
            <a
              key={photo.id}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Explore ${photo.label} on Instagram`}
              className={`group relative block overflow-hidden rounded-xl bg-card ${
                index === 1 ? "lg:col-span-4" : "lg:col-span-4"
              } ${index === 2 ? "sm:col-span-2 lg:col-span-4" : ""}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/4] lg:aspect-[4/5]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  quality={85}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                />
                {/* Instagram icon */}
                <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/15 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-black">
                  <FaInstagram className="h-5 w-5" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="mt-10 flex flex-col items-center text-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-soft hover:shadow-lg"
          >
            <FaInstagram className="h-[18px] w-[18px]" />
            <span>Follow Us on Instagram</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
