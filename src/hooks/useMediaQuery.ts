import { useState, useEffect } from "react";

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);

  return matches;
};

// Preset breakpoint hooks
export const useIsMobile  = () => useMediaQuery("(max-width: 768px)");
export const useIsTablet  = () => useMediaQuery("(max-width: 1024px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1025px)");

export default useMediaQuery;

// ──────────────────────────────────────────────────────────────────────────────
// FILE OVERVIEW: useMediaQuery.ts
// ──────────────────────────────────────────────────────────────────────────────
//
// PURPOSE
// -------
// A custom hook that tells a component whether a CSS media query currently
// matches the browser window. It also re-evaluates automatically whenever the
// window is resized or the environment changes, so components stay in sync
// with the current screen size without any manual event wiring.
//
//
// SIGNATURE
// ---------
// useMediaQuery(query: string): boolean
//
// - query   — any valid CSS media query string, e.g. "(max-width: 768px)".
// - returns — true if the query matches the current viewport, false otherwise.
//             Updates automatically when the viewport changes.
//
//
// HOW IT WORKS
// ------------
//
// 1. Lazy initial state
//    useState receives an initialiser function that calls
//    window.matchMedia(query).matches immediately. This means the very first
//    render already has the correct value — there is no flicker where the
//    component briefly shows the wrong layout before the effect runs.
//
// 2. useEffect — subscribing to changes
//    Runs whenever the `query` string changes. Inside it:
//    - Creates a MediaQueryList object (mq) by calling window.matchMedia.
//    - Defines a handler that updates `matches` whenever the query result
//      flips (e.g. the user resizes the window past the breakpoint).
//    - Attaches the handler via mq.addEventListener("change", handler).
//    - Returns a cleanup function that removes the listener via
//      mq.removeEventListener, preventing memory leaks when the component
//      unmounts or the query string changes.
//
// 3. Return value
//    The current boolean result of the media query. Components use this
//    directly in JSX conditionals or style logic.
//
//
// PRESET BREAKPOINT HOOKS
// -----------------------
// Three named exports wrap useMediaQuery with the app's standard breakpoints:
//
// - useIsMobile()  — true when viewport width is 768px or below.
// - useIsTablet()  — true when viewport width is 1024px or below.
// - useIsDesktop() — true when viewport width is 1025px or above.
//
// These exist so call sites never have to remember or repeat the raw query
// strings. Instead of useMediaQuery("(max-width: 768px)") everywhere, a
// component simply calls useIsMobile(). If the breakpoint ever needs to
// change, it is updated in one place here and all consumers pick it up.
//
//
// USAGE EXAMPLES
// --------------
// Raw query:
//   const isLandscape = useMediaQuery("(orientation: landscape)");
//
// Preset hooks:
//   const isMobile  = useIsMobile();
//   const isDesktop = useIsDesktop();
//
//   return isMobile ? <MobileNav /> : <DesktopNav />;
//
//
// KEY INSIGHT
// -----------
// The lazy initialiser and the useEffect work together to cover two different
// moments in time. The lazy initialiser handles the first render — it reads
// the current match synchronously so the component starts with the right value
// and never flickers. The useEffect handles everything after — it keeps the
// value updated as the viewport changes. Without the lazy initialiser, there
// would always be a one-render delay where the component renders with the
// wrong layout. Without the useEffect, the value would be correct on load but
// would never update when the user resizes the window.
//
// ──────────────────────────────────────────────────────────────────────────────