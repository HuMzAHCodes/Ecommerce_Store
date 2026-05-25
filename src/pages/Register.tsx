const Register = () => (
  <div style={{ padding: "4rem 1.5rem", textAlign: "center", fontFamily: "sans-serif" }}>
    <h2>Register — coming soon</h2>
  </div>
);
export default Register;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// Register.tsx
// Temporary placeholder for the Register page. Renders a centered "coming soon"
// heading with minimal inline styling.
// No logic, no props, no theme dependency.
//
// This file exists solely to satisfy the lazy import in App.tsx:
//   const Register = lazy(() => import("./pages/Register"))
// Without it, navigating to /register would throw a module-not-found error.
//
// ── Route context ─────────────────────────────────────────────────────────────
//
// Reached from the Login page via "Don't have an account? Register" link.
// After successful registration, the user should be automatically logged in
// and redirected to /profile or the page they originally intended to visit.
// A route guard should redirect already-authenticated users away from this
// page to /profile.
//
// ── What to build here ────────────────────────────────────────────────────────
//
// This stub should eventually be replaced with the full Register page, which
// will likely include:
//   • First name + last name fields
//   • Email input with format validation
//   • Password input with strength indicator
//   • Confirm password field with match validation
//   • Terms of service + privacy policy consent checkbox
//   • Submit handler calling the auth API and updating AuthContext
//   • Inline field-level error feedback (using the shared Input component)
//   • "Already have an account? Sign in" link to /login
//   • Optional: marketing email opt-in checkbox
//   • Route guard — redirect to /profile if already logged in