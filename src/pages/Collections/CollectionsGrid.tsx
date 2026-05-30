import { motion }              from "framer-motion";
import { useIsMobile }         from "../../hooks/useMediaQuery";
import CollectionsProductCard  from "./CollectionsProductCard";
import { gridStyles }          from "./collectionsStyles";
import type { CollectionProduct } from "./collectionsData";

interface CollectionsGridProps {
  activeTab:    string;
  products:     CollectionProduct[];
  isInCart:     (id: string) => boolean;
  isWishlisted: (id: string) => boolean;
  onAddToCart:  (product: CollectionProduct) => void;
  onWishlist:   (product: CollectionProduct) => void;
}

const CollectionsGrid = ({
  activeTab, products,
  isInCart, isWishlisted,
  onAddToCart, onWishlist,
}: CollectionsGridProps) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      key={activeTab + "-grid"}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
      style={gridStyles(isMobile)}
    >
      {products.map((product) => (
        <CollectionsProductCard
          key={product.id}
          product={product}
          isInCart={isInCart(product.id)}
          isWishlisted={isWishlisted(product.id)}
          onAddToCart={onAddToCart}
          onWishlist={onWishlist}
        />
      ))}
    </motion.div>
  );
};

export default CollectionsGrid;