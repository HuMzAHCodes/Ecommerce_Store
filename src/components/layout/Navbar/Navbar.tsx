import { Link }                        from "react-router-dom";
import { motion, AnimatePresence }     from "framer-motion";
import { ShoppingBag, Heart, Search, Menu, X, User, ChevronDown } from "lucide-react";
import { useTheme }                    from "../../../theme/ThemeContext";
import { useCart }                     from "../../../context/CartContext";
import useNavbar                       from "./useNavbar";
import CountBadge                      from "./CountBadge";
import NavbarDropdown                  from "./NavbarDropdown";
import NavbarSearchBar                 from "./NavbarSearchBar";
import NavbarMobileMenu                from "./NavbarMobileMenu";
import { NAV_LINKS }                   from "./navbarData";
import {
  navShellStyles, navInnerStyles, logoStyles,
  desktopNavLinkStyles, iconButtonStyles,
  NAV_HOVER_BG, NAV_HOVER_COLOR,
} from "./navbarStyles";

// ── Types ─────────────────────────────────────────────────────

interface NavbarProps {
  cartCount?:     number;
  wishlistCount?: number;
  isLoggedIn?:    boolean;
  userName?:      string;
}

// ── Component ─────────────────────────────────────────────────

const Navbar = ({
  cartCount     = 0,
  wishlistCount = 0,
  isLoggedIn    = false,
  userName,
}: NavbarProps) => {
  const { colors, typography, radius, shadows, transitions } = useTheme();
  const { openDrawer } = useCart();

  const {
    isScrolled, isMobileOpen, isSearchOpen,
    searchQuery, setSearchQuery,
    activeDropdown, setActiveDropdown,
    isActivePath,
    handleSearch,
    toggleMobileMenu, toggleSearch,
    closeMobileMenu,  closeSearch,
  } = useNavbar();

  const iconBtn = iconButtonStyles(radius, transitions);

  const iconHoverHandlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.background = NAV_HOVER_BG;
      e.currentTarget.style.color      = NAV_HOVER_COLOR;
      e.currentTarget.style.transform  = "translateY(-1px)";
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.color      = "#111111";
      e.currentTarget.style.transform  = "translateY(0)";
    },
  };

  return (
    <>
      {/* ── Main nav bar ──────────────────────────────────── */}
      <motion.nav
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        style={navShellStyles(colors, shadows, transitions, isScrolled)}
      >
        <div style={navInnerStyles}>

          {/* Logo */}
          <Link
            to="/"
            style={logoStyles(typography, colors, transitions, radius)}
            onMouseEnter={(e) => { e.currentTarget.style.color = NAV_HOVER_COLOR; e.currentTarget.style.background = NAV_HOVER_BG; e.currentTarget.style.transform = "scale(1.03)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = colors.textPrimary; e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            BLÜM
          </Link>

          {/* Desktop nav links */}
          <nav style={{ display: "flex", alignItems: "center", gap: "0.25rem", flex: 1, justifyContent: "center" }} className="hidden-mobile">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                style={{ position: "relative" }}
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.href}
                  style={desktopNavLinkStyles(typography, colors, transitions, radius, isActivePath(link.href))}
                  onMouseEnter={(e) => { e.currentTarget.style.background = NAV_HOVER_BG; e.currentTarget.style.color = NAV_HOVER_COLOR; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = isActivePath(link.href) ? NAV_HOVER_BG : "transparent"; e.currentTarget.style.color = isActivePath(link.href) ? NAV_HOVER_COLOR : colors.navText; }}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown size={13} style={{ transition: `transform ${transitions?.fast}`, transform: activeDropdown === link.label ? "rotate(180deg)" : "rotate(0deg)" }} />
                  )}
                </Link>

                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <NavbarDropdown items={link.children} />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right icon row */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", flexShrink: 0 }}>

            <motion.button whileTap={{ scale: 0.92 }} style={iconBtn} {...iconHoverHandlers} onClick={toggleSearch} aria-label="Search">
              <Search size={19} />
            </motion.button>

            <Link to="/wishlist" style={{ ...iconBtn, textDecoration: "none" }} {...iconHoverHandlers}>
              <Heart size={19} />
              {wishlistCount > 0 && <CountBadge count={wishlistCount} color={colors.accentSecondary} />}
            </Link>

            <motion.button whileTap={{ scale: 0.92 }} style={iconBtn} {...iconHoverHandlers} onClick={openDrawer} aria-label="Open cart">
              <ShoppingBag size={19} />
              {cartCount > 0 && <CountBadge count={cartCount} color={colors.accentPrimary} />}
            </motion.button>

            <Link to={isLoggedIn ? "/profile" : "/login"} style={{ ...iconBtn, textDecoration: "none" }} {...iconHoverHandlers}>
              {isLoggedIn && userName ? (
                <div style={{ width: 28, height: 28, borderRadius: radius?.full, background: colors.accentLight, color: colors.accentPrimary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: typography.xs, fontWeight: typography.weightBold, fontFamily: typography.fontBody }}>
                  {userName.charAt(0).toUpperCase()}
                </div>
              ) : (
                <User size={19} />
              )}
            </Link>

            <motion.button whileTap={{ scale: 0.92 }} style={{ ...iconBtn, display: "none" }} className="show-mobile" {...iconHoverHandlers} onClick={toggleMobileMenu} aria-label="Menu">
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <NavbarSearchBar
              searchQuery={searchQuery}
              isScrolled={isScrolled}
              onQueryChange={setSearchQuery}
              onSubmit={handleSearch}
              onClose={closeSearch}
            />
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <NavbarMobileMenu
            isLoggedIn={isLoggedIn}
            userName={userName}
            isActivePath={isActivePath}
            onClose={closeMobileMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

/*
 * ── Navbar — What this folder does ──────────────────────────────────────────
 *
 * Full-featured sticky navigation bar for the BLÜM storefront.
 *
 * Sections:
 *   Logo              — brand link, scale on hover
 *   Desktop nav       — centered links with animated dropdowns (NavbarDropdown)
 *   Right icon row    — Search, Wishlist, Cart (opens drawer), User/Avatar
 *   Search bar        — AnimatePresence height-animated panel (NavbarSearchBar)
 *   Mobile menu       — slide-in drawer with all links + auth row (NavbarMobileMenu)
 *
 * Logic (useNavbar.ts):
 *   - isScrolled         → scroll listener, fires at 12px
 *   - isMobileOpen       → mobile drawer toggle
 *   - isSearchOpen       → search panel toggle
 *   - activeDropdown     → which desktop dropdown is hovered
 *   - isActivePath()     → exact + prefix route match
 *   - handleSearch()     → navigates to /shop?search=<query>
 *   - Route change effect → closes both mobile menu and search panel
 *
 * Data (navbarData.ts):
 *   - NAV_LINKS  → shared by Navbar (desktop) and NavbarMobileMenu (mobile)
 *
 * Styles (navbarStyles.ts):
 *   - All CSSProperties factories in one place
 *   - hexToRgba utility for scroll-aware translucent background
 *
 * Files in this folder:
 *   useNavbar.ts          — all state, effects, and event handlers
 *   navbarData.ts         — NAV_LINKS constant and NavLink type
 *   navbarStyles.ts       — all CSSProperties factories + palette constants
 *   CountBadge.tsx        — small absolutely-positioned count pill
 *   NavbarDropdown.tsx    — animated desktop dropdown panel
 *   NavbarSearchBar.tsx   — collapsible search input panel
 *   NavbarMobileMenu.tsx  — slide-in mobile drawer with links + auth
 *   Navbar.tsx            — orchestrator; assembles all pieces
 */