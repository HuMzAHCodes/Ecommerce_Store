import { useEffect, useRef }          from "react";
import { motion }                      from "framer-motion";
import { Link }                        from "react-router-dom";
import { ArrowRight }                  from "lucide-react";
import gsap                            from "gsap";
import { ScrollTrigger }               from "gsap/ScrollTrigger";
import { useTheme }                    from "../../theme/ThemeContext";
import { useIsMobile }                 from "../../hooks/useMediaQuery";
import ScrollReveal                    from "../../components/ui/ScrollReveal";
import { FEATURED, type FeaturedProduct } from "./constants";

// Register GSAP plugin once at module level
gsap.registerPlugin(ScrollTrigger);

// ── Card width constants ───────────────────────────────────────
const CARD_W     = 380; // px — width of each product card
const CARD_GAP   = 32;  // px — gap between cards
const SIDE_PAD   = 80;  // px — left padding before first card

// Total horizontal distance the track must travel so the last card
// is fully visible. Formula: (cards - 1) × (cardW + gap)
const TRACK_TRAVEL = (FEATURED.length - 1) * (CARD_W + CARD_GAP);

// ── Sub-components ─────────────────────────────────────────────

/** Price display — handles sale price vs regular price */
const ProductPrice = ({ product }: { product: FeaturedProduct }) => {
  const { colors, typography } = useTheme();

  if (product.salePrice) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{
          fontFamily: typography.fontBody,
          fontSize:   typography.base,
          fontWeight: typography.weightBold,
          color:      colors.accentPrimary,
        }}>
          ${product.salePrice}
        </span>
        <span style={{
          fontFamily:     typography.fontBody,
          fontSize:       typography.sm,
          color:          colors.textMuted,
          textDecoration: "line-through",
        }}>
          ${product.price}
        </span>
      </div>
    );
  }

  return (
    <span style={{
      fontFamily: typography.fontBody,
      fontSize:   typography.base,
      fontWeight: typography.weightBold,
      color:      colors.textPrimary,
    }}>
      ${product.price}
    </span>
  );
};

/** Badge pill overlaid on the product image */
const ProductBadge = ({ badge }: { badge: string }) => {
  const { colors, typography, radius } = useTheme();

  const badgeBg =
    badge === "Sale" ? colors.accentPrimary  :
    badge === "New"  ? colors.accentSecondary :
    colors.textPrimary;

  return (
    <span style={{
      position:      "absolute",
      top:           12,
      left:          12,
      background:    badgeBg,
      color:         "#fff",
      fontSize:      "0.65rem",
      fontWeight:    600,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      padding:       "3px 10px",
      borderRadius:  radius?.full,
      fontFamily:    typography.fontBody,
    }}>
      {badge}
    </span>
  );
};

