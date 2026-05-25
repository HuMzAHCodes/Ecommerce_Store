import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";

// ── Types ─────────────────────────────────────────────────────

export interface CartProduct {
  id:       string;
  name:     string;
  price:    number;
  salePrice?: number | null;
  image:    string;
  slug:     string;
}

export interface CartItem {
  product:  CartProduct;
  quantity: number;
}

interface CartState {
  items:    CartItem[];
  isOpen:   boolean;
}

type CartAction =
  | { type: "ADD_ITEM";      payload: CartProduct }
  | { type: "REMOVE_ITEM";   payload: string }
  | { type: "UPDATE_QTY";    payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_DRAWER" }
  | { type: "OPEN_DRAWER" }
  | { type: "CLOSE_DRAWER" }
  | { type: "HYDRATE";       payload: CartItem[] };

interface CartContextValue extends CartState {
  addItem:       (product: CartProduct) => void;
  removeItem:    (id: string) => void;
  updateQty:     (id: string, quantity: number) => void;
  clearCart:     () => void;
  toggleDrawer:  () => void;
  openDrawer:    () => void;
  closeDrawer:   () => void;
  totalItems:    number;
  totalPrice:    number;
  isInCart:      (id: string) => boolean;
}

// ── Reducer ───────────────────────────────────────────────────

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {

    case "ADD_ITEM": {
      const exists = state.items.find((i) => i.product.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { product: action.payload, quantity: 1 }] };
    }

    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.product.id !== action.payload) };

    case "UPDATE_QTY":
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.product.id !== action.payload.id) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "TOGGLE_DRAWER":
      return { ...state, isOpen: !state.isOpen };

    case "OPEN_DRAWER":
      return { ...state, isOpen: true };

    case "CLOSE_DRAWER":
      return { ...state, isOpen: false };

    case "HYDRATE":
      return { ...state, items: action.payload };

    default:
      return state;
  }
};

// ── Context ───────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
};

// ── Provider ──────────────────────────────────────────────────

