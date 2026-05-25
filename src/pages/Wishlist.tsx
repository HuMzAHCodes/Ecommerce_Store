import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, X } from "lucide-react";
import { useTheme } from "../theme/ThemeContext";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../components/ui/Toast";

const Wishlist = () => {
  const theme = useTheme();
  const { colors, typography, radius, shadows, transitions } = theme;
  const { items, removeItem } = useWishlist();
  const { addItem, isInCart, openDrawer } = useCart();
  const toast = useToast();

  const handleAddToCart = (item: typeof items[0]) => {
    addItem(item);
    openDrawer();
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div style={{ background: colors.bgPrimary, minHeight:"100vh" }}>
      <div style={{ background: colors.bgSecondary, borderBottom:`1px solid ${colors.borderLight}`, padding:"2.5rem 1.5rem 2rem" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <h1 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle:"italic" }}>Wishlist</h1>
          <p style={{ fontFamily: typography.fontBody, color: colors.textMuted, fontSize: typography.sm, marginTop:4 }}>{items.length} saved items</p>
        </div>
      </div>

      <div style={{ maxWidth:1280, margin:"0 auto", padding:"2.5rem 1.5rem" }}>
        {items.length === 0 ? (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ textAlign:"center", padding:"5rem 0" }}>
            <Heart size={60} color={colors.borderMedium} style={{ margin:"0 auto 1rem" }} />
            <p style={{ fontFamily: typography.fontBody, fontSize: typography.lg, color: colors.textPrimary, marginBottom:"0.5rem" }}>Nothing saved yet</p>
            <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textMuted, marginBottom:"1.5rem" }}>Heart items you love while browsing.</p>
            <Link to="/shop">
              <motion.span whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                style={{ display:"inline-flex", alignItems:"center", gap:8, background: colors.accentPrimary, color: colors.textOnAccent, borderRadius: radius?.full, padding:"0.875rem 2rem", fontFamily: typography.fontBody, fontWeight: typography.weightMedium, cursor:"pointer" }}>
                Browse Shop
              </motion.span>
            </Link>
          </motion.div>
        ) : (
          <motion.div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))", gap:"1.25rem" }} initial="hidden" animate="visible" variants={{ visible:{ transition:{ staggerChildren:0.07 } } }}>
            <AnimatePresence>
              {items.map((item) => (
                <motion.div key={item.id} initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.9 }} transition={{ duration:0.25 }} layout>
                  <motion.div whileHover={{ y:-4 }} transition={{ duration:0.2 }}
                    style={{ background: colors.bgCard, borderRadius: radius?.xl, overflow:"hidden", border:`1px solid ${colors.borderLight}`, boxShadow: shadows?.sm }}>
                    <div style={{ height:180, background: item.image, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"3rem", position:"relative" }}>
                      ✨
                      <button onClick={() => { removeItem(item.id); toast.info("Removed from wishlist"); }}
                        style={{ position:"absolute", top:8, right:8, width:28, height:28, borderRadius: radius?.full, background: colors.bgCard, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow: shadows?.sm }}>
                        <X size={13} color={colors.textMuted} />
                      </button>
                    </div>
                    <div style={{ padding:"1rem" }}>
                      <Link to={`/shop/${item.slug}`} style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, color: colors.textPrimary, textDecoration:"none", display:"block", marginBottom:"0.375rem" }}>
                        {item.name}
                      </Link>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                        <span style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightBold, color: item.salePrice ? colors.accentPrimary : colors.textPrimary }}>
                          ${item.salePrice ?? item.price}
                        </span>
                        <motion.button whileTap={{ scale:0.9 }} onClick={() => handleAddToCart(item)}
                          style={{ display:"flex", alignItems:"center", gap:5, padding:"0.4rem 0.875rem", borderRadius: radius?.full, background: isInCart(item.id) ? colors.accentPrimary : colors.bgSecondary, border:"none", cursor:"pointer", fontFamily: typography.fontBody, fontSize: typography.xs, fontWeight: typography.weightMedium, color: isInCart(item.id) ? "#fff" : colors.textSecondary, transition:`all ${transitions?.fast}` }}>
                          <ShoppingBag size={13} /> {isInCart(item.id) ? "In Cart" : "Add"}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// Wishlist.tsx
