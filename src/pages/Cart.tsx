import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../components/ui/Toast";
import { useIsMobile } from "../hooks/useMediaQuery";

const PROMO_CODES: Record<string,number> = { BLUM10:10, WELCOME20:20 };

const Cart = () => {
  const theme    = useTheme();
  const isMobile = useIsMobile();
  const { colors, typography, radius, shadows } = theme;
  const { items, updateQty, removeItem, clearCart, totalItems, totalPrice } = useCart();
  const toast    = useToast();
  const navigate = useNavigate();

  const [promoCode,    setPromoCode]    = useState("");
  const [discount,     setDiscount]     = useState(0);
  const [promoError,   setPromoError]   = useState("");
  const [promoApplied, setPromoApplied] = useState("");

  const shipping    = totalPrice >= 50 ? 0 : 5.99;
  const discountAmt = (totalPrice * discount) / 100;
  const orderTotal  = totalPrice - discountAmt + shipping;

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (promoApplied) { setPromoError("A promo code is already applied."); return; }
    if (PROMO_CODES[code]) {
      setDiscount(PROMO_CODES[code]);
      setPromoApplied(code);
      setPromoError("");
      toast.success(`${PROMO_CODES[code]}% discount applied!`);
    } else {
      setPromoError("Invalid promo code.");
    }
  };

  if (items.length === 0) {
    return (
      <div style={{ minHeight:"70vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"1.25rem", padding:"3rem 1.5rem" }}>
        <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.4 }}>
          <ShoppingBag size={60} color={colors.borderMedium}/>
        </motion.div>
        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.1 }} style={{ textAlign:"center" }}>
          <h2 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle:"italic", marginBottom:"0.5rem" }}>Your cart is empty</h2>
          <p style={{ fontFamily: typography.fontBody, color: colors.textMuted, marginBottom:"1.5rem" }}>Looks like you haven't added anything yet.</p>
          <Link to="/shop">
            <motion.span whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
              style={{ display:"inline-flex", alignItems:"center", gap:8, background: colors.accentPrimary, color: colors.textOnAccent, borderRadius: radius?.full, padding:"0.875rem 2rem", fontFamily: typography.fontBody, fontWeight: typography.weightMedium, cursor:"pointer" }}>
              Start Shopping <ArrowRight size={15}/>
            </motion.span>
          </Link>
        </motion.div>
      </div>
    );
  }

  // Order summary block — reused in both layouts
  const OrderSummary = () => (
    <div style={{ background: colors.bgCard, borderRadius: radius?.xl, padding:"1.5rem", border:`1px solid ${colors.borderLight}`, boxShadow: shadows?.sm }}>
      <h2 style={{ fontFamily: typography.fontDisplay, fontSize: typography["2xl"], color: colors.textPrimary, marginBottom:"1.25rem" }}>Order Summary</h2>

      {[
        { label:"Subtotal",                        value:`$${totalPrice.toFixed(2)}` },
        { label:"Shipping",                        value: shipping===0 ? "Free 🎉" : `$${shipping.toFixed(2)}` },
        ...(discount>0 ? [{ label:`Discount (${promoApplied})`, value:`-$${discountAmt.toFixed(2)}` }] : []),
      ].map(({ label, value }) => (
        <div key={label} style={{ display:"flex", justifyContent:"space-between", fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textSecondary, marginBottom:"0.625rem" }}>
          <span>{label}</span>
          <span style={{ color: label.startsWith("Discount") ? colors.success : "inherit" }}>{value}</span>
        </div>
      ))}

      <div style={{ borderTop:`1px solid ${colors.borderLight}`, margin:"1rem 0", paddingTop:"1rem", display:"flex", justifyContent:"space-between" }}>
        <span style={{ fontFamily: typography.fontBody, fontWeight: typography.weightBold, color: colors.textPrimary }}>Total</span>
        <span style={{ fontFamily: typography.fontDisplay, fontSize: typography["2xl"], color: colors.textPrimary }}>${orderTotal.toFixed(2)}</span>
      </div>

      {!promoApplied && (
        <div style={{ marginBottom:"1.1rem" }}>
          <div style={{ display:"flex", gap:"0.5rem" }}>
            <div style={{ flex:1, position:"relative" }}>
              <Tag size={13} style={{ position:"absolute", left:9, top:"50%", transform:"translateY(-50%)", color: colors.textMuted, pointerEvents:"none" }}/>
              <input value={promoCode} onChange={e => { setPromoCode(e.target.value); setPromoError(""); }}
                placeholder="Promo code" onKeyDown={e => e.key==="Enter" && applyPromo()}
                style={{ width:"100%", paddingLeft:28, paddingRight:10, paddingTop:"0.55rem", paddingBottom:"0.55rem", border:`1px solid ${promoError ? colors.error : colors.borderLight}`, borderRadius: radius?.md, fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textPrimary, background: colors.bgPrimary, outline:"none" }}/>
            </div>
            <button onClick={applyPromo}
              style={{ padding:"0 0.875rem", background: colors.textPrimary, color: colors.textOnDark, borderRadius: radius?.md, border:"none", cursor:"pointer", fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, whiteSpace:"nowrap" }}>
              Apply
            </button>
          </div>
          {promoError && <p style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.error, marginTop:4 }}>{promoError}</p>}
          <p style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted, marginTop:4 }}>Try: BLUM10 or WELCOME20</p>
        </div>
      )}

      <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }} onClick={() => navigate("/checkout")}
        style={{ width:"100%", padding:"0.875rem", borderRadius: radius?.full, background: colors.accentPrimary, color: colors.textOnAccent, border:"none", cursor:"pointer", fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightMedium, display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxShadow: shadows?.md }}>
        Proceed to Checkout <ArrowRight size={16}/>
      </motion.button>

      <Link to="/shop" style={{ display:"block", textAlign:"center", marginTop:"0.75rem", fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textMuted, textDecoration:"none" }}>
        ← Continue Shopping
      </Link>

      {totalPrice < 50 && (
        <p style={{ textAlign:"center", fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.accentPrimary, marginTop:"0.875rem", background: colors.accentLight, padding:"0.5rem", borderRadius: radius?.md }}>
          Add ${(50-totalPrice).toFixed(2)} more for free shipping!
        </p>
      )}
    </div>
  );

  return (
    <div style={{ background: colors.bgPrimary, minHeight:"100vh" }}>
      <div style={{ background: colors.bgSecondary, borderBottom:`1px solid ${colors.borderLight}`, padding: isMobile ? "1.75rem 1.25rem 1.5rem" : "2.5rem 1.5rem 2rem" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <h1 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle:"italic" }}>
            Your Cart{" "}
            <span style={{ fontFamily: typography.fontBody, fontSize: typography.lg, fontStyle:"normal", fontWeight: typography.weightRegular, color: colors.textMuted }}>
              ({totalItems} items)
            </span>
          </h1>
        </div>
      </div>

      <div style={{
        maxWidth:1280, margin:"0 auto",
        padding: isMobile ? "1.25rem" : "2.5rem 1.5rem",
        display:"grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 360px",
        gap: isMobile ? "1.5rem" : "2.5rem",
        alignItems:"start",
      }}>

        {/* Items */}
        <div>
          <motion.div style={{ display:"flex", flexDirection:"column", gap:"0.875rem" }}
            initial="hidden" animate="visible" variants={{ visible:{ transition:{ staggerChildren:0.06 } } }}>
            <AnimatePresence>
              {items.map(({ product, quantity }) => (
                <motion.div key={product.id}
                  initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, x:-20, transition:{ duration:0.22 } }}
                  layout
                  style={{ background: colors.bgCard, borderRadius: radius?.xl, padding: isMobile ? "0.875rem" : "1.25rem", display:"flex", gap: isMobile ? "0.75rem" : "1.25rem", alignItems:"center", border:`1px solid ${colors.borderLight}`, boxShadow: shadows?.sm }}>

                  <div style={{ width: isMobile ? 60 : 80, height: isMobile ? 60 : 80, borderRadius: radius?.lg, background: product.image, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize: isMobile ? "1.5rem" : "1.75rem" }}>✨</div>

                  <div style={{ flex:1, minWidth:0 }}>
                    <Link to={`/shop/${product.slug}`} style={{ fontFamily: typography.fontBody, fontSize: isMobile ? typography.sm : typography.base, fontWeight: typography.weightMedium, color: colors.textPrimary, textDecoration:"none", display:"block", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                      {product.name}
                    </Link>
                    <span className="price" style={{ fontSize: typography.sm, display:"block", marginTop:3 }}>${(product.salePrice ?? product.price).toFixed(2)}</span>

                    {/* Mobile: qty inline under name */}
                    {isMobile && (
                      <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:8 }}>
                        <div style={{ display:"flex", alignItems:"center", border:`1px solid ${colors.borderLight}`, borderRadius: radius?.full, overflow:"hidden" }}>
                          <button onClick={() => updateQty(product.id,quantity-1)} style={{ width:30,height:32,display:"flex",alignItems:"center",justifyContent:"center",background:"transparent",border:"none",cursor:"pointer",color:colors.textPrimary }}><Minus size={11}/></button>
                          <span style={{ width:26,textAlign:"center",fontFamily:typography.fontBody,fontSize:typography.xs,color:colors.textPrimary }}>{quantity}</span>
                          <button onClick={() => updateQty(product.id,quantity+1)} style={{ width:30,height:32,display:"flex",alignItems:"center",justifyContent:"center",background:"transparent",border:"none",cursor:"pointer",color:colors.textPrimary }}><Plus size={11}/></button>
                        </div>
                        <span style={{ fontFamily:typography.fontBody,fontSize:typography.xs,color:colors.textMuted }}>= ${((product.salePrice??product.price)*quantity).toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  {/* Desktop: qty stepper */}
                  {!isMobile && (
                    <div style={{ display:"flex", alignItems:"center", border:`1px solid ${colors.borderLight}`, borderRadius: radius?.full, overflow:"hidden" }}>
                      <button onClick={() => updateQty(product.id,quantity-1)} style={{ width:34,height:36,display:"flex",alignItems:"center",justifyContent:"center",background:"transparent",border:"none",cursor:"pointer",color:colors.textPrimary }}><Minus size={12}/></button>
                      <span style={{ width:30,textAlign:"center",fontFamily:typography.fontBody,fontSize:typography.sm,color:colors.textPrimary }}>{quantity}</span>
                      <button onClick={() => updateQty(product.id,quantity+1)} style={{ width:34,height:36,display:"flex",alignItems:"center",justifyContent:"center",background:"transparent",border:"none",cursor:"pointer",color:colors.textPrimary }}><Plus size={12}/></button>
                    </div>
                  )}

                  {!isMobile && (
                    <div style={{ fontFamily:typography.fontBody,fontSize:typography.base,fontWeight:typography.weightBold,color:colors.textPrimary,minWidth:56,textAlign:"right" }}>
                      ${((product.salePrice??product.price)*quantity).toFixed(2)}
                    </div>
                  )}

                  <motion.button whileTap={{ scale:0.88 }} onClick={() => { removeItem(product.id); toast.info("Item removed"); }}
                    style={{ width:28,height:28,borderRadius:radius?.full,background:colors.bgSecondary,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:colors.textMuted,flexShrink:0 }}>
                    <X size={13}/>
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div style={{ marginTop:"1rem", display:"flex", justifyContent:"flex-end" }}>
            <button onClick={() => { clearCart(); toast.info("Cart cleared"); }}
              style={{ fontFamily:typography.fontBody,fontSize:typography.sm,color:colors.textMuted,background:"none",border:"none",cursor:"pointer",textDecoration:"underline" }}>
              Clear cart
            </button>
          </div>

          {/* Mobile: order summary below items */}
          {isMobile && <div style={{ marginTop:"1.25rem" }}><OrderSummary/></div>}
        </div>

        {/* Desktop: sticky sidebar */}
        {!isMobile && (
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.45, delay:0.15 }}
            style={{ position:"sticky", top:84 }}>
            <OrderSummary/>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cart;


// ──────────────────────────────────────────────────────────────────────────────
// FILE OVERVIEW: Cart.tsx
// ──────────────────────────────────────────────────────────────────────────────
//
// PURPOSE
// -------
// The cart page (/cart). It shows every item the user has added, lets them
// adjust quantities and remove items, apply a promo code for a percentage
// discount, and see a live-updating order summary before proceeding to
// checkout. It also handles the empty-cart state with a dedicated screen.
//
//
// DATA
// ----
// PROMO_CODES
//    A hardcoded map of valid promo code strings to their percentage discount
//    values. BLUM10 gives 10% off and WELCOME20 gives 20% off. When a real
//    backend exists, validation should move to an API call so codes are not
//    exposed in the client bundle.
//
// fadeUp (Variants)
//    The entrance animation variant for each cart item row — fades in while
//    rising 16px. Typed as Variants and uses "easeInOut" for the ease value
//    (see bug fix note below).
//
//
// STATE
// -----
// promoCode    — the current value of the promo code input field.
// discount     — the percentage discount to apply, set when a valid promo
//                code is successfully applied. Starts at 0.
// promoError   — an error message string shown below the promo input when
//                the code is invalid or a code is already applied.
// promoApplied — the successfully applied promo code string. When this is
//                set, the promo input section is hidden entirely and the
//                discount line appears in the order summary.
//
//
// DERIVED VALUES
// --------------
// shipping     — $0 if totalPrice is $50 or above (free shipping threshold),
//                otherwise $5.99. Recomputes automatically as items change.
// discountAmt  — the dollar value of the discount: (totalPrice × discount) / 100.
// orderTotal   — the final amount: totalPrice − discountAmt + shipping.
// All three are plain variable calculations, not state, so they always stay
// in sync with the cart and promo state without any extra effects.
//
//
// EMPTY STATE
// -----------
// If the cart has no items, the component returns early with a centred
// empty-state screen — a large ShoppingBag icon, a short message, and a
// "Start Shopping" button linking back to /shop. Both the icon and the text
// block animate in independently with a slight delay between them for a
// polished feel. This early return means none of the cart page JSX renders
// when the cart is empty, keeping the two states fully separate.
//
//
// CART ITEMS LIST
// ---------------
// Rendered inside a stagger parent so each row cascades in with a 70ms
// delay. Each row shows:
// - A coloured placeholder image (the product's bg colour from the store).
// - The product name as a link back to its product page (/shop/:slug).
// - The effective price (salePrice if available, otherwise price).
// - A quantity stepper (Minus / Plus buttons calling updateQty from CartContext).
// - The line total: effective price × quantity.
// - A remove button that calls removeItem and fires an info toast.
//
// AnimatePresence wraps the list so that when an item is removed it slides
// out to the left (x: -20) before disappearing, rather than vanishing
// instantly. The `layout` prop on each row tells Framer Motion to smoothly
// reflow the remaining rows after a removal instead of snapping.
//
//
// PROMO CODE FLOW
// ---------------
// applyPromo()
//    1. Trims and uppercases the input so "blum10" and " BLUM10 " both work.
//    2. Guards against applying a second code if one is already active.
//    3. Looks the code up in PROMO_CODES. If found, sets discount and
//       promoApplied, clears any error, and fires a success toast.
//    4. If not found, sets promoError which renders in red below the input.
// The input also listens for the Enter key, calling applyPromo on submit
// so the user does not have to click the Apply button.
// Once a code is successfully applied, the entire promo input block is hidden
// via {!promoApplied && ...} and the discount line appears in the summary.
//
//
// ORDER SUMMARY PANEL
// -------------------
// A sticky 360px column on the right that stays in view as the user scrolls
// through a long cart. It shows:
// - Subtotal, shipping, and (if applied) the discount line — all dynamically
//   rendered from a mapped array so adding new line types only requires
//   adding one entry to the array.
// - A divider then the grand total.
// - The promo code input (hidden after a code is applied).
// - The "Proceed to Checkout" button navigating to /checkout.
// - A "Continue Shopping" link back to /shop.
// - A free-shipping nudge showing how many dollars away the user is from
//   the $50 threshold — hidden once the threshold is met.
//
//
// CONTEXTS USED
// -------------
// useTheme()  — all visual tokens for consistent theming across light and
//               dark modes without hardcoded values.
// useCart()   — items, updateQty, removeItem, clearCart, totalItems,
//               totalPrice. All cart mutations and reads go through here.
// useToast()  — feedback toasts for remove, clear, and promo events.
//
//
// BUG FIX — Variants type and ease value
// ----------------------------------------
// Same issue as Shop.tsx and ProductPage.tsx. The original fadeUp used
// ease: [0.4, 0, 0.2, 1] which newer Framer Motion versions reject in
// Variants objects. Fixed by replacing it with "easeInOut" and explicitly
// annotating the object as Variants, with Variants imported as a type
// from framer-motion.
//
//
// KEY INSIGHT
// -----------
// The order summary values (shipping, discountAmt, orderTotal) are plain
// derived variables, not useState. This is the correct choice — they are
// pure calculations from existing state (totalPrice, discount) and
// recompute for free on every render. Using useState for them would require
// useEffect calls to keep them in sync, adding complexity and creating
// potential stale-value bugs. Any time a value can be computed directly
// from existing state in a single expression, it should be a variable, not
// its own piece of state. The same principle applies to the shipping
// threshold check: rather than storing a boolean isFreeShipping in state
// and toggling it, shipping is simply recalculated inline every render,
// which is always correct and requires zero maintenance.
//
// ──────────────────────────────────────────────────────────────────────────────