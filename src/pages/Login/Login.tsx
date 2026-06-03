// import { useEffect } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { useAuth } from "@clerk/clerk-react";
// import { motion } from "framer-motion";
// import { useTheme } from "../../theme/ThemeContext";
// import { getRedirectDestination } from "./helpers";
// import LoginBrandHeader  from "./LoginBrandHeader";
// import LoginSignInWidget from "./LoginSignInWidget";

// /**
//  * Login page — thin orchestrator.
//  *
//  *  getRedirectDestination → reads intended destination from router state
//  *  LoginBrandHeader       → BLÜM logo + "Sign in to your account"
//  *  LoginSignInWidget      → Clerk SignIn with app theme applied
//  */
// const Login = () => {
//   const { colors, typography } = useTheme();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isSignedIn } = useAuth();

//   const redirectTo = getRedirectDestination(location.state);

//   // Already signed in — redirect away from login immediately
//   useEffect(() => {
//     if (isSignedIn) navigate(redirectTo, { replace: true });
//   }, [isSignedIn, navigate, redirectTo]);

//   return (
//     <div
//       style={{
//         minHeight:      "100vh",
//         display:        "flex",
//         flexDirection:  "column",
//         alignItems:     "center",
//         justifyContent: "center",
//         background:     colors.bgPrimary,
//         padding:        "2rem 1.25rem",
//         gap:            "1.5rem",
//       }}
//     >
//       <LoginBrandHeader />
//       <LoginSignInWidget redirectTo={redirectTo} />

//       {/* Register link */}
//       <motion.p
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.4, delay: 0.25 }}
//         style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textMuted }}
//       >
//         Don't have an account?{" "}
//         <Link to="/register" style={{ color: colors.accentPrimary, fontWeight: typography.weightMedium }}>
//           Create one
//         </Link>
//       </motion.p>
//     </div>
//   );
// };

// export default Login;




import { useState, useEffect }                from "react";
import { useNavigate, useLocation, Link }      from "react-router-dom";
import { motion }                              from "framer-motion";
import { Mail, Lock, Eye, EyeOff }             from "lucide-react";
import { useTheme }                            from "../../theme/ThemeContext";
import { useAuth }                             from "../../components/auth/AuthContext";  // adjust path
import { getRedirectDestination }              from "./helpers";
import LoginBrandHeader                        from "./LoginBrandHeader";

// ── Types ────────────────────────────────────────────────────

interface FormErrors {
  email?:    string;
  password?: string;
  general?:  string;
}

// ── Component ────────────────────────────────────────────────

