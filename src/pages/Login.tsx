import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useTheme } from "../theme/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/ui/Toast";

const Login = () => {
  const theme = useTheme();
  const { colors, typography, radius, shadows, transitions } = theme;
  const { login, isLoading } = useAuth();
  const toast    = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from     = (location.state as { from?: string })?.from ?? "/";

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [errors,   setErrors]   = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!email)                          e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email   = "Enter a valid email";
    if (!password)                       e.password = "Password is required";
    else if (password.length < 6)        e.password = "Minimum 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    }
  };

  const inputStyle = (hasError?: string): React.CSSProperties => ({
    width:"100%", padding:"0.7rem 0.875rem 0.7rem 2.5rem",
    border:`1.5px solid ${hasError ? colors.error : colors.borderLight}`,
    borderRadius: radius?.md, fontFamily: typography.fontBody, fontSize: typography.base,
    color: colors.textPrimary, background: colors.bgCard, outline:"none",
    transition:`border-color ${transitions?.fast}, box-shadow ${transitions?.fast}`,
  });

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background: colors.bgPrimary, padding:"2rem 1.5rem" }}>
      <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
        style={{ width:"100%", maxWidth:420, background: colors.bgCard, borderRadius: radius?.xl, padding:"2.5rem", boxShadow: shadows?.xl, border:`1px solid ${colors.borderLight}` }}>

        {/* Logo */}
        <Link to="/" style={{ display:"block", textAlign:"center", fontFamily: typography.fontDisplay, fontSize: typography["3xl"], color: colors.textPrimary, textDecoration:"none", letterSpacing:"0.06em", marginBottom:"0.5rem" }}>
          BLÜM
        </Link>
        <h2 style={{ fontFamily: typography.fontDisplay, textAlign:"center", color: colors.textPrimary, fontStyle:"italic", marginBottom:"0.375rem", fontSize: typography["2xl"] }}>Welcome back</h2>
        <p style={{ fontFamily: typography.fontBody, textAlign:"center", color: colors.textMuted, fontSize: typography.sm, marginBottom:"2rem" }}>Sign in to your account</p>

        <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"1.1rem" }}>

          {/* Email */}
          <div>
            <label style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, color: colors.textPrimary, display:"block", marginBottom:5 }}>Email</label>
            <div style={{ position:"relative" }}>
              <Mail size={16} style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color: colors.textMuted, pointerEvents:"none" }} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" style={inputStyle(errors.email)}
                onFocus={(e) => { e.currentTarget.style.borderColor = colors.borderFocus; e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.accentLight}`; }}
                onBlur={(e)  => { e.currentTarget.style.borderColor = errors.email ? colors.error : colors.borderLight; e.currentTarget.style.boxShadow = "none"; }} />
            </div>
            {errors.email && <p style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.error, marginTop:3 }}>{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
              <label style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, color: colors.textPrimary }}>Password</label>
              <Link to="/forgot-password" style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.accentPrimary, textDecoration:"none" }}>Forgot password?</Link>
            </div>
            <div style={{ position:"relative" }}>
              <Lock size={16} style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color: colors.textMuted, pointerEvents:"none" }} />
              <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ ...inputStyle(errors.password), paddingRight:"2.5rem" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = colors.borderFocus; e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.accentLight}`; }}
                onBlur={(e)  => { e.currentTarget.style.borderColor = errors.password ? colors.error : colors.borderLight; e.currentTarget.style.boxShadow = "none"; }} />
              <button type="button" onClick={() => setShowPw(p => !p)}
                style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color: colors.textMuted, display:"flex" }}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.error, marginTop:3 }}>{errors.password}</p>}
          </div>

          {/* Submit */}
          <motion.button type="submit" disabled={isLoading} whileHover={!isLoading ? { scale:1.02 } : {}} whileTap={!isLoading ? { scale:0.97 } : {}}
            style={{ width:"100%", padding:"0.875rem", borderRadius: radius?.full, background: colors.accentPrimary, color: colors.textOnAccent, border:"none", cursor: isLoading ? "not-allowed" : "pointer", fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightMedium, opacity: isLoading ? 0.7 : 1, marginTop:"0.25rem" }}>
            {isLoading ? "Signing in…" : "Sign In"}
          </motion.button>
        </form>

        <div style={{ textAlign:"center", marginTop:"1.5rem", fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textMuted }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: colors.accentPrimary, fontWeight: typography.weightMedium, textDecoration:"none" }}>Create one</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// Login.tsx