const STORAGE_KEY = "blum_cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) dispatch({ type: "HYDRATE", payload: JSON.parse(saved) });
    } catch { /* ignore */ }
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  // ── Derived values ────────────────────────────────────────
  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);

  const totalPrice = state.items.reduce((sum, i) => {
    const price = i.product.salePrice ?? i.product.price;
    return sum + price * i.quantity;
  }, 0);

  const isInCart = (id: string) => state.items.some((i) => i.product.id === id);

  const value: CartContextValue = {
    ...state,
    addItem:      (product)          => dispatch({ type: "ADD_ITEM",    payload: product }),
    removeItem:   (id)               => dispatch({ type: "REMOVE_ITEM", payload: id }),
    updateQty:    (id, quantity)     => dispatch({ type: "UPDATE_QTY",  payload: { id, quantity } }),
    clearCart:    ()                 => dispatch({ type: "CLEAR_CART" }),
    toggleDrawer: ()                 => dispatch({ type: "TOGGLE_DRAWER" }),
    openDrawer:   ()                 => dispatch({ type: "OPEN_DRAWER" }),
    closeDrawer:  ()                 => dispatch({ type: "CLOSE_DRAWER" }),
    totalItems,
    totalPrice,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// CartContext.tsx
// Global cart state management built on React Context + useReducer.
// Handles all cart operations (add, remove, update quantity, clear), controls
// a cart drawer open/close state, derives computed totals, and persists the
// cart to localStorage so it survives page refreshes.
//
// ── Architecture ──────────────────────────────────────────────────────────────
//
//  CartContext   — the React context holding the full CartContextValue
//  cartReducer   — pure function describing all state transitions
//  CartProvider  — stateful wrapper that owns the reducer, side effects,
//                  derived values, and exposes everything via context
//  useCart()     — consumer hook; throws a clear error if used outside the provider
//
// ── Type hierarchy ────────────────────────────────────────────────────────────
//
//  CartProduct       — the minimal product shape needed by the cart:
//                      id, name, price, salePrice (optional), image, slug.
//                      Exported so product-listing components can pass
//                      correctly shaped objects to addItem().
//
//  CartItem          — a CartProduct paired with a quantity. This is what
//                      actually lives in state.items[].
//                      Exported for use in cart UI components.
//
//  CartState         — the raw reducer state: items[] + isOpen (drawer).
//
//  CartAction        — discriminated union of all dispatchable action types.
//                      Each case is a separate object shape so the reducer
//                      switch gets full type narrowing on action.payload.
//
//  CartContextValue  — extends CartState with all action-dispatching methods
//                      plus the three derived read-only values (totalItems,
//                      totalPrice, isInCart). This is what useCart() returns.
//
// ── Reducer: action → state transitions ──────────────────────────────────────
//
//  ADD_ITEM      — if product.id already exists in items[], increments its
//                  quantity by 1. Otherwise appends a new CartItem with quantity 1.
//
//  REMOVE_ITEM   — filters out the item whose product.id matches the payload.
//
//  UPDATE_QTY    — sets a specific item's quantity to the given value.
//                  If the new quantity is ≤ 0, the item is removed entirely
//                  (same effect as REMOVE_ITEM) — prevents zero/negative quantities.
//
//  CLEAR_CART    — replaces items[] with an empty array. isOpen is unchanged.
//
//  TOGGLE_DRAWER — flips isOpen boolean (open ↔ closed).
//  OPEN_DRAWER   — sets isOpen: true unconditionally.
//  CLOSE_DRAWER  — sets isOpen: false unconditionally.
//                  (Three separate actions so callers don't need to read
//                  current state before dispatching — each is idempotent.)
//
//  HYDRATE       — replaces items[] with the payload (used on mount to
//                  restore persisted data from localStorage). Does not
//                  touch isOpen so the drawer stays closed on page load.
//
// ── localStorage persistence ──────────────────────────────────────────────────
//
//  Two useEffect hooks handle persistence:
//
//  Hydration (mount, [] deps):
//    Reads STORAGE_KEY ("blum_cart") from localStorage on first render.
//    If data exists and is valid JSON, dispatches HYDRATE to restore the
//    saved items[]. Wrapped in try/catch — corrupt or missing data is
//    silently ignored, leaving the cart empty rather than crashing.
//
//  Persistence (state.items deps):
//    Writes the current items[] to localStorage as JSON on every change.
//    Only items are persisted — isOpen is intentionally excluded so the
//    drawer is never restored in an open state on next visit.
//
//  Storage key "blum_cart" is defined as a module-level constant so it
//  can be changed in one place without hunting through the file.
//
// ── Derived values (computed inside Provider, not stored in state) ─────────────
//
//  totalItems  — sum of all item quantities. Used for the Navbar cart badge count.
//                Recomputed on every render from state.items (no memo needed
//                for a reduce over a typical cart-sized array).
//
//  totalPrice  — sum of (effectivePrice × quantity) across all items.
//                effectivePrice = salePrice ?? price, so sale items are
//                automatically reflected in the total without extra logic.
//
//  isInCart(id) — returns true if any item in the cart has the given product id.
//                 Used by product cards to show an "In Cart" indicator or
//                 swap the "Add to Cart" button to "Go to Cart".
//
// ── useCart() hook ────────────────────────────────────────────────────────────
//
//  Returns the full CartContextValue. Throws a descriptive error if called
//  outside <CartProvider> so missing provider bugs surface immediately.
//  Usage:
//    const { addItem, totalItems, isInCart, openDrawer } = useCart();
//
// ── Drawer state ──────────────────────────────────────────────────────────────
//
//  isOpen lives in CartState (managed by the reducer) rather than in a
//  separate useState so it is co-located with the cart data and can be
//  toggled from anywhere in the tree via useCart() without prop drilling.
//  Typical usage:
//    addItem(product) then openDrawer() — add to cart and slide the drawer open
//    closeDrawer()                      — user dismisses the drawer
//
// ── Exports ───────────────────────────────────────────────────────────────────
//
//  CartProduct   (interface) — for typing addItem() call sites
//  CartItem      (interface) — for typing cart UI components
//  useCart       (hook)      — primary consumer API
//  CartProvider  (component) — wraps the app (or a subtree) at the root level
//  CartContext   (default)   — the raw context object; rarely needed directly,
//                              but exported for advanced use cases like
//                              testing with a custom Provider value
//
// ── Dependencies ─────────────────────────────────────────────────────────────
//
//  React built-ins only: createContext, useContext, useReducer, useEffect.
//  No external state library, no immer, no zustand — the cart logic is
//  simple enough that a plain reducer covers all cases cleanly.