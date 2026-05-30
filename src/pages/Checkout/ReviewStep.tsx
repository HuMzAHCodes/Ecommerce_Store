import { motion } from "framer-motion";
import { useTheme } from "../../theme/ThemeContext";
import { useIsMobile } from "../../hooks/useMediaQuery";
import type { CartItem } from "../../context/CartContext";
import type { ShippingForm } from "./types";

interface ReviewStepProps {
  items:        CartItem[];
  shipping:     ShippingForm;
  orderTotal:   number;
  isPlacing:    boolean;
  onBack:       () => void;
  onPlaceOrder: () => void;
}

/**
 * Step 3 — shows all cart items, the shipping address, and the place order CTA.
 * Button is disabled and shows a loading label while the order is being placed.
 */
const ReviewStep = ({
  items,
  shipping,
  orderTotal,
  isPlacing,
  onBack,
  onPlaceOrder,
}: ReviewStepProps) => {
  const { colors, typography, radius, shadows } = useTheme();
  const isMobile = useIsMobile();

  return (
    <motion.div
      key="review"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.28 }}
      style={{ background: colors.bgCard, borderRadius: radius?.xl, padding: isMobile ? "1.25rem" : "2rem", border: `1px solid ${colors.borderLight}`, boxShadow: shadows?.sm }}
    >
      <h2 style={{ fontFamily: typography.fontDisplay, fontSize: typography["2xl"], color: colors.textPrimary, marginBottom: "1.5rem" }}>
        Review Your Order
      </h2>

      {/* Item list */}
      {items.map(({ product, quantity }) => {
        const lineTotal = ((product.salePrice ?? product.price) * quantity).toFixed(2);
        return (
          <div
            key={product.id}
            style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.75rem 0", borderBottom: `1px solid ${colors.borderLight}` }}
          >
            <div style={{ width: 48, height: 48, borderRadius: radius?.md, background: product.image, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", flexShrink: 0 }}>
              ✨
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, color: colors.textPrimary, margin: 0 }}>
                {product.name}
              </p>
              <p style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted, margin: 0 }}>
                Qty: {quantity}
              </p>
            </div>
            <span style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightBold, color: colors.textPrimary }}>
              ${lineTotal}
            </span>
          </div>
        );
      })}

      {/* Shipping address summary */}
      <div style={{ margin: "1.1rem 0", padding: "0.875rem", background: colors.bgSecondary, borderRadius: radius?.lg }}>
        <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textSecondary, margin: 0 }}>
          <strong style={{ color: colors.textPrimary }}>Ship to:</strong>{" "}
          {shipping.address}, {shipping.city}, {shipping.zip}
        </p>
      </div>

      {/* Back + Place Order */}
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button
          onClick={onBack}
          style={{ flex: 1, padding: "0.875rem", borderRadius: radius?.full, border: `1.5px solid ${colors.borderLight}`, background: "transparent", cursor: "pointer", fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textSecondary }}
        >
          Back
        </button>
        <motion.button
          whileHover={!isPlacing ? { scale: 1.02 } : {}}
          whileTap={!isPlacing ? { scale: 0.97 } : {}}
          onClick={onPlaceOrder}
          disabled={isPlacing}
          style={{ flex: 2, padding: "0.875rem", borderRadius: radius?.full, background: colors.accentPrimary, color: colors.textOnAccent, border: "none", cursor: isPlacing ? "not-allowed" : "pointer", fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightMedium, opacity: isPlacing ? 0.75 : 1 }}
        >
          {isPlacing ? "Placing Order…" : `Place Order · $${orderTotal.toFixed(2)}`}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ReviewStep;
