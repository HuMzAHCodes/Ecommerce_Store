import { motion }    from "framer-motion";
import { useTheme }  from "../../theme/ThemeContext";
import {
  shippingBarWrapperStyles, shippingBarLabelStyles,
  shippingBarTrackStyles,   shippingBarFillStyles,
} from "./cartDrawerStyles";

interface CartDrawerFreeShippingBarProps {
  amountRemainingForFree: number;
  freeShippingProgress:   number;
}

const CartDrawerFreeShippingBar = ({
  amountRemainingForFree,
  freeShippingProgress,
}: CartDrawerFreeShippingBarProps) => {
  const { colors, typography, radius } = useTheme();

  const isFreeShipping = amountRemainingForFree === 0;

  return (
    <div style={shippingBarWrapperStyles(colors)}>
      <p style={shippingBarLabelStyles(colors, typography, isFreeShipping)}>
        {isFreeShipping
          ? "🎉 You've unlocked free shipping!"
          : <>Add <strong style={{ color: colors.accentPrimary }}>${amountRemainingForFree.toFixed(2)}</strong> more for free shipping!</>
        }
      </p>

      <div style={shippingBarTrackStyles(colors, radius)}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${freeShippingProgress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={shippingBarFillStyles(colors, radius)}
        />
      </div>
    </div>
  );
};

export default CartDrawerFreeShippingBar;