import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useClerk, useUser } from "@clerk/clerk-react";
import { Package, Heart, Lock, User, LogOut, ChevronRight, ChevronDown } from "lucide-react";
import { useTheme } from "../theme/ThemeContext";
import { useToast } from "../components/ui/Toast";
import { useIsMobile } from "../hooks/useMediaQuery";






// ── Types ─────────────────────────────────────────────────────

type TabId = "account" | "orders" | "wishlist" | "security";

interface Tab {
  id:    TabId;
  label: string;
  icon:  React.ReactNode;
}

// ── Constants ─────────────────────────────────────────────────

const TABS: Tab[] = [
  { id: "account",  label: "Account",  icon: <User    size={15} /> },
  { id: "orders",   label: "Orders",   icon: <Package size={15} /> },
  { id: "wishlist", label: "Wishlist", icon: <Heart   size={15} /> },
  { id: "security", label: "Security", icon: <Lock    size={15} /> },
];

// ── Sub-components ────────────────────────────────────────────

const UserAvatar = ({ name, imageUrl, colors, typography, radius }: {
  name: string;
  imageUrl?: string;
  colors: ReturnType<typeof useTheme>["colors"];
  typography: ReturnType<typeof useTheme>["typography"];
  radius: ReturnType<typeof useTheme>["radius"];
}) => {
  const initial = name.charAt(0).toUpperCase();

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        style={{ width: 68, height: 68, borderRadius: radius?.full, objectFit: "cover" }}
      />
    );
  }

  return (
    <div
      style={{
        width:          68,
        height:         68,
        borderRadius:   radius?.full,
        background:     colors.accentLight,
        color:          colors.accentPrimary,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        fontFamily:     typography.fontDisplay,
        fontSize:       typography["3xl"],
      }}
    >
      {initial}
    </div>
  );
};

