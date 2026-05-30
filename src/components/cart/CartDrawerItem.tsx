import { Link }           from "react-router-dom";
import { motion }         from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useTheme }       from "../../theme/ThemeContext";
import type { CartItem }  from "../../context/CartContext";
import {
  itemRowWrapperStyles, itemCardStyles, itemImageStyles,
  itemNameStyles,       itemPriceStyles, qtyControlsWrapperStyles,
  qtyButtonStyles,      qtyValueStyles,  itemLineTotalStyles,
  removeButtonStyles,
} from "./cartDrawerStyles";

interface CartDrawerItemProps {
  product:    CartItem["product"];
  quantity:   number;
  onRemove:   (productId: string) => void;
  onUpdateQty:(productId: string, newQty: number) => void;
  onLinkClick:() => void;
}

const CartDrawerItem = ({
  product, quantity,
  onRemove, onUpdateQty, onLinkClick,
}: CartDrawerItemProps) => {
  const { colors, typography, radius, transitions } = useTheme();

  const activePrice = product.salePrice ?? product.price;
  const lineTotal   = (activePrice * quantity).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.25 }}
      style={itemRowWrapperStyles}
    >
      <div style={itemCardStyles(colors, radius)}>

        {/* Product thumbnail */}
        <Link
          to={`/shop/${product.slug}`}
          onClick={onLinkClick}
          style={itemImageStyles(radius)}
        >
          ✨
        </Link>

        {/* Name, price, qty controls */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <Link
            to={`/shop/${product.slug}`}
            onClick={onLinkClick}
            style={itemNameStyles(typography, colors)}
          >
            {product.name}
          </Link>

          <p style={itemPriceStyles(typography, colors)}>
            ${activePrice.toFixed(2)}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={qtyControlsWrapperStyles(colors, radius)}>
              <button
                onClick={() => onUpdateQty(product.id, quantity - 1)}
                style={qtyButtonStyles(colors)}
              >
                <Minus size={11} />
              </button>
              <span style={qtyValueStyles(typography, colors)}>{quantity}</span>
              <button
                onClick={() => onUpdateQty(product.id, quantity + 1)}
                style={qtyButtonStyles(colors)}
              >
                <Plus size={11} />
              </button>
            </div>
            <span style={itemLineTotalStyles(typography, colors)}>
              = ${lineTotal}
            </span>
          </div>
        </div>

        {/* Remove button */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => onRemove(product.id)}
          style={removeButtonStyles(colors, radius)}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = colors.error; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = colors.textMuted; }}
        >
          <Trash2 size={14} />
        </motion.button>

      </div>
    </motion.div>
  );
};

export default CartDrawerItem;