import { useParams }   from "react-router-dom";
import { useCart }     from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useToast }    from "../../components/ui/Toast";
import {
  ALL_COLLECTION_PRODUCTS, COLLECTION_META,
  COLLECTION_TABS, type CollectionProduct,
} from "./collectionsData";

interface CollectionsState {
  activeTab:        string;
  meta:             typeof COLLECTION_META[string];
  products:         CollectionProduct[];
  isInCart:         (id: string) => boolean;
  isWishlisted:     (id: string) => boolean;
  handleAddToCart:  (product: CollectionProduct) => void;
  handleWishlist:   (product: CollectionProduct) => void;
}

const useCollections = (): CollectionsState => {
  const { category } = useParams<{ category?: string }>();
  const { addItem, isInCart, openDrawer } = useCart();
  const { toggle, isWishlisted }          = useWishlist();
  const toast = useToast();

  const activeTab = COLLECTION_TABS.includes(category ?? "") ? category! : "skincare";
  const meta      = COLLECTION_META[activeTab];
  const products  = ALL_COLLECTION_PRODUCTS.filter(p => p.collection === activeTab);

  const handleAddToCart = (product: CollectionProduct) => {
    addItem({
      id:        product.id,
      name:      product.name,
      price:     product.price,
      salePrice: product.salePrice,
      image:     product.image,
      slug:      product.slug,
    });
    openDrawer();
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = (product: CollectionProduct) => {
    toggle({
      id:        product.id,
      name:      product.name,
      price:     product.price,
      salePrice: product.salePrice,
      image:     product.image,
      slug:      product.slug,
    });
    toast.info(isWishlisted(product.id) ? "Removed from wishlist" : `${product.name} saved!`);
  };

  return {
    activeTab, meta, products,
    isInCart, isWishlisted,
    handleAddToCart, handleWishlist,
  };
};

export default useCollections;