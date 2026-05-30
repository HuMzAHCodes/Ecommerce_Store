import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ShoppingBag, ArrowRight } from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";

/**
 * Two CTA buttons — "Go Home" (primary) and "Browse Shop" (outline).
 */
const NotFoundActions = () => {
  const { colors, typography, radius, shadows } = useTheme();

  return (
    <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
      <Link to="/">
        <motion.span
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: colors.accentPrimary, color: colors.textOnAccent, borderRadius: radius?.full, padding: "0.875rem 1.75rem", fontFamily: typography.fontBody, fontWeight: typography.weightMedium, cursor: "pointer", boxShadow: shadows?.md }}
        >
          <Home size={16} /> Go Home
        </motion.span>
      </Link>

      <Link to="/shop">
        <motion.span
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: colors.textPrimary, borderRadius: radius?.full, padding: "0.875rem 1.75rem", fontFamily: typography.fontBody, fontWeight: typography.weightMedium, cursor: "pointer", border: `1.5px solid ${colors.borderMedium}` }}
        >
          <ShoppingBag size={16} /> Browse Shop <ArrowRight size={15} />
        </motion.span>
      </Link>
    </div>
  );
};

export default NotFoundActions;