// The saved items page. Renders a responsive product grid sourced from
// WishlistContext, with per-card remove and add-to-cart actions, animated
// enter/exit transitions, and a full empty state with a shop CTA.
//
// ── What it renders ───────────────────────────────────────────────────────────
//
//  Header bar    — bgSecondary strip with "Wishlist" heading + saved item count
//  Content area  — one of two states:
//    Empty state — Heart icon + message + "Browse Shop" CTA button → /shop
//    Grid state  — auto-fill CSS grid (minmax 220px) of wishlist item cards
//
// ── Contexts consumed ─────────────────────────────────────────────────────────
//
//  useWishlist()  — items[] (saved products), removeItem(id)
//  useCart()      — addItem(), isInCart(id), openDrawer()
//  useToast()     — success / info notifications
//
// ── handleAddToCart ───────────────────────────────────────────────────────────
//
//  Called when the "Add" / "In Cart" button is clicked on a card.
//  1. addItem(item) — adds the product to CartContext
//  2. openDrawer()  — slides the cart drawer open immediately so the user
//                     gets visual confirmation without navigating away
//  3. toast.success(`${item.name} added to cart!`) — reinforces the action
//  Note: clicking the button when isInCart is already true still fires
//  addItem (incrementing quantity) and reopens the drawer — intentional
//  behavior allowing quantity bumps directly from the wishlist.
//
// ── Wishlist item card structure ──────────────────────────────────────────────
//
//  Each card is a two-layer motion.div:
//    Outer — handles enter/exit (opacity + scale) and layout animation
//    Inner — handles whileHover y: -4 lift independently
//
//  Card layout:
//    ├─ Image area (180px, item.image as bg color, ✨ emoji placeholder)
//    │   └─ X remove button (absolute top-right)
//    │       onClick: removeItem(item.id) + toast.info("Removed from wishlist")
//    └─ Info area
//        ├─ Product name — Link to /shop/:slug
//        ├─ Price — accentPrimary if salePrice exists, textPrimary otherwise
//        │          displays salePrice ?? price (sale takes priority)
//        └─ Add to Cart button — switches appearance based on isInCart(item.id):
//             in cart  → accentPrimary bg, white text, "In Cart" label
//             not yet  → bgSecondary bg, textSecondary, "Add" label
//
// ── Animations ────────────────────────────────────────────────────────────────
//
//  Empty state wrapper:
//    initial opacity: 0 → animate opacity: 1 (simple fade on mount)
//
//  Grid wrapper (parent stagger):
//    variants.visible.transition.staggerChildren: 0.07 s
//    cascades the enter animation across cards on initial load
//
//  Each card (AnimatePresence child):
//    enter  — opacity: 0, scale: 0.95 → opacity: 1, scale: 1  (250 ms)
//    exit   — opacity: 0, scale: 0.9                           (250 ms)
//    layout — prop enables smooth grid reflow when a card is removed;
//             remaining cards slide into position rather than jumping
//
//  Hover — inner motion.div lifts y: -4 over 200 ms
//
//  AnimatePresence wraps the items.map() so removed cards animate out
//  before being unmounted from the DOM — without it, cards would
//  disappear instantly on removeItem().
//
// ── Empty state ───────────────────────────────────────────────────────────────
//
//  Shown when items.length === 0. Fades in on mount.
//  Heart icon (60px, borderMedium color) + two lines of copy +
//  a "Browse Shop" pill button linking to /shop.
//  This state will also appear immediately after the last item is removed,
//  since AnimatePresence exits the grid and the conditional re-evaluates.
//
// ── Dependencies ─────────────────────────────────────────────────────────────
//
//  react-router-dom  — Link (product name → /shop/:slug, empty CTA → /shop)
//  framer-motion     — motion.div, motion.span, motion.button, AnimatePresence
//  lucide-react      — Heart (empty state), ShoppingBag (add button), X (remove)
//  useTheme()        — colors, typography, radius, shadows, transitions tokens
//  useWishlist()     — items[], removeItem() from WishlistContext
//  useCart()         — addItem(), isInCart(), openDrawer() from CartContext
//  useToast()        — success / info toast notifications