// The sign-in page for the BLÜM storefront. Renders a centered card with an
// email + password form, client-side validation, a password visibility toggle,
// and redirect-back-to-origin logic after a successful login.
//
// ── What it renders ───────────────────────────────────────────────────────────
//
//  Full-viewport centered flex container (bgPrimary background)
//  └─ Animated card (motion.div, maxWidth 420, fades + slides up on mount)
//      ├─ BLÜM logo link → /
//      ├─ "Welcome back" heading + "Sign in to your account" subtext
//      ├─ <form>
//      │   ├─ Email field  (Mail icon, error message)
//      │   ├─ Password field (Lock icon, Eye/EyeOff toggle, error message,
//      │   │                  "Forgot password?" link → /forgot-password)
//      │   └─ Submit button ("Sign In" / "Signing in…" while loading)
//      └─ "Don't have an account? Create one" → /register
//
// ── State ─────────────────────────────────────────────────────────────────────
//
//  email     — controlled value for the email input
//  password  — controlled value for the password input
//  showPw    — boolean toggled by the Eye/EyeOff button; switches input
//              type between "password" and "text" to reveal/hide the value
//  errors    — { email?, password? } partial object; populated by validate(),
//              cleared implicitly on next successful validate() call;
//              drives red border color + inline error message per field
//
// ── Redirect-back logic (from) ────────────────────────────────────────────────
//
//  `from` is read from location.state?.from, falling back to "/".
//  Route guards on protected pages (Profile, Orders, Wishlist) should
//  navigate to /login with state: { from: location.pathname } so that
//  after a successful login the user lands exactly where they intended.
//  navigate(from, { replace: true }) replaces the /login entry in the
//  history stack so the back button doesn't return the user to the login page.
//
// ── Validation (client-side) ──────────────────────────────────────────────────
//
//  validate() runs on form submit before any API call:
//    email    — required; must match /\S+@\S+\.\S+/
//    password — required; minimum 6 characters
//  Returns true only if the errors object is empty.
//  Errors are shown inline below each field and as a red border via inputStyle().
//
// ── handleSubmit (async) ──────────────────────────────────────────────────────
//
//  1. Prevents default form submission
//  2. Runs validate(); returns early if invalid
//  3. Calls login(email, password) from AuthContext
//  4. On success: fires toast.success("Welcome back!") + navigates to `from`
//  5. On failure: catches the error and fires toast.error() with the error
//     message (or a generic "Login failed" fallback for non-Error throws)
//  isLoading comes from AuthContext and is true while the login call is
//  in flight — it disables the button and swaps its label to "Signing in…"
//
// ── inputStyle(hasError?) ─────────────────────────────────────────────────────
//
//  Returns a CSSProperties object for both inputs. When hasError is truthy
//  the border is set to colors.error; otherwise colors.borderLight.
//  Padding-left is 2.5rem on both inputs to leave room for the absolute-
//  positioned icon. The password input additionally sets paddingRight: "2.5rem"
//  inline (spread on top of inputStyle) to leave room for the Eye button.
//  onFocus/onBlur handlers mutate the input's style imperatively to show
//  the borderFocus + accentLight ring without a focused state variable —
//  consistent with the Input component and Checkout form patterns.
//
// ── Password visibility toggle ────────────────────────────────────────────────
//
//  A type="button" inside the relative wrapper prevents it from submitting
//  the form when clicked. showPw toggles the input's type between
//  "password" (dots) and "text" (plain), and swaps the icon between
//  Eye and EyeOff accordingly.
//
// ── Card animation ────────────────────────────────────────────────────────────
//
//  The outer card is a motion.div:
//    initial  — opacity: 0, y: +24
//    animate  — opacity: 1, y: 0
//    duration — 500 ms
//  Simple mount animation; no exit needed since navigation unmounts the page.
//
// ── Submit button disabled state ─────────────────────────────────────────────
//
//  When isLoading is true:
//    • native disabled attribute blocks clicks
//    • cursor becomes "not-allowed"
//    • opacity drops to 0.7
//    • whileHover and whileTap receive empty objects (no scale animation)
//    • label changes to "Signing in…"
//
// ── Dependencies ─────────────────────────────────────────────────────────────
//
//  react-router-dom  — Link, useNavigate, useLocation (for redirect-back)
//  framer-motion     — motion.div (card mount), motion.button (submit)
//  lucide-react      — Mail, Lock (input icons), Eye, EyeOff (pw toggle)
//  useTheme()        — colors, typography, radius, shadows, transitions tokens
//  useAuth()         — login() function + isLoading boolean from AuthContext
//  useToast()        — success / error toast notifications