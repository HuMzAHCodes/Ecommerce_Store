import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";

/**
 * Bouncy animated check circle — first thing the user sees on order success.
 * Uses a spring-like cubic bezier for the scale-in effect.
 */
const SuccessCheckmark = () => {
  const { colors, radius } = useTheme();

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
      style={{ display: "flex", justifyContent: "center", marginBottom: "1.75rem" }}
    >
      <div
        style={{
          width:           80,
          height:          80,
          borderRadius:    radius?.full,
          background:      colors.successBg,
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          boxShadow:       `0 0 0 12px ${colors.successBg}`,
        }}
      >
        <CheckCircle size={42} color={colors.success} strokeWidth={1.5} />
      </div>
    </motion.div>
  );
};

export default SuccessCheckmark;

