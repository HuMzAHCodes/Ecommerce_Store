// import { Link }     from "react-router-dom";
// import { SignUp }   from "@clerk/clerk-react";
// import { motion }   from "framer-motion";
// import { useTheme } from "../../theme/ThemeContext";
// import useRegister  from "./useRegister";
// import {
//   pageStyles,          brandLogoStyles,
//   brandSubtitleStyles, footerTextStyles,
//   footerLinkStyles,    buildClerkAppearance,
// } from "./registerStyles";

// // ── Component ─────────────────────────────────────────────────

// const Register = () => {
//   const { colors, typography, radius } = useTheme();

//   useRegister();

//   return (
//     <div style={{ ...pageStyles(), background: colors.bgPrimary }}>

//       {/* Brand header */}
//       <motion.div
//         initial={{ opacity: 0, y: -16 }}
//         animate={{ opacity: 1, y: 0   }}
//         transition={{ duration: 0.4 }}
//         style={{ textAlign: "center" }}
//       >
//         <Link to="/" style={brandLogoStyles(typography, colors)}>
//           BLÜM
//         </Link>
//         <p style={brandSubtitleStyles(typography, colors)}>
//           Create your account
//         </p>
//       </motion.div>

//       {/* Clerk SignUp — handles Google OAuth + email/password
//           FIX: Changed routing="hash" → routing="path" + added path="/register"
//           Hash routing breaks OAuth callbacks; path routing keeps full URL intact.
//           FIX: Replaced deprecated afterSignUpUrl → fallbackRedirectUrl */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0  }}
//         transition={{ duration: 0.45, delay: 0.1 }}
//       >
//         <SignUp
//           routing="path"          
//           path="/register"       
//           signInUrl="/login"      
//           fallbackRedirectUrl="/" 
//           appearance={buildClerkAppearance(colors, typography, radius)}
//         />
//       </motion.div>

//       {/* Link to login */}
//       <motion.p
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.4, delay: 0.25 }}
//         style={footerTextStyles(typography, colors)}
//       >
//         Already have an account?{" "}
//         <Link to="/login" style={footerLinkStyles(typography, colors)}>
//           Sign in
//         </Link>
//       </motion.p>

//     </div>
//   );
// };

// export default Register;




import { useState }              from "react";
import { Link }                  from "react-router-dom";
import { motion }                from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useTheme }              from "../../theme/ThemeContext";
import useRegister               from "./useRegister";
import {
  pageStyles,
  brandLogoStyles,
  brandSubtitleStyles,
  footerTextStyles,
  footerLinkStyles,
} from "./registerStyles";

// ── Types ────────────────────────────────────────────────────

interface FormErrors {
  email?:    string;
  password?: string;
  confirm?:  string;
  general?:  string;
}

// ── Component ────────────────────────────────────────────────

