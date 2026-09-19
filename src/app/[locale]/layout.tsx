import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Layout/Footer";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Layout/Header";
import { AlternateSlugsProvider } from "@/contexts/AlternateSlugsContext";


const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}



export function generateMetadata(): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://luxurymoroccodestinations.com";

  return {
    metadataBase: new URL(baseUrl),
    title: "luxury morocco destinations | morocco luxury tours",
    authors: [{ name: "Luxury Morocco Destinations" }],
    creator: "Luxury Morocco Destinations",
    publisher: "Luxury Morocco Destinations",
    description: "Experience the beauty of Morocco with our luxury tours. Discover the Sahara, Marrakech, and the Atlas Mountains with our private luxury experiences.",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}


export default async function LocaleLayout({children,params,}: {children: React.ReactNode;params: Promise<{ locale: string }>;}) {

  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}
    >
       <body className="min-h-screen flex flex-col bg-background text-foreground">
      <NextIntlClientProvider>
        <AlternateSlugsProvider>
            <Header />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
        </AlternateSlugsProvider>
      </NextIntlClientProvider>
    </body>
    </html>
  );
}

