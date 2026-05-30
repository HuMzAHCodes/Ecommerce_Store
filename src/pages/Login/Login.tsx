import { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { useTheme } from "../../theme/ThemeContext";
import { getRedirectDestination } from "./helpers";
import LoginBrandHeader  from "./LoginBrandHeader";
import LoginSignInWidget from "./LoginSignInWidget";

/**
 * Login page — thin orchestrator.
 *
 *  getRedirectDestination → reads intended destination from router state
 *  LoginBrandHeader       → BLÜM logo + "Sign in to your account"
 *  LoginSignInWidget      → Clerk SignIn with app theme applied
 */
const Login = () => {
  const { colors, typography } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn } = useAuth();

  const redirectTo = getRedirectDestination(location.state);

  // Already signed in — redirect away from login immediately
  useEffect(() => {
    if (isSignedIn) navigate(redirectTo, { replace: true });
  }, [isSignedIn, navigate, redirectTo]);

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
      <LoginSignInWidget redirectTo={redirectTo} />

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
