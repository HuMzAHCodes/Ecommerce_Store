import { Link }   from "react-router-dom";
import { Star }   from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { categoryLinkStyles, productTitleStyles } from "./productPageStyles";

interface ProductInfoProps {
  name:       string;
  category:   string;
  price:      number;
  salePrice:  number | null;
  avgRating:  number;
  reviewCount:number;
}

const ProductInfo = ({
  name, category, price, salePrice, avgRating, reviewCount,
}: ProductInfoProps) => {
  const { colors, typography } = useTheme();
  const isMobile = useIsMobile();

  return (
    <div>
      <Link to={`/shop?category=${category}`} style={categoryLinkStyles(typography, colors)}>
        {category}
      </Link>

      <h1 style={productTitleStyles(typography, colors, isMobile)}>
        {name}
      </h1>

      {/* Star rating */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", gap: 2 }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={14}
              fill={star <= Math.round(avgRating) ? colors.accentPrimary : "none"}
              color={colors.accentPrimary}
            />
          ))}
        </div>
        <span style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textMuted }}>
          {avgRating.toFixed(1)} ({reviewCount} reviews)
        </span>
      </div>

      {/* Price */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
        <span className="price" style={{ fontSize: typography["3xl"] }}>
          ${salePrice ?? price}
        </span>
        {salePrice && (
          <span className="price-original" style={{ fontSize: typography.xl }}>
            ${price}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;