const Login = () => (
  <div style={{ padding: "4rem 1.5rem", textAlign: "center", fontFamily: "sans-serif" }}>
    <h2>Login — coming soon</h2>
  </div>
);
export default Login;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// Login.tsx
// Temporary placeholder for the Login page. Renders a centered "coming soon"
// heading with minimal inline styling.
// No logic, no props, no theme dependency.
//
// This file exists solely to satisfy the lazy import in App.tsx:
//   const Login = lazy(() => import("./pages/Login"))
// Without it, navigating to /login would throw a module-not-found error.
//
// ── Route context ─────────────────────────────────────────────────────────────
//
// The Navbar links to /login when isLoggedIn is false (the User icon in the
// right icon rail). After a successful login, the user should be redirected
// to their previous page or /profile as a default. A route guard on protected
// pages (Profile, Orders, Wishlist) should redirect unauthenticated users here.
//
// ── What to build here ────────────────────────────────────────────────────────
//
// This stub should eventually be replaced with the full Login page, which
// will likely include:
//   • Email + password input fields (using the shared Input component)
//   • "Remember me" checkbox
//   • Form validation with inline error feedback
//   • Submit handler calling the auth API and updating AuthContext
//   • "Forgot password" link to a password reset flow
//   • "Don't have an account? Register" link to /register
//   • Social login options (Google, Apple) if supported
//   • Redirect logic — return user to the page they came from after login
//   • Route guard — redirect to /profile if already logged in