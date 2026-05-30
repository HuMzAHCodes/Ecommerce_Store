import { motion } from "framer-motion";
import { SignIn } from "@clerk/clerk-react";
import { useTheme } from "../../theme/ThemeContext";

interface LoginSignInWidgetProps {
  redirectTo: string;
}

/**
 * Wraps Clerk's SignIn component with the app's theme variables.
 * Handles Google OAuth and all auth flows internally.
 */
const LoginSignInWidget = ({ redirectTo }: LoginSignInWidgetProps) => {
  const { colors, typography, radius } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0  }}
      transition={{ duration: 0.45, delay: 0.1 }}
    >
      <SignIn
        routing="hash"
        afterSignInUrl={redirectTo}
        appearance={{
          variables: {
            colorPrimary:         colors.accentPrimary,
            colorBackground:      colors.bgCard,
            colorText:            colors.textPrimary,
            colorTextSecondary:   colors.textSecondary,
            colorInputBackground: colors.bgPrimary,
            colorInputText:       colors.textPrimary,
            borderRadius:         radius?.md ?? "8px",
            fontFamily:           typography.fontBody,
          },
          elements: {
            card:              { boxShadow: "none", border: `1px solid ${colors.borderLight}` },
            headerTitle:       { fontFamily: typography.fontDisplay, fontStyle: "italic" },
            formButtonPrimary: { fontFamily: typography.fontBody, fontWeight: String(typography.weightMedium) },
          },
        }}
      />
    </motion.div>
  );
};

export default LoginSignInWidget;
