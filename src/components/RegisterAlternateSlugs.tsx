"use client";

import { useEffect } from "react";
import { useAlternateSlugs } from "@/contexts/AlternateSlugsContext";
import type { Locale } from "@/lib/wordpress/blogs";

export function RegisterAlternateSlugs({slugs,}: {slugs: Record<Locale, string> | null;}) {
    
  const { setAlternateSlugs } = useAlternateSlugs();
  useEffect(() => {
    setAlternateSlugs(slugs);
    return () => setAlternateSlugs(null);
  }, [slugs, setAlternateSlugs]);

  return null;
}
