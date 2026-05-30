import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SignUp, useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { useTheme } from "../theme/ThemeContext";

// ── Component ─────────────────────────────────────────────────

const Register = () => {
  const theme    = useTheme();
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  // Redirect away if already signed in
  useEffect(() => {
    if (isSignedIn) navigate("/", { replace: true });
  }, [isSignedIn, navigate]);

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
            fontFamily:     typography.fontDisplay,
            fontSize:       typography["3xl"],
            fontWeight:     typography.weightBold,
            color:          colors.textPrimary,
            textDecoration: "none",
            letterSpacing:  "0.06em",
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
          Create your account
        </p>
      </motion.div>

      {/* Clerk SignUp — handles Google OAuth + email/password */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
      >
        <SignUp
          routing="hash"
          afterSignUpUrl="/"
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

      {/* Link to login */}
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
        Already have an account?{" "}
        <Link
          to="/login"
          style={{
            color:      colors.accentPrimary,
            fontWeight: typography.weightMedium,
          }}
        >
          Sign in
        </Link>
      </motion.p>
    </div>
  );
};

export default Register;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// Register.tsx
// The account creation page for the BLÜM storefront. Renders a centered card
// with a four-field registration form, client-side validation, a shared
// password visibility toggle across both password fields, and navigation to
// the home page on successful registration.
//
// ── What it renders ───────────────────────────────────────────────────────────
//
//  Full-viewport centered flex container (bgPrimary background)
//  └─ Animated card (motion.div, maxWidth 440, fades + slides up on mount)
//      ├─ BLÜM logo link → /
//      ├─ "Create an account" heading + "Join thousands of happy customers" sub
//      ├─ <form> — four fields rendered from the `fields` array
//      │   ├─ Full Name    (User icon)
//      │   ├─ Email        (Mail icon)
//      │   ├─ Password     (Lock icon + Eye/EyeOff toggle)
//      │   └─ Confirm Password (Lock icon, same showPw toggle)
//      │   └─ Submit button ("Create Account" / "Creating account…")
//      └─ "Already have an account? Sign in" → /login
//
// ── State ─────────────────────────────────────────────────────────────────────
//
//  name      — controlled value for the Full Name input
//  email     — controlled value for the Email input
//  password  — controlled value for the Password input
//  confirm   — controlled value for the Confirm Password input
//  showPw    — single boolean shared by BOTH password fields; toggling the
//              Eye button on the Password field reveals/hides both password
//              and confirm password inputs simultaneously
//  errors    — Record<string, string> keyed by field id; populated by
//              validate(), drives red border + inline error message per field
//
// ── fields array (data-driven form) ──────────────────────────────────────────
//
//  All four inputs are described as objects in the `fields` array:
//    { id, label, icon, type, value, set, placeholder }
//  The form maps over this array to render each field, eliminating repetitive
//  JSX. Each field's `set` function is the corresponding useState setter,
//  called directly in onChange: (e) => set(e.target.value).
//
//  isPassword flag (id === "password" || id === "confirm"):
//    • Switches input type to "text" or "password" based on showPw
//    • Adds paddingRight: "2.5rem" to leave room for the Eye button
//    • The Eye/EyeOff toggle button is only rendered when id === "password"
//      (not on "confirm") to avoid showing two toggle buttons, while both
//      inputs still respect the same showPw state.
//
// ── Validation ────────────────────────────────────────────────────────────────
//
//  validate() runs on submit before any API call:
//    name     — required (trimmed, so whitespace-only fails)
//    email    — required; must match /\S+@\S+\.\S+/
//    password — required; minimum 6 characters
//    confirm  — must strictly equal password (checked with !==)
//  Returns true only if the errors object is empty after all checks.
//  All four fields are validated in one pass; every failing field gets
//  its own error message simultaneously rather than stopping at the first.
//
// ── handleSubmit (async) ──────────────────────────────────────────────────────
//
//  1. Prevents default form submission
//  2. Runs validate(); returns early if any field is invalid
//  3. Calls register(name, email, password) from AuthContext
//     (confirm is not sent — it's a UI-only validation field)
//  4. On success: fires toast.success("Account created! Welcome to Blüm 🌿")
//     and navigates to "/" (home page)
//  5. On failure: catches the error and fires toast.error() with the thrown
//     message or a generic "Registration failed" fallback
//
// ── Comparison with Login.tsx ─────────────────────────────────────────────────
//
//  Register follows the same structural patterns as Login:
//    • Same inputStyle(hasError?) function for border + focus ring styling
//    • Same onFocus/onBlur imperative style mutation pattern
//    • Same motion.button disabled state (opacity, cursor, empty whileHover/Tap)
//    • Same card mount animation (opacity 0 + y 24 → opacity 1 + y 0, 500 ms)
//  Key differences:
//    • Four fields instead of two (uses a fields array to avoid repetition)
//    • No redirect-back logic (no `from` — always navigates to "/" on success)
//    • A confirm password field with cross-field equality validation
//    • Single showPw toggle controls both password fields
//    • useAuth().register() instead of useAuth().login()
//
// ── Submit button disabled state ─────────────────────────────────────────────
//
//  When isLoading is true (AuthContext call in flight):
//    • native disabled attribute blocks clicks
//    • cursor becomes "not-allowed"
//    • opacity drops to 0.7
//    • whileHover and whileTap receive empty objects (no scale animation)
//    • label changes to "Creating account…"
//
// ── Dependencies ─────────────────────────────────────────────────────────────
//
//  react-router-dom  — Link (logo + sign-in link), useNavigate (post-register)
//  framer-motion     — motion.div (card mount), motion.button (submit)
//  lucide-react      — User, Mail, Lock (input icons), Eye, EyeOff (pw toggle)
//  useTheme()        — colors, typography, radius, shadows, transitions tokens
//  useAuth()         — register() function + isLoading boolean from AuthContext
//  useToast()        — success / error toast notifications