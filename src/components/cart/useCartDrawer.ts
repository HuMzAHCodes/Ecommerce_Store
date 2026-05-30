import { useNavigate } from "react-router-dom";
import { useCart }     from "../../context/CartContext";

const FREE_SHIPPING_THRESHOLD = 50;
const STANDARD_SHIPPING_FEE   = 5.99;

const useCartDrawer = () => {
  const navigate = useNavigate();
  const {
    items, isOpen, closeDrawer,
    removeItem, updateQty,
    totalItems, totalPrice,
  } = useCart();

  const shippingFee            = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const amountRemainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const freeShippingProgress   = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);
  const orderTotal             = totalPrice + shippingFee;
  const hasItems               = items.length > 0;

  const handleCheckout = () => {
    closeDrawer();
    navigate("/checkout");
  };

  const handleBrowseShop = () => {
    closeDrawer();
    navigate("/shop");
  };

  return {
    items, isOpen, closeDrawer,
    removeItem, updateQty,
    totalItems, totalPrice,
    shippingFee, amountRemainingForFree,
    freeShippingProgress, orderTotal,
    hasItems, handleCheckout, handleBrowseShop,
  };
};

export default useCartDrawer;