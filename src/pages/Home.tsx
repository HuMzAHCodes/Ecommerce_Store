import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, Sparkles, Truck, RotateCcw, Shield } from "lucide-react";
import { useTheme } from "../theme/ThemeContext";
import { useIsMobile } from "../hooks/useMediaQuery";
import ScrollReveal from "../components/ui/ScrollReveal";

// ── Data ──────────────────────────────────────────────────────

const CATEGORIES = [
  { label: "Skincare",  href: "/collections/skincare",  emoji: "🌿", desc: "Clean formulas" },
  { label: "Beauty",    href: "/collections/beauty",    emoji: "✨", desc: "Effortless glow" },
  { label: "Wellness",  href: "/collections/wellness",  emoji: "🫧", desc: "Feel-good rituals" },
  { label: "Gift Sets", href: "/collections/gifts",     emoji: "🎁", desc: "Beautifully curated" },
];

const FEATURED = [
  { id: "1", name: "Radiance Serum",      price: 68,  salePrice: null, badge: "Best Seller", bg: "#FFEFB3" },
  { id: "2", name: "Glow Face Mist",      price: 42,  salePrice: 35,  badge: "Sale",        bg: "#C5E8E3" },
  { id: "3", name: "Velvet Body Butter",  price: 55,  salePrice: null, badge: "New",         bg: "#FFF5D0" },
  { id: "4", name: "Rose Toner",          price: 38,  salePrice: null, badge: null,          bg: "#A8D9D2" },
  { id: "5", name: "Cloud Cream SPF 30",  price: 72,  salePrice: null, badge: "New",         bg: "#FFF9E8" },
  { id: "6", name: "Lip Treatment Set",   price: 34,  salePrice: 28,  badge: "Sale",        bg: "#E6F4F2" },
];

const PERKS = [
  { icon: <Truck size={22} />,     title: "Free Shipping",       desc: "On all orders over $50"      },
  { icon: <RotateCcw size={22} />, title: "Easy Returns",        desc: "30-day hassle-free returns"  },
  { icon: <Shield size={22} />,    title: "Clean Ingredients",   desc: "No harmful chemicals, ever"  },
  { icon: <Sparkles size={22} />,  title: "Dermatologist Tested", desc: "Safe for all skin types"    },
];

// ── Framer Motion Variants ────────────────────────────────────

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.09 } },
};

// ── Home Page ─────────────────────────────────────────────────

