import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";
import { useCart } from "../../context/CartContext";

const CartDrawer = () => {
  const theme    = useTheme();
  const { colors, typography, radius, shadows, transitions } = theme;
  const { items, isOpen, closeDrawer, removeItem, updateQty, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const shippingFee = totalPrice >= 50 ? 0 : 5.99;
  const toFreeShip  = Math.max(0, 50 - totalPrice);
  const freeShipPct = Math.min(100, (totalPrice / 50) * 100);

  const handleCheckout = () => { closeDrawer(); navigate("/checkout"); };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div key="overlay" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.25 }}
            onClick={closeDrawer}
            style={{ position:"fixed", inset:0, zIndex:200, background: colors.bgOverlay, backdropFilter:"blur(2px)" }} />

          <motion.div key="drawer" initial={{ x:"100%" }} animate={{ x:0 }} exit={{ x:"100%" }} transition={{ duration:0.35, ease:"easeInOut" }}
            style={{ position:"fixed", top:0, right:0, bottom:0, zIndex:201, width:"min(420px, 100vw)", background: colors.bgCard, display:"flex", flexDirection:"column", boxShadow: shadows?.xl }}>

            {/* Header */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1.25rem 1.5rem", borderBottom:`1px solid ${colors.borderLight}`, flexShrink:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <ShoppingBag size={20} color={colors.accentPrimary} />
                <span style={{ fontFamily: typography.fontDisplay, fontSize: typography.xl, color: colors.textPrimary }}>Your Cart</span>
                {totalItems > 0 && (
                  <span style={{ background: colors.accentPrimary, color:"#fff", borderRadius: radius?.full, padding:"1px 8px", fontFamily: typography.fontBody, fontSize: typography.xs, fontWeight: typography.weightBold }}>
                    {totalItems}
                  </span>
                )}
              </div>
              <motion.button whileTap={{ scale:0.9 }} onClick={closeDrawer}
                style={{ width:34, height:34, borderRadius: radius?.full, background: colors.bgSecondary, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color: colors.textSecondary }}>
                <X size={16} />
              </motion.button>
            </div>

            {/* Free shipping bar */}
            {totalItems > 0 && (
              <div style={{ padding:"0.875rem 1.5rem", background: colors.bgSecondary, borderBottom:`1px solid ${colors.borderLight}`, flexShrink:0 }}>
                <p style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: toFreeShip > 0 ? colors.textSecondary : colors.success, marginBottom:"0.5rem" }}>
                  {toFreeShip > 0 ? <>Add <strong style={{ color: colors.accentPrimary }}>${toFreeShip.toFixed(2)}</strong> more for free shipping!</> : "🎉 You've unlocked free shipping!"}
                </p>
                <div style={{ height:4, borderRadius: radius?.full, background: colors.borderLight, overflow:"hidden" }}>
                  <motion.div initial={{ width:0 }} animate={{ width:`${freeShipPct}%` }} transition={{ duration:0.5, ease:"easeOut" }}
                    style={{ height:"100%", background: colors.accentPrimary, borderRadius: radius?.full }} />
                </div>
              </div>
            )}

            {/* Items */}
            <div style={{ flex:1, overflowY:"auto", padding:"1rem 1.5rem" }}>
              {items.length === 0 ? (
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:"1rem" }}>
                  <ShoppingBag size={52} color={colors.borderMedium} />
                  <div style={{ textAlign:"center" }}>
                    <p style={{ fontFamily: typography.fontBody, fontSize: typography.base, color: colors.textPrimary, fontWeight: typography.weightMedium, marginBottom:4 }}>Your cart is empty</p>
                    <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textMuted }}>Add something beautiful ✨</p>
                  </div>
                  <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }} onClick={() => { closeDrawer(); navigate("/shop"); }}
                    style={{ padding:"0.7rem 1.75rem", borderRadius: radius?.full, background: colors.accentPrimary, color: colors.textOnAccent, border:"none", cursor:"pointer", fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium }}>
                    Browse Shop
                  </motion.button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map(({ product, quantity }) => (
                    <motion.div key={product.id} initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} exit={{ opacity:0, height:0, marginBottom:0 }} transition={{ duration:0.25 }}
                      style={{ marginBottom:"1rem", overflow:"hidden" }}>
                      <div style={{ display:"flex", gap:"0.875rem", alignItems:"center", padding:"0.875rem", background: colors.bgSecondary, borderRadius: radius?.lg, border:`1px solid ${colors.borderLight}` }}>
                        <Link to={`/shop/${product.slug}`} onClick={closeDrawer}
                          style={{ width:64, height:64, borderRadius: radius?.md, background: product.image, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.5rem", textDecoration:"none" }}>
                          ✨
                        </Link>
                        <div style={{ flex:1, minWidth:0 }}>
                          <Link to={`/shop/${product.slug}`} onClick={closeDrawer}
                            style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, color: colors.textPrimary, textDecoration:"none", display:"block", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                            {product.name}
                          </Link>
                          <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.accentPrimary, fontWeight: typography.weightBold, margin:"2px 0 6px" }}>
                            ${(product.salePrice ?? product.price).toFixed(2)}
                          </p>
                          <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                            <div style={{ display:"flex", alignItems:"center", border:`1px solid ${colors.borderLight}`, borderRadius: radius?.full, overflow:"hidden", background: colors.bgCard }}>
                              <button onClick={() => updateQty(product.id, quantity-1)} style={{ width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center", background:"transparent", border:"none", cursor:"pointer", color: colors.textPrimary }}><Minus size={11}/></button>
                              <span style={{ width:24, textAlign:"center", fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textPrimary }}>{quantity}</span>
                              <button onClick={() => updateQty(product.id, quantity+1)} style={{ width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center", background:"transparent", border:"none", cursor:"pointer", color: colors.textPrimary }}><Plus size={11}/></button>
                            </div>
                            <span style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted, marginLeft:4 }}>
                              = ${((product.salePrice ?? product.price) * quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <motion.button whileTap={{ scale:0.88 }} onClick={() => removeItem(product.id)}
                          style={{ flexShrink:0, width:28, height:28, borderRadius: radius?.full, background:"transparent", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color: colors.textMuted, transition:`color ${transitions?.fast}` }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = colors.error; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = colors.textMuted; }}>
                          <Trash2 size={14}/>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div style={{ borderTop:`1px solid ${colors.borderLight}`, padding:"1.25rem 1.5rem", flexShrink:0, background: colors.bgCard }}>
                {[["Subtotal", `$${totalPrice.toFixed(2)}`], ["Shipping", shippingFee===0 ? "Free 🎉" : `$${shippingFee.toFixed(2)}`]].map(([l,v]) => (
                  <div key={l} style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.5rem" }}>
                    <span style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textSecondary }}>{l}</span>
                    <span style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: l==="Shipping" && shippingFee===0 ? colors.success : colors.textPrimary }}>{v}</span>
                  </div>
                ))}
                <div style={{ display:"flex", flexDirection:"column", gap:"0.625rem", marginTop:"1rem" }}>
                  <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }} onClick={handleCheckout}
                    style={{ width:"100%", padding:"0.875rem", borderRadius: radius?.full, background: colors.accentPrimary, color: colors.textOnAccent, border:"none", cursor:"pointer", fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightMedium, display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxShadow: shadows?.md }}>
                    Checkout · ${(totalPrice + shippingFee).toFixed(2)} <ArrowRight size={16}/>
                  </motion.button>
                  <Link to="/cart" onClick={closeDrawer} style={{ display:"block", textAlign:"center", fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textMuted, textDecoration:"none", padding:"0.5rem" }}>
                    View full cart
                  </Link>
                </div>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CartDrawer;


