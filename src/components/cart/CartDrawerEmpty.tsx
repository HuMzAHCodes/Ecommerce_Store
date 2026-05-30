import { ShoppingBag }  from "lucide-react";
import { motion }       from "framer-motion";
import { useTheme }     from "../../theme/ThemeContext";
import {
  emptyStateWrapperStyles,    emptyStatePrimaryTextStyles,
  emptyStateSubTextStyles,    browseShopButtonStyles,
} from "./cartDrawerStyles";

interface CartDrawerEmptyProps {
  onBrowseShop: () => void;
}

const CartDrawerEmpty = ({ onBrowseShop }: CartDrawerEmptyProps) => {
  const { colors, typography, radius } = useTheme();

  return (
    <div style={emptyStateWrapperStyles}>
      <ShoppingBag size={52} color={colors.borderMedium} />

      <div style={{ textAlign: "center" }}>
        <p style={emptyStatePrimaryTextStyles(typography, colors)}>
          Your cart is empty
        </p>
        <p style={emptyStateSubTextStyles(typography, colors)}>
          Add something beautiful ✨
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onBrowseShop}
        style={browseShopButtonStyles(colors, typography, radius)}
      >
        Browse Shop
      </motion.button>
    </div>
  );
};

export default CartDrawerEmpty;