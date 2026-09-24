"use client";

import { useEffect } from "react";
import { useAlternateSlugs } from "@/contexts/AlternateSlugsContext";
import type { Locale } from "@/i18n/routing";

type RegisterAlternateSlugsProps = {
  slugs: Record<Locale, string> | null;
};

export function RegisterAlternateSlugs({
  slugs,
}: RegisterAlternateSlugsProps): null {
  const { setAlternateSlugs } = useAlternateSlugs();

  useEffect(() => {
    setAlternateSlugs(slugs);
  }, [slugs, setAlternateSlugs]);

  return null;
}
