const Orders = () => (
  <div style={{ padding: "4rem 1.5rem", textAlign: "center", fontFamily: "sans-serif" }}>
    <h2>Orders — coming soon</h2>
  </div>
);
export default Orders;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// Orders.tsx
// Temporary placeholder for the Orders page. Renders a centered "coming soon"
// heading with minimal inline styling.
// No logic, no props, no theme dependency.
//
// This file exists solely to satisfy the lazy import in App.tsx:
//   const Orders = lazy(() => import("./pages/Orders"))
// Without it, navigating to /orders would throw a module-not-found error.
//
// ── Route context ─────────────────────────────────────────────────────────────
//
// A protected route accessible from the Profile page via a quick link.
// Unauthenticated users should be redirected to /login with a returnTo
// param so they land back here after signing in. Each order row should
// link to a dedicated order detail view (e.g. /orders/:id) showing the
// full breakdown of that specific purchase.
//
// ── What to build here ────────────────────────────────────────────────────────
//
// This stub should eventually be replaced with the full Orders page, which
// will likely include:
//   • List of past orders sorted by date (newest first)
//   • Per-order summary row: order number, date, status badge, total, item count
//   • Order status indicators (Processing, Shipped, Delivered, Cancelled)
//   • "View Details" link per order expanding or navigating to /orders/:id
//   • Order detail view: line items, shipping address, payment method, timeline
//   • Reorder button to add a past order's items back to the cart
//   • Return / refund request flow for eligible orders
//   • Empty state with a CTA to browse the shop if no orders exist
//   • React Query fetch for order history tied to the authenticated user
//   • Route guard — redirect to /login if not authenticated