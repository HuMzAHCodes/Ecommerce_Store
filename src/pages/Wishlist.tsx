const Wishlist = () => (
  <div style={{ padding: "4rem 1.5rem", textAlign: "center", fontFamily: "sans-serif" }}>
    <h2>Wishlist — coming soon</h2>
  </div>
);
export default Wishlist;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// Wishlist.tsx
// Temporary placeholder for the Wishlist page. Renders a centered "coming soon"
// heading with minimal inline styling.
// No logic, no props, no theme dependency.
//
// This file exists solely to satisfy the lazy import in App.tsx:
//   const Wishlist = lazy(() => import("./pages/Wishlist"))
// Without it, navigating to /wishlist would throw a module-not-found error.
//
// ── Route context ─────────────────────────────────────────────────────────────
//
// The Navbar links to /wishlist via the Heart icon in the right icon rail,
// visible to all users regardless of auth state. If wishlists are tied to
// an account, unauthenticated users should be prompted to log in or register
// to save items persistently; alternatively, a guest wishlist can be stored
// in localStorage and merged into the account on login.
//
// ── What to build here ────────────────────────────────────────────────────────
//
// This stub should eventually be replaced with the full Wishlist page, which
// will likely include:
//   • Grid of saved product cards (image, name, price, availability badge)
//   • Remove from wishlist button per item
//   • "Add to Cart" button per item (with variant selector if needed)
//   • "Move all to Cart" bulk action
//   • Stock availability indicator (in stock / low stock / sold out)
//   • Empty state with a CTA to browse the shop if no items are saved
//   • Wishlist count synced to the Navbar Heart badge via WishlistContext
//   • Persistence strategy — AuthContext for logged-in users,
//     localStorage fallback for guests with merge on login