import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Tag, ArrowRight } from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";
import type { OrderTotals } from "./types";

interface CartOrderSummaryProps {
  totals:        OrderTotals;
  appliedCode:   string;
  promoInput:    string;
  promoError:    string;
  onPromoChange: (val: string) => void;
  onPromoApply:  () => void;
}

/**
 * Displays order line items, promo code input, and the checkout CTA.
 * Used as a sticky sidebar on desktop and inline below the list on mobile.
 */
const CartOrderSummary = ({
  totals,
  appliedCode,
  promoInput,
  promoError,
  onPromoChange,
  onPromoApply,
}: CartOrderSummaryProps) => {
  const { colors, typography, radius, shadows } = useTheme();
  const navigate = useNavigate();

  const { subtotal, shipping, discountAmt, orderTotal } = totals;

  /** Line items to render in the summary list */
  const summaryRows = [
    { label: "Subtotal",                              value: `$${subtotal.toFixed(2)}` },
    { label: "Shipping",                              value: shipping === 0 ? "Free 🎉" : `$${shipping.toFixed(2)}` },
    ...(discountAmt > 0 ? [{ label: `Discount (${appliedCode})`, value: `-$${discountAmt.toFixed(2)}` }] : []),
  ];

  return (
    <div
      style={{
        background:   colors.bgCard,
        borderRadius: radius?.xl,
        padding:      "1.5rem",
        border:       `1px solid ${colors.borderLight}`,
        boxShadow:    shadows?.sm,
      }}
    >
      <h2
        style={{
          fontFamily:   typography.fontDisplay,
          fontSize:     typography["2xl"],
          color:        colors.textPrimary,
          marginBottom: "1.25rem",
        }}
      >
        Order Summary
      </h2>

      {/* Line items */}
      {summaryRows.map(({ label, value }) => (
        <div
          key={label}
          style={{
            display:         "flex",
            justifyContent:  "space-between",
            fontFamily:      typography.fontBody,
            fontSize:        typography.sm,
            color:           colors.textSecondary,
            marginBottom:    "0.625rem",
          }}
        >
          <span>{label}</span>
          <span style={{ color: label.startsWith("Discount") ? colors.success : "inherit" }}>
            {value}
          </span>
        </div>
      ))}

      {/* Total row */}
      <div
        style={{
          borderTop:       `1px solid ${colors.borderLight}`,
          margin:          "1rem 0",
          paddingTop:      "1rem",
          display:         "flex",
          justifyContent:  "space-between",
        }}
      >
        <span style={{ fontFamily: typography.fontBody, fontWeight: typography.weightBold, color: colors.textPrimary }}>
          Total
        </span>
        <span style={{ fontFamily: typography.fontDisplay, fontSize: typography["2xl"], color: colors.textPrimary }}>
          ${orderTotal.toFixed(2)}
        </span>
      </div>

      {/* Promo code input — hidden once a code is applied */}
      {!appliedCode && (
        <div style={{ marginBottom: "1.1rem" }}>
          <div style={{ display: "flex", gap: "0.5rem" }}>

            {/* Input with tag icon */}
            <div style={{ flex: 1, position: "relative" }}>
              <Tag
                size={13}
                style={{
                  position:       "absolute",
                  left:           9,
                  top:            "50%",
                  transform:      "translateY(-50%)",
                  color:          colors.textMuted,
                  pointerEvents:  "none",
                }}
              />
              <input
                value={promoInput}
                onChange={e => onPromoChange(e.target.value)}
                onKeyDown={e => e.key === "Enter" && onPromoApply()}
                placeholder="Promo code"
                style={{
                  width:         "100%",
                  paddingLeft:   28,
                  paddingRight:  10,
                  paddingTop:    "0.55rem",
                  paddingBottom: "0.55rem",
                  border:        `1px solid ${promoError ? colors.error : colors.borderLight}`,
                  borderRadius:  radius?.md,
                  fontFamily:    typography.fontBody,
                  fontSize:      typography.sm,
                  color:         colors.textPrimary,
                  background:    colors.bgPrimary,
                  outline:       "none",
                }}
              />
            </div>

            <button
              onClick={onPromoApply}
              style={{
                padding:     "0 0.875rem",
                background:  colors.textPrimary,
                color:       colors.textOnDark,
                borderRadius: radius?.md,
                border:      "none",
                cursor:      "pointer",
                fontFamily:  typography.fontBody,
                fontSize:    typography.sm,
                fontWeight:  typography.weightMedium,
                whiteSpace:  "nowrap",
              }}
            >
              Apply
            </button>
          </div>

          {promoError && (
            <p style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.error, marginTop: 4 }}>
              {promoError}
            </p>
          )}

          <p style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted, marginTop: 4 }}>
            Try: BLUM10 or WELCOME20
          </p>
        </div>
      )}

      {/* Checkout button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate("/checkout")}
        style={{
          width:           "100%",
          padding:         "0.875rem",
          borderRadius:    radius?.full,
          background:      colors.accentPrimary,
          color:           colors.textOnAccent,
          border:          "none",
          cursor:          "pointer",
          fontFamily:      typography.fontBody,
          fontSize:        typography.base,
          fontWeight:      typography.weightMedium,
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          gap:             8,
          boxShadow:       shadows?.md,
        }}
      >
        Proceed to Checkout <ArrowRight size={16} />
      </motion.button>

      {/* Continue shopping link */}
      <Link
        to="/shop"
        style={{
          display:        "block",
          textAlign:      "center",
          marginTop:      "0.75rem",
          fontFamily:     typography.fontBody,
          fontSize:       typography.sm,
          color:          colors.textMuted,
          textDecoration: "none",
        }}
      >
        ← Continue Shopping
      </Link>

      {/* Free shipping nudge */}
      {subtotal < 50 && (
        <p
          style={{
            textAlign:    "center",
            fontFamily:   typography.fontBody,
            fontSize:     typography.xs,
            color:        colors.accentPrimary,
            marginTop:    "0.875rem",
            background:   colors.accentLight,
            padding:      "0.5rem",
            borderRadius: radius?.md,
          }}
        >
          Add ${(50 - subtotal).toFixed(2)} more for free shipping!
        </p>
      )}
    </div>
  );
};

export default CartOrderSummary;
