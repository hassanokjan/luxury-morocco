"use client";

import {createContext,useContext,useState,useCallback,ReactNode,} from "react";

import type { Locale } from "@/i18n/routing";

type AlternateSlugsMap = Partial<Record<Locale, string>> | null;

interface AlternateSlugsContextValue {
  alternateSlugs: AlternateSlugsMap;
  setAlternateSlugs: (map: AlternateSlugsMap) => void;
}

const AlternateSlugsContext = createContext<AlternateSlugsContextValue | undefined>(undefined);

export function AlternateSlugsProvider({ children }: { children: ReactNode }) {
  const [alternateSlugs, setAlternateSlugsState] =
    useState<AlternateSlugsMap>(null);

  const setAlternateSlugs = useCallback((map: AlternateSlugsMap) => {
    setAlternateSlugsState(map);
  }, []);

  return (
    <AlternateSlugsContext.Provider
      value={{ alternateSlugs, setAlternateSlugs }}
    >
      {children}
    </AlternateSlugsContext.Provider>
  );
}

export function useAlternateSlugs() {
  const ctx = useContext(AlternateSlugsContext);
  if (!ctx) {
    throw new Error(
      "useAlternateSlugs must be used within an AlternateSlugsProvider",
    );
  }
  return ctx;
}