const EmptyState = ({ icon, title, linkTo, linkLabel }: {
  icon: React.ReactNode;
  title: string;
  linkTo: string;
  linkLabel: string;
}) => {
  const theme = useTheme();
  const { colors, typography } = theme;

  return (
    <div style={{ textAlign: "center", padding: "3rem 0" }}>
      <div style={{ color: colors.borderMedium, margin: "0 auto 1rem", display: "flex", justifyContent: "center" }}>
        {icon}
      </div>
      <p style={{ fontFamily: typography.fontBody, fontSize: typography.base, color: colors.textPrimary, marginBottom: "0.5rem" }}>
        {title}
      </p>
      <Link to={linkTo} style={{ color: colors.accentPrimary, fontFamily: typography.fontBody, fontSize: typography.sm }}>
        {linkLabel} →
      </Link>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────

const Profile = () => {
  const theme    = useTheme();
  const isMobile = useIsMobile();
  const toast    = useToast();
  const navigate = useNavigate();

  const { signOut }         = useClerk();
  const { user: clerkUser } = useUser();

  const { colors, typography, radius, shadows, transitions } = theme;

  const [activeTab,      setActiveTab]      = useState<TabId>("account");
  const [mobileTabOpen,  setMobileTabOpen]  = useState(false);

  // ── Derived user data ────────────────────────────────────────
  const userName  = clerkUser?.fullName ?? clerkUser?.username ?? "User";
  const userEmail = clerkUser?.primaryEmailAddress?.emailAddress ?? "";
  const userImage = clerkUser?.imageUrl;

  // ── Handlers ─────────────────────────────────────────────────

  const handleSignOut = async () => {
    await signOut();
    toast.info("Signed out successfully.");
    navigate("/");
  };

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    setMobileTabOpen(false);
  };

  // ── Shared styles ────────────────────────────────────────────

  const activeTabStyle: React.CSSProperties = {
    background: colors.accentLight,
    color:      colors.accentPrimary,
    fontWeight: typography.weightMedium,
  };

  const inactiveTabStyle: React.CSSProperties = {
    background: "transparent",
    color:      colors.textSecondary,
    fontWeight: typography.weightRegular,
  };

  const tabButtonBase: React.CSSProperties = {
    display:      "flex",
    alignItems:   "center",
    gap:          8,
    padding:      "0.6rem 0.875rem",
    borderRadius: radius?.md,
    border:       "none",
    cursor:       "pointer",
    fontFamily:   typography.fontBody,
    fontSize:     typography.sm,
    transition:   `all ${transitions?.fast}`,
    width:        "100%",
  };

  // ── Tab content renderer ─────────────────────────────────────

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <div>
            <h2 style={{ fontFamily: typography.fontDisplay, fontSize: typography["2xl"], color: colors.textPrimary, marginBottom: "1.5rem" }}>
              Account Details
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 420 }}>
              {[
                { label: "Full Name", value: userName  },
                { label: "Email",     value: userEmail },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontFamily: typography.fontBody, fontSize: typography.xs, fontWeight: typography.weightBold, color: colors.textMuted, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
                    {label}
                  </p>
                  <p style={{ fontFamily: typography.fontBody, fontSize: typography.base, color: colors.textPrimary, padding: "0.65rem 0.875rem", background: colors.bgSecondary, borderRadius: radius?.md, margin: 0 }}>
                    {value}
                  </p>
                </div>
              ))}
              <p style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted, marginTop: "0.25rem" }}>
                To update your name or email, use the Clerk account portal.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/account/profile")}
                style={{ alignSelf: "flex-start", padding: "0.7rem 1.5rem", borderRadius: radius?.full, background: colors.accentPrimary, color: colors.textOnAccent, border: "none", cursor: "pointer", fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium }}
              >
                Edit Profile
              </motion.button>
            </div>
          </div>
        );

      case "orders":
        return (
          <div>
            <h2 style={{ fontFamily: typography.fontDisplay, fontSize: typography["2xl"], color: colors.textPrimary, marginBottom: "1.5rem" }}>
              My Orders
            </h2>
            <EmptyState
              icon={<Package size={44} />}
              title="No orders yet"
              linkTo="/shop"
              linkLabel="Start shopping"
            />
          </div>
        );

      case "wishlist":
        return (
          <div>
            <h2 style={{ fontFamily: typography.fontDisplay, fontSize: typography["2xl"], color: colors.textPrimary, marginBottom: "1.5rem" }}>
              Wishlist
            </h2>
            <EmptyState
              icon={<Heart size={44} />}
              title="Nothing saved yet"
              linkTo="/wishlist"
              linkLabel="View Wishlist"
            />
          </div>
        );

      case "security":
        return (
          <div>
            <h2 style={{ fontFamily: typography.fontDisplay, fontSize: typography["2xl"], color: colors.textPrimary, marginBottom: "0.75rem" }}>
              Security
            </h2>
            <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textSecondary, marginBottom: "1.5rem", lineHeight: 1.7 }}>
              Your account is secured via Google OAuth through Clerk. Password management is handled by your Google account.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/account/profile")}
              style={{ padding: "0.7rem 1.5rem", borderRadius: radius?.full, background: colors.accentPrimary, color: colors.textOnAccent, border: "none", cursor: "pointer", fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium }}
            >
              Manage Security Settings
            </motion.button>
          </div>
        );
    }
  };

  // ── Render ────────────────────────────────────────────────────

  return (
    <div style={{ background: colors.bgPrimary, minHeight: "100vh" }}>

      {/* Page header */}
      <div style={{ background: colors.bgSecondary, borderBottom: `1px solid ${colors.borderLight}`, padding: isMobile ? "1.75rem 1.25rem 1.5rem" : "2.5rem 1.5rem 2rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h1 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle: "italic" }}>
            My Account
          </h1>
        </div>
      </div>

      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding:  isMobile ? "1.25rem" : "2.5rem 1.5rem",
        display:  "grid",
        gridTemplateColumns: isMobile ? "1fr" : "220px 1fr",
        gap:      isMobile ? "1.25rem" : "2rem",
        alignItems: "start",
      }}>

        {/* ── Mobile tab dropdown ──────────────────────── */}
        {isMobile ? (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setMobileTabOpen(p => !p)}
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.875rem 1rem", background: colors.bgCard, border: `1px solid ${colors.borderLight}`, borderRadius: radius?.lg, cursor: "pointer", fontFamily: typography.fontBody, fontSize: typography.base, color: colors.textPrimary }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {TABS.find(t => t.id === activeTab)?.icon}
                {TABS.find(t => t.id === activeTab)?.label}
              </span>
              <ChevronDown size={16} style={{ color: colors.textMuted, transform: mobileTabOpen ? "rotate(180deg)" : "rotate(0deg)", transition: `transform ${transitions?.fast}` }} />
            </button>

            <AnimatePresence>
              {mobileTabOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0  }}
                  exit={{   opacity: 0, y: -8  }}
                  transition={{ duration: 0.18 }}
                  style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 10, background: colors.bgCard, border: `1px solid ${colors.borderLight}`, borderRadius: radius?.lg, overflow: "hidden", boxShadow: shadows?.lg }}
                >
                  {TABS.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      style={{ ...tabButtonBase, ...(activeTab === tab.id ? activeTabStyle : inactiveTabStyle) }}
                    >
                      {tab.icon} {tab.label}
                    </button>
                  ))}
                  <button
                    onClick={handleSignOut}
                    style={{ ...tabButtonBase, color: colors.error, borderTop: `1px solid ${colors.borderLight}` }}
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* ── Desktop sidebar ──────────────────────────── */
          <div style={{ background: colors.bgCard, borderRadius: radius?.xl, padding: "1.5rem", border: `1px solid ${colors.borderLight}`, boxShadow: shadows?.sm, position: "sticky", top: 84 }}>

            {/* User info */}
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <UserAvatar name={userName} imageUrl={userImage} colors={colors} typography={typography} radius={radius} />
              <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, color: colors.textPrimary, marginTop: "0.75rem", marginBottom: 2 }}>
                {userName}
              </p>
              <p style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted }}>
                {userEmail}
              </p>
            </div>

            {/* Tab nav */}
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  style={{
                    ...tabButtonBase,
                    justifyContent: "space-between",
                    ...(activeTab === tab.id ? activeTabStyle : inactiveTabStyle),
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {tab.icon} {tab.label}
                  </span>
                  {activeTab === tab.id && <ChevronRight size={13} />}
                </button>
              ))}

              <button
                onClick={handleSignOut}
                style={{ ...tabButtonBase, color: colors.error, marginTop: "0.5rem" }}
              >
                <LogOut size={15} /> Sign Out
              </button>
            </nav>
          </div>
        )}

        {/* ── Tab content ───────────────────────────────── */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.28 }}
          style={{ background: colors.bgCard, borderRadius: radius?.xl, padding: isMobile ? "1.25rem" : "2rem", border: `1px solid ${colors.borderLight}`, boxShadow: shadows?.sm }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;


// ── File Overview ──────────────────────────────────────────────────────────────
//
// Profile.tsx
// The authenticated user account page. Renders a two-column layout with a
// sticky sidebar (avatar + tab navigation + sign out) and an animated content
// panel that switches between four tabs: Account, Orders, Wishlist, Security.
//
// ── Guard: unauthenticated users ─────────────────────────────────────────────
//
//  The very first thing rendered is an early-return guard:
//  if (!user) → renders a centered "You need to be logged in" message with
//  a Sign In link to /login. This prevents the rest of the page from
//  rendering with a null user and avoids any optional-chaining throughout.
//  A proper route guard in App.tsx (redirecting to /login with state: { from })
//  should eventually prevent unauthenticated users from reaching this route
//  at all, but this fallback handles direct URL access gracefully.
//
// ── Page layout ───────────────────────────────────────────────────────────────
//
//  Header bar     — bgSecondary strip with "My Account" italic heading
//  Main grid      — two columns: [sidebar (240px fixed)] [content panel (1fr)]
//    Sidebar      — sticky (top: 84px), always visible while content scrolls
//    Content      — key={tab} motion.div that re-mounts and fades in on tab change
//
// ── TABS constant ─────────────────────────────────────────────────────────────
//
//  Module-level array of { id, label, icon } objects driving both the sidebar
//  nav buttons and the conditional tab content rendering. Adding a new tab
//  requires only a new entry here plus a new {tab === "id" && ...} block.
//
// ── Sidebar ───────────────────────────────────────────────────────────────────
//
//  Avatar area:
//    72×72 circle showing user.name.charAt(0).toUpperCase() as the initial
//    (accentLight bg, accentPrimary text — same pattern as Navbar avatar).
//    A Camera button (24×24, accentPrimary, absolute bottom-right) acts as
//    a placeholder for future avatar upload functionality — currently no-op.
//    User name and email are displayed below the avatar in sm/xs typography.
//
//  Tab nav buttons:
//    Active tab   — accentLight background, accentPrimary text + color,
//                   weightMedium, ChevronRight icon on the right
//    Inactive tab — transparent background, textSecondary color, weightRegular
//    Transitions via `all ${transitions?.fast}` for smooth color change.
//
//  Sign Out button:
//    Rendered below the tab list, styled in colors.error (red).
//    Calls handleLogout() which: calls logout() from AuthContext, fires
//    toast.info("Signed out."), then navigates to "/".
//
// ── State ─────────────────────────────────────────────────────────────────────
//
//  tab     — active tab id string; drives content panel and sidebar highlight
//  name    — controlled input for the account name field (initialized from user)
//  email   — controlled input for the account email field (initialized from user)
//  saving  — true while handleSave's fake API delay is in flight
//  oldPw   — controlled input for current password (security tab)
//  newPw   — controlled input for new password (security tab)
//  confPw  — controlled input for confirm new password (security tab)
//
// ── Tab content panels ────────────────────────────────────────────────────────
//
//  "account" — Account Details form:
//    Two fields (Full Name, Email) rendered from a mapped array of tuples
//    [label, value, setter, type]. Same data-driven pattern as Register.tsx.
//    handleSave: prevents default, sets saving=true, awaits 600 ms fake delay
//    (TODO: real PATCH /api/user), calls updateUser({ name, email }) from
//    AuthContext, fires toast.success, resets saving.
//    Save button shows "Saving…" + opacity 0.7 + disabled while in flight.
//
//  "orders" — Empty state placeholder:
//    Large Package icon + "No orders yet" message + "Start shopping →" link.
//    Intended to be replaced with a real order list fetched via React Query.
//
//  "wishlist" — Empty state placeholder:
//    Large Heart icon + "Nothing saved yet" + "View Wishlist →" link to /wishlist.
//    Intended to be replaced with WishlistContext items.
//
//  "security" — Change Password form:
//    Three password fields (Current, New, Confirm New) rendered from a mapped
//    tuple array — same pattern as the account tab.
//    handlePasswordChange: validates newPw === confPw and newPw.length >= 6
//    (fires toast.error on either failure and returns early), then awaits
//    600 ms fake delay (TODO: real PATCH /api/user/password), fires
//    toast.success, clears all three fields.
//    No saving state here — the button has no disabled logic (intentional stub).
//
// ── Content panel animation ───────────────────────────────────────────────────
//
//  key={tab} on the motion.div forces React to unmount and remount the panel
//  on every tab change, triggering the enter animation:
//    initial  — opacity: 0, y: +12
//    animate  — opacity: 1, y: 0
//    duration — 300 ms
//  This gives each tab a consistent, lightweight entrance feel.
//
// ── inputStyle (shared, static) ──────────────────────────────────────────────
//
//  A single CSSProperties object used by all inputs on this page.
//  Unlike the Checkout/Login/Register pages, inputStyle here is a plain
//  object (not a function) because there is no per-field error state — no
//  validation errors are shown inline on this page. Border color is always
//  borderLight at rest; onFocus/onBlur mutate it imperatively as usual.
//
// ── Data-driven form pattern ──────────────────────────────────────────────────
//
//  Both the account and security forms map over arrays of field tuples rather
//  than writing repetitive JSX. Setter functions are cast as
//  React.Dispatch<React.SetStateAction<string>> since TypeScript cannot infer
//  the setter type when it's stored as a plain value in a mixed array.
//
// ── Dependencies ─────────────────────────────────────────────────────────────
//
//  react-router-dom  — Link (nav links), useNavigate (post-logout redirect)
//  framer-motion     — motion.div (tab panel animation), motion.button (forms)
//  lucide-react      — User, Mail, Lock, Package, Heart, LogOut,
//                      ChevronRight, Camera icons
//  useTheme()        — colors, typography, radius, shadows, transitions tokens
//  useAuth()         — user, logout, updateUser, isLoading from AuthContext
//  useToast()        — success / error / info toast notifications