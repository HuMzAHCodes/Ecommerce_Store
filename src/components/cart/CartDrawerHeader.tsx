import { ShoppingBag, X }  from "lucide-react";
import { motion }          from "framer-motion";
import { useTheme }        from "../../theme/ThemeContext";
import {
  headerWrapperStyles, headerLeftStyles, headerTitleStyles,
  itemCountBadgeStyles, closeButtonStyles,
} from "./cartDrawerStyles";

interface CartDrawerHeaderProps {
  totalItems:  number;
  onClose:     () => void;
}

const CartDrawerHeader = ({ totalItems, onClose }: CartDrawerHeaderProps) => {
  const { colors, typography, radius } = useTheme();

  return (
    <div style={headerWrapperStyles(colors)}>
      <div style={headerLeftStyles}>
        <ShoppingBag size={20} color={colors.accentPrimary} />
        <span style={headerTitleStyles(typography, colors)}>Your Cart</span>
        {totalItems > 0 && (
          <span style={itemCountBadgeStyles(colors, typography, radius)}>
            {totalItems}
          </span>
        )}
      </div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        style={closeButtonStyles(colors, radius)}
      >
        <X size={16} />
      </motion.button>
    </div>
  );
};

export default CartDrawerHeader;