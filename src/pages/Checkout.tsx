const Checkout = () => (
  <div style={{ padding: "4rem 1.5rem", textAlign: "center", fontFamily: "sans-serif" }}>
    <h2>Checkout — coming soon</h2>
  </div>
);
export default Checkout;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// Checkout.tsx
// Temporary placeholder for the Checkout page. Renders a centered "coming soon"
// heading with minimal inline styling.
// No logic, no props, no theme dependency.
//
// This file exists solely to satisfy the lazy import in App.tsx:
//   const Checkout = lazy(() => import("./pages/Checkout"))
// Without it, navigating to /checkout would throw a module-not-found error.
//
// ── Route context ─────────────────────────────────────────────────────────────
//
// Checkout is a terminal flow page — users arrive here from /cart and leave
// either to an order confirmation page or back to /cart on cancellation.
// In PageLayout, hideFooter should be set to true for this route to keep
// the user focused on completing their purchase without distractions.
//
// ── What to build here ────────────────────────────────────────────────────────
//
// This stub should eventually be replaced with the full Checkout page, which
// will likely include:
//   • Multi-step flow: Shipping → Payment → Review → Confirmation
//   • Shipping address form (name, address, city, postcode, country)
//   • Delivery method selector (standard, express, next-day)
//   • Payment details form or third-party integration (Stripe, PayPal, etc.)
//   • Order summary sidebar (items, discounts, shipping cost, total)
//   • Guest checkout option alongside account-based checkout
//   • Form validation with inline error feedback
//   • Route guard — redirect to /cart if cart is empty
//   • AuthContext integration to pre-fill address for logged-in users
//   • CartContext integration to read items and clear cart on success