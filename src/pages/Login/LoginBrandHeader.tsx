import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../../theme/ThemeContext";

/**
 * Animated brand header shown above the Clerk sign-in widget.
 * Slides down and fades in on mount.
 */
const LoginBrandHeader = () => {
  const { colors, typography } = useTheme();

  return (
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
        Sign in to your account
      </p>
    </motion.div>
  );
};

export default LoginBrandHeader;
