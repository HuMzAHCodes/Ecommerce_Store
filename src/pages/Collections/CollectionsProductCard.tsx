import { motion }        from "framer-motion";
import { Link }          from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { useTheme }      from "../../theme/ThemeContext";
import { useIsMobile }   from "../../hooks/useMediaQuery";
import {
  cardStyles,          cardImageAreaStyles, cardBadgeStyles,
  wishlistButtonStyles, cardBodyStyles,     addToCartButtonStyles,
} from "./collectionsStyles";
import { CARD_FADE_UP_VARIANT, type CollectionProduct } from "./collectionsData";

interface CollectionsProductCardProps {
  product:      CollectionProduct;
  isInCart:     boolean;
  isWishlisted: boolean;
  onAddToCart:  (product: CollectionProduct) => void;
  onWishlist:   (product: CollectionProduct) => void;
}

const getBadgeColor = (badge: string, colors: ReturnType<typeof useTheme>["colors"]) => {
  if (badge === "Sale") return colors.accentPrimary;
  if (badge === "New")  return colors.accentSecondary;
  return colors.textPrimary;
};

const CollectionsProductCard = ({
  product, isInCart, isWishlisted,
  onAddToCart, onWishlist,
}: CollectionsProductCardProps) => {
  const { colors, typography, radius, shadows, transitions } = useTheme();
  const isMobile = useIsMobile();

  return (
    <motion.div variants={CARD_FADE_UP_VARIANT}>
      <motion.div
        whileHover={{ y: -4, boxShadow: shadows?.lg }}
        transition={{ duration: 0.2 }}
        style={cardStyles(colors, radius, shadows)}
      >
        {/* Image area */}
        <div style={cardImageAreaStyles(product.bg, isMobile)}>
          <span style={{ fontSize: isMobile ? "2.5rem" : "3.5rem" }}>✨</span>

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
          <Link to={`/shop/${product.slug}`} style={{ textDecoration: "none" }}>
            <h3 className="product-name" style={{ marginBottom: "0.375rem", fontSize: isMobile ? typography.xs : typography.sm }}>
              {product.name}
            </h3>
          </Link>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span className="price" style={{ fontSize: isMobile ? typography.sm : typography.base }}>
                ${product.salePrice ?? product.price}
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
              <ShoppingBag size={14} color={isInCart ? "#fff" : colors.textSecondary} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CollectionsProductCard;