const Login = () => {
  const { colors, typography, radius } = useTheme();
  const navigate  = useNavigate();
  const location  = useLocation();
  const { login, loginGoogle, isSignedIn } = useAuth();

  const redirectTo = getRedirectDestination(location.state);

  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [showPw,    setShowPw]    = useState(false);
  const [errors,    setErrors]    = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Already signed in — redirect away immediately
  useEffect(() => {
    if (isSignedIn) navigate(redirectTo, { replace: true });
  }, [isSignedIn, navigate, redirectTo]);

  // ── Validation ───────────────────────────────────────────

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!email)                       errs.email    = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email.";
    if (!password)                    errs.password = "Password is required.";
    else if (password.length < 6)     errs.password = "Minimum 6 characters.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Submit ───────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setErrors({});
    try {
      await login(email, password);
      navigate(redirectTo, { replace: true });
    } catch (err: unknown) {
      // Map Firebase error codes to friendly messages
      const code = (err as { code?: string }).code ?? "";
      let message = "Login failed. Please try again.";
      if (code === "auth/user-not-found" || code === "auth/invalid-credential") {
        message = "No account found with that email. Would you like to sign up?";
      } else if (code === "auth/wrong-password") {
        message = "Incorrect password.";
      } else if (code === "auth/too-many-requests") {
        message = "Too many attempts. Please wait a moment and try again.";
      } else if (code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      }
      setErrors({ general: message });
    } finally {
      setIsLoading(false);
    }
  };

  // ── Google sign-in ───────────────────────────────────────

  const handleGoogle = async () => {
    setIsLoading(true);
    setErrors({});
    try {
      await loginGoogle();
      navigate(redirectTo, { replace: true });
    } catch {
      setErrors({ general: "Google sign-in failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  // ── Styles ───────────────────────────────────────────────

  const inputStyle = (hasError?: boolean): React.CSSProperties => ({
    width:           "100%",
    padding:         "0.65rem 0.875rem 0.65rem 2.5rem",
    fontFamily:      typography.fontBody,
    fontSize:        typography.sm,
    color:           colors.textPrimary,
    background:      colors.bgPrimary,
    border:          `1px solid ${hasError ? colors.error : colors.borderLight}`,
    borderRadius:    radius?.md ?? "8px",
    outline:         "none",
    transition:      "border-color 0.2s",
  });

  // ── Render ───────────────────────────────────────────────

  return (
    <div
      style={{
        minHeight:      "100vh",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        background:     colors.bgPrimary,
        padding:        "2rem 1.25rem",
        gap:            "1.5rem",
      }}
    >
      <LoginBrandHeader />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ duration: 0.5 }}
        style={{
          width:        "100%",
          maxWidth:     "420px",
          background:   colors.bgCard,
          border:       `1px solid ${colors.borderLight}`,
          borderRadius: radius?.lg ?? "12px",
          padding:      "2rem",
        }}
      >
        {/* General error banner */}
        {errors.general && (
          <div
            style={{
              marginBottom: "1.25rem",
              padding:      "0.75rem 1rem",
              background:   `${colors.error}18`,
              border:       `1px solid ${colors.error}40`,
              borderRadius: radius?.md ?? "8px",
              color:        colors.error,
              fontSize:     typography.sm,
              fontFamily:   typography.fontBody,
            }}
          >
            {errors.general}
            {errors.general.includes("sign up") && (
              <>
                {" "}
                <Link to="/register" style={{ color: colors.accentPrimary, fontWeight: typography.weightMedium }}>
                  Create account
                </Link>
              </>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "0.35rem", fontSize: typography.sm, fontFamily: typography.fontBody, color: colors.textSecondary }}
            >
              Email
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: colors.textMuted, pointerEvents: "none" }} />
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={inputStyle(!!errors.email)}
              />
            </div>
            {errors.email && <p style={{ marginTop: "0.3rem", fontSize: "0.75rem", color: colors.error, fontFamily: typography.fontBody }}>{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
              <label
                htmlFor="password"
                style={{ fontSize: typography.sm, fontFamily: typography.fontBody, color: colors.textSecondary }}
              >
                Password
              </label>
              <Link to="/forgot-password" style={{ fontSize: "0.75rem", color: colors.accentPrimary, fontFamily: typography.fontBody }}>
                Forgot password?
              </Link>
            </div>
            <div style={{ position: "relative" }}>
              <Lock size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: colors.textMuted, pointerEvents: "none" }} />
              <input
                id="password"
                type={showPw ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ ...inputStyle(!!errors.password), paddingRight: "2.5rem" }}
              />
              <button
                type="button"
                onClick={() => setShowPw(p => !p)}
                style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: colors.textMuted, padding: 0 }}
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p style={{ marginTop: "0.3rem", fontSize: "0.75rem", color: colors.error, fontFamily: typography.fontBody }}>{errors.password}</p>}
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={isLoading ? {} : { scale: 1.015 }}
            whileTap={isLoading  ? {} : { scale: 0.985 }}
            style={{
              marginTop:    "0.5rem",
              width:        "100%",
              padding:      "0.75rem",
              background:   colors.accentPrimary,
              color:        colors.textOnAccent ?? "#fff",
              border:       "none",
              borderRadius: radius?.md ?? "8px",
              fontFamily:   typography.fontBody,
              fontSize:     typography.sm,
              fontWeight:   typography.weightMedium,
              cursor:       isLoading ? "not-allowed" : "pointer",
              opacity:      isLoading ? 0.7 : 1,
              transition:   "opacity 0.2s",
            }}
          >
            {isLoading ? "Signing in…" : "Sign In"}
          </motion.button>
        </form>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", margin: "1.25rem 0" }}>
          <div style={{ flex: 1, height: "1px", background: colors.borderLight }} />
          <span style={{ fontSize: "0.75rem", color: colors.textMuted, fontFamily: typography.fontBody }}>or</span>
          <div style={{ flex: 1, height: "1px", background: colors.borderLight }} />
        </div>

        {/* Google */}
        <motion.button
          type="button"
          onClick={handleGoogle}
          disabled={isLoading}
          whileHover={isLoading ? {} : { scale: 1.015 }}
          whileTap={isLoading  ? {} : { scale: 0.985 }}
          style={{
            width:        "100%",
            display:      "flex",
            alignItems:   "center",
            justifyContent: "center",
            gap:          "0.6rem",
            padding:      "0.7rem",
            background:   "transparent",
            border:       `1px solid ${colors.borderLight}`,
            borderRadius: radius?.md ?? "8px",
            fontFamily:   typography.fontBody,
            fontSize:     typography.sm,
            color:        colors.textPrimary,
            cursor:       isLoading ? "not-allowed" : "pointer",
            opacity:      isLoading ? 0.7 : 1,
          }}
        >
          {/* Google "G" icon */}
          <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Continue with Google
        </motion.button>
      </motion.div>

      {/* Register link */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textMuted }}
      >
        Don't have an account?{" "}
        <Link to="/register" style={{ color: colors.accentPrimary, fontWeight: typography.weightMedium }}>
          Create one
        </Link>
      </motion.p>
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