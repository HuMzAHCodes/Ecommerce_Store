const NotFound = () => (
  <div style={{ padding: "4rem 1.5rem", textAlign: "center", fontFamily: "sans-serif" }}>
    <h2>NotFound — coming soon</h2>
  </div>
);
export default NotFound;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// NotFound.tsx
// Temporary placeholder for the 404 Not Found page. Renders a centered
// "coming soon" heading with minimal inline styling.
// No logic, no props, no theme dependency.
//
// This file exists solely to satisfy the catch-all route in App.tsx:
//   <Route path="*" element={<NotFound />} />
// Without it, any unmatched URL would render nothing instead of a
// meaningful fallback.
//
// ── Route context ─────────────────────────────────────────────────────────────
//
// Mounted on the wildcard path="*" route — the last route in the table,
// matched only when no other route fits the current URL. Triggered by
// mistyped URLs, stale links, deleted pages, or direct navigation to a
// path that was never defined. Unlike the other placeholder pages this
// one should never be "replaced" entirely — it always needs to exist as
// the app's error boundary for routing.
//
// ── What to build here ────────────────────────────────────────────────────────
//
// This stub should eventually be replaced with a polished 404 page, which
// will likely include:
//   • Large "404" heading or illustrated graphic
//   • Friendly message explaining the page could not be found
//   • "Go back" button using useNavigate(-1) to return to the previous page
//   • "Go to Homepage" link to /
//   • "Browse the Shop" CTA link to /shop
//   • Optional: search bar so the user can immediately look for what they wanted
//   • Consistent theme styling via useTheme() matching the rest of the storefront