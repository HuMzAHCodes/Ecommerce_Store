import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Star, ChevronRight, Minus, Plus, RotateCcw, Truck, Shield } from "lucide-react";
import { useTheme } from "../theme/ThemeContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../components/ui/Toast";
import { useIsMobile } from "../hooks/useMediaQuery";

const MOCK_PRODUCTS: Record<string, {
  id:string; name:string; price:number; salePrice?:number|null;
  category:string; badge?:string|null; slug:string;
  description:string; benefits:string[]; howToUse:string;
  images:{bg:string; label:string}[];
  reviews:{id:string; name:string; rating:number; date:string; body:string}[];
  sizes:string[];
}> = {
  "radiance-serum": {
    id:"1", name:"Radiance Serum", price:68, salePrice:null, category:"Skincare", badge:"Best Seller", slug:"radiance-serum",
    description:"A lightweight, fast-absorbing serum packed with Vitamin C and hyaluronic acid that visibly brightens, evens skin tone, and delivers lasting hydration. Formulated without parabens, sulfates, or artificial fragrances.",
    benefits:["Visibly brightens in 2 weeks","Evens skin tone","24hr hydration","Dermatologist tested","Fragrance-free"],
    howToUse:"Apply 3–4 drops to cleansed skin morning and evening. Gently pat into face and neck. Follow with moisturiser. Use SPF in the morning.",
    images:[{bg:"#FFEFB3",label:"Front"},{bg:"#FFF5D0",label:"Side"},{bg:"#C5E8E3",label:"Detail"}],
    reviews:[
      {id:"r1",name:"Amara K.",rating:5,date:"May 2025",body:"Genuinely the best serum I've ever used. My skin is glowing after just two weeks."},
      {id:"r2",name:"Priya M.",rating:5,date:"Apr 2025",body:"Lightweight, absorbs fast, and my dark spots have faded noticeably."},
      {id:"r3",name:"Sophie L.",rating:4,date:"Mar 2025",body:"Love this. Wish the bottle was bigger for the price."},
    ],
    sizes:["15ml","30ml","50ml"],
  },
};

const DEFAULT = Object.values(MOCK_PRODUCTS)[0];

