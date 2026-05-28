import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, Package, Heart, LogOut, ChevronRight, Camera, ChevronDown } from "lucide-react";
import { useTheme } from "../theme/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/ui/Toast";
import { useIsMobile } from "../hooks/useMediaQuery";

const TABS = [
  { id:"account",  label:"Account",  icon:<User size={15}/>    },
  { id:"orders",   label:"Orders",   icon:<Package size={15}/> },
  { id:"wishlist", label:"Wishlist", icon:<Heart size={15}/>   },
  { id:"security", label:"Security", icon:<Lock size={15}/>    },
];

const Profile = () => {
  const theme    = useTheme();
  const isMobile = useIsMobile();
  const { colors, typography, radius, shadows, transitions } = theme;
  const { user, logout, updateUser } = useAuth();
  const toast    = useToast();
  const navigate = useNavigate();

  const [tab,    setTab]    = useState("account");
  const [name,   setName]   = useState(user?.name ?? "");
  const [email,  setEmail]  = useState(user?.email ?? "");
  const [saving, setSaving] = useState(false);
  const [oldPw,  setOldPw]  = useState("");
  const [newPw,  setNewPw]  = useState("");
  const [confPw, setConfPw] = useState("");
  const [mobileTabOpen, setMobileTabOpen] = useState(false);

  if (!user) {
    return (
      <div style={{ minHeight:"60vh", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"1rem" }}>
        <p style={{ fontFamily:typography.fontBody, color:colors.textMuted }}>You need to be logged in.</p>
        <Link to="/login" style={{ color:colors.accentPrimary, fontFamily:typography.fontBody }}>Sign In</Link>
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    await new Promise(r => setTimeout(r,600));
    updateUser({ name, email });
    toast.success("Profile updated!"); setSaving(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPw !== confPw) { toast.error("Passwords don't match"); return; }
    if (newPw.length < 6) { toast.error("Minimum 6 characters"); return; }
    await new Promise(r => setTimeout(r,600));
    toast.success("Password changed!");
    setOldPw(""); setNewPw(""); setConfPw("");
  };

  const handleLogout = () => { logout(); toast.info("Signed out."); navigate("/"); };

  const inputStyle: React.CSSProperties = {
    width:"100%", padding:"0.65rem 0.875rem", border:`1.5px solid ${colors.borderLight}`,
    borderRadius:radius?.md, fontFamily:typography.fontBody, fontSize:typography.sm,
    color:colors.textPrimary, background:colors.bgPrimary, outline:"none",
  };

  const activeTabLabel = TABS.find(t => t.id === tab)?.label ?? "Account";

  return (
    <div style={{ background:colors.bgPrimary, minHeight:"100vh" }}>
      <div style={{ background:colors.bgSecondary, borderBottom:`1px solid ${colors.borderLight}`, padding: isMobile?"1.75rem 1.25rem 1.5rem":"2.5rem 1.5rem 2rem" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <h1 style={{ fontFamily:typography.fontDisplay, color:colors.textPrimary, fontStyle:"italic" }}>My Account</h1>
        </div>
      </div>

      <div style={{
        maxWidth:1280, margin:"0 auto",
        padding: isMobile?"1.25rem":"2.5rem 1.5rem",
        display:"grid",
        gridTemplateColumns: isMobile?"1fr":"220px 1fr",
        gap: isMobile?"1.25rem":"2rem",
        alignItems:"start",
      }}>

        {/* Mobile: tab selector dropdown */}
        {isMobile ? (
          <div style={{ position:"relative" }}>
            <button onClick={() => setMobileTabOpen(p => !p)}
              style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0.875rem 1rem", background:colors.bgCard, border:`1px solid ${colors.borderLight}`, borderRadius:radius?.lg, cursor:"pointer", fontFamily:typography.fontBody, fontSize:typography.base, color:colors.textPrimary }}>
              <span style={{ display:"flex", alignItems:"center", gap:8 }}>
                {TABS.find(t=>t.id===tab)?.icon} {activeTabLabel}
              </span>
              <ChevronDown size={16} style={{ color:colors.textMuted, transition:`transform ${transitions?.fast}`, transform: mobileTabOpen?"rotate(180deg)":"rotate(0deg)" }}/>
            </button>
            <AnimatePresence>
              {mobileTabOpen && (
                <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }} transition={{ duration:0.18 }}
                  style={{ position:"absolute", top:"calc(100% + 6px)", left:0, right:0, zIndex:10, background:colors.bgCard, border:`1px solid ${colors.borderLight}`, borderRadius:radius?.lg, overflow:"hidden", boxShadow:shadows?.lg }}>
                  {TABS.map(t => (
                    <button key={t.id} onClick={() => { setTab(t.id); setMobileTabOpen(false); }}
                      style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"0.75rem 1rem", border:"none", cursor:"pointer", background: tab===t.id ? colors.accentLight : "transparent", color: tab===t.id ? colors.accentPrimary : colors.textSecondary, fontFamily:typography.fontBody, fontSize:typography.sm, fontWeight: tab===t.id ? typography.weightMedium : typography.weightRegular }}>
                      {t.icon}{t.label}
                    </button>
                  ))}
                  <button onClick={handleLogout}
                    style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"0.75rem 1rem", border:"none", cursor:"pointer", background:"transparent", color:colors.error, fontFamily:typography.fontBody, fontSize:typography.sm, borderTop:`1px solid ${colors.borderLight}` }}>
                    <LogOut size={15}/> Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Desktop sidebar */
          <div style={{ background:colors.bgCard, borderRadius:radius?.xl, padding:"1.5rem", border:`1px solid ${colors.borderLight}`, boxShadow:shadows?.sm, position:"sticky", top:84 }}>
            <div style={{ textAlign:"center", marginBottom:"1.5rem" }}>
              <div style={{ position:"relative", display:"inline-block" }}>
                <div style={{ width:68,height:68,borderRadius:radius?.full,background:colors.accentLight,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:typography.fontDisplay,fontSize:typography["3xl"],color:colors.accentPrimary,margin:"0 auto" }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <button style={{ position:"absolute",bottom:0,right:0,width:22,height:22,borderRadius:radius?.full,background:colors.accentPrimary,border:`2px solid ${colors.bgCard}`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <Camera size={11} color="#fff"/>
                </button>
              </div>
              <p style={{ fontFamily:typography.fontBody,fontSize:typography.sm,fontWeight:typography.weightMedium,color:colors.textPrimary,marginTop:"0.75rem",marginBottom:2 }}>{user.name}</p>
              <p style={{ fontFamily:typography.fontBody,fontSize:typography.xs,color:colors.textMuted }}>{user.email}</p>
            </div>
            <nav style={{ display:"flex",flexDirection:"column",gap:"0.2rem" }}>
              {TABS.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.6rem 0.875rem",borderRadius:radius?.md,border:"none",cursor:"pointer",background: tab===t.id ? colors.accentLight : "transparent",color: tab===t.id ? colors.accentPrimary : colors.textSecondary,fontFamily:typography.fontBody,fontSize:typography.sm,fontWeight: tab===t.id ? typography.weightMedium : typography.weightRegular,transition:`all ${transitions?.fast}` }}>
                  <div style={{ display:"flex",alignItems:"center",gap:8 }}>{t.icon}{t.label}</div>
                  {tab===t.id && <ChevronRight size={13}/>}
                </button>
              ))}
              <button onClick={handleLogout}
                style={{ display:"flex",alignItems:"center",gap:8,padding:"0.6rem 0.875rem",borderRadius:radius?.md,border:"none",cursor:"pointer",background:"transparent",color:colors.error,fontFamily:typography.fontBody,fontSize:typography.sm,marginTop:"0.5rem" }}>
                <LogOut size={15}/> Sign Out
              </button>
            </nav>
          </div>
        )}

        {/* Tab content */}
        <motion.div key={tab} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.28 }}
          style={{ background:colors.bgCard, borderRadius:radius?.xl, padding: isMobile?"1.25rem":"2rem", border:`1px solid ${colors.borderLight}`, boxShadow:shadows?.sm }}>

          {tab==="account" && (
            <>
              <h2 style={{ fontFamily:typography.fontDisplay,fontSize:typography["2xl"],color:colors.textPrimary,marginBottom:"1.5rem" }}>Account Details</h2>
              <form onSubmit={handleSave} style={{ display:"flex",flexDirection:"column",gap:"1rem",maxWidth:460 }}>
                {[["Full Name",name,setName,"text"],["Email",email,setEmail,"email"]].map(([label,value,setter,type]) => (
                  <div key={label as string}>
                    <label style={{ fontFamily:typography.fontBody,fontSize:typography.sm,fontWeight:typography.weightMedium,color:colors.textPrimary,display:"block",marginBottom:4 }}>{label as string}</label>
                    <input type={type as string} value={value as string} onChange={e => (setter as React.Dispatch<React.SetStateAction<string>>)(e.target.value)} style={inputStyle}
                      onFocus={e => { e.currentTarget.style.borderColor=colors.borderFocus; e.currentTarget.style.boxShadow=`0 0 0 3px ${colors.accentLight}`; }}
                      onBlur={e  => { e.currentTarget.style.borderColor=colors.borderLight; e.currentTarget.style.boxShadow="none"; }}/>
                  </div>
                ))}
                <motion.button type="submit" disabled={saving} whileHover={!saving?{scale:1.02}:{}} whileTap={!saving?{scale:0.97}:{}}
                  style={{ alignSelf:"flex-start",padding:"0.7rem 2rem",borderRadius:radius?.full,background:colors.accentPrimary,color:colors.textOnAccent,border:"none",cursor:saving?"not-allowed":"pointer",fontFamily:typography.fontBody,fontSize:typography.sm,fontWeight:typography.weightMedium,opacity:saving?0.7:1 }}>
                  {saving ? "Saving…" : "Save Changes"}
                </motion.button>
              </form>
            </>
          )}

          {tab==="orders" && (
            <>
              <h2 style={{ fontFamily:typography.fontDisplay,fontSize:typography["2xl"],color:colors.textPrimary,marginBottom:"1.5rem" }}>My Orders</h2>
              <div style={{ textAlign:"center",padding:"3rem 0",color:colors.textMuted }}>
                <Package size={44} color={colors.borderMedium} style={{ margin:"0 auto 1rem" }}/>
                <p style={{ fontFamily:typography.fontBody,fontSize:typography.base,color:colors.textPrimary,marginBottom:"0.5rem" }}>No orders yet</p>
                <Link to="/shop" style={{ color:colors.accentPrimary,fontFamily:typography.fontBody,fontSize:typography.sm }}>Start shopping →</Link>
              </div>
            </>
          )}

          {tab==="wishlist" && (
            <>
              <h2 style={{ fontFamily:typography.fontDisplay,fontSize:typography["2xl"],color:colors.textPrimary,marginBottom:"1.5rem" }}>Wishlist</h2>
              <div style={{ textAlign:"center",padding:"3rem 0",color:colors.textMuted }}>
                <Heart size={44} color={colors.borderMedium} style={{ margin:"0 auto 1rem" }}/>
                <p style={{ fontFamily:typography.fontBody,fontSize:typography.base,color:colors.textPrimary,marginBottom:"0.5rem" }}>Nothing saved yet</p>
                <Link to="/wishlist" style={{ color:colors.accentPrimary,fontFamily:typography.fontBody,fontSize:typography.sm }}>View Wishlist →</Link>
              </div>
            </>
          )}

          {tab==="security" && (
            <>
              <h2 style={{ fontFamily:typography.fontDisplay,fontSize:typography["2xl"],color:colors.textPrimary,marginBottom:"1.5rem" }}>Change Password</h2>
              <form onSubmit={handlePasswordChange} style={{ display:"flex",flexDirection:"column",gap:"1rem",maxWidth:400 }}>
                {[["Current Password",oldPw,setOldPw],["New Password",newPw,setNewPw],["Confirm New Password",confPw,setConfPw]].map(([label,value,setter]) => (
                  <div key={label as string}>
                    <label style={{ fontFamily:typography.fontBody,fontSize:typography.sm,fontWeight:typography.weightMedium,color:colors.textPrimary,display:"block",marginBottom:4 }}>{label as string}</label>
                    <input type="password" value={value as string} onChange={e => (setter as React.Dispatch<React.SetStateAction<string>>)(e.target.value)} style={inputStyle}
                      onFocus={e => { e.currentTarget.style.borderColor=colors.borderFocus; e.currentTarget.style.boxShadow=`0 0 0 3px ${colors.accentLight}`; }}
                      onBlur={e  => { e.currentTarget.style.borderColor=colors.borderLight; e.currentTarget.style.boxShadow="none"; }}/>
                  </div>
                ))}
                <motion.button type="submit" whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
                  style={{ alignSelf:"flex-start",padding:"0.7rem 2rem",borderRadius:radius?.full,background:colors.accentPrimary,color:colors.textOnAccent,border:"none",cursor:"pointer",fontFamily:typography.fontBody,fontSize:typography.sm,fontWeight:typography.weightMedium }}>
                  Update Password
                </motion.button>
              </form>
            </>
          )}
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