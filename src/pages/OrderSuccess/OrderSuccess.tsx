import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../../theme/ThemeContext";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { MOCK_ORDER } from "./types";
import SuccessCheckmark  from "./SuccessCheckmark";
import SuccessHeading    from "./SuccessHeading";
import OrderSummaryCard  from "./OrderSummaryCard";
import SuccessActions    from "./SuccessActions";

/**
 * OrderSuccess page — thin orchestrator.
 *
 *  SuccessCheckmark  → bouncy animated check circle
 *  SuccessHeading    → "Thank you" heading + confirmation email
 *  OrderSummaryCard  → order ID, details grid, progress bar
 *  SuccessActions    → Track Order + Continue Shopping buttons
 */
const OrderSuccess = () => {
  const { colors, typography } = useTheme();
  const isMobile = useIsMobile();

  // Stable ref so the mock order ID doesn't regenerate on re-renders
  const orderRef = useRef(MOCK_ORDER);

  return (
    <div
      style={{
        background:      colors.bgPrimary,
        minHeight:       "100vh",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        padding:         isMobile ? "2rem 1.25rem" : "3rem 1.5rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: 580 }}>
        <SuccessCheckmark />
        <SuccessHeading email={orderRef.current.email} />
        <OrderSummaryCard order={orderRef.current} />
        <SuccessActions />

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          style={{ textAlign: "center", fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted, marginTop: "1.5rem", lineHeight: 1.6 }}
        >
          Questions about your order?{" "}
          <Link to="/about" style={{ color: colors.accentPrimary, textDecoration: "none", fontWeight: typography.weightMedium }}>
            Contact us
          </Link>
        </motion.p>
      </div>
    </div>
  );
};

export default OrderSuccess;
