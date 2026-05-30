import type { ReactNode }  from "react";
import { motion }          from "framer-motion";
import { useTheme }        from "../../../theme/ThemeContext";
import Navbar              from "../Navbar/Navbar";
import Footer              from "../Footer/Footer";
import { pageWrapperStyles, pageMainStyles, PAGE_TRANSITION } from "./pageLayoutStyles";

// ── Types ─────────────────────────────────────────────────────

interface PageLayoutProps {
  children:       ReactNode;
  cartCount?:     number;
  wishlistCount?: number;
  isLoggedIn?:    boolean;
  userName?:      string;
  hideFooter?:    boolean;
}

// ── Component ─────────────────────────────────────────────────

const PageLayout = ({
  children,
  cartCount,
  wishlistCount,
  isLoggedIn,
  userName,
  hideFooter = false,
}: PageLayoutProps) => {
  const { colors } = useTheme();
  const currentPath = window.location.pathname;

  return (
    <div style={pageWrapperStyles(colors)}>

      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        isLoggedIn={isLoggedIn}
        userName={userName}
      />

      <motion.main
        key={currentPath}
        style={pageMainStyles}
        {...PAGE_TRANSITION}
      >
        {children}
      </motion.main>

      {!hideFooter && <Footer />}

    </div>
  );
};

export default PageLayout;

/*
 * ── PageLayout — What this folder does ──────────────────────────────────────
 *
 * Root shell that wraps every page in the app.
 * Composes Navbar + animated <main> + Footer into a full-height column.
 *
 * Structure:
 *   <div>          — full-height flex column, bgPrimary background
 *   <Navbar>       — sticky top bar, receives cart/wishlist/auth props
 *   <motion.main>  — keyed on pathname so every route change triggers
 *                    a fresh fade+slide-up entrance (opacity 0→1, y 10→0)
 *   <Footer>       — conditionally rendered; hidden when hideFooter is true
 *                    (useful for checkout, login, or distraction-free pages)
 *
 * Props:
 *   children      — page content rendered inside <main>
 *   cartCount     — forwarded to Navbar for the cart badge
 *   wishlistCount — forwarded to Navbar for the wishlist badge
 *   isLoggedIn    — forwarded to Navbar to switch user icon / link target
 *   userName      — forwarded to Navbar for avatar initial and greeting
 *   hideFooter    — skips rendering <Footer> (default: false)
 *
 * Styles (pageLayoutStyles.ts):
 *   pageWrapperStyles  — full-height flex column shell
 *   pageMainStyles     — flex: 1 so main fills space between navbar and footer
 *   PAGE_TRANSITION    — shared framer-motion animation config (extracted so
 *                        the JSX stays clean and the values are easy to tweak)
 *
 * Files in this folder:
 *   pageLayoutStyles.ts  — CSSProperties + animation constants
 *   PageLayout.tsx       — thin orchestrator
 */