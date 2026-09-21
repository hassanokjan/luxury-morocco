"use client";

import { useLayoutEffect } from "react";
import { useAlternateSlugs } from "@/contexts/AlternateSlugsContext";
import type { Locale } from "@/i18n/routing";

type RegisterAlternateSlugsProps = {
  slugs: Record<Locale, string> | null;
};

export function RegisterAlternateSlugs({slugs,}: RegisterAlternateSlugsProps): null {
  
  const { setAlternateSlugs } = useAlternateSlugs();

  useLayoutEffect(() => {
    setAlternateSlugs(slugs);

    return () => {
      setAlternateSlugs(null);
    };
  }, [slugs, setAlternateSlugs]);

  return null;
}
