import { useState, useEffect } from "react";

const useDebounce = <T>(value: T, delay: number = 400): T => {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};

export default useDebounce;

// ──────────────────────────────────────────────────────────────────────────────
// FILE OVERVIEW: useDebounce.ts
// ──────────────────────────────────────────────────────────────────────────────
//
// PURPOSE
// -------
// A generic custom hook that delays propagating a rapidly changing value until
// it has stopped changing for a specified amount of time. The classic use case
// is a search input — instead of firing an API call on every single keystroke,
// the call is held off until the user pauses typing.
//
//
// SIGNATURE
// ---------
// useDebounce<T>(value: T, delay?: number): T
//
// - T      — the type of the value being debounced, inferred automatically.
// - value  — the raw, fast-changing value to watch (e.g. a search string).
// - delay  — how many milliseconds to wait after the last change before
//             updating. Defaults to 400ms if not provided.
// - returns — the debounced version of value, which only updates once the
//              value has been stable for the full delay period.
//
//
// HOW IT WORKS
// ------------
//
// 1. State
//    `debounced` holds the last "settled" version of value. It starts equal
//    to the initial value and only updates after the timer fires.
//
// 2. useEffect
//    Runs every time `value` or `delay` changes. Each time it runs it:
//    - Schedules a setTimeout that will copy the latest value into `debounced`
//      after `delay` milliseconds.
//    - Returns a cleanup function that cancels that timer via clearTimeout.
//
//    The cleanup is the key mechanism. If `value` changes again before the
//    timer fires, React runs the cleanup (cancels the pending timer) and
//    immediately starts a fresh one. This means `debounced` only ever updates
//    when `value` has been completely still for the full `delay` window.
//
// 3. Return value
//    The settled `debounced` value. The caller uses this instead of the raw
//    value for anything expensive — API calls, filtering large lists, etc.
//
//
// TIMELINE EXAMPLE (delay = 400ms)
// ---------------------------------
// t=0ms   user types "a"   → timer scheduled for t=400ms
// t=80ms  user types "ab"  → previous timer cancelled, new timer for t=480ms
// t=200ms user types "abc" → previous timer cancelled, new timer for t=600ms
// t=600ms no more typing   → timer fires, debounced becomes "abc"
// Result: only one update instead of three.
//
//
// USAGE EXAMPLE
// -------------
// const [query, setQuery] = useState("");
// const debouncedQuery    = useDebounce(query, 400);
//
// useEffect(() => {
//   if (debouncedQuery) fetchSearchResults(debouncedQuery);
// }, [debouncedQuery]);
//
// The input calls setQuery on every keystroke (instant UI feedback),
// while the API call only fires once the user pauses for 400ms.
//
//
// GENERICS
// --------
// The <T> type parameter means the hook works for any value type — strings,
// numbers, objects, or arrays. TypeScript infers T from the argument passed
// in, so no explicit annotation is needed at the call site.
//
//
// KEY INSIGHT
// -----------
// The entire hook is really just one idea: cancel the previous timer every
// time the value changes, and only let a timer fully complete when the value
// stops moving. The cleanup function returned from useEffect is what makes
// that cancellation automatic and leak-free — without it, every render would
// stack up dangling timers that all fire independently, causing multiple
// stale updates instead of one correct one.
//
// ──────────────────────────────────────────────────────────────────────────────