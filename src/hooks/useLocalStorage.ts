import { useState, useEffect } from "react";

const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch { /* ignore */ }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;

// ──────────────────────────────────────────────────────────────────────────────
// FILE OVERVIEW: useLocalStorage.ts
// ──────────────────────────────────────────────────────────────────────────────
//
// PURPOSE
// -------
// A small generic custom hook that works exactly like useState, except the
// value is automatically synced to localStorage. Any component that uses it
// gets persistent state — the value survives page refreshes — with no extra
// boilerplate.
//
//
// SIGNATURE
// ---------
// useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void]
//
// - T             — the type of the stored value, inferred from initialValue.
// - key           — the localStorage key under which the value is saved.
// - initialValue  — the fallback used when nothing is found in storage yet.
// - returns       — a [value, setValue] tuple, identical in shape to useState.
//
//
// HOW IT WORKS
// ------------
//
// 1. Lazy initial state
//    useState receives an initialiser function (not a value directly). React
//    calls this function only once — on the first render — so the localStorage
//    read happens exactly once rather than on every re-render. Inside it:
//    - If the key exists in localStorage, the raw string is parsed from JSON
//      and used as the starting value.
//    - If the key does not exist, initialValue is used instead.
//    - If JSON.parse throws (corrupted data), the catch block falls back to
//      initialValue silently, so the app never crashes on bad storage data.
//
// 2. setValue
//    A replacement for the standard setState setter. When called it does
//    two things in one step:
//    - Updates React state with setStoredValue so the component re-renders.
//    - Serialises the new value to JSON and writes it to localStorage under
//      the same key, keeping storage in sync immediately.
//    Errors (e.g. storage quota exceeded, private browsing restrictions) are
//    caught and silently ignored so the UI never breaks — the value still
//    updates in memory even if the write to storage fails.
//
// 3. Return value
//    [storedValue, setValue] — a plain tuple that mirrors the useState API.
//    Callers can destructure it exactly like useState:
//    const [theme, setTheme] = useLocalStorage("blum_theme", "light");
//
//
// GENERICS
// --------
// The <T> type parameter means this hook works for any serialisable value:
// strings, numbers, booleans, objects, arrays. TypeScript infers T from the
// initialValue argument, so explicit type annotations are rarely needed.
// The only constraint is that T must be JSON-serialisable — functions,
// class instances, and undefined do not round-trip through JSON cleanly.
//
//
// USAGE EXAMPLES
// --------------
// Simple string:
//