// ── File Overview ─────────────────────────────────────────────────────────────
//
// CartDrawer.tsx
// A slide-in cart sidebar rendered via React Portal directly into document.body.
// Controlled by CartContext (isOpen). Four vertical sections: Header, Free
// shipping bar, Items list, Footer. Fully animated with Framer Motion.
//
// ── Why createPortal? ─────────────────────────────────────────────────────────
//
// createPortal renders this component outside the normal React tree —
// directly into document.body. This ensures the drawer and overlay always
// sit on top of everything else on the page (zIndex 200/201), regardless
// of where CartDrawer is imported in the component tree. Without a portal,
// parent CSS like overflow:hidden or a lower z-index could clip or hide it.
//
// ── Derived values (computed from cart state) ─────────────────────────────────
//
// shippingFee  → 0 if totalPrice >= $50, otherwise $5.99 flat fee
// toFreeShip   → how many more dollars until free shipping kicks in
//                Math.max(0, ...) ensures it never goes negative
// freeShipPct  → percentage of the $50 threshold reached (0–100)
//                Math.min(100, ...) caps it so the bar never overflows
//
// handleCheckout → closes the drawer then navigates to /checkout
//                  closing first prevents the drawer animating out
//                  on top of the checkout page
//
// ── Drawer sections (top → bottom) ───────────────────────────────────────────
//
// 1. OVERLAY
//    Full-screen fixed div behind the drawer (zIndex 200).
//    Clicking it calls closeDrawer — standard "click outside to close" pattern.
//    backdropFilter blur(2px) softens the page content behind it.
//    Animates: opacity 0 → 1 on open, 1 → 0 on close.
//
// 2. DRAWER PANEL (zIndex 201 — above overlay)
//    Fixed to top/right/bottom, width min(420px, 100vw) — full width on mobile.
//    Animates: x "100%" → 0 on open (slides in from right), 0 → "100%" on close.
//    flex column layout so header and footer are fixed height,
//    and the items list (flex:1) fills the remaining space and scrolls.
//
// 3. HEADER
//    Cart icon + "Your Cart" title + item count badge (only shown if totalItems > 0).
//    X button closes the drawer — whileTap scale:0.9 for tactile feedback.
//
// 4. FREE SHIPPING BAR (only shown if totalItems > 0)
//    Progress bar fills from 0 to 100% as totalPrice approaches $50.
//    Text switches from "Add $X more" to "You've unlocked free shipping!" at $50.
//    Bar animates width with motion.div (initial:0 → animate: freeShipPct%).
//
// 5. ITEMS LIST (flex:1, overflowY auto — scrollable)
//    Empty state: centered icon + message + "Browse Shop" button → /shop.
//    Filled state: AnimatePresence wraps each item so removals animate out
//    smoothly (height 0 + opacity 0 exit).
//
//    Each item row contains:
//    - Product image placeholder (links to /shop/[slug])
//    - Product name (truncated with textOverflow ellipsis) + price
//    - Qty stepper: Minus / count / Plus → calls updateQty(id, newQty)
//      updateQty with qty 0 removes the item (handled in CartContext)
//    - Row total = unit price × quantity
//    - Trash button → removeItem(id)
//      color changes to colors.error on hover via onMouseEnter/Leave
//      (inline style swap used because Tailwind classes aren't available here)
//
//    salePrice ?? price → shows sale price if available, otherwise regular price
//
// 6. FOOTER (only shown if items.length > 0)
//    Subtotal and Shipping rows rendered from a small array map.
//    Shipping shows "Free 🎉" in colors.success when threshold is met.
//    Checkout button: shows total including shipping, navigates via handleCheckout.
//    "View full cart" text link → /cart (for users who want the full cart page).
//
// ── Animation strategy ────────────────────────────────────────────────────────
//
// AnimatePresence at the top level handles mount/unmount of the entire drawer.
// All animations are INLINE — no named variant objects — so no tuple cast
// is needed for ease values (no variants TypeScript error in this file).
// AnimatePresence is also used inside the items list so individual item
// removals animate out (height collapse + fade) before being unmounted.
//
// ── Dependencies ─────────────────────────────────────────────────────────────
//
// react-dom        — createPortal (renders drawer into document.body)
// framer-motion    — motion.div, motion.button, AnimatePresence
// react-router-dom — Link (product links, view cart), useNavigate (checkout)
// lucide-react     — X, Minus, Plus, ShoppingBag, ArrowRight, Trash2
// useTheme()       — colors, typography, radius, shadows, transitions tokens
// useCart()        — items, isOpen, closeDrawer, removeItem, updateQty,
//                    totalItems, totalPrice