import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../theme/ThemeContext";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../components/ui/Toast";
import { useIsMobile } from "../../hooks/useMediaQuery";
import usePromo from "../Cart/usePromo";
import useOrderTotals from "../Cart/useOrderTotals";
import CartEmpty from "../Cart/CartEmpty";
import CartItemRow from "../Cart/CartItemRow";
import CartOrderSummary from "../Cart/CartOrderSummary";

/**
 * Cart page — intentionally thin orchestrator.
 *
 *  usePromo          → promo code input, validation, discount state
 *  useOrderTotals    → derives shipping, discount amount, and order total
 *  CartEmpty         → shown when no items in cart
 *  CartItemRow       → single item row (mobile + desktop layouts)
 *  CartOrderSummary  → order totals, promo input, checkout CTA
 */
const Cart = () => {
  const { colors, typography, radius } = useTheme();
  const isMobile = useIsMobile();
  const { items, updateQty, removeItem, clearCart, totalItems, totalPrice } = useCart();
  const toast = useToast();

  const promo  = usePromo();
  const totals = useOrderTotals(totalPrice, promo.discountPct);

  // Show empty state when cart has no items
  if (items.length === 0) return <CartEmpty />;

  const handleRemove = (productId: string) => {
    removeItem(productId);
    toast.info("Item removed");
  };

  const handleClearCart = () => {
    clearCart();
    toast.info("Cart cleared");
  };

  return (
    <div style={{ background: colors.bgPrimary, minHeight: "100vh" }}>

      {/* Page header */}
      <div
        style={{
          background:    colors.bgSecondary,
          borderBottom:  `1px solid ${colors.borderLight}`,
          padding:       isMobile ? "1.75rem 1.25rem 1.5rem" : "2.5rem 1.5rem 2rem",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h1 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle: "italic" }}>
            Your Cart{" "}
            <span
              style={{
                fontFamily: typography.fontBody,
                fontSize:   typography.lg,
                fontStyle:  "normal",
                fontWeight: typography.weightRegular,
                color:      colors.textMuted,
              }}
            >
              ({totalItems} items)
            </span>
          </h1>
        </div>
      </div>

      {/* Main content — two-column on desktop, stacked on mobile */}
      <div
        style={{
          maxWidth:             1280,
          margin:               "0 auto",
          padding:              isMobile ? "1.25rem" : "2.5rem 1.5rem",
          display:              "grid",
          gridTemplateColumns:  isMobile ? "1fr" : "1fr 360px",
          gap:                  isMobile ? "1.5rem" : "2.5rem",
          alignItems:           "start",
        }}
      >
        {/* Left — item list */}
        <div>
          <motion.div
            style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          >
            <AnimatePresence>
              {items.map((item) => (
                <CartItemRow
                  key={item.product.id}
                  item={item}
                  onUpdate={updateQty}
                  onRemove={handleRemove}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Clear cart */}
          <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={handleClearCart}
              style={{
                fontFamily:     typography.fontBody,
                fontSize:       typography.sm,
                color:          colors.textMuted,
                background:     "none",
                border:         "none",
                cursor:         "pointer",
                textDecoration: "underline",
              }}
            >
              Clear cart
            </button>
          </div>

          {/* Mobile — order summary renders below the item list */}
          {isMobile && (
            <div style={{ marginTop: "1.25rem" }}>
              <CartOrderSummary
                totals={totals}
                appliedCode={promo.appliedCode}
                promoInput={promo.inputValue}
                promoError={promo.errorMessage}
                onPromoChange={promo.setInputValue}
                onPromoApply={promo.applyPromo}
              />
            </div>
          )}
        </div>

        {/* Desktop — sticky sidebar */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            style={{ position: "sticky", top: 84 }}
          >
            <CartOrderSummary
              totals={totals}
              appliedCode={promo.appliedCode}
              promoInput={promo.inputValue}
              promoError={promo.errorMessage}
              onPromoChange={promo.setInputValue}
              onPromoApply={promo.applyPromo}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cart;
