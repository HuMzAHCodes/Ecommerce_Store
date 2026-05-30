import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile }             from "../../hooks/useMediaQuery";
import WishlistCard                from "./WishlistCard";
import { gridStyles }              from "./wishlistStyles";

// ── Match CartProduct shape exactly to avoid type mismatches ──

export interface WishlistItem {
  id:         string;
  name:       string;
  price:      number;
  salePrice?: number | null;
  image:      string;
  slug:       string;
}

interface WishlistGridProps {
  items:       WishlistItem[];
  isInCart:    (id: string) => boolean;
  onAddToCart: (item: WishlistItem) => void;
  onRemove:    (id: string) => void;
}

const WishlistGrid = ({
  items, isInCart, onAddToCart, onRemove,
}: WishlistGridProps) => {
  const isMobile = useIsMobile();

  // Normalise salePrice before passing down — ensures it's
  // always number | null, never undefined
  const normaliseItem = (item: WishlistItem): WishlistItem => ({
    ...item,
    salePrice: item.salePrice ?? null,
  });

  return (
    <motion.div
      style={gridStyles(isMobile)}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
    >
      <AnimatePresence>
        {items.map((item) => (
          <WishlistCard
            key={item.id}
            item={normaliseItem(item)}
            isInCart={isInCart(item.id)}
            onAddToCart={onAddToCart}
            onRemove={onRemove}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default WishlistGrid;
