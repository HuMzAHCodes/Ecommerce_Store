import { motion } from "framer-motion";
import { useTheme } from "../../theme/ThemeContext";
import { useIsMobile } from "../../hooks/useMediaQuery";
import type { CartItem } from "../../context/CartContext";

interface CheckoutOrderSummaryProps {
  items:       CartItem[];
  totalPrice:  number;
  shippingFee: number;
  orderTotal:  number;
}

/**
 * Sidebar showing per-item totals plus subtotal, shipping, and grand total.
 * Sticky on desktop, inline on mobile.
 */
const CheckoutOrderSummary = ({
  items,
  totalPrice,
  shippingFee,
  orderTotal,
}: CheckoutOrderSummaryProps) => {
  const { colors, typography, radius, shadows } = useTheme();
  const isMobile = useIsMobile();

  const summaryRows = [
    { label: "Subtotal", value: `$${totalPrice.toFixed(2)}`,  isBold: false },
    { label: "Shipping", value: shippingFee === 0 ? "Free" : "$5.99", isBold: false },
    { label: "Total",    value: `$${orderTotal.toFixed(2)}`,  isBold: true  },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      style={{
        background:    colors.bgCard,
        borderRadius:  radius?.xl,
        padding:       "1.5rem",
        border:        `1px solid ${colors.borderLight}`,
        boxShadow:     shadows?.sm,
        ...(!isMobile ? { position: "sticky", top: 84 } : {}),
      }}
    >
      <h3 style={{ fontFamily: typography.fontDisplay, fontSize: typography.xl, color: colors.textPrimary, marginBottom: "1.1rem" }}>
        Order Summary
      </h3>

      {/* Per-item rows */}
      {items.map(({ product, quantity }) => {
        const lineTotal = ((product.salePrice ?? product.price) * quantity).toFixed(2);
        return (
          <div
            key={product.id}
            style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontFamily: typography.fontBody, fontSize: typography.sm }}
          >
            <span style={{ color: colors.textSecondary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "60%" }}>
              {product.name} × {quantity}
            </span>
            <span style={{ color: colors.textPrimary, fontWeight: typography.weightMedium, flexShrink: 0 }}>
              ${lineTotal}
            </span>
          </div>
        );
      })}

      {/* Totals */}
      <div style={{ borderTop: `1px solid ${colors.borderLight}`, marginTop: "0.875rem", paddingTop: "0.875rem" }}>
        {summaryRows.map(({ label, value, isBold }) => (
          <div
            key={label}
            style={{ display: "flex", justifyContent: "space-between", marginBottom: label !== "Total" ? "0.5rem" : 0, fontFamily: typography.fontBody, fontSize: isBold ? typography.base : typography.sm, fontWeight: isBold ? typography.weightBold : typography.weightRegular, color: isBold ? colors.textPrimary : colors.textSecondary }}
          >
            <span>{label}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CheckoutOrderSummary;
