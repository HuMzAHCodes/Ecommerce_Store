import { useWishlist } from "../../context/WishlistContext";
import { useCart }     from "../../context/CartContext";
import { useToast }    from "../../components/ui/Toast";

const useWishlistPage = () => {
  const { items, removeItem }             = useWishlist();
  const { addItem, isInCart, openDrawer } = useCart();
  const toast                             = useToast();

  const handleAddToCart = (item: typeof items[0]) => {
    addItem(item);
    openDrawer();
    toast.success(`${item.name} added to cart!`);
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
    toast.info("Removed from wishlist");
  };

  return {
    items, isInCart,
    handleAddToCart, handleRemoveItem,
  };
};

export default useWishlistPage;