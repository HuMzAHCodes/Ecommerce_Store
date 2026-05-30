import { motion }        from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { useTheme }      from "../../theme/ThemeContext";
import { useIsMobile }   from "../../hooks/useMediaQuery";
import {
  cardWrapperStyles, cardImageAreaStyles, cardBadgeStyles,
  wishlistButtonStyles,  cardBodyStyles, addToCartButtonStyles,
} from "./shopStyles";
import { CARD_FADE_UP_VARIANT, type Product } from "./shopData";

interface ShopProductCardProps {
  product:      Product;
  isInCart:     boolean;
  isWishlisted: boolean;
  onAddToCart:  (product: Product) => void;
  onWishlist:   (product: Product) => void;
}

const getBadgeColor = (badge: string, colors: ReturnType<typeof useTheme>["colors"]) => {
  if (badge === "Sale")    return colors.accentPrimary;
  if (badge === "New")     return colors.accentSecondary;
  return colors.textPrimary;
};

const ShopProductCard = ({
  product, isInCart, isWishlisted,
  onAddToCart, onWishlist,
}: ShopProductCardProps) => {
  const { colors, typography, radius, shadows, transitions } = useTheme();
  const isMobile = useIsMobile();

  const activePrice = product.salePrice ?? product.price;

  return (
    <motion.div variants={CARD_FADE_UP_VARIANT} layout>
      <motion.div
        whileHover={{ y: -3, boxShadow: shadows?.lg }}
        transition={{ duration: 0.2 }}
        style={cardWrapperStyles(colors, radius, shadows)}
      >
        {/* Image area */}
        <div style={cardImageAreaStyles(product.bg, isMobile)}>
          <span style={{ fontSize: isMobile ? "2.25rem" : "3rem" }}>✨</span>

          {product.badge && (
            <span style={cardBadgeStyles(getBadgeColor(product.badge, colors), typography, radius)}>
              {product.badge}
            </span>
          )}

          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => onWishlist(product)}
            style={wishlistButtonStyles(colors, radius, shadows)}
          >
            <Heart
              size={14}
              fill={isWishlisted ? colors.accentPrimary : "none"}
              color={isWishlisted ? colors.accentPrimary : colors.textMuted}
            />
          </motion.button>
        </div>

        {/* Card body */}
        <div style={cardBodyStyles(isMobile)}>
          <h3 className="product-name" style={{ marginBottom: "0.25rem", fontSize: isMobile ? typography.xs : typography.sm }}>
            {product.name}
          </h3>

          {/* Star rating */}
          <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.6rem", color: colors.accentPrimary }}>
              {"★".repeat(Math.round(product.rating))}
            </span>
            <span style={{ fontFamily: typography.fontBody, fontSize: "0.62rem", color: colors.textMuted }}>
              ({product.reviews})
            </span>
          </div>

          {/* Price row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span className="price" style={{ fontSize: isMobile ? typography.sm : typography.base }}>
                ${activePrice}
              </span>
              {product.salePrice && (
                <span className="price-original">${product.price}</span>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onAddToCart(product)}
              style={addToCartButtonStyles(colors, transitions, radius, isInCart)}
            >
              <ShoppingBag size={13} color={isInCart ? "#fff" : colors.textSecondary} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ShopProductCard;