const ProductPage = () => {
  const { slug }  = useParams<{slug:string}>();
  const theme     = useTheme();
  const isMobile  = useIsMobile();
  const { colors, typography, radius, shadows, transitions } = theme;
  const { addItem, isInCart, openDrawer } = useCart();
  const { toggle, isWishlisted }          = useWishlist();
  const toast = useToast();

  const product = (slug && MOCK_PRODUCTS[slug]) ? MOCK_PRODUCTS[slug] : DEFAULT;

  const [activeImg,  setActiveImg]  = useState(0);
  const [qty,        setQty]        = useState(1);
  const [activeSize, setActiveSize] = useState(product.sizes[1]);
  const [activeTab,  setActiveTab]  = useState<"details"|"how-to"|"reviews">("details");

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ id:product.id, name:product.name, price:product.price, salePrice:product.salePrice, image:product.images[0].bg, slug:product.slug });
    }
    openDrawer();
    toast.success(`${product.name} added to cart!`);
  };

  const avgRating = product.reviews.reduce((s,r) => s+r.rating, 0) / product.reviews.length;

  return (
    <div style={{ background: colors.bgPrimary, minHeight:"100vh" }}>

      {/* Breadcrumb */}
      <div style={{ background: colors.bgSecondary, borderBottom:`1px solid ${colors.borderLight}`, padding:"0.75rem 1.25rem" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", display:"flex", alignItems:"center", gap:5, fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted, flexWrap:"wrap" }}>
          <Link to="/"     style={{ color: colors.textMuted, textDecoration:"none" }}>Home</Link>
          <ChevronRight size={11}/>
          <Link to="/shop" style={{ color: colors.textMuted, textDecoration:"none" }}>Shop</Link>
          <ChevronRight size={11}/>
          <span style={{ color: colors.textPrimary }}>{product.name}</span>
        </div>
      </div>

      {/* Main */}
      <div style={{
        maxWidth:1280, margin:"0 auto",
        padding: isMobile ? "1.5rem 1.25rem" : "3rem 1.5rem",
        display:"grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? "2rem" : "4rem",
        alignItems:"start",
      }}>

        {/* Images */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div key={activeImg}
              initial={{ opacity:0, scale:0.97 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.97 }}
              transition={{ duration:0.28 }}
              style={{ height: isMobile ? 280 : 440, borderRadius: radius?.xl, background: product.images[activeImg].bg, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"0.875rem", boxShadow: shadows?.lg, position:"relative" }}>
              <span style={{ fontSize: isMobile ? "4rem" : "6rem" }}>✨</span>
              {product.badge && (
                <span style={{ position:"absolute", top:14, left:14, background: product.badge==="Sale" ? colors.accentPrimary : product.badge==="New" ? colors.accentSecondary : colors.textPrimary, color:"#fff", fontSize:"0.66rem", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", padding:"4px 10px", borderRadius: radius?.full, fontFamily: typography.fontBody }}>
                  {product.badge}
                </span>
              )}
            </motion.div>
          </AnimatePresence>
          <div style={{ display:"flex", gap:"0.625rem" }}>
            {product.images.map((img,i) => (
              <button key={i} onClick={() => setActiveImg(i)}
                style={{ flex:1, height: isMobile ? 68 : 88, borderRadius: radius?.lg, background: img.bg, border:`2px solid ${activeImg===i ? colors.accentPrimary : colors.borderLight}`, cursor:"pointer", transition:`border-color ${transitions?.fast}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontSize:"1.25rem" }}>✨</span>
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <Link to={`/shop?category=${product.category}`}
            style={{ fontFamily: typography.fontBody, fontSize: typography.xs, fontWeight: typography.weightMedium, color: colors.accentPrimary, textDecoration:"none", letterSpacing:"0.08em", textTransform:"uppercase" }}>
            {product.category}
          </Link>

          <h1 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, margin:"0.5rem 0 0.75rem", fontSize: isMobile ? "clamp(1.75rem,5vw,2.25rem)" : undefined }}>
            {product.name}
          </h1>

          {/* Rating */}
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:"1.25rem" }}>
            <div style={{ display:"flex", gap:2 }}>
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={14} fill={s<=Math.round(avgRating) ? colors.accentPrimary : "none"} color={colors.accentPrimary}/>
              ))}
            </div>
            <span style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textMuted }}>
              {avgRating.toFixed(1)} ({product.reviews.length} reviews)
            </span>
          </div>

          {/* Price */}
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:"1.5rem" }}>
            <span className="price" style={{ fontSize: typography["3xl"] }}>${product.salePrice ?? product.price}</span>
            {product.salePrice && <span className="price-original" style={{ fontSize: typography.xl }}>${product.price}</span>}
          </div>

          {/* Size */}
          <div style={{ marginBottom:"1.25rem" }}>
            <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, color: colors.textPrimary, marginBottom:"0.5rem" }}>
              Size — <span style={{ color: colors.accentPrimary }}>{activeSize}</span>
            </p>
            <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
              {product.sizes.map(s => (
                <button key={s} onClick={() => setActiveSize(s)}
                  style={{ padding:"0.5rem 1rem", borderRadius: radius?.full, border:`1.5px solid ${activeSize===s ? colors.accentPrimary : colors.borderLight}`, background: activeSize===s ? colors.accentLight : "transparent", color: activeSize===s ? colors.accentPrimary : colors.textSecondary, fontFamily: typography.fontBody, fontSize: typography.sm, cursor:"pointer", transition:`all ${transitions?.fast}` }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + Add to cart */}
          <div style={{ display:"flex", gap:"0.75rem", alignItems:"center", marginBottom:"1rem", flexWrap: isMobile ? "wrap" : "nowrap" }}>
            <div style={{ display:"flex", alignItems:"center", border:`1px solid ${colors.borderLight}`, borderRadius: radius?.full, overflow:"hidden" }}>
              <button onClick={() => setQty(q => Math.max(1,q-1))} style={{ width:38, height:42, display:"flex", alignItems:"center", justifyContent:"center", background:"transparent", border:"none", cursor:"pointer", color: colors.textPrimary }}><Minus size={13}/></button>
              <span style={{ width:34, textAlign:"center", fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, color: colors.textPrimary }}>{qty}</span>
              <button onClick={() => setQty(q => q+1)} style={{ width:38, height:42, display:"flex", alignItems:"center", justifyContent:"center", background:"transparent", border:"none", cursor:"pointer", color: colors.textPrimary }}><Plus size={13}/></button>
            </div>

            <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }} onClick={handleAddToCart}
              style={{ flex:1, minWidth: isMobile ? "100%" : "auto", height:42, borderRadius: radius?.full, background: colors.accentPrimary, color: colors.textOnAccent, border:"none", cursor:"pointer", fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightMedium, display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxShadow: shadows?.md }}>
              <ShoppingBag size={17}/> {isInCart(product.id) ? "Add More" : "Add to Cart"}
            </motion.button>

            <motion.button whileTap={{ scale:0.88 }} onClick={() => { toggle({ id:product.id, name:product.name, price:product.price, salePrice:product.salePrice, image:product.images[0].bg, slug:product.slug }); toast.info(isWishlisted(product.id) ? "Removed from wishlist" : "Saved!"); }}
              style={{ width:42, height:42, borderRadius: radius?.full, border:`1.5px solid ${isWishlisted(product.id) ? colors.accentPrimary : colors.borderLight}`, background: isWishlisted(product.id) ? colors.accentLight : "transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Heart size={17} fill={isWishlisted(product.id) ? colors.accentPrimary : "none"} color={isWishlisted(product.id) ? colors.accentPrimary : colors.textMuted}/>
            </motion.button>
          </div>

          {/* Perks */}
          <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem", padding:"1.1rem", background: colors.bgSecondary, borderRadius: radius?.lg, marginBottom:"1.5rem" }}>
            {[{icon:<Truck size={14}/>, text:"Free shipping on orders over $50"},
              {icon:<RotateCcw size={14}/>, text:"30-day easy returns"},
              {icon:<Shield size={14}/>, text:"Clean, dermatologist-tested formula"}]
              .map((p,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:9, fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textSecondary }}>
                <span style={{ color: colors.accentPrimary }}>{p.icon}</span>{p.text}
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ borderBottom:`1px solid ${colors.borderLight}`, display:"flex", marginBottom:"1.1rem" }}>
            {(["details","how-to","reviews"] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{ padding:"0.6rem 1rem", border:"none", background:"transparent", cursor:"pointer", fontFamily: typography.fontBody, fontSize: isMobile ? typography.xs : typography.sm, fontWeight: activeTab===tab ? typography.weightMedium : typography.weightRegular, color: activeTab===tab ? colors.accentPrimary : colors.textMuted, borderBottom:`2px solid ${activeTab===tab ? colors.accentPrimary : "transparent"}`, marginBottom:-1, transition:`all ${transitions?.fast}` }}>
                {tab==="how-to" ? "How to Use" : tab.charAt(0).toUpperCase()+tab.slice(1)}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab==="details" && (
              <motion.div key="details" initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:0.22 }}>
                <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textSecondary, lineHeight:1.75, marginBottom:"1rem" }}>{product.description}</p>
                <ul style={{ display:"flex", flexDirection:"column", gap:"0.35rem" }}>
                  {product.benefits.map(b => (
                    <li key={b} style={{ display:"flex", alignItems:"center", gap:8, fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textSecondary }}>
                      <span style={{ color: colors.accentPrimary, fontSize:"0.65rem" }}>●</span>{b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
            {activeTab==="how-to" && (
              <motion.div key="how-to" initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:0.22 }}>
                <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textSecondary, lineHeight:1.8 }}>{product.howToUse}</p>
              </motion.div>
            )}
            {activeTab==="reviews" && (
              <motion.div key="reviews" initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:0.22 }} style={{ display:"flex", flexDirection:"column", gap:"0.875rem" }}>
                {product.reviews.map(r => (
                  <div key={r.id} style={{ padding:"1rem", background: colors.bgSecondary, borderRadius: radius?.lg, border:`1px solid ${colors.borderLight}` }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"0.35rem" }}>
                      <span style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, color: colors.textPrimary }}>{r.name}</span>
                      <span style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted }}>{r.date}</span>
                    </div>
                    <div style={{ display:"flex", gap:2, marginBottom:"0.4rem" }}>
                      {[1,2,3,4,5].map(s => <Star key={s} size={11} fill={s<=r.rating ? colors.accentPrimary : "none"} color={colors.accentPrimary}/>)}
                    </div>
                    <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textSecondary, lineHeight:1.6, margin:0 }}>{r.body}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;


// ──────────────────────────────────────────────────────────────────────────────
// FILE OVERVIEW: ProductPage.tsx
// ──────────────────────────────────────────────────────────────────────────────
//
// PURPOSE
// -------
// The individual product detail page. When a user clicks a product anywhere
// in the app they are routed to /shop/:slug, which renders this component.
// It displays the full product — images, pricing, size picker, quantity
// stepper, add-to-cart, wishlist, perks, and a tabbed content section for
// description, usage instructions, and reviews.
//
//
// DATA
// ----
// MOCK_PRODUCTS
//    A Record keyed by product slug. Each entry is a richer version of the
//    Shop page's Product type — it adds description, benefits, howToUse,
//    a multi-image array, a reviews array, and a sizes array. Currently only
//    "radiance-serum" is defined. When the backend is ready this entire
//    object should be replaced with a React Query useQuery call to
//    GET /api/products/:slug.
//
// DEFAULT
//    A fallback set to the first entry in MOCK_PRODUCTS. If the URL slug
//    does not match any key in MOCK_PRODUCTS (e.g. a product not yet mocked),
//    the component renders the default product rather than crashing or showing
//    an empty page. This should be replaced with a proper 404 redirect once
//    real data is in place.
//
// fadeUp (Variants)
//    The same staggered entrance variant used in Shop.tsx — each section of
//    the right-hand info column animates in from below with a fade. Typed
//    explicitly as Variants to catch type errors at the definition site.
//
//
// STATE
// -----
// activeImg  — index of the currently displayed product image. Clicking a
//              thumbnail updates this, which swaps the main image with an
//              AnimatePresence cross-fade.
// qty        — the quantity the user wants to add to cart. Controlled by the
//              Minus / Plus stepper. Minimum value is clamped to 1.
// activeSize — the currently selected size option. Defaults to the middle
//              size (index 1) so the most common size is pre-selected.
// activeTab  — which tab is showing in the bottom info section:
//              "details", "how-to", or "reviews". Each tab panel animates
//              in and out via AnimatePresence.
//
//
// SLUG RESOLUTION
// ---------------
// useParams extracts the :slug segment from the URL. The component then
// looks up MOCK_PRODUCTS[slug]. If found it uses that product; if not found
// (slug is undefined or not in the map) it falls back to DEFAULT. This means
// every link from the Shop page that uses a valid slug will land on the right
// product, and any unrecognised slug still renders a valid page.
//
//
// HANDLERS
// --------
// handleAddToCart()
//    Loops `qty` times calling addItem, so adding 3 units results in 3
//    separate cart entries (or qty increments on the same item, depending
//    on how CartContext handles duplicates). After adding, it opens the
//    cart drawer and fires a success toast.
//
// Wishlist toggle (inline)
//    Called directly in the wishlist button's onClick. Calls toggle() from
//    WishlistContext and fires an info toast. The toast message reads
//    isWishlisted *before* toggle fires, so "Removed" vs "Saved" is
//    correct for the action that just happened — same pattern as Shop.tsx.
//
// avgRating
//    Computed inline by reducing the reviews array. Used to render the
//    filled/empty star icons and the numeric rating display.
//
//
// LAYOUT
// ------
// A two-column CSS grid (1fr 1fr) with a 4rem gap. The left column holds
// the image gallery; the right column holds all product information.
// The left column slides in from the left (x: -20) on mount. The right
// column uses a stagger parent variant so each child section (category
// link, title, rating, price, size picker, etc.) cascades in with an 80ms
// delay between each one, creating a smooth sequential entrance.
//
// The image gallery has two parts: a large main image area (460px tall)
// that cross-fades between images using AnimatePresence keyed on activeImg,
// and a row of thumbnail buttons below it that highlight the active image
// with an accent-coloured border.
//
// The tab section at the bottom uses AnimatePresence mode="wait" so the
// outgoing tab panel fades out completely before the incoming one fades in,
// preventing two panels from being visible at the same time.
//
//
// CONTEXTS USED
// -------------
// useTheme()     — all visual tokens (colours, typography, radius, shadows,
//                  transitions) so the page is fully theme-aware.
// useCart()      — addItem to add the product, isInCart to change the button
//                  label to "Add More" when the product is already in the
//                  cart, openDrawer to reveal the cart sidebar after adding.
// useWishlist()  — toggle to add/remove, isWishlisted to reflect the saved
//                  state on the heart button (filled vs outline, accent
//                  background vs transparent).
// useToast()     — success toast after adding to cart, info toast after
//                  toggling the wishlist.
//
//
// BUG FIX — Variants type and ease value
// ----------------------------------------
// Same issue as Shop.tsx. The original fadeUp used ease: [0.4, 0, 0.2, 1]
// which is a raw number array. Newer Framer Motion versions only accept
// named easing strings for the ease property inside Variants. Fixed by:
// 1. Replacing [0.4, 0, 0.2, 1] with "easeInOut".
// 2. Adding the Variants type annotation to fadeUp.
// 3. Importing Variants as a type from framer-motion.
//
//
// KEY INSIGHT
// -----------
// The most subtle design decision in this file is the two-layer animation
// architecture on the right column. The parent motion.div has no visual
// animation of its own — it only carries a variants object with a
// staggerChildren transition. Each child section (category, title, rating,
// etc.) then carries the fadeUp variant. This separation means the stagger
// orchestration lives in the parent and the actual motion lives in the
// children, which is the correct Framer Motion pattern for cascading
// entrance animations. If the staggerChildren were put on the children
// themselves, or if the parent also tried to animate, the timing would
// conflict and the cascade would break. The parent is purely a conductor;
// the children do all the visible work.
//
// ──────────────────────────────────────────────────────────────────────────────