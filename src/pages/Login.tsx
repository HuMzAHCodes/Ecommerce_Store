import { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { SignIn, useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { useTheme } from "../theme/ThemeContext";

// ── Helpers ───────────────────────────────────────────────────

/** Reads the intended destination the user was trying to visit */
const getRedirectDestination = (locationState: unknown): string => {
  if (
    locationState &&
    typeof locationState === "object" &&
    "from" in locationState &&
    typeof (locationState as { from: unknown }).from === "string"
  ) {
    return (locationState as { from: string }).from;
  }
  return "/";
};

// ── Component ─────────────────────────────────────────────────

const Login = () => {
  const theme    = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn } = useAuth();

  const redirectTo = getRedirectDestination(location.state);

  // If already signed in, redirect away from login page
  useEffect(() => {
    if (isSignedIn) navigate(redirectTo, { replace: true });
  }, [isSignedIn, navigate, redirectTo]);

  const { colors, typography, radius } = theme;

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
      {/* Brand header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ duration: 0.4 }}
        style={{ textAlign: "center" }}
      >
        <Link
          to="/"
          style={{
            fontFamily:    typography.fontDisplay,
            fontSize:      typography["3xl"],
            fontWeight:    typography.weightBold,
            color:         colors.textPrimary,
            textDecoration:"none",
            letterSpacing: "0.06em",
          }}
        >
          BLÜM
        </Link>
        <p
          style={{
            fontFamily: typography.fontBody,
            fontSize:   typography.sm,
            color:      colors.textMuted,
            marginTop:  "0.375rem",
          }}
        >
          Sign in to your account
        </p>
      </motion.div>

      {/* Clerk SignIn component — handles everything including Google OAuth */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
      >
        <SignIn
          routing="hash"
          afterSignInUrl={redirectTo}
          appearance={{
            variables: {
              colorPrimary:        colors.accentPrimary,
              colorBackground:     colors.bgCard,
              colorText:           colors.textPrimary,
              colorTextSecondary:  colors.textSecondary,
              colorInputBackground:colors.bgPrimary,
              colorInputText:      colors.textPrimary,
              borderRadius:        radius?.md ?? "8px",
              fontFamily:          typography.fontBody,
            },
            elements: {
              card:             { boxShadow: "none", border: `1px solid ${colors.borderLight}` },
              headerTitle:      { fontFamily: typography.fontDisplay, fontStyle: "italic" },
              formButtonPrimary:{ fontFamily: typography.fontBody, fontWeight: String(typography.weightMedium) },
            },
          }}
        />
      </motion.div>

      {/* Link to register */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        style={{
          fontFamily: typography.fontBody,
          fontSize:   typography.sm,
          color:      colors.textMuted,
        }}
      >
        Don't have an account?{" "}
        <Link
          to="/register"
          style={{
            color:      colors.accentPrimary,
            fontWeight: typography.weightMedium,
          }}
        >
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