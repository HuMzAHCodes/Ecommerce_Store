import { useState }    from "react";
import { useParams }   from "react-router-dom";
import { useCart }     from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useToast }    from "../../components/ui/Toast";
import { useProduct }  from "../../hooks/useProducts";
import { DEFAULT_PRODUCT, type ProductDetail, type TabId } from "./productData";

interface ProductPageState {
  product:       ProductDetail;
  activeImg:     number;
  qty:           number;
  activeSize:    string;
  activeTab:     TabId;
  avgRating:     number;
  isInCart:      boolean;
  isWishlisted:  boolean;
  isLoading:     boolean;
  setActiveImg:  (i: number) => void;
  setActiveSize: (s: string) => void;
  setActiveTab:  (t: TabId) => void;
  incrementQty:  () => void;
  decrementQty:  () => void;
  handleAddToCart: () => void;
  handleWishlist:  () => void;
}

const useProductPage = (): ProductPageState => {
  const { slug } = useParams<{ slug: string }>();
  const { addItem, isInCart: checkInCart, openDrawer } = useCart();
  const { toggle, isWishlisted: checkWishlisted }      = useWishlist();
  const toast = useToast();

  const { data: apiProduct, isLoading } = useProduct(slug ?? "");

  // Fall back to DEFAULT_PRODUCT while loading or if not found
  const product: ProductDetail = apiProduct ?? DEFAULT_PRODUCT;

  const [activeImg,  setActiveImg]  = useState(0);
  const [qty,        setQty]        = useState(1);
  const [activeSize, setActiveSize] = useState(product.sizes[1] ?? product.sizes[0] ?? "");
  const [activeTab,  setActiveTab]  = useState<TabId>("details");

  const avgRating = product.reviews.length
    ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
    : 0;

  const isInCart     = checkInCart(product.id);
  const isWishlisted = checkWishlisted(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({
        id:        product.id,
        name:      product.name,
        price:     product.price,
        salePrice: product.salePrice,
        image:     product.images[0]?.bg ?? "",
        slug:      product.slug,
      });
    }
    openDrawer();
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    toggle({
      id:        product.id,
      name:      product.name,
      price:     product.price,
      salePrice: product.salePrice,
      image:     product.images[0]?.bg ?? "",
      slug:      product.slug,
    });
    toast.info(isWishlisted ? "Removed from wishlist" : "Saved!");
  };

  const incrementQty = () => setQty((q) => q + 1);
  const decrementQty = () => setQty((q) => Math.max(1, q - 1));

  return {
    product, activeImg, qty, activeSize, activeTab,
    avgRating, isInCart, isWishlisted, isLoading,
    setActiveImg, setActiveSize, setActiveTab,
    incrementQty, decrementQty,
    handleAddToCart, handleWishlist,
  };
};

export default useProductPage;
