import { Link }      from "react-router-dom";
import { motion }    from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTheme }  from "../../theme/ThemeContext";
import {
  footerWrapperStyles,   summaryRowStyles,
  summaryLabelStyles,    summaryValueStyles,
  footerActionsStyles,   checkoutButtonStyles,
  viewFullCartLinkStyles,
} from "./cartDrawerStyles";

interface CartDrawerFooterProps {
  totalPrice:     number;
  shippingFee:    number;
  orderTotal:     number;
  onCheckout:     () => void;
  onCloseDrawer:  () => void;
}

const CartDrawerFooter = ({
  totalPrice, shippingFee, orderTotal,
  onCheckout, onCloseDrawer,
}: CartDrawerFooterProps) => {
  const { colors, typography, radius, shadows } = useTheme();

  const isFreeShipping = shippingFee === 0;

  const summaryRows = [
    { label: "Subtotal",  value: `$${totalPrice.toFixed(2)}`, isFreeShip: false },
    { label: "Shipping",  value: isFreeShipping ? "Free 🎉" : `$${shippingFee.toFixed(2)}`, isFreeShip: isFreeShipping },
  ];

  return (
    <div style={footerWrapperStyles(colors)}>

      {/* Subtotal & shipping rows */}
      {summaryRows.map(({ label, value, isFreeShip }) => (
        <div key={label} style={summaryRowStyles}>
          <span style={summaryLabelStyles(typography, colors)}>{label}</span>
          <span style={summaryValueStyles(typography, colors, isFreeShip)}>{value}</span>
        </div>
      ))}

      {/* Checkout & view cart */}
      <div style={footerActionsStyles}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onCheckout}
          style={checkoutButtonStyles(colors, typography, radius, shadows)}
        >
          Checkout · ${orderTotal.toFixed(2)} <ArrowRight size={16} />
        </motion.button>

        <Link
          to="/cart"
          onClick={onCloseDrawer}
          style={viewFullCartLinkStyles(typography, colors)}
        >
          View full cart
        </Link>
      </div>

    </div>
  );
};

export default CartDrawerFooter;