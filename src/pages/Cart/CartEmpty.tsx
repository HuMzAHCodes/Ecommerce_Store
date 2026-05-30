import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";

/**
 * Shown when the cart has no items.
 * Animates in with a scale + fade, then a staggered text reveal.
 */
const CartEmpty = () => {
  const { colors, typography, radius } = useTheme();

  return (
    <div
      style={{
        minHeight:      "70vh",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        gap:            "1.25rem",
        padding:        "3rem 1.5rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <ShoppingBag size={60} color={colors.borderMedium} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{ textAlign: "center" }}
      >
        <h2
          style={{
            fontFamily:   typography.fontDisplay,
            color:        colors.textPrimary,
            fontStyle:    "italic",
            marginBottom: "0.5rem",
          }}
        >
          Your cart is empty
        </h2>

        <p
          style={{
            fontFamily:   typography.fontBody,
            color:        colors.textMuted,
            marginBottom: "1.5rem",
          }}
        >
          Looks like you haven't added anything yet.
        </p>

        <Link to="/shop">
          <motion.span
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display:      "inline-flex",
              alignItems:   "center",
              gap:          8,
              background:   colors.accentPrimary,
              color:        colors.textOnAccent,
              borderRadius: radius?.full,
              padding:      "0.875rem 2rem",
              fontFamily:   typography.fontBody,
              fontWeight:   typography.weightMedium,
              cursor:       "pointer",
            }}
          >
            Start Shopping <ArrowRight size={15} />
          </motion.span>
        </Link>
      </motion.div>
    </div>
  );
};

export default CartEmpty;
