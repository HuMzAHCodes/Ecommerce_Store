import { motion } from "framer-motion";
import { SignIn } from "@clerk/clerk-react";
import { useTheme } from "../../theme/ThemeContext";

interface LoginSignInWidgetProps {
  redirectTo: string;
}

/**
 * Wraps Clerk's SignIn component with the app's theme variables.
 * Handles Google OAuth and all auth flows internally.
 *
 * FIX: Changed routing="hash" → routing="path" + added path="/login"
 * Hash routing strips the URL fragment during Google OAuth redirect,
 * breaking the callback. Path routing keeps the full URL intact.
 *
 * FIX: Replaced deprecated afterSignInUrl → fallbackRedirectUrl
 * fallbackRedirectUrl respects any pre-login intended destination
 * (e.g. user tried to visit /checkout → got redirected to /login →
 * after sign-in, Clerk sends them back to /checkout automatically)
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
        routing="path"            
        path="/login"             
        signUpUrl="/register"     
        fallbackRedirectUrl={redirectTo}
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