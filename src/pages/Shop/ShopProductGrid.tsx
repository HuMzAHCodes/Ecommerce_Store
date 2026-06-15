import { motion, AnimatePresence } from "framer-motion";
import { useTheme }                from "../../theme/ThemeContext";
import { useIsMobile }             from "../../hooks/useMediaQuery";
import ShopProductCard             from "./ShopProductCard";
import { emptyStateStyles }        from "./shopStyles";
import type { Product }            from "./shopData";

interface ShopProductGridProps {
  products:     Product[];
  isInCart:     (id: string) => boolean;
  isWishlisted: (id: string) => boolean;
  onAddToCart:  (product: Product) => void;
  onWishlist:   (product: Product) => void;
}

const ShopProductGrid = ({
  products, isInCart, isWishlisted,
  onAddToCart, onWishlist,
}: ShopProductGridProps) => {
  const { colors, typography } = useTheme();
  const isMobile = useIsMobile();

  const gridColumns = isMobile
    ? "1fr 1fr"
    : "repeat(auto-fill, minmax(210px, 1fr))";

  return (
    <AnimatePresence mode="wait">
      {products.length === 0 ? (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={emptyStateStyles(typography, colors)}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
          <p style={{ fontSize: typography.lg, marginBottom: "0.5rem", color: colors.textPrimary }}>
            No products found
          </p>
          <p style={{ fontSize: typography.sm }}>Try adjusting your filters</p>
        </motion.div>
      ) : (
        <motion.div
          key="grid"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          style={{ display: "grid", gridTemplateColumns: gridColumns, gap: isMobile ? "0.75rem" : "1.25rem" }}
        >
          {products.map((product) => (
            <ShopProductCard
              key={product.id}
              product={product}
              isInCart={isInCart(product.id)}
              isWishlisted={isWishlisted(product.id)}
              onAddToCart={onAddToCart}
              onWishlist={onWishlist}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShopProductGrid;