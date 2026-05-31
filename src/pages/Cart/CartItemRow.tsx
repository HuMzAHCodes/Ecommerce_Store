import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";
import { useIsMobile } from "../../hooks/useMediaQuery";
import type { CartItem } from "../../context/CartContext";

interface CartItemRowProps {
  item:      CartItem;
  onUpdate:  (productId: string, qty: number) => void;
  onRemove:  (productId: string) => void;
}

/** Quantity stepper — shared between mobile and desktop layouts */
const QtyStepperButton = ({
  onClick,
  children,
  size,
}: {
  onClick:  () => void;
  children: React.ReactNode;
  size:     number;
}) => {
  const { colors, radius } = useTheme();
  return (
    <button
      onClick={onClick}
      style={{
        width:           size,
        height:          size + 2,
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        background:      "transparent",
        border:          "none",
        cursor:          "pointer",
        color:           colors.textPrimary,
      }}
    >
      {children}
    </button>
  );
};

/**
 * A single row in the cart item list.
 * Renders a compact mobile layout or a wider desktop layout based on viewport.
 */
const CartItemRow = ({ item, onUpdate, onRemove }: CartItemRowProps) => {
  const { colors, typography, radius, shadows } = useTheme();
  const isMobile = useIsMobile();
  const { product, quantity } = item;

  const unitPrice  = product.salePrice ?? product.price;
  const lineTotal  = (unitPrice * quantity).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, transition: { duration: 0.22 } }}
      layout
      style={{
        background:    colors.bgCard,
        borderRadius:  radius?.xl,
        padding:       isMobile ? "0.875rem" : "1.25rem",
        display:       "flex",
        gap:           isMobile ? "0.75rem" : "1.25rem",
        alignItems:    "center",
        border:        `1px solid ${colors.borderLight}`,
        boxShadow:     shadows?.sm,
      }}
    >
      {/* Product thumbnail */}
      <div
        style={{
          width:           isMobile ? 60 : 80,
          height:          isMobile ? 60 : 80,
          borderRadius:    radius?.lg,
          background:      product.image.startsWith("#") ? product.image : colors.bgTertiary,
          flexShrink:      0,
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          fontSize:        isMobile ? "1.5rem" : "1.75rem",
          overflow:        "hidden",
        }}
      >
        {(product.image.startsWith("http") || product.image.startsWith("/")) ? (
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          "✨"
        )}
      </div>

      {/* Product name + mobile controls */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <Link
          to={`/shop/${product.slug}`}
          style={{
            fontFamily:     typography.fontBody,
            fontSize:       isMobile ? typography.sm : typography.base,
            fontWeight:     typography.weightMedium,
            color:          colors.textPrimary,
            textDecoration: "none",
            display:        "block",
            whiteSpace:     "nowrap",
            overflow:       "hidden",
            textOverflow:   "ellipsis",
          }}
        >
          {product.name}
        </Link>

        <span
          className="price"
          style={{ fontSize: typography.sm, display: "block", marginTop: 3 }}
        >
          ${unitPrice.toFixed(2)}
        </span>

        {/* Mobile — qty stepper sits inline under the name */}
        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
            <div
              style={{
                display:      "flex",
                alignItems:   "center",
                border:       `1px solid ${colors.borderLight}`,
                borderRadius: radius?.full,
                overflow:     "hidden",
              }}
            >
              <QtyStepperButton size={30} onClick={() => onUpdate(product.id, quantity - 1)}>
                <Minus size={11} />
              </QtyStepperButton>
              <span style={{ width: 26, textAlign: "center", fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textPrimary }}>
                {quantity}
              </span>
              <QtyStepperButton size={30} onClick={() => onUpdate(product.id, quantity + 1)}>
                <Plus size={11} />
              </QtyStepperButton>
            </div>
            <span style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted }}>
              = ${lineTotal}
            </span>
          </div>
        )}
      </div>

      {/* Desktop — qty stepper in its own column */}
      {!isMobile && (
        <div
          style={{
            display:      "flex",
            alignItems:   "center",
            border:       `1px solid ${colors.borderLight}`,
            borderRadius: radius?.full,
            overflow:     "hidden",
          }}
        >
          <QtyStepperButton size={34} onClick={() => onUpdate(product.id, quantity - 1)}>
            <Minus size={12} />
          </QtyStepperButton>
          <span style={{ width: 30, textAlign: "center", fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textPrimary }}>
            {quantity}
          </span>
          <QtyStepperButton size={34} onClick={() => onUpdate(product.id, quantity + 1)}>
            <Plus size={12} />
          </QtyStepperButton>
        </div>
      )}

      {/* Desktop — line total */}
      {!isMobile && (
        <div
          style={{
            fontFamily:  typography.fontBody,
            fontSize:    typography.base,
            fontWeight:  typography.weightBold,
            color:       colors.textPrimary,
            minWidth:    56,
            textAlign:   "right",
          }}
        >
          ${lineTotal}
        </div>
      )}

      {/* Remove button */}
      <motion.button
        whileTap={{ scale: 0.88 }}
        onClick={() => onRemove(product.id)}
        style={{
          width:           28,
          height:          28,
          borderRadius:    radius?.full,
          background:      colors.bgSecondary,
          border:          "none",
          cursor:          "pointer",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          color:           colors.textMuted,
          flexShrink:      0,
        }}
      >
        <X size={13} />
      </motion.button>
    </motion.div>
  );
};

export default CartItemRow;
