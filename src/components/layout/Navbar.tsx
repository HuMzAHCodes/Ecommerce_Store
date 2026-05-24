import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, Heart, Search, Menu, X, User, ChevronDown,
} from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";

// ── Types ─────────────────────────────────────────────────────

interface NavLink {
  label:    string;
  href:     string;
  children?: { label: string; href: string }[];
}

interface NavbarProps {
  cartCount?:     number;
  wishlistCount?: number;
  isLoggedIn?:    boolean;
  userName?:      string;
}

// ── Nav Links ─────────────────────────────────────────────────

const NAV_LINKS: NavLink[] = [
  {
    label: "Shop",
    href:  "/shop",
    children: [
      { label: "All Products", href: "/shop" },
      { label: "New Arrivals", href: "/shop?filter=new" },
      { label: "Sale",         href: "/shop?filter=sale" },
      { label: "Best Sellers", href: "/shop?filter=bestsellers" },
    ],
  },
  {
    label: "Collections",
    href:  "/collections",
    children: [
      { label: "Skincare",  href: "/collections/skincare" },
      { label: "Beauty",    href: "/collections/beauty" },
      { label: "Wellness",  href: "/collections/wellness" },
      { label: "Gift Sets", href: "/collections/gifts" },
    ],
  },
  { label: "About", href: "/about" },
];

// ── Component ─────────────────────────────────────────────────

