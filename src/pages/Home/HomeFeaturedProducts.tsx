import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";
import ScrollReveal from "../../components/ui/ScrollReveal";
import { FEATURED, type FeaturedProduct } from "./constants";

/** Price display — handles sale price vs regular price */
const ProductPrice = ({ product }: { product: FeaturedProduct }) => {
  const { colors, typography } = useTheme();

  if (product.salePrice) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightBold, color: colors.accentPrimary }}>
          ${product.salePrice}
        </span>
        <span style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textMuted, textDecoration: "line-through" }}>
          ${product.price}
        </span>
      </div>
    );
  }

  return (
    <span style={{ fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightBold, color: colors.textPrimary }}>
      ${product.price}
    </span>
  );
};

/** Badge pill overlaid on the product image */
const ProductBadge = ({ badge }: { badge: string }) => {
  const { colors, typography, radius } = useTheme();

  const badgeBg =
    badge === "Sale" ? colors.accentPrimary :
    badge === "New"  ? colors.accentSecondary :
    colors.textPrimary;

  return (
    <span style={{ position: "absolute", top: 12, left: 12, background: badgeBg, color: "#fff", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", padding: "3px 10px", borderRadius: radius?.full, fontFamily: typography.fontBody }}>
      {badge}
    </span>
  );
};

/**
 * Responsive grid of featured product cards.
 * Each card lifts on hover and scroll-reveals on entry.
 */
const HomeFeaturedProducts = () => {
  const { colors, typography, radius, shadows } = useTheme();

  return (
    <section style={{ background: colors.bgSecondary, padding: "5rem 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Section heading + "View all" link */}
        <ScrollReveal style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h2 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle: "italic", marginBottom: "0.5rem" }}>
              Featured Products
            </h2>
            <p style={{ fontFamily: typography.fontBody, color: colors.textMuted }}>Our most-loved essentials</p>
          </div>
          <Link to="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.accentPrimary, textDecoration: "none", fontWeight: typography.weightMedium }}>
            View all <ArrowRight size={15} />
          </Link>
        </ScrollReveal>

        {/* Products grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {FEATURED.map((product) => (
            <ScrollReveal key={product.id} y={44}>
              <Link to={`/shop/${product.id}`} style={{ textDecoration: "none", display: "block" }}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.22 }}
                  style={{ background: colors.bgCard, borderRadius: radius?.xl, overflow: "hidden", boxShadow: shadows?.sm, border: `1px solid ${colors.borderLight}`, cursor: "pointer" }}
                >
                  {/* Product image area */}
                  <div style={{ height: 220, background: product.bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    <div style={{ fontSize: "3.5rem" }}>✨</div>
                    {product.badge && <ProductBadge badge={product.badge} />}
                  </div>

                  {/* Product info */}
                  <div style={{ padding: "1.25rem" }}>
                    <h3 style={{ fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightMedium, color: colors.textPrimary, marginBottom: "0.5rem" }}>
                      {product.name}
                    </h3>
                    <ProductPrice product={product} />
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeaturedProducts;
