const ProductPage = () => (
  <div style={{ padding: "4rem 1.5rem", textAlign: "center", fontFamily: "sans-serif" }}>
    <h2>ProductPage — coming soon</h2>
  </div>
);
export default ProductPage;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// ProductPage.tsx
// Temporary placeholder for the individual product detail page. Renders a
// centered "coming soon" heading with minimal inline styling.
// No logic, no props, no theme dependency.
//
// This file exists solely to satisfy the lazy import in App.tsx:
//   const ProductPage = lazy(() => import("./pages/ProductPage"))
// Without it, navigating to /shop/:slug would throw a module-not-found error.
//
// ── Route context ─────────────────────────────────────────────────────────────
//
// This page is mounted at /shop/:slug where :slug is the product's URL handle
// or ID. The real implementation will need to call useParams() to extract
// the slug and use it to fetch the correct product.
//
// ── What to build here ────────────────────────────────────────────────────────
//
// This stub should eventually be replaced with the full ProductPage, which
// will likely include:
//   • useParams() to read :slug from the URL
//   • React Query fetch for product data by slug
//   • Image gallery / carousel
//   • Product title, price, description, and badge (Sale / New)
//   • Variant selector (size, color, scent, etc.)
//   • Quantity picker + Add to Cart button
//   • Wishlist toggle
//   • Related / recommended products section
//   • Breadcrumb navigation (Home → Shop → Product name)