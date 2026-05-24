import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useTheme } from "../../theme/ThemeContext";

interface PageLayoutProps {
  children:       ReactNode;
  cartCount?:     number;
  wishlistCount?: number;
  isLoggedIn?:    boolean;
  userName?:      string;
  hideFooter?:    boolean;
}

const PageLayout = ({
  children,
  cartCount,
  wishlistCount,
  isLoggedIn,
  userName,
  hideFooter = false,
}: PageLayoutProps) => {
  const theme = useTheme();

  return (
    <div
      style={{
        minHeight:      "100vh",
        display:        "flex",
        flexDirection:  "column",
        background:     theme.colors.bgPrimary,
      }}
    >
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        isLoggedIn={isLoggedIn}
        userName={userName}
      />

      {/* Page content fades in on route change */}
      <motion.main
        key={window.location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        style={{ flex: 1 }}
      >
        {children}
      </motion.main>

      {!hideFooter && <Footer />}
    </div>
  );
};

export default PageLayout;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// PageLayout.tsx
// The root shell component that wraps every page in the application.
// Composes Navbar + animated <main> + Footer into a full-height column,
// and triggers a fade-in animation whenever the route changes.
//
// ── What it renders ───────────────────────────────────────────────────────────
//
//  <div>                     — full-height flex column, bgPrimary background
//   ├─ <Navbar>              — sticky top bar, receives cart/auth props
//   ├─ <motion.main>         — animated content area, flex: 1 (fills remaining height)
//   │   └─ {children}        — the current page's content
//   └─ <Footer>              — rendered unless hideFooter is true
//
// ── Props ─────────────────────────────────────────────────────────────────────
//
//  children      — the page content to render inside <main>
//  cartCount     — forwarded directly to <Navbar> for the cart badge
//  wishlistCount — forwarded directly to <Navbar> for the wishlist badge
//  isLoggedIn    — forwarded to <Navbar> to switch user icon / link target
//  userName      — forwarded to <Navbar> for avatar initial and greeting
//  hideFooter    — when true, <Footer> is not rendered (default: false);
//                  useful for pages like checkout or login where a footer
//                  would be distracting or take up unnecessary space
//
// ── Route-change animation ────────────────────────────────────────────────────
//
//  <motion.main> uses key={window.location.pathname} so Framer Motion treats
//  each route as a distinct element. Every navigation unmounts the old
//  <main> and mounts a fresh one, triggering:
//    initial  — opacity: 0, y: +10  (content starts invisible, slightly below)
//    animate  — opacity: 1, y: 0    (fades in and slides up to position)
//    duration — 300 ms, cubic-bezier [0.4, 0, 0.2, 1]
//  This gives every page a consistent, smooth entrance without needing
//  per-page animation setup.
//
// ── Layout structure ──────────────────────────────────────────────────────────
//
//  The outer <div> is minHeight: "100vh" + flexDirection: "column".
//  <motion.main> has flex: 1, so it expands to fill all space between the
//  navbar and footer regardless of how little content a page has. This
//  prevents the footer from floating up on short pages (sticky footer pattern).
//
// ── Theme usage ───────────────────────────────────────────────────────────────
//
//  Only theme.colors.bgPrimary is consumed here — applied as the background
//  of the outermost wrapper so the page never shows a raw white or
//  transparent body behind the content, even during animation transitions.
//
// ── Dependencies ─────────────────────────────────────────────────────────────
//
//  framer-motion  — motion.main for the per-route fade+slide animation
//  Navbar         — sticky top navigation bar
//  Footer         — bottom site footer (conditionally rendered)
//  useTheme()     — pulls bgPrimary color token from ThemeContext