import { motion }        from "framer-motion";
import { ShoppingBag, Heart, Minus, Plus } from "lucide-react";
import { useTheme }      from "../../theme/ThemeContext";
import { useIsMobile }   from "../../hooks/useMediaQuery";
import {
  qtyControlStyles, qtyButtonStyles, qtyValueStyles,
  addToCartButtonStyles, wishlistButtonStyles,
} from "./productPageStyles";

interface ProductActionsProps {
  qty:          number;
  isInCart:     boolean;
  isWishlisted: boolean;
  onIncrement:  () => void;
  onDecrement:  () => void;
  onAddToCart:  () => void;
  onWishlist:   () => void;
}

const ProductActions = ({
  qty, isInCart, isWishlisted,
  onIncrement, onDecrement, onAddToCart, onWishlist,
}: ProductActionsProps) => {
  const { colors, typography, radius, shadows } = useTheme();
  const isMobile = useIsMobile();

  return (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1rem", flexWrap: isMobile ? "wrap" : "nowrap" }}>

      {/* Qty stepper */}
      <div style={qtyControlStyles(colors, radius)}>
        <button onClick={onDecrement} style={qtyButtonStyles(colors)}><Minus size={13} /></button>
        <span style={qtyValueStyles(typography, colors)}>{qty}</span>
        <button onClick={onIncrement} style={qtyButtonStyles(colors)}><Plus  size={13} /></button>
      </div>

      {/* Add to cart */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={onAddToCart}
        style={addToCartButtonStyles(typography, colors, radius, shadows, isMobile)}
      >
        <ShoppingBag size={17} />
        {isInCart ? "Add More" : "Add to Cart"}
      </motion.button>

      {/* Wishlist */}
      <motion.button
        whileTap={{ scale: 0.88 }}
        onClick={onWishlist}
        style={wishlistButtonStyles(colors, radius, isWishlisted)}
      >
        <Heart
          size={17}
          fill={isWishlisted ? colors.accentPrimary : "none"}
          color={isWishlisted ? colors.accentPrimary : colors.textMuted}
        />
      </motion.button>

    </div>
  );
};

export default ProductActions;