import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import type { CartProduct } from "./CartContext";

// ── Types ─────────────────────────────────────────────────────

type WishlistItem = CartProduct;

interface WishlistState {
  items: WishlistItem[];
}

type WishlistAction =
  | { type: "ADD_ITEM";    payload: WishlistItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR" }
  | { type: "HYDRATE";     payload: WishlistItem[] };

interface WishlistContextValue extends WishlistState {
  addItem:    (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  toggle:     (item: WishlistItem) => void;
  clear:      () => void;
  isWishlisted: (id: string) => boolean;
  totalItems:   number;
}

// ── Reducer ───────────────────────────────────────────────────

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case "ADD_ITEM":
      if (state.items.find((i) => i.id === action.payload.id)) return state;
      return { items: [...state.items, action.payload] };

    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.id !== action.payload) };

    case "CLEAR":
      return { items: [] };

    case "HYDRATE":
      return { items: action.payload };

    default:
      return state;
  }
};

// ── Context ───────────────────────────────────────────────────

const WishlistContext = createContext<WishlistContextValue | null>(null);

export const useWishlist = (): WishlistContextValue => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
};

// ── Provider ──────────────────────────────────────────────────

const STORAGE_KEY = "blum_wishlist";

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) dispatch({ type: "HYDRATE", payload: JSON.parse(saved) });
    } catch { /* ignore */ }
  }, []);

  // Persist on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const isWishlisted = (id: string) => state.items.some((i) => i.id === id);

  const toggle = (item: WishlistItem) => {
    isWishlisted(item.id)
      ? dispatch({ type: "REMOVE_ITEM", payload: item.id })
      : dispatch({ type: "ADD_ITEM",    payload: item });
  };

  const value: WishlistContextValue = {
    ...state,
    addItem:    (item) => dispatch({ type: "ADD_ITEM",    payload: item }),
    removeItem: (id)   => dispatch({ type: "REMOVE_ITEM", payload: id }),
    toggle,
    clear:      ()     => dispatch({ type: "CLEAR" }),
    isWishlisted,
    totalItems: state.items.length,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export default WishlistContext;


// ──────────────────────────────────────────────────────────────────────────────
// FILE OVERVIEW: WishlistContext.tsx
// ──────────────────────────────────────────────────────────────────────────────
//
// PURPOSE
// -------
// This file implements a global wishlist system using React Context +
// useReducer. It lets users save products they are interested in across
// the entire app without prop-drilling. The wishlist is automatically
// persisted to localStorage so it survives page refreshes.
//
//
// KEY BUILDING BLOCKS
// -------------------
//
// 1. Types
//    - `WishlistItem`        — re-uses the `CartProduct` shape imported from
//                              CartContext (same product structure, different
//                              purpose). This avoids duplicating the type.
//    - `WishlistState`       — holds a single field: `items`, the array of
//                              saved products.
//    - `WishlistAction`      — the four actions the reducer understands:
//                              ADD_ITEM, REMOVE_ITEM, CLEAR, HYDRATE.
//    - `WishlistContextValue`— everything exposed to consumers: the state
//                              fields plus five helper functions and a
//                              computed `totalItems` count.
//
// 2. wishlistReducer
//    A pure function: (state, action) → new state. Handles every transition:
//    - ADD_ITEM    → appends the product only if it is not already in the
//                    list (deduplication guard via Array.find).
//    - REMOVE_ITEM → filters out the product matching the given id.
//    - CLEAR       → resets items to an empty array.
//    - HYDRATE     → replaces items wholesale with the array loaded from
//                    localStorage on app boot.
//
// 3. WishlistContext / useWishlist()
//    - `WishlistContext` is the React context object.
//    - `useWishlist()` is the public hook. It throws a descriptive error if
//      called outside <WishlistProvider>, preventing silent null-context bugs.
//
// 4. WishlistProvider
//    The component that owns the state and wires everything together:
//
//    a) Initialisation
//       `useReducer` starts with an empty items array.
//
//    b) Hydration (first useEffect, runs once on mount)
//       Reads `blum_wishlist` from localStorage. If the key exists, it parses
//       the JSON and dispatches HYDRATE to restore the previous session's list
//       without any network request.
//
//    c) Persistence (second useEffect, runs on every items change)
//       Any time `state.items` changes — add, remove, or clear — the updated
//       array is immediately serialised and written back to localStorage.
//       This keeps storage in sync automatically without manual save calls.
//
//    d) isWishlisted(id)
//       A helper that returns true if a product with the given id already
//       exists in the list. Used internally by `toggle` and exposed to
//       consumers so UI components can reflect the correct heart/bookmark state.
//
//    e) toggle(item)
//       The main consumer-facing action. Checks isWishlisted and either
//       adds or removes the item — one function handles both directions,
//       so a heart button only needs to call toggle() on click.
//
//    f) Context value
//       Spreads the full state plus addItem, removeItem, toggle, clear,
//       isWishlisted, and the computed totalItems into `value` and passes
//       it to <WishlistContext.Provider>.
//
//
// STORAGE KEY
// -----------
// blum_wishlist — the localStorage key holding the serialised WishlistItem[].
//
//
// RELATIONSHIP TO CARTCONTEXT
// ---------------------------
// WishlistItem is intentionally the same shape as CartProduct. This means a
// wishlisted item can be moved to the cart without any data transformation —
// just pass the WishlistItem directly to the cart's addItem function.
//
//
// DIFFERENCE FROM AUTHCONTEXT
// ---------------------------
// Unlike AuthContext, there is no isLoading state here because all wishlist
// operations are synchronous (local state + localStorage only). There are also
// two useEffects instead of one: the first hydrates on mount, the second
// auto-persists on every change. This separation keeps each effect focused on
// a single responsibility.
//
// ──────────────────────────────────────────────────────────────────────────────