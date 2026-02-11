"use client";

import { createContext, useContext } from "react";
import type Lenis from "lenis";

type LenisContextType = Lenis | null;

export const LenisContext = createContext<LenisContextType>(null);

export function useLenis() {
  return useContext(LenisContext);
}
