import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useTheme } from "../../theme/ThemeContext";
import { useToast } from "../../components/ui/Toast";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { TABS, type TabId } from "./types";
import { AccountTab, OrdersTab, WishlistTab, SecurityTab } from "./ProfileTabs";
import ProfileSidebar        from "./ProfileSidebar";
import ProfileMobileDropdown from "./ProfileMobileDropdown";

/**
 * Profile page — thin orchestrator.
 *
 *  ProfileSidebar        → sticky desktop nav with user info + tab buttons
 *  ProfileMobileDropdown → mobile tab selector dropdown
 *  AccountTab            → name, email, edit profile CTA
 *  OrdersTab             → order history (empty state for now)
 *  WishlistTab           → saved items (empty state for now)
 *  SecurityTab           → OAuth info + security settings link
 */
const Profile = () => {
  const { colors, typography, radius, shadows } = useTheme();
  const isMobile = useIsMobile();
  const toast    = useToast();
  const navigate = useNavigate();

  const { signOut }         = useClerk();
  const { user: clerkUser } = useUser();

  const [activeTab,     setActiveTab]     = useState<TabId>("account");
  const [mobileTabOpen, setMobileTabOpen] = useState(false);

  // Derive display values from Clerk user object
  const userName  = clerkUser?.fullName ?? clerkUser?.username ?? "User";
  const userEmail = clerkUser?.primaryEmailAddress?.emailAddress ?? "";
  const userImage = clerkUser?.imageUrl;

  const handleSignOut = async () => {
    await signOut();
    toast.info("Signed out successfully.");
    navigate("/");
  };

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    setMobileTabOpen(false);
  };

  /** Renders the content panel for the currently active tab */
  const renderActiveTab = () => {
    switch (activeTab) {
      case "account":  return <AccountTab userName={userName} userEmail={userEmail} />;
      case "orders":   return <OrdersTab />;
      case "wishlist": return <WishlistTab />;
      case "security": return <SecurityTab />;
    }
  };

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

      {/* Main content */}
      <div
        style={{
          maxWidth:             1280,
          margin:               "0 auto",
          padding:              isMobile ? "1.25rem" : "2.5rem 1.5rem",
          display:              "grid",
          gridTemplateColumns:  isMobile ? "1fr" : "220px 1fr",
          gap:                  isMobile ? "1.25rem" : "2rem",
          alignItems:           "start",
        }}
      >
        {/* Nav — dropdown on mobile, sidebar on desktop */}
        {isMobile ? (
          <ProfileMobileDropdown
            activeTab={activeTab}
            isOpen={mobileTabOpen}
            onToggle={() => setMobileTabOpen((prev) => !prev)}
            onTabChange={handleTabChange}
            onSignOut={handleSignOut}
          />
        ) : (
          <ProfileSidebar
            userName={userName}
            userEmail={userEmail}
            userImage={userImage}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onSignOut={handleSignOut}
          />
        )}

        {/* Tab content panel — animates on tab switch */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.28 }}
          style={{ background: colors.bgCard, borderRadius: radius?.xl, padding: isMobile ? "1.25rem" : "2rem", border: `1px solid ${colors.borderLight}`, boxShadow: shadows?.sm }}
        >
          {renderActiveTab()}
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