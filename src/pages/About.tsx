const About = () => (
  <div style={{ padding: "4rem 1.5rem", textAlign: "center", fontFamily: "sans-serif" }}>
    <h2>About — coming soon</h2>
  </div>
);
export default About;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// About.tsx
// Temporary placeholder for the About page. Renders a centered "coming soon"
// heading with minimal inline styling.
// No logic, no props, no theme dependency.
//
// This file exists solely to satisfy the lazy import in App.tsx:
//   const About = lazy(() => import("./pages/About"))
// Without it, navigating to /about would throw a module-not-found error.
//
// ── Route context ─────────────────────────────────────────────────────────────
//
// Linked from the main Navbar as a top-level nav item and from the Company
// section in the Footer. A public page — no auth required, no route guard
// needed. Primarily static/editorial content with no data fetching.
//
// ── What to build here ────────────────────────────────────────────────────────
//
// This stub should eventually be replaced with the full About page, which
// will likely include:
//   • Brand hero section — full-width image or video with tagline
//   • Brand story — founding narrative, mission, and values
//   • Ingredients / formulation philosophy section
//   • Sustainability commitments (packaging, sourcing, certifications)
//   • Meet the team section with photos and bios
//   • Press mentions / media logos strip
//   • Community or social proof section (UGC, reviews highlight)
//   • CTA section linking to /shop or a featured collection