const Navbar = ({
  cartCount     = 0,
  wishlistCount = 0,
  isLoggedIn    = false,
  userName,
}: NavbarProps) => {
  const theme    = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { colors, typography, shadows, transitions, radius } = theme;

  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [searchOpen,     setSearchOpen]     = useState(false);
  const [searchQuery,    setSearchQuery]    = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // ── Scroll shadow ──────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close mobile on route change ───────────────────────────
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(href + "/");

  // ── Shared icon button style ───────────────────────────────
  const iconBtn: React.CSSProperties = {
    position:       "relative",
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    width:          38,
    height:         38,
    borderRadius:   radius?.full,
    background:     "transparent",
    border:         "none",
    cursor:         "pointer",
    color:          colors.navText,
    transition:     `background ${transitions?.fast}, color ${transitions?.fast}`,
  };

  return (
    <>
      {/* ── Main Nav ───────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position:   "sticky",
          top:        0,
          zIndex:     100,
          background: colors.navBg,
          borderBottom: `1px solid ${scrolled ? colors.borderMedium : colors.navBorder}`,
          boxShadow:  scrolled ? shadows?.sm : "none",
          transition: `box-shadow ${transitions?.normal}, border-color ${transitions?.normal}`,
        }}
      >
        <div
          style={{
            maxWidth:       1280,
            margin:         "0 auto",
            padding:        "0 1.5rem",
            height:         64,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            gap:            "1.5rem",
          }}
        >
          {/* ── Logo ─────────────────────────────────────── */}
          <Link
            to="/"
            style={{
              fontFamily:    typography.fontDisplay,
              fontSize:      typography["2xl"],
              fontWeight:    typography.weightMedium,
              color:         colors.textPrimary,
              textDecoration: "none",
              letterSpacing: "0.06em",
              flexShrink:    0,
            }}
          >
            BLÜM
          </Link>

          {/* ── Desktop Links ────────────────────────────── */}
          <nav
            style={{
              display:    "flex",
              alignItems: "center",
              gap:        "0.25rem",
              flex:       1,
              justifyContent: "center",
            }}
            className="hidden-mobile"
          >
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                style={{ position: "relative" }}
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.href}
                  style={{
                    display:     "inline-flex",
                    alignItems:  "center",
                    gap:         4,
                    padding:     "0.5rem 0.875rem",
                    borderRadius: radius?.full,
                    fontFamily:  typography.fontBody,
                    fontSize:    typography.sm,
                    fontWeight:  isActive(link.href)
                      ? typography.weightMedium
                      : typography.weightRegular,
                    color:       isActive(link.href)
                      ? colors.accentPrimary
                      : colors.navText,
                    background:  isActive(link.href)
                      ? colors.accentLight
                      : "transparent",
                    textDecoration: "none",
                    transition:  `all ${transitions?.fast}`,
                    whiteSpace:  "nowrap",
                  }}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown
                      size={13}
                      style={{
                        transition: `transform ${transitions?.fast}`,
                        transform: activeDropdown === link.label ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{   opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        position:     "absolute",
                        top:          "calc(100% + 4px)",
                        left:         "50%",
                        transform:    "translateX(-50%)",
                        background:   colors.bgCard,
                        borderRadius: radius?.lg,
                        boxShadow:    shadows?.lg,
                        border:       `1px solid ${colors.borderLight}`,
                        padding:      "0.5rem",
                        minWidth:     160,
                        zIndex:       200,
                      }}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          style={{
                            display:      "block",
                            padding:      "0.5rem 0.875rem",
                            borderRadius: radius?.md,
                            fontFamily:   typography.fontBody,
                            fontSize:     typography.sm,
                            color:        colors.textSecondary,
                            textDecoration: "none",
                            transition:   `all ${transitions?.fast}`,
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.background = colors.bgSecondary;
                            (e.currentTarget as HTMLAnchorElement).style.color = colors.textPrimary;
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                            (e.currentTarget as HTMLAnchorElement).style.color = colors.textSecondary;
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* ── Right Icons ───────────────────────────────── */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", flexShrink: 0 }}>

            {/* Search */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              style={iconBtn}
              onClick={() => setSearchOpen((p) => !p)}
              aria-label="Search"
            >
              <Search size={19} />
            </motion.button>

            {/* Wishlist */}
            <Link to="/wishlist" style={{ ...iconBtn, textDecoration: "none" }}>
              <Heart size={19} />
              {wishlistCount > 0 && <CountBadge count={wishlistCount} color={colors.accentSecondary} />}
            </Link>

            {/* Cart */}
            <Link to="/cart" style={{ ...iconBtn, textDecoration: "none" }}>
              <ShoppingBag size={19} />
              {cartCount > 0 && <CountBadge count={cartCount} color={colors.accentPrimary} />}
            </Link>

            {/* User */}
            <Link to={isLoggedIn ? "/profile" : "/login"} style={{ ...iconBtn, textDecoration: "none" }}>
              {isLoggedIn && userName ? (
                <div
                  style={{
                    width:          28,
                    height:         28,
                    borderRadius:   radius?.full,
                    background:     colors.accentLight,
                    color:          colors.accentPrimary,
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    fontSize:       typography.xs,
                    fontWeight:     typography.weightBold,
                    fontFamily:     typography.fontBody,
                  }}
                >
                  {userName.charAt(0).toUpperCase()}
                </div>
              ) : (
                <User size={19} />
              )}
            </Link>

            {/* Mobile menu toggle */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              style={{ ...iconBtn, display: "none" }}
              className="show-mobile"
              onClick={() => setMobileOpen((p) => !p)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* ── Search Bar ─────────────────────────────────── */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{   height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              style={{
                overflow:     "hidden",
                borderTop:    `1px solid ${colors.borderLight}`,
                background:   colors.bgSecondary,
              }}
            >
              <form
                onSubmit={handleSearch}
                style={{
                  maxWidth: 1280,
                  margin:   "0 auto",
                  padding:  "0.875rem 1.5rem",
                  display:  "flex",
                  gap:      "0.75rem",
                  alignItems: "center",
                }}
              >
                <Search size={17} style={{ color: colors.textMuted, flexShrink: 0 }} />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    flex:       1,
                    background: "transparent",
                    border:     "none",
                    outline:    "none",
                    fontFamily: typography.fontBody,
                    fontSize:   typography.base,
                    color:      colors.textPrimary,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  style={{
                    background: "none",
                    border:     "none",
                    cursor:     "pointer",
                    color:      colors.textMuted,
                    display:    "flex",
                  }}
                >
                  <X size={17} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Mobile Menu ────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{   opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position:   "fixed",
                inset:      0,
                zIndex:     98,
                background: colors.bgOverlay,
              }}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{   x: "100%" }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position:   "fixed",
                top:        0,
                right:      0,
                bottom:     0,
                zIndex:     99,
                width:      "min(320px, 85vw)",
                background: colors.bgCard,
                padding:    "1.5rem",
                overflowY:  "auto",
                boxShadow:  shadows?.xl,
              }}
            >
              {/* Close */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
                <span style={{ fontFamily: typography.fontDisplay, fontSize: typography.xl, color: colors.textPrimary }}>
                  BLÜM
                </span>
                <button onClick={() => setMobileOpen(false)} style={{ ...iconBtn, background: colors.bgSecondary }}>
                  <X size={18} />
                </button>
              </div>

              {/* Links */}
              <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                {NAV_LINKS.map((link) => (
                  <div key={link.label}>
                    <Link
                      to={link.href}
                      style={{
                        display:      "block",
                        padding:      "0.75rem 1rem",
                        borderRadius: radius?.md,
                        fontFamily:   typography.fontBody,
                        fontSize:     typography.base,
                        fontWeight:   typography.weightMedium,
                        color:        isActive(link.href) ? colors.accentPrimary : colors.textPrimary,
                        background:   isActive(link.href) ? colors.accentLight : "transparent",
                        textDecoration: "none",
                      }}
                    >
                      {link.label}
                    </Link>
                    {link.children?.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        style={{
                          display:      "block",
                          padding:      "0.5rem 1rem 0.5rem 2rem",
                          borderRadius: radius?.md,
                          fontFamily:   typography.fontBody,
                          fontSize:     typography.sm,
                          color:        colors.textSecondary,
                          textDecoration: "none",
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </nav>

              {/* Auth */}
              <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: `1px solid ${colors.borderLight}` }}>
                <Link
                  to={isLoggedIn ? "/profile" : "/login"}
                  style={{
                    display:      "flex",
                    alignItems:   "center",
                    gap:          "0.75rem",
                    padding:      "0.75rem 1rem",
                    borderRadius: radius?.md,
                    fontFamily:   typography.fontBody,
                    fontSize:     typography.sm,
                    color:        colors.textPrimary,
                    textDecoration: "none",
                    background:   colors.bgSecondary,
                  }}
                >
                  <User size={17} />
                  {isLoggedIn ? `Hi, ${userName}` : "Sign in / Register"}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// ── Count Badge ───────────────────────────────────────────────

const CountBadge = ({ count, color }: { count: number; color: string }) => (
  <span
    style={{
      position:       "absolute",
      top:            2,
      right:          2,
      minWidth:       17,
      height:         17,
      borderRadius:   "9999px",
      background:     color,
      color:          "#fff",
      fontSize:       "0.6rem",
      fontWeight:     700,
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      padding:        "0 3px",
      lineHeight:     1,
    }}
  >
    {count > 99 ? "99+" : count}
  </span>
);

export default Navbar;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// Navbar.tsx
// A full-featured, responsive e-commerce navigation bar for the BLÜM storefront.
// Handles desktop nav with hover dropdowns, a collapsible search bar, a
// right-to-left sliding mobile drawer, scroll-aware styling, and icon badges —
// all driven by ThemeContext with no external CSS.
//
// ── Component tree ────────────────────────────────────────────────────────────
//
//  <Navbar>
//   ├─ <motion.nav>               — sticky top bar, animates in on mount
//   │   ├─ Logo                   — Link to "/" with display font
//   │   ├─ Desktop nav            — centered flex row of NavLink items
//   │   │   └─ per link: Link + AnimatePresence dropdown (if children exist)
//   │   ├─ Right icon row
//   │   │   ├─ Search button      — toggles searchOpen
//   │   │   ├─ Wishlist Link      — with CountBadge if wishlistCount > 0
//   │   │   ├─ Cart Link          — with CountBadge if cartCount > 0
//   │   │   ├─ User Link          — avatar initial if logged in, User icon if not
//   │   │   └─ Mobile menu toggle — visible only on small screens (show-mobile class)
//   │   └─ Search bar             — AnimatePresence height-animate panel below nav
//   └─ Mobile drawer (portalled siblings, not inside <nav>)
//       ├─ Overlay                — fixed full-screen dimmer, click to close
//       └─ Drawer panel          — slides in from right, contains links + auth row
//
// ── Props ─────────────────────────────────────────────────────────────────────
//
//  cartCount     — number shown on the cart badge (default: 0; hidden if 0)
//  wishlistCount — number shown on the wishlist badge (default: 0; hidden if 0)
//  isLoggedIn    — switches User icon to an avatar initial + changes link target
//  userName      — display name used for the avatar initial and mobile greeting
//
// ── State ─────────────────────────────────────────────────────────────────────
//
//  scrolled        — true when window.scrollY > 12; tightens the border and
//                    adds a subtle box-shadow to signal the page is scrolled
//  mobileOpen      — controls the mobile drawer visibility
//  searchOpen      — controls the collapsible search bar panel
//  searchQuery     — controlled input value for the search field
//  activeDropdown  — label string of the currently hovered nav item with children;
//                    null when no dropdown is open; drives ChevronDown rotation
//
// ── Side effects ──────────────────────────────────────────────────────────────
//
//  Scroll listener (useEffect #1):
//    Attaches a "scroll" event on window; sets `scrolled` when scrollY > 12.
//    Cleaned up on unmount.
//
//  Route change reset (useEffect #2):
//    Watches location.pathname. Closes both mobileOpen and searchOpen whenever
//    the user navigates to a different route, so panels don't stay open
//    after a link click.
//
// ── Active link detection ─────────────────────────────────────────────────────
//
//  isActive(href) returns true when:
//    location.pathname === href          (exact match)
//    location.pathname.startsWith(href + "/")  (nested route match)
//  Active links get accentPrimary color + accentLight background pill.
//
// ── Desktop dropdown behavior ─────────────────────────────────────────────────
//
//  Triggered purely by CSS hover events on the parent <div>:
//    onMouseEnter → setActiveDropdown(link.label)
//    onMouseLeave → setActiveDropdown(null)
//  The dropdown panel is centered under its trigger via
//  left: "50%" + transform: "translateX(-50%)".
//  Dropdown link hover is handled imperatively (onMouseEnter/Leave mutating
//  element.style directly) to avoid needing per-item state variables.
//  ChevronDown rotates 180° when its dropdown is open.
//
// ── Search bar ────────────────────────────────────────────────────────────────
//
//  Collapses/expands via AnimatePresence animating height: 0 ↔ "auto".
//  The input is autoFocus so the user can type immediately on open.
//  handleSearch: prevents default, URL-encodes the query, navigates to
//  /shop?search=<query>, then resets searchOpen and searchQuery.
//  Empty/whitespace queries are ignored (no navigation).
//
// ── Mobile drawer ─────────────────────────────────────────────────────────────
//
//  Two sibling elements rendered after </motion.nav> (not portalled):
//    Overlay  — fixed full-screen, fades in/out (z-index 98), click closes drawer
//    Drawer   — fixed right panel, slides from x: "100%" → x: 0 (z-index 99)
//               width: min(320px, 85vw) for responsiveness
//  The drawer renders the same NAV_LINKS with children indented at 2rem padding-left.
//  Below the links, a bordered auth section shows a profile or sign-in link.
//  Note: desktop nav uses className="hidden-mobile" / "show-mobile" Tailwind/CSS
//  utility classes to toggle visibility — these must be defined globally.
//
// ── CountBadge ────────────────────────────────────────────────────────────────
//
//  A small absolutely-positioned pill (top: 2, right: 2) rendered inside the
//  icon button. Caps display at "99+" for counts over 99. Color is passed as
//  a prop so cart (accentPrimary) and wishlist (accentSecondary) can differ.
//
// ── User avatar ───────────────────────────────────────────────────────────────
//
//  When isLoggedIn && userName, a 28×28 circle renders userName.charAt(0).toUpperCase()
//  in accentPrimary on accentLight background — a lightweight avatar without
//  needing an image upload or external avatar service.
//
// ── iconBtn shared style ──────────────────────────────────────────────────────
//
//  A CSSProperties object defined once and spread onto every icon button and
//  icon link in the right rail. Keeps sizing (38×38), borderRadius, and
//  transition consistent across all icons without repeating style blocks.
//
// ── Animations (Framer Motion) ────────────────────────────────────────────────
//
//  Nav bar mount  — slides down from y: -10 + fades in over 400 ms
//  Dropdown       — opacity + y + scale over 180 ms
//  Search panel   — height 0 ↔ auto + opacity over 220 ms
//  Mobile overlay — opacity over 200 ms
//  Mobile drawer  — x: "100%" → 0 over 300 ms, cubic-bezier ease
//
// ── NAV_LINKS constant ────────────────────────────────────────────────────────
//
//  Defined at module level (outside the component) so it is never re-created
//  on render. Each entry can optionally include a `children` array which
//  enables the dropdown on desktop and the indented sub-links on mobile.
//  Adding or removing nav items only requires editing this array.
//
// ── Dependencies ─────────────────────────────────────────────────────────────
//
//  react-router-dom  — Link, useLocation (active state), useNavigate (search)
//  framer-motion     — motion.nav, motion.div, motion.button, AnimatePresence
//  lucide-react      — ShoppingBag, Heart, Search, Menu, X, User, ChevronDown
//  useTheme()        — colors, typography, shadows, transitions, radius tokens