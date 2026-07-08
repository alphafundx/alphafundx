"use client";

import { useEffect, useState } from "react";

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

const breakpoints: Record<Breakpoint, string> = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
};

export function useMediaQuery(query: Breakpoint | string): boolean {
  const mediaQuery = query in breakpoints ? breakpoints[query as Breakpoint] : query;
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(mediaQuery);
    setMatches(mql.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [mediaQuery]);

  return matches;
}