/** Single product card — shared by both desktop and mobile layouts */
const ProductCard = ({ product }: { product: FeaturedProduct }) => {
  const { colors, typography, radius, shadows } = useTheme();

  return (
    <Link to={`/shop/${product.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <motion.div
        whileHover={{ y: -6, boxShadow: shadows?.lg }}
        transition={{ duration: 0.22 }}
        style={{
          background:   colors.bgCard,
          borderRadius: radius?.xl,
          overflow:     "hidden",
          boxShadow:    shadows?.sm,
          border:       `1px solid ${colors.borderMedium}`,
          cursor:       "pointer",
          width:        "100%",
          height:       "100%",
        }}
      >
        {/* Image */}
        <div style={{
          height:         260,
          background:     product.bg,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          position:       "relative",
          overflow:       "hidden",
        }}>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div style={{ fontSize: "3.5rem" }}>✨</div>
          )}
          {product.badge && <ProductBadge badge={product.badge} />}
        </div>

        {/* Info */}
        <div style={{ padding: "1.25rem 1.5rem" }}>
          <h3 style={{
            fontFamily: typography.fontBody,
            fontSize:   typography.base,
            fontWeight: typography.weightMedium,
            color:      colors.textPrimary,
            marginBottom: "0.5rem",
          }}>
            {product.name}
          </h3>
          <ProductPrice product={product} />
        </div>
      </motion.div>
    </Link>
  );
};

// ── Desktop: Pinned Horizontal Scroll ─────────────────────────

/**
 * GSAP ScrollTrigger pins this section for (TRACK_TRAVEL)px of scroll.
 * During that time, the inner card track translates leftward so cards
 * scroll into view horizontally as the user scrolls down.
 *
 * After the last card is fully visible, the pin releases and the page
 * resumes normal vertical scroll.
 */
const DesktopHorizontalScroll = () => {
  const { colors, typography, radius } = useTheme();

  // Refs
  const sectionRef = useRef<HTMLDivElement>(null); // the pinned outer section
  const trackRef   = useRef<HTMLDivElement>(null); // the sliding card strip

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    // Small delay so layout is fully painted before ScrollTrigger measures
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.to(track, {
          // Slide the track left by the full travel distance
          x: -TRACK_TRAVEL,

          ease: "none", // linear — 1:1 mapping with scroll position

          scrollTrigger: {
            trigger:  section,
            start:    "top top",      // pin starts when section hits viewport top
            end:      () => `+=${TRACK_TRAVEL}`, // pin lasts for TRACK_TRAVEL px of scroll
            pin:      true,           // stick the section to the viewport
            scrub:    1,              // smooth 1s lag between scroll and animation
            anticipatePin: 1,         // prevents jump when pin engages
            invalidateOnRefresh: true,// recalculate on window resize
          },
        });
      }, section);

      return () => ctx.revert(); // cleanup on unmount
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    // Outer section — this is what GSAP pins
    <section
      ref={sectionRef}
      style={{
        background: colors.bgPrimary,
        overflow:   "hidden",
        // Height = viewport height. The pin handles scroll duration separately.
        height:     "100vh",
        display:    "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Section heading */}
      <div style={{
        maxWidth: 1280,
        margin:   "0 auto",
        padding:  "0 1.5rem",
        width:    "100%",
        marginBottom: "2.5rem",
      }}>
        <ScrollReveal style={{
          display:        "flex",
          alignItems:     "flex-end",
          justifyContent: "space-between",
          flexWrap:       "wrap",
          gap:            "1rem",
        }}>
          <div>
            <h2 style={{
              fontFamily:  typography.fontDisplay,
              color:       colors.textPrimary,
              fontStyle:   "italic",
              marginBottom: "0.5rem",
            }}>
              Featured Products
            </h2>
            <p style={{
              fontFamily: typography.fontBody,
              color:      colors.textMuted,
            }}>
              Our most-loved essentials
            </p>
          </div>
          <Link
            to="/shop"
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            6,
              fontFamily:     typography.fontBody,
              fontSize:       typography.sm,
              color:          colors.accentPrimary,
              textDecoration: "none",
              fontWeight:     typography.weightMedium,
            }}
          >
            View all <ArrowRight size={15} />
          </Link>
        </ScrollReveal>
      </div>

      {/* Scroll progress indicator dots */}
      <div style={{
        display:        "flex",
        justifyContent: "center",
        gap:            "6px",
        marginBottom:   "2rem",
      }}>
        {FEATURED.map((_, i) => (
          <div
            key={i}
            style={{
              width:        i === 0 ? 20 : 6,
              height:       6,
              borderRadius: radius?.full,
              background:   i === 0 ? colors.accentPrimary : colors.borderMedium,
              transition:   "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Card track — GSAP slides this left */}
      <div
        ref={trackRef}
        style={{
          display:    "flex",
          gap:        CARD_GAP,
          paddingLeft: SIDE_PAD,
          // Width must accommodate all cards so they don't wrap
          width:      FEATURED.length * (CARD_W + CARD_GAP) + SIDE_PAD,
          willChange: "transform", // GPU hint for smooth animation
        }}
      >
        {FEATURED.map((product) => (
          <div
            key={product.id}
            style={{
              width:    CARD_W,
              flexShrink: 0, // prevent cards from squishing
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Scroll hint text */}
      <p style={{
        fontFamily:   typography.fontBody,
        fontSize:     typography.xs,
        color:        colors.textMuted,
        textAlign:    "center",
        marginTop:    "2rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}>
        Scroll to explore ↓
      </p>
    </section>
  );
};

// ── Mobile: Snap Scroll Carousel ──────────────────────────────

/**
 * Pure CSS horizontal snap scroll. No GSAP, no pinning.
 * Touch-native — swipe left/right between cards.
 * Each card snaps cleanly to the left edge.
 */
const MobileSnapCarousel = () => {
  const { colors, typography } = useTheme();

  return (
    <section style={{ background: colors.bgPrimary, padding: "3rem 0" }}>

      {/* Heading */}
      <div style={{ padding: "0 1.25rem", marginBottom: "1.75rem" }}>
        <h2 style={{
          fontFamily:   typography.fontDisplay,
          color:        colors.textPrimary,
          fontStyle:    "italic",
          marginBottom: "0.35rem",
          fontSize:     typography["2xl"],
        }}>
          Featured Products
        </h2>
        <p style={{ fontFamily: typography.fontBody, color: colors.textMuted, fontSize: typography.sm }}>
          Our most-loved essentials
        </p>
      </div>

      {/* Snap scroll track */}
      <div style={{
        display:               "flex",
        gap:                   "1rem",
        overflowX:             "scroll",
        // Snap: each card locks to the left edge on swipe
        scrollSnapType:        "x mandatory",
        WebkitOverflowScrolling: "touch", // momentum scroll on iOS
        // Hide scrollbar visually but keep it functional
        scrollbarWidth:        "none",
        paddingLeft:           "1.25rem",
        paddingRight:          "1.25rem",
        paddingBottom:         "1rem",   // room for shadow
      }}>
        {FEATURED.map((product) => (
          <div
            key={product.id}
            style={{
              // Each card snaps to the left edge
              scrollSnapAlign: "start",
              flexShrink:      0,
              // Show ~85% of card + peek of next card
              width:           "78vw",
              maxWidth:        320,
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* View all link */}
      <div style={{ padding: "1.25rem 1.25rem 0", textAlign: "center" }}>
        <Link
          to="/shop"
          style={{
            display:        "inline-flex",
            alignItems:     "center",
            gap:            6,
            fontFamily:     typography.fontBody,
            fontSize:       typography.sm,
            color:          colors.accentPrimary,
            textDecoration: "none",
            fontWeight:     typography.weightMedium,
          }}
        >
          View all products <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
};

// ── Main export ────────────────────────────────────────────────

/**
 * HomeFeaturedProducts
 *
 * Desktop → GSAP pinned horizontal scroll section.
 *   The section sticks to the viewport while cards slide left
 *   in sync with vertical scroll. Pin releases after last card.
 *
 * Mobile → Pure CSS snap scroll carousel.
 *   No pinning, no GSAP. Swipe between cards natively.
 *
 * Required: npm install gsap
 */
const HomeFeaturedProducts = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileSnapCarousel /> : <DesktopHorizontalScroll />;
};

export default HomeFeaturedProducts;
