import { motion }        from "framer-motion";
import { Link }          from "react-router-dom";
import { X, ShoppingBag } from "lucide-react";
import { useTheme }      from "../../theme/ThemeContext";
import { useIsMobile }   from "../../hooks/useMediaQuery";
import {
  cardStyles,          cardImageAreaStyles, removeButtonStyles,
  cardBodyStyles,      cardNameLinkStyles,  cardPriceStyles,
  addToCartButtonStyles,
} from "./wishlistStyles";

interface WishlistCardProps {
  item: {
    id:        string;
    name:      string;
    price:     number;
    salePrice?: number | null;
    image:     string;
    slug:      string;
  };
  isInCart:     boolean;
  onAddToCart:  (item: WishlistCardProps["item"]) => void;
  onRemove:     (id: string) => void;
}

const WishlistCard = ({
  item, isInCart, onAddToCart, onRemove,
}: WishlistCardProps) => {
  const { colors, typography, radius, shadows, transitions } = useTheme();
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1    }}
      exit={{    opacity: 0, scale: 0.9  }}
      transition={{ duration: 0.25 }}
      layout
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        style={cardStyles(colors, radius, shadows)}
      >
        {/* Image */}
        <div style={{ ...cardImageAreaStyles(item.image, isMobile), overflow: "hidden" }}>
          {(item.image.startsWith("http") || item.image.startsWith("/")) ? (
            <img 
              src={item.image} 
              alt={item.name} 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            "✨"
          )}
          <button
            onClick={() => onRemove(item.id)}
            style={removeButtonStyles(colors, radius, shadows)}
          >
            <X size={13} color={colors.textMuted} />
          </button>
        </div>

        {/* Body */}
        <div style={cardBodyStyles(isMobile)}>
          <Link to={`/shop/${item.slug}`} style={cardNameLinkStyles(typography, colors, isMobile)}>
            {item.name}
          </Link>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: isMobile ? "4px" : "0px" }}>
            <span style={cardPriceStyles(typography, colors, isMobile, !!item.salePrice)}>
              ${item.salePrice ?? item.price}
            </span>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onAddToCart(item)}
              style={addToCartButtonStyles(typography, colors, transitions, radius, isMobile, isInCart)}
            >
              <ShoppingBag size={13} />
              {isInCart ? "In Cart" : "Add"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WishlistCard;