const Register = () => {
  const { colors, typography, radius } = useTheme();

  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [confirm,   setConfirm]   = useState("");
  const [showPw,    setShowPw]    = useState(false);
  const [showCf,    setShowCf]    = useState(false);
  const [errors,    setErrors]    = useState<FormErrors>({});

  const { handleSubmit, handleGoogle, isLoading } = useRegister({
    email, password, setErrors,
  });

  // ── Validation ───────────────────────────────────────────

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!email)                            errs.email    = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email    = "Enter a valid email.";
    if (!password)                         errs.password = "Password is required.";
    else if (password.length < 6)          errs.password = "Minimum 6 characters.";
    if (!confirm)                          errs.confirm  = "Please confirm your password.";
    else if (confirm !== password)         errs.confirm  = "Passwords do not match.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) handleSubmit();
  };

  // ── Styles ───────────────────────────────────────────────

  const inputStyle = (hasError?: boolean): React.CSSProperties => ({
    width:        "100%",
    padding:      "0.65rem 0.875rem 0.65rem 2.5rem",
    fontFamily:   typography.fontBody,
    fontSize:     typography.sm,
    color:        colors.textPrimary,
    background:   colors.bgPrimary,
    border:       `1px solid ${hasError ? colors.error : colors.borderLight}`,
    borderRadius: radius?.md ?? "8px",
    outline:      "none",
    transition:   "border-color 0.2s",
  });

  // ── Render ───────────────────────────────────────────────

  return (
    <div style={{ ...pageStyles(), background: colors.bgPrimary }}>

      {/* Brand header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0   }}
        transition={{ duration: 0.4 }}
        style={{ textAlign: "center" }}
      >
        <Link to="/" style={brandLogoStyles(typography, colors)}>BLÜM</Link>
        <p style={brandSubtitleStyles(typography, colors)}>Create your account</p>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ duration: 0.45, delay: 0.1 }}
        style={{
          width:        "100%",
          maxWidth:     "420px",
          background:   colors.bgCard,
          border:       `1px solid ${colors.borderLight}`,
          borderRadius: radius?.lg ?? "12px",
          padding:      "2rem",
        }}
      >
        {/* General error */}
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
          </div>
        )}

        <form onSubmit={onSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>

          {/* Email */}
          <div>
            <label htmlFor="reg-email" style={{ display: "block", marginBottom: "0.35rem", fontSize: typography.sm, fontFamily: typography.fontBody, color: colors.textSecondary }}>
              Email
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: colors.textMuted, pointerEvents: "none" }} />
              <input id="reg-email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle(!!errors.email)} />
            </div>
            {errors.email && <p style={{ marginTop: "0.3rem", fontSize: "0.75rem", color: colors.error, fontFamily: typography.fontBody }}>{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="reg-password" style={{ display: "block", marginBottom: "0.35rem", fontSize: typography.sm, fontFamily: typography.fontBody, color: colors.textSecondary }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: colors.textMuted, pointerEvents: "none" }} />
              <input id="reg-password" type={showPw ? "text" : "password"} autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 characters" style={{ ...inputStyle(!!errors.password), paddingRight: "2.5rem" }} />
              <button type="button" onClick={() => setShowPw(p => !p)} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: colors.textMuted, padding: 0 }} aria-label={showPw ? "Hide password" : "Show password"}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p style={{ marginTop: "0.3rem", fontSize: "0.75rem", color: colors.error, fontFamily: typography.fontBody }}>{errors.password}</p>}
          </div>

          {/* Confirm password */}
          <div>
            <label htmlFor="reg-confirm" style={{ display: "block", marginBottom: "0.35rem", fontSize: typography.sm, fontFamily: typography.fontBody, color: colors.textSecondary }}>
              Confirm password
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: colors.textMuted, pointerEvents: "none" }} />
              <input id="reg-confirm" type={showCf ? "text" : "password"} autoComplete="new-password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Re-enter password" style={{ ...inputStyle(!!errors.confirm), paddingRight: "2.5rem" }} />
              <button type="button" onClick={() => setShowCf(p => !p)} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: colors.textMuted, padding: 0 }} aria-label={showCf ? "Hide password" : "Show password"}>
                {showCf ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirm && <p style={{ marginTop: "0.3rem", fontSize: "0.75rem", color: colors.error, fontFamily: typography.fontBody }}>{errors.confirm}</p>}
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
            {isLoading ? "Creating account…" : "Create Account"}
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
            width:          "100%",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            gap:            "0.6rem",
            padding:        "0.7rem",
            background:     "transparent",
            border:         `1px solid ${colors.borderLight}`,
            borderRadius:   radius?.md ?? "8px",
            fontFamily:     typography.fontBody,
            fontSize:       typography.sm,
            color:          colors.textPrimary,
            cursor:         isLoading ? "not-allowed" : "pointer",
            opacity:        isLoading ? 0.7 : 1,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Continue with Google
        </motion.button>
      </motion.div>

      {/* Login link */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        style={footerTextStyles(typography, colors)}
      >
        Already have an account?{" "}
        <Link to="/login" style={footerLinkStyles(typography, colors)}>Sign in</Link>
      </motion.p>
    </div>
  );
};

export default Register;

/*
 * ── Register — What this folder does ────────────────────────────────────────
 *
 * Sign-up page powered by Clerk's hosted SignUp component.
 *
 * Flow:
 *   - If already signed in → redirect to "/" immediately (useRegister)
 *   - Otherwise render: brand header → Clerk SignUp widget → login link
 *
 * Clerk widget handles:
 *   - Email/password registration
 *   - Google OAuth
 *   - Email verification flow
 *   - Redirects to "/" after successful sign-up (afterSignUpUrl)
 *
 * Appearance (buildClerkAppearance in registerStyles.ts):
 *   - Fully themed from ThemeContext — colors, typography, radius
 *   - Card border replaces default box-shadow to match site style
 *   - Header title uses fontDisplay + italic to match BLÜM brand
 *
 * Files in this folder:
 *   useRegister.ts     — signed-in redirect effect
 *   registerStyles.ts  — style factories + Clerk appearance builder
 *   Register.tsx       — thin orchestrator
 */