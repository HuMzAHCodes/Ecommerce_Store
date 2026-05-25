const Cart = () => (
  <div style={{ padding: "4rem 1.5rem", textAlign: "center", fontFamily: "sans-serif" }}>
    <h2>Cart — coming soon</h2>
  </div>
);
export default Cart;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// Cart.tsx
// Temporary placeholder for the Cart page. Renders a centered "coming soon"
// heading with minimal inline styling.
// No logic, no props, no theme dependency.
//
// This file exists solely to satisfy the lazy import in App.tsx:
//   const Cart = lazy(() => import("./pages/Cart"))
// Without it, navigating to /cart would throw a module-not-found error.
//
// ── What to build here ────────────────────────────────────────────────────────
//
// This stub should eventually be replaced with the full Cart page, which
// will likely include:
//   • List of cart items (image, name, variant, quantity, price)
//   • Quantity increment / decrement controls per item
//   • Remove item button per line
//   • Order summary panel (subtotal, shipping estimate, taxes, total)
//   • Promo / discount code input
//   • "Continue Shopping" link back to /shop
//   • "Proceed to Checkout" button linking to /checkout
//   • Empty cart state with a CTA to browse the shop
//   • CartContext integration for reading and mutating cart state