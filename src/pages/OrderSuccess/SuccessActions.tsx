import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Package, ShoppingBag, ArrowRight } from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";
import { useIsMobile } from "../../hooks/useMediaQuery";

/**
 * Two CTA buttons — "Track Order" (primary) and "Continue Shopping" (outline).
 * Stack vertically on mobile, side by side on desktop.
 */
const SuccessActions = () => {
  const { colors, typography, radius, shadows } = useTheme();
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      style={{ display: "flex", gap: "0.875rem", flexDirection: isMobile ? "column" : "row" }}
    >
      {/* Primary — Track Order */}
      <Link to="/orders" style={{ flex: 1, textDecoration: "none" }}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          style={{ width: "100%", padding: "0.875rem", borderRadius: radius?.full, background: colors.accentPrimary, color: colors.textOnAccent, cursor: "pointer", fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightMedium, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: shadows?.md }}
        >
          <Package size={17} /> Track Order
        </motion.div>
      </Link>

      {/* Secondary — Continue Shopping */}
      <Link to="/shop" style={{ flex: 1, textDecoration: "none" }}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          style={{ width: "100%", padding: "0.875rem", borderRadius: radius?.full, background: "transparent", color: colors.textPrimary, border: `1.5px solid ${colors.borderMedium}`, cursor: "pointer", fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightMedium, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
        >
          <ShoppingBag size={17} /> Continue Shopping <ArrowRight size={15} />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default SuccessActions;
