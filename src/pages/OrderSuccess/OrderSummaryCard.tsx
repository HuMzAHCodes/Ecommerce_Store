import { motion } from "framer-motion";
import { CheckCircle, Package } from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";
import { ORDER_PROGRESS_STEPS, type OrderData } from "./types";

interface OrderSummaryCardProps {
  order: OrderData;
}

/** Detail rows shown in the 2-column grid inside the card */
const buildDetailRows = (order: OrderData) => [
  { label: "Date",     value: order.date                      },
  { label: "Items",    value: `${order.items} products`       },
  { label: "Total",    value: `$${order.total.toFixed(2)}`    },
  { label: "Delivery", value: order.shipping                  },
];

/**
 * Card showing order ID, a details grid, and an animated progress bar.
 * The progress bar animates to 10% (Order Placed step) on mount.
 */
const OrderSummaryCard = ({ order }: OrderSummaryCardProps) => {
  const { colors, typography, radius, shadows } = useTheme();
  const detailRows = buildDetailRows(order);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      style={{
        background:    colors.bgCard,
        borderRadius:  radius?.xl,
        border:        `1px solid ${colors.borderLight}`,
        boxShadow:     shadows?.md,
        overflow:      "hidden",
        marginBottom:  "1.5rem",
      }}
    >
      {/* Card header — order ID */}
      <div
        style={{
          background:    colors.bgSecondary,
          padding:       "1.1rem 1.5rem",
          borderBottom:  `1px solid ${colors.borderLight}`,
          display:       "flex",
          alignItems:    "center",
          gap:           10,
        }}
      >
        <Package size={18} color={colors.accentPrimary} />
        <span style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, color: colors.textPrimary }}>
          Order #{order.id}
        </span>
      </div>

      {/* Details grid */}
      <div style={{ padding: "1.25rem 1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        {detailRows.map(({ label, value }) => (
          <div key={label}>
            <p style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted, marginBottom: 3, letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 600 }}>
              {label}
            </p>
            <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textPrimary, fontWeight: typography.weightMedium, margin: 0 }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Order progress tracker */}
      <div style={{ padding: "0 1.5rem 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.625rem" }}>
          {ORDER_PROGRESS_STEPS.map(({ label, isComplete }, i) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, flex: 1 }}>
              <div
                style={{
                  width:       22,
                  height:      22,
                  borderRadius: radius?.full,
                  background:  isComplete ? colors.success : colors.borderLight,
                  display:     "flex",
                  alignItems:  "center",
                  justifyContent: "center",
                  border:      `2px solid ${isComplete ? colors.success : colors.borderLight}`,
                }}
              >
                {isComplete && <CheckCircle size={12} color="#fff" strokeWidth={2.5} />}
              </div>
              <span style={{ fontFamily: typography.fontBody, fontSize: "0.62rem", color: isComplete ? colors.success : colors.textMuted, textAlign: "center", fontWeight: isComplete ? 600 : 400 }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Animated progress fill */}
        <div style={{ height: 3, background: colors.borderLight, borderRadius: radius?.full, marginTop: 4, position: "relative" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "10%" }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            style={{ position: "absolute", top: 0, left: 0, height: "100%", background: colors.success, borderRadius: radius?.full }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummaryCard;
