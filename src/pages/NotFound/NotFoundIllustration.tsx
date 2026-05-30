import { motion } from "framer-motion";
import { useTheme } from "../../theme/ThemeContext";

/**
 * Animated 404 illustration — a wobbling flower emoji,
 * large "404" display text, and the "Page not found" subheading.
 */
const NotFoundIllustration = () => {
  const { colors, typography } = useTheme();

  return (
    <>
      {/* Wobbling emoji */}
      <motion.div
        animate={{ rotate: [0, -5, 5, -5, 0] }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{ fontSize: "6rem", marginBottom: "1.5rem" }}
      >
        🌸
      </motion.div>

      {/* Large 404 */}
      <h1
        style={{
          fontFamily:   typography.fontDisplay,
          fontSize:     "6rem",
          color:        colors.accentLight,
          fontStyle:    "italic",
          lineHeight:   1,
          marginBottom: "0.5rem",
        }}
      >
        404
      </h1>

      {/* Subheading */}
      <h2
        style={{
          fontFamily:   typography.fontDisplay,
          color:        colors.textPrimary,
          fontStyle:    "italic",
          marginBottom: "0.875rem",
        }}
      >
        Page not found
      </h2>

      <p
        style={{
          fontFamily:   typography.fontBody,
          color:        colors.textMuted,
          marginBottom: "2.5rem",
          lineHeight:   1.7,
        }}
      >
        The page you're looking for doesn't exist or has been moved.
      </p>
    </>
  );
};

export default NotFoundIllustration;
