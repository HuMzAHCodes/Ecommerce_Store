import { Link }     from "react-router-dom";
import { SignUp }   from "@clerk/clerk-react";
import { motion }   from "framer-motion";
import { useTheme } from "../../theme/ThemeContext";
import useRegister  from "./useRegister";
import {
  pageStyles,       brandLogoStyles,
  brandSubtitleStyles, footerTextStyles,
  footerLinkStyles, buildClerkAppearance,
} from "./registerStyles";

// ── Component ─────────────────────────────────────────────────

const Register = () => {
  const { colors, typography, radius } = useTheme();

  useRegister();

  return (
    <div style={{ ...pageStyles(), background: colors.bgPrimary }}>

      {/* Brand header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0   }}
        transition={{ duration: 0.4 }}
        style={{ textAlign: "center" }}
      >
        <Link to="/" style={brandLogoStyles(typography, colors)}>
          BLÜM
        </Link>
        <p style={brandSubtitleStyles(typography, colors)}>
          Create your account
        </p>
      </motion.div>

      {/* Clerk SignUp — handles Google OAuth + email/password */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ duration: 0.45, delay: 0.1 }}
      >
        <SignUp
          routing="hash"
          signInUrl="/login"
          afterSignUpUrl="/"
          appearance={buildClerkAppearance(colors, typography, radius)}
        />
      </motion.div>

      {/* Link to login */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        style={footerTextStyles(typography, colors)}
      >
        Already have an account?{" "}
        <Link to="/login" style={footerLinkStyles(typography, colors)}>
          Sign in
        </Link>
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