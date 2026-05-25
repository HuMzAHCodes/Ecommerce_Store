const Shop = () => (
  <div style={{ padding: "4rem 1.5rem", textAlign: "center", fontFamily: "sans-serif" }}>
    <h2>Shop — coming soon</h2>
  </div>
);
export default Shop;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// Shop.tsx
// Temporary placeholder for the Shop page. Renders a centered "coming soon"
// heading with minimal inline styling. No logic, no props, no theme dependency.
//
// This file exists solely to satisfy the lazy import in App.tsx:
//   const Shop = lazy(() => import("./pages/Shop"))
// Without it, navigating to /shop would throw a module-not-found error.
//
// ── What to build here ────────────────────────────────────────────────────────
//
// This stub should eventually be replaced with the full Shop page, which
// will likely include:
//   • Product grid with filtering (?filter=new / sale / bestsellers)
//   • Search query param support (?search=)
//   • Pagination or infinite scroll
//   • Sort controls (price, popularity, newest)
//   • Category/collection sidebar or pill filters
//   • Integration with React Query for fetching product data