const Home = () => {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const { colors, typography, radius, shadows, transitions } = theme;
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax on hero background
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <div style={{ background: colors.bgPrimary }}>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{
          position:   "relative",
          minHeight:  "92vh",
          display:    "flex",
          alignItems: "center",
          overflow:   "hidden",
        }}
      >
        {/* Parallax bg blobs */}
        <motion.div style={{ y: heroY, position: "absolute", inset: 0, zIndex: 0 }}>
          <div style={{ position: "absolute", top: "10%", right: "8%",  width: 420, height: 420, borderRadius: "50%", background: colors.accentLight,     filter: "blur(80px)", opacity: 0.55 }} />
          <div style={{ position: "absolute", bottom: "5%", left: "5%", width: 320, height: 320, borderRadius: "50%", background: colors.accentSecondary + "33", filter: "blur(70px)", opacity: 0.4 }} />
        </motion.div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: isMobile ? "3rem 1.25rem" : "6rem 1.5rem", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2rem" : "4rem", alignItems: "center", width: "100%" }}>

          {/* Left — Copy */}
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: colors.accentLight, color: colors.accentPrimary, borderRadius: radius?.full, padding: "0.35rem 1rem", fontSize: typography.xs, fontWeight: typography.weightMedium, fontFamily: typography.fontBody, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                <Sparkles size={12} /> New Collection 2025
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, lineHeight: 1.1, marginBottom: "1.25rem", fontWeight: typography.weightLight, fontStyle: "italic" }}
            >
              Simple.<br />
              <span style={{ fontStyle: "normal", fontWeight: typography.weightMedium }}>Clean.</span><br />
              Beautiful.
            </motion.h1>

            <motion.p variants={fadeUp} style={{ fontFamily: typography.fontBody, fontSize: typography.lg, color: colors.textSecondary, lineHeight: 1.7, marginBottom: "2rem", maxWidth: 440 }}>
              Skincare and beauty essentials crafted with clean ingredients for radiant, healthy skin — every single day.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link to="/shop">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{  scale: 0.97 }}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, background: colors.accentPrimary, color: colors.textOnAccent, borderRadius: radius?.full, padding: "0.875rem 1.75rem", fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightMedium, cursor: "pointer", boxShadow: shadows?.md, transition: `background ${transitions?.fast}` }}
                >
                  Shop Now <ArrowRight size={17} />
                </motion.span>
              </Link>
              <Link to="/about">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{  scale: 0.97 }}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: colors.textPrimary, borderRadius: radius?.full, padding: "0.875rem 1.75rem", fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightMedium, cursor: "pointer", border: `1px solid ${colors.borderMedium}` }}
                >
                  Our Story
                </motion.span>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginTop: "2.5rem" }}>
              <div style={{ display: "flex" }}>
                {["#FFEFB3","#C5E8E3","#FFF5D0","#A8D9D2"].map((bg, i) => (
                  <div key={i} style={{ width: 34, height: 34, borderRadius: "50%", background: bg, border: `2px solid ${colors.bgPrimary}`, marginLeft: i > 0 ? -10 : 0 }} />
                ))}
              </div>
              <div>
                <div style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, color: colors.textPrimary }}>
                  ★★★★★ <span style={{ color: colors.accentPrimary }}>4.9</span>
                </div>
                <div style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted }}>
                  From 2,400+ happy customers
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Visual stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            style={{ position: "relative", display: "flex", justifyContent: "center" }}
          >
            {/* Main card */}
            <div style={{ width: 340, height: 420, borderRadius: radius?.xl, background: `linear-gradient(145deg, ${colors.accentLight}, ${colors.bgSecondary})`, boxShadow: shadows?.xl, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>🌿</div>
                <p style={{ fontFamily: typography.fontDisplay, fontSize: typography["2xl"], color: colors.textPrimary, fontStyle: "italic" }}>Radiance<br/>Serum</p>
                <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textMuted, marginTop: 6 }}>30ml · Clean formula</p>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", top: 28, right: 10, background: colors.bgCard, borderRadius: radius?.lg, padding: "0.75rem 1rem", boxShadow: shadows?.lg, fontFamily: typography.fontBody }}
            >
              <div style={{ fontSize: typography.xs, color: colors.textMuted, marginBottom: 2 }}>Best Seller</div>
              <div style={{ fontSize: typography.sm, fontWeight: typography.weightBold, color: colors.accentPrimary }}>$68.00</div>
            </motion.div>

            {/* Floating review */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              style={{ position: "absolute", bottom: 40, left: -10, background: colors.bgCard, borderRadius: radius?.lg, padding: "0.75rem 1rem", boxShadow: shadows?.lg, fontFamily: typography.fontBody, maxWidth: 180 }}
            >
              <div style={{ fontSize: "0.65rem", color: colors.accentPrimary, marginBottom: 3 }}>★★★★★</div>
              <div style={{ fontSize: typography.xs, color: colors.textSecondary, lineHeight: 1.5 }}>"My skin has never looked better!"</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PERKS BAR ─────────────────────────────────────── */}
      <section style={{ background: colors.bgSecondary, borderTop: `1px solid ${colors.borderLight}`, borderBottom: `1px solid ${colors.borderLight}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "2rem 1.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
          {PERKS.map((perk) => (
            <ScrollReveal key={perk.title} y={28}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ color: colors.accentPrimary, flexShrink: 0 }}>{perk.icon}</div>
                <div>
                  <div style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, color: colors.textPrimary }}>{perk.title}</div>
                  <div style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted }}>{perk.desc}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────── */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 1.5rem" }}>
        <ScrollReveal style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle: "italic", marginBottom: "0.5rem" }}>Shop by Category</h2>
          <p style={{ fontFamily: typography.fontBody, color: colors.textMuted, fontSize: typography.base }}>Find exactly what your skin needs</p>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
          {CATEGORIES.map((cat) => (
            <ScrollReveal key={cat.label} y={36}>
              <Link to={cat.href} style={{ textDecoration: "none", display: "block" }}>
                <motion.div
                  whileHover={{ y: -5, boxShadow: shadows?.lg }}
                  transition={{ duration: 0.25 }}
                  style={{ background: colors.bgSecondary, borderRadius: radius?.xl, padding: "2.5rem 1.5rem", textAlign: "center", border: `1px solid ${colors.borderLight}`, cursor: "pointer", boxShadow: shadows?.sm, transition: `border-color ${transitions?.normal}` }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = colors.accentPrimary; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = colors.borderLight; }}
                >
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{cat.emoji}</div>
                  <div style={{ fontFamily: typography.fontDisplay, fontSize: typography.xl, color: colors.textPrimary, marginBottom: "0.375rem" }}>{cat.label}</div>
                  <div style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textMuted }}>{cat.desc}</div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────────────── */}
      <section style={{ background: colors.bgSecondary, padding: "5rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <ScrollReveal style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h2 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle: "italic", marginBottom: "0.5rem" }}>Featured Products</h2>
              <p style={{ fontFamily: typography.fontBody, color: colors.textMuted }}>Our most-loved essentials</p>
            </div>
            <Link to="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.accentPrimary, textDecoration: "none", fontWeight: typography.weightMedium }}>
              View all <ArrowRight size={15} />
            </Link>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {FEATURED.map((product) => (
              <ScrollReveal key={product.id} y={44}>
                <Link to={`/shop/${product.id}`} style={{ textDecoration: "none", display: "block" }}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.22 }}
                    style={{ background: colors.bgCard, borderRadius: radius?.xl, overflow: "hidden", boxShadow: shadows?.sm, border: `1px solid ${colors.borderLight}`, cursor: "pointer" }}
                  >
                    <div style={{ height: 220, background: product.bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                      <div style={{ fontSize: "3.5rem" }}>✨</div>
                      {product.badge && (
                        <span style={{ position: "absolute", top: 12, left: 12, background: product.badge === "Sale" ? colors.accentPrimary : product.badge === "New" ? colors.accentSecondary : colors.textPrimary, color: "#fff", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", padding: "3px 10px", borderRadius: radius?.full, fontFamily: typography.fontBody }}>
                          {product.badge}
                        </span>
                      )}
                    </div>

                    <div style={{ padding: "1.25rem" }}>
                      <h3 style={{ fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightMedium, color: colors.textPrimary, marginBottom: "0.5rem" }}>
                        {product.name}
                      </h3>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {product.salePrice ? (
                          <>
                            <span style={{ fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightBold, color: colors.accentPrimary }}>${product.salePrice}</span>
                            <span style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textMuted, textDecoration: "line-through" }}>${product.price}</span>
                          </>
                        ) : (
                          <span style={{ fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightBold, color: colors.textPrimary }}>${product.price}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BANNER ────────────────────────────────────────── */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 1.5rem" }}>
        <ScrollReveal y={32}>
        <div
          style={{ background: `linear-gradient(135deg, ${colors.accentLight} 0%, ${colors.bgSecondary} 60%, ${colors.accentSecondary}22 100%)`, borderRadius: radius?.xl, padding: isMobile ? "2.5rem 1.5rem" : "4rem 3rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem", border: `1px solid ${colors.borderLight}` }}
        >
          <div>
            <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, color: colors.accentPrimary, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Limited Time Offer
            </p>
            <h2 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle: "italic", marginBottom: "0.75rem" }}>
              20% off your first order
            </h2>
            <p style={{ fontFamily: typography.fontBody, color: colors.textSecondary, fontSize: typography.base, maxWidth: 400 }}>
              Sign up to our newsletter and get 20% off your first purchase. No strings attached.
            </p>
          </div>
          <Link to="/register">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: colors.accentPrimary, color: colors.textOnAccent, borderRadius: radius?.full, padding: "0.875rem 2rem", fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightMedium, cursor: "pointer", boxShadow: shadows?.md, whiteSpace: "nowrap" }}
            >
              Claim Discount <ArrowRight size={17} />
            </motion.span>
          </Link>
        </div>
        </ScrollReveal>
      </section>

    </div>
  );
};

export default Home;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// Home.tsx
// The landing page of the BLÜM storefront. Composed of five distinct sections
// rendered top-to-bottom, each scroll-triggered with Framer Motion animations.
// All data is static (module-level constants) and all styling is inline via
// ThemeContext — no external CSS or data fetching required.
//
// ── Page sections (top → bottom) ─────────────────────────────────────────────
//
//  1. Hero             — full-viewport split layout with parallax blobs,
//                        animated copy, visual product card, floating badges
//  2. Perks Bar        — four trust signals in a responsive grid strip
//  3. Categories       — four collection cards in a responsive grid
//  4. Featured Products — six product cards in a responsive grid
//  5. Banner           — promotional CTA for first-order discount
//
// ── Module-level data constants ───────────────────────────────────────────────
//
//  CATEGORIES — four collection entries { label, href, emoji, desc }.
//               Each renders as a hoverable card linking to its collection route.
//
//  FEATURED   — six mock products { id, name, price, salePrice, badge, bg }.
//               salePrice: null → full price display only.
//               salePrice: number → sale price (accentPrimary) + strikethrough original.
//               badge: null → no pill rendered.
//               badge: "Sale" / "New" / "Best Seller" → colored pill, top-left of image.
//               bg → pastel hex used as the placeholder product image background.
//               These are UI stubs — real data will come from an API via React Query.
//
//  PERKS      — four brand trust points { icon (ReactNode), title, desc }.
//               Rendered as icon + two-line text rows in the perks bar.
//
// ── Framer Motion variants (module-level, typed as Variants) ──────────────────
//
//  fadeUp  — shared enter animation: opacity 0, y 28 → opacity 1, y 0.
//            Duration 550 ms, cubic-bezier [0.4, 0, 0.2, 1] cast as a
//            4-tuple to satisfy Framer Motion's strict Easing type.
//            Used on nearly every content block across all five sections.
//
//  stagger — parent-only variant whose sole job is staggerChildren: 0.09 s,
//            cascading the fadeUp reveal across sibling children automatically.
//            Has no hidden/visible visual states of its own.
//
//  Both typed as `Variants` (imported from framer-motion) to catch shape
//  mismatches at the definition site rather than at each usage point.
//
// ── Parallax (Hero section) ───────────────────────────────────────────────────
//
//  heroRef attaches to the <section> element. useScroll tracks its progress
//  from "start start" → "end start" (section top entering → leaving viewport top).
//  heroY = useTransform maps [0,1] scroll progress to ["0%","25%"] translateY,
//  applied only to the blob layer — blobs move at 25% of scroll speed,
//  creating depth separation from the static copy sitting above them.
//
// ── Hero section layout ───────────────────────────────────────────────────────
//
//  Two-column CSS grid (1fr 1fr), centered in a 1280px max-width container.
//
//  Left column (stagger + fadeUp children):
//    • "New Collection 2025" pill badge (accentLight bg, accentPrimary text)
//    • Three-line <h1> mixing italic/light and normal/medium weights
//    • Subheading <p>
//    • CTA row: "Shop Now" (primary filled) + "Our Story" (outline ghost)
//    • Social proof row: four overlapping pastel avatar circles (colored divs
//      with -10px marginLeft overlap, not real photos) + star rating + count
//
//  Right column (independent initial/animate, not staggered):
//    • Main product card — gradient bg, 🌿 emoji, product name in display font
//    • Floating "Best Seller / $68" badge — infinite y: 0 → -8 → 0, 3 s loop
//    • Floating review quote — infinite y: 0 → +8 → 0, 3.5 s loop, 0.5 s delay
//    The two floaters animate in opposite vertical directions and at different
//    speeds so they never feel synchronized — creating an organic, alive feel.
//
// ── Perks bar ─────────────────────────────────────────────────────────────────
//
//  Full-width bgSecondary strip with top + bottom borders.
//  CSS auto-fit grid (minmax 200px). Triggered by whileInView.
//  Each item: accentPrimary icon (flexShrink: 0) + title + muted desc.
//
// ── Categories section ────────────────────────────────────────────────────────
//
//  Centered heading + auto-fit grid of four category cards (minmax 220px).
//  Each card lifts y: -5 and upgrades shadow on whileHover.
//  Border color transitions to accentPrimary on hover via imperative
//  onMouseEnter/Leave style mutation (consistent with the rest of the codebase).
//  Entire card is wrapped in <Link> — no separate click target needed.
//
// ── Featured products section ─────────────────────────────────────────────────
//
//  bgSecondary background alternates with surrounding white sections for rhythm.
//  Section header: title + subtitle left, "View all →" link right (flex space-between).
//  auto-fill grid (minmax 240px) of six product cards, each:
//    Image area (220px tall, product.bg color) with centered ✨ emoji placeholder
//    + conditionally rendered badge pill (absolute, top-left).
//    Badge color logic:
//      "Sale"        → accentPrimary
//      "New"         → accentSecondary
//      anything else → textPrimary  (covers "Best Seller")
//      null          → nothing rendered
//    Info area: product name + price row.
//    Price logic:
//      salePrice present → accentPrimary sale price + line-through original
//      salePrice null    → textPrimary full price only
//  Each card links to /shop/:id and applies whileHover y: -4 lift.
//
// ── Banner (CTA) section ──────────────────────────────────────────────────────
//
//  A gradient rounded card animating in with scale: 0.97 → 1 + opacity on
//  scroll enter (single block, no stagger needed).
//  Gradient: accentLight → bgSecondary → accentSecondary at 13% opacity.
//  Flex row (space-between, flexWrap for mobile): left copy + right CTA button.
//  Button links to /register to funnel new visitors into account creation
//  and claim the 20% first-order discount.
//
// ── TypeScript note ───────────────────────────────────────────────────────────
//
//  The cubic-bezier ease array [0.4, 0, 0.2, 1] is cast as
//  [number, number, number, number] wherever it appears (both in the Variants
//  object and in the inline transition on the hero right column). This is
//  required because TypeScript infers array literals as number[] which is
//  incompatible with Framer Motion's Easing type that expects either a named
//  easing string or a fixed 4-element bezier tuple.
//
// ── Dependencies ─────────────────────────────────────────────────────────────
//
//  react-router-dom   — Link for all internal navigation
//  framer-motion      — motion.div/h1/p/span, useScroll, useTransform,
//                       type Variants for typed animation variant objects
//  lucide-react       — ArrowRight, Sparkles, Truck, RotateCcw, Shield
//  useTheme()         — colors, typography, radius, shadows, transitions tokens