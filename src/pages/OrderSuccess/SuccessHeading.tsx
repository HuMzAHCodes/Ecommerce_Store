import { motion } from "framer-motion";
import { useTheme } from "../../theme/ThemeContext";

interface SuccessHeadingProps {
  email: string;
}

/**
 * "Thank you for your order!" heading with the confirmation email address.
 * Fades and slides up with a short delay after the checkmark animates in.
 */
const SuccessHeading = ({ email }: SuccessHeadingProps) => {
  const { colors, typography } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{ textAlign: "center", marginBottom: "2rem" }}
    >
      <p className="overline" style={{ marginBottom: "0.75rem" }}>
        Order Confirmed
      </p>

      <h1
        style={{
          fontFamily:   typography.fontDisplay,
          color:        colors.textPrimary,
          fontStyle:    "italic",
          marginBottom: "0.875rem",
        }}
      >
        Thank you for your order!
      </h1>

      <p
        style={{
          fontFamily: typography.fontBody,
          color:      colors.textSecondary,
          fontSize:   typography.base,
          lineHeight: 1.7,
        }}
      >
        We've received your order and will send a confirmation to{" "}
        <strong style={{ color: colors.textPrimary }}>{email}</strong>.
      </p>
    </motion.div>
  );
};

export default SuccessHeading;
