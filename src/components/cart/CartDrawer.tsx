import { createPortal }             from "react-dom";
import { motion, AnimatePresence }  from "framer-motion";
import { useTheme }                 from "../../theme/ThemeContext";
import useCartDrawer                from "./useCartDrawer";
import CartDrawerHeader             from "./CartDrawerHeader";
import CartDrawerFreeShippingBar    from "./CartDrawerFreeShippingBar";
import CartDrawerItem               from "./CartDrawerItem";
import CartDrawerEmpty              from "./CartDrawerEmpty";
import CartDrawerFooter             from "./CartDrawerFooter";
import { overlayStyles, drawerShellStyles, itemsScrollAreaStyles } from "./cartDrawerStyles";

// ── Component ─────────────────────────────────────────────────

const CartDrawer = () => {
  const { colors, shadows } = useTheme();
  const {
    items, isOpen, closeDrawer,
    removeItem, updateQty,
    totalItems, totalPrice,
    shippingFee, amountRemainingForFree,
    freeShippingProgress, orderTotal,
    hasItems, handleCheckout, handleBrowseShop,
  } = useCartDrawer();

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeDrawer}
            style={overlayStyles(colors)}
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={drawerShellStyles(colors, shadows)}
          >
            <CartDrawerHeader totalItems={totalItems} onClose={closeDrawer} />

            {hasItems && (
              <CartDrawerFreeShippingBar
                amountRemainingForFree={amountRemainingForFree}
                freeShippingProgress={freeShippingProgress}
              />
            )}

            <div style={itemsScrollAreaStyles}>
              {!hasItems
                ? <CartDrawerEmpty onBrowseShop={handleBrowseShop} />
                : (
                  <AnimatePresence>
                    {items.map(({ product, quantity }) => (
                      <CartDrawerItem
                        key={product.id}
                        product={product}
                        quantity={quantity}
                        onRemove={removeItem}
                        onUpdateQty={updateQty}
                        onLinkClick={closeDrawer}
                      />
                    ))}
                  </AnimatePresence>
                )
              }
            </div>

            {hasItems && (
              <CartDrawerFooter
                totalPrice={totalPrice}
                shippingFee={shippingFee}
                orderTotal={orderTotal}
                onCheckout={handleCheckout}
                onCloseDrawer={closeDrawer}
              />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CartDrawer;

/*
 * ── CartDrawer — What this folder does ──────────────────────────────────────
 *
 * A slide-in drawer (portal-rendered over the page) showing the user's cart.
 *
 * Sections:
 *   Header              — cart title, item-count badge, close button
 *   FreeShippingBar     — animated progress bar; hidden when cart is empty
 *   Items scroll area   — animated list of CartDrawerItem rows, or CartDrawerEmpty
 *   Footer              — subtotal/shipping summary + checkout button + "View full cart" link
 *
 * Logic (useCartDrawer.ts):
 *   - Pulls cart state from CartContext
 *   - Derives shippingFee (free above $50), amountRemainingForFree, freeShippingProgress, orderTotal
 *   - Provides handleCheckout (close + navigate /checkout) and handleBrowseShop (close + navigate /shop)
 *
 * Styles (cartDrawerStyles.ts):
 *   - Every inline-style object lives here as a typed factory function
 *   - Receives only the theme slices it needs (colors / typography / radius / shadows)
 *   - CartDrawer.tsx and sub-components stay pure JSX with zero raw style objects
 *
 * Files in this folder:
 *   useCartDrawer.ts              — all cart logic & derived values
 *   cartDrawerStyles.ts           — all CSSProperties factories
 *   CartDrawerHeader.tsx          — top bar (title, badge, close)
 *   CartDrawerFreeShippingBar.tsx — shipping progress bar
 *   CartDrawerItem.tsx            — single item row (image, name, qty, remove)
 *   CartDrawerEmpty.tsx           — empty-cart illustration + browse CTA
 *   CartDrawerFooter.tsx          — order summary + checkout button
 *   CartDrawer.tsx                — thin orchestrator; renders portal + assembles sections
 */