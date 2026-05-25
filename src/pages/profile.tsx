const Profile = () => (
  <div style={{ padding: "4rem 1.5rem", textAlign: "center", fontFamily: "sans-serif" }}>
    <h2>Profile — coming soon</h2>
  </div>
);
export default Profile;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// Profile.tsx
// Temporary placeholder for the Profile page. Renders a centered "coming soon"
// heading with minimal inline styling.
// No logic, no props, no theme dependency.
//
// This file exists solely to satisfy the lazy import in App.tsx:
//   const Profile = lazy(() => import("./pages/Profile"))
// Without it, navigating to /profile would throw a module-not-found error.
//
// ── Route context ─────────────────────────────────────────────────────────────
//
// The Navbar links to /profile when isLoggedIn is true (the avatar initial
// in the right icon rail). This is a protected route — unauthenticated users
// should be redirected to /login, ideally with a returnTo param so they land
// back here after signing in.
//
// ── What to build here ────────────────────────────────────────────────────────
//
// This stub should eventually be replaced with the full Profile page, which
// will likely include:
//   • Account details section (name, email, avatar upload)
//   • Password change form (current password, new password, confirm)
//   • Saved shipping addresses (add, edit, delete, set default)
//   • Payment methods management (saved cards, remove)
//   • Communication preferences (newsletter opt-in, notification settings)
//   • Danger zone — account deletion with confirmation modal
//   • Quick links to /orders and /wishlist
//   • AuthContext integration to read and update the current user
//   • Route guard — redirect to /login if not authenticated