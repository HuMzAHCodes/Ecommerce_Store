import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Search, SlidersHorizontal, Heart, ShoppingBag, ChevronDown } from "lucide-react";
import { useTheme } from "../theme/ThemeContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../components/ui/Toast";
import useDebounce from "../hooks/useDebounce";

// ── Mock Data ─────────────────────────────────────────────────

interface Product {
  id: string; name: string; price: number; salePrice?: number | null;
  category: string; badge?: string | null; bg: string; slug: string;
  tags: string[]; rating: number; reviews: number;
}

const ALL_PRODUCTS: Product[] = [
  { id:"1",  name:"Radiance Serum",        price:68,  salePrice:null, category:"Skincare", badge:"Best Seller", bg:"#F5DDD0", slug:"radiance-serum",        tags:["serum","glow"],        rating:4.9, reviews:312 },
  { id:"2",  name:"Glow Face Mist",        price:42,  salePrice:35,   category:"Skincare", badge:"Sale",        bg:"#D0E8F5", slug:"glow-face-mist",         tags:["mist","hydration"],    rating:4.7, reviews:198 },
  { id:"3",  name:"Velvet Body Butter",    price:55,  salePrice:null, category:"Wellness", badge:"New",         bg:"#D5EDD5", slug:"velvet-body-butter",     tags:["body","moisturizer"],  rating:4.8, reviews:145 },
  { id:"4",  name:"Rose Toner",            price:38,  salePrice:null, category:"Skincare", badge:null,          bg:"#F5D0E8", slug:"rose-toner",             tags:["toner","rose"],        rating:4.6, reviews:89  },
  { id:"5",  name:"Cloud Cream SPF 30",    price:72,  salePrice:null, category:"Skincare", badge:"New",         bg:"#EDE0F5", slug:"cloud-cream-spf",        tags:["spf","moisturizer"],   rating:4.9, reviews:267 },
  { id:"6",  name:"Lip Treatment Set",     price:34,  salePrice:28,   category:"Beauty",   badge:"Sale",        bg:"#F5EDD0", slug:"lip-treatment-set",      tags:["lips","set"],          rating:4.5, reviews:73  },
  { id:"7",  name:"Deep Clean Mask",       price:48,  salePrice:null, category:"Skincare", badge:null,          bg:"#D0F5E8", slug:"deep-clean-mask",        tags:["mask","cleansing"],    rating:4.7, reviews:156 },
  { id:"8",  name:"Vitamin C Booster",     price:85,  salePrice:null, category:"Skincare", badge:"Best Seller", bg:"#F5F0D0", slug:"vitamin-c-booster",      tags:["vitamin-c","serum"],   rating:4.8, reviews:421 },
  { id:"9",  name:"Overnight Recovery",    price:92,  salePrice:75,   category:"Skincare", badge:"Sale",        bg:"#E8D0F5", slug:"overnight-recovery",     tags:["night","repair"],      rating:4.9, reviews:203 },
  { id:"10", name:"Calming Eye Cream",     price:58,  salePrice:null, category:"Beauty",   badge:"New",         bg:"#D0EAF5", slug:"calming-eye-cream",      tags:["eyes","sensitive"],    rating:4.6, reviews:88  },
  { id:"11", name:"Hydra Boost Essence",   price:65,  salePrice:null, category:"Skincare", badge:null,          bg:"#F5D8D0", slug:"hydra-boost-essence",    tags:["essence","hydration"], rating:4.7, reviews:134 },
  { id:"12", name:"Wellness Bundle",       price:120, salePrice:99,   category:"Wellness", badge:"Sale",        bg:"#D0F5D0", slug:"wellness-bundle",        tags:["bundle","set"],        rating:4.9, reviews:67  },
];

const CATEGORIES = ["All", "Skincare", "Beauty", "Wellness"];
const SORT_OPTIONS = [
  { label: "Featured",        value: "featured"  },
  { label: "Price: Low–High", value: "price-asc" },
  { label: "Price: High–Low", value: "price-desc"},
  { label: "Best Rated",      value: "rating"    },
  { label: "Most Reviewed",   value: "reviews"   },
];

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeInOut" } },
};
const stagger: Variants = { visible: { transition: { staggerChildren: 0.06 } } };

