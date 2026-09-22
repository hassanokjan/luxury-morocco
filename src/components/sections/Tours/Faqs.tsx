"use client";

import { useId, useMemo, useState } from "react";
import { decode } from "html-entities";

import FaqItem from "@/components/ui/Faqitem";
import type { Locale } from "@/i18n/routing";

type FaqsProps = {
  faqs: string | null;
  locale: Locale;
};

type Faq = {
  question: string;
  answer: string;
};

const TITLES = {
  en: "Frequently asked questions",
  es: "Preguntas frecuentes",
} satisfies Record<Locale, string>;

function parseFaqs(html: string): Faq[] {
  if (!html.trim()) {
    return [];
  }

  const parts = html.split(/<h3[^>]*>(.*?)<\/h3>/gi);
  const faqs: Faq[] = [];

  for (let index = 1; index < parts.length; index += 2) {
    const question = decode(parts[index]?.replace(/<[^>]*>/g, "").trim() ?? "");

    const answer = parts[index + 1]?.trim() ?? "";

    if (!question) {
      continue;
    }

    faqs.push({
      question,
      answer,
    });
  }

  return faqs;
}

export default function Faqs({ faqs, locale }: FaqsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const id = useId();

  const items = useMemo(() => parseFaqs(faqs ?? ""), [faqs]);

  if (!items.length) {
    return null;
  }

  return (
    <section className="mt-8" aria-labelledby={`${id}-heading`}>
      {/* HEADER */}
      <div className="mb-8 max-w-2xl">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
          {locale === "es" ? "Antes de reservar" : "Before you book"}
        </p>

        <h2
          id={`${id}-heading`}
          className="text-3xl font-semibold leading-tight tracking-tight text-heading sm:text-4xl"
        >
          {TITLES[locale]}
        </h2>
      </div>

      {/* FAQ GRID */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((faq, index) => (
          <FaqItem
            key={`${index}-${faq.question}`}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() =>
              setOpenIndex((current) => (current === index ? null : index))
            }
          />
        ))}
      </div>
    </section>
  );
}
