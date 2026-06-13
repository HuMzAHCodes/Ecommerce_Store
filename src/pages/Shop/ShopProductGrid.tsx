import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../theme/ThemeContext";
import { useIsMobile } from "../../hooks/useMediaQuery";
import ShopProductCard from "./ShopProductCard";
import { emptyStateStyles } from "./shopStyles";
import type { Product } from "./shopData";

interface ShopProductGridProps {
  products: Product[];
  isLoading: boolean; // ← new
  isInCart: (id: string) => boolean;
  isWishlisted: (id: string) => boolean;
  onAddToCart: (product: Product) => void;
  onWishlist: (product: Product) => void;
}

const ShopProductGrid = ({
  products,
  isLoading,
  isInCart,
  isWishlisted,
  onAddToCart,
  onWishlist,
}: ShopProductGridProps) => {
  const { colors, typography } = useTheme();
  const isMobile = useIsMobile();

  const gridColumns = isMobile
    ? "1fr 1fr"
    : "repeat(auto-fill, minmax(210px, 1fr))";

  // ── Loading skeleton ─────────────────────────────────────────
  if (isLoading) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridColumns,
          gap: isMobile ? "0.75rem" : "1.25rem",
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              borderRadius: "12px",
              background: colors.bgSecondary,
              height: isMobile ? "260px" : "320px",
              animation: "pulse 1.5s ease-in-out infinite",
              opacity: 1 - i * 0.05, // subtle fade for stagger effect
            }}
          />
        ))}
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50%       { opacity: 1;   }
          }
        `}</style>
      </div>
    );
  }

  // ── Normal render ─────────────────────────────────────────────
  return (
    <AnimatePresence mode="wait">
      {products.length === 0 ? (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={emptyStateStyles(typography, colors)}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
          <p
            style={{
              fontSize: typography.lg,
              marginBottom: "0.5rem",
              color: colors.textPrimary,
            }}
          >
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
          style={{
            display: "grid",
            gridTemplateColumns: gridColumns,
            gap: isMobile ? "0.75rem" : "1.25rem",
          }}
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
