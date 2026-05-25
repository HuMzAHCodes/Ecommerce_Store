import { useEffect, useRef, useState } from "react";

interface Options {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const useIntersection = <T extends HTMLElement = HTMLDivElement>(
  { threshold = 0.1, rootMargin = "0px", triggerOnce = true }: Options = {}
) => {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) observer.unobserve(el);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

export default useIntersection;

// ──────────────────────────────────────────────────────────────────────────────
// FILE OVERVIEW: useIntersection.ts
// ──────────────────────────────────────────────────────────────────────────────
//
// PURPOSE
// -------
// A custom hook that tells a component whether a DOM element has scrolled
// into the visible area of the viewport. The primary use cases are triggering
// fade-in animations when a section comes into view, lazy-loading images or
// content, and firing analytics events when the user reaches a certain part
// of the page — all without any scroll event listeners.
//
//
// SIGNATURE
// ---------
// useIntersection<T extends HTMLElement = HTMLDivElement>(options?: Options)
//   : { ref: RefObject<T>, isVisible: boolean }
//
// - T          — the type of the DOM element being observed. Defaults to
//                HTMLDivElement so most call sites need no explicit annotation.
// - options    — an optional configuration object (see Options below).
// - returns    — an object with two fields:
//                  ref       : attach this to the element you want to watch.
//                  isVisible : true when the element is in the viewport.
//
//
// OPTIONS
// -------
// threshold   (default 0.1)  — how much of the element must be visible before
//                               isVisible flips to true. 0 = any pixel visible,
//                               1 = fully visible, 0.1 = 10% visible.
// rootMargin  (default "0px") — CSS-style margin that expands or shrinks the
//                               effective viewport boundary. "100px" triggers
//                               100px before the element enters the real
//                               viewport (useful for pre-loading content).
// triggerOnce (default true)  — if true, isVisible is set to true once and
//                               never goes back to false. If false, isVisible
//                               toggles every time the element enters or leaves
//                               the viewport.
//
//
// HOW IT WORKS
// ------------
//
// 1. ref
//    A React ref attached to the target DOM element. The hook needs a direct
//    reference to the real DOM node to pass to IntersectionObserver.
//
// 2. isVisible
//    Boolean state that reflects whether the observed element is currently
//    intersecting the viewport according to the given options.
//
// 3. useEffect — setting up the observer
//    Runs whenever threshold, rootMargin, or triggerOnce changes. Inside it:
//    - Guards with `if (!el) return` in case the ref has not attached yet.
//    - Creates an IntersectionObserver with a callback that receives an array
//      of entries. Since only one element is being observed, only the first
//      entry ([entry]) is destructured.
//    - When the element is intersecting:
//        · Sets isVisible to true.
//        · If triggerOnce is true, calls observer.unobserve(el) immediately —
//          the observer stops watching the element, saving resources for the
//          rest of the page session.
//    - When the element is NOT intersecting and triggerOnce is false:
//        · Sets isVisible back to false so the animation or visibility state
//          can re-trigger the next time the element scrolls into view.
//    - Calls observer.observe(el) to start watching.
//    - Returns a cleanup function that calls observer.disconnect(), which
//      stops all observations when the component unmounts or options change.
//
//
// USAGE EXAMPLE
// -------------
// Basic fade-in on scroll:
//
//   const { ref, isVisible } = useIntersection({ threshold: 0.2 });
//
//   <div
//     ref={ref}
//     style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.6s ease" }}
//   >
//     I fade in when scrolled into view.
//   </div>
//
// Watching a specific element type:
//
//   const { ref, isVisible } = useIntersection<HTMLImageElement>();
//   <img ref={ref} src={isVisible ? realSrc : placeholder} />
//
//
// KEY INSIGHT
// -----------
// The triggerOnce flag creates two fundamentally different behaviours from
// the same hook. When true (the default), the observer calls unobserve()
// the moment the element becomes visible and never runs again — this is ideal
// for one-shot animations where re-triggering on scroll-back would look broken.
// When false, the observer stays alive for the entire component lifetime and
// continuously toggles isVisible — this is ideal for sticky elements, progress
// indicators, or anything that should respond every time it enters and leaves
// the viewport. Choosing the wrong mode is the most common mistake when using
// this hook: a fade-in animation with triggerOnce: false will re-animate every
// time the user scrolls past the element, which is rarely the intended effect.
//
// ──────────────────────────────────────────────────────────────────────────────