// ── Shop Page ─────────────────────────────────────────────────

const Shop = () => {
  const theme = useTheme();
  const { colors, typography, radius, shadows, transitions } = theme;
  const { addItem, isInCart, openDrawer } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search,      setSearch]      = useState(searchParams.get("search") ?? "");
  const [category,    setCategory]    = useState(searchParams.get("filter") === "sale" ? "All" : (searchParams.get("category") ?? "All"));
  const [sort,        setSort]        = useState("featured");
  const [priceMax,    setPriceMax]    = useState(200);
  const [saleOnly,    setSaleOnly]    = useState(searchParams.get("filter") === "sale");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 350);

  // ── Filter + sort ─────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...ALL_PRODUCTS];

    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q))
      );
    }
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (saleOnly)           list = list.filter((p) => p.salePrice != null);
    list = list.filter((p) => (p.salePrice ?? p.price) <= priceMax);

    switch (sort) {
      case "price-asc":  list.sort((a,b) => (a.salePrice??a.price) - (b.salePrice??b.price)); break;
      case "price-desc": list.sort((a,b) => (b.salePrice??b.price) - (a.salePrice??a.price)); break;
      case "rating":     list.sort((a,b) => b.rating  - a.rating);  break;
      case "reviews":    list.sort((a,b) => b.reviews - a.reviews); break;
    }
    return list;
  }, [debouncedSearch, category, sort, priceMax, saleOnly]);

  const handleAddToCart = (p: Product) => {
    addItem({ id: p.id, name: p.name, price: p.price, salePrice: p.salePrice, image: p.bg, slug: p.slug });
    openDrawer();
    toast.success(`${p.name} added to cart!`);
  };

  const handleWishlist = (p: Product) => {
    toggle({ id: p.id, name: p.name, price: p.price, salePrice: p.salePrice, image: p.bg, slug: p.slug });
    toast.info(isWishlisted(p.id) ? "Removed from wishlist" : `${p.name} saved!`);
  };

  // ── Shared styles ─────────────────────────────────────────
  const filterLabel: React.CSSProperties = {
    fontFamily: typography.fontBody, fontSize: typography.xs,
    fontWeight: typography.weightBold, color: colors.textPrimary,
    letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.625rem", display: "block",
  };

  return (
    <div style={{ background: colors.bgPrimary, minHeight: "100vh" }}>

      {/* ── Header ────────────────────────────────────────── */}
      <div style={{ background: colors.bgSecondary, borderBottom: `1px solid ${colors.borderLight}`, padding: "3rem 1.5rem 2rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.h1 initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
            style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle:"italic", marginBottom:"0.5rem" }}>
            Shop All
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5, delay:0.1 }}
            style={{ fontFamily: typography.fontBody, color: colors.textMuted, fontSize: typography.base }}>
            {filtered.length} products
          </motion.p>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "2rem 1.5rem", display: "grid", gridTemplateColumns: "260px 1fr", gap: "2.5rem", alignItems: "start" }}>

        {/* ── Sidebar Filters (desktop) ──────────────────── */}
        <aside style={{ position: "sticky", top: 84, background: colors.bgCard, borderRadius: radius?.xl, padding: "1.75rem", border: `1px solid ${colors.borderLight}`, boxShadow: shadows?.sm }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1.5rem" }}>
            <span style={{ fontFamily: typography.fontDisplay, fontSize: typography.lg, color: colors.textPrimary }}>Filters</span>
            <button onClick={() => { setCategory("All"); setSaleOnly(false); setPriceMax(200); setSearch(""); }}
              style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.accentPrimary, background:"none", border:"none", cursor:"pointer" }}>
              Clear all
            </button>
          </div>

          {/* Search */}
          <div style={{ marginBottom:"1.5rem" }}>
            <span style={filterLabel}>Search</span>
            <div style={{ position:"relative" }}>
              <Search size={15} style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color: colors.textMuted, pointerEvents:"none" }} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products…"
                style={{ width:"100%", paddingLeft:32, paddingRight:12, paddingTop:"0.55rem", paddingBottom:"0.55rem", border:`1px solid ${colors.borderLight}`, borderRadius: radius?.md, fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textPrimary, background: colors.bgPrimary, outline:"none" }} />
            </div>
          </div>

          {/* Category */}
          <div style={{ marginBottom:"1.5rem" }}>
            <span style={filterLabel}>Category</span>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.25rem" }}>
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => setCategory(cat)}
                  style={{ textAlign:"left", padding:"0.5rem 0.75rem", borderRadius: radius?.md, border:"none", cursor:"pointer", fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: category === cat ? typography.weightMedium : typography.weightRegular, background: category === cat ? colors.accentLight : "transparent", color: category === cat ? colors.accentPrimary : colors.textSecondary, transition:`all ${transitions?.fast}` }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div style={{ marginBottom:"1.5rem" }}>
            <span style={filterLabel}>Max Price — <span style={{ color: colors.accentPrimary }}>${priceMax}</span></span>
            <input type="range" min={20} max={200} step={5} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))}
              style={{ width:"100%", accentColor: colors.accentPrimary, cursor:"pointer" }} />
            <div style={{ display:"flex", justifyContent:"space-between", fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted, marginTop:4 }}>
              <span>$20</span><span>$200</span>
            </div>
          </div>

          {/* Sale only */}
          <div>
            <label style={{ display:"flex", alignItems:"center", gap:"0.625rem", cursor:"pointer" }}>
              <input type="checkbox" checked={saleOnly} onChange={(e) => setSaleOnly(e.target.checked)}
                style={{ width:16, height:16, accentColor: colors.accentPrimary, cursor:"pointer" }} />
              <span style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textSecondary }}>Sale items only</span>
            </label>
          </div>
        </aside>

        {/* ── Product Grid ───────────────────────────────── */}
        <div>
          {/* Sort bar */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1.5rem", gap:"1rem", flexWrap:"wrap" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <SlidersHorizontal size={16} style={{ color: colors.textMuted }} />
              <span style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textMuted }}>
                {filtered.length} results
              </span>
            </div>
            <div style={{ position:"relative" }}>
              <select value={sort} onChange={(e) => setSort(e.target.value)}
                style={{ appearance:"none", padding:"0.5rem 2.25rem 0.5rem 0.875rem", border:`1px solid ${colors.borderLight}`, borderRadius: radius?.full, fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textPrimary, background: colors.bgCard, cursor:"pointer", outline:"none" }}>
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown size={14} style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", color: colors.textMuted, pointerEvents:"none" }} />
            </div>
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                style={{ textAlign:"center", padding:"5rem 0", color: colors.textMuted, fontFamily: typography.fontBody }}>
                <div style={{ fontSize:"3rem", marginBottom:"1rem" }}>🔍</div>
                <p style={{ fontSize: typography.lg, marginBottom:"0.5rem", color: colors.textPrimary }}>No products found</p>
                <p style={{ fontSize: typography.sm }}>Try adjusting your filters</p>
              </motion.div>
            ) : (
              <motion.div key="grid" variants={stagger} initial="hidden" animate="visible"
                style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))", gap:"1.25rem" }}>
                {filtered.map((product) => (
                  <motion.div key={product.id} variants={fadeUp} layout>
                    <motion.div whileHover={{ y:-4, boxShadow: shadows?.lg }}
                      transition={{ duration:0.22 }}
                      style={{ background: colors.bgCard, borderRadius: radius?.xl, overflow:"hidden", border:`1px solid ${colors.borderLight}`, boxShadow: shadows?.sm, cursor:"pointer" }}>

                      {/* Image */}
                      <div style={{ height:200, background: product.bg, position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <span style={{ fontSize:"3rem" }}>✨</span>

                        {product.badge && (
                          <span style={{ position:"absolute", top:10, left:10, background: product.badge==="Sale" ? colors.accentPrimary : product.badge==="New" ? colors.accentSecondary : colors.textPrimary, color:"#fff", fontSize:"0.62rem", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", padding:"3px 9px", borderRadius: radius?.full, fontFamily: typography.fontBody }}>
                            {product.badge}
                          </span>
                        )}

                        {/* Wishlist btn */}
                        <motion.button whileTap={{ scale:0.88 }} onClick={() => handleWishlist(product)}
                          style={{ position:"absolute", top:10, right:10, width:32, height:32, borderRadius: radius?.full, background: colors.bgCard, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow: shadows?.sm }}>
                          <Heart size={15} fill={isWishlisted(product.id) ? colors.accentPrimary : "none"} color={isWishlisted(product.id) ? colors.accentPrimary : colors.textMuted} />
                        </motion.button>
                      </div>

                      {/* Info */}
                      <div style={{ padding:"1.1rem" }}>
                        <h3 style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, color: colors.textPrimary, marginBottom:"0.375rem" }}>
                          {product.name}
                        </h3>

                        <div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:"0.625rem" }}>
                          <span style={{ fontSize:"0.65rem", color: colors.accentPrimary }}>{"★".repeat(Math.round(product.rating))}</span>
                          <span style={{ fontFamily: typography.fontBody, fontSize:"0.68rem", color: colors.textMuted }}>({product.reviews})</span>
                        </div>

                        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                            <span style={{ fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightBold, color: product.salePrice ? colors.accentPrimary : colors.textPrimary }}>
                              ${product.salePrice ?? product.price}
                            </span>
                            {product.salePrice && (
                              <span style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted, textDecoration:"line-through" }}>${product.price}</span>
                            )}
                          </div>

                          <motion.button whileTap={{ scale:0.9 }} onClick={() => handleAddToCart(product)}
                            style={{ width:32, height:32, borderRadius: radius?.full, background: isInCart(product.id) ? colors.accentPrimary : colors.bgSecondary, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:`background ${transitions?.fast}` }}>
                            <ShoppingBag size={15} color={isInCart(product.id) ? "#fff" : colors.textSecondary} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Shop;

// ──────────────────────────────────────────────────────────────────────────────
// FILE OVERVIEW: Shop.tsx
// ──────────────────────────────────────────────────────────────────────────────
//
// PURPOSE
// -------
// The main product listing page of the Blum app. It renders a filterable,
// sortable grid of all available products alongside a sticky sidebar with
// filter controls. It is the primary discovery surface — the page users land
// on when they want to browse or search for products.
//
//
// DATA
// ----
// ALL_PRODUCTS
//    A hardcoded array of 12 product objects defined at module level. Each
//    product has an id, name, price, optional salePrice, category, badge,
//    background colour (used as a placeholder image), slug, tags, rating,
//    and review count. This is mock data — when a real backend is ready,
//    this array and the Product interface should be replaced with an API
//    fetch (e.g. via React Query).
//
// CATEGORIES
//    A fixed array of category labels used to render the category filter
//    buttons. "All" is always the first option and means no category filter.
//
// SORT_OPTIONS
//    The five available sort modes shown in the sort dropdown:
//    featured (default), price ascending, price descending, best rated,
//    and most reviewed.
//
// ANIMATION VARIANTS (fadeUp, stagger)
//    Framer Motion variant objects typed as Variants and defined at module
//    level so they are not recreated on every render. fadeUp animates each
//    product card in from below with a fade. stagger staggers the fadeUp
//    animation across all cards with a 60ms delay between each one,
//    creating a cascading entrance effect.
//    Both are explicitly typed as Variants (imported from framer-motion)
//    so TypeScript can validate their shape at the definition site rather
//    than only when they are passed as props — see the bug fix note below.
//
//
// STATE
// -----
// search       — the raw value of the search input, updated on every keystroke.
// category     — the currently selected category filter. Initialised from the
//                ?category= URL param if present.
// sort         — the currently selected sort mode. Defaults to "featured".
// priceMax     — the upper price limit set by the range slider. Defaults to 200.
// saleOnly     — boolean toggle that hides non-sale products when true.
//                Initialised to true if the URL has ?filter=sale.
// filtersOpen  — tracks whether the mobile filter drawer is open (wired up
//                but the mobile drawer UI is not yet fully implemented).
// debouncedSearch — a 350ms debounced copy of `search`, used as the actual
//                filter input so the product list does not re-filter on every
//                single keystroke.
//
//
// URL PARAM INITIALISATION
// ------------------------
// Three filter states are seeded from URL search params on first render:
// - ?search=xxx   → pre-fills the search input.
// - ?category=xxx → pre-selects a category tab.
// - ?filter=sale  → enables the saleOnly toggle and resets category to "All".
// This allows other pages (e.g. Home) to link directly to a pre-filtered
// shop view, such as a "Shop Sale" button that lands on the sale filter.
//
//
// FILTERING LOGIC (useMemo — `filtered`)
// ---------------------------------------
// The filtered and sorted product list is computed with useMemo so it only
// recalculates when one of its five dependencies changes. The pipeline runs
// in this order:
// 1. Copy ALL_PRODUCTS into a mutable list.
// 2. Apply the debounced search — matches against product name and tags.
// 3. Apply the category filter — skipped when category is "All".
// 4. Apply the saleOnly filter — keeps only products with a salePrice.
// 5. Apply the price ceiling — keeps only products whose effective price
//    (salePrice if available, otherwise price) is at or below priceMax.
// 6. Sort the remaining list according to the selected sort mode.
//
//
// HANDLERS
// --------
// handleAddToCart(product)
//    Calls addItem from CartContext to add the product, opens the cart
//    drawer so the user sees their cart immediately, and fires a success
//    toast notification.
//
// handleWishlist(product)
//    Calls toggle from WishlistContext which adds or removes the product
//    depending on its current wishlist state. Fires an info toast that
//    says either "Removed from wishlist" or "{name} saved!" accordingly.
//    Note: the toast message reads the wishlist state *before* the toggle
//    fires, so the message correctly reflects the action that just happened.
//
//
// LAYOUT
// ------
// The page uses a CSS grid with two columns: a 260px sticky sidebar on the
// left and a fluid product grid on the right. The sidebar sticks 84px from
// the top to account for the fixed navigation bar height.
// The product grid uses auto-fill with a 220px minimum column width, so it
// naturally reflows from 1 to 4 columns depending on available space.
// AnimatePresence wraps the grid so that switching between the "no results"
// empty state and the product grid animates in and out cleanly.
//
//
// CONTEXTS USED
// -------------
// useTheme()     — all colours, typography, radius, shadows, and transition
//                  durations come from ThemeContext, making the page fully
//                  theme-aware without any hardcoded style values.
// useCart()      — addItem to add a product, isInCart to show the filled
//                  bag icon on already-added products, openDrawer to reveal
//                  the cart sidebar after adding.
// useWishlist()  — toggle to add/remove, isWishlisted to show the filled
//                  heart icon on already-wishlisted products.
// useToast()     — surface feedback toasts after cart and wishlist actions.
//
//
// BUG FIX — Variants type and ease value
// ----------------------------------------
// The original fadeUp and stagger objects used a raw cubic-bezier array
// [0.4, 0, 0.2, 1] for the ease property. Newer versions of Framer Motion
// tightened their Variants type so that ease only accepts named easing
// strings (e.g. "easeInOut", "linear") or an array of named easings —
// not raw number arrays. The fix was two changes:
// 1. Replace [0.4, 0, 0.2, 1] with "easeInOut", which is visually
//    identical and correctly typed.
// 2. Explicitly annotate both variant objects as Variants (imported from
//    framer-motion). Without the annotation TypeScript infers the object
//    type locally and only catches the mismatch at the prop call site,
//    making the error message long and hard to trace. With the annotation,
//    the error surfaces immediately at the definition, pointing directly
//    to the offending property.
//
//
// KEY INSIGHT
// -----------
// The most important performance decision in this file is the combination of
// useDebounce and useMemo working together. Without useDebounce, every
// keystroke in the search box would immediately trigger the useMemo to
// recompute the filtered list — fine for 12 products but expensive at scale.
// The debounce holds off the recomputation until the user pauses typing for
// 350ms. Without useMemo, the filter pipeline would rerun on every render
// even when nothing relevant changed. Together they ensure the filtering
// work only happens when it genuinely needs to, and not before the user has
// finished typing. A second subtle detail is the salePrice ?? price pattern
// used consistently throughout both the filter and sort logic — it ensures
// sale items are always evaluated at their discounted price, so a $92 item
// on sale for $75 correctly appears when the price ceiling is set to $80.
//
// ──────────────────────────────────────────────